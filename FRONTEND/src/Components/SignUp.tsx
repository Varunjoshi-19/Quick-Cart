import { useEffect, useRef, useState } from "react";
import styles from "../Styling/Sign.module.css";
import logo from "../assets/weblogo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/getData";

function SignUp() {

    const navigate = useNavigate();

    const emailInputRef = useRef<HTMLInputElement>(null);
    const passInputRef = useRef<HTMLInputElement>(null);
    const nameInputRef = useRef<HTMLInputElement>(null);
    const phoneInputRef = useRef<HTMLInputElement>(null);


    const emailRef = useRef<HTMLSpanElement>(null);
    const passRef = useRef<HTMLSpanElement>(null);
    const nameRef = useRef<HTMLSpanElement>(null);
    const phoneNumberRef = useRef<HTMLSpanElement>(null);



    const [emailValue, setEmailValue] = useState<string>("");
    const [passValue, setPassValue] = useState<string>("");
    const [nameValue, setNameValue] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");


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


    useEffect(() => {

        const nameInput = nameInputRef.current;
        const nameBox = nameRef.current;

        if (nameInput && nameBox) {


            nameInput.addEventListener("focus", () => handleFocus(nameBox));
            nameInput.addEventListener("blur", () => handleBlur(nameBox));


            if (nameValue != "") nameInput.addEventListener("blur", () => handleFocus(nameBox));

            return () => {
                nameInput.removeEventListener("focus", () => handleFocus);
                nameInput.removeEventListener("blur", () => handleBlur);
            };
        }



    }, [nameValue, nameInputRef]);


    useEffect(() => {

        const phoneInput = phoneInputRef.current;
        const phoneNumberBox = phoneNumberRef.current;

        if (phoneInput && phoneNumberBox) {


            phoneInput.addEventListener("focus", () => handleFocus(phoneNumberBox));
            phoneInput.addEventListener("blur", () => handleBlur(phoneNumberBox));



            if (phoneNumber != "") phoneInput.addEventListener("blur", () => handleFocus(phoneNumberBox));

            return () => {
                phoneInput.removeEventListener("focus", () => handleFocus);
                phoneInput.removeEventListener("blur", () => handleBlur);
            };
        }



    }, [phoneInputRef, phoneNumber]);


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

    function handleSetPhoneNumber(e: React.ChangeEvent<HTMLInputElement>) {
        if (isNaN(Number(e.target.value))) return;
        if (e.target.value.length > 10) return;

        setPhoneNumber(e.target.value);
    }

    async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const signUpData = {
            name: nameValue,
            phoneNo: phoneNumber || "",
            email: emailValue,
            password: passValue
        }

        const response = await fetch(`${BACKEND_URL}/user/signup`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(signUpData)
        });

        const result = await response.json();
        if (response.ok) {
            console.log(result.message);

        }
        if (!response.ok) console.log(result.errorMessage);

    }


    return (
        <>

            <div className={styles.SignContainer} style={{ width: "480px" }} >

                <div style={{
                    display: "flex", width: "100%", height: "90px",
                    alignItems: "center", justifyContent: "center"
                }} >
                    <img src={logo} alt="" width="90px" />
                </div>

                <p style={{ marginBottom: "40px", fontSize: "1.5rem", marginLeft: "20px", fontWeight: "bolder" }} >Sign Up</p>

                <form onSubmit={handleSignUp} className={styles.formContainer} style={{}} >

                    <div style={{ display: "flex", alignItems: "center", marginLeft: "15px", border: "" }}  >

                        <div id={styles.inputDiv} >
                            <span ref={nameRef} id={styles.spanLabel}>Name</span>
                            <input ref={nameInputRef} id={styles.inputField}
                                value={nameValue} onChange={(e) => setNameValue(e.target.value)}
                                type="text" />
                        </div>

                        <div id={styles.inputDiv} >
                            <span ref={phoneNumberRef} id={styles.spanLabel}>Phone no.</span>
                            <input ref={phoneInputRef} id={styles.inputField}
                                value={phoneNumber} onChange={handleSetPhoneNumber}
                                type="text" />
                        </div>

                    </div>


                    <div id={styles.inputDiv} >
                        <span ref={emailRef} id={styles.spanLabel}>Email*</span>
                        <input ref={emailInputRef} id={styles.inputField}
                            value={emailValue} onChange={(e) => setEmailValue(e.target.value)}
                            type="text" required />
                    </div>

                    <div id={styles.inputDiv} >
                        <span ref={passRef} id={styles.spanLabel}>Password*</span>
                        <input ref={passInputRef} id={styles.inputField}
                            value={passValue} onChange={(e) => setPassValue(e.target.value)}
                            type="password" required />
                    </div>

                    <p onClick={handleForgetPassword}
                        style={{ marginLeft: "25px", position: "absolute", top: "57%", cursor: "pointer" }}
                    >Forgot Password?</p>

                    <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }} >

                        <button type="submit" style={{
                            width: "150px", padding: "8px",
                            border: "none", borderRadius: "10px", fontSize: "1.1rem", fontWeight: "bolder", color: "white", cursor: "pointer",
                            backgroundColor: "#392463"
                        }} >Log In</button>
                        <button onClick={() => navigate("/")} style={{
                            width: "150px", padding: "10px",
                            border: "1px solid #1877F2", borderRadius: "10px", fontSize: "1.1rem", fontWeight: "bolder", cursor: "pointer",
                            backgroundColor: "transparent", color: "#1877F2"
                        }}>Cancel</button>

                    </div>

                    <span style={{ marginLeft: "20px" }} >Already Have Account?<span data-notregistered onClick={() => navigate("/login")}>Log In</span>
                    </span>

                </form>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "8px" }}>
                    <p style={{ fontSize: "1.2rem", fontWeight: "bolder" }} >or continue with social account</p>
                    <button id={styles.googleButton}>
                        <FontAwesomeIcon icon={faGoogle} style={{ color: "#4285F4" }} />
                        Log In With Google</button>
                </div>


            </div>

        </>
    )
}

export default SignUp
