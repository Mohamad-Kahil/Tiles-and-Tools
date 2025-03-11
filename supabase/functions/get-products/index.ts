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

    // Parse the request body or use default values
    const {
      category_id = null,
      search = "",
      sort_by = "name",
      sort_order = "asc",
      page = 1,
      limit = 12,
      min_price = null,
      max_price = null,
      is_featured = null,
    } = await req.json();

    // Build the query
    let query = supabaseClient
      .from("products")
      .select(
        `
        *,
        category:categories(id, name, slug),
        images:product_images(id, image_url, alt_text, is_primary, display_order),
        attributes:product_attribute_values(id, value, attribute:product_attributes(id, name))
      `,
        { count: "exact" },
      )
      .eq("is_active", true);

    // Apply filters
    if (category_id) {
      query = query.eq("category_id", category_id);
    }

    if (search) {
      query = query.ilike("name", `%${search}%`);
    }

    if (min_price !== null) {
      query = query.gte("price", min_price);
    }

    if (max_price !== null) {
      query = query.lte("price", max_price);
    }

    if (is_featured !== null) {
      query = query.eq("is_featured", is_featured);
    }

    // Apply sorting
    query = query.order(sort_by, { ascending: sort_order === "asc" });

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    // Execute the query
    const { data, error, count } = await query;

    if (error) throw error;

    // Return the products with pagination info
    return new Response(
      JSON.stringify({
        products: data,
        pagination: {
          total: count,
          page,
          limit,
          pages: Math.ceil(count! / limit),
        },
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
