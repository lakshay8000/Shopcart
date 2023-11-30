import axios from "axios";
import { getCartByUser } from "../apis/fakeStoreProdApis";

async function fetchUserCart(userId, setCart) {
    if (userId) {
        const response = await axios.get(getCartByUser(userId));
        // console.log(response.data[0]);
        setCart( {...response.data[0]} );
    }
    else setCart(null);
}

export default fetchUserCart;