import BottomFixedBar from "./BottomFixedBar"
import styles from "../Styling/Cart.module.css";
import TopFixedBar from "./TopFixedBar";
import cartImage from "../assets/cart.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


function ShoppingCart() {


const navigate = useNavigate();

  return (
    <>
      <TopFixedBar/>   
 
    <div  className={styles.ShoppingCartContainer} >
        <div className={styles.CartContentMiddleOne} >
            
            <div style={{ display :"flex" , flexDirection :"column" , marginLeft : "20px" , marginTop :"30px" , gap : "5px" }} >
               <span style={{ fontSize : "1.2rem" , fontFamily : "sans-serif" , fontWeight :"bolder" }} >YOUR CART</span>
               <span style={{fontFamily:"sans-serif"   }} >There is no product in your cart</span>
            </div>

            <div style={{ display :"flex" , flexDirection : "column" , alignItems : "center" , justifyContent :"center" , height :"300px",
              gap : "10px"

             }}>
                <img src={cartImage} alt="" width="150px"/>
                <span style={{ fontSize :"2rem" , fontFamily:"sans-serif"  }}>Your Cart is currently empty</span>
                <button   onClick={() => navigate("/")} id={styles.continueShop}>  
                  <FontAwesomeIcon icon={faHome} />
                  Continue Shopping
                  </button>
            </div>

        </div>
        
      <BottomFixedBar/>
    </div>

    </>
  )
}

export default ShoppingCart
