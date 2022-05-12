import React, { useState, useEffect } from 'react';
import './Payment.css';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../reducer';
import axios from '../axios';
import { db } from '../firebase';

function Payment() {

    const navigate = useNavigate();
    const [{basket, user}, dispatch] = useStateValue();
    const stripe = useStripe();
    const elements = useElements();

    // Stripe Functionality
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    const getClientSecret = async () => {        
        var total = getBasketTotal(basket) * 100;
        var newUrl = `/payments/create?total=${total}`;
        
        const response = await axios({
            method: 'post',
            // Stripe expects the total in (cents)                
            url: newUrl
        });

        setClientSecret(response.data.clientSecret);
    };

    useEffect(() => {
        // TODO - fix rerunning after navigation
        getClientSecret();

    },[basket]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(
            clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            }
        ).then(({paymentIntent}) => {
            // payment intent = payment confirmation
            
              db.collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    // takes an object
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created
                });

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET'
            });
            
            navigate('/orders', { replace: true });
        });
    };

    const handleChange = event => {
        setDisabled(event.empty); // if event is empty
        setError(event.error ? event.error.message : ""); 
    };

    return (
    <div className='payment'>        
        <div className='payment__container'>
            <h1>
                Checkout (
                    <Link to="/checkout">
                        {basket?.length} items
                    </Link>
                )
            </h1>

            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Delivery Address</h3>
                </div>
                <div className='payment__address'>
                    <p>{user?.email}</p>
                    <p>1234 Main Street</p>
                    <p>Some City</p>
                </div>
            </div>

            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Review items and delivery</h3>
                </div>
                <div className='payment__items'>
                    {
                        basket.map(item => (
                            <CheckoutProduct 
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}/>
                        ))
                    }
                </div>
            </div>

            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Payment Method</h3>
                </div>
                <div className='payment__details'>
                    { /* Stripe payment details here */ }
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange}/>
                        <div className='payment__price'>
                            <CurrencyFormat renderText={(value) => (
                                <h3>Order Total: {value}</h3>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeparator={true}    
                                prefix={"$"}/>
                            <button disabled={processing || disabled 
                                || succeeded || error || getBasketTotal(basket) <= 0 } >
                                <span>
                                    {processing ? <p>Processing..</p>
                                        : "Buy Now"}
                                </span>
                            </button>
                        </div>                        
                        
                        { error && (<div>Invalid card details.</div>) }
                       
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Payment