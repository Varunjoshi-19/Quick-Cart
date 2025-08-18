import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import DashBoard from "./Components/DashBoard"
import Login from "./Components/Login"
import SignUp from "./Components/SignUp"
import ShoppingCart from "./Components/ShoppingCart"
import MyAccount from "./Components/MyAccount"
import MyList from "./Components/MyList"
import Product from "./Components/Product"
import SingleProduct from "./Components/SingleProduct"
import Orders from "./Components/Orders"
import Admin from "./Components/Admin"
import { useUserAuthContext } from "./hooks/UserContext"
import { useEffect, useState } from "react"
import Preloader from "./small-components/PreLoader"
import Checkout from "./Components/Checkout"
function App() {

  const { user } = useUserAuthContext();

  const [showMain, setShowMain] = useState<boolean>(false);


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMain(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!showMain) {
    return <Preloader />
  }


  return (
    <>

      <BrowserRouter>
        <Routes>

          <Route path="/" element={<DashBoard />} />
          <Route path="/cart/checkout-items" element={<Checkout />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/my-account" element={!user ? <Login /> : <MyAccount />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/my-list" element={<MyList />} />
          <Route path="/products/category/:id" element={<Product />} />
          <Route path="/products/subCategory/:id" element={<Product />} />
          <Route path="/product/:id" element={<SingleProduct />} />







        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
