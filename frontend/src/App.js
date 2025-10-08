import './CSS/Home.css'
import './CSS/NavBar.css';
import './CSS/Shop.css';
import './CSS/Cart.css';
import './CSS/Login.css';
import './App.css';

import Home from './components/Home';
import NavBar from './components/NavBar';
import Shop from './components/Shop';
import Cart from './components/Cart';
import Auth from './components/Auth';
import Payment from './components/Payment';
import Footer from './components/Footer';   // ✅ Import Footer

import { UserContext } from './Store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  const [hash, setHash] = useState(new Map());
  const [cartList, setcartList] = useState([]);
  let set = new Set();
  set.add("All");
  const [login, setLogin] = useState(false);
  const [searchList, setsearchList] = useState(set);
  const [SearchcartList, setSearchcartList] = useState([]);
  const [cartDetail, setCartDetail] = useState({ "subcost": 0, "discount": 0, "tax": 0, "total": 0 });

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      setLogin(true);
    }
  }, []);

  return (
    <>
      <UserContext.Provider value={{
        cartList, setcartList,
        cartDetail, setCartDetail,
        hash, setHash,
        searchList, setsearchList,
        SearchcartList, setSearchcartList,
        login: login, setLogin: setLogin
      }}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Shop' element={<Shop />} />
            <Route path='/Cart' element={<Cart />} />
            <Route path='/Auth' element={<Auth />} />
            <Route path='/SignUp' element={<Auth />} />
            <Route path='/Login' element={<Auth />} />
            <Route path='/Payment' element={<Payment />} />
          </Routes>
          <Footer />   {/* ✅ Footer always at the bottom */}
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
