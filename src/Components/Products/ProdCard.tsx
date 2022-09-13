import axios from "axios";
import React from "react";
import { addToCart } from "../../Features/Cart";
import { useAppDispatch, useAppState } from "../../Store/Hooks";

// [
//     {
//      "id": 1,
//      "cart": [
//       {
//        "product": {
//         "id": 1,
//         "title": "A Book",
//         "price": 199.5,
//         "description": "This is really a good book...",
//         "imageUrl": "https://unsplash.com/photos/lGlZJ1TyI8E/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8NXx8Ym9va3xlbnwwfDJ8fHwxNjYyOTc3NTgy&force=true&w=640"
//        },
//        "quantity": 1
//       },
//       {
//        "product": {
//         "title": "Mobile Phone",
//         "price": 1299,
//         "description": "This is a fantastic smartphone",
//         "imageUrl": "https://unsplash.com/photos/xdLXPic3Wfk/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8OHx8cGhvbmV8ZW58MHwyfHx8MTY2Mjk4MjIwMw&force=true&w=640",
//         "id": "2"
//        },
//        "quantity": 3
//       }
//      ]
//     }
//    ]

interface Props {
  product: Product;
}

interface ProdCardType {
  ({ product }: Props): JSX.Element;
}



const ProdCard: ProdCardType = ({ product }) => {
  const dispatch = useAppDispatch();
  let cart = useAppState((state) => state.cart.cart);

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
          
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-2 bg-white rounded-md shadow-xl shadow-gray-300">
        <img
          className="rounded-t-md"
          src={product.imageUrl}
          alt={product.title}
        />
        <div className="p-3">
          <h2 className="text-xl font-bold text-gray-800 py-1.5">
            {product.title}
          </h2>
          <p className="text-lg font-medium italic text-gray-800">
            ${product.price}
          </p>
          <p className="text-sm font-base text-gray-400 py-1 5">
            {product.description}
          </p>
          <button
            className="w-full py-1 bg-indigo-800 rounded-md text-white border border-indigo-800 hover:bg-white hover:text-indigo-800 duration-200"
            onClick={() => handleAddCart(product)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProdCard;
