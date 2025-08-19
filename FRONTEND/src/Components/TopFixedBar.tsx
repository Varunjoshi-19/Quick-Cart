import styles from "../Styling/DashBoard.module.css";
import style from "../Styling/TopBar.module.css"
import { useState, useEffect } from "react";
import webLogo from "../assets/myWebLogo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faSearch, faShoppingCart, faBars, faUser, faShoppingBag, faListUl, faSignOut, faClose } from '@fortawesome/free-solid-svg-icons';
import { Images, CurrentHoverItemList } from "../utils/GetImage";
import { BACKEND_URL, fetchAllCountries, searchForSpecificCountry } from "../utils/getData";
import { useNavigate } from "react-router-dom";

import { SlideToTop } from "../utils/script";
import { useUserAuthContext } from "../hooks/UserContext";
import { useCartItemContext } from "../hooks/ItemContext";
import { ImageType } from "../utils/interfaces"


function TopFixedBar() {

    const [hidden, setHidden] = useState<boolean>(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [dropDownCategory, setDropDownCategory] = useState<boolean>(false);
    const [updateCurrentItems, setUpdateCurrentItems] = useState<string[]>([]);
    const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);
    const [locationApiBox, setLocationApiBox] = useState<boolean>(false);
    const [countryName, setCountryName] = useState<string>("");
    const [selectedCountry, setSelectedCountry] = useState<string>("-");

    const navigate = useNavigate();

    const { user, loggedIn, dispatch } = useUserAuthContext();
    const { productItems } = useCartItemContext();
    const [countriesData, setCountriesData] = useState<any[]>([]);

    let AllCountries: any[] = [];

    useEffect(() => {

        const fetchAllCountriesData = async () => {
            AllCountries = await fetchAllCountries();
            setCountriesData(AllCountries);

        }
        fetchAllCountriesData();
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const matchedCountries = searchForSpecificCountry(countryName);
            setCountriesData(matchedCountries);
        }, 700);

        return () => clearTimeout(timeoutId);
    }, [countryName]);


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

    function NavigateAndMoveToTop(ImageName: string) {
        navigate(`/products/category/${ImageName}`);
        SlideToTop();
    }

    const handleLogoutUser = () => {

        dispatch({ type: "remove" });
        localStorage.removeItem("user");
        navigate("/", { replace: true });
    }


    return (
        <>

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
                            <input id={style.searchInput} type="text"
                                value={countryName}
                                onChange={(e) => setCountryName(e.target.value)}
                                placeholder="Search your area..." />
                            <FontAwesomeIcon icon={faSearch} style={{ width: "10%", cursor: "pointer" }} />
                        </div>

                        <div className={style.allCountries} >

                            {
                                countriesData && countriesData.length > 0

                                    ?
                                    countriesData.map((country) => (
                                        <p onClick={() => {
                                            setSelectedCountry(country.country);
                                            setLocationApiBox(false);
                                        }} id={style.eachCountry} key={country} >{country.country}</p>
                                    ))

                                    :
                                    <span className="self-center font-thin" >No Country Found</span>

                            }


                        </div>

                    </div>


                </div>


            }


            <div className={styles.TopBar} id={hidden ? styles.hide : ""}>

                <nav className={styles.navBar}>

                    <div style={{ display: 'flex', alignItems: "center", gap: "20px", justifyContent: "flex-start", width: "70%" }}>
                        <div style={{ cursor: "pointer" }} id={styles.logo} >
                            <img onClick={() => navigate("/")} src={webLogo} alt="web-logo" width={"100px"}
                                style={{ objectFit: "contain", flexShrink: "0" }}
                            />
                            <span style={{ fontSize: "1.1rem", fontWeight: "bolder", fontFamily: "cursive" }}>Quick Cart</span>
                        </div>


                        <div onClick={() => setLocationApiBox(true)} className={styles.locationMenu} >

                            <div style={{ height: "100%", width: "50", gap: "5px", display: "flex", flexDirection: "column" }} >
                                <span style={{ fontSize: "15px", color: "#5E6566" }} >Location</span>
                                <span style={{ color: "#573B8B", fontWeight: "bolder" }} >{selectedCountry}</span>
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
                                        <img src={`${BACKEND_URL}/api/render/img/${user?.id}`} alt="" width="40px" />

                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }} >
                                            <span style={{ fontSize: "1.2rem" }} >User</span>
                                            <span style={{ fontSize: "15px", color: "gray", fontWeight: "bold" }} >{user?.email || "user@gmail.com"} </span>
                                        </div>

                                    </div>


                                    <div className={styles.profileAccountOptions} >
                                        <span onClick={() => navigate("/my-account")} style={{ display: "flex", gap: "10px" }}><FontAwesomeIcon icon={faUser} />My Account</span>
                                        <span onClick={() => navigate("/orders")} style={{ display: "flex", gap: "10px" }}><FontAwesomeIcon icon={faShoppingBag} />Orders</span>
                                        <span onClick={() => navigate("/my-list")} style={{ display: "flex", gap: "10px" }}><FontAwesomeIcon icon={faListUl} />My List</span>
                                        <span onClick={handleLogoutUser} style={{ display: "flex", gap: "10px" }}><FontAwesomeIcon icon={faSignOut} />Logout</span>

                                    </div>

                                </div>}

                            </button>

                            :

                            <button onClick={() => navigate("/login")} className={styles.logInButton} >Log In</button>

                        }

                        <button
                            onClick={() => navigate("/cart")}
                            className={styles.shoppingCart}
                            disabled={!user}
                            style={{ position: "relative", background: "none", border: "none", cursor: user ? "pointer" : "not-allowed" }}
                        >
                            <FontAwesomeIcon icon={faShoppingCart} color="blue" />
                            <span
                                id={styles.totalItems}
                                style={{
                                    position: "absolute",
                                    top: "-8px",
                                    right: "-8px",
                                    background: "#ff3b3b",
                                    color: "white",
                                    borderRadius: "50%",
                                    padding: "2px 7px",
                                    fontSize: "0.8rem",
                                    fontWeight: "bold",
                                    minWidth: "22px",
                                    textAlign: "center",
                                    display: Array.isArray(productItems) && productItems.length > 0 ? "inline-block" : "none"
                                }}
                            >
                                {Array.isArray(productItems) ? productItems.length : 0}
                            </span>
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

                                <div onClick={() => NavigateAndMoveToTop(image.name)}
                                    onMouseOver={() => HandleHoveredList(image.name)} id={styles.eachCategoryItem} key={index} style={{
                                        padding: "10px",
                                        display: 'flex', width: "100%", height: "40px", alignItems: "center", gap: "5px"
                                    }}   >
                                    <img src={image.src} alt="" className="h-5" />
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
                            <img src={image.src} alt="" className="h-10" />
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
