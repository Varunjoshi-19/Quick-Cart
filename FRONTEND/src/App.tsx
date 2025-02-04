import  { BrowserRouter , Routes, Route } from "react-router-dom"
 import DashBoard from "./Components/DashBoard"
import Login from "./Components/Login"
import SignUp from "./Components/SignUp"
import ShoppingCart from "./Components/ShoppingCart"
import MyAccount from "./Components/MyAccount"
function App() {
  return (
    <>

       <BrowserRouter>
        <Routes>

          <Route  path="/"  element ={<DashBoard/>} />
          <Route  path="/login"  element ={<Login/>} />
          <Route  path="/signup"  element ={<SignUp/>} />
          <Route  path="/cart"  element ={<ShoppingCart/>} />
          <Route  path="/my-account"  element ={<MyAccount/>} />
          <Route  path="/orders"  element ={<ShoppingCart/>} />
          <Route  path="/my-list"  element ={<ShoppingCart/>} />
          

          
          

        </Routes>
       </BrowserRouter>
    </>
  )
}

export default App
