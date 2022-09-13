import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Cart from "./Pages/Cart";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import axios from "axios";
import { initializeProduct, initializeCart } from "./Features/Cart";
import { useAppDispatch } from "./Store/Hooks"
import { IconButton, Snackbar } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

const App: React.FC = (): JSX.Element => {

  const dispatch = useAppDispatch()
  const [open, setOpen] = useState<boolean>(false)
  const [responseText, setResponseText] = useState<string>("")

  const handleClose: HandleClose = () => {
    setOpen(false)
  }

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
      <CloseIcon fontSize="small" />
      </IconButton>
    </>
  )

  useEffect(() => {
    axios.get("https://632012e69f82827dcf243f80.mockapi.io/api/products")
      .then(response => {
        console.log(response.data);
        
        axios.get("https://632012e69f82827dcf243f80.mockapi.io/api/cart")
        .then(response => {
          console.log(response.data[0].cart);
          dispatch(initializeCart(response.data[0].cart))
          setResponseText("Items loaded Successfully")
          setOpen(true)
        })
        .catch(err => {
          console.log(err);
          setResponseText("Error in Loading Cart")
        })

        dispatch(initializeProduct(response.data))
      })
      .catch(err => {
        console.log(err);
      })
  }, [dispatch])

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={responseText}
        action={action}
      />
    </>
  );
}

export default App;


