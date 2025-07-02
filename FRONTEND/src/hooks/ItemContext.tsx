import { Dispatch, useContext, useEffect, useMemo, useReducer } from "react";
import { createContext } from "react";
import { ACTIONS, LocalProductPayloadType, State } from "../utils/interfaces";
import { loadProductsFromLocalStorage } from "../utils/script";

export type ItemContextType = {
    productItems: LocalProductPayloadType[];
    dispatch: Dispatch<ACTIONS>;
}


const cartContext = createContext<ItemContextType | undefined>(undefined);


export const useCartItemContext = () => {

    const context = useContext(cartContext);
    if (!context) throw new Error("context not avaiable");

    return context;

}


const method = (state: State, action: ACTIONS) => {

    switch (action.type) {

        case ACTIONS.SET_SELECTED_PRODUCTS: return { ...state, cartItems: action.payload || null }

        default: return state;
    }

}

export const ItemContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [state, dispatch] = useReducer(method, { cartItems: null });

    const productItems: LocalProductPayloadType[] = useMemo(
        () => state.cartItems ?? [],
        [state.cartItems]
    );


    function loadProducts() {
        const parsedStoredProduct = loadProductsFromLocalStorage();
        dispatch({ type: ACTIONS.SET_SELECTED_PRODUCTS, payload: parsedStoredProduct });


    }

    useEffect(() => {
        loadProducts();
    }, [])



    return (
        <cartContext.Provider value={{ productItems: productItems, dispatch }}>
            {children}
        </cartContext.Provider>
    )

}