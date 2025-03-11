-- Create functions for Decor Egypt E-commerce Platform

-- Function to update product stock when an order is placed
CREATE OR REPLACE FUNCTION update_product_stock()
RETURNS TRIGGER AS $$
BEGIN
  -- Decrease stock quantity for each product in the order
  UPDATE products
  SET stock_quantity = stock_quantity - NEW.quantity
  WHERE id = NEW.product_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update stock when order items are inserted
CREATE TRIGGER update_stock_on_order
AFTER INSERT ON order_items
FOR EACH ROW
EXECUTE FUNCTION update_product_stock();

-- Function to update promotion usage count
CREATE OR REPLACE FUNCTION update_promotion_usage()
RETURNS TRIGGER AS $$
BEGIN
  -- If the order has a promotion code, update its usage count
  IF NEW.notes LIKE '%PROMO:%' THEN
    UPDATE promotions
    SET usage_count = usage_count + 1
    WHERE code = (SELECT substring(NEW.notes from 'PROMO:([A-Z0-9]+)'));
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update promotion usage when orders are inserted
CREATE TRIGGER update_promotion_on_order
AFTER INSERT ON orders
FOR EACH ROW
EXECUTE FUNCTION update_promotion_usage();

-- Function to check if a product is in stock
CREATE OR REPLACE FUNCTION is_product_in_stock(product_id UUID, quantity INTEGER)
RETURNS BOOLEAN AS $$
DECLARE
  available INTEGER;
BEGIN
  SELECT stock_quantity INTO available FROM products WHERE id = product_id;
  RETURN available >= quantity;
END;
$$ LANGUAGE plpgsql;

-- Function to get active promotions
CREATE OR REPLACE FUNCTION get_active_promotions()
RETURNS SETOF promotions AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM promotions
  WHERE is_active = TRUE
  AND NOW() BETWEEN start_date AND end_date
  AND (usage_limit IS NULL OR usage_count < usage_limit);
END;
$$ LANGUAGE plpgsql;

-- Function to calculate order total with promotion
CREATE OR REPLACE FUNCTION calculate_order_total(
  items JSON,
  promotion_code TEXT DEFAULT NULL
)
RETURNS TABLE (
  subtotal DECIMAL(10,2),
  discount DECIMAL(10,2),
  shipping DECIMAL(10,2),
  total DECIMAL(10,2)
) AS $$
DECLARE
  item JSON;
  item_total DECIMAL(10,2);
  sub_total DECIMAL(10,2) := 0;
  discount_amount DECIMAL(10,2) := 0;
  shipping_cost DECIMAL(10,2) := 50; -- Default shipping cost
  promo RECORD;
BEGIN
  -- Calculate subtotal from items
  FOR item IN SELECT * FROM json_array_elements(items)
  LOOP
    item_total := (item->>'price')::DECIMAL(10,2) * (item->>'quantity')::INTEGER;
    sub_total := sub_total + item_total;
  END LOOP;
  
  -- Apply promotion if provided
  IF promotion_code IS NOT NULL THEN
    SELECT * INTO promo FROM promotions 
    WHERE code = promotion_code 
    AND is_active = TRUE
    AND NOW() BETWEEN start_date AND end_date
    AND (usage_limit IS NULL OR usage_count < usage_limit);
    
    IF FOUND THEN
      -- Check minimum order amount
      IF sub_total >= promo.minimum_order_amount THEN
        -- Calculate discount based on type
        IF promo.discount_type = 'percentage' THEN
          discount_amount := (sub_total * promo.discount_value / 100);
        ELSIF promo.discount_type = 'fixed_amount' THEN
          discount_amount := promo.discount_value;
        ELSIF promo.discount_type = 'free_shipping' THEN
          shipping_cost := 0;
        END IF;
      END IF;
    END IF;
  END IF;
  
  -- Ensure discount doesn't exceed subtotal
  IF discount_amount > sub_total THEN
    discount_amount := sub_total;
  END IF;
  
  -- Return calculated values
  subtotal := sub_total;
  discount := discount_amount;
  shipping := shipping_cost;
  total := sub_total - discount_amount + shipping_cost;
  
  RETURN NEXT;
  RETURN;
END;
$$ LANGUAGE plpgsql;
