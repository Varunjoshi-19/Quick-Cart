import BottomFixedBar from "./BottomFixedBar"
import TopFixedBar from "./TopFixedBar";
import styles from "../Styling/SingleProduct.module.css";


// temporary product image 
import shoe1 from "../assets/shoes1.jpg";
import shoe2 from "../assets/shoes2.jpg";
import { useRef, useState } from "react";


type ZoomImageType = {
    display: string,
    zoomX: string,
    zoomY: string

}


function SingleProduct() {

    const imageZoomRef = useRef<HTMLDivElement>(null);
    const [currentImageOnBoard , setCurrentImageOnBoard] = useState<string>(shoe1);

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



    return (

        <div>


            <TopFixedBar />

            <div style={{ position: "absolute", top: "25%" }} >

                <div className={styles.singleProductContainer}  >

                    <div style={{ display : "flex", height : "auto",  
                        border : "1px solid red", padding: "20px", 
                        margin: "50px" , gap : "20px"}} >

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
                                <img src={currentImageOnBoard   } alt="Zoom" />
                            </div>

                            <div style={{ display: "flex", width: "auto" , height : "70px" , gap : "10px" }} >

                                <img onClick={() => setCurrentImageOnBoard(shoe1)} src={shoe1} alt="" 
                                style={{ cursor : "pointer" , width : "70px" , borderRadius : "5px" }} />
                                <img onClick={() => setCurrentImageOnBoard(shoe2)} 
                                src={shoe2} alt="" 
                                style={{ cursor : "pointer" , width : "70px" , borderRadius : "5px" }}/>

                            </div>

                        </div>

                        <div className={styles.productDescriptionAndAll} >

                        </div>

                    </div>












                    <div>
                        description , add , review
                    </div>

                    <div>
                        <p>related product</p>
                        <div>items</div>
                    </div>

                </div>

                <BottomFixedBar />
            </div>

        </div>
    )
}

export default SingleProduct
