import TopFixedBar from './TopFixedBar'
import styles from "../Styling/Orders.module.css";
import BottomFixedBar from './BottomFixedBar'
import { orders } from "../utils/getData"
import OrderCard from '../small-components/OrderCard';
import { useEffect } from 'react';

function Orders() {

    useEffect(() => {

        // TODO : fetch all the orders from the database and list them here .
    }, [])


    return (

        <>
            <TopFixedBar />

            <div className={styles.orderBarContainer}  >
                <div className="space-y-6 p-4 max-w-6xl mx-auto">
                    {orders.map((order, index) => (
                        <OrderCard key={index} order={order} />
                    ))}
                </div>

                <BottomFixedBar />

            </div>


        </>
    )
}



export default Orders

