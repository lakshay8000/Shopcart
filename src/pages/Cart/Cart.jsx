import "./cart.css";

import axios from "axios";
import { useContext } from "react";
import { Link } from "react-router-dom";

import { updateProductInCart } from "../../apis/fakeStoreProdApis";
import CartProduct from "../../components/CartProduct/CartProduct";
import useCartPriceSetter from "../../hooks/useCartPriceSetter";
import useDownloadCartProducts from "../../hooks/useDownloadCartProducts";
import UserContext from "../../providers/UserContext";


function Cart() {
    const [setCart, products] = useDownloadCartProducts();
    const [totalPrice, netPrice] = useCartPriceSetter(products);
    const { user } = useContext(UserContext);

    // we are calling this function via remove button-
    async function removeProduct(productId) {
        const response = await axios.put(updateProductInCart(), {
            userId: user.userId,
            productId: productId,
            quantity: 0
        });
        setCart({ ...response.data });
    }

    async function onChangeQuantity(changedQuantity, productId) {
        console.log(changedQuantity, productId);
        const response = await axios.put(updateProductInCart(), {
            userId: user.userId,
            productId: productId,
            quantity: changedQuantity
        }, {withCredentials : true} );
        setCart({ ...response.data });
    }


    return (
        <div className="container">
            <div className="row">
                <h2 className="cart-title text-center">Your Cart</h2>

                <div className="cart-wrapper">
                    <div className="order-details d-flex flex-column" id="order-details">
                        <div className="order-details-title fw-bold">
                            Order Details
                        </div>
                        {
                            (products.length > 0) &&
                            (
                                products.map((product) => <CartProduct
                                    key={product.id}
                                    title={product.title}
                                    image={product.image}
                                    price={product.price}
                                    quantity={product.quantity}
                                    onRemove={() => removeProduct(product.id)}
                                    changeQuantity={(changedQuantity) => onChangeQuantity(changedQuantity, product.id)}
                                />)
                            )
                        }
                    </div>

                    <div className="price-details d-flex flex-column" id="price-details">

                        <div className="price-details-box">
                            <div className="price-details-title fw-bold">Price Details</div>

                            <div className="price-details-data">
                                <div className="price-details-item d-flex flex-row justify-content-between">
                                    <div>Price</div>
                                    <div id="total-price">$ {totalPrice}</div>
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
                                    <div>Total (rounded)</div>
                                    <div id="net-price">$ {(totalPrice == 0) ? 0 : netPrice}</div>
                                </div>
                            </div>
                        </div>

                        <div className="price-details-button-group d-flex flex-column gap-2">
                            <Link to="/products?category=All%20Products" className="continue-shopping-btn btn btn-info text-decoration-none" > Continue Shopping </Link>

                            <Link to="/" className="checkout-btn btn btn-primary text-decoration-none" > Checkout </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;