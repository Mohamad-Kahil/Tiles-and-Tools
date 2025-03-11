-- Create a bucket for product images if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Fix the products table structure
ALTER TABLE IF EXISTS public.products
  ADD COLUMN IF NOT EXISTS short_description TEXT,
  ADD COLUMN IF NOT EXISTS meta_title TEXT,
  ADD COLUMN IF NOT EXISTS meta_description TEXT,
  ADD COLUMN IF NOT EXISTS meta_keywords TEXT,
  ADD COLUMN IF NOT EXISTS weight DECIMAL(10, 2),
  ADD COLUMN IF NOT EXISTS dimensions JSONB;

-- Ensure the product_images table has the correct structure
ALTER TABLE IF EXISTS public.product_images
  ADD COLUMN IF NOT EXISTS is_primary BOOLEAN DEFAULT false;

-- Create RLS policies for products table
ALTER TABLE IF EXISTS public.products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anonymous read access to products" ON public.products;
CREATE POLICY "Allow anonymous read access to products"
  ON public.products FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to manage products" ON public.products;
CREATE POLICY "Allow authenticated users to manage products"
  ON public.products FOR ALL
  USING (auth.role() = 'authenticated');

-- Create RLS policies for product_images table
ALTER TABLE IF EXISTS public.product_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anonymous read access to product_images" ON public.product_images;
CREATE POLICY "Allow anonymous read access to product_images"
  ON public.product_images FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to manage product_images" ON public.product_images;
CREATE POLICY "Allow authenticated users to manage product_images"
  ON public.product_images FOR ALL
  USING (auth.role() = 'authenticated');
