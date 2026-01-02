import { BrowserRouter, Route, Routes } from "react-router-dom";
import DasboardLayout from "./layouts/DasboardLayout";
import Index from "./views/dashboard/Index";
import ProductsView from "./views/dashboard/ProductsView";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import SettingsLayout from "./layouts/SettingsLayout";
import GeneralView from "./views/dashboard/settings/GeneralView";
import ProfileView from "./views/dashboard/settings/ProfileView";
import ImageProfileView from "./views/dashboard/settings/ImageProfileView";
import DeleteAccountView from "./views/dashboard/settings/DeleteAccountView";
import RequireRoles from "./middleware/RequireRoles";
import IndexLayout from "./layouts/IndexLayout";
import IndexMainView from "./views/IndexMainView";
import SearchView from "./views/Shop/SearchView";
import DetailsProductView from "./views/Shop/DetailsProductView";
import CartItemsView from "./views/Shop/CartItemsView";
import CreditAccountView from "./views/dashboard/settings/CreditAccountView";
import OrdersView from "./views/dashboard/OrdersView";
import ChatView from "./views/dashboard/ChatView";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexLayout />}>
          <Route index element={<IndexMainView />} />
          <Route path="/search/:word" element={<SearchView />} />
          <Route path="shop">
            <Route path="product/:id" element={<DetailsProductView />} />
            <Route path="my-cart" element={<CartItemsView />} />
          </Route>
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" index element={<LoginView />} />
          <Route path="register" index element={<RegisterView />} />
        </Route>
        <Route path="/dashboard" element={<DasboardLayout />}>
          <Route index element={<Index />} />
          <Route element={<RequireRoles roles={["seller"]} />}>
            <Route path="products" element={<ProductsView />} />
            <Route path="orders" element={<OrdersView />} />
          </Route>
           <Route path="customers" element={<ChatView />} />

          {/* Settings Section */}
          <Route path="settings" element={<SettingsLayout />}>
            <Route index element={<GeneralView />} />
            <Route path="profile" element={<ProfileView />} />
            <Route path="image-profile" element={<ImageProfileView />} />
            <Route path="credit-account" element={<CreditAccountView />} />
            <Route path="delete-account" element={<DeleteAccountView />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
