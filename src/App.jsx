import './App.css';

// custom component imports-
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

import MainRoutes from './routes/MainRoutes';

import UserContext from './providers/UserContext';
import CartContext from './providers/CartContext';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useCookies } from 'react-cookie';
import fetchUserCart from './helpers/fetchUserCart';



function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);

  const [cookies, setCookie, removeCookie] = useCookies(["backupToken"]);

  // this logic will again set user when page refreshes-
  useEffect(() => {
    if (cookies["backupToken"]) {
      const decodedToken = jwtDecode(cookies.backupToken);
      setUser({ username: decodedToken.user, userId: decodedToken.id });
    }
  }, []);

  // on login, we are updating user state, thats why App.jsx will re render and this useEffect will run. And on page refresh it will also run because the whole react app reloads on page refresh 
  useEffect(() => {
    fetchUserCart(user? user.userId : undefined, setCart);
  }, [user]);



  
  return (
    <CartContext.Provider value={{ cart, setCart }} >
      <UserContext.Provider value={{ user, setUser }}>
        <div className='app-wrapper d-flex flex-column' >

          <Header color="light" light={true} expand="md" container="md" fixed="top" />
          <MainRoutes />
          <Footer />

        </div>
      </UserContext.Provider>
    </CartContext.Provider>
  )
}

export default App;