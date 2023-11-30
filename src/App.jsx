import './App.css';

// custom component imports-
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

import MainRoutes from './routes/MainRoutes';

import UserContext from './providers/UserContext';
import CartContext from './providers/CartContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useCookies } from 'react-cookie';



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