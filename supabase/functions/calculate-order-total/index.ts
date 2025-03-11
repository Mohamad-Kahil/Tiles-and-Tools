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

    // Parse the request body
    const { items, promotion_code } = await req.json();

    // Parse items if they're a string
    const parsedItems = typeof items === "string" ? JSON.parse(items) : items;

    if (
      !parsedItems ||
      !Array.isArray(parsedItems) ||
      parsedItems.length === 0
    ) {
      throw new Error("Invalid items format");
    }

    // Calculate subtotal
    let subtotal = 0;
    for (const item of parsedItems) {
      subtotal += item.price * item.quantity;
    }

    // Apply promotion code discount if provided
    let discount = 0;
    if (promotion_code) {
      // In a real app, you would fetch the promotion from the database
      // For this example, we'll use a simple 10% discount for any code
      discount = subtotal * 0.1;
    }

    // Calculate shipping cost (free over 5000 EGP)
    const shipping = subtotal > 5000 ? 0 : 100;

    // Calculate total
    const total = subtotal - discount + shipping;

    return new Response(
      JSON.stringify({
        subtotal,
        discount,
        shipping,
        total,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
