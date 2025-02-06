import styles from "../Styling/DashBoard.module.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, } from '@fortawesome/free-solid-svg-icons';
import { Images, BannerImages, SalesImages, } from "../scripts/GetImage";
import ProductSlider from "./ProductSlider";
import TopFixedBar from "./TopFixedBar";
import BottomFixedBar from "./BottomFixedBar";
import ListOfProducts from "./ListOfProducts";
import { useNavigate } from "react-router-dom";



type ImageType = {
    src: string,
    name: string,
    backgroundColor: string,
    isSelected: boolean
}


function DashBoard() {


    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [productItems, setProductItems] = useState<ImageType[]>([]);
    const [upwardIcon, setUpwardIcon] = useState<boolean>(false);

    const navigate = useNavigate();

    // temporary change this -> 





    useEffect(() => {

        function handleScroll() {
            const currentScrollY = window.scrollY;


            if (currentScrollY >= 200) {
                setUpwardIcon(true);
            }

            if (currentScrollY < 200) {
                setUpwardIcon(false);
            }

        }


        window.addEventListener("scroll", handleScroll);


        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

    }, [window.scrollY]);


    useEffect(() => {

        const interval = setInterval(() => {
            showNextBanner();

        }, 2000);


        return () => {
            clearInterval(interval);
        }
    }, [currentIndex])

    useEffect(() => {

        setProductItems(Images);

    }, [Images])

    useEffect(() => {

        slider1();


    }, [window.scroll]);





    function showNextBanner() {


        setCurrentIndex((index) => {
            if (index === BannerImages.length - 1) return 0;
            return index + 1;
        })

    }

    function showPrevBanner() {


        setCurrentIndex((index) => {
            if (index === 0) return BannerImages.length - 1;
            return index - 1;
        })

    }

    function slider1() {
        const sliderContainer = document.getElementById("sliderContainer1") as HTMLDivElement;

        sliderContainer.addEventListener("wheel", (event) => {

            event.preventDefault();
            sliderContainer.scrollLeft += event.deltaY;
        })

    }

    function moveRightSideScroll(element: string) {
        const sliderContainer = document.getElementById(element) as HTMLDivElement;

        sliderContainer.scrollLeft += 300;
    }

    function moveLeftSideScroll(element: string) {
        const sliderContainer = document.getElementById(element) as HTMLDivElement;

        sliderContainer.scrollLeft -= 300;
    }

    function updateSelectedItem(index1: number) {

        setProductItems((prevItem) =>

            prevItem.map((item, index) => ({

                ...item,
                isSelected: index == index1

            }))
        )

    }

    function MoveToTheTop() {

        window.scrollTo({

            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }

    function NavigateAndMoveToTop(ImageName : string) {
        navigate(`/products/category/${ImageName}`);
        MoveToTheTop();
    }

    

    return (
        <>



            {upwardIcon && <button onClick={MoveToTheTop} className={styles.upwardIcon} id={upwardIcon ? styles.visible : styles.close} >
                <FontAwesomeIcon icon={faArrowUp} />
            </button>}



            <TopFixedBar />



            <div className={styles.bottomItems} >


                <div className={styles.MovingBanner} id="moving" >

                    {BannerImages.map((banner, index) => (

                        <div key={index} id={styles.eachBanner}
                            style={{ translate: `${-100 * currentIndex}%` }}
                        >
                            <img src={banner} alt="" height="100%" width="95%" style={{ borderRadius: "20px" }} />

                        </div>


                    ))}

                    <button onClick={showPrevBanner} style={{
                        zIndex: "3", position: "absolute", left: "10%", padding: "5px", width: "40px", height: "40px",
                        borderRadius: "50%", border: "none", backgroundColor: "#181A1B", color: "white", fontSize: "1rem", fontWeight: "bolder", cursor: "pointer"
                    }}>{"<"}</button>
                    <button onClick={showNextBanner} style={{
                        position: "absolute", right: "15%", padding: "5px", width: "40px", height: "40px", cursor: "pointer",
                        borderRadius: "50%", border: "none", backgroundColor: "#181A1B", color: "white", fontSize: "1rem", fontWeight: "bolder"
                    }}>
                        {">"}</button>


                </div>



                <div className={styles.featuredCategory}>

                    <p style={{ marginLeft: "20px", fontSize: "1.2rem", fontWeight: "bolder" }}>FEATURED CATEGORIES</p>

                    <div className={styles.featuredItems} >
                        {Images.map((image, index) => (

                            <div onClick={() => NavigateAndMoveToTop(image.name)}
                            key={index} id={styles.eachItem} >

                                <div style={{
                                    display: "flex", backgroundColor: image.backgroundColor,
                                    alignItems: "center", justifyContent: "center", width: "100%",
                                    height: "100%", borderRadius: "50%"
                                }}  >
                                    <img src={image.src} alt="" width="60%" height="60%" />
                                </div>

                                <p>{image.name}</p>

                            </div>

                        ))}

                    </div>

                </div>



                <div className={styles.Products} >

                    <div className={styles.FixedofferBanner} >
                        {SalesImages.map((saleImage, index) => (

                            <img key={index} src={saleImage} alt="" style={{ borderRadius: "10px", width: "250px" }} />
                        ))}
                    </div>

                    <div className={styles.popularProducts} >

                        <div style={{ width: '100%', display: "flex" }} >
                            
                            <div style={{ width: "400px", display: "flex", flexDirection: "column", padding: "10px" }} >
                                <span style={{ fontSize: "1.2rem", fontWeight: "bolder" }} >POPULAR PRODUCTS</span>
                                <span style={{ color: "rgba(190, 187, 187, 0.562)" }} >Do not miss the current offers until the end of March.</span>

                            </div>

                            <div id="sliderContainer1" style={{
                                display: "flex", width: "60%",
                                height: "60px", gap: "10px", fontSize: "13px",
                                fontWeight: "bolder", scrollbarWidth: "none"
                                , overflowX: "scroll", overflowY: "hidden", scrollBehavior: "smooth"
                            }}>

                                {productItems.map((image: ImageType, index: number) => (

                                    <p onClick={() => updateSelectedItem(index)}
                                        style={{
                                            borderBottom: `${image.isSelected ? "2px solid #1877F2" : "none"}`
                                            , cursor: "pointer",
                                            height: "30px", padding: "5px 10px",

                                        }} key={index} > {image.name}
                                    </p>

                                ))}

                            </div >

                        </div>


                        {/*  product list   */}

                        <ProductSlider moveLeftSideScroll={moveLeftSideScroll} moveRightSideScroll={moveRightSideScroll} ID="sliderContainer2" />




                        <div className={styles.newProductsContainer}  >

                            <div style={{ display: 'flex', flexDirection: "column", padding: "10px" }} >
                                <span style={{ fontSize: "1.2rem", fontWeight: "bolder" }} >NEW PRODUCTS</span>
                                <span style={{ color: "rgba(190, 187, 187, 0.562)" }} >New products with updated stock.</span>
                            </div>


                            <ListOfProducts />

                        </div>


                        <div className={styles.salesOffers}>

                            <div id="salesOfferI" className={styles.salesItemContainer} >

                                <img src="" alt="" style={{ borderRadius: "10px", border: "1px solid white", width: "300px", height: "inherit" }} />
                                <img src="" alt="" style={{ borderRadius: "10px", border: "1px solid white", width: "300px", height: "inherit" }} />
                                <img src="" alt="" style={{ borderRadius: "10px", border: "1px solid white", width: "300px", height: "inherit" }} />
                                <img src="" alt="" style={{ borderRadius: "10px", border: "1px solid white", width: "300px", height: "inherit" }} />

                            </div>


                            <button onClick={() => moveLeftSideScroll("salesOfferI")} style={{
                                zIndex: "3", position: "absolute", top: "40%", left: "20%", padding: "5px", width: "40px", height: "40px",
                                borderRadius: "50%", border: "none", backgroundColor: "#181A1B", color: "white", fontSize: "1rem", fontWeight: "bolder", cursor: "pointer"
                            }}>{"<"}</button>
                            <button onClick={() => moveRightSideScroll("salesOfferI")} style={{
                                position: "absolute", right: "20%", padding: "5px", top: "40%", width: "40px", height: "40px", cursor: "pointer",
                                borderRadius: "50%", border: "none", backgroundColor: "#181A1B", color: "white", fontSize: "1rem", fontWeight: "bolder"
                            }}>
                                {">"}
                            </button>


                        </div>


                    </div>


                </div>


                <div className={styles.featuredProducts} >

                    <div style={{ display: 'flex', flexDirection: "column", padding: "10px", marginLeft: "20px" }} >
                        <span style={{ fontSize: "1.2rem", fontWeight: "bolder" }} >FEATURED PRODUCTS</span>
                        <span style={{ color: "rgba(190, 187, 187, 0.562)" }} >Do not miss the current offers unitl the end of march.</span>
                    </div>


                    <ProductSlider moveLeftSideScroll={moveLeftSideScroll} moveRightSideScroll={moveRightSideScroll} ID="featuredProductSlider" />

                </div>


                <div className={styles.salesOff} >

                    <img src="" alt="" style={{ borderRadius: "10px", border: "1px solid white", width: "400px", height: "inherit" }} />
                    <img src="" alt="" style={{ borderRadius: "10px", border: "1px solid white", width: "400px", height: "inherit" }} />
                    <img src="" alt="" style={{ borderRadius: "10px", border: "1px solid white", width: "400px", height: "inherit" }} />

                </div>


                <div>

                    <div style={{ display: 'flex', flexDirection: "column", padding: "10px", marginLeft: "20px" }} >
                        <span style={{ fontSize: "1.2rem", fontWeight: "bolder" }} >FOOTWEAR</span>
                        <span style={{ color: "rgba(190, 187, 187, 0.562)" }} >Do not miss the current offers unitl the end of march.</span>
                    </div>

                    <ProductSlider moveLeftSideScroll={moveLeftSideScroll} moveRightSideScroll={moveRightSideScroll} ID="footwearSlider" />

                </div>


                <BottomFixedBar />

            </div>






        </>




    )
}

export default DashBoard


