import TopFixedBar from './TopFixedBar'
import BottomFixedBar from './BottomFixedBar'
import styles from "../Styling/MyAccount.module.css"
import { useEffect, useRef, useState } from 'react'
import profile from "../assets/default.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';



function MyAccount() {

    const [toogleSelected, setToogleSelected] = useState<boolean>(true);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileLoader, setFileLoader] = useState<boolean>(false);
    const [profileImage, setProfileImage] = useState<string | null>(null);

    const phoneNumberInputRef = useRef<HTMLInputElement>(null);
    const nameInputRef = useRef<HTMLInputElement>(null);
    const oldPassInputRef = useRef<HTMLInputElement>(null);
    const newPassInputRef = useRef<HTMLInputElement>(null);
    const confirmInputRef = useRef<HTMLInputElement>(null);

    const nameRef = useRef<HTMLSpanElement>(null);
    const numberRef = useRef<HTMLSpanElement>(null);
    const oldPassRef = useRef<HTMLSpanElement>(null);
    const newPassRef = useRef<HTMLSpanElement>(null);
    const confirmPassRef = useRef<HTMLSpanElement>(null);

    const [phoneNumberValue, setPhoneNumberValue] = useState<string>("");
    const [nameValue, setNameValue] = useState<string>("");
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");


    useEffect(() => {
         
      setPhoneNumberValue("");
      setNameValue("");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
     

    }, [toogleSelected])


    useEffect(() => {

        const phoneInputRef = phoneNumberInputRef.current;
        const phoneBox = numberRef.current;

        if (phoneBox && phoneInputRef) {

            phoneInputRef.addEventListener("focus", () => handleOnFocus(phoneBox));
            phoneInputRef.addEventListener("blur", () => handleOnBlur(phoneBox));


           
            if(phoneNumberValue != "")  phoneInputRef.addEventListener("blur", () => handleOnFocus(phoneBox));


            return () => {
                phoneInputRef.removeEventListener("focus", () => handleOnFocus);
                phoneInputRef.removeEventListener("blur", () => handleOnBlur);
            }
        }



    }, [phoneNumberInputRef, phoneNumberValue , toogleSelected]);

    useEffect(() => {

        const nameInRef = nameInputRef.current;
        const nameBox = nameRef.current;

        if (nameBox && nameInRef) {

            nameInRef.addEventListener("focus", () => handleOnFocus(nameBox));
            nameInRef.addEventListener("blur", () => handleOnBlur(nameBox));


            if(nameValue != "")  nameInRef.addEventListener("blur", () => handleOnFocus(nameBox));
 
      

            return () => {
                nameInRef.removeEventListener("focus", () => handleOnFocus);
                nameInRef.removeEventListener("blur", () => handleOnBlur);
            }
        }



    }, [nameInputRef, nameValue , toogleSelected]);

    useEffect(() => {

        const oldInputRef = oldPassInputRef.current;
        const oldBox = oldPassRef.current;

        if (oldBox && oldInputRef) {

            oldInputRef.addEventListener("focus", () => handleOnFocus(oldBox));
            oldInputRef.addEventListener("blur", () => handleOnBlur(oldBox));

            if(oldPassword != "") oldInputRef.addEventListener("blur" , () => handleOnFocus(oldBox));


            return () => {
                oldInputRef.removeEventListener("focus", () => handleOnFocus);
                oldInputRef.removeEventListener("blur", () => handleOnBlur);
            }
        }
         

         
    } , [oldPassInputRef , oldPassword , toogleSelected]);

    useEffect(() => {

        const newInputRef = newPassInputRef.current;
        const newBox = newPassRef.current;

        if (newBox && newInputRef) {

            newInputRef.addEventListener("focus", () => handleOnFocus(newBox));
            newInputRef.addEventListener("blur", () => handleOnBlur(newBox));

            if(newPassword != "" )  newInputRef.addEventListener("blur", () => handleOnFocus(newBox));

            return () => {
                newInputRef.removeEventListener("focus", () => handleOnFocus);
                newInputRef.removeEventListener("blur", () => handleOnBlur);
            }
        }

         
    } , [newPassInputRef , newPassword , toogleSelected]);

    useEffect(() => {

        const confirmPassInputRef = confirmInputRef.current;
        const confirmBox = confirmPassRef.current;

        if (confirmBox && confirmPassInputRef) {

            confirmPassInputRef.addEventListener("focus", () => handleOnFocus(confirmBox));
            confirmPassInputRef.addEventListener("blur", () => handleOnBlur(confirmBox));

            if(confirmPassword != "" )  confirmPassInputRef.addEventListener("blur", () => handleOnFocus(confirmBox));
               

            return () => {
                confirmPassInputRef.removeEventListener("focus", () => handleOnFocus);
                confirmPassInputRef.removeEventListener("blur", () => handleOnBlur);
            }
        }

         
    } , [confirmInputRef , confirmPassword , toogleSelected]);


    function handleOnFocus(element: HTMLElement) {
        element.style.top = "-10px";
        element.style.zIndex = "0";
        element.style.fontSize = "14px";
        element.style.color = "#1877F2";
    }

    function handleOnBlur(element: HTMLElement) {
        element.style.top = "30%";
        element.style.zIndex = "-1";
        element.style.fontSize = "1.2rem";
        element.style.color = "gray";
    }

    function handleSetNumber(e: React.ChangeEvent<HTMLInputElement>) {

        if (isNaN(Number(e.target.value))) return;
        if (e.target.value.length > 10) return;

        setPhoneNumberValue(e.target.value);
    }

    function handleSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files;
        if (file) {
            const profiImage = URL.createObjectURL(file[0]);
            setFileLoader(true);
            setProfileImage(profiImage);
            setSelectedFile(file[0]);

            setTimeout(() => {
                setFileLoader(false);

            }, 2000);
            console.log(profileImage);
        }
    }

    function SelectedFile() {
        if (fileInputRef.current) fileInputRef.current.click();
    }




    return (
        <>

            <TopFixedBar />

            <div className={styles.myAccountContainer}>

                <div className={styles.accountMidContainer} >
                    <p>MY ACCOUNT</p>

                    <div className={styles.ProfileAndPassword} >
                        <span onClick={() => setToogleSelected(true)} style={{
                            color: toogleSelected ? "#1877F2" : "white",
                            borderBottom: toogleSelected ? "3px solid #1877F2" : "none"

                        }} >Edit Profile</span>
                        <span onClick={() => setToogleSelected(false)}
                            style={{
                                color: toogleSelected ? "white" : "#1877F2",
                                borderBottom: toogleSelected ? "none" : "3px solid #1877F2"
                            }}
                        >Change Password</span>
                    </div>

                    {toogleSelected ?

                //   edit profile view
                        <div className={styles.profileAndInputs}
                            style={{ padding: "20px", width: "auto", display: "flex", gap: "30%" }} >

                            <div style={{ position: "relative" }} >
                                {

                                    profileImage ?

                                        <>

                                            {fileLoader ?
                                                <div style={{
                                                    position: "relative", width: "120px", backgroundColor: "black",
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    height: "120px", border: "2px solid #3498db", borderRadius: "50%"
                                                }} >
                                                    <div className={styles.loader}></div>
                                                </div>
                                                :
                                                <>
                                                    <img onClick={SelectedFile} id={styles.profileImage} src={profileImage ? profileImage : ""} alt="" />
                                                    <FontAwesomeIcon icon={faCloudUploadAlt} id={styles.uploadIcon}
                                                        style={{
                                                            position: "absolute", left: "50%",
                                                            fontSize: "1.5rem",
                                                            top: "30%", transform: "translate(-50%, -50%)"
                                                        }} />
                                                </>
                                            }
                                        </>
                                        :
                                        <>
                                            <img onClick={SelectedFile} id={styles.profileImage} src={profile} alt="" />
                                            <FontAwesomeIcon icon={faCloudUploadAlt} id={styles.uploadIcon}
                                                style={{
                                                    position: "absolute", left: "50%",
                                                    fontSize: "1.5rem",
                                                    top: "30%", transform: "translate(-50%, -50%)"
                                                }} />
                                        </>
                                }



                                <input type="file"
                                    style={{ display: "none" }}
                                    ref={fileInputRef}
                                    onChange={handleSelectFile}
                                />

                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                                <div style={{ display: "flex", gap: "20px" }} >
                                    <div className={styles.animationInputElement} >
                                        <span ref={nameRef} style={{ color: "gray" }} >Name</span>
                                        <input ref={nameInputRef} id={styles.inputElement}
                                            value={nameValue} onChange={function (e: React.ChangeEvent<HTMLInputElement>) {
                                                if (e.target.value.length > 15) return;
                                                setNameValue(e.target.value);
                                            }}

                                            type="text" />
                                    </div>
                                    <input id={styles.emailInputElement} type="email" disabled={true} />
                                </div>

                                <div className={styles.animationInputElement} >
                                    <span ref={numberRef} style={{ color: "gray" }} >Phone</span>
                                    <input ref={phoneNumberInputRef} id={styles.inputElement}
                                        value={phoneNumberValue} onChange={handleSetNumber}
                                        type="text" />
                                </div>
                                <button id={styles.saveButton}>Save</button>

                            </div>

                        </div>

                        :

                        // change password view

                        <div style={{ display : "flex" , gap : "20px"  , flexDirection : "column"}} >
                            <div style={{ display : "flex" , gap : "20px" }} >

                                <div className={styles.animationInputElement} >
                                    <span ref={oldPassRef} style={{ color: "gray" }} >Old Password</span>
                                    <input ref={oldPassInputRef} id={styles.inputElement}
                                        value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}
                                        type="text" />
                                </div>
                           
                                <div className={styles.animationInputElement} >
                                    <span ref={newPassRef} style={{ color: "gray" }} >New Password</span>
                                    <input ref={newPassInputRef} id={styles.inputElement}
                                        value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                                        type="text" />
                                </div>

                                <div className={styles.animationInputElement} >
                                    <span ref={confirmPassRef} style={{ color: "gray" }} >Confirm Password</span>
                                    <input ref={confirmInputRef} id={styles.inputElement}
                                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                        type="text" />
                                </div>

                            </div>

                            <button id={styles.saveButton}>Save</button>
                        </div>

                    }


                </div>



                <BottomFixedBar />
            </div>

        </>
    )
}

export default MyAccount
