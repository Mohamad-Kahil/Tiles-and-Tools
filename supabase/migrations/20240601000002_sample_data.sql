-- Insert sample data for Decor Egypt E-commerce Platform

-- Sample Categories
INSERT INTO categories (id, name, slug, description, image_url) VALUES
('11111111-1111-1111-1111-111111111111', 'Flooring', 'flooring', 'High-quality flooring options for your home', 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&q=80'),
('22222222-2222-2222-2222-222222222222', 'Wall Products', 'wall-products', 'Beautiful wall solutions for any room', 'https://images.unsplash.com/photo-1594285799171-7d185b1e8f7e?w=800&q=80'),
('33333333-3333-3333-3333-333333333333', 'Lighting', 'lighting', 'Illuminate your space with our lighting collection', 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80'),
('44444444-4444-4444-4444-444444444444', 'Decor', 'decor', 'Finishing touches to make your house a home', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80');

-- Sample Subcategories
INSERT INTO categories (name, slug, description, image_url, parent_id) VALUES
('Marble Tiles', 'marble-tiles', 'Elegant marble tiles for luxury spaces', 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80', '11111111-1111-1111-1111-111111111111'),
('Ceramic Tiles', 'ceramic-tiles', 'Durable ceramic tiles for any room', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80', '11111111-1111-1111-1111-111111111111'),
('Wooden Flooring', 'wooden-flooring', 'Classic wooden flooring options', 'https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?w=800&q=80', '11111111-1111-1111-1111-111111111111'),
('Paint', 'paint', 'Premium quality paints in various colors', 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80', '22222222-2222-2222-2222-222222222222'),
('Wallpaper', 'wallpaper', 'Stylish wallpapers to transform your walls', 'https://images.unsplash.com/photo-1628602813485-4e8b09442e98?w=800&q=80', '22222222-2222-2222-2222-222222222222'),
('Wall Panels', 'wall-panels', 'Decorative wall panels for modern homes', 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=80', '22222222-2222-2222-2222-222222222222'),
('Pendant Lights', 'pendant-lights', 'Elegant pendant lights for dining areas', 'https://images.unsplash.com/photo-1565844075130-b64295ac9a9c?w=800&q=80', '33333333-3333-3333-3333-333333333333'),
('Chandeliers', 'chandeliers', 'Luxurious chandeliers for grand spaces', 'https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?w=800&q=80', '33333333-3333-3333-3333-333333333333'),
('Wall Sconces', 'wall-sconces', 'Stylish wall sconces for ambient lighting', 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&q=80', '33333333-3333-3333-3333-333333333333'),
('Vases', 'vases', 'Decorative vases for your home', 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=800&q=80', '44444444-4444-4444-4444-444444444444'),
('Mirrors', 'mirrors', 'Elegant mirrors to enhance your space', 'https://images.unsplash.com/photo-1618220252344-8ec99ec624b1?w=800&q=80', '44444444-4444-4444-4444-444444444444'),
('Artwork', 'artwork', 'Beautiful artwork to personalize your home', 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=800&q=80', '44444444-4444-4444-4444-444444444444');

-- Sample Product Attributes
INSERT INTO product_attributes (id, name) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Color'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Material'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Size'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Weight'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Finish');

-- Sample Products
INSERT INTO products (id, name, slug, description, price, sale_price, stock_quantity, sku, is_featured, category_id) VALUES
('aaaaaaaa-1111-1111-1111-111111111111', 'Luxury Marble Flooring Tile', 'luxury-marble-flooring-tile', 'Premium quality marble flooring tile with elegant veining patterns. Perfect for luxury homes and high-end spaces.', 1299.99, 1199.99, 156, 'MRBL-001', TRUE, (SELECT id FROM categories WHERE slug = 'marble-tiles')),
('bbbbbbbb-2222-2222-2222-222222222222', 'Premium Wall Paint - Desert Sand', 'premium-wall-paint-desert-sand', 'High-quality wall paint in a warm desert sand color. Provides excellent coverage and a smooth finish.', 349.99, NULL, 85, 'PAINT-001', TRUE, (SELECT id FROM categories WHERE slug = 'paint')),
('cccccccc-3333-3333-3333-333333333333', 'Modern Pendant Light Fixture', 'modern-pendant-light-fixture', 'Contemporary pendant light fixture with adjustable height. Perfect for dining areas and kitchen islands.', 899.99, 799.99, 28, 'LIGHT-001', TRUE, (SELECT id FROM categories WHERE slug = 'pendant-lights')),
('dddddddd-4444-4444-4444-444444444444', 'Handcrafted Ceramic Vase', 'handcrafted-ceramic-vase', 'Beautiful handcrafted ceramic vase with a unique glaze finish. Each piece is one-of-a-kind.', 499.99, NULL, 42, 'VASE-001', FALSE, (SELECT id FROM categories WHERE slug = 'vases')),
('eeeeeeee-5555-5555-5555-555555555555', 'Decorative Wall Panel', 'decorative-wall-panel', '3D decorative wall panel for creating stunning accent walls. Easy to install and paintable.', 799.99, 699.99, 15, 'PANEL-001', TRUE, (SELECT id FROM categories WHERE slug = 'wall-panels')),
('ffffffff-6666-6666-6666-666666666666', 'Engineered Hardwood Flooring', 'engineered-hardwood-flooring', 'Premium engineered hardwood flooring with a natural oak finish. Durable and easy to maintain.', 1099.99, 999.99, 87, 'WOOD-001', FALSE, (SELECT id FROM categories WHERE slug = 'wooden-flooring')),
('gggggggg-7777-7777-7777-777777777777', 'Crystal Chandelier', 'crystal-chandelier', 'Elegant crystal chandelier with chrome finish. Creates a stunning focal point for dining rooms and entryways.', 2499.99, 2299.99, 12, 'CHAND-001', TRUE, (SELECT id FROM categories WHERE slug = 'chandeliers')),
('hhhhhhhh-8888-8888-8888-888888888888', 'Designer Wallpaper - Geometric Pattern', 'designer-wallpaper-geometric', 'Modern geometric pattern wallpaper in contemporary colors. Easy to apply and remove.', 249.99, NULL, 65, 'WALL-001', FALSE, (SELECT id FROM categories WHERE slug = 'wallpaper')),
('iiiiiiii-9999-9999-9999-999999999999', 'Decorative Wall Mirror', 'decorative-wall-mirror', 'Round decorative wall mirror with a gold metal frame. Adds elegance and the illusion of space.', 699.99, 599.99, 32, 'MIRR-001', TRUE, (SELECT id FROM categories WHERE slug = 'mirrors')),
('jjjjjjjj-0000-0000-0000-000000000000', 'Ceramic Floor Tile - Marble Look', 'ceramic-floor-tile-marble-look', 'Ceramic floor tile with a realistic marble look. More affordable and easier to maintain than real marble.', 599.99, 549.99, 120, 'TILE-001', FALSE, (SELECT id FROM categories WHERE slug = 'ceramic-tiles'));

-- Sample Product Images
INSERT INTO product_images (product_id, image_url, alt_text, is_primary, display_order) VALUES
('aaaaaaaa-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80', 'Luxury Marble Flooring Tile - Main View', TRUE, 1),
('aaaaaaaa-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1600607687644-c3f0898e0f79?w=800&q=80', 'Luxury Marble Flooring Tile - Detail View', FALSE, 2),
('aaaaaaaa-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80', 'Luxury Marble Flooring Tile - Room Setting', FALSE, 3),
('bbbbbbbb-2222-2222-2222-222222222222', 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80', 'Premium Wall Paint - Desert Sand - Main View', TRUE, 1),
('bbbbbbbb-2222-2222-2222-222222222222', 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80', 'Premium Wall Paint - Desert Sand - Applied', FALSE, 2),
('cccccccc-3333-3333-3333-333333333333', 'https://images.unsplash.com/photo-1565844075130-b64295ac9a9c?w=800&q=80', 'Modern Pendant Light Fixture - Main View', TRUE, 1),
('cccccccc-3333-3333-3333-333333333333', 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&q=80', 'Modern Pendant Light Fixture - Room Setting', FALSE, 2),
('dddddddd-4444-4444-4444-444444444444', 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=800&q=80', 'Handcrafted Ceramic Vase - Main View', TRUE, 1),
('eeeeeeee-5555-5555-5555-555555555555', 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=80', 'Decorative Wall Panel - Main View', TRUE, 1),
('eeeeeeee-5555-5555-5555-555555555555', 'https://images.unsplash.com/photo-1620626011841-5c7e2c76d67e?w=800&q=80', 'Decorative Wall Panel - Room Setting', FALSE, 2);

-- Sample Product Attribute Values
INSERT INTO product_attribute_values (product_id, attribute_id, value) VALUES
('aaaaaaaa-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'White with Grey Veining'),
('aaaaaaaa-1111-1111-1111-111111111111', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Natural Marble'),
('aaaaaaaa-1111-1111-1111-111111111111', 'cccccccc-cccc-cccc-cccc-cccccccccccc', '60cm x 60cm'),
('bbbbbbbb-2222-2222-2222-222222222222', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Desert Sand'),
('bbbbbbbb-2222-2222-2222-222222222222', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Matte'),
('cccccccc-3333-3333-3333-333333333333', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Black'),
('cccccccc-3333-3333-3333-333333333333', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Metal and Glass'),
('dddddddd-4444-4444-4444-444444444444', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Blue'),
('dddddddd-4444-4444-4444-444444444444', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Ceramic'),
('dddddddd-4444-4444-4444-444444444444', 'cccccccc-cccc-cccc-cccc-cccccccccccc', '30cm Height');

-- Sample Promotions
INSERT INTO promotions (name, description, discount_type, discount_value, code, minimum_order_amount, start_date, end_date, is_active, usage_limit) VALUES
('Summer Sale', 'Get 25% off your entire order', 'percentage', 25, 'SUMMER25', 1000, NOW(), NOW() + INTERVAL '30 days', TRUE, 500),
('New Customer Discount', 'Welcome discount for new customers', 'percentage', 15, 'WELCOME15', 500, NOW(), NOW() + INTERVAL '90 days', TRUE, 1000),
('Free Shipping', 'Free shipping on orders over EGP 1500', 'free_shipping', 0, 'FREESHIP', 1500, NOW(), NOW() + INTERVAL '30 days', TRUE, 300);
