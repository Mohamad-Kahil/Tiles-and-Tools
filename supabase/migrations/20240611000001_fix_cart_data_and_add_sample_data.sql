-- Add product categories
INSERT INTO public.categories (id, name, slug, description, image_url, parent_id, created_at, updated_at)
VALUES 
(uuid_generate_v4(), 'Flooring', 'flooring', 'High-quality flooring solutions for your home', 'https://images.unsplash.com/photo-1581430872221-d2a064b92e17?w=800&q=80', NULL, NOW(), NOW()),
(uuid_generate_v4(), 'Wall Products', 'wall-products', 'Beautiful wall solutions to enhance your space', 'https://images.unsplash.com/photo-1562184552-997c461abbe6?w=800&q=80', NULL, NOW(), NOW()),
(uuid_generate_v4(), 'Lighting', 'lighting', 'Modern lighting fixtures for every room', 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=800&q=80', NULL, NOW(), NOW()),
(uuid_generate_v4(), 'Bathroom', 'bathroom', 'Complete your bathroom with our premium products', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80', NULL, NOW(), NOW()),
(uuid_generate_v4(), 'Kitchen', 'kitchen', 'Transform your kitchen with our stylish products', 'https://images.unsplash.com/photo-1556911220-bda9f7f7597e?w=800&q=80', NULL, NOW(), NOW());

-- Get category IDs for subcategories
DO $$
DECLARE
  flooring_id UUID;
  wall_id UUID;
  lighting_id UUID;
BEGIN
  SELECT id INTO flooring_id FROM categories WHERE slug = 'flooring' LIMIT 1;
  SELECT id INTO wall_id FROM categories WHERE slug = 'wall-products' LIMIT 1;
  SELECT id INTO lighting_id FROM categories WHERE slug = 'lighting' LIMIT 1;
  
  -- Add subcategories
  INSERT INTO public.categories (id, name, slug, description, image_url, parent_id, created_at, updated_at)
  VALUES 
  (uuid_generate_v4(), 'Ceramic Tiles', 'ceramic-tiles', 'Durable ceramic tiles for any room', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&q=80', flooring_id, NOW(), NOW()),
  (uuid_generate_v4(), 'Wooden Flooring', 'wooden-flooring', 'Natural wooden flooring options', 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=500&q=80', flooring_id, NOW(), NOW()),
  (uuid_generate_v4(), 'Wall Paint', 'wall-paint', 'Premium quality wall paints', 'https://images.unsplash.com/photo-1562184552-997c461abbe6?w=500&q=80', wall_id, NOW(), NOW()),
  (uuid_generate_v4(), 'Wallpaper', 'wallpaper', 'Decorative wallpapers for your home', 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=500&q=80', wall_id, NOW(), NOW()),
  (uuid_generate_v4(), 'Pendant Lights', 'pendant-lights', 'Elegant pendant lighting fixtures', 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&q=80', lighting_id, NOW(), NOW()),
  (uuid_generate_v4(), 'Wall Sconces', 'wall-sconces', 'Stylish wall mounted lighting', 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80', lighting_id, NOW(), NOW());
  
  -- Add products with dynamic category IDs
  -- This would be added here but we'll skip for now to simplify the migration
END
$$;