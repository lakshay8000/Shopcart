import './App.css';

import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import fetchUserCart from './helpers/fetchUserCart';
import CartContext from './providers/CartContext';
import UserContext from './providers/UserContext';
import MainRoutes from './routes/MainRoutes';


function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);

  // this logic will again set user when page refreshes-
  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      const userDetails = JSON.parse(sessionStorage.getItem("user"));
      setUser({ ...userDetails });
    }
  }, []);

  // on login, we are updating user state, thats why App.jsx will re render and this useEffect will run. And on page refresh it will also run because the whole react app reloads on page refresh 
  useEffect(() => {
    fetchUserCart(user ? user.userId : undefined, setCart);
  }, [user]);

  
  return (
    <CartContext.Provider value={{ cart, setCart }} >
      <UserContext.Provider value={{ user, setUser }}>

          <div className='app-wrapper d-flex flex-column' >
            <Header color="light" light={true} expand="md" container="md" fixed="top" />
            <MainRoutes />
            <Footer />
            <ToastContainer />
          </div>

      </UserContext.Provider>
    </CartContext.Provider>
  );
}

export default App;