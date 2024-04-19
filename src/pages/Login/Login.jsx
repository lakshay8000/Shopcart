import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { login } from "../../apis/fakeStoreProdApis";
import Auth from "../../components/Auth/Auth";
import UserContext from "../../providers/UserContext";


function Login() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    async function onAuthFormSubmit(formDetails, resetForm) {
        try {
            const response = await axios.post(login(), formDetails);   // will get "jwt-token" from server
            const decodedToken = jwtDecode(response.data.token);
            const userDetails= { username: decodedToken.user, userId: decodedToken.id };
            setUser({...userDetails});
            sessionStorage.setItem("user", JSON.stringify(userDetails) );
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
        </>
    );
}

export default Login;