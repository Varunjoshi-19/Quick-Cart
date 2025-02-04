import styles from "../Styling/BottomBar.module.css";
import FooterContent from "./FooterContent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEnvelope  } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, } from '@fortawesome/free-brands-svg-icons';
import {  SvgImages } from "../scripts/GetImage";


function BottomFixedBar() {
    return (
        <div>

            <div className={styles.joinLink} >

                <div style={{ position: "absolute", display: "flex", flexDirection: "column", left: "50px", top: "50px", gap: "20px" }}>
                    <span style={{ fontSize: "1.24rem", fontWeight: "bolder" }} >₹1000 discount for your first order</span>
                    <span style={{ fontSize: "3rem", fontWeight: "bolder" }}>Join our newsletter and get...</span>
                    <span style={{ color: "rgba(190, 187, 187, 0.662)", fontWeight: "bolder" }} >Join our email subscription now to get updates on</span>
                    <span style={{ color: "rgba(190, 187, 187, 0.662)", fontWeight: "bolder" }}   >promotions and coupons.</span>


                    <div style={{
                        height: "50px", backgroundColor: "black", display: "flex"
                        , alignItems: "center", gap: "5px", width: "500px", borderRadius: "10px"
                    }} >
                        <FontAwesomeIcon icon={faEnvelope} style={{
                            fontSize: "1.5rem", marginLeft: "5px"

                        }} />

                        <input placeholder="Your Email Address" type="text"
                            style={{
                                background: "transparent", color: "white", border: "none", outline: "none",
                                borderRadius: "10px", height: "50px", width: "80%", fontSize: "1.02rem"
                            }} />

                        <button style={{
                            padding: "5px", width: "100px", height: "40px",
                            marginRight: "5px", backgroundColor: "#412A76",
                            border: "none", color: "white", cursor: "pointer",
                            fontWeight: "bolder", borderRadius: "5px"
                        }} >JOIN</button>

                    </div>


                </div>
            </div>

            <div style={{
                display: "flex", width: "90%", marginLeft: "5%",
                padding: "20px", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid #edebf04d"
            }} >
                {SvgImages.map((item, index) => (

                    <div key={index} style={{
                        display: "flex",
                        gap: "10px", padding: "20px", alignItems: "center"
                    }} >
                        <img src={item.src} alt="" width="25px" />
                        <span>{item.content}</span>
                    </div>

                ))}
            </div>


            <div style={{
                display: "flex", gap: "100px",
                alignItems: "center", justifyContent: "center"
            }}>

                <div>
                    <p style={{ fontSize: "1.2rem", fontWeight: "bolder", color: "#7c4cec" }} >Fruits & Vegetables</p>
                    <FooterContent />
                </div>

                <div>
                    <p style={{ fontSize: "1.2rem", fontWeight: "bolder", color: "#7c4cec" }} >Breakfast And Dairy</p>
                    <FooterContent />
                </div>

                <div>
                    <p style={{ fontSize: "1.2rem", fontWeight: "bolder", color: "#7c4cec" }} >Meat & Seafood</p>
                    <FooterContent />
                </div>


                <div>
                    <p style={{ fontSize: "1.2rem", fontWeight: "bolder", color: "#7c4cec" }} >Beverages</p>
                    <FooterContent />
                </div>


                <div>
                    <p style={{ fontSize: "1.2rem", fontWeight: "bolder", color: "#7c4cec" }} >Breads & Bakery</p>
                    <FooterContent />
                </div>

            </div>

            <div className={styles.footerInformation} style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between", width: "90%", marginLeft: "5%", padding: "30px"
            }} >

                <span>Copyright 2025 , All Right Reserved</span>
                <div className={styles.footerIcons} style={{ gap: "10px", display: "flex" }}>
                    <FontAwesomeIcon id={styles.icon} icon={faFacebook} />
                    <FontAwesomeIcon id={styles.icon} icon={faTwitter} />
                    <FontAwesomeIcon id={styles.icon} icon={faInstagram} />

                </div>

            </div>

        </div>
    )
}

export default BottomFixedBar
