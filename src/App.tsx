import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PerformanceMonitor from "./components/analytics/PerformanceMonitor";
import ErrorBoundary from "./components/analytics/ErrorBoundary";
import Home from "./components/home";
import routes from "tempo-routes";
import { CartProvider } from "./components/cart/CartContext";
import { WishlistProvider } from "./components/wishlist/WishlistContext";
import { AuthProvider } from "./components/auth/AuthContext";
import { AnalyticsProvider } from "./components/analytics/AnalyticsProvider";
import { LanguageProvider } from "./contexts/LanguageContext";

// Lazy load pages for better performance
const ProductListingPage = lazy(() => import("./pages/ProductListingPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const CartPage = lazy(() => import("./components/cart/CartPage"));
const CheckoutPage = lazy(() => import("./components/checkout/CheckoutPage"));
const OrderConfirmationPage = lazy(
  () => import("./components/checkout/OrderConfirmationPage"),
);
const LoginPage = lazy(() => import("./components/auth/LoginPage"));
const RegisterPage = lazy(() => import("./components/auth/RegisterPage"));
const AccountPage = lazy(() => import("./components/account/AccountPage"));
const OrderDetailPage = lazy(
  () => import("./components/account/OrderDetailPage"),
);
const WishlistPage = lazy(() => import("./components/wishlist/WishlistPage"));

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <AnalyticsProvider>
              <ErrorBoundary>
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center min-h-screen">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                      <p className="ml-2">Loading...</p>
                    </div>
                  }
                >
                  <>
                    <PerformanceMonitor />
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route
                        path="/category/:categoryId/*"
                        element={<ProductListingPage />}
                      />
                      <Route
                        path="/products"
                        element={<ProductListingPage />}
                      />
                      <Route
                        path="/product/:productId"
                        element={<ProductDetailPage />}
                      />
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/checkout" element={<CheckoutPage />} />
                      <Route
                        path="/order-confirmation"
                        element={<OrderConfirmationPage />}
                      />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route
                        path="/account"
                        element={
                          <ProtectedRoute>
                            <AccountPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/account/orders/:orderId"
                        element={
                          <ProtectedRoute>
                            <OrderDetailPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route path="/wishlist" element={<WishlistPage />} />
                      {/* Add a catch-all route that redirects to home */}
                      <Route path="*" element={<Home />} />
                    </Routes>
                    {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
                  </>
                </Suspense>
              </ErrorBoundary>
            </AnalyticsProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
