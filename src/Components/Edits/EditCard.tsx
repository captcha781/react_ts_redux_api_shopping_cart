import axios from 'axios'
import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import { initializeCart, initializeProduct } from '../../Features/Cart'
import { useAppState, useAppDispatch } from '../../Store/Hooks'

interface Prop {
    product: Product
}

const EditCard = ({ product }: Prop) => {
    const navigate = useNavigate()
    const [newData, setNewData] = useState<Product>(product)
    let products = useAppState(state => state.cart.products)
    products = [...products]
    let cart = useAppState(state => state.cart.cart)
    cart = [...cart]
    const dispatch = useAppDispatch()

    const updateHandler = () => {
        let productIndex = products.findIndex(val => Number(val.id) === Number(newData.id))
        axios.put("https://632012e69f82827dcf243f80.mockapi.io/api/products/"+product.id, newData)
        .then(response => {
            products[productIndex] = newData
            
            dispatch(initializeProduct(products))
            let cartIndex = cart.findIndex(val => Number(val.product.id) === Number(newData.id))
            let cartFilter= cart.filter(val => Number(val.product.id) === Number(newData.id))

            cart[cartIndex] = {product: newData, quantity: cartFilter[0].quantity}
            
            return axios.put("https://632012e69f82827dcf243f80.mockapi.io/api/cart/1101",{
                id: 1101,
                cart: cart
            })
        })
        .then(res => {
            dispatch(initializeCart(cart))
            navigate("/cart")
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div className='w-full  p-3 mx-auto bg-white'>
            <form className='w-11/12 mx-auto'>
                <div className='my-1.5 w-full'>
                    <label>Title</label>
                    <input className='w-full rounded bg-slate-200 active:bg-slate-300 p-2' type={"text"} defaultValue={newData.title} onChange={e => {
                        setNewData({ ...newData, title: e.target.value })
                    }} />
                </div>
                <div className='my-1.5 w-full'>
                    <label>Price</label>
                    <input className='w-full rounded bg-slate-200 active:bg-slate-300 p-2' type={"Number"} defaultValue={newData.price} onChange={e => {
                        setNewData({ ...newData, price: Number(e.target.value) })
                    }} />
                </div>
                <div className='my-1.5 w-full'>
                    <label>Description</label>
                    <input className='w-full rounded bg-slate-200 active:bg-slate-300 p-2' type={"text"} defaultValue={newData.description} onChange={e => {
                        setNewData({ ...newData, description: e.target.value })
                    }} />
                </div>
                <div className='my-1.5 w-full'>
                    <label>ImageUrl</label>
                    <input className='w-full rounded bg-slate-200 active:bg-slate-300 p-2' type={"text"} defaultValue={newData.imageUrl} onChange={e => {
                        setNewData({ ...newData, imageUrl: e.target.value })
                    }} />
                </div>
                <div className="my-1.5 w-full flex justify-end">
                    <button className='px-3 py-1 bg-teal-500 text-white border-2 border-teal-500 hover:bg-white hover:text-teal-600 rounded-md duration-200 mx-1' type={"button"} onClick={updateHandler}>Update</button>
                    <button className='px-3 py-1 bg-red-500 text-white border-2 border-red-500 hover:bg-white hover:text-red-600 rounded-md duration-200 mx-1' type={"button"} onClick={() => {
                        navigate("/cart")
                    }}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default EditCard