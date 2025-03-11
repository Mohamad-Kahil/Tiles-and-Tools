-- Create a bucket for product images if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Ensure the products table has the correct structure
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  short_description TEXT,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  compare_at_price DECIMAL(10, 2),
  cost_price DECIMAL(10, 2),
  sku TEXT,
  barcode TEXT,
  inventory_quantity INTEGER NOT NULL DEFAULT 0,
  category_id UUID,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  weight DECIMAL(10, 2),
  dimensions JSONB,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Ensure the product_images table has the correct structure
CREATE TABLE IF NOT EXISTS public.product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Ensure the categories table exists
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  parent_id UUID REFERENCES public.categories(id),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add foreign key constraint if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'products_category_id_fkey' AND conrelid = 'products'::regclass
  ) THEN
    ALTER TABLE public.products
    ADD CONSTRAINT products_category_id_fkey
    FOREIGN KEY (category_id) REFERENCES public.categories(id);
  END IF;
END $$;

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

-- Create RLS policies for categories table
ALTER TABLE IF EXISTS public.categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anonymous read access to categories" ON public.categories;
CREATE POLICY "Allow anonymous read access to categories"
  ON public.categories FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to manage categories" ON public.categories;
CREATE POLICY "Allow authenticated users to manage categories"
  ON public.categories FOR ALL
  USING (auth.role() = 'authenticated');

-- Insert sample categories if none exist
INSERT INTO public.categories (name, slug, description)
SELECT 'Flooring', 'flooring', 'All flooring products including tiles, marble, and wood'
WHERE NOT EXISTS (SELECT 1 FROM public.categories LIMIT 1);

INSERT INTO public.categories (name, slug, description)
SELECT 'Lighting', 'lighting', 'Indoor and outdoor lighting fixtures'
WHERE NOT EXISTS (SELECT 1 FROM public.categories WHERE name = 'Lighting');

INSERT INTO public.categories (name, slug, description)
SELECT 'Wall Products', 'wall-products', 'Wall paints, wallpapers, and decorative items'
WHERE NOT EXISTS (SELECT 1 FROM public.categories WHERE name = 'Wall Products');
