import styles from "../Styling/DashBoard.module.css";
import style from "../Styling/TopBar.module.css"
import { useState, useEffect } from "react";
import webLogo from "../assets/weblogo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faSearch, faShoppingCart, faBars, faUser, faShoppingBag, faListUl, faSignOut, faClose } from '@fortawesome/free-solid-svg-icons';
import { Images, CurrentHoverItemList } from "../scripts/GetImage";
import { Countries } from "../scripts/getData";
import { useNavigate } from "react-router-dom";

import ProfileImage from "../assets/footwear.png";
import { SlideToTop } from "../scripts/script";

type ImageType = {
    src: string,
    name: string,
    backgroundColor: string,
    isSelected: boolean
}


function TopFixedBar() {

    const [hidden, setHidden] = useState<boolean>(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [dropDownCategory, setDropDownCategory] = useState<boolean>(false);
    const [updateCurrentItems, setUpdateCurrentItems] = useState<string[]>([]);
    const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);
    const [locationApiBox, setLocationApiBox] = useState<boolean>(false);

    const navigate = useNavigate();

    // temporary change this -> 
    const [loggedIn, setLoggedIn] = useState<boolean>(false);


    useEffect(() => {



        function handleScroll() {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 115) {

                setHidden(true);

            }

            if (currentScrollY < 115) {
                setHidden(false);
            }




        }


        window.addEventListener("scroll", handleScroll);


        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

    }, [window.scrollY])


    useEffect(() => {

        if (locationApiBox) {
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "visible";
            document.body.style.overflowX = "hidden";


        }


    }, [locationApiBox]);


    function HandleHoveredList(item: string) {
        const itemLists: string[] = CurrentHoverItemList(item);
        setUpdateCurrentItems(itemLists);
    }



    function HandleMouseOver(value: number | null, name: string) {

        if (value != null) {
            setHoveredIndex(value);
            HandleHoveredList(name);
        }
        else {
            setHoveredIndex(null);
            HandleHoveredList(name);

        }

    }



    function NavigateAndMoveToTop(ImageName : string) {
        navigate(`/products/category/${ImageName}`);
        SlideToTop();
    }



    return (
        <>


            {/* <button style={{ position: "absolute", zIndex: "12" }} onClick={() => setLocationApiBox(prev => !prev)} >change</button> */}


            {locationApiBox &&

                <div className={style.locationContainer} >

                    <div onClick={() => setLocationApiBox(false)} className={style.locationAPI} ></div>

                    <div className={style.locations}>

                        <div style={{ display: 'flex', flexDirection: "column", gap: "5px" }}>

                            <span style={{ fontWeight: "bolder" }} >Choose your Delivery Location</span>

                            <span style={{ fontSize: "14px", fontWeight: "lighter" }}>Enter your address and we will specify the offer for your area.</span>

                            <button onClick={() => setLocationApiBox(false)} style={{
                                position: "absolute", display: "flex", alignItems: "center", justifyContent: "center",
                                backgroundColor: "#272A2C", color: "white", cursor: "pointer",
                                width: "35px", height: "35px", border: "none", borderRadius: "50%",
                                right: "10px", top: "10px"
                            }} >

                                <FontAwesomeIcon icon={faClose} />
                            </button>

                        </div>

                        <div className={style.locationSearchCont} >
                            <input id={style.searchInput} type="text" placeholder="Search your area..." />
                            <FontAwesomeIcon icon={faSearch} style={{ width: "10%", cursor: "pointer" }} />
                        </div>

                        <div className={style.allCountries} >

                            { Countries.map((country , index) => (

                              <p  id={style.eachCountry} key={index} >{country}</p>

                            ))}

                        </div>

                    </div>


                </div>


            }


            <div className={styles.TopBar} id={hidden ? styles.hide : ""}>

                <nav className={styles.navBar}>

                <div style={{ display : 'flex' , alignItems :"center" , gap : "20px" , justifyContent : "flex-start" ,  width : "70%" }}>
                <div style={{ cursor : "pointer" }} id={styles.logo} >
                        <img   onClick={() => navigate("/")}  src={webLogo} alt="web-logo" width="50%" height="100%" />
                        <span style={{ fontSize: "1.2rem", fontWeight: "bolder" , fontFamily : "cursive" }}>Quick Cart</span>
                    </div>


                    <div onClick={() => setLocationApiBox(true)}  className={styles.locationMenu} >

                        <div style={{ height: "100%", width: "50", gap: "5px", display: "flex", flexDirection: "column" }} >
                            <span style={{ fontSize: "15px", color: "#5E6566" }} >Your Location</span>
                            <span style={{ color: "#573B8B", fontWeight: "bolder" }} >All</span>
                        </div>
                        <FontAwesomeIcon icon={faCaretDown} />
                    </div>

                    <div className={styles.inputBox} >
                        <input type="text" placeholder="Search for products..." />
                        <FontAwesomeIcon icon={faSearch} style={{ cursor: "pointer", color: "rgba(255, 255, 255, 0.473)" }} />
                    </div>
                </div>


                    <div style={{ marginLeft: "120px", display: "flex", alignItems: "center", gap: "20px" }} >

                        {loggedIn ?

                            <button onClick={() => setShowProfileMenu(prev => !prev)} style={{
                                backgroundColor: "#5e5e5e41", border: "none", position: "relative",
                                padding: "15px", borderRadius: "50%", cursor: "pointer"
                            }}>
                                <FontAwesomeIcon icon={faUser} color="white"
                                    style={{ fontSize: "1.5rem" }}
                                />

                                {showProfileMenu && <div id={styles.ProfileMenuItems} >

                                    <div style={{ display: "flex", gap: "6px", justifyContent: "space-around", alignItems: "center", padding: "10px" }} >
                                        <img src={ProfileImage} alt="" width="40px" />

                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }} >
                                            <span style={{ fontSize: "1.2rem" }} >User</span>
                                            <span style={{ fontSize: "15px", color: "gray", fontWeight: "bold" }} >varunjoshi6283@gmail.com</span>
                                        </div>

                                    </div>


                                    <div className={styles.profileAccountOptions} >
                                        <span onClick={() => navigate("/my-account")} style={{ display: "flex", gap: "10px" }}><FontAwesomeIcon icon={faUser} />My Account</span>
                                        <span onClick={() => navigate("/orders")} style={{ display: "flex", gap: "10px" }}><FontAwesomeIcon icon={faShoppingBag} />Orders</span>
                                        <span onClick={() => navigate("/my-list")} style={{ display: "flex", gap: "10px" }}><FontAwesomeIcon icon={faListUl} />My List</span>
                                        <span style={{ display: "flex", gap: "10px" }}><FontAwesomeIcon icon={faSignOut} />Logout</span>

                                    </div>

                                </div>}

                            </button>

                            :

                            <button onClick={() => navigate("/login")} className={styles.logInButton} >Log In</button>

                        }

                        <button onClick={() => navigate("/cart")} className={styles.shoppingCart} >
                            <FontAwesomeIcon icon={faShoppingCart} color="white" />
                            <p id={styles.totalItems} >0</p>
                        </button>

                    </div>

                </nav>



                <div className={styles.itemLists}  >

                    <div onClick={() => setDropDownCategory(prevState => !prevState)} className={styles.allCategory} >
                        <FontAwesomeIcon icon={faBars} />
                        <span>ALL CATEGORIES</span>
                        <FontAwesomeIcon icon={faCaretDown} />

                        {dropDownCategory && <div className={styles.dropDownCategory}>
                            {Images.map((image: ImageType, index) => (

                                <div  onClick={() => NavigateAndMoveToTop(image.name)}
                                onMouseOver={() => HandleHoveredList(image.name)} id={styles.eachCategoryItem} key={index} style={{
                                    padding: "10px", 
                                    display: 'flex', width: "100%", height: "40px", alignItems: "center", gap: "5px"
                                }}   >
                                    <img src={image.src} alt="" height="100%" />
                                    <span>{image.name}</span>

                                </div>

                            ))}

                            <div id={styles.hoverSideBox} >
                                {updateCurrentItems.map((item, index) => (
                                    <p key={index} style={{ width: "100%" }}  >{item}</p>
                                ))}
                            </div>

                        </div>
                        }

                    </div>



                    {Images.map((image: ImageType, index) => (
                        <div onClick={() => NavigateAndMoveToTop(image.name)}
                            key={index}
                            className={styles.items}
                            onMouseOver={() => HandleMouseOver(index, image.name)}
                            onMouseLeave={() => HandleMouseOver(null, image.name)}
                        >
                            <img src={image.src} alt="" height="100%" />
                            <span>{image.name}</span>

                            {hoveredIndex === index && (

                                <div id={styles.itemHoveredList}  >
                                    {updateCurrentItems.map((item, i) => (
                                        <p key={i} >
                                            {item}
                                        </p>
                                    ))}

                                </div>

                            )}
                        </div>
                    ))}





                </div>

            </div>


        </>
    )
}

export default TopFixedBar
