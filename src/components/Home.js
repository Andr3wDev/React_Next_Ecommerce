import React from 'react';
import './Home.css';
import Product from './Product.js';

function Home() {
  return (
    <div className='home'>
        <div className='home__container'>
            <img className='home__image' alt='logo' 
            src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg'/>
            <div className='home__row'>
              <Product id={1} rating={5} title='Book Title' price={5.99} image='https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg' />
              <Product id={2} rating={4} title='Book Title' price={10.99} image='https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg' />  
            </div>
            <div className='home__row'>
              <Product id={3} rating={2} title='Book Title' price={20.99} image='https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg' />
              <Product id={4} rating={4} title='Book Title' price={30.99} image='https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg' />
              <Product id={5} rating={3} title='Book Title' price={40.99} image='https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg' />
            </div>            
            <div className='home__row'>
              <Product rating={5} title='Book Title' price={20.99} image='https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg' />                
            </div>
        </div>
    </div>
  )
}

export default Home