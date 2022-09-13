import { createSlice, PayloadAction } from "@reduxjs/toolkit"


const initialState: InitialState = {

    products: [
        
    ],
    cart: [
        
    ]
}

export const cartSlice = createSlice({
    initialState,
    name: "cart",
    reducers: {
        initializeProduct: (state: InitialState, action: PayloadAction<Product[]>) => {
            state.products = action.payload
        },
        initializeCart: (state: InitialState, action: PayloadAction<CartItem[]>) => {
            state.cart = action.payload
        },
        addToCart: (state: InitialState, action:PayloadAction<CartItem[]>) => {
            state.cart = action.payload
        }
    }
})


export const {initializeProduct, initializeCart, addToCart} = cartSlice.actions
export default cartSlice.reducer
