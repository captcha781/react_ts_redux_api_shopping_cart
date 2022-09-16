import axios from 'axios';
import React, { useState } from 'react'
import { addToCart } from '../../Features/Cart';
import { useAppDispatch, useAppState } from '../../Store/Hooks';
import {useNavigate} from "react-router-dom"

interface Props {
  item: CartItem
}

const CartCard = ({ item }: Props) => {
  const navigate = useNavigate()
  let cart = useAppState(state => state.cart.cart)
  const dispatch = useAppDispatch()
  const [quantity, setQuantity] = useState<number>(item.quantity)
  const handleAddCart: HandleAddCart = (item) => {
    // console.log(cart);
    let index = cart.findIndex(obj => Number(obj.product.id) === Number(item.id))
    let filtration = cart.filter(
      (obj) => Number(obj.product.id) === Number(item.id)
    );
    // console.log(filtration);

    if (filtration.length === 0) {
      console.log("if runs");
      cart = [...cart, { product: item, quantity: 1 }];
      axios
        .put("https://632012e69f82827dcf243f80.mockapi.io/api/cart/1101", {
          id: 1101,
          cart: cart,
        })
        .then((response) => {
          dispatch(addToCart(cart));
          console.log(cart);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      let newCartItem: CartItem = {
        product: filtration[0].product,
        quantity: filtration[0].quantity + 1,
      };
      // cart = cart.filter((obj) => Number(obj.product.id) !== Number(item.id));
      // cart = [...cart, newCartItem];
      cart = [...cart]
      cart[index] = newCartItem

      axios
        .put("https://632012e69f82827dcf243f80.mockapi.io/api/cart/1101", {
          id: 1101,
          cart: cart,
        })
        .then((response) => {
          dispatch(addToCart(cart));
          console.log(cart);
          setQuantity(quantity+1)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleProductReduce:HandleAddCart = (item) => {
    let index = cart.findIndex(obj => Number(obj.product.id) === Number(item.id))
      let filtration = cart.filter(
        (obj) => Number(obj.product.id) === Number(item.id)
      );

      let newCartItem: CartItem = {
        product: filtration[0].product,
        quantity: filtration[0].quantity - 1,
      };

      if(newCartItem.quantity ===0){
        cart = cart.filter((obj) => Number(obj.product.id) !== Number(item.id));
        axios
        .put("https://632012e69f82827dcf243f80.mockapi.io/api/cart/1101", {
          id: 1101,
          cart: cart,
        })
        .then((response) => {
          dispatch(addToCart(cart));
          console.log(cart);
          return
        })
        .catch((err) => {
          console.log(err);
          return
        });
        return
      }

      // cart = cart.filter((obj) => Number(obj.product.id) !== Number(item.id));
      cart = [...cart];
      cart[index] = newCartItem

      axios
        .put("https://632012e69f82827dcf243f80.mockapi.io/api/cart/1101", {
          id: 1101,
          cart: cart,
        })
        .then((response) => {
          dispatch(addToCart(cart));
          console.log(cart);
          setQuantity(quantity-1)
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const deleteHandler:HandleAddCart = (item) => {
      cart = cart.filter(obj => Number(obj.product.id) !== Number(item.id))
      axios
        .put("https://632012e69f82827dcf243f80.mockapi.io/api/cart/1101", {
          id: 1101,
          cart: cart,
        })
        .then((response) => {
          dispatch(addToCart(cart));
          console.log(cart);
          
        })
        .catch((err) => {
          console.log(err);
        });
    }
  

  return (
    <div className='bg-white p-3 my-3 rounded-md shadow-md shadow-gray-300 flex justify-between items-stretch flex-col sm:flex-row gap-2'>
      <img src={item.product.imageUrl} alt={item.product.title} className={"w-full sm:w-1/3 rounded-md object-cover"} />
      <div className='w-full sm:w-1/3 p-3'>
        <div className='text-2xl text-slate-700 font-bold font-serif'>{item.product.title}</div>
        <div className='flex mt-4 items-baseline'>
          <span className='text-lg text-slate-800 font-serif font-semibold italic'>${item.product.price}</span>
          <s className='text-slate-400 font-serif font-medium text-sm mx-2'>{(item.product.price * 1.5).toFixed(2)}</s>
        </div>
        <div className='text-slate-800 mt-0 font-serif text-sm'>reviews(<span className='text-slate-400'>{Math.floor(Math.random() * 49)}</span>)</div>
        <div className='text-sm text-slate-700 mt-3'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius enim magni, fugit ex veniam libero!</div>

        <div className='mt-5 w-full py-1 rounded-md bg-teal-400 text-center font-semibold text-white cursor-pointer border hover:border-teal-500 hover:bg-white hover:text-teal-600 duration-200' onClick={() => { navigate("/edit?id="+item.product.id) }} >Edit Product</div>

      </div>
      <div className='w-full sm:w-1/3 3 text-slate-700'>
        <div className='mt-4 w-full'>
          <div className='text-base font-medium w-full'>
            <p>Quantity in cart</p>
            <div className='flex w-full mt-2 items-center text-center rounded'>
              <button className='w-1/3 rounded-l bg-orange-400 border hover:border-orange-400 hover:bg-white hover:text-orange-600' onClick={() => {
                handleAddCart(item.product)
              }}>+</button>
              <input className='w-1/3 bg-slate-200 p-0.5 text-sm text-center' value={quantity} onChange={() => {
                
              }} type={"number"} ></input>
              <button className='w-1/3 rounded-r bg-red-400 border hover:border-red-400 hover:bg-white hover:text-red-600' onClick={() => {
                handleProductReduce(item.product)
              }}>-</button>
            </div>
            <div className='mt-5 w-full'>
              <p>Total Payable Amount</p>
              <p className='font-serif border border-dashed border-slate-600 px-2 py-0.5'>${(item.product.price*item.quantity).toFixed(2)} <span className='text-xs text-slate-500'>inclusive of all taxes</span></p>
            </div>
            <div className='w-9/12 mt-4 mx-auto rounded-md bg-red-500 py-1 text-white text-sm text-center cursor-pointer  border hover:bg-white hover:border-red-500 hover:text-red-600 duration-200' onClick={()=> deleteHandler(item.product)}>Remove Item From Cart</div>
            <div className='w-9/12 mt-2 mx-auto rounded-md bg-teal-500 py-1 text-white text-sm text-center cursor-pointer border hover:bg-white hover:border-teal-500 hover:text-teal-600 duration-200' onClick={() => {
              handleAddCart(item.product)}
              }>Add to Cart</div>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default CartCard