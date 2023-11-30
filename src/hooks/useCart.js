import { useContext, useEffect } from "react";
import CartContext from "../providers/CartContext";
import axios from "axios";
import { getCartByUser } from "../apis/fakeStoreProdApis";


// This custom hook will fetch cart details from backend on the basis of userId and update the cart state and then return cart and setCart
function useCart(userId) {
    const { cart, setCart } = useContext(CartContext);

    async function fetchUserCart(userId) {
        if (userId) {
            const response = await axios.get(getCartByUser(userId));
            // console.log(response.data[0]);
            setCart( {...response.data[0]} );
        }
        else setCart(null);
    }

    useEffect(() => {
        fetchUserCart(userId);
    }, [userId]);

    return [cart, setCart];
}

export default useCart;