import express from "express";
import { handleOrderPayment, handlePaymentVerify, renderImage, renderProduct } from "../controllers/other";
const router = express.Router();

router.post("/payment/verify", handlePaymentVerify);
router.get("/render/img/:userId", renderImage);
router.get("/render/productImage/:productId", renderProduct);
router.post("/order/payment/:paymentId", handleOrderPayment);




export default router;