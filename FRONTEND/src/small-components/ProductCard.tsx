// components/ProductCard.tsx
import { Card, CardContent, CardFooter } from "../comp/components/ui/card";
import { AspectRatio } from "../comp/components/ui/aspect-ratio";
import { ACTIONS, LocalProductPayloadType, ProductPayloadType } from "../utils/interfaces";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../utils/getData";
import { useCartItemContext } from "../hooks/ItemContext";
import { loadProductsFromLocalStorage } from "../utils/script";
import { useUserAuthContext } from "../hooks/UserContext";
import { useNavigate } from "react-router-dom";



interface ProductCardProps {
    products: any[]
}


export default function ProductCard({ products }: any) {

    const [productCounter, setProductCounter] = useState<any[]>([]);
    const { user } = useUserAuthContext();
    const navigate = useNavigate();
    const { dispatch } = useCartItemContext();
    let createdProduct: any[] = [];

    useEffect(() => {

        function intializeProducts() {

            createdProduct = products.map((product: any) => {
                return {
                    id: product._id,
                    quantity: 0,
                    name: product.productName,
                    price: product.discountPrice,
                    category: product.category,
                    description: product.productDesc || "",
                    additionalInfo: product.AdditionalInfo || {}
                } as any;
            });

            const alreadyAddedProducts: any = checkForAlreadyAddedProducts(createdProduct);
            if (alreadyAddedProducts && alreadyAddedProducts != "") {
                setProductCounter(alreadyAddedProducts);
                return;
            }

            setProductCounter(createdProduct);

        }

        if (products != null) {
            intializeProducts();
        }

    }, [products]);

    function checkForAlreadyAddedProducts(createdProduct: LocalProductPayloadType[]) {

        const products = loadProductsFromLocalStorage();

        if (Array.isArray(products)) {
            const alreadyAddedProducts = createdProduct.map(product => {
                const match = products.find((product1: any) => product1.id === product.id);
                return match ? { ...product, quantity: match.quantity } : product;
            });

            return alreadyAddedProducts;
        }

        return createdProduct;

    }

    function addToCart(id: string, count: number) {

        if (!user) {
            navigate("/login");
            return;
        }


        setProductCounter((prevProducts) => {

            const updatedCounter = prevProducts.map(product => {
                if (product.id === id) {
                    return { ...product, quantity: product.quantity + count };
                }
                return product;
            });

            const selectedProducts = updatedCounter.filter(p => p.quantity > 0);
            dispatch({ type: ACTIONS.SET_SELECTED_PRODUCTS, payload: selectedProducts });
            localStorage.setItem("cartItems", JSON.stringify(selectedProducts));

            return updatedCounter;
        });


    }


    return (

        <>
            {products?.map((product: any) => {
                const counter = productCounter.find((p) => p.id === product._id)?.quantity ?? 0;
                const hoverImage = product.additionalImages?.[0] ?? product.productImage;

                return (
                    <Card
                        key={product._id}
                        className="max-w-xs w-full rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col bg-black"
                    >
                        <CardContent className="p-4 flex flex-col flex-grow text-white">
                            <div className="relative rounded-lg overflow-hidden bg-gray-800 shadow-sm">
                                <AspectRatio ratio={4 / 3}>
                                    <div className="relative w-full h-full">
                                        <img
                                            src={product.productImage}
                                            alt={product.productName}
                                            className="object-cover w-full h-full absolute top-0 left-0 transition-opacity duration-500 ease-in-out"
                                            loading="lazy"
                                        />
                                        <img
                                            src={hoverImage}
                                            alt={`${product.productName} alternate`}
                                            className="object-cover w-full h-full absolute top-0 left-0 opacity-0 hover:opacity-100 transition-opacity duration-500 ease-in-out"
                                            loading="lazy"
                                        />
                                    </div>
                                </AspectRatio>
                            </div>
                            <div className="mt-4 flex-grow flex flex-col">
                                <h3 className="text-base font-semibold text-white line-clamp-2">{product.productName}</h3>
                                <p className="text-sm text-gray-300 mt-1 line-clamp-2 flex-grow">{product.productDesc}</p>
                                <p className="text-sm text-gray-500 line-through">₹{product.realPrice}</p>
                                <p className="mt-1 text-lg font-bold text-indigo-400">₹{product.discountPrice}</p>
                            </div>
                        </CardContent>
                        <CardFooter className="px-4 pb-4 pt-0 flex justify-center">
                            {counter === 0 ? (
                                <button
                                    className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 transition duration-200"
                                    onClick={() => addToCart(product._id, 1)}
                                    aria-label={`Add ${product.productName} to cart`}
                                >
                                    Add to Cart
                                </button>
                            ) : (
                                <div className="flex items-center gap-3 border border-indigo-600 rounded-lg px-3 py-1 bg-gray-900">
                                    <button
                                        className="text-white font-bold text-xl focus:outline-none hover:bg-indigo-700 rounded transition p-1"
                                        onClick={() => addToCart(product._id, -1)}
                                        aria-label={`Decrease quantity of ${product.productName}`}
                                    >
                                        &minus;
                                    </button>
                                    <span className="min-w-[24px] text-center font-semibold text-white">{counter}</span>
                                    <button
                                        className="text-white font-bold text-xl focus:outline-none hover:bg-indigo-700 rounded transition p-1"
                                        onClick={() => addToCart(product._id, 1)}
                                        aria-label={`Increase quantity of ${product.productName}`}
                                    >
                                        &#43;
                                    </button>
                                </div>
                            )}
                        </CardFooter>
                    </Card>
                );
            })}
        </>




    )
}
