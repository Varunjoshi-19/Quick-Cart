import TopFixedBar from './TopFixedBar'
import BottomFixedBar from './BottomFixedBar'
import styles from "../Styling/MyAccount.module.css"
import { useEffect, useRef, useState } from 'react'
import profile from "../assets/default.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { useUserAuthContext } from '../hooks/UserContext';
import { BACKEND_URL } from '../utils/getData';
import Preloader from '../small-components/PreLoader';




function MyAccount() {

    const [toogleSelected, setToogleSelected] = useState<boolean>(true);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileLoader, setFileLoader] = useState<boolean>(false);
    const [profileImage, setProfileImage] = useState<string | null>(null);




    const { user, loggedIn, dispatch } = useUserAuthContext();
    const [showMain, setShowMain] = useState<boolean>(false);



    const [phoneNumberValue, setPhoneNumberValue] = useState<string>("");
    const [nameValue, setNameValue] = useState<string>("");
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [isEditable, setIsEditable] = useState(false);


    useEffect(() => {
        if (user) {
            setPhoneNumberValue(user.phoneNo || "");
            setNameValue(user.name);
        }
    }, [user]);




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


    const saveUserInfo = async () => {

        if (nameValue == user?.name && phoneNumberValue == user.phoneNo) {
            if (!selectedFile) return;
        }

        const flag = confirm("Are sure you want to alter your existing details??");
        if (!flag) return;

        if (!nameValue && !phoneNumberValue && !selectedFile) return;


        const formData = new FormData();

        formData.set("userId", user?.id);

        if (nameValue) formData.set("newName", nameValue);
        if (phoneNumberValue) formData.set("newPhoneNo", phoneNumberValue);
        if (selectedFile) formData.set("file", selectedFile);


        const repsonse = await fetch(`${BACKEND_URL}/user/update-user`, {
            method: "POST",
            body: formData
        })

        const result = await repsonse.json();
        if (repsonse.ok) {
            alert("User Info Changed Successfully!")
            const data = result.user;
            const newUserData = {
                id: data.id,
                name: data.name,
                email: data.email,
                phoneNo: data.phoneNo
            }
            dispatch({ type: "set", payload: newUserData });
            localStorage.setItem("user", JSON.stringify(newUserData));
            console.log("details changed successfully");
        }
        if (!repsonse.ok) {
            console.log("failed to change")
        }
        setIsEditable(false);

    }




    useEffect(() => {
        const timer = setTimeout(() => {
            setShowMain(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    if (!showMain) {
        return <Preloader />
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
                                            <img onClick={SelectedFile} id={styles.profileImage} src={`${BACKEND_URL}/api/render/img/${user?.id}` || profile} alt="" />
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
                                        <input id={styles.inputElement} placeholder='Name' disabled={!isEditable}
                                            value={nameValue} onChange={function (e: React.ChangeEvent<HTMLInputElement>) {
                                                if (e.target.value.length > 15) return;
                                                setNameValue(e.target.value);
                                            }}

                                            type="text" />
                                    </div>
                                    <input id={styles.emailInputElement} value={user?.email}
                                        style={{ opacity: "0.5" }}
                                        type="email" disabled={true} />
                                </div>

                                <div className={styles.animationInputElement} >
                                    <input id={styles.inputElement} placeholder='Phone.NO' disabled={!isEditable}
                                        value={phoneNumberValue} onChange={handleSetNumber}
                                        type="text" />
                                </div>
                                <div style={{ display: "flex", gap: "20px" }}>
                                    <button onClick={saveUserInfo} id={styles.saveButton}>Save</button>
                                    <button onClick={() => {
                                        const flag = confirm("Are you want to edit your details?");
                                        if (!flag) return;
                                        setIsEditable(true);

                                    }} id={styles.saveButton}>Edit</button>
                                </div>

                            </div>

                        </div>

                        :

                        // change password view

                        <div style={{ display: "flex", gap: "20px", flexDirection: "column" }} >
                            <div style={{ display: "flex", gap: "20px" }} >

                                <div className={styles.animationInputElement} >
                                    <span style={{ color: "gray" }} >Old Password</span>
                                    <input id={styles.inputElement}
                                        value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}
                                        type="text" />
                                </div>

                                <div className={styles.animationInputElement} >
                                    <span style={{ color: "gray" }} >New Password</span>
                                    <input id={styles.inputElement}
                                        value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                                        type="text" />
                                </div>

                                <div className={styles.animationInputElement} >
                                    <span style={{ color: "gray" }} >Confirm Password</span>
                                    <input id={styles.inputElement}
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
