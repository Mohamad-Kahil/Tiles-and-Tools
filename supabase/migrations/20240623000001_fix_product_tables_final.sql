-- Create a bucket for product images if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Ensure the categories table exists with proper structure
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  parent_id UUID REFERENCES public.categories(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Ensure the products table exists with proper structure
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  short_description TEXT,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  compare_at_price DECIMAL(10, 2),
  cost_price DECIMAL(10, 2),
  inventory_quantity INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  category_id UUID REFERENCES public.categories(id),
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  weight DECIMAL(10, 2),
  dimensions JSONB,
  sku TEXT,
  barcode TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Ensure the product_images table exists with proper structure
CREATE TABLE IF NOT EXISTS public.product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt_text TEXT,
  is_primary BOOLEAN DEFAULT false,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Disable RLS for development
ALTER TABLE IF EXISTS public.products DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.product_images DISABLE ROW LEVEL SECURITY;

-- Add sample categories if none exist
INSERT INTO public.categories (name, slug, description)
SELECT 'Flooring', 'flooring', 'All flooring products including tiles, marble, and wood'
WHERE NOT EXISTS (SELECT 1 FROM public.categories LIMIT 1);

INSERT INTO public.categories (name, slug, description)
SELECT 'Lighting', 'lighting', 'Indoor and outdoor lighting fixtures'
WHERE NOT EXISTS (SELECT 1 FROM public.categories WHERE name = 'Lighting');

INSERT INTO public.categories (name, slug, description)
SELECT 'Wall Products', 'wall-products', 'Wall paints, wallpapers, and decorative items'
WHERE NOT EXISTS (SELECT 1 FROM public.categories WHERE name = 'Wall Products');
