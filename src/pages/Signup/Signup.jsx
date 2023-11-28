import axios from "axios";
import Auth from "../../components/Auth/Auth";
import { createUser } from "../../apis/fakeStoreProdApis";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// imports from react toastify package-
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Signup() {
    const navigate = useNavigate();

    async function onAuthFormSubmit(authArguments, resetForm) {
        try {
            await axios.post(createUser(), authArguments);
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