import "./categoryItem.css";

import {useNavigate } from "react-router-dom";


function CategoryItem({categoryName}) {
    const navigate= useNavigate();
    
    return (
        /* rounded-3 is a bootstrap class for making the borders round */
        <div 
            className="category-item d-flex justify-content-center align-items-center rounded-3 mb-3"
            onClick= {() => navigate(`/products?category=${categoryName}`)}
        >
            <span> {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} </span>
        </div>
    );
}

export default CategoryItem;