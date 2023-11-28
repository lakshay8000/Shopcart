// CSS imports-
import "./cartProduct.css";

// image imports-
import demoProductImg from "../../assets/demoProductImg.jpg";


function CartProduct() {
    const quantityOptions= [1,2,3,4,5];

    return (
        <>
        <div className="order-details-product d-flex flex-row">

            <div className="order-details-product-img">
                <img src= {demoProductImg} id="order-details-product-img" />
            </div>
            <div className="order-details-product-data d-flex flex-column">
                <div id="order-details-product-data-title">Some Product</div>
                <div id="order-details-product-data-price">₹ 10,000</div>
            </div>
            <div className="order-details-product-action d-flex flex-column">
                <div className="order-details-product-quantity d-flex flex-column row-gap-2">
                    <div className="quantity-title fw-bold">Quantity</div>
                    <div>
                        <select name="" id="order-details-product-quantity" className="form-select">
                            {
                                quantityOptions.map((optionValue) => {
                                    return (
                                        <option key= {optionValue} value= {optionValue}> {optionValue} </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="order-details-product-remove btn btn-danger" id="order-details-product-remove">Remove</div>
            </div>
           
        </div>
        <hr />
        </>
    );
}

export default CartProduct;