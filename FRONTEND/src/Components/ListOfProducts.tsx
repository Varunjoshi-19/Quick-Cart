import { useState } from "react";
import styles from "../Styling/DashBoard.module.css";
import { useNavigate } from "react-router-dom";
import { SlideToTop } from "../utils/script.js";


function ListOfProducts() {

    const [arrayOfList, setArrayOfList] = useState<number[]>([1, 2, 3, 4, 5, 5, 6, 6,1, 2, 3, 4, 5, 5, 6, 61, 2, 3, 4, 5, 5, 6, 6]);
  
    const navigate = useNavigate();


    function NavigateAndRestThings(id : any) {
     
        navigate(`/product/${id}`);
        SlideToTop();
        }

    return (
        <>

            <div className={styles.newProductGrid} >



                {arrayOfList.map(each  => (
                <div onClick={() => NavigateAndRestThings(each)}  className={styles.eachProductList} >{each}</div>
                ))}


            </div>

        </>
    )
}

export default ListOfProducts
