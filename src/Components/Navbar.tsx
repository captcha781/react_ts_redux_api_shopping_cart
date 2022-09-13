import React from 'react'
import { useLocation } from 'react-router-dom'
import { ShoppingCartOutlined } from "@ant-design/icons"
import { Link } from 'react-router-dom'

// {/* <span className='w-5 h-5 text-xs text-center absolute rounded-full bg-red-500 -translate-x-2 -translate-y-2'>4</span> */}

const Navbar = () => {
    const location = useLocation()
    
  return (
    <div className='w-full px-3 py-2 flex justify-between items-center bg-slate-700 text-white'>
        <p className='font-semibold text-lg flex items-center gap-1'><ShoppingCartOutlined />Cart Project</p>
        <ul className='list-none flex justify-evenly items-center'>
            <Link to={"/"}>{location.pathname === "/" ? <li className='mx-2 text-base font-medium bg-slate-500 hover:bg-slate-400 px-2 py-0.5 rounded-md'>Home</li> : <li className='mx-2 text-base font-medium hover:bg-slate-400 px-2 py-0.5 rounded-md'>Home</li>}</Link>
            <Link to={"/cart"}>{location.pathname === "/cart" ? <li className='mx-2 text-base font-medium bg-slate-500 hover:bg-slate-400 px-2 py-0.5 rounded-md'>Cart</li> : <li className='mx-2 text-base font-medium hover:bg-slate-400 px-2 py-0.5 rounded-md'>Cart</li>}</Link>
        </ul>
    </div>
  )
}

export default Navbar
