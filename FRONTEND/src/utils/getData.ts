import shoes from "../assets/shoes1.jpg";
export const BACKEND_URL = 'http://localhost:4000';
export const COUNTRY_API_URL = "https://countriesnow.space/api/v0.1/countries";
export const CURRENT_LOCATION_URL = "https://ipapi.co/json/";

export let ALL_COUNTRIES: any[] = [];


export const Countries = [


    "ENGLAND",
    "ENGLAND",
    "ENGLAND",
    "ENGLAND",
    "ENGLAND",
    "ENGLAND",
    "ENGLAND",
    "ENGLAND",
    "ENGLAND",


]

export async function fetchAllCountries() {

    try {

        const response = await fetch(COUNTRY_API_URL);
        const result = await response.json();
        if (response.ok) {
            ALL_COUNTRIES = result.data;
            return result.data;
        }
        if (!response.ok) console.log(result);

    }
    catch (err) {
        console.log(err);
    }


}

export function searchForSpecificCountry(country: string) {

    if (!country || typeof country !== "string") return ALL_COUNTRIES;

    const escapedCountry = country.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // escape regex chars
    const regex = new RegExp(escapedCountry, "i");

    const matchedCountries = ALL_COUNTRIES.filter(c => regex.test(c.country));
    console.log(matchedCountries);
    return matchedCountries;
}

export const orders = [
    {
        orderId: "ORD123456",
        paymentId: "PAY987654",
        products: "Keyboard, Mouse",
        name: "John Doe",
        quantity: 2,
        address: "123 Main St, Cityville",
        totalAmount: "$150",
        orderStatus: "Shipped",
        date: "2025-07-03"
    },
    {
        orderId: "ORD123457",
        paymentId: "PAY987655",
        products: "Monitor",
        name: "Alice Smith",
        quantity: 1,
        address: "456 Second St, Townsville",
        totalAmount: "$250",
        orderStatus: "Processing",
        date: "2025-07-02"
    },

    {
        orderId: "ORD123457",
        paymentId: "PAY987655",
        products: "Monitor",
        name: "Alice Smith",
        quantity: 1,
        address: "456 Second St, Townsville",
        totalAmount: "$250",
        orderStatus: "Processing",
        date: "2025-07-02"
    },


    {
        orderId: "ORD123457",
        paymentId: "PAY987655",
        products: "Monitor",
        name: "Alice Smith",
        quantity: 1,
        address: "456 Second St, Townsville",
        totalAmount: "$250",
        orderStatus: "Processing",
        date: "2025-07-02"
    },


    {
        orderId: "ORD123457",
        paymentId: "PAY987655",
        products: "Monitor",
        name: "Alice Smith",
        quantity: 1,
        address: "456 Second St, Townsville",
        totalAmount: "$250",
        orderStatus: "Processing",
        date: "2025-07-02"
    },
    // Add more orders...
]

export const DummyCartItems = [




    {

        product: {
            productImage: shoes,
            productName: "mobilePhone",
            rating: "5 start"
        },

        price: 20000,
        quntity: 4,
        subtotal: 80000,

    },
    {

        product: {
            productImage: shoes,
            productName: "mobilePhone",
            rating: "5 start"
        },

        price: 20000,
        quntity: 4,
        subtotal: 80000,

    },

    {

        product: {
            productImage: shoes,
            productName: "mobilePhone",
            rating: "5 start"
        },

        price: 20000,
        quntity: 4,
        subtotal: 80000,

    },


    {

        product: {
            productImage: shoes,
            productName: "mobilePhone",
            rating: "5 start"
        },

        price: 20000,
        quntity: 4,
        subtotal: 80000,

    },


    {

        product: {
            productImage: shoes,
            productName: "mobilePhone",
            rating: "5 start"
        },

        price: 20000,
        quntity: 4,
        subtotal: 80000,

    },


    {

        product: {
            productImage: shoes,
            productName: "mobilePhone",
            rating: "5 start"
        },

        price: 20000,
        quntity: 4,
        subtotal: 80000,

    },


]