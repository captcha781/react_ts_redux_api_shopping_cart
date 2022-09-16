import React from 'react'
import EditWrapper from '../Components/Edits/EditWrapper'
import { useAppState } from '../Store/Hooks'
const Edit = () => {
    const length = useAppState(state => state.cart.products).length
    return (
        <div className='w-11/12 md:w-9/12 lg:w-5/12 mx-auto mt-8'>
            {length !== 0 ? <h2 className='text-xl font-bold text-slate-800'>Edit Page</h2>:<></>}
            <EditWrapper/>
        </div>
    )
}

export default Edit