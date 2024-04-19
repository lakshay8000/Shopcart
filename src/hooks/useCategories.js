import axios from "axios";
import { useEffect, useState } from "react";

import { getAllCategories } from "../apis/fakeStoreProdApis";


function useCategories() {
    const [categories, setCategories] = useState(null);

    async function downloadMovies() {
        const response= await axios.get(getAllCategories());
        setCategories([...response.data]);
    }

    useEffect(() => {
        downloadMovies();
    },[]);

    return [categories];
}

export default useCategories;