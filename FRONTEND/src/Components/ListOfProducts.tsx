import React, { } from "react";
import styles from "../Styling/DashBoard.module.css";
import { useNavigate } from "react-router-dom";
import ProductCard from "../small-components/ProductCard.tsx"



function ListOfProducts({ products }: any) {

    const navigate = useNavigate();

    return (
        <>

            <div className={styles.newProductGrid} >
                <ProductCard products={products} />
            </div>

        </>
    )
}

export default React.memo(ListOfProducts);
