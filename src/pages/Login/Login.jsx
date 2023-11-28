import axios from "axios";
import Auth from "../../components/Auth/Auth";
import { login } from "../../apis/fakeStoreProdApis";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

// imports from react toastify package-
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { jwtDecode } from "jwt-decode";
import UserContext from "../../providers/UserContext";
import { useContext, useEffect } from "react";



function Login() {
    const [cookies, setCookie, removeCookie] = useCookies(["backupToken"]);
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);

    async function onAuthFormSubmit(formDetails, resetForm) {
        try {
            const response = await axios.post(login(), formDetails );   // will get "jwt-token" wrapped inside a http-only cookie as response from server
            // console.log(response.data);
            const decodedToken = jwtDecode(response.data.token);
            // console.log(decodedToken);

            setUser({username : decodedToken.user, userId : decodedToken.id});
            setCookie("backupToken", response.data.token, [{httpOnly : true}]);  // create a backup token for using it further in our app logic
            navigate("/");
        }
        catch (error) {
            console.log(error);
            toast.error("Invalid Login Credentials", {
                position: toast.POSITION.TOP_RIGHT
            });
            resetForm();
        }
    }

    return (
        <>
        <Auth authFor="login" onSubmit={onAuthFormSubmit} />
        <ToastContainer />   {/* part of react toastify package */}
        </>
    );
}

export default Login;