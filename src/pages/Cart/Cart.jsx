// CSS imports-
import "./cart.css";

import { Link } from "react-router-dom";
import CartProduct from "../../components/CartProduct/CartProduct";
import CartContext from "../../providers/CartContext";
import { useContext, useEffect } from "react";
import { getProductInfo } from "../../apis/fakeStoreProdApis";
import axios from "axios";



function Cart() {
    const { cart } = useContext(CartContext);

    async function downloadCartProducts() {
        if (cart && cart.products) {
            const productsPromise = cart.products.map((product) => axios.get(getProductInfo(product.productId)))
            const productsPromiseResponse= await axios.all(productsPromise);
            // console.log(productsPromiseResponse);
        }
    }

    useEffect(() => {
        downloadCartProducts();
    }, [cart]);

    return (
        <div className="container">
            <div className="row">
                <h2 className="cart-title text-center">Your Cart</h2>

                <div className="cart-wrapper d-flex flex-row">

                    <div className="order-details d-flex flex-column" id="order-details">

                        <div className="order-details-title fw-bold">
                            Order Details
                        </div>

                        <CartProduct />
                        <CartProduct />
                        <CartProduct />
                        <CartProduct />

                    </div>


                    <div className="price-details d-flex flex-column" id="price-details">

                        <div className="price-details-box">
                            <div className="price-details-title fw-bold">Price Details</div>

                            <div className="price-details-data">
                                <div className="price-details-item d-flex flex-row justify-content-between">
                                    <div>Price</div>
                                    <div id="total-price"></div>  {/* update through js */}
                                </div>
                                <div className="price-details-item d-flex flex-row justify-content-between">
                                    <div>Discount</div>
                                    <div>$ 10</div>
                                </div>
                                <div className="price-details-item d-flex flex-row justify-content-between">
                                    <div>Delivery Charges</div>
                                    <div>FREE</div>
                                </div>
                                <div className="price-details-item d-flex flex-row justify-content-between">
                                    <div>Total</div>
                                    <div id="net-price"></div>   {/* update through js */}
                                </div>
                            </div>
                        </div>

                        <div className="price-details-button-group d-flex flex-column gap-2">
                            <Link to="/products" className="continue-shopping-btn btn btn-info text-decoration-none" > Continue Shopping </Link>

                            <Link to="/" className="checkout-btn btn btn-primary text-decoration-none" > Checkout </Link>
                        </div>

                    </div>

                </div>

            </div>
        </div>

    );
}

export default Cart;