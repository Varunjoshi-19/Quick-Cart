import TopFixedBar from './TopFixedBar'
import styles from "../Styling/Orders.module.css";
import BottomFixedBar from './BottomFixedBar'
import { OrderItems } from "../utils/getData"

function Orders() {
    return (


        <>
            <TopFixedBar />

            <div className={styles.orderBarContainer}  >

                <div className={styles.orderBar}>

                    <p style={{ fontWeight: "bolder", fontSize: "1.5rem" }} >ORDERS</p>

                    <div className={styles.orderGrid} >
                        {OrderItems.map(item => (
                            <span key={item} >{item}</span>
                        ))}

                    </div>

                </div>


                <BottomFixedBar />

            </div>


        </>
    )
}



export default Orders

