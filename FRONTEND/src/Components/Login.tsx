import { useEffect, useRef, useState } from "react";
import styles from "../Styling/Sign.module.css";
import logo from "../assets/weblogo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from "react-router-dom";


function Login() {

    const navigate = useNavigate();

    const emailInputRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLSpanElement>(null);

    const passInputRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLSpanElement>(null);


    const [emailValue, setEmailValue] = useState<string>("");
    const [passValue, setPassValue] = useState<string>("");


    useEffect(() => {
        const Emailinput = emailInputRef.current;
        const Emailbox = emailRef.current;


        if (Emailinput && Emailbox) {


            Emailinput.addEventListener("focus", () => handleFocus(Emailbox));
            Emailinput.addEventListener("blur", () => handleBlur(Emailbox));

            if (emailValue != "") Emailinput.addEventListener("blur", () => handleFocus(Emailbox));

            return () => {
                Emailinput.removeEventListener("focus", () => handleFocus);
                Emailinput.removeEventListener("blur", () => handleBlur);
            };
        }



    }, [emailValue, emailInputRef]);

    useEffect(() => {

        const Passinput = passInputRef.current;
        const PassBox = passRef.current;

        if (Passinput && PassBox) {


            Passinput.addEventListener("focus", () => handleFocus(PassBox));
            Passinput.addEventListener("blur", () => handleBlur(PassBox));


            if (passValue != "") Passinput.addEventListener("blur", () => handleFocus(PassBox));

            return () => {
                Passinput.removeEventListener("focus", () => handleFocus);
                Passinput.removeEventListener("blur", () => handleBlur);
            };
        }



    }, [passValue, passInputRef]);


    function handleFocus(element: HTMLSpanElement) {
        element.style.top = "-20px";
        element.style.color = "#1877F2";
        element.style.fontSize = "16px";
    }

    function handleBlur(element: HTMLSpanElement) {
        element.style.top = "5px";
        element.style.color = "white";
        element.style.fontSize = "1.4rem";
    }

    function handleForgetPassword() { 

    }

    function handleLogIn(e : React.FormEvent<HTMLFormElement>) { 
        e.preventDefault();
    }


    return (
        <>

            <div className={styles.SignContainer} >

                <div style={{
                    display: "flex", width: "100%", height : "95px", 
                    alignItems: "center", justifyContent: "center"
                }} >
                    <img src={logo} alt="" width="100px" />
                </div>

                <p style={{ marginBottom: "40px" , fontSize : "1.5rem", marginLeft :"20px"  ,fontWeight : "bolder"}} >Log In</p>

                <form onSubmit={handleLogIn} className={styles.formContainer}  >

                    <div id={styles.inputDiv} >
                        <span ref={emailRef} id={styles.spanLabel}>Email*</span>
                        <input ref={emailInputRef} id={styles.inputField}
                            value={emailValue} onChange={(e) => setEmailValue(e.target.value)}
                            type="text" />
                    </div>

                    <div id={styles.inputDiv} >
                        <span ref={passRef} id={styles.spanLabel}>Password*</span>
                        <input ref={passInputRef} id={styles.inputField}
                            value={passValue} onChange={(e) => setPassValue(e.target.value)}
                            type="text" />
                    </div>

                  <p onClick={handleForgetPassword} 
                   style={{ marginLeft : "20px"  ,position : "absolute" , top : "52%" , cursor : "pointer"}}
                  >Forgot Password?</p>
                      
                <div style={{ display : "flex" , justifyContent :"space-around" , marginTop :"20px" }} >

                <button type="submit" style={{ width : "150px" , padding : "10px" , 
                border : "none" , borderRadius : "10px", fontSize  : "1.1rem", fontWeight :"bolder" , color : "white",cursor: "pointer",
                    backgroundColor : "#392463" }} >Log In</button>
                <button onClick={() => navigate("/")} style={{ width : "150px" , padding : "10px" , 
                border : "1px solid #1877F2" , borderRadius : "10px", fontSize  : "1.1rem", fontWeight :"bolder" ,cursor: "pointer" ,
                backgroundColor : "transparent" , color : "#1877F2"
                    }}>Cancel</button>

                </div>

                <span style={{ marginLeft : "20px" }} >Not Registered?<span  data-notregistered onClick={() => navigate("/signup")}>Sign Up</span>
                </span> 
                
                </form>
            
            <div style={{ display :"flex" , flexDirection : "column" , alignItems : "center" , padding : "10px" }}>
                <p  style={{ fontSize : "1.2rem" , fontWeight: "bolder" }} >or continue with social account</p>
                <button id={styles.googleButton}>
                     <FontAwesomeIcon icon={faGoogle} style={{ color : "#4285F4" }}/>
                    Log In With Google</button>
            </div>


            </div>

        </>
    )
}

export default Login
