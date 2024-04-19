import "./productBox.css";

import { useNavigate } from "react-router-dom";

function ProductBox({id, productImage, name, price}) {
    const navigate= useNavigate();
    
    return (
        <div 
            className="product-item text-decoration-none d-flex flex-column align-items-center me-3" 
            onClick={() => navigate(`/products/${id}`)} 
        >

            <div className="product-img d-flex flex-row justify-content-center">
                <img src= {productImage} />
            </div>
            <div className="product-name text-center">
                {name}
            </div>
            <div className="product-price text-center"> $ {price} </div>

        </div>
    );
}

export default ProductBox;