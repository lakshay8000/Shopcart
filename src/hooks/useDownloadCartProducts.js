import axios from "axios";
import { useContext, useEffect, useState } from "react";

import { getProductInfo } from "../apis/fakeStoreProdApis";
import CartContext from "../providers/CartContext";


function useDownloadCartProducts() {
    const { cart, setCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);

    async function downloadCartProducts() {
        try {
            if (cart && cart.products) {
                const productQuantityMapping = {};
                cart.products.forEach((product) => productQuantityMapping[product.productId] = product.quantity);
    
                const productsPromise = cart.products.map((product) => axios.get(getProductInfo(product.productId) ));
                const productsPromiseResponse = await axios.all(productsPromise);
    
                // create downloadedProducts array and add quantity in the product object
                const downloadedProducts = productsPromiseResponse.map((product) => {
                    return (
                        { ...product.data, quantity: productQuantityMapping[product.data.id] }
                    );
                });
                setProducts([...downloadedProducts]);
            }
        }
        catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        downloadCartProducts();
    }, [cart]);

    return [ setCart, products ];
}

export default useDownloadCartProducts;