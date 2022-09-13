import React from 'react'
import { useAppState } from '../../Store/Hooks'
import ProdCard from './ProdCard'

const Product: React.FC = (): JSX.Element => {

    const products: Product[] = useAppState(state => state.cart.products)

    return (
        <>
            {products && <div className='mt-8 w-11/12 mx-auto grid grid-cols-12 gap-2'>
                {products.map(prod => {
                    return <ProdCard product={prod} key={prod.id} />
                })}
            </div>}
        </>
    )
}

export default Product