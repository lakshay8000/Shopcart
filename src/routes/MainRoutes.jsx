import {Routes, Route} from "react-router-dom";
import Home from "../pages/Home/Home";
import Error from "../pages/Error/Error";
import ProductList from "../pages/ProductList/ProductList";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Cart from "../pages/Cart/Cart";

function MainRoutes() {
    return (
        <Routes>
            <Route path= "/" element= {<Home />} />
            <Route path= "/products" element= {<ProductList />} />
            <Route path= "/products/:id" element= {<ProductDetails />} />
            <Route path= "/login" element= {<Login />} />
            <Route path= "/signup" element= {<Signup />} />
            <Route path= "/cart/:userId" element= {<Cart />} />
            <Route path= "*" element= {<Error />} />
        </Routes>
    )
}

export default MainRoutes;