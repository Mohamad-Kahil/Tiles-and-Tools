-- Add test users
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES 
('d0d8d9e9-0a1b-4c2d-8e3f-4f5g6h7i8j9k', 'admin@decoregypt.com', '$2a$10$abcdefghijklmnopqrstuvwxyz0123456789', NOW(), NOW(), NOW()),
('a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', 'customer@example.com', '$2a$10$abcdefghijklmnopqrstuvwxyz0123456789', NOW(), NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Add user profiles
INSERT INTO public.users (id, first_name, last_name, email, phone, role, created_at, updated_at)
VALUES 
('d0d8d9e9-0a1b-4c2d-8e3f-4f5g6h7i8j9k', 'Admin', 'User', 'admin@decoregypt.com', '+201234567890', 'admin', NOW(), NOW()),
('a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', 'Mohamed', 'Kahil', 'customer@example.com', '+201098765432', 'customer', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Add product categories
INSERT INTO public.categories (id, name, slug, description, image_url, parent_id, is_active, created_at, updated_at)
VALUES 
('cat-floor-001', 'Flooring', 'flooring', 'High-quality flooring solutions for your home', 'https://images.unsplash.com/photo-1581430872221-d2a064b92e17?w=800&q=80', NULL, true, NOW(), NOW()),
('cat-wall-001', 'Wall Products', 'wall-products', 'Beautiful wall solutions to enhance your space', 'https://images.unsplash.com/photo-1562184552-997c461abbe6?w=800&q=80', NULL, true, NOW(), NOW()),
('cat-light-001', 'Lighting', 'lighting', 'Modern lighting fixtures for every room', 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=800&q=80', NULL, true, NOW(), NOW()),
('cat-bath-001', 'Bathroom', 'bathroom', 'Complete your bathroom with our premium products', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80', NULL, true, NOW(), NOW()),
('cat-kitchen-001', 'Kitchen', 'kitchen', 'Transform your kitchen with our stylish products', 'https://images.unsplash.com/photo-1556911220-bda9f7f7597e?w=800&q=80', NULL, true, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Add subcategories
INSERT INTO public.categories (id, name, slug, description, image_url, parent_id, is_active, created_at, updated_at)
VALUES 
('cat-floor-tile-001', 'Ceramic Tiles', 'ceramic-tiles', 'Durable ceramic tiles for any room', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&q=80', 'cat-floor-001', true, NOW(), NOW()),
('cat-floor-wood-001', 'Wooden Flooring', 'wooden-flooring', 'Natural wooden flooring options', 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=500&q=80', 'cat-floor-001', true, NOW(), NOW()),
('cat-wall-paint-001', 'Wall Paint', 'wall-paint', 'Premium quality wall paints', 'https://images.unsplash.com/photo-1562184552-997c461abbe6?w=500&q=80', 'cat-wall-001', true, NOW(), NOW()),
('cat-wall-paper-001', 'Wallpaper', 'wallpaper', 'Decorative wallpapers for your home', 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=500&q=80', 'cat-wall-001', true, NOW(), NOW()),
('cat-light-pend-001', 'Pendant Lights', 'pendant-lights', 'Elegant pendant lighting fixtures', 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&q=80', 'cat-light-001', true, NOW(), NOW()),
('cat-light-wall-001', 'Wall Sconces', 'wall-sconces', 'Stylish wall mounted lighting', 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80', 'cat-light-001', true, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Add products
INSERT INTO public.products (id, name, slug, description, price, sale_price, stock_quantity, sku, category_id, is_featured, is_active, created_at, updated_at)
VALUES 
-- Flooring Products
('prod-001', 'Luxury Marble Flooring Tile', 'luxury-marble-flooring-tile', 'Premium quality marble tiles imported from Italy. Perfect for living rooms and entryways.', 1299.99, 1199.99, 50, 'FLR-MRB-001', 'cat-floor-tile-001', true, true, NOW(), NOW()),
('prod-002', 'Engineered Hardwood Flooring', 'engineered-hardwood-flooring', 'Durable engineered hardwood with natural oak finish. Easy installation with click-lock system.', 1599.99, NULL, 35, 'FLR-WD-001', 'cat-floor-wood-001', true, true, NOW(), NOW()),
('prod-003', 'Porcelain Floor Tiles - Beige', 'porcelain-floor-tiles-beige', 'High-quality porcelain tiles with a natural stone look. Resistant to scratches and stains.', 899.99, 849.99, 100, 'FLR-PRC-001', 'cat-floor-tile-001', false, true, NOW(), NOW()),
('prod-004', 'Bamboo Flooring Planks', 'bamboo-flooring-planks', 'Eco-friendly bamboo flooring with a beautiful natural grain. Sustainable and durable.', 1299.99, NULL, 25, 'FLR-WD-002', 'cat-floor-wood-001', false, true, NOW(), NOW()),

-- Wall Products
('prod-005', 'Premium Wall Paint - Desert Sand', 'premium-wall-paint-desert-sand', 'High-quality interior wall paint with a smooth matte finish. Low VOC and excellent coverage.', 349.99, NULL, 75, 'WL-PNT-001', 'cat-wall-paint-001', true, true, NOW(), NOW()),
('prod-006', 'Decorative Wallpaper - Floral Pattern', 'decorative-wallpaper-floral-pattern', 'Elegant floral pattern wallpaper that adds a touch of sophistication to any room.', 799.99, 699.99, 40, 'WL-PPR-001', 'cat-wall-paper-001', true, true, NOW(), NOW()),
('prod-007', 'Textured Wall Paint - Rustic Charm', 'textured-wall-paint-rustic-charm', 'Create a textured finish with this specialty wall paint. Perfect for accent walls.', 499.99, NULL, 60, 'WL-PNT-002', 'cat-wall-paint-001', false, true, NOW(), NOW()),
('prod-008', 'Geometric Wallpaper - Modern Design', 'geometric-wallpaper-modern-design', 'Contemporary geometric pattern wallpaper for a bold, modern look.', 899.99, 849.99, 30, 'WL-PPR-002', 'cat-wall-paper-001', false, true, NOW(), NOW()),

-- Lighting Products
('prod-009', 'Modern Pendant Light Fixture', 'modern-pendant-light-fixture', 'Sleek, contemporary pendant light with adjustable height. Perfect for dining areas.', 899.99, 799.99, 20, 'LT-PND-001', 'cat-light-pend-001', true, true, NOW(), NOW()),
('prod-010', 'Minimalist Wall Sconce', 'minimalist-wall-sconce', 'Clean, minimalist wall sconce with warm LED lighting. Energy efficient and stylish.', 459.99, NULL, 45, 'LT-WL-001', 'cat-light-wall-001', true, true, NOW(), NOW()),
('prod-011', 'Crystal Chandelier Pendant Light', 'crystal-chandelier-pendant-light', 'Elegant crystal chandelier that adds luxury to any space. Perfect for entryways and dining rooms.', 2499.99, 2299.99, 10, 'LT-PND-002', 'cat-light-pend-001', false, true, NOW(), NOW()),
('prod-012', 'Industrial Wall Light Fixture', 'industrial-wall-light-fixture', 'Vintage-inspired industrial wall light with exposed bulb design. Adds character to any room.', 599.99, NULL, 30, 'LT-WL-002', 'cat-light-wall-001', false, true, NOW(), NOW()),

-- Bathroom Products
('prod-013', 'Modern Bathroom Vanity Set', 'modern-bathroom-vanity-set', 'Complete bathroom vanity set with sink, cabinet, and mirror. Contemporary design with ample storage.', 3999.99, 3699.99, 15, 'BTH-VNT-001', 'cat-bath-001', true, true, NOW(), NOW()),
('prod-014', 'Rainfall Shower Head System', 'rainfall-shower-head-system', 'Luxury rainfall shower system with handheld sprayer. Easy installation and water-saving features.', 1299.99, NULL, 25, 'BTH-SHW-001', 'cat-bath-001', true, true, NOW(), NOW()),

-- Kitchen Products
('prod-015', 'Granite Kitchen Countertop', 'granite-kitchen-countertop', 'Premium granite countertop with natural stone patterns. Durable and heat-resistant.', 4999.99, 4499.99, 10, 'KTH-CNT-001', 'cat-kitchen-001', true, true, NOW(), NOW()),
('prod-016', 'Modern Kitchen Faucet', 'modern-kitchen-faucet', 'Sleek, pull-down kitchen faucet with spot-resistant stainless steel finish.', 899.99, 799.99, 35, 'KTH-FXT-001', 'cat-kitchen-001', true, true, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Add product images
INSERT INTO public.product_images (id, product_id, image_url, is_primary, display_order, created_at, updated_at)
VALUES 
-- Flooring Product Images
('img-001', 'prod-001', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&q=80', true, 1, NOW(), NOW()),
('img-002', 'prod-001', 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=500&q=80', false, 2, NOW(), NOW()),
('img-003', 'prod-002', 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=500&q=80', true, 1, NOW(), NOW()),
('img-004', 'prod-002', 'https://images.unsplash.com/photo-1562184552-997c461abbe6?w=500&q=80', false, 2, NOW(), NOW()),
('img-005', 'prod-003', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&q=80', true, 1, NOW(), NOW()),
('img-006', 'prod-004', 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=500&q=80', true, 1, NOW(), NOW()),

-- Wall Product Images
('img-007', 'prod-005', 'https://images.unsplash.com/photo-1562184552-997c461abbe6?w=500&q=80', true, 1, NOW(), NOW()),
('img-008', 'prod-005', 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=500&q=80', false, 2, NOW(), NOW()),
('img-009', 'prod-006', 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=500&q=80', true, 1, NOW(), NOW()),
('img-010', 'prod-006', 'https://images.unsplash.com/photo-1562184552-997c461abbe6?w=500&q=80', false, 2, NOW(), NOW()),
('img-011', 'prod-007', 'https://images.unsplash.com/photo-1562184552-997c461abbe6?w=500&q=80', true, 1, NOW(), NOW()),
('img-012', 'prod-008', 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=500&q=80', true, 1, NOW(), NOW()),

-- Lighting Product Images
('img-013', 'prod-009', 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&q=80', true, 1, NOW(), NOW()),
('img-014', 'prod-009', 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80', false, 2, NOW(), NOW()),
('img-015', 'prod-010', 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80', true, 1, NOW(), NOW()),
('img-016', 'prod-010', 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&q=80', false, 2, NOW(), NOW()),
('img-017', 'prod-011', 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&q=80', true, 1, NOW(), NOW()),
('img-018', 'prod-012', 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80', true, 1, NOW(), NOW()),

-- Bathroom Product Images
('img-019', 'prod-013', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&q=80', true, 1, NOW(), NOW()),
('img-020', 'prod-014', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&q=80', true, 1, NOW(), NOW()),

-- Kitchen Product Images
('img-021', 'prod-015', 'https://images.unsplash.com/photo-1556911220-bda9f7f7597e?w=500&q=80', true, 1, NOW(), NOW()),
('img-022', 'prod-016', 'https://images.unsplash.com/photo-1556911220-bda9f7f7597e?w=500&q=80', true, 1, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Add product specifications
INSERT INTO public.product_specifications (id, product_id, name, value, created_at, updated_at)
VALUES 
-- Flooring Product Specs
('spec-001', 'prod-001', 'Material', 'Marble', NOW(), NOW()),
('spec-002', 'prod-001', 'Dimensions', '60cm x 60cm', NOW(), NOW()),
('spec-003', 'prod-001', 'Thickness', '12mm', NOW(), NOW()),
('spec-004', 'prod-001', 'Color', 'White with Gray Veins', NOW(), NOW()),
('spec-005', 'prod-001', 'Finish', 'Polished', NOW(), NOW()),
('spec-006', 'prod-002', 'Material', 'Engineered Hardwood', NOW(), NOW()),
('spec-007', 'prod-002', 'Dimensions', '120cm x 15cm', NOW(), NOW()),
('spec-008', 'prod-002', 'Thickness', '14mm', NOW(), NOW()),
('spec-009', 'prod-002', 'Color', 'Natural Oak', NOW(), NOW()),
('spec-010', 'prod-002', 'Installation', 'Click-Lock System', NOW(), NOW()),

-- Wall Product Specs
('spec-011', 'prod-005', 'Type', 'Interior Wall Paint', NOW(), NOW()),
('spec-012', 'prod-005', 'Finish', 'Matte', NOW(), NOW()),
('spec-013', 'prod-005', 'Coverage', '10-12 sq.m/L', NOW(), NOW()),
('spec-014', 'prod-005', 'Drying Time', '2-4 hours', NOW(), NOW()),
('spec-015', 'prod-005', 'VOC Content', 'Low VOC', NOW(), NOW()),
('spec-016', 'prod-006', 'Material', 'Non-woven Paper', NOW(), NOW()),
('spec-017', 'prod-006', 'Dimensions', '53cm x 10m', NOW(), NOW()),
('spec-018', 'prod-006', 'Pattern Repeat', '64cm', NOW(), NOW()),
('spec-019', 'prod-006', 'Washability', 'Washable', NOW(), NOW()),
('spec-020', 'prod-006', 'Application', 'Paste the Wall', NOW(), NOW()),

-- Lighting Product Specs
('spec-021', 'prod-009', 'Material', 'Metal and Glass', NOW(), NOW()),
('spec-022', 'prod-009', 'Dimensions', '30cm diameter', NOW(), NOW()),
('spec-023', 'prod-009', 'Bulb Type', 'E27', NOW(), NOW()),
('spec-024', 'prod-009', 'Max Wattage', '60W', NOW(), NOW()),
('spec-025', 'prod-009', 'Adjustable Height', 'Yes, 50-150cm', NOW(), NOW()),
('spec-026', 'prod-010', 'Material', 'Metal', NOW(), NOW()),
('spec-027', 'prod-010', 'Dimensions', '15cm x 10cm x 20cm', NOW(), NOW()),
('spec-028', 'prod-010', 'Bulb Type', 'LED Integrated', NOW(), NOW()),
('spec-029', 'prod-010', 'Wattage', '12W', NOW(), NOW()),
('spec-030', 'prod-010', 'Color Temperature', '3000K Warm White', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Add orders
INSERT INTO public.orders (id, user_id, status, subtotal, shipping, discount, total, shipping_address, shipping_city, shipping_state, shipping_postal_code, shipping_country, shipping_method, payment_method, notes, created_at, updated_at)
VALUES 
('ord-001', 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', 'completed', 2899.98, 100, 0, 2999.98, '123 Main St, Apt 4', 'Cairo', 'Cairo', '12345', 'Egypt', 'standard', 'credit_card', NULL, NOW() - INTERVAL '30 days', NOW() - INTERVAL '28 days'),
('ord-002', 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', 'processing', 1599.99, 0, 0, 1599.99, '123 Main St, Apt 4', 'Cairo', 'Cairo', '12345', 'Egypt', 'express', 'cash_on_delivery', 'Please call before delivery', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
('ord-003', 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', 'shipped', 899.99, 100, 0, 999.99, '123 Main St, Apt 4', 'Cairo', 'Cairo', '12345', 'Egypt', 'standard', 'fawry', NULL, NOW() - INTERVAL '10 days', NOW() - INTERVAL '8 days')
ON CONFLICT (id) DO NOTHING;

-- Add order items
INSERT INTO public.order_items (id, order_id, product_id, quantity, price, total, created_at, updated_at)
VALUES 
('item-001', 'ord-001', 'prod-001', 2, 1199.99, 2399.98, NOW() - INTERVAL '30 days', NOW() - INTERVAL '30 days'),
('item-002', 'ord-001', 'prod-005', 1, 349.99, 349.99, NOW() - INTERVAL '30 days', NOW() - INTERVAL '30 days'),
('item-003', 'ord-001', 'prod-010', 1, 459.99, 459.99, NOW() - INTERVAL '30 days', NOW() - INTERVAL '30 days'),
('item-004', 'ord-002', 'prod-002', 1, 1599.99, 1599.99, NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
('item-005', 'ord-003', 'prod-009', 1, 799.99, 799.99, NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days')
ON CONFLICT (id) DO NOTHING;

-- Add promotions
INSERT INTO public.promotions (id, name, description, discount_type, discount_value, code, minimum_order_amount, start_date, end_date, usage_limit, usage_count, is_active, created_at, updated_at)
VALUES 
('promo-001', 'Summer Sale', '15% off on all products', 'percentage', 15, 'SUMMER15', 1000, NOW() - INTERVAL '30 days', NOW() + INTERVAL '60 days', 100, 45, true, NOW() - INTERVAL '30 days', NOW()),
('promo-002', 'Free Shipping', 'Free shipping on orders over 3000 EGP', 'free_shipping', 0, 'FREESHIP', 3000, NOW() - INTERVAL '15 days', NOW() + INTERVAL '45 days', 50, 12, true, NOW() - INTERVAL '15 days', NOW()),
('promo-003', 'New Customer', '500 EGP off your first order', 'fixed_amount', 500, 'WELCOME500', 2000, NOW() - INTERVAL '60 days', NOW() + INTERVAL '30 days', 200, 87, true, NOW() - INTERVAL '60 days', NOW())
ON CONFLICT (id) DO NOTHING;

-- Add reviews
INSERT INTO public.product_reviews (id, product_id, user_id, rating, title, content, is_verified_purchase, is_approved, created_at, updated_at)
VALUES 
('review-001', 'prod-001', 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', 5, 'Excellent Quality', 'The marble tiles are absolutely beautiful and exactly as described. Installation was easy and they look stunning in my entryway.', true, true, NOW() - INTERVAL '25 days', NOW() - INTERVAL '25 days'),
('review-002', 'prod-002', 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', 4, 'Great Flooring', 'The hardwood looks fantastic in our living room. Durable and easy to clean. Only giving 4 stars because installation was a bit tricky.', true, true, NOW() - INTERVAL '15 days', NOW() - INTERVAL '15 days'),
('review-003', 'prod-005', 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', 5, 'Perfect Color', 'The Desert Sand color is exactly what I was looking for. Great coverage with just one coat!', true, true, NOW() - INTERVAL '20 days', NOW() - INTERVAL '20 days'),
('review-004', 'prod-009', 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', 5, 'Stunning Light Fixture', 'This pendant light transformed our dining area. It looks much more expensive than it is!', true, true, NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days')
ON CONFLICT (id) DO NOTHING;

-- Add wishlist items
INSERT INTO public.wishlist_items (id, user_id, product_id, created_at, updated_at)
VALUES 
('wish-001', 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', 'prod-003', NOW() - INTERVAL '40 days', NOW() - INTERVAL '40 days'),
('wish-002', 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', 'prod-006', NOW() - INTERVAL '35 days', NOW() - INTERVAL '35 days'),
('wish-003', 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', 'prod-011', NOW() - INTERVAL '20 days', NOW() - INTERVAL '20 days')
ON CONFLICT (id) DO NOTHING;

-- Add cart items
INSERT INTO public.cart_items (id, user_id, product_id, quantity, created_at, updated_at)
VALUES 
('cart-001', 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', 'prod-004', 1, NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
('cart-002', 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', 'prod-010', 2, NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day')
ON CONFLICT (id) DO NOTHING;

-- Enable realtime for key tables
ALTER PUBLICATION supabase_realtime ADD TABLE products;
ALTER PUBLICATION supabase_realtime ADD TABLE categories;
ALTER PUBLICATION supabase_realtime ADD TABLE orders;
ALTER PUBLICATION supabase_realtime ADD TABLE order_items;
ALTER PUBLICATION supabase_realtime ADD TABLE cart_items;
ALTER PUBLICATION supabase_realtime ADD TABLE wishlist_items;
