import './App.css';
import Header from './components/Header.js';
import Home from './components/Home.js';
import Checkout from './components/Checkout.js';
import Payment from './components/Payment.js';
import Orders from './components/Orders.js';
import Login from './components/Login.js';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import { useStateValue } from './components/StateProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe(process.env.REACT_APP_STRIPE);

function App() {

  const [{}, dispatch] = useStateValue();
  
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if(authUser){
        // user logged 
        dispatch({
          type: 'SET_USER',
          user: authUser
        });
      }
      else{
        // user logged out
        dispatch({
          type: 'SET_USER',
          user: null
        });
      }
    });
  },[]);  

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route exact path="/orders" element={<><Header/><Orders/></>}/>        
          <Route exact path="/login" element={<Login/>}/>          
          <Route exact path="/checkout" element={<><Header/><Checkout/></>}/>   
          <Route exact path="/payment" element={<>            
            <Header/>
            <Elements stripe={promise}>
              <Payment/>
            </Elements>            
          </>}/>          
          <Route exact path="/" element={<><Header/><Home/></>}/> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
