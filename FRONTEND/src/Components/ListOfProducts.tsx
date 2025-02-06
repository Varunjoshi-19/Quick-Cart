import { useState } from "react";
import styles from "../Styling/DashBoard.module.css";
import { useNavigate } from "react-router-dom";



function ListOfProducts() {

    const [arrayOfList, setArrayOfList] = useState<number[]>([1, 2, 3, 4, 5, 5, 6, 6,1, 2, 3, 4, 5, 5, 6, 61, 2, 3, 4, 5, 5, 6, 6]);
const navigate = useNavigate();

    return (
        <>

            <div className={styles.newProductGrid} >



                {arrayOfList.map(each  => (
                <div onClick={() => navigate(`product/${each}`)}  className={styles.eachProductList} >{each}</div>
                ))}


            </div>

        </>
    )
}

export default ListOfProducts
