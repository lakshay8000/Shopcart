import { Route, Routes } from "react-router-dom";

import Cart from "../pages/Cart/Cart";
import Error from "../pages/Error/Error";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import ProductList from "../pages/ProductList/ProductList";
import Signup from "../pages/Signup/Signup";

function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart/:userId" element={<Cart />} />
            <Route path="*" element={<Error />} />
        </Routes>
    );
}

export default MainRoutes;