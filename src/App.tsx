import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import { CartProvider } from "./components/cart/CartContext";

// Lazy load pages for better performance
const ProductListingPage = lazy(() => import("./pages/ProductListingPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const CartPage = lazy(() => import("./components/cart/CartPage"));
const CheckoutPage = lazy(() => import("./components/checkout/CheckoutPage"));
const OrderConfirmationPage = lazy(
  () => import("./components/checkout/OrderConfirmationPage"),
);

function App() {
  return (
    <CartProvider>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            <p className="ml-2">Loading...</p>
          </div>
        }
      >
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/category/:categoryId/*"
              element={<ProductListingPage />}
            />
            <Route path="/products" element={<ProductListingPage />} />
            <Route path="/product/:productId" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route
              path="/order-confirmation"
              element={<OrderConfirmationPage />}
            />
            {/* Add a catch-all route that redirects to home */}
            <Route path="*" element={<Home />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </CartProvider>
  );
}

export default App;
