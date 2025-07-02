// components/ProductCard.tsx
import { Card, CardContent, CardFooter } from "../Components/ui/card";
import { AspectRatio } from "../Components/ui/aspect-ratio";
import { ACTIONS, LocalProductPayloadType, ProductPayloadType } from "../utils/interfaces";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../utils/getData";
import { useCartItemContext } from "../hooks/ItemContext";
import { loadProductsFromLocalStorage } from "../utils/script";
import { useUserAuthContext } from "../hooks/UserContext";
import { useNavigate } from "react-router-dom";



interface ProductCardProps {
    products: ProductPayloadType[]
}


export default function ProductCard({ products }: ProductCardProps) {


    const [productCounter, setProductCounter] = useState<LocalProductPayloadType[]>([]);
    const { user } = useUserAuthContext();
    const navigate = useNavigate();
    const { dispatch } = useCartItemContext();
    let createdProduct: LocalProductPayloadType[] = [];

    useEffect(() => {

        function intializeProducts() {

            createdProduct = products.map(product => {
                return {
                    id: product._id,
                    count: 0,
                    name: product.productName,
                    price: product.productPrice,
                    category: product.productCategory,
                    description: product.productDesc || "",
                    additionalInfo: product.AdditionalInfo || {}
                } as LocalProductPayloadType;
            });

            const alreadyAddedProduts: any = checkForAlreadyAddedProducts(createdProduct);


            console.log(alreadyAddedProduts);
            setProductCounter(alreadyAddedProduts);

        }

        intializeProducts();

    }, [products]);

    function checkForAlreadyAddedProducts(createdProduct: LocalProductPayloadType[]) {

        const products = loadProductsFromLocalStorage();

        if (products) {
            const alreadyAddedProducts = createdProduct.map(product => {
                const match = products.find((product1: any) => product1.id === product.id);
                return match ? { ...product, count: match.count } : product;
            });

            return alreadyAddedProducts;
        }


    }


    function addToCart(id: string, count: number) {

        if (!user) {
            navigate("/login");
            return;
        }

        const updatedCounter = productCounter.map(product => {
            if (product.id === id) {
                return { ...product, count: product.count + count };
            }
            return product;
        });



        setProductCounter(updatedCounter);
        const selectedProducts = updatedCounter.filter(p => p.count > 0);
        dispatch({ type: ACTIONS.SET_SELECTED_PRODUCTS, payload: selectedProducts });
        localStorage.setItem("cartItems", JSON.stringify(selectedProducts));

    }




    return (
        <>
            {
                products && products.map((product: ProductPayloadType) => (
                    <Card key={product._id} className="w-full max-w-xs rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                            <div className="relative">
                                <AspectRatio ratio={4 / 3} className="bg-muted rounded-lg overflow-hidden">
                                    <img src={`${BACKEND_URL}/api/render/productImage/${product._id}`} className="object-cover w-full h-full" />
                                </AspectRatio>

                            </div>
                            <div className="mt-4 space-y-1">
                                <h3 className="text-base font-medium line-clamp-2">{product.productName}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">{product.productDesc}</p>
                                <p className="text-lg font-semibold text-primary">₹{product.productPrice}</p>
                            </div>

                        </CardContent>
                        <CardFooter className="px-4 pb-4">
                            {

                                (() => {
                                    const counter = productCounter.find(p => p.id === product._id)?.count;
                                    if (counter === 0) {
                                        return (
                                            <button
                                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"

                                                onClick={() => addToCart(product._id, 1)}
                                            >
                                                Add to Cart
                                            </button>
                                        );
                                    }
                                    return (
                                        <div className="flex items-center gap-2">
                                            <button
                                                className="bg-red-600 px-2 py-1 rounded text-lg"
                                                onClick={() => addToCart(product._id, -1)}
                                            >-</button>
                                            <span className="px-2">{counter}</span>
                                            <button
                                                className="bg-red-600 px-2 py-1 rounded text-lg"
                                                onClick={() => addToCart(product._id, 1)}
                                            >+</button>
                                        </div>
                                    );
                                })()

                            }
                        </CardFooter>
                    </Card>


                ))
            }
        </>
    )
}
