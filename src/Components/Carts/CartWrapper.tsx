import React from 'react'
import { useAppState } from '../../Store/Hooks'

import CartCard from './CartCard'

const CartWrapper = () => {

const cart:CartItem[] = useAppState(state => state.cart.cart)
    
    
  return (
    <div className='mt-3 w-full'>
        {cart.length !== 0 ? 
        <>
        {
            cart.map(item => {
                return <CartCard key={item.product.id} item={item} />
            })
        }
        <div className='w-full p-3 text-center  rounded-md shadow-lg shadow-gray-300 font-medium border-2 bg-indigo-400 text-white hover:bg-white hover:text-indigo-500 border-indigo-400 duration-200 cursor-pointer'>
            Proceed to Checkout
        </div>
        </> : <>
            <div className='w-full mt-10 text-xl font-medium text-slate-700 text-center'>There is no items in the cart</div>
        </>
    }
        
    </div>
  )
}

export default CartWrapper