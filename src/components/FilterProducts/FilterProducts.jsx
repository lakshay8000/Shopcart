import { useNavigate } from "react-router-dom";
import useCategories from "../../hooks/useCategories";
import { useState } from "react";

// CSS imports-
import "./filterProducts.css";




function FilterProducts({handleSearch}) {
    const minPriceOptions= [0, 20, 50, 100, 200];
    const maxPriceOptions= [0, 20, 50, 100, 200, 500];

    const [categories] = useCategories();    // fetching from custom hook

    const navigate= useNavigate();

    const [searchText, setSearchText] = useState(null);


    // console.log(categories);
    return (
        <div className="product-list-sidebar d-flex flex-column">

            <div className="sidebar-title">Search Products</div>
            <div className="sidebar-search">
                <input 
                    type="text" 
                    placeholder="Search by Name" 
                    className="form-control" 
                    onChange= {(e) => setSearchText(e.target.value)} 
                />
            </div>

            <div className="sidebar-title fw-bold">Categories</div>
            <div className="category-list d-flex flex-column" id="sidebar-category-list">
                {
                    categories && 
                    categories.map((categoryName) => {
                        return (
                            <div 
                                key= {categoryName}
                                onClick={() => navigate(`/products?category=${categoryName}`)}
                            > 
                                {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} 
                            </div>
                        )
                    })
                }
            </div>

            <div className="sidebar-title">Filter by Price</div>

            <div className="price-filter">
                <form>

                    <div className="price-filter-select d-flex flex-row justify-content-between">

                        <div>
                            <select id="minPrice" name="minPrice" className="form-select min-price">
                                {
                                    minPriceOptions.map((optionValue) => {
                                        return (
                                            <option 
                                                key= {optionValue} 
                                                value= {optionValue} 
                                            > 
                                                {optionValue} 
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div>
                            <select id="maxPrice" name="maxPrice" className="form-select max-price">
                                {
                                    maxPriceOptions.map((optionValue) => {
                                        return (
                                            <option 
                                                key= {optionValue} 
                                                value= {optionValue} 
                                            > 
                                                {optionValue} 
                                            </option>
                                        )
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
                        className="btn btn-warning search-button" 
                        id="search-button"
                        onClick= {() => handleSearch(searchText)}
                    >
                        Search
                    </button>

                    <div className="clear-filter">
                        <input id="clear-button" type="reset" className="btn btn-danger" value="Clear filter" />
                    </div>

                </form>
            </div>

        </div>
    )
}

export default FilterProducts;