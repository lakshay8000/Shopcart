import "./auth.css";

import { useState } from "react";
import { Link } from "react-router-dom";


function Auth({ authFor, onSubmit }) {
    const [formDetails, setFormDetails] = useState({ 
        username: "", 
        email: "", 
        password: "", 
        isLoading: false 
    });

    function resetForm() {
        setFormDetails({username: "", email: "", password: "", isLoading: false});
    }
    
    function onFormSubmit() {
        setFormDetails({ ...formDetails, isLoading: true });
        onSubmit(formDetails, resetForm);    // pass formDetails and resetForm function to parent component (from where Auth is being called)
    }


    return (
        <div className="container d-flex flex-column justify-content-center align-items-center">
            <div>
                <h2 className="welcome-title text-center w-100">Welcome to Shop Cart</h2>
            </div>

            <div className="auth-wrapper w-75">

                <h4 className="text-center mb-4">
                    {(authFor == "login") ? "Login" : "Sign up"}
                </h4>

                {/* In Bootstrap, the input-group className is used to create a container that groups together form controls and additional elements to enhance the functionality and appearance of input fields. It allows you to combine text inputs, buttons, dropdowns, or other elements in a visually cohesive way. */}
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        value= {formDetails.username}
                        onChange={(e) => setFormDetails({ ...formDetails, username: e.target.value })}
                    />
                </div>

                <div className="input-group">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value= {formDetails.email}
                        onChange={(e) => setFormDetails({ ...formDetails, email: e.target.value })}
                    />
                </div>

                {/* The form-control className in Bootstrap is used to style and modify form input elements such as text fields, select dropdowns, checkboxes, and radio buttons. It provides a consistent and visually appealing appearance to these input elements across different browsers and devices.
                When you apply the form-control className to an input element, it applies the necessary styles to make the element fill the available width, adjusts the font size, and adds some padding to improve the spacing. It also applies a border, border-radius, and box-shadow to give the element a clean and modern look. */}
                <div className="input-group">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value= {formDetails.password}
                        onChange={(e) => setFormDetails({ ...formDetails, password: e.target.value })}
                    />
                </div>

                {/* Below button is taken from bootstrap website */}
                <button
                    className="input-group btn btn-primary"
                    type="button"
                    disabled={formDetails.isLoading}
                    onClick={onFormSubmit}
                >
                    {
                        formDetails.isLoading ?
                            <>
                                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                <span role="status">Loading...</span>
                            </>
                            :
                            <span>Submit</span>
                    }
                </button>

                <div className="text-center fw-bold">
                    {
                        (authFor == "login") ?
                            <Link to="/signup" className="action-link" > Don't have an account? Sign up </Link>
                            :
                            <Link to="/login" className="action-link" > Already have an account? Log in </Link>
                    }
                </div>

            </div>

        </div>
    );
}

export default Auth;