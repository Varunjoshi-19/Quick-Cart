import { BACKEND_URL, CURRENT_LOCATION_URL } from "./getData";
import { LocalProductPayloadType } from "./interfaces";

export function SlideToTop() {


    window.scrollTo({

        top: 0,
        left: 0,
        behavior: "smooth"
    })

}

export function loadProductsFromLocalStorage() {
    const storedProducts = localStorage.getItem("cartItems");
    if (storedProducts) {
        const parsedStoredProduct = JSON.parse(storedProducts);
        return parsedStoredProduct;
    }

    return null;


}


export function computeTheTotalAmount(allItems: LocalProductPayloadType[]) {
    let total = 0;

    if (allItems && allItems.length > 0) {
        allItems.forEach(each => {
            total += Number(each.price) * each.quantity;
        })
    }

    return total;

}



export const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};


export async function RazorPayPaymentVerification(data: any) {

    const { amount, currency } = data;

    const orderData = await fetch(`${BACKEND_URL}/api/order/payment/sfsdfsf`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amount, currency: currency }),
    }).then(res => res.json());




    return orderData.id;



}



export async function fetchLocation(): Promise<string> {
    const response = await fetch(CURRENT_LOCATION_URL);
    const result = await response.json();
    if (response.ok) {
        return result.country_name;
    }

    return "";
}



export async function handleSavePlacedOrder() {

}