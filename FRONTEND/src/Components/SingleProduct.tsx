import BottomFixedBar from "./BottomFixedBar"
import TopFixedBar from "./TopFixedBar";
import styles from "../Styling/SingleProduct.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faHeart } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useRef, useState } from "react";
import ProductSlider from "./ProductSlider";
import { AllProductsContainer, getCurrentProducts } from "@/utils/getProducts";
import { useParams } from "react-router-dom";
import { useCartItemContext } from "@/hooks/ItemContext";
import { ACTIONS } from "@/utils/interfaces";


type ZoomImageType = {
    display: string,
    zoomX: string,
    zoomY: string

}

type InfoItemsType = {
    description: boolean;
    addInfo: boolean;
    reviews: boolean;

}




function SingleProduct() {

    const imageZoomRef = useRef<HTMLDivElement>(null);
    const { id } = useParams<{ id: string }>();
    const [backgroundChange, setBackgroundChange] = useState<boolean>(false);
    const [currentSelectedProduct, setCurrentSelectedProduct] = useState<any>(null);
    const [currentImageOnBoard, setCurrentImageOnBoard] = useState<string | null>(null);
    const [relventProducts, setRelventProducts] = useState<any[] | null>(null);

    const [infoItems, setInfoItems] = useState<InfoItemsType>({

        description: true,
        addInfo: false,
        reviews: false,
    })

    const [itemQuntity, setItemQuntity] = useState<number>(0);
    const [mainProduct , setMainProduct] = useState<any | null>(null);
    const {  dispatch } = useCartItemContext();


    const [zoomStyles, setZoomStyles] = useState<ZoomImageType>({
        display: "none",
        zoomX: "0%",
        zoomY: "0%"
    });

    useEffect(() => {

        function setSingleProduct() {
            const product: any = AllProductsContainer.find((product) => product._id === id);
            if (product) {
                const mainProduct = {
                     id : product._id,
                     quantity : 1,
                     name : product.productName,
                     price : product.discountPrice,
                     category : product.category,
                     description : product.productDesc
                }
                setMainProduct(mainProduct);
                setCurrentSelectedProduct(product);
                const related: any = getCurrentProducts(product.category);
                console.log(related);
                setRelventProducts(related);
                setCurrentImageOnBoard(product.productImage);
            }
        }

        setSingleProduct();

    }, [id]);


    function handleOnMouseOver(e: React.MouseEvent<HTMLDivElement>) {

        if (imageZoomRef.current) {

            let pointer = {
                x: (e.nativeEvent.offsetX * 100) / imageZoomRef.current?.offsetWidth,
                y: (e.nativeEvent.offsetY * 100) / imageZoomRef.current?.offsetHeight
            }

            setZoomStyles({
                display: "block",
                zoomX: `${pointer.x}%`,
                zoomY: `${pointer.y}%`
            })


        }


    }

    function handleOnMouseLeave() {

        setZoomStyles({
            display: "none",
            zoomX: "0%",
            zoomY: "0%"
        })


    }

    function moveLeftSideScroll(element: string) {
        const sliderContainer = document.getElementById(element) as HTMLDivElement;

        sliderContainer.scrollLeft -= 300;
    }

    function moveRightSideScroll(element: string) {
        const sliderContainer = document.getElementById(element) as HTMLDivElement;

        sliderContainer.scrollLeft += 300;
    }

    function toogleSelectedInfoTab(keyItem: string) {

        if (keyItem == "description") {
            setInfoItems({
                description: true,
                addInfo: false,
                reviews: false
            })
        }
        else if (keyItem == "addInfo") {
            setInfoItems({
                description: false,
                addInfo: true,
                reviews: false
            })
        }
        else {
            setInfoItems({
                description: false,
                addInfo: false,
                reviews: true
            })
        }
    }

    return (

        <div>


            <TopFixedBar />

            <div style={{ position: "absolute", top: "25%" }} >

                {
                    currentSelectedProduct && (

                        <div className={styles.singleProductContainer}  >

                            <div style={{
                                display: "flex", height: "auto", width: "90%",
                                padding: "20px",
                                margin: "50px", gap: "20px"
                            }} >

                                <div className={styles.productImage}>

                                    <div ref={imageZoomRef}
                                        onMouseMove={handleOnMouseOver}
                                        onMouseOut={handleOnMouseLeave}

                                        className={styles.bigMainImage}
                                        style={{
                                            "--url": `url(${currentImageOnBoard})`,
                                            "--zoomX": zoomStyles.zoomX,
                                            "--zoomY": zoomStyles.zoomY,
                                            "--display": zoomStyles.display


                                        } as React.CSSProperties}  >
                                        {currentImageOnBoard && <img src={currentImageOnBoard} alt="Zoom" />}
                                    </div>

                                    <div style={{ display: "flex", width: "auto", height: "70px", gap: "10px" }} >

                                        {currentSelectedProduct.additionalImages.length > 0 &&

                                            currentSelectedProduct.additionalImages.map((image: any, index: number) => (

                                                <img onClick={() => setCurrentImageOnBoard(image)} src={image} alt=""
                                                    style={{ cursor: "pointer", width: "70px", borderRadius: "5px" }} />

                                            ))

                                        }

                                    </div>

                                </div>

                                <div className={styles.productDescriptionAndAll} >

                                    <span style={{ fontSize: "2rem", fontWeight: "bolder" }} >{currentSelectedProduct.productName}</span>

                                    <span style={{ display: "flex", gap: "10px", color: "gray" }} >
                                        <span>Brand : <span style={{ color: "white" }} >{currentSelectedProduct.brand}</span></span>
                                        <span>{currentSelectedProduct.rating} rating</span>
                                        <span>1 Review</span>
                                    </span>

                                    <span style={{ display: "flex", gap: "10px", fontWeight: "bolder", fontSize: "1.06rem" }} >
                                        <s style={{ color: "gray" }} >Rs: {currentSelectedProduct.realPrice}</s>
                                        <span style={{ color: "tomato" }} >Rs: {currentSelectedProduct.discountPrice}</span>
                                    </span>

                                    <span style={{
                                        padding: "5px", display: "flex", alignItems: "center", justifyContent: "center",
                                        width: "80px", fontSize: "12px", fontWeight: "bolder", fontFamily: "sans-serif", color: "#30FFA3",
                                        borderRadius: "15px",
                                        backgroundColor: "#0A3827"
                                    }} >IN STOCK</span>

                                    <p style={{ width: "90%", color: "rgba(255, 255, 255, 0.582)" }} >{currentSelectedProduct.productDesc}</p>


                                    <div style={{ display: "flex", flexShrink: "0", position: "relative", width: "100%" }} >

                                        {itemQuntity >= 1 &&

                                            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                                                <button id={styles.quntityChangeButton} onClick={function () {
                                                    if (itemQuntity >= 1) setItemQuntity(prev => prev - 1)
                                                    return;

                                                }} >-</button>
                                                <span>{itemQuntity}</span>
                                                <button id={styles.quntityChangeButton}
                                                    onClick={() => setItemQuntity(prev => prev + 1)} >+</button>
                                            </div>

                                        }

                                        {itemQuntity === 0 &&

                                            <button onClick={() =>  {
                                                 setItemQuntity(1);
                                                
                                            }}

                                                className={styles.AddToCartButton}
                                            >
                                                <FontAwesomeIcon icon={faShoppingCart} />
                                                <span onClick={() =>  dispatch({ type: ACTIONS.SET_SELECTED_PRODUCTS, payload: mainProduct })}  >Add to Cart</span>
                                            </button>
                                        }

                                        <div style={{ display: "flex", position: "absolute", left: "210px", alignItems: "center", gap: "20px" }}>
                                            <FontAwesomeIcon icon={faHeart} style={{ fontSize: "20px", padding: "10px", borderRadius: "50%", backgroundColor: "#202324", cursor: "pointer" }} />
                                        </div>

                                    </div>



                                </div>

                            </div>



                            <div className={styles.someInfoAboutItem} >

                                <div style={{ display: "flex", gap: "20px" }}>
                                    <button onClick={() => toogleSelectedInfoTab("description")}
                                        style={{ backgroundColor: infoItems.description ? "#422A70" : "transparent" }}
                                        id={styles.infoAboutButtons} >Description</button>
                                    <button onClick={() => toogleSelectedInfoTab("addInfo")} style={{ backgroundColor: infoItems.addInfo ? "#422A70" : "transparent" }} id={styles.infoAboutButtons}>Additional Info</button>
                                    <button onClick={() => toogleSelectedInfoTab("review")}
                                        style={{ backgroundColor: infoItems.reviews ? "#422A70" : "transparent" }}
                                        id={styles.infoAboutButtons}>Reviews {"(1)"}</button>

                                </div>


                                {infoItems.description && <p>{currentSelectedProduct.productDesc}</p>}

                                {infoItems.addInfo && <p>No Addtional info available !</p>}
                                {infoItems.reviews &&

                                    <div style={{ display: "flex", flexDirection: "column", gap: "30px" }} >
                                        <p style={{ fontSize: "1.2rem" }} >Customer questions & answers</p>

                                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }} >
                                            <span style={{ fontSize: "1.5rem", fontWeight: "bolder", fontFamily: "sans-serif" }} >Add a review</span>
                                            <textarea placeholder="Write something" style={{
                                                width: "700px",
                                                padding: "20px", backgroundColor: "#181A1B",
                                                height: "200px", color: "white", fontSize: "1rem",
                                                resize: "none", borderRadius: "10px"
                                            }} ></textarea>
                                        </div>

                                        <p>Rating</p>

                                        <button onMouseOver={() => setBackgroundChange(true)}
                                            onMouseLeave={() => setBackgroundChange(false)}

                                            style={{
                                                padding: "10px",

                                                width: "150px",
                                                borderRadius: "10px",
                                                border: "none",
                                                transition: "background-color 400ms",
                                                fontSize: "1rem",
                                                backgroundColor: backgroundChange ? "#63449c93" : "#763ce2de",
                                                color: "white",
                                                fontWeight: "bolder",
                                                cursor: "pointer",

                                            }}>Submit Review</button>
                                    </div>

                                }

                            </div>

                            <div style={{
                                display: "flex", flexDirection: "column", gap: "20px"

                                , padding: "10px"

                            }} >
                                <p style={{ fontSize: "1.2rem", fontWeight: "bolder" }} >RELATED PRODUCTS</p>
                                {/* {relventProducts && <ProductSlider moveLeftSideScroll={moveLeftSideScroll}
                                    productList={relventProducts}
                                    moveRightSideScroll={moveRightSideScroll} ID="relatedProducts" />} */}
                            </div>

                        </div>

                    )

                }


                <BottomFixedBar />
            </div>

        </div>
    )
}

export default SingleProduct
