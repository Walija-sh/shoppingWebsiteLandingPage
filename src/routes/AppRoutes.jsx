import { Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout.jsx";
import Home from "../pages/Home.jsx";
import Shop from "../pages/Shop.jsx";
import ProductDetail from "../pages/ProductDetail.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="product/:id" element={<ProductDetail />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
