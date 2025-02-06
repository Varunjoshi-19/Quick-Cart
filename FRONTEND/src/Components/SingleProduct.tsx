import BottomFixedBar from "./BottomFixedBar"
import TopFixedBar from "./TopFixedBar";
import styles from "../Styling/SingleProduct.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faHeart } from "@fortawesome/free-solid-svg-icons";

// temporary product image 
import shoe1 from "../assets/shoes1.jpg";
import shoe2 from "../assets/shoes2.jpg";
import { useRef, useState } from "react";
import ProductSlider from "./ProductSlider";


type ZoomImageType = {
    display: string,
    zoomX: string,
    zoomY: string

}

type InfoItemsType = {
    description : boolean;
    addInfo : boolean;
    reviews : boolean;

}




function SingleProduct() {

    const imageZoomRef = useRef<HTMLDivElement>(null);
    const [backgroundChange , setBackgroundChange] = useState<boolean>(false);
    const [currentImageOnBoard, setCurrentImageOnBoard] = useState<string>(shoe1);

    const [infoItems , setInfoItems] = useState<InfoItemsType>({
 
        description : true,
        addInfo : false,
        reviews : false,
    })

    const [itemQuntity, setItemQuntity] = useState<number>(0);


    const [zoomStyles, setZoomStyles] = useState<ZoomImageType>({
        display: "none",
        zoomX: "0%",
        zoomY: "0%"
    });

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




  function toogleSelectedInfoTab(keyItem : string) {

  if(keyItem == "description") {
     setInfoItems({
         description : true,
         addInfo :false,
         reviews : false
     })
  }
  else if(keyItem == "addInfo") { 
    setInfoItems({
        description : false,
        addInfo :true,
        reviews : false
    })
  }
   else {
    setInfoItems({
        description : false,
        addInfo : false,
        reviews : true
    })
   }
 }

    return (

        <div>


            <TopFixedBar />

            <div style={{ position: "absolute", top: "25%" }} >

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
                                <img src={currentImageOnBoard} alt="Zoom" />
                            </div>

                            <div style={{ display: "flex", width: "auto", height: "70px", gap: "10px" }} >

                                <img onClick={() => setCurrentImageOnBoard(shoe1)} src={shoe1} alt=""
                                    style={{ cursor: "pointer", width: "70px", borderRadius: "5px" }} />
                                <img onClick={() => setCurrentImageOnBoard(shoe2)}
                                    src={shoe2} alt=""
                                    style={{ cursor: "pointer", width: "70px", borderRadius: "5px" }} />

                            </div>

                        </div>

                        <div className={styles.productDescriptionAndAll} >

                            <span style={{ fontSize: "2rem", fontWeight: "bolder" }} >Men Round Toe Lace-Up Lightweight PU Sneakers</span>

                            <span style={{ display: "flex", gap: "10px", color: "gray" }} >
                                <span>Brand : <span style={{ color: "white" }} >name</span></span>
                                <span>rating</span>
                                <span>1 Review</span>
                            </span>

                            <span style={{ display: "flex", gap: "10px", fontWeight: "bolder", fontSize: "1.06rem" }} >
                                <s style={{ color: "gray" }} >Rs: 1450</s>
                                <span style={{ color: "tomato" }} >Rs: 1200</span>
                            </span>

                            <span style={{
                                padding: "5px", display: "flex", alignItems: "center", justifyContent: "center",
                                width: "80px", fontSize: "12px", fontWeight: "bolder", fontFamily: "sans-serif", color: "#30FFA3",
                                borderRadius: "15px",
                                backgroundColor: "#0A3827"
                            }} >IN STOCK</span>

                            <p style={{ width: "90%", color: "rgba(255, 255, 255, 0.582)" }} >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio, quis dignissimos sequi dolore animi minima suscipit veniam ut commodi itaque ad, voluptatem corporis expedita harum molestias architecto reiciendis dolorum eligendi?</p>


                            <div style={{ display: "flex",  flexShrink : "0", position: "relative", width : "100%" }} >

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

                                    <button onClick={() => setItemQuntity(1)}

                                        className={styles.AddToCartButton}
                                    >
                                        <FontAwesomeIcon icon={faShoppingCart} />
                                        <span>Add to Cart</span>
                                    </button>
                                }

                                <div style={{ display: "flex", position: "absolute", left: "210px", alignItems: "center", gap: "20px" }}>
                                    <FontAwesomeIcon icon={faHeart} style={{ fontSize: "20px", padding: "10px", borderRadius: "50%", backgroundColor: "#202324", cursor: "pointer" }} />
                                </div>

                            </div>



                        </div>

                    </div>



                    <div className={styles.someInfoAboutItem} >
                       
                       <div style={{ display : "flex" , gap :"20px" }}>
                          <button  onClick={() => toogleSelectedInfoTab("description")} 
                          style={{ backgroundColor : infoItems.description ? "#422A70" : "transparent" }}
                          id={styles.infoAboutButtons} >Description</button>
                          <button onClick={() => toogleSelectedInfoTab("addInfo")} style={{ backgroundColor : infoItems.addInfo ? "#422A70" : "transparent" }} id={styles.infoAboutButtons}>Additional Info</button>
                          <button onClick={() => toogleSelectedInfoTab("review")} 
                          style={{ backgroundColor : infoItems.reviews ? "#422A70" : "transparent" }}
                          id={styles.infoAboutButtons}>Reviews {"(1)"}</button>

                       </div>


                     { infoItems.description  && <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, libero quos. Laborum, et tempore aliquid similique optio nulla doloremque quia quo. Autem nam molestiae nemo cumque ipsam, possimus dicta impedit?</p> }

                     { infoItems.addInfo && <p>sfjlsf</p> }
                     { infoItems.reviews && 
                     
                     <div style={{ display :"flex" , flexDirection :"column" ,gap :"30px" }} >
                        <p style={{ fontSize :"1.2rem" }} >Customer questions & answers</p>

                        <div style={{ display  : "flex" , flexDirection :"column",  gap: "10px" }} >
                            <span style={{ fontSize :"1.5rem" , fontWeight :"bolder" , fontFamily :"sans-serif" }} >Add a review</span>
                           <textarea    placeholder="Write something" style={{ width :"700px" ,
                            padding :"20px", backgroundColor : "#181A1B",
                            height :"200px" , color : "white" , fontSize :"1rem",
                             resize :"none" , borderRadius :"10px"}} ></textarea>
                        </div>

                            <p>Rating</p>

                            <button onMouseOver={() => setBackgroundChange(true)}
                                     onMouseLeave={() => setBackgroundChange(false)}

                            style={{ 
                             padding : "10px",
                             
                             width : "150px",
                             borderRadius : "10px",
                             border : "none",
                             transition : "background-color 400ms",
                             fontSize : "1rem",
                             backgroundColor :  backgroundChange ?   "#63449c93" : "#763ce2de",
                             color : "white",
                             fontWeight : "bolder",
                             cursor : "pointer",

                             }}>Submit Review</button>
                     </div>
                     
                     }

                    </div>

                    <div  style={{ display : "flex" , flexDirection : "column" , gap : "20px" 

                          , padding : "10px" 

                     }} >
                        <p style={{ fontSize : "1.2rem" , fontWeight : "bolder" }} >RELATED PRODUCTS</p>
                       <ProductSlider moveLeftSideScroll={moveLeftSideScroll} moveRightSideScroll={moveRightSideScroll} ID="relatedProducts" />
                    </div>

                </div>

                <BottomFixedBar />
            </div>

        </div>
    )
}

export default SingleProduct
