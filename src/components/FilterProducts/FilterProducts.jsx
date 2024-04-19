import "./filterProducts.css";

import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import useCategories from "../../hooks/useCategories";


function FilterProducts({ handleSearch, handleFilter, resetFilter }) {
    const minPriceOptions = [0, 20, 50, 100, 200];
    const maxPriceOptions = [0, 20, 50, 100, 200, 500];
    let minPriceRef = useRef(0);
    let maxPriceRef = useRef(0);
    const [categories] = useCategories();    // fetching from custom hook
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");

    // for resetting the form when category changes-
    const formRef = useRef(null);
    const [query, setQuery] = useSearchParams();
    useEffect(() => {
        formRef.current.reset();
    }, [query.get("category")]);


    return (
        <div className="product-list-sidebar d-flex flex-column">
            <form ref={formRef}> 
                <div className="sidebar-title fw-bold fs-5 ">Search Products</div>
                <div className="sidebar-search">
                    <input
                        type="text"
                        placeholder="Search by Name"
                        className="form-control w-auto"
                        onChange={(e) => setSearchText(e.target.value)}
                    />

                    <button
                        type="button"
                        className="btn btn-warning search-button"
                        id="search-button"
                        onClick={() => handleSearch(searchText)}
                    >
                        Search
                    </button>
                </div>

                <div className="sidebar-title fw-bold fs-5">Categories</div>
                <div className="category-list d-flex flex-column" id="sidebar-category-list">
                    {
                        categories &&
                        categories.map((categoryName) => {
                            return (
                                <div
                                    key={categoryName}
                                    onClick={() => navigate(`/products?category=${categoryName}`)}
                                >
                                    {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
                                </div>
                            );
                        })
                    }
                </div>

                <div className="sidebar-title fw-bold fs-5">Filter by Price ($)</div>

                <div className="price-filter">

                    <div className="price-filter-select d-flex flex-row justify-content-between">

                        <div>
                            <select
                                id="minPrice"
                                name="minPrice"
                                className="form-select min-price w-auto"
                                onChange={(e) => {
                                    minPriceRef.current = Number(e.target.value);
                                }}
                            >
                                {
                                    minPriceOptions.map((optionValue) => {
                                        return (
                                            <option
                                                key={optionValue}
                                                value={optionValue}
                                            >
                                                {optionValue}
                                            </option>
                                        );
                                    })
                                }
                            </select>
                        </div>

                        <div>
                            <select
                                id="maxPrice"
                                name="maxPrice"
                                className="form-select max-price w-auto"
                                onChange={(e) => {
                                    maxPriceRef.current = Number(e.target.value);
                                }}
                            >
                                {
                                    maxPriceOptions.map((optionValue) => {
                                        return (
                                            <option
                                                key={optionValue}
                                                value={optionValue}
                                            >
                                                {optionValue}
                                            </option>
                                        );
                                    })
                                }
                            </select>
                        </div>

                    </div>

                    <div className="price-filter-title d-flex justify-content-between">
                        <div className="price-filter-label-min">Min Price</div>
                        <div className="price-filter-label-max">Max price</div>
                    </div>

                    <button
                        type="button"
                        className="btn btn-primary mt-2"
                        onClick={() => handleFilter(minPriceRef.current, maxPriceRef.current)}
                    >
                        Apply filter
                    </button>

                    <div className="clear-filter">
                        <button
                            id="clear-button"
                            className="btn btn-danger"
                            type="reset"
                            onClick={resetFilter}
                        >
                            Clear filter
                        </button>
                    </div>

                </div>
            </form>
        </div>
    );
}

export default FilterProducts;