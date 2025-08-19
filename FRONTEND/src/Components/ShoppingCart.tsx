import BottomFixedBar from "./BottomFixedBar";
import TopFixedBar from "./TopFixedBar";
import cartImage from "../assets/cart.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faShoppingBag, faTrash, faRemove } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCartItemContext } from "../hooks/ItemContext";
import { ACTIONS, LocalProductPayloadType } from "../utils/interfaces";
import Preloader from "../small-components/PreLoader";
import { computeTheTotalAmount, fetchLocation } from "../utils/script";

function ShoppingCart() {
  const navigate = useNavigate();
  const { productItems, dispatch } = useCartItemContext();

  const [cartItem, setCartItem] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<LocalProductPayloadType[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [currentLocation, setCurrentLocation] = useState<string>("");
  const [showMain, setShowMain] = useState<boolean>(false);

  useEffect(() => {
    if (productItems.length === 0) {
      setCartItem(false);
      setSelectedItems([]);
      setTotalAmount(0);
      return;
    }
    setCartItem(true);
    setSelectedItems(productItems);
    setTotalAmount(computeTheTotalAmount(productItems));

    (async () => {
      const location: string = await fetchLocation();
      setCurrentLocation(location);
    })();
  }, [productItems]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMain(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  function handleDiscardProduct(productId: string) {
    setSelectedItems((prevProducts) => {
      const updatedProducts = prevProducts.filter(product => product.id !== productId);
      if (updatedProducts.length === 0) setCartItem(false);
      dispatch({ type: ACTIONS.SET_SELECTED_PRODUCTS, payload: updatedProducts });
      localStorage.setItem("cartItems", JSON.stringify(updatedProducts));
      return updatedProducts;
    });
  }

  function addToCart(id: string, count: number) {
    setSelectedItems(prevItems => {
      const updatedItems = prevItems.map(product =>
        product.id === id ? { ...product, quantity: Math.max(0, product.quantity + count) } : product
      ).filter(p => p.quantity > 0);

      setTotalAmount(computeTheTotalAmount(updatedItems));

      dispatch({ type: ACTIONS.SET_SELECTED_PRODUCTS, payload: updatedItems });
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));

      if (updatedItems.length === 0) setCartItem(false);
      return updatedItems;
    });
  }

  if (!showMain) return <Preloader />;

  return (
    <>
      <TopFixedBar />

      <div className="min-h-screen flex flex-col bg-gray-900 text-white">
        <main className="flex-grow container mt-40 mx-auto px-4 py-6">
          {cartItem ? (
            <div className="flex flex-col gap-6">
              <header className="mb-4">
                <h1 className="text-2xl font-extrabold tracking-tight">YOUR CART</h1>
                <p className="text-gray-300 mt-1">
                  There {productItems.length === 1 ? "is" : "are"} {productItems.length} product{productItems.length > 1 && "s"} in your cart
                </p>
              </header>

              {/* Cart Items Table */}
              <div className="overflow-x-auto rounded-lg border border-gray-700 bg-gray-800 shadow-lg">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Unit Price</th>
                      <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Subtotal</th>
                      <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Remove</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {selectedItems.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-700">
                        <td className="px-6 py-4 font-semibold">{item.name}</td>
                        <td className="px-6 py-4 text-center">₹{item.price}</td>
                        <td className="px-6 py-4 text-center">
                          <div className="inline-flex items-center space-x-3">
                            <button
                              className="bg-red-600 hover:bg-red-500 transition px-3 py-1 rounded"
                              onClick={() => addToCart(item.id, -1)}
                              aria-label={`Decrease quantity of ${item.name}`}
                            >
                              –
                            </button>
                            <span className="mx-1">{item.quantity}</span>
                            <button
                              className="bg-green-600 hover:bg-green-500 transition px-3 py-1 rounded"
                              onClick={() => addToCart(item.id, 1)}
                              aria-label={`Increase quantity of ${item.name}`}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center font-semibold">
                          ₹{Number(item.price) * item.quantity}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            className="text-red-600 hover:text-red-400"
                            onClick={() => handleDiscardProduct(item.id)}
                            title="Remove"
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            <FontAwesomeIcon icon={faTrash} size="lg" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Cart Totals */}
              <section className="mt-6 bg-gray-800 rounded-lg p-6 max-w-md ml-auto shadow-lg">
                <h2 className="text-xl font-bold mb-4">CART TOTALS</h2>
                <div className="flex justify-between text-gray-300 mb-2">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-gray-300 mb-2">
                  <span>Deliver To</span>
                  <span>{currentLocation || "Fetching location..."}</span>
                </div>
                <div className="flex justify-between font-bold text-green-400 text-lg mb-6">
                  <span>Total</span>
                  <span>₹{totalAmount}</span>
                </div>
                <button
                  onClick={() => navigate("/cart/checkout-items")}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold flex justify-center items-center gap-2 transition"
                >
                  <FontAwesomeIcon icon={faShoppingBag} />
                  Checkout
                </button>
              </section>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-96 space-y-6">
              <img src={cartImage} alt="Empty cart" className="w-36 h-36 object-contain" />
              <h2 className="text-3xl font-bold text-gray-300">Your Cart is currently empty</h2>
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                <FontAwesomeIcon icon={faHome} />
                Continue Shopping
              </button>
            </div>
          )}
        </main>

        <BottomFixedBar />
      </div>
    </>
  );
}

export default ShoppingCart;
