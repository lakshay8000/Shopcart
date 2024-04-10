import FilterProducts from "../../components/FilterProducts/FilterProducts";
import ProductBox from "../../components/ProductBox/ProductBox";
import axios from "axios";
import { getProducts, getAllProducts } from "../../apis/fakeStoreProdApis";
import { useParams, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";

// CSS imports-
import "./productList.css";
import CartContext from "../../providers/CartContext";



function ProductList() {
    // we are creating 2 different states for product list because we will never change the original product list on the event of search or applying price filters. We will update the updatedProductList on these events.
    const [productList, setProductList] = useState(null);
    const [updatedProductList, setUpdatedProductList] = useState(null);

    // using search params here for knowing category-
    const [query, setQuery] = useSearchParams();
    // console.log(query.get("category"));

    async function downloadProducts(categoryName) {
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

    useEffect(() => {
        downloadProducts(query.get("category"));
    }, [query.get("category")]);    // whenever the search params will change this useEffect will be executed


    // for implementing search functionality in FilterProducts component-
    function searchItems(searchText) {
        // if search text is not empty-
        if (searchText.trim() !== "") {
            const newProductList = [];
            productList.forEach((product) => {
                if (product.title.toLowerCase().includes(searchText)) {
                    newProductList.push(product);
                }
            });
            setUpdatedProductList([...newProductList]);
        }
    }

    // for filtering according to minPrice and maxPrice in FilterProducts component-
    function applyFilter(minPrice, maxPrice) {
        let newProductList = [];
        productList.forEach((product) => {
            if (product.price <= maxPrice && product.price >= minPrice) {
                newProductList.push(product);
            }
        });

        newProductList.sort((x, y) => x.price - y.price);  // sort in inc order
        setUpdatedProductList([...newProductList]);
    }

    function clearFilter() {
        setUpdatedProductList([...productList]);
    }


    return (
        <div className="container">
            <div className="row">

                <h2 className="product-list-title text-center" id="product-list-title">
                    {/* Make 1st letter capital- */}
                    {query.get("category").charAt(0).toUpperCase() + query.get("category").slice(1)}
                </h2>

                <div className="product-list-wrapper d-flex flex-row">

                    {/* sidebar */}
                    <FilterProducts
                        handleSearch={searchItems}
                        handleFilter={applyFilter}
                        resetFilter= {clearFilter}
                    />

                    {/* List of products- */}
                    <div className="product-list-box" id="product-list-box">
                        {
                            updatedProductList &&
                            updatedProductList.map((product) => {
                                return (
                                    <ProductBox
                                        key={product.id}
                                        id={product.id}
                                        productImage={product.image}
                                        name={product.title.substring(0, 20) + " ..."}
                                        price={product.price}
                                    />
                                )
                            })
                        }
                    </div>


                </div>
            </div>
        </div>
    )
}

export default ProductList;