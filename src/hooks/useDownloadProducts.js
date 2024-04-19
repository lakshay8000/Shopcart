import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getAllProducts, getProducts } from "../apis/fakeStoreProdApis";


function useDownloadProducts() {
    // we are creating 2 different states for product list because we will never change the original product list on the event of search or applying price filters. We will update the updatedProductList on these events.
    const [productList, setProductList] = useState(null);
    const [updatedProductList, setUpdatedProductList] = useState(null);

    // using search params here for knowing category-
    const [query, setQuery] = useSearchParams();
    // console.log(query.get("category"));

    async function downloadProducts(categoryName) {
        try {
            if (categoryName == "All Products") {
                const response = await axios.get(getAllProducts());
                setProductList([...response.data]);
                setUpdatedProductList([...response.data]);
            }
            else {
                const response = await axios.get(getProducts(categoryName));
                setProductList([...response.data]);
                setUpdatedProductList([...response.data]);
            }
        }
        catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        downloadProducts(query.get("category"));
    }, [query.get("category")]);    // whenever the search params will change this useEffect will be executed

    return [productList, updatedProductList, setUpdatedProductList];
}

export default useDownloadProducts;