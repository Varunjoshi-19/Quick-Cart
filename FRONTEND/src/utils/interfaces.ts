export interface ProductPayloadType {
    _id: string;
    productName: string;
    productPrice: string;
    productCategory: string;
    productDesc?: string;
    AdditionalInfo?: JSON;

}


export interface LocalProductPayloadType {
    id: string;
    quantity: number;
    name: string;
    price: string;
    category: string;
    description?: string;
    additionalInfo?: JSON;

}


export type ImageType = {
    src: string,
    name: string,
    backgroundColor: string,
    isSelected: boolean
}

export interface OrderPlacePayload {
    orderId: string;
    paymentId: string;
    productName: string;
    userName: string;
    phone: number;
    quantity: number;
    address: string;
    totalAmount: number;
    orderStatus: string;
    date: Date
}



export interface UserPaymentProps {

    name: string;
    email: string;
    amount: number;
    currency: string;
    mobileNumber: number;
}



export const ACTIONS = {

    SET_SELECTED_PRODUCTS: 'SET_SELECTED_PRODUCTS',
    SET_TOTAL_PRICE: 'SET_TOTAL_PRICE',

} as const;


export type ACTIONS = {

    type: typeof ACTIONS[keyof typeof ACTIONS];
    payload?: any | null;
}


export type State = {
    cartItems: LocalProductPayloadType[] | null;
    totalPrice: number;

}

