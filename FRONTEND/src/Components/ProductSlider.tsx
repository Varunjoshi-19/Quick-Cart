import styles from "../Styling/ProductList.module.css";


type PropsType = {

    moveLeftSideScroll: (element: string) => void;
    moveRightSideScroll: (element: string) => void;
    ID : string;

}

function ProductSlider({moveLeftSideScroll , moveRightSideScroll , ID}: PropsType) {


    return (
        <>
            <div className={styles.productListContainer}>

                <div id={ID} className={styles.productList} style={{ scrollBehavior: "smooth" }} >

                    <div className={styles.eachProductList} ></div>
                    <div className={styles.eachProductList} ></div>
                    <div className={styles.eachProductList} ></div>
                    <div className={styles.eachProductList} ></div>
                    <div className={styles.eachProductList} ></div>
                    <div className={styles.eachProductList} ></div>
                    <div className={styles.eachProductList} ></div>
                    <div className={styles.eachProductList} ></div>
                    <div className={styles.eachProductList} ></div>

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
