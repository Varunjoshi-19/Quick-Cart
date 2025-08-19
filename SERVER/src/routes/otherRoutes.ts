import express from "express";
import { handleOrderPayment, handlePaymentVerify, handleSaveOrder, renderImage, renderProduct } from "../controllers/other";
const router = express.Router();

router.post("/payment/verify", handlePaymentVerify);
router.get("/render/img/:userId", renderImage);
router.get("/render/productImage/:productId", renderProduct);
router.post("/order/payment/:paymentId", handleOrderPayment);
router.post("/orders/place-order", handleSaveOrder);



export default router;