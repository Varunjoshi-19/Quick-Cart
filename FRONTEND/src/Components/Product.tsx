import BottomFixedBar from "./BottomFixedBar";
import TopFixedBar from "./TopFixedBar";
import styles from "../Styling/Product.module.css";
import { ProductCategoryItem, SalesImages } from "../utils/GetImage.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import bigCube from "../assets/bigCube.svg";
import smallCube from "../assets/smallCube.svg";
import threeLine from "../assets/threeLine.svg";
import { Images } from "../utils/GetImage.ts";
import { getCurrentProducts } from "@/utils/getProducts.ts";
import { useNavigate, useParams } from "react-router-dom";
import { useUserAuthContext } from "@/hooks/UserContext.tsx";
import { useCartItemContext } from "@/hooks/ItemContext.tsx";
import { ACTIONS } from "@/utils/interfaces.ts";
import { CardFooter } from "@/comp/components/ui/card.tsx";

type ImagesType = {
  src: string;
  name: string;
  backgroundColor: string;
  isSelected: boolean;
}[];

function Product() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useUserAuthContext();
  const { productItems, dispatch } = useCartItemContext();

  const [productCatItems, setProductCatItems] = useState<string[]>([]);
  const [allImages, setAllImages] = useState<ImagesType>(Images);
  const [currentProductList, setCurrentProductList] = useState<any[] | null>(null);
  const [selectedRadioValue, setSelectedRadioValue] = useState<string>("");
  const [maxPriceRange, setMaxPriceRange] = useState<string>("100");
  const [minPriceRange, setMinPriceRange] = useState<string>("0");
  const [productCounter, setProductCounter] = useState<any[]>([]);

  useEffect(() => {
    const items = ProductCategoryItem();
    setProductCatItems(items);
  }, []);

  useEffect(() => {
    if (id) {
      setCurrentProductList(null);
      const allProducts: any = getCurrentProducts(id);
      setCurrentProductList(allProducts);
    }
  }, [id]);

  useEffect(() => {
    if (!currentProductList) return;

    const updatedCounter = currentProductList.map((product) => {
      const inCart = productItems.find((p) => p.id === product._id);
      return {
        id: product._id,
        quantity: inCart ? inCart.quantity : 0,
        name: product.productName,
        price: product.discountPrice,
        category: product.category,
        description: product.productDesc || "",
        additionalInfo: product.AdditionalInfo || {},
      };
    });
    setProductCounter(updatedCounter);
  }, [currentProductList, productItems]);

  function addToCart(id: string, count: number) {
    if (!user) {
      navigate("/login");
      return;
    }

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
      // Find product details from current products
      const productToAdd = currentProductList?.find((p) => p._id === id);
      if (productToAdd) {
        updatedCart.push({
          id: productToAdd._id,
          quantity: count,
          name: productToAdd.productName,
          price: productToAdd.discountPrice,
          category: productToAdd.category,
          description: productToAdd.productDesc || "",
        });
      }
    }

    dispatch({ type: ACTIONS.SET_SELECTED_PRODUCTS, payload: updatedCart });
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  }

  function moveRightSideScroll(element: string) {
    const slider = document.getElementById(element);
    if (slider) slider.scrollLeft += 232;
  }
  function moveLeftSideScroll(element: string) {
    const slider = document.getElementById(element);
    if (slider) slider.scrollLeft -= 232;
  }

  return (
    <>
      <TopFixedBar />
      <div style={{ position: "absolute", top: "25%" }}>
        <div className={styles.ProductsContainer}>
          {/* Left Sidebar: Categories, Filters */}
          <div className={styles.ProductCategory}>
            <p style={{ fontWeight: "bolder", fontSize: "1rem" }}>PRODUCT CATEGORIES</p>
            <div className={styles.productCategoryItems}>
              {productCatItems.map((item, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="radio"
                    value={item}
                    checked={selectedRadioValue === item}
                    onChange={() => setSelectedRadioValue(item)}
                  />
                  <p onClick={() => setSelectedRadioValue(item)} style={{ cursor: "pointer" }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className={styles.priceChanger}>
              <span style={{ fontSize: "1rem", fontWeight: "bolder", fontFamily: "sans-serif" }}>
                FILTER BY PRICE -
              </span>
              <span style={{ marginLeft: "10px" }}>Max - {Number(maxPriceRange) * 60000 / 100}</span>
              <input
                id={styles.ranger1}
                value={maxPriceRange}
                type="range"
                onChange={(e) => setMaxPriceRange(e.target.value)}
              />
              <span style={{ marginLeft: "10px" }}>Min - {Number(minPriceRange) * 60000 / 100}</span>
              <input
                id={styles.ranger2}
                value={minPriceRange}
                type="range"
                onChange={(e) => setMinPriceRange(e.target.value)}
              />
            </div>

            {/* Star Rating Filter */}
            <div className={styles.starRating}>
              <p style={{ fontSize: "1rem", fontWeight: "bolder", fontFamily: "sans-serif" }}>
                FILTER BY RATING-
              </p>
              <ul>
                {[5, 4, 3, 2, 1].map((starRating, idx) => (
                  <li key={idx} style={{ cursor: "pointer" }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FontAwesomeIcon
                        key={star}
                        icon={faStar}
                        color={star <= starRating ? "yellow" : "#555"}
                        style={{ fontSize: "1rem", marginRight: "2px" }}
                      />
                    ))}
                  </li>
                ))}
              </ul>
            </div>

            {/* Featured Products with scroll */}
            <div className={styles.leftSideFeaturedProduct}>
              <p style={{ fontSize: "1rem", fontWeight: "bolder", fontFamily: "sans-serif" }}>
                FEATURED PRODUCTS
              </p>
              <div className={styles.featuredProductItemContainer} id="featuredProductItem">
                {allImages.map((each, index) => (
                  <img key={index} src={each.src} alt={each.name} className={styles.eachProductItem} />
                ))}
              </div>

              <button
                onClick={() => moveLeftSideScroll("featuredProductItem")}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "10px",
                  padding: "5px",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "none",
                  backgroundColor: "#181A1B",
                  color: "white",
                  fontSize: "1rem",
                  fontWeight: "bolder",
                  cursor: "pointer",
                }}
              >
                {"<"}
              </button>
              <button
                onClick={() => moveRightSideScroll("featuredProductItem")}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "30%",
                  padding: "5px",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "none",
                  backgroundColor: "#181A1B",
                  color: "white",
                  fontSize: "1rem",
                  fontWeight: "bolder",
                  cursor: "pointer",
                }}
              >
                {">"}
              </button>
            </div>
          </div>

          {/* Right Panel: Products and Top Bar */}
          <div className={styles.allProductsAndTopBar}>
            <div className={styles.bar}>
              <div className={styles.eachCubeItem}>
                <img src={threeLine} alt="three line icon" />
                <img src={smallCube} alt="small cube icon" />
                <img src={bigCube} alt="big cube icon" />
              </div>
              <span style={{ marginRight: "20px" }}>Show 10 {">"}</span>
            </div>

            {/* Product Card List */}
            {currentProductList && (
              <div
                style={{
                  margin: "20px",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: "24px",
                  alignItems: "stretch",
                }}
              >
                {currentProductList.map((each) => {
                  const counter = productCounter.find((p) => p.id === each._id)?.quantity ?? 0;

                  return (
                    <div
                      key={each._id}
                      style={{
                        backgroundColor: "#1E1E1E",
                        borderRadius: "12px",
                        padding: "16px",
                        color: "#fff",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.5)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        transition: "transform 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                      <img
                        src={each.productImage}
                        alt={each.productName}
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "10px",
                          marginBottom: "12px",
                        }}
                      />
                      <div style={{ flexGrow: 1 }}>
                        <h3 style={{ margin: "0 0 4px 0", fontSize: "1.1rem" }}>{each.productName}</h3>
                        <p style={{ margin: "0 0 8px 0", color: "#aaa", fontSize: "0.95rem" }}>{each.brand}</p>
                        <div style={{ display: "flex", marginBottom: "8px" }}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FontAwesomeIcon
                              key={star}
                              icon={faStar}
                              color={star <= each.rating ? "gold" : "#555"}
                              style={{ fontSize: "1rem", marginRight: "2px" }}
                            />
                          ))}
                        </div>
                        <div style={{ marginBottom: "8px" }}>
                          <span style={{ fontWeight: "bold", fontSize: "1.1rem", color: "#fff" }}>
                            ₹{each.discountPrice}
                          </span>
                          {each.discountPrice !== each.realPrice && (
                            <span
                              style={{
                                textDecoration: "line-through",
                                color: "#888",
                                marginLeft: "8px",
                              }}
                            >
                              ₹{each.realPrice}
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: "0.9rem", color: "#ccc", marginBottom: "10px" }}>
                          {each.productDesc?.slice(0, 60)}...
                        </p>
                        <div style={{ display: "flex", gap: "5px", marginBottom: "12px" }}>
                          {each.additionalImages?.map((img: string, idx: number) => (
                            <img
                              key={idx}
                              src={img}
                              alt={`${each.productName} additional ${idx + 1}`}
                              style={{
                                width: "32px",
                                height: "32px",
                                objectFit: "cover",
                                borderRadius: "5px",
                                border: "1px solid #555",
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      <CardFooter className="px-4 pb-4 pt-0 flex justify-center">
                        {counter === 0 ? (
                          <button
                            className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 transition duration-200"
                            onClick={() => addToCart(each._id, 1)}
                            aria-label={`Add ${each.productName} to cart`}
                          >
                            Add to Cart
                          </button>
                        ) : (
                          <div className="flex items-center gap-3 border border-indigo-600 rounded-lg px-3 py-1 bg-gray-900">
                            <button
                              className="text-white font-bold text-xl focus:outline-none hover:bg-indigo-700 rounded transition p-1"
                              onClick={() => addToCart(each._id, -1)}
                              aria-label={`Decrease quantity of ${each.productName}`}
                            >
                              &minus;
                            </button>
                            <span className="min-w-[24px] text-center font-semibold text-white">{counter}</span>
                            <button
                              className="text-white font-bold text-xl focus:outline-none hover:bg-indigo-700 rounded transition p-1"
                              onClick={() => addToCart(each._id, 1)}
                              aria-label={`Increase quantity of ${each.productName}`}
                            >
                              &#43;
                            </button>
                          </div>
                        )}
                      </CardFooter>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <BottomFixedBar />
      </div>
    </>
  );
}

export default Product;
