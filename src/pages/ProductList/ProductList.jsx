import "./productList.css";

import { useEffect, useState } from "react";
import { IoMdOptions } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import { Button, Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";

import FilterProducts from "../../components/FilterProducts/FilterProducts";
import ProductBox from "../../components/ProductBox/ProductBox";
import useDownloadProducts from "../../hooks/useDownloadProducts";


function ProductList() {

    const [productList, updatedProductList, setUpdatedProductList] = useDownloadProducts(); // custom hook

    // for implementing search functionality in FilterProducts component-
    function searchItems(searchText) {
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
        newProductList.sort((x, y) => x.price - y.price);
        setUpdatedProductList([...newProductList]);
    }

    function clearFilter() {
        setUpdatedProductList([...productList]);
    }

    // using search params here for knowing category-
    const [query, setQuery] = useSearchParams();

    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

    // for checking the screen size and updating state if it changes-
    const [isMediumScreen, setIsMediumScreen] = useState(false);
    useEffect(() => {
        function handleResize() {
            setIsMediumScreen(window.innerWidth <= 768);
        }
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);


    return (
        <div className="container">
            <div className="d-flex flex-column product-list-page-wrapper">

                <h2 className="product-list-title text-center" id="product-list-title">
                    {/* Make 1st letter capital- */}
                    {query.get("category").charAt(0).toUpperCase() + query.get("category").slice(1)}
                </h2>

                <div className="product-list-wrapper d-flex flex-row">
                    {
                        (isMediumScreen) &&
                        (
                            <div>
                                <Button
                                    color="secondary"
                                    onClick={function noRefCheck() { setSidebarIsOpen(!sidebarIsOpen); }}
                                >
                                    <IoMdOptions />
                                </Button>
                                <Offcanvas
                                    toggle={function noRefCheck() { }}
                                    isOpen={sidebarIsOpen}
                                >
                                    <OffcanvasHeader
                                        toggle={function noRefCheck() { setSidebarIsOpen(!sidebarIsOpen); }}
                                    >
                                        Search / filter
                                    </OffcanvasHeader>
                                    <OffcanvasBody>

                                        {/* sidebar */}
                                        <div className="sidebar-wrapper-small-screen">
                                            <FilterProducts
                                                handleSearch={searchItems}
                                                handleFilter={applyFilter}
                                                resetFilter={clearFilter}
                                            />
                                        </div>

                                    </OffcanvasBody>
                                </Offcanvas>
                            </div>
                        )
                    }

                    {
                        (!isMediumScreen) &&
                        (
                            // sidebar-
                            <div className="sidebar-wrapper">
                                <FilterProducts
                                    handleSearch={searchItems}
                                    handleFilter={applyFilter}
                                    resetFilter={clearFilter}
                                />
                            </div>
                        )
                    }

                    {/* List of products- */}
                    <div className="product-list-box d-flex justify-content-center flex-wrap" id="product-list-box">
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
                                );
                            })
                        }
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ProductList;