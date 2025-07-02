import BottomFixedBar from "./BottomFixedBar"
import styles from "../Styling/Cart.module.css";
import TopFixedBar from "./TopFixedBar";
import cartImage from "../assets/cart.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faShoppingBag, faTrash, faRemove } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCartItemContext } from "../hooks/ItemContext";
import { ACTIONS, LocalProductPayloadType } from "../utils/interfaces";


function ShoppingCart() {


  const navigate = useNavigate();
  const [cartItem, setCartItem] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<LocalProductPayloadType[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  let amount = 0;
  const { productItems, dispatch } = useCartItemContext();

  useEffect(() => {

    if (productItems.length == 0) return;
    setCartItem(true);
    setSelectedItems(productItems);
    setTotalAmount(computeTheTotalAmount(productItems));
  }, [productItems]);




  function handleDiscardProduct(productId: string) {
    setSelectedItems(prevProducts => {
      const updatedProducts = prevProducts.filter(product => product.id !== productId);

      if (updatedProducts.length === 0) {
        setCartItem(false);

      }
      dispatch({ type: ACTIONS.SET_SELECTED_PRODUCTS, payload: updatedProducts });
      localStorage.setItem("cartItems", JSON.stringify(updatedProducts));

      return updatedProducts;
    });
  }

  function computeTheTotalAmount(allItems: LocalProductPayloadType[]) {
    let total = amount;

    if (allItems && allItems.length > 0) {
      allItems.forEach(each => {
        total += Number(each.price) * each.count;
      })

      console.log("HERE THE TOTAL AMOUNT CALUCLATED", total);
    }

    amount = total;
    return total;

  }

  function addToCart(id: string, count: number) {
    setSelectedItems(prevItems => {
      const updatedItems = prevItems.map(product => {
        if (product.id === id) {
          setTotalAmount(computeTheTotalAmount(updatedItems));
          return { ...product, count: product.count + count }
        } else {
          return product;
        }

      });


      const selectedProducts = updatedItems.filter(p => p.count > 0);
      dispatch({ type: ACTIONS.SET_SELECTED_PRODUCTS, payload: selectedProducts });
      localStorage.setItem("cartItems", JSON.stringify(selectedProducts));


      if (selectedProducts.length === 0) {
        setCartItem(false);
      }

      return selectedProducts;
    });
  }




  return (
    <>
      <TopFixedBar />

      <div className={styles.ShoppingCartContainer} >

        {cartItem ?

          <div className={styles.CartContentMiddleOne}>
            <div style={{ display: "flex", flexDirection: "column", marginLeft: "20px", marginTop: "30px", gap: "5px" }} >
              <span style={{ fontSize: "1.2rem", fontFamily: "sans-serif", fontWeight: "bolder" }} >YOUR CART</span>
              <span style={{ fontFamily: "sans-serif" }} >There {productItems.length == 1 ? "is only" : "are"} {productItems.length} product in your cart</span>
            </div>


            <div className={styles.productCartItemsContain} >

              <div id={styles.allItemsCart}  >

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0" }}>
                  <span style={{ flex: 2, fontWeight: 600, textAlign: "left", marginLeft: "10px" }}>Product</span>
                  <span style={{ flex: 1, textAlign: "right" }}>Unit Price</span>
                  <span style={{ flex: 1, textAlign: "right" }}>Quantity</span>
                  <span style={{ flex: 1, textAlign: "right" }}>Subtotal</span>
                  <span style={{ flex: 0.5, textAlign: "right", marginRight: "10px" }}>
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                </div>


                {selectedItems.map((item, index) => (
                  <div key={index} style={{
                    display: "flex",
                    cursor: "pointer",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "#232526",
                    borderRadius: "8px",
                    padding: "16px",
                    marginBottom: "12px"
                  }}>
                    <div style={{ flex: 2, fontWeight: 600 }}>{item.name}</div>
                    <div style={{ flex: 1, textAlign: "center" }}>₹{item.price}</div>
                    <div style={{ flex: 1, textAlign: "center" }}>


                      <div className="flex items-center gap-2">
                        <button
                          className="bg-red-600 px-2 py-1 rounded text-lg"
                          onClick={() => { addToCart(item.id, -1) }}
                        >-</button>
                        <span className="px-2">{item.count}</span>
                        <button
                          className="bg-red-600 px-2 py-1 rounded text-lg"
                          onClick={() => { addToCart(item.id, 1) }}
                        >+</button>
                      </div>


                    </div>
                    <div style={{ flex: 1, textAlign: "center" }}>₹{Number(item.price) * item.count}</div>
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        color: "#C10537",
                        fontSize: "1.2rem",
                        cursor: "pointer"
                      }}

                      title="Remove"
                      onClick={() => handleDiscardProduct(item.id)} // implement this function as needed
                    >
                      <FontAwesomeIcon icon={faRemove} />
                    </button>
                  </div>
                ))}





              </div>


              <div id={styles.cartTotals} >

                <p style={{
                  padding: "10px 20px", width: "95%",
                  fontWeight: "bolder",
                  borderBottom: "1px solid #ffffff4d"
                }} >CART TOTALS</p>

                <div id={styles.cartTotItems} >
                  <span>Sub Total</span>
                  <span style={{ color: "#C10537" }} >
                    {String(totalAmount)}
                  </span>
                </div>

                <div id={styles.cartTotItems} >
                  <span>shipping</span>
                  <span>free</span>
                </div>

                <div id={styles.cartTotItems} >
                  <span>Deliver To</span>
                  <span>India</span>
                </div>

                <div id={styles.cartTotItems} >
                  <span>Total</span>
                  <span style={{ color: "#C10537" }} >712389791</span>
                </div>

                <button id={styles.checkoutBagCart} >
                  <FontAwesomeIcon icon={faShoppingBag} style={{ fontSize: "1rem", color: "white" }} />
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
