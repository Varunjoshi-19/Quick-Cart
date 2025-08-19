import styles from "../Styling/ProductList.module.css";
import { useNavigate } from "react-router-dom";
import { SlideToTop } from "../utils/script.js";
import { useCartItemContext } from "../hooks/ItemContext";
import { ACTIONS } from "../utils/interfaces";

type Product = {
    _id: string;
    productName: string;
    productImage: string;
    realPrice: number;
    discountPrice: number;
    productDesc?: string;
    category?: string;
    quantity?: number;
};

type PropsType = {
    moveLeftSideScroll: (element: string) => void;
    moveRightSideScroll: (element: string) => void;
    ID: string;
    productList: Product[];
};

function ProductSlider({ moveLeftSideScroll, moveRightSideScroll, ID, productList }: PropsType) {
    const navigate = useNavigate();
    const { productItems, dispatch } = useCartItemContext();

    function NavigateAndRestThings(id: string) {
        navigate(`/product/${id}`);
        SlideToTop();
    }

    function addToCart(id: string, count: number) {
        const updatedCart = [...productItems];
        const index = updatedCart.findIndex((p) => p.id === id);
        if (index > -1) {
            const newQty = updatedCart[index].quantity + count;
            if (newQty <= 0) {
                updatedCart.splice(index, 1);
            } else {
                updatedCart[index] = { ...updatedCart[index], quantity: newQty };
            }
        } else if (count > 0) {
            const productToAdd = productList.find((p) => p._id === id);
            if (productToAdd) {
                updatedCart.push({
                    id: productToAdd._id,
                    quantity: count,
                    name: productToAdd.productName,
                    price: String(productToAdd.discountPrice),
                    category: productToAdd.category || "",
                    description: productToAdd.productDesc || "",
                });
            }
        }
        dispatch({ type: ACTIONS.SET_SELECTED_PRODUCTS, payload: updatedCart });
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }

    return (
        <div className={styles.productListContainer} style={{ position: "relative" }}>
            <div id={ID} className={styles.productList} style={{ scrollBehavior: "smooth", display: "flex", gap: "1rem", overflowX: "auto" }}>
                {productItems && productList.map((each) => {
                    const counter = productItems.find((p) => p.id === each._id)?.quantity ?? 0;

                    return (
                        <div
                            key={each._id}
                            className={styles.eachProductList}
                            onClick={() => NavigateAndRestThings(each._id)}
                            style={{
                                cursor: "pointer",
                                backgroundColor: "#1E1E1E",
                                borderRadius: "12px",
                                minWidth: "180px",
                                padding: "12px",
                                color: "#fff",
                                flexShrink: 0,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}
                        >
                            <img
                                src={each.productImage}
                                alt={each.productName}
                                style={{ width: "100%", height: "140px", objectFit: "cover", borderRadius: "10px", marginBottom: "8px" }}
                                loading="lazy"
                            />
                            <h3
                                style={{
                                    margin: 0,
                                    fontSize: "1rem",
                                    fontWeight: "600",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {each.productName}
                            </h3>
                            <p className="text-sm text-gray-500 line-through">₹{each.realPrice}</p>
                            <p style={{ fontWeight: "bold", fontSize: "1.1rem", margin: "4px 0", color: "#4F46E5" }}>₹{each.discountPrice}</p>

                            {/* New category and description */}
                            {each.productDesc && (
                                <p style={{ fontSize: "0.9rem", color: "#D1D5DB", marginTop: "4px", flexGrow: 1, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>
                                    {each.productDesc.substring(0, 100)}...
                                </p>
                            )}

                            <div className="flex items-center justify-center gap-2 mt-auto">
                                {counter === 0 ? (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            addToCart(each._id, 1);
                                        }}
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded text-sm font-medium w-full"
                                    >
                                        Add to Cart
                                    </button>
                                ) : (
                                    <div className="flex items-center gap-3 justify-center w-full bg-gray-800 rounded px-2 py-1">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addToCart(each._id, -1);
                                            }}
                                            className="text-white font-bold text-xl hover:bg-indigo-700 rounded p-1 transition"
                                            aria-label={`Decrease quantity of ${each.productName}`}
                                        >
                                            &minus;
                                        </button>
                                        <span className="text-white font-semibold">{counter}</span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addToCart(each._id, 1);
                                            }}
                                            className="text-white font-bold text-xl hover:bg-indigo-700 rounded p-1 transition"
                                            aria-label={`Increase quantity of ${each.productName}`}
                                        >
                                            &#43;
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <button
                onClick={() => moveLeftSideScroll(ID)}
                style={{
                    zIndex: 3,
                    position: "absolute",
                    top: "40%",
                    left: "10px",
                    padding: "10px",
                    borderRadius: "50%",
                    border: "none",
                    backgroundColor: "#181A1B",
                    color: "white",
                    fontSize: "1.5rem",
                    fontWeight: "bolder",
                    cursor: "pointer",
                    userSelect: "none",
                }}
                aria-label="Scroll left"
            >
                {"<"}
            </button>
            <button
                onClick={() => moveRightSideScroll(ID)}
                style={{
                    position: "absolute",
                    top: "40%",
                    right: "10px",
                    padding: "10px",
                    borderRadius: "50%",
                    border: "none",
                    backgroundColor: "#181A1B",
                    color: "white",
                    fontSize: "1.5rem",
                    fontWeight: "bolder",
                    cursor: "pointer",
                    userSelect: "none",
                }}
                aria-label="Scroll right"
            >
                {">"}
            </button>
        </div>
    );
}

export default ProductSlider;
