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
    count: number;
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



export const ACTIONS = {

    SET_SELECTED_PRODUCTS: 'SET_SELECTED_PRODUCTS',

} as const;


export type ACTIONS = {

    type: typeof ACTIONS[keyof typeof ACTIONS];
    payload?: LocalProductPayloadType[] | null;
}





export type State = {
    cartItems: LocalProductPayloadType[] | null;

}

