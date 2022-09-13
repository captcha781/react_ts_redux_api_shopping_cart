interface Product {
    id: number
    title:string
    description:string
    price:number
    imageUrl:string
}

interface CartItem {
    product: Product
    quantity: number
}

interface InitialState {
    products: Product[]
    cart: CartItem[]
}

interface HandleClose {
    ():void
}

interface HandleAddCart {
    (item: Product): void;
  }

  interface HandleAddCartCustom {
    (item: Product,func:React.SetStateAction<number>): void;
  }