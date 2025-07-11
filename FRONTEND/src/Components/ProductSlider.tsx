import { useState } from "react";
import styles from "../Styling/ProductList.module.css";
import { useNavigate } from "react-router-dom";
import { SlideToTop } from "../utils/script.js";


type PropsType = {

    moveLeftSideScroll: (element: string) => void;
    moveRightSideScroll: (element: string) => void;
    ID: string;

}

function ProductSlider({ moveLeftSideScroll, moveRightSideScroll, ID }: PropsType) {

    const [arrayOfList, setArrayOfList] = useState<number[]>([1, 2, 3, 4, 5, 5, 6, 6]);
    const navigate = useNavigate();

    function NavigateAndRestThings(id: any) {

        navigate(`/product/${id}`);
        SlideToTop();
    }


    return (
        <>
            <div className={styles.productListContainer}>

                <div id={ID} className={styles.productList} style={{ scrollBehavior: "smooth" }} >


                    {arrayOfList.map((each, index) => (
                        <div key={index} onClick={() => NavigateAndRestThings(each)} className={styles.eachProductList} >{each}</div>

                    ))}

                </div>



                <button onClick={() => moveLeftSideScroll(ID)} style={{
                    zIndex: "3", position: "absolute", top: "40%", left: "20%", padding: "5px", width: "40px", height: "40px",
                    borderRadius: "50%", border: "none", backgroundColor: "#181A1B", color: "white", fontSize: "1rem", fontWeight: "bolder", cursor: "pointer"
                }}>{"<"}</button>
                <button onClick={() => moveRightSideScroll(ID)} style={{
                    position: "absolute", right: "20%", padding: "5px", top: "40%", width: "40px", height: "40px", cursor: "pointer",
                    borderRadius: "50%", border: "none", backgroundColor: "#181A1B", color: "white", fontSize: "1rem", fontWeight: "bolder"
                }}>
                    {">"}
                </button>

            </div>


        </>
    )
}

export default ProductSlider
