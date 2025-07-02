import BottomFixedBar from "./BottomFixedBar"
import TopFixedBar from "./TopFixedBar"
import styles from "../Styling/Product.module.css";
import { ProductCategoryItem, SalesImages } from "../utils/GetImage.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import bigCube from "../assets/bigCube.svg";
import smallCube from "../assets/smallCube.svg";
import threeLine from "../assets/threeLine.svg";
import {Images } from "../utils/GetImage.ts"
import ListOfProducts from "./ListOfProducts.tsx";


type  ImagesType =  {
  src: string;
  name: string;
  backgroundColor: string;
  isSelected: boolean;
}[]

function Product() {

  const [productCatItems, setProductCatItems] = useState<string[]>([]);

  const [allImages , setAllImages] = useState<ImagesType>(Images);

  const [selectedRadioValue, setSelectedRadioValue] = useState<string>("");

  const [maxPriceRange, setMaxPriceRange] = useState<string>("100");
  const [minPriceRange, setMinPriceRange] = useState<string>("0");

  useEffect(() => {
    SetCatItems();
  }, []);


  function SetCatItems() {

    const items = ProductCategoryItem();
    setProductCatItems(items);

  }


  function moveRightSideScroll(element: string) {
    const sliderContainer = document.getElementById(element) as HTMLDivElement;

    sliderContainer.scrollLeft += 232;
  }

  function moveLeftSideScroll(element: string) {
    const sliderContainer = document.getElementById(element) as HTMLDivElement;

    sliderContainer.scrollLeft -= 232;
  }




  return (
    <>
      <TopFixedBar />

      <div style={{ position: "absolute", top: "25%" }}>

        <div className={styles.ProductsContainer}>

          <div className={styles.ProductCategory}>
            <p style={{ fontWeight: "bolder", fontSize: "1rem" }}>PRODUCT CATEGORIES</p>

            <div className={styles.productCategoryItems} >
              {productCatItems &&
                productCatItems.map((item, index) => (

                  <div key={index} style={{ display: 'flex', alignItems: "center" }} >
                    <input type="radio" value={item} checked={selectedRadioValue === item}

                      onChange={() => setSelectedRadioValue(item)} />
                    <p onClick={() => setSelectedRadioValue(item)} style={{ cursor: "pointer" }} >{item}</p>
                  </div>
                ))
              }
            </div>


            <div className={styles.priceChanger} >

              <span style={{ fontSize: "1rem", fontWeight: "bolder", fontFamily: "sans-serif" }} >FILTER BY PRICE -</span>

              <span style={{ marginLeft: "10px" }} >Max - {Number(maxPriceRange) * 60000 / 100}</span>
              <input id={styles.ranger1} value={maxPriceRange} onChange={(e) => setMaxPriceRange(e.target.value)} type="range" />

              <span style={{ marginLeft: "10px" }}>Min - {Number(minPriceRange) * 60000 / 100}</span>
              <input id={styles.ranger2} value={minPriceRange} onChange={(e) => setMinPriceRange(e.target.value)} type="range" />
            </div>

            <div className={styles.starRating}>

              <p style={{ fontSize: "1rem", fontWeight: "bolder", fontFamily: "sans-serif" }} >FILTER BY RATING-</p>

              <ul>
                <li>
                  <FontAwesomeIcon icon={faStar} color="yellow" />
                  <FontAwesomeIcon icon={faStar} color="yellow" />
                  <FontAwesomeIcon icon={faStar} color="yellow" />
                  <FontAwesomeIcon icon={faStar} color="yellow" />
                  <FontAwesomeIcon icon={faStar} color="yellow" />
                </li>

                <li>
                  <FontAwesomeIcon icon={faStar} color="yellow" />
                  <FontAwesomeIcon icon={faStar} color="yellow" />
                  <FontAwesomeIcon icon={faStar} color="yellow" />
                  <FontAwesomeIcon icon={faStar} color="yellow" />
                  <FontAwesomeIcon icon={faStar} />
                </li>

                <li>
                  <FontAwesomeIcon icon={faStar} color="yellow" />
                  <FontAwesomeIcon icon={faStar} color="yellow" />
                  <FontAwesomeIcon icon={faStar} color="yellow" />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                </li>

                <li>
                  <FontAwesomeIcon icon={faStar} color="yellow" />
                  <FontAwesomeIcon icon={faStar} color="yellow" />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                </li>

                <li>
                  <FontAwesomeIcon icon={faStar} color="yellow" />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                </li>

              </ul>



            </div>

            <div className={styles.leftSideFeaturedProduct} >
              <p style={{ fontSize: "1rem", fontWeight: "bolder", fontFamily: "sans-serif" }} >FEATURED PRODUCTS</p>


              <div className={styles.featuredProductItemContainer}  id="featuredProductItem" >

              { allImages.map(each => (
                <img src={each.src} alt="" className={styles.eachProductItem}  />
              ))}


              </div>

              <button onClick={() => moveLeftSideScroll("featuredProductItem")} style={{
                  zIndex: "3", position: "absolute", top: "50%", left: "10px", padding: "5px", width: "40px", height: "40px",
                  borderRadius: "50%", border: "none", backgroundColor: "#181A1B", color: "white", fontSize: "1rem", fontWeight: "bolder", cursor: "pointer"
                }}>{"<"}</button>
                <button onClick={() => moveRightSideScroll("featuredProductItem")} style={{
                  position: "absolute", right: "30%", padding: "5px", top: "50%", width: "40px", height: "40px", cursor: "pointer",
                  borderRadius: "50%", border: "none", backgroundColor: "#181A1B", color: "white", fontSize: "1rem", fontWeight: "bolder"
                }}>
                  {">"}
                </button>

            </div>

            <div>
              {SalesImages.map((saleImage, index) => (

                <img key={index} src={saleImage} alt="" style={{ borderRadius: "10px", width: "250px" }} />
              ))}
            </div>

          </div>

          <div className={styles.allProductsAndTopBar} >

            <div className={styles.bar} >

              <div className={styles.eachCubeItem} >
                <img src={threeLine} alt="" />
                <img src={smallCube} alt="" />
                <img src={bigCube} alt="" />
              </div>
              <span style={{ marginRight: "20px" }} >Show 10 {">"}</span>
            </div>


            <div style={{ marginLeft: "20px", marginTop: "20px" }}  >

              {/* <ListOfProducts /> */}

            </div>

          </div>

        </div>



        <BottomFixedBar />
      </div>
    </>
  )
}

export default Product
