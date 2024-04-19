import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createUser } from "../../apis/fakeStoreProdApis";
import Auth from "../../components/Auth/Auth";


function Signup() {
    const navigate = useNavigate();

    async function onAuthFormSubmit(authArguments, resetForm) {
        try {
            await axios.post(createUser(), authArguments);
            toast.success("Account created successfully");
            navigate("/login");
        }
        catch (error) {
            console.log(error);
            toast.error("Invalid Signup Credentials", {
                position: toast.POSITION.TOP_RIGHT
            });
            resetForm();  
        }
    }

    return (
        <Auth
            authFor= "signup"
            onSubmit= {onAuthFormSubmit}
        />
    );
}

export default Signup;