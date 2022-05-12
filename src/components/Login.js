import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { auth } from '../firebase';

function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Accepts e (event) as parameter
  const signIn = e => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
    .then((auth) => {
      if(auth){
        navigate('/');
      }
    })
    .catch(error => alert(error.message))
  };

  const register = e => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
        .then((auth) => {
          if(auth){
            navigate('/');
          }
        })
        .catch(error => alert(error.message))
  };
  
  return (
    <div className='login'>
      <Link to='/'>
        <img className='login__logo'
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' alt='logo' />
        </Link>
        <div className='login__container'>
          <h1>Sign-in</h1>
          <form>

            <h5>Email</h5>
            <input type='text' value={email}
              onChange={ e => setEmail(e.target.value) }/>
            
            <h5>Password</h5>
            <input type='password' value={password}
              onChange={ e => setPassword(e.target.value) }/>

            <button type='submit' onClick={signIn} 
              className='login__signInButton'>Sign in</button>
          </form>
          <p>By signing-in you agree to the Terms of Use, our Privacy Policy and our Cookies Notice.</p>        
          <button onClick={register}
            className='login__registerButton'>Create an Account</button>
        </div>
    </div>
  )
}

export default Login