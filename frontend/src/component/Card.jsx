import React, { useState } from 'react';
import { useCart, useDispatch } from './Contextreducer';

function Card(props) {
    let dispatch = useDispatch();
    let data = useCart();
    let options = props.options;
    let priceOptions = Object.keys(options);
    let foodItem = props.foodItem;

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState(priceOptions[0]);

    let finalPrice = qty * parseInt(options[size]);

    const handleAddToCart = async () => {
        let existingItem = data.find(item => item.id === foodItem._id && item.size === size);

        if (existingItem) {
            await dispatch({
                type: "UPDATE",
                id: foodItem._id,
                size: size,
                price: finalPrice,
                qty: qty
            });
        } else {
            await dispatch({
                type: "ADD",
                id: foodItem._id,
                name: foodItem.name,
                price: finalPrice,
                qty: qty,
                size: size
            });
        }
    };

    return (
        <>
             <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                {filtered.length>0 ? filtered.map(product => (
                    <div key={product.id} className='bg-white p-4 rounded h-110 shadow hover:scale-105 transition' >
                        <img 
                        src={product.image}
                        alt={product.title} 
                        className='h-48 w-full object-contain mb-4'
                        />
                        <h2 className='text-lg font-semibond'>{product.title}</h2>
                        <p className='text-sm text-gray-600 line-clamp-2'>{product.description}</p>
                        <p className='text-green-700 font-bold mt-2'>₹{Math.round(product.price*80)}</p>
                          
                            <ShowMsg/>
                          
                    </div>
                          )):(
                  <p className='text-center col-span-full text-red-500'>No product found </p>
                )}

            </div>
            
        </>
    );
}

export default Card;
