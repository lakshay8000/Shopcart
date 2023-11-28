// CSS imports-
import "./productDetails.css";

// import img-
import demoProductImg from "../../assets/demoProductImg.jpg";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProductInfo } from "../../apis/fakeStoreProdApis";

import UserContext from "../../providers/UserContext";


function ProductDetails() {
    const [productInfo, setProductInfo] = useState(null);

    const urlParams= useParams();

    async function downloadProductDetails(id) {
        const response = await axios.get(getProductInfo(id));
        // console.log(response.data);
        setProductInfo({...response.data});
    }

    useEffect(() => {
        downloadProductDetails(urlParams.id);
    }, []);

    const {user, setUser} = useContext(UserContext);
    
   
    async function handleAddToCart() {
        console.log(user);
        const response= await axios.put("http://localhost:8765/carts/1", {
            userId : urlParams.id,
            date : new Date(),
            products : [{productId: productInfo.id, quantity: 1}]
        });
    }
    
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
                                    onClick= {handleAddToCart}
                                >
                                    Add to Cart
                                </div>

                                <div 
                                    className="product-details-action btn btn-warning text-decoration-none" 
                                    id="go-to-cart-button"
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