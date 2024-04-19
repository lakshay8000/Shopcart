import "./home.css";

import CategoryItem from "../../components/CategoryItem/CategoryItem";
import useCategories from "../../hooks/useCategories";


function Home() {
    const [categories] = useCategories();    // fetching from custom hook

    return (
        <div className="container homepage-wrapper">
            <div className="d-flex flex-column">
                <h2 className="home-title text-center">Welcome to Shop Cart</h2>

                <div className="category-list-wrapper d-flex flex-row justify-content-between align-items-center flex-wrap" id="category-list">
                    {/* list of categories */}

                    <CategoryItem categoryName="All Products" />

                    {
                        categories &&
                        categories.map((category) => {
                            return (
                                <CategoryItem key={category} categoryName={category} />
                            );
                        })
                    }
                </div>

                <div className="category-title text-center">
                    Select a category to start shopping
                </div>

            </div>
        </div>
    );
}

export default Home;