import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProductInfo } from "../apis/fakeStoreProdApis";


function useDownloadProductDetails() {
    const [productInfo, setProductInfo] = useState(null);
    const { productId } = useParams();

    async function downloadProductDetails(productId) {
        try {
            const response = await axios.get(getProductInfo(productId));
            // console.log(response.data);
            setProductInfo({ ...response.data });
        }
        catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        downloadProductDetails(productId);
    }, []);

    return [productInfo];
}

export default useDownloadProductDetails;