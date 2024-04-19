import "./header.css";

import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarText,
    NavbarToggler,
    UncontrolledDropdown,
} from 'reactstrap';

import CartContext from '../../providers/CartContext';
import UserContext from '../../providers/UserContext';


function Header(props) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);    // logic of again seting user when page refreshes is in App.jsx
    const { cart } = useContext(CartContext);

    return (
        <div className='header-wrapper' >
            <Navbar {...props} >
                <NavbarBrand id="title" onClick={() => navigate("/")} >Shop Cart</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ms-auto" navbar>
                        <UncontrolledDropdown nav inNavbar id="navbar-dropdown" >
                            <DropdownToggle nav caret>
                                Options
                            </DropdownToggle>
                            <DropdownMenu >
                                {
                                    cart &&
                                    cart.products &&
                                    <DropdownItem
                                        onClick={() => navigate(`/cart/${user.userId}`)}
                                    >
                                        Cart {cart.products.length}
                                    </DropdownItem>
                                }


                                <DropdownItem>Settings</DropdownItem>
                                <DropdownItem divider />

                                {
                                    user ?
                                        <DropdownItem
                                            onClick={async () => {
                                                // logout request that will clear the JWT that we received from server while login
                                                await axios.get(`${import.meta.env.VITE_FAKE_STORE_URL}/logout`, { withCredentials: true });
                                                sessionStorage.removeItem("user");
                                                setUser(null);
                                                navigate("/");
                                            }}
                                        >
                                            Logout
                                        </DropdownItem>
                                        :
                                        <DropdownItem
                                            onClick={() => navigate("/login")}
                                        >
                                            Login
                                        </DropdownItem>
                                }

                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>

                    {user && <NavbarText> {user.username} </NavbarText>}

                </Collapse>
            </Navbar>
        </div>
    );
}

export default Header;