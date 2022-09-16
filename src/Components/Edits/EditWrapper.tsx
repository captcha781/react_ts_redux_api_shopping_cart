import React from 'react'
import { useAppState } from '../../Store/Hooks'
import EditCard from './EditCard'
import { useSearchParams } from 'react-router-dom'

const EditWrapper = () => {
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [params, setParams] = useSearchParams()

    const product:Product[] = useAppState(state => state.cart.products)
    const filter = product.filter(val => Number(val.id) === Number(params.get("id")))
    return (
        <div className='mt-3 w-full'>
            {filter.length !== 0 ? 
            <>
            {
                filter.map(item => {
                    return <EditCard key={item.id} product={item} />
                })
            }
            
            </> : <>
                <div className='w-full mt-10 text-xl font-medium text-slate-700 text-center'>There is no item with this product ID</div>
            </>
        }
            
        </div>
      )
}

export default EditWrapper