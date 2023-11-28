import React, { useState, useContext, useEffect } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';

// css imports-
import "./header.css";

import { useNavigate } from 'react-router-dom';
import UserContext from '../../providers/UserContext';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';


// point 3 in readme.md
function Header(props) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    
    const navigate= useNavigate();
    
    const {user, setUser} = useContext(UserContext);
    const [cookies, setCookie, removeCookie] = useCookies(["backupToken"]);

    // this logic will again set user when page refreshes-
    useEffect(() => {
        if (cookies["backupToken"]) {
            const decodedToken = jwtDecode(cookies.backupToken);
            setUser({username : decodedToken.user, userId : decodedToken.id});
        }
    }, []);


    return (
        <div className='header-wrapper' >
            <Navbar {...props} >
                <NavbarBrand id= "title" onClick={() => navigate("/")} >Shop Cart</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ms-auto" navbar>
                        <UncontrolledDropdown nav inNavbar id= "navbar-dropdown" >
                            <DropdownToggle nav caret>
                                Options
                            </DropdownToggle>
                            <DropdownMenu >
                                <DropdownItem onClick= {() => navigate("/cart")} >Cart</DropdownItem>
                                <DropdownItem>Settings</DropdownItem>
                                <DropdownItem divider />
                                
                                {
                                    user?
                                    <DropdownItem
                                        onClick= {async () => {
                                            // logout request that will clear the http-only cookie containing JWT that we received from server while login
                                            await axios.get(`${import.meta.env.VITE_FAKE_STORE_URL}/logout`, {withCredentials : true});
                                            removeCookie("backupToken");
                                            setUser(null);
                                        }}
                                    >
                                        Logout
                                    </DropdownItem>
                                    :
                                    <DropdownItem
                                        onClick= {() => navigate("/login")}
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