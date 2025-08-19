import TopFixedBar from './TopFixedBar'
import styles from "../Styling/Orders.module.css";
import BottomFixedBar from './BottomFixedBar'
import { BACKEND_URL  } from "../utils/getData"
import OrderCard from '../small-components/OrderCard';
import { useEffect, useState } from 'react';
import Loader from '@/small-components/Loader';

function Orders() {

    const [allOrders, setAllOrders] = useState<any[] | null>(null);
    const [orderLoading, setOrderLoading] = useState<boolean>(false);
    useEffect(() => {
window.document.body.style.overflowY = "auto";
window.document.body.style.overflowX = "hidden";

        async function fetchOrders() {
            setOrderLoading(true);
            const res = await fetch(`${BACKEND_URL}/product/get-orders`);
            const result = await res.json();
            if (res.ok) {
                console.log(result.orders);
                setAllOrders(result.orders);
            }

            setOrderLoading(false);
        }


        fetchOrders();
    }, []);


    return (

        <>
            <TopFixedBar />

            <div className={styles.orderBarContainer}  >
                <div className="space-y-6 p-4 max-w-6xl mx-auto">
                    {allOrders && allOrders.length > 0 ? allOrders.map((order, index) => (
                        <OrderCard key={index} order={order} />
                    ))


                        :

                        <div style={{
                            display: "flex",
                            justifyContent: "center", fontWeight: "bolder"

                        }}>
                            {orderLoading ?

                                <Loader />
                                :
                                <div style={{ height: "40px" }}>
                                    No Orders
                                </div>

                            }
                        </div>

                    }
                </div>

                <BottomFixedBar />

            </div>


        </>
    )
}



export default Orders

