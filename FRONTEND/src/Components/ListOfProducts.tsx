import React, {  } from "react";
import styles from "../Styling/DashBoard.module.css";
import { useNavigate } from "react-router-dom";
import { SlideToTop } from "../utils/script.js";
import { ProductPayloadType } from "utils/interfaces.js";
import ProductCard from "../small-components/ProductCard.tsx"

interface props {

    products: ProductPayloadType[]

}

function ListOfProducts({ products }: props) {

    const navigate = useNavigate();
  
    function NavigateAndRestThings(id: any) {

        navigate(`/product/${id}`);
        SlideToTop();
    }

    return (
        <>

             <div className={styles.newProductGrid} >                 
               <ProductCard products={products}/>
             </div>

        </>
    )
}

export default React.memo(ListOfProducts);
