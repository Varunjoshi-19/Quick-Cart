import BottomFixedBar from "./BottomFixedBar"
import styles from "../Styling/Cart.module.css";
import TopFixedBar from "./TopFixedBar";
import cartImage from "../assets/cart.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {  DummyCartItems } from "../utils/getData"


function ShoppingCart() {


  const navigate = useNavigate();
  const [cartItem, setCartItem] = useState<boolean>(true);

  return (
    <>
      <TopFixedBar />

      <div className={styles.ShoppingCartContainer} >

        {cartItem ?

          <div className={styles.CartContentMiddleOne}>
            <div style={{ display: "flex", flexDirection: "column", marginLeft: "20px", marginTop: "30px", gap: "5px" }} >
              <span style={{ fontSize: "1.2rem", fontFamily: "sans-serif", fontWeight: "bolder" }} >YOUR CART</span>
              <span style={{ fontFamily: "sans-serif" }} >There are 2 product in your cart</span>
            </div>


            <div className={styles.productCartItemsContain} >

              <div id={styles.allItemsCart}  >

                <div style={{ display: "flex"  , justifyContent :"space-between" , padding : "10px"
                , backgroundColor :"#282B2D", borderRadius :"10px", marginBottom :"10px"

                 }} >
                  <div>
                    <span>Product</span>
                  </div>

                  <div style={{ display :"flex" , gap :"40px" }} >
                    <span>Unit Price</span>
                    <span>Quantity</span>
                  </div>


                  <div style={{ display :"flex" , gap :"40px" }} >
                    <span>Subtotal</span>
                    <span>Remove</span>
                  </div>
                </div>

{/* dummy cart items */}
 
                {DummyCartItems.map((item , index) => (

                  <div  key={index} className={styles.eachAddItem} >
                      <div style={{ display :"flex" , gap :"20px" }} >
                      <img src={item.product.productImage} alt="" style={{ width :"50px" }} />
                      <span>{item.product.productName}</span>
                      </div>

                       <div style={{ display :"flex" , gap :"100px"  }}>
                       <span>{item.price}</span>
                       <span>{item.quntity}</span>
                       </div>

                       <div style={{ display :"flex" , gap :"80px" , marginLeft :"150px" }} >
                        <span>{item.subtotal}</span>
                        <span>X</span>
                       </div>
                  </div>


                ))}


              </div>


              <div id={styles.cartTotals} >
 
                 <p style={{ padding : "10px 20px" , width : "95%"  , 
                   fontWeight :"bolder",
                  borderBottom :"1px solid #ffffff4d" }} >CART TOTALS</p>
                  
                     <div id={styles.cartTotItems } >
                      <span>Sub Total</span>
                      <span style={{ color : "#C10537"}} >123192301</span>
                     </div>
                     
                     <div id={styles.cartTotItems } >
                      <span>shipping</span>
                      <span>free</span>
                     </div>

                     <div id={styles.cartTotItems } >
                      <span>Deliver To</span>
                      <span>India</span>
                     </div>

                     <div id={styles.cartTotItems } >
                      <span>Total</span>
                      <span style={{ color : "#C10537"}} >712389791</span>
                     </div>

                     <button id={styles.checkoutBagCart} >
                       <FontAwesomeIcon icon={faShoppingBag} style={{ fontSize : "1rem" , color : "white" }} />
                       <span>Checkout</span> 
                      </button>
              </div>

            </div>

          </div>

          :

          <div className={styles.CartContentMiddleOne} >

            <div style={{ display: "flex", flexDirection: "column", marginLeft: "20px", marginTop: "30px", gap: "5px" }} >
              <span style={{ fontSize: "1.2rem", fontFamily: "sans-serif", fontWeight: "bolder" }} >YOUR CART</span>
              <span style={{ fontFamily: "sans-serif" }} >There is no product in your cart</span>
            </div>

            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "300px",
              gap: "10px"

            }}>
              <img src={cartImage} alt="" width="150px" />
              <span style={{ fontSize: "2rem", fontFamily: "sans-serif" }}>Your Cart is currently empty</span>
              <button onClick={() => navigate("/")} id={styles.continueShop}>
                <FontAwesomeIcon icon={faHome} />
                Continue Shopping
              </button>
            </div>

          </div>


        }

        <BottomFixedBar />
      </div>

    </>
  )
}

export default ShoppingCart
