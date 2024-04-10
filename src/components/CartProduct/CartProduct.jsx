// CSS imports-
import "./cartProduct.css";



function CartProduct({title, price, image, quantity, onRemove, changeQuantity}) {
    const quantityOptions= [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

    return (
        <>
        <div className="order-details-product d-flex flex-row">

            <div className="order-details-product-img">
                <img src= {image} id="order-details-product-img" />
            </div>
            <div className="order-details-product-data d-flex flex-column">
                <div id="order-details-product-data-title">{title}</div>
                <div id="order-details-product-data-price">$ {price}</div>
            </div>
            <div className="order-details-product-action d-flex flex-column">
                <div className="order-details-product-quantity d-flex flex-column row-gap-2">
                    <div className="quantity-title fw-bold">Quantity</div>
                    <div>
                        <select 
                            name="" 
                            id="order-details-product-quantity" 
                            className="form-select"
                            defaultValue={quantity}
                            onChange={(e) => changeQuantity(e.target.value)}
                        >
                            {
                                quantityOptions.map((optionValue) => {
                                    return (
                                        <option 
                                            key= {optionValue} 
                                            value= {optionValue}
                                        > 
                                            {optionValue} 
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div 
                    className="order-details-product-remove btn btn-danger" 
                    id="order-details-product-remove"
                    onClick= {onRemove}
                >
                    Remove
                </div>
            </div>
           
        </div>
        <hr />
        </>
    );
}

export default CartProduct;