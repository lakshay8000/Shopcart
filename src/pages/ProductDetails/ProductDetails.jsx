// CSS imports-
import "./productDetails.css";

// import img-
import demoProductImg from "../../assets/demoProductImg.jpg";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addProductToCart, getProductInfo } from "../../apis/fakeStoreProdApis";

import UserContext from "../../providers/UserContext";
import CartContext from "../../providers/CartContext";


function ProductDetails() {
    const [productInfo, setProductInfo] = useState(null);
    const navigate = useNavigate();
    const { productId } = useParams();

    async function downloadProductDetails(productId) {
        const response = await axios.get(getProductInfo(productId));
        // console.log(response.data);
        setProductInfo({ ...response.data });
    }

    const { user, setUser } = useContext(UserContext);
    const { setCart } = useContext(CartContext);

    useEffect(() => {
        downloadProductDetails(productId);
    }, []);

    async function handleAddToCart() {
        if (user) {
            const response = await axios.put(addProductToCart(), {
                                userId: user.userId,
                                productId: productId
                             });
            
                             setCart({...response.data});    // update cart state
        }
    }

    console.log(productId);

    return (
        <div className="container">
            <div className="row">

                {
                    productInfo &&
                    <div className="product-details-wrapper d-flex flex-row justify-content-between align-items-start">

                        <div className="product-details-img">
                            <img id="product-details-img" src={productInfo.image} alt="product-image" />
                        </div>

                        <div className="product-detail-box d-flex flex-column">
                            <div id="product-details">
                                <div className="product-details-name" id="product-details-name">
                                    {productInfo.title}
                                </div>

                                <div className="product-details-price fw-bold" id="product-details-price">
                                    {productInfo.price}
                                </div>

                                <div className="product-description-title fw-bold" id="product-description-title">
                                    Description
                                </div>

                                <div className="product-description" id="product-description">
                                    {productInfo.description}
                                </div>
                            </div>

                            <div className="product-action d-flex justify-content-start gap-5">

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
                                        if (user.userId) {
                                            navigate(`/cart/${user.userId}`);
                                        }
                                    }}
                                >
                                    Go to Cart
                                </div>

                            </div>

                        </div>
                    </div>
                }


            </div>
        </div>
    );
}

export default ProductDetails;