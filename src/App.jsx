import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import About from "./pages/About";
import B2B from "./pages/B2B";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import CustomOrder from "./pages/CustomOrder";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Shop from "./pages/Shop";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:slug" element={<Product />} />
        <Route path="/custom-order" element={<CustomOrder />} />
        <Route path="/b2b" element={<B2B />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
