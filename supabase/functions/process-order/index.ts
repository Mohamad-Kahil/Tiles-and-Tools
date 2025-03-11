import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.6";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Auth context of the logged in user
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      },
    );

    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {
      throw new Error("Unauthorized");
    }

    // Parse the request body
    const {
      items,
      shipping_address,
      shipping_city,
      shipping_state,
      shipping_postal_code,
      shipping_country = "Egypt",
      shipping_method,
      payment_method,
      promotion_code = null,
      notes = "",
    } = await req.json();

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error("Order must contain at least one item");
    }

    if (
      !shipping_address ||
      !shipping_city ||
      !shipping_method ||
      !payment_method
    ) {
      throw new Error("Shipping and payment information are required");
    }

    // Start a transaction
    const { data: orderData, error: orderError } = await supabaseClient.rpc(
      "calculate_order_total",
      { items: JSON.stringify(items), promotion_code },
    );

    if (orderError) throw orderError;

    // Generate a unique order number
    const orderNumber =
      `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`.substring(0, 20);

    // Create the order
    const { data: order, error: createOrderError } = await supabaseClient
      .from("orders")
      .insert({
        customer_id: user.id,
        order_number: orderNumber,
        status: "pending",
        total_amount: orderData[0].total,
        shipping_address,
        shipping_city,
        shipping_state,
        shipping_postal_code,
        shipping_country,
        shipping_method,
        shipping_cost: orderData[0].shipping,
        payment_method,
        payment_status: "pending",
        notes: promotion_code
          ? `PROMO:${promotion_code} ${notes}`.trim()
          : notes,
      })
      .select()
      .single();

    if (createOrderError) throw createOrderError;

    // Create order items
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.price,
      total_price: item.price * item.quantity,
    }));

    const { error: itemsError } = await supabaseClient
      .from("order_items")
      .insert(orderItems);

    if (itemsError) throw itemsError;

    // Clear the user's cart if successful
    if (user) {
      const { data: cart } = await supabaseClient
        .from("carts")
        .select("id")
        .eq("customer_id", user.id)
        .single();

      if (cart) {
        await supabaseClient.from("cart_items").delete().eq("cart_id", cart.id);
      }
    }

    // Return the order details
    return new Response(
      JSON.stringify({
        success: true,
        order: {
          id: order.id,
          order_number: order.order_number,
          status: order.status,
          total: orderData[0].total,
          subtotal: orderData[0].subtotal,
          discount: orderData[0].discount,
          shipping: orderData[0].shipping,
        },
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      },
    );
  }
});
