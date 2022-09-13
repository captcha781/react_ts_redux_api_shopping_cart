import React from 'react'
import { useAppState } from '../../Store/Hooks'
import CartWrapper from './CartWrapper'

const CartMain = () => {
    const length = useAppState(state => state.cart.cart).length
  return (
    <div className='w-11/12 md:w-9/12 lg:w-5/12 mx-auto mt-8'>
        {length !== 0 ? <h2 className='text-xl font-bold text-slate-800'>Your Cart</h2>:<></>}
        <CartWrapper/>
    </div>
  )
}

export default CartMain