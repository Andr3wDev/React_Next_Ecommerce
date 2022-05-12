import React from 'react';
import './Product.css';
import StarIcon from '@mui/icons-material/Star';
import { useStateValue } from './StateProvider';

function Product({ id, title, image, price, rating }) {

    const [{basket}, dispatch] = useStateValue();
    const addToBasket = () => {
        // dispatch item to data layer
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating
            }
        })
    };

  return (
    <div className='product'>        
        <div className='product__info' id={id}>
            <p>{title}</p>
            <p className='product__price'>
                <small>$</small>
                <strong>{price}</strong>
            </p>
            <div className='product__rating'>
            {
                Array(rating)
                .fill()
                .map((_, i) => (
                    <p><StarIcon /></p>
                ))
            }
            </div>
        </div>
        <img alt='logo' src={image}/>
        <button onClick={addToBasket}>Add to Basket</button>
    </div>
  )
}

export default Product