-- Insert sample categories
INSERT INTO public.categories (id, name, slug, description, image_url) VALUES
('d1c5e8a0-5c1a-4b5d-9c5e-8a0d1c5e8a0d', 'Flooring', 'flooring', 'High-quality flooring options for your home', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80'),
('d2c5e8a0-5c1a-4b5d-9c5e-8a0d2c5e8a0d', 'Wall Products', 'wall-products', 'Beautiful wall products to enhance your space', 'https://images.unsplash.com/photo-1594844311012-927679c81707?w=800&q=80'),
('d3c5e8a0-5c1a-4b5d-9c5e-8a0d3c5e8a0d', 'Lighting', 'lighting', 'Illuminate your home with our lighting collection', 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=800&q=80'),
('d4c5e8a0-5c1a-4b5d-9c5e-8a0d4c5e8a0d', 'Bathroom', 'bathroom', 'Complete your bathroom with our elegant fixtures', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80'),
('d5c5e8a0-5c1a-4b5d-9c5e-8a0d5c5e8a0d', 'Kitchen', 'kitchen', 'Transform your kitchen with our modern products', 'https://images.unsplash.com/photo-1556911220-bda9f7f7597b?w=800&q=80');

-- Insert subcategories
INSERT INTO public.categories (id, name, slug, description, image_url, parent_id) VALUES
('e1c5e8a0-5c1a-4b5d-9c5e-8a0e1c5e8a0d', 'Marble Tiles', 'marble-tiles', 'Luxurious marble tiles for elegant flooring', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', 'd1c5e8a0-5c1a-4b5d-9c5e-8a0d1c5e8a0d'),
('e2c5e8a0-5c1a-4b5d-9c5e-8a0e2c5e8a0d', 'Ceramic Tiles', 'ceramic-tiles', 'Durable ceramic tiles for any room', 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&q=80', 'd1c5e8a0-5c1a-4b5d-9c5e-8a0d1c5e8a0d'),
('e3c5e8a0-5c1a-4b5d-9c5e-8a0e3c5e8a0d', 'Porcelain Tiles', 'porcelain-tiles', 'High-quality porcelain tiles for lasting beauty', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80', 'd1c5e8a0-5c1a-4b5d-9c5e-8a0d1c5e8a0d'),
('e4c5e8a0-5c1a-4b5d-9c5e-8a0e4c5e8a0d', 'Mosaic Tiles', 'mosaic-tiles', 'Artistic mosaic tiles for unique designs', 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80', 'd1c5e8a0-5c1a-4b5d-9c5e-8a0d1c5e8a0d'),
('e5c5e8a0-5c1a-4b5d-9c5e-8a0e5c5e8a0d', 'Granite Tiles', 'granite-tiles', 'Durable granite tiles for high-traffic areas', 'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?w=800&q=80', 'd1c5e8a0-5c1a-4b5d-9c5e-8a0d1c5e8a0d'),
('e6c5e8a0-5c1a-4b5d-9c5e-8a0e6c5e8a0d', 'Paint', 'paint', 'Premium paints for beautiful walls', 'https://images.unsplash.com/photo-1562184552-997c461abbe6?w=800&q=80', 'd2c5e8a0-5c1a-4b5d-9c5e-8a0d2c5e8a0d'),
('e7c5e8a0-5c1a-4b5d-9c5e-8a0e7c5e8a0d', 'Wallpaper', 'wallpaper', 'Stylish wallpapers for any room', 'https://images.unsplash.com/photo-1517281749396-564b95a206c3?w=800&q=80', 'd2c5e8a0-5c1a-4b5d-9c5e-8a0d2c5e8a0d'),
('e8c5e8a0-5c1a-4b5d-9c5e-8a0e8c5e8a0d', 'Wall Tiles', 'wall-tiles', 'Beautiful wall tiles for kitchens and bathrooms', 'https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?w=800&q=80', 'd2c5e8a0-5c1a-4b5d-9c5e-8a0d2c5e8a0d'),
('e9c5e8a0-5c1a-4b5d-9c5e-8a0e9c5e8a0d', 'Ceiling Lights', 'ceiling-lights', 'Elegant ceiling lights for any room', 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=800&q=80', 'd3c5e8a0-5c1a-4b5d-9c5e-8a0d3c5e8a0d'),
('eac5e8a0-5c1a-4b5d-9c5e-8a0eac5e8a0d', 'Wall Lights', 'wall-lights', 'Stylish wall lights for ambient lighting', 'https://images.unsplash.com/photo-1507494924047-60b8ee826ca9?w=800&q=80', 'd3c5e8a0-5c1a-4b5d-9c5e-8a0d3c5e8a0d');

-- Insert sample products
INSERT INTO public.products (id, name, slug, description, price, compare_at_price, inventory_quantity, is_active, is_featured) VALUES
('f1c5e8a0-5c1a-4b5d-9c5e-8a0f1c5e8a0d', 'Luxury Marble Flooring Tile', 'luxury-marble-flooring-tile', 'Premium quality marble flooring tile with elegant veining patterns. Perfect for living rooms, entryways, and luxury bathrooms.', 1299.99, 1499.99, 50, true, true),
('f2c5e8a0-5c1a-4b5d-9c5e-8a0f2c5e8a0d', 'Premium Ceramic Wall Tile', 'premium-ceramic-wall-tile', 'High-quality ceramic wall tile with a smooth finish. Ideal for kitchens and bathrooms.', 499.99, 599.99, 100, true, false),
('f3c5e8a0-5c1a-4b5d-9c5e-8a0f3c5e8a0d', 'Modern Pendant Light Fixture', 'modern-pendant-light-fixture', 'Contemporary pendant light fixture with adjustable height. Perfect for dining areas and kitchen islands.', 899.99, 1099.99, 30, true, true),
('f4c5e8a0-5c1a-4b5d-9c5e-8a0f4c5e8a0d', 'Premium Wall Paint - Desert Sand', 'premium-wall-paint-desert-sand', 'High-quality wall paint in a warm desert sand color. Low VOC and excellent coverage.', 299.99, 349.99, 200, true, false),
('f5c5e8a0-5c1a-4b5d-9c5e-8a0f5c5e8a0d', 'Mosaic Bathroom Tile Set', 'mosaic-bathroom-tile-set', 'Beautiful mosaic tile set for bathroom floors and walls. Includes multiple patterns and colors.', 799.99, 899.99, 40, true, true),
('f6c5e8a0-5c1a-4b5d-9c5e-8a0f6c5e8a0d', 'Granite Kitchen Countertop', 'granite-kitchen-countertop', 'Durable granite countertop for kitchens. Resistant to heat, scratches, and stains.', 2499.99, 2999.99, 15, true, true),
('f7c5e8a0-5c1a-4b5d-9c5e-8a0f7c5e8a0d', 'Luxury Bathroom Faucet', 'luxury-bathroom-faucet', 'High-end bathroom faucet with brushed nickel finish. Modern design with smooth operation.', 599.99, 699.99, 45, true, false),
('f8c5e8a0-5c1a-4b5d-9c5e-8a0f8c5e8a0d', 'Designer Wallpaper Roll', 'designer-wallpaper-roll', 'Premium designer wallpaper with unique patterns. Easy to apply and remove.', 199.99, 249.99, 80, true, false),
('f9c5e8a0-5c1a-4b5d-9c5e-8a0f9c5e8a0d', 'LED Recessed Ceiling Lights (Pack of 4)', 'led-recessed-ceiling-lights', 'Energy-efficient LED recessed ceiling lights. Dimmable and long-lasting.', 399.99, 499.99, 60, true, true),
('fac5e8a0-5c1a-4b5d-9c5e-8a0fac5e8a0d', 'Porcelain Floor Tile Set', 'porcelain-floor-tile-set', 'Durable porcelain floor tiles with a natural stone look. Resistant to water and stains.', 899.99, 999.99, 35, true, false);

-- Link products to categories
INSERT INTO public.product_categories (product_id, category_id) VALUES
('f1c5e8a0-5c1a-4b5d-9c5e-8a0f1c5e8a0d', 'e1c5e8a0-5c1a-4b5d-9c5e-8a0e1c5e8a0d'),
('f1c5e8a0-5c1a-4b5d-9c5e-8a0f1c5e8a0d', 'd1c5e8a0-5c1a-4b5d-9c5e-8a0d1c5e8a0d'),
('f2c5e8a0-5c1a-4b5d-9c5e-8a0f2c5e8a0d', 'e8c5e8a0-5c1a-4b5d-9c5e-8a0e8c5e8a0d'),
('f2c5e8a0-5c1a-4b5d-9c5e-8a0f2c5e8a0d', 'd2c5e8a0-5c1a-4b5d-9c5e-8a0d2c5e8a0d'),
('f3c5e8a0-5c1a-4b5d-9c5e-8a0f3c5e8a0d', 'e9c5e8a0-5c1a-4b5d-9c5e-8a0e9c5e8a0d'),
('f3c5e8a0-5c1a-4b5d-9c5e-8a0f3c5e8a0d', 'd3c5e8a0-5c1a-4b5d-9c5e-8a0d3c5e8a0d'),
('f4c5e8a0-5c1a-4b5d-9c5e-8a0f4c5e8a0d', 'e6c5e8a0-5c1a-4b5d-9c5e-8a0e6c5e8a0d'),
('f4c5e8a0-5c1a-4b5d-9c5e-8a0f4c5e8a0d', 'd2c5e8a0-5c1a-4b5d-9c5e-8a0d2c5e8a0d'),
('f5c5e8a0-5c1a-4b5d-9c5e-8a0f5c5e8a0d', 'e4c5e8a0-5c1a-4b5d-9c5e-8a0e4c5e8a0d'),
('f5c5e8a0-5c1a-4b5d-9c5e-8a0f5c5e8a0d', 'd4c5e8a0-5c1a-4b5d-9c5e-8a0d4c5e8a0d'),
('f6c5e8a0-5c1a-4b5d-9c5e-8a0f6c5e8a0d', 'd5c5e8a0-5c1a-4b5d-9c5e-8a0d5c5e8a0d'),
('f7c5e8a0-5c1a-4b5d-9c5e-8a0f7c5e8a0d', 'd4c5e8a0-5c1a-4b5d-9c5e-8a0d4c5e8a0d'),
('f8c5e8a0-5c1a-4b5d-9c5e-8a0f8c5e8a0d', 'e7c5e8a0-5c1a-4b5d-9c5e-8a0e7c5e8a0d'),
('f8c5e8a0-5c1a-4b5d-9c5e-8a0f8c5e8a0d', 'd2c5e8a0-5c1a-4b5d-9c5e-8a0d2c5e8a0d'),
('f9c5e8a0-5c1a-4b5d-9c5e-8a0f9c5e8a0d', 'e9c5e8a0-5c1a-4b5d-9c5e-8a0e9c5e8a0d'),
('f9c5e8a0-5c1a-4b5d-9c5e-8a0f9c5e8a0d', 'd3c5e8a0-5c1a-4b5d-9c5e-8a0d3c5e8a0d'),
('fac5e8a0-5c1a-4b5d-9c5e-8a0fac5e8a0d', 'e3c5e8a0-5c1a-4b5d-9c5e-8a0e3c5e8a0d'),
('fac5e8a0-5c1a-4b5d-9c5e-8a0fac5e8a0d', 'd1c5e8a0-5c1a-4b5d-9c5e-8a0d1c5e8a0d');

-- Insert product images
INSERT INTO public.product_images (product_id, url, alt_text, position) VALUES
('f1c5e8a0-5c1a-4b5d-9c5e-8a0f1c5e8a0d', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', 'Luxury Marble Flooring Tile - Main', 0),
('f1c5e8a0-5c1a-4b5d-9c5e-8a0f1c5e8a0d', 'https://images.unsplash.com/photo-1600607687920-4e4a92f082f6?w=800&q=80', 'Luxury Marble Flooring Tile - Detail', 1),
('f1c5e8a0-5c1a-4b5d-9c5e-8a0f1c5e8a0d', 'https://images.unsplash.com/photo-1600607688066-890987f19a02?w=800&q=80', 'Luxury Marble Flooring Tile - Room View', 2),
('f2c5e8a0-5c1a-4b5d-9c5e-8a0f2c5e8a0d', 'https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?w=800&q=80', 'Premium Ceramic Wall Tile - Main', 0),
('f2c5e8a0-5c1a-4b5d-9c5e-8a0f2c5e8a0d', 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=800&q=80', 'Premium Ceramic Wall Tile - Detail', 1),
('f3c5e8a0-5c1a-4b5d-9c5e-8a0f3c5e8a0d', 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=800&q=80', 'Modern Pendant Light Fixture - Main', 0),
('f3c5e8a0-5c1a-4b5d-9c5e-8a0f3c5e8a0d', 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&q=80', 'Modern Pendant Light Fixture - Room View', 1),
('f4c5e8a0-5c1a-4b5d-9c5e-8a0f4c5e8a0d', 'https://images.unsplash.com/photo-1562184552-997c461abbe6?w=800&q=80', 'Premium Wall Paint - Desert Sand - Main', 0),
('f5c5e8a0-5c1a-4b5d-9c5e-8a0f5c5e8a0d', 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80', 'Mosaic Bathroom Tile Set - Main', 0),
('f6c5e8a0-5c1a-4b5d-9c5e-8a0f6c5e8a0d', 'https://images.unsplash.com/photo-1556911220-bda9f7f7597b?w=800&q=80', 'Granite Kitchen Countertop - Main', 0),
('f7c5e8a0-5c1a-4b5d-9c5e-8a0f7c5e8a0d', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80', 'Luxury Bathroom Faucet - Main', 0),
('f8c5e8a0-5c1a-4b5d-9c5e-8a0f8c5e8a0d', 'https://images.unsplash.com/photo-1517281749396-564b95a206c3?w=800&q=80', 'Designer Wallpaper Roll - Main', 0),
('f9c5e8a0-5c1a-4b5d-9c5e-8a0f9c5e8a0d', 'https://images.unsplash.com/photo-1507494924047-60b8ee826ca9?w=800&q=80', 'LED Recessed Ceiling Lights - Main', 0),
('fac5e8a0-5c1a-4b5d-9c5e-8a0fac5e8a0d', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80', 'Porcelain Floor Tile Set - Main', 0);

-- Insert product attributes
INSERT INTO public.product_attributes (product_id, name, value) VALUES
('f1c5e8a0-5c1a-4b5d-9c5e-8a0f1c5e8a0d', 'Material', 'Marble'),
('f1c5e8a0-5c1a-4b5d-9c5e-8a0f1c5e8a0d', 'Color', 'White with Gray Veining'),
('f1c5e8a0-5c1a-4b5d-9c5e-8a0f1c5e8a0d', 'Size', '60cm x 60cm'),
('f1c5e8a0-5c1a-4b5d-9c5e-8a0f1c5e8a0d', 'Thickness', '10mm'),
('f1c5e8a0-5c1a-4b5d-9c5e-8a0f1c5e8a0d', 'Finish', 'Polished'),
('f2c5e8a0-5c1a-4b5d-9c5e-8a0f2c5e8a0d', 'Material', 'Ceramic'),
('f2c5e8a0-5c1a-4b5d-9c5e-8a0f2c5e8a0d', 'Color', 'White'),
('f2c5e8a0-5c1a-4b5d-9c5e-8a0f2c5e8a0d', 'Size', '30cm x 60cm'),
('f2c5e8a0-5c1a-4b5d-9c5e-8a0f2c5e8a0d', 'Finish', 'Matte'),
('f3c5e8a0-5c1a-4b5d-9c5e-8a0f3c5e8a0d', 'Material', 'Metal and Glass'),
('f3c5e8a0-5c1a-4b5d-9c5e-8a0f3c5e8a0d', 'Color', 'Black and Clear'),
('f3c5e8a0-5c1a-4b5d-9c5e-8a0f3c5e8a0d', 'Diameter', '30cm'),
('f3c5e8a0-5c1a-4b5d-9c5e-8a0f3c5e8a0d', 'Bulb Type', 'E27'),
('f4c5e8a0-5c1a-4b5d-9c5e-8a0f4c5e8a0d', 'Type', 'Interior Wall Paint'),
('f4c5e8a0-5c1a-4b5d-9c5e-8a0f4c5e8a0d', 'Color', 'Desert Sand'),
('f4c5e8a0-5c1a-4b5d-9c5e-8a0f4c5e8a0d', 'Finish', 'Matte'),
('f4c5e8a0-5c1a-4b5d-9c5e-8a0f4c5e8a0d', 'Coverage', '10-12 sq.m/L'),
('f5c5e8a0-5c1a-4b5d-9c5e-8a0f5c5e8a0d', 'Material', 'Glass and Ceramic'),
('f5c5e8a0-5c1a-4b5d-9c5e-8a0f5c5e8a0d', 'Colors', 'Blue, White, Gray'),
('f5c5e8a0-5c1a-4b5d-9c5e-8a0f5c5e8a0d', 'Size', '30cm x 30cm sheets');

-- Insert sample reviews
INSERT INTO public.reviews (id, product_id, user_id, rating, title, comment, is_verified_purchase, helpful_count, created_at) VALUES
('r1c5e8a0-5c1a-4b5d-9c5e-8a0r1c5e8a0d', 'f1c5e8a0-5c1a-4b5d-9c5e-8a0f1c5e8a0d', '00000000-0000-0000-0000-000000000001', 5, 'Excellent quality and fast delivery', 'The marble tiles are absolutely stunning. The quality is top-notch and they look even better in person than in the photos. Delivery was faster than expected and everything arrived in perfect condition.', true, 12, '2023-09-15T10:00:00Z'),
('r2c5e8a0-5c1a-4b5d-9c5e-8a0r2c5e8a0d', 'f1c5e8a0-5c1a-4b5d-9c5e-8a0f1c5e8a0d', '00000000-0000-0000-0000-000000000002', 4, 'Great product, minor shipping issue', 'The tiles are beautiful and high quality. I''m very happy with my purchase. The only issue was a slight delay in shipping, but customer service was responsive and helpful.', true, 5, '2023-08-22T14:30:00Z'),
('r3c5e8a0-5c1a-4b5d-9c5e-8a0r3c5e8a0d', 'f1c5e8a0-5c1a-4b5d-9c5e-8a0f1c5e8a0d', '00000000-0000-0000-0000-000000000003', 5, 'Perfect for my renovation project', 'These tiles transformed my bathroom completely. The installation was straightforward and the result is stunning. Highly recommend for any renovation project.', true, 8, '2023-07-30T09:15:00Z'),
('r4c5e8a0-5c1a-4b5d-9c5e-8a0r4c5e8a0d', 'f1c5e8a0-5c1a-4b5d-9c5e-8a0f1c5e8a0d', '00000000-0000-0000-0000-000000000004', 3, 'Good product but expensive shipping', 'The quality of the tiles is good, but I was surprised by the high shipping cost. Also, a few tiles had minor chips on the edges. Customer service offered a partial refund which was fair.', true, 15, '2023-06-18T16:45:00Z');

-- Insert review images
INSERT INTO public.review_images (review_id, url) VALUES
('r1c5e8a0-5c1a-4b5d-9c5e-8a0r1c5e8a0d', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&q=80'),
('r1c5e8a0-5c1a-4b5d-9c5e-8a0r1c5e8a0d', 'https://images.unsplash.com/photo-1600607687920-4e4a92f082f6?w=300&q=80');

-- Insert review replies
INSERT INTO public.review_replies (review_id, user_id, user_role, comment, created_at) VALUES
('r3c5e8a0-5c1a-4b5d-9c5e-8a0r3c5e8a0d', '00000000-0000-0000-0000-000000000005', 'Seller', 'Thank you for your kind review! We''re thrilled to hear about your successful renovation project. Please share photos with us if you''d like!', '2023-08-01T10:30:00Z');
