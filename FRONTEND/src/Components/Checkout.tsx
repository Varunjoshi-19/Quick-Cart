import { Card, CardContent, CardHeader, CardTitle } from "../comp/components/ui/card";;
import { Button } from "../comp/components/ui/button";
import { useCartItemContext } from "../hooks/ItemContext";
import { useEffect, useState } from "react";
import { computeTheTotalAmount, fetchLocation, loadRazorpayScript, RazorPayPaymentVerification } from "../utils/script";
import { BACKEND_URL } from "../utils/getData";
import { useUserAuthContext } from "../hooks/UserContext";
import SlideMessage from "../small-components/Toaster";
import Preloader from "../small-components/PreLoader";
import { useNavigate } from "react-router-dom";
import { ACTIONS, OrderPlacePayload } from "../utils/interfaces";

const Checkout = () => {

    const { productItems, dispatch } = useCartItemContext();
    const { user } = useUserAuthContext();
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const navigate = useNavigate();

    const [fullName, setFullName] = useState<string>("");
    const [mobileNumber, setMobileNumber] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [state, setState] = useState<string>("");
    const [pincode, setPincode] = useState<string>("");
    const [paymentVerifiedAndDone, setPaymentVerifiedAndDone] = useState<boolean>(false);




    const [location, setLocation] = useState<string>("");
    const [addAddress, setAddAddress] = useState<boolean>(false);
    const [proceedToBuyEnable, setProceedToBuyEnable] = useState<boolean>(true);



    const [showMain, setShowMain] = useState<boolean>(false);


    useEffect(() => {
        const timer = setTimeout(() => {
            setShowMain(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);


    useEffect(() => {

        async function getCurrentLocation() {
            const countryName: string = await fetchLocation();
            setLocation(countryName);
        }

        const amount = computeTheTotalAmount(productItems);
        setTotalAmount(amount);
        getCurrentLocation();

    }, [productItems])


    async function handleSaveAddressAndProceed(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const deliveryAddress = {
            fullname: fullName,
            mobileNumber: mobileNumber,
            address: address,
            city: city,
            state: state,
            pincode: pincode
        };

        localStorage.setItem("delivery-address", JSON.stringify(deliveryAddress));

        const res = await loadRazorpayScript();

        if (!res) {
            alert("Razorpay SDK failed to load. Check your internet.");
            return;
        }


        const orderId = await RazorPayPaymentVerification({ amount: totalAmount, currency: "INR" });



        const options = {
            key: "rzp_test_3qqqECAjUfQGIo",
            amount: totalAmount,
            currency: "INR",
            order_id: orderId,
            name: user?.name,
            description: "Order Payment",
            handler: async function (response: any) {



                const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

                // const orderDetailsData :OrderPlacePayload = {
                //     orderId : razorpay_order_id,
                //     paymentId : razorpay_payment_id,
                //     userName : user?.name || "",
                //     productName : 
                // }

                // TODO : create order and save into the database .

                const res = await fetch(`${BACKEND_URL}/api/payment/verify`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ razorpay_payment_id, razorpay_order_id, razorpay_signature })
                });
                if (res.ok) {
                    console.log("payment verified done");
                    setPaymentVerifiedAndDone(true);
                    // await handleSavePlacedOrder();
                    dispatch({ type: ACTIONS.SET_SELECTED_PRODUCTS, payload: null });
                    localStorage.removeItem("cartItems");
                    return;
                }
                if (!res.ok) {
                    navigate("/cart");
                    setPaymentVerifiedAndDone(false);
                    return;
                }
            },


            prefill: {
                name: user?.name,
                email: user?.email,
                contact: mobileNumber
            },
            theme: {
                color: "#3399cc"
            }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();




    }



    function setPhoneNumberLogic(e: React.ChangeEvent<HTMLInputElement>) {
        const number = e.target.value;
        let newNumber = number;
        if (isNaN(Number(newNumber))) return;
        if (number.startsWith('0')) {
            newNumber = "";
            for (let i = 0; i < number.length; i++) {
                if (number[i] == '0') continue;
                else {
                    newNumber += number[i];

                }
            }
        }

        if (newNumber.length > 10) return;
        setMobileNumber(newNumber)
    }

    const restAllDetails = () => {
        setAddAddress(false);
        setProceedToBuyEnable(true);
        setFullName("");
        setAddress("");
        setCity("");
        setMobileNumber("");
        setState("");
        setPincode("");
    }


    useEffect(() => {
        if (paymentVerifiedAndDone) {
            const timeoutId = setTimeout(() => {

                setPaymentVerifiedAndDone(false);

                navigate("/orders");
                return () => clearTimeout(timeoutId);
            }, 5000);
        }
    }, [paymentVerifiedAndDone]);


    if (!showMain || !productItems || !user) {
        return <Preloader />
    }

    return (

        <>

            {paymentVerifiedAndDone &&
                <>
                    <SlideMessage message="Your Order has been placed Successfully" />
                    <Preloader />
                </>
            }


            {
                proceedToBuyEnable &&

                <div style={{
                    height: "100vh", width: "100vw", display: "flex", alignSelf: 'center'
                    , justifyContent: 'center', alignItems: "center"

                }}>

                    <Card className="w-full max-w-md mx-auto shadow-lg rounded-2xl p-4">
                        <CardHeader>
                            <CardTitle className="text-xl">Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div className="flex justify-between">
                                <span>Items:</span>
                                <span>{productItems.length || '--'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery:</span>
                                <span>{location}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Total:</span>
                                <span>₹{totalAmount || '--'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Promotion Applied:</span>
                                <span>--</span>
                            </div>
                            <div className="flex justify-between font-semibold text-base border-t pt-4">
                                <span>Order Total:</span>
                                <span className="text-green-600">₹{totalAmount || 0}</span>
                            </div>
                            <Button  variant="my-variant" className="w-full mt-4"
                                onClick={() => {
                                    setProceedToBuyEnable(false);
                                    setAddAddress(true);
                                }}
                            >Proceed to Buy</Button>
                        </CardContent>
                    </Card>
                </div>
            }

            {
                addAddress &&

                <div style={{
                    color: "black",
                    height: "100vh", width: "100vw", display: "flex", alignSelf: 'center',
                    justifyContent: 'center', alignItems: "center", background: "#181A1B"
                }}>
                    <Card className="w-full max-w-lg mx-auto shadow-2xl rounded-2xl p-6 bg-white">
                        <CardHeader>
                            <CardTitle className="text-2xl text-blue-700">Add Delivery Address</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-5" onSubmit={handleSaveAddressAndProceed}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                                    <input
                                        type="tel"
                                        value={mobileNumber}
                                        onChange={setPhoneNumberLogic}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="Enter your mobile number"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                    <textarea
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize:none" placeholder="Flat, House no., Building, Company, Apartment"
                                        rows={3}
                                        required
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        style={{ resize: "none" }}



                                    />
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                        <input
                                            type="text"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}

                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="City"
                                            required
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                        <input
                                            type="text"
                                            value={state}
                                            onChange={(e) => setState(e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="State"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                                    <input
                                        type="text"
                                        value={pincode}
                                        onChange={(e) => {
                                            if (isNaN(Number(e.target.value))) return;
                                            if (e.target.value.length > 10) return;
                                            setPincode(e.target.value)
                                        }}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="Pincode"
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition">
                                    Save Address & Continue
                                </Button>
                                <Button
                                    className="w-full bg-black hover:bg-[#C10537] text-white font-semibold py-2 rounded-lg transition"
                                    onClick={restAllDetails}
                                >
                                    Cancel
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>



            }



        </>
    );
};

export default Checkout;
