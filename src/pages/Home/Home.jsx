import { useContext, useEffect } from "react";
import CategoryItem from "../../components/CategoryItem/CategoryItem";
import useCategories from "../../hooks/useCategories";


// CSS imports-
import "./home.css";



function Home() {
    const [categories] = useCategories();    // fetching from custom hook
    

    /* point 5 in readme.md */
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h2 className="home-title text-center">Welcome to Shop Cart</h2>

                    <div className="category-list-wrapper d-flex flex-row justify-content-between align-items-center flex-wrap" id="category-list">
                        {/* list of categories */}
                        
                        <CategoryItem categoryName= "All Products" />

                        {
                            categories &&
                            categories.map((category) => {
                                return (
                                    <CategoryItem key= {category} categoryName= {category} />
                                )
                            })
                        }
                    </div>

                    <div className="category-title text-center">
                        Select a category to start shopping
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Home;