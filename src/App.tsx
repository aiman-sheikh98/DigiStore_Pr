import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { NotificationProvider } from "@/context/NotificationContext";
import Index from "./pages/Index";
import ProductsPage from "./pages/ProductsPage";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import SupportPage from "./pages/SupportPage";
import NotFound from "./pages/NotFound";
import CategoriesPage from "./pages/CategoriesPage";
import AuthPage from "./pages/AuthPage";
import WishlistPage from "./pages/WishlistPage";
import ProfilePage from "./pages/ProfilePage";
import PaymentSuccess from "./pages/PaymentSuccess";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <NotificationProvider>
            <CartProvider>
              <WishlistProvider>
                <Toaster />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/support" element={<SupportPage />} />
                  <Route path="/categories" element={<CategoriesPage />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/payment-success" element={<PaymentSuccess />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </WishlistProvider>
            </CartProvider>
          </NotificationProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
