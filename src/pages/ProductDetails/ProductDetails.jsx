import "./productDetails.css";

import axios from "axios";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { addProductToCart } from "../../apis/fakeStoreProdApis";
import useDownloadProductDetails from "../../hooks/usedownloadProductDetails";
import CartContext from "../../providers/CartContext";
import UserContext from "../../providers/UserContext";


function ProductDetails() {
    const [productInfo] = useDownloadProductDetails();
    const { productId } = useParams();
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const { setCart } = useContext(CartContext);

    async function handleAddToCart() {
        try {
            if (user) {
                const response = await axios.put(addProductToCart(), {
                    userId: user.userId,
                    productId: productId
                }, { withCredentials: true });
                setCart({ ...response.data });
                toast.success("Added product to cart", {
                    autoClose: 1500
                });
            }
            else {
                toast.error("Please log in to add products in cart", {
                    autoClose: 1500
                });
            }
        }
        catch (error) {
            console.log(error.message);
        }
    }


    return (
        <div className="container">
            {
                productInfo &&
                (
                    <div className="product-details-wrapper gap-3">

                        <div className="product-details-img-wrapper d-flex justify-content-center">
                            <img id="product-details-img" src={productInfo.image} alt="product-image" />
                        </div>

                        <div className="product-detail-box d-flex flex-column">
                            <div id="product-details">
                                <div className="product-details-name" id="product-details-name">
                                    {productInfo.title}
                                </div>

                                <div className="product-details-price fw-bold" id="product-details-price">
                                    {productInfo.price} $
                                </div>

                                <div className="product-description-title fw-bold" id="product-description-title">
                                    Description
                                </div>

                                <div className="product-description" id="product-description">
                                    {productInfo.description}
                                </div>
                            </div>

                            <div className="product-action">
                                <div
                                    className="product-details-action btn btn-primary text-decoration-none"
                                    id="add-to-cart-button"
                                    onClick={handleAddToCart}
                                >
                                    Add to Cart
                                </div>

                                <div
                                    className="product-details-action btn btn-warning text-decoration-none"
                                    id="go-to-cart-button"
                                    onClick={() => {
                                        if (user) {
                                            navigate(`/cart/${user.userId}`);
                                        }
                                        else {
                                            toast.error("Please log in to go to cart", {
                                                autoClose: 1500
                                            });
                                        }
                                    }}
                                >
                                    Go to Cart
                                </div>
                            </div>

                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default ProductDetails;