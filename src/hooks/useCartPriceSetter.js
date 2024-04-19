import { useEffect, useState } from "react";

function useCartPriceSetter(products) {
    // for setting price details-
    const [totalPrice, setTotalPrice] = useState(0);
    const [netPrice, setNetPrice] = useState(0);

    useEffect(() => {
        let totalPriceSum = 0;
        products.forEach((product) => {
            totalPriceSum += (product.price * product.quantity);
        });
        totalPriceSum = totalPriceSum.toFixed(2);
        setTotalPrice(totalPriceSum);
        let netPriceSum = Math.floor(totalPriceSum - 10);
        setNetPrice(netPriceSum);
    }, [products]);

    return [totalPrice, netPrice];
}

export default useCartPriceSetter;