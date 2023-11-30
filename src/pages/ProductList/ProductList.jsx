import FilterProducts from "../../components/FilterProducts/FilterProducts";
import ProductBox from "../../components/ProductBox/ProductBox";
import axios from "axios";
import { getProducts, getAllProducts } from "../../apis/fakeStoreProdApis";
import { useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

// CSS imports-
import "./productList.css";
import CartContext from "../../providers/CartContext";



function ProductList() {
    const [productList, setProductList] = useState(null);

    // using search params here for knowing category-
    const [query, setQuery]= useSearchParams();
    // console.log(query.get("category"));


    async function downloadProducts(categoryName) {
        if (categoryName == "All Products") {
            const response= await axios.get(getAllProducts());
            setProductList([...response.data]);
        }
        else {
            const response= await axios.get(getProducts(categoryName));
            setProductList([...response.data]);
        }
    }

    useEffect(() => {
        downloadProducts(query.get("category"));
    }, [query.get("category")]);    // whenever the search params will change this useEffect will be executed


    function searchItems(searchText) {
        const newProductList= [];
        productList.forEach((product) => {
            if (product.title.includes(searchText)) {
                newProductList.push(product);
            }
        });
        setProductList([...newProductList]);
    }

    return (
        <div className="container">
            <div className="row">

                <h2 className="product-list-title text-center" id="product-list-title">
                    {/* Make 1st letter capital- */}
                    { query.get("category").charAt(0).toUpperCase() + query.get("category").slice(1) } 
                </h2>

                <div className="product-list-wrapper d-flex flex-row">

                    {/* sidebar */}
                    <FilterProducts handleSearch= {searchItems} />

                    {/* List of products- */}
                    <div className="product-list-box" id="product-list-box">
                        {
                            productList &&
                            productList.map((product) => {
                                return (
                                    <ProductBox key= {product.id} id= {product.id} productImage= {product.image} name= {product.title.substring(0, 20) + " ..."} price= {product.price} />
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