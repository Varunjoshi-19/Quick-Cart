import { useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { createContext } from "react";
import { BACKEND_URL } from "../utils/getData"
import { ProductPayloadType } from "utils/interfaces";

type ProductContextType = {
    products: ProductPayloadType[] | null;
}


const productContext = createContext<ProductContextType | undefined>(undefined);

export const useProductContext = () => {

    const context = useContext(productContext);
    if (!context) throw new Error("context not avaiable");

    return context;

}
export const ACTIONS = {

    SET_PRODUCTS: 'SET_PRODUCTS'

} as const;


type State = {

    products: ProductPayloadType[] | null;
}

type ACTIONS = {

    type: typeof ACTIONS[keyof typeof ACTIONS];
    payload?: ProductPayloadType[] | null;
}





const method = (state: State, action: ACTIONS) => {

    switch (action.type) {

        case ACTIONS.SET_PRODUCTS: return { ...state, products: action.payload || null }

        default: return state;
    }

}

export const ProductContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [state, dispatch] = useReducer(method, { products: null });

const value = useMemo(() => ({ products: state.products }), [state.products]);

    
useEffect(() => {
    const fetchAllProduct = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/product/get-products`);
            const result = await response.json();
            if (response.ok) {
                console.log("product"  , result.products);
                dispatch({ type: ACTIONS.SET_PRODUCTS, payload: result.products });
            } else {
                console.log("failed to fetch products");
            }
        } catch (error) {
            console.log(error);
        }
    };

    fetchAllProduct();
}, []); 



    return (
        <productContext.Provider value={value}>
            {children}
        </productContext.Provider>
    )

}