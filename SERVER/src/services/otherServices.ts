import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import fileType from "file-type";
import productDoc from "../model/productDoc";
import Razorpay from "razorpay";
import crypto from "crypto";

class OtherServices {

    #prisma = new PrismaClient();

    #razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET_KEY
    })


    async paymentVerification(req: Request, res: Response) {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

        const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET_KEY!);
        hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
        const generated_signature = hmac.digest("hex");

        if (generated_signature !== razorpay_signature) {
            res.status(404).json({ errorMessage: "payment verification failed!" });
            return;
        }

        res.status(200).json({ message: "payment verified and successful" });
        return;
    }

    async orderPayment(req: Request, res: Response) {

        const { amount, currency } = req.body;
        console.log(amount, currency);

        const options = {
            amount: amount * 100,
            currency: currency || 'INR',
            receipt: `order_rcptid_${Date.now()}`
        }

        try {
            const order = await this.#razorpay.orders.create(options);
            console.log("order id", order.id);
            res.json(order);
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Error creating order");
        }
    }

    async renderImage(req: Request, res: Response) {
        const { userId } = req.params;
        if (!userId) {
            res.status(400).json({ errorMessage: "Missing userId" });
            return
        }

        try {
            const user = await this.#prisma.user.findUnique({
                where: { id: userId },
                select: { imageData: true }
            });

            if (!user || !user.imageData) {
                res.status(404).json({ errorMessage: "User image not found" });
                return;
            }

            // Detect content type dynamically from the buffer
            const type = await fileType.fromBuffer(user.imageData);
            if (!type) {
                res.status(415).json({ errorMessage: "Unsupported image type" });
                return;
            }

            res.setHeader("Content-Type", type.mime);
            res.setHeader("Cache-Control", "no-store");
            res.end(user.imageData);

        } catch (error) {
            res.status(500).json({ errorMessage: "Failed to render image" });
        }
    }

    async renderProductImage(req: Request, res: Response) {
        const { productId } = req.params;

        if (!productId) {
            res.status(400).json({ errorMessage: "Missing productId" });
            return;
        }

        try {
            const product = await productDoc
                .findById(productId)
                .select("productImage")
                .exec();

            if (!product || !product.productImage || !product.productImage.data) {
                res.status(404).json({ errorMessage: "Product image not found" });
                return;
            }

            res.setHeader("Content-Type", product.productImage.contentType);
            res.setHeader("Cache-Control", "no-store");
            res.end(product.productImage.data);
        } catch (error) {
            res.status(500).json({ errorMessage: `Failed to render image: ${error}` });
        }
    }


    async saveOrder(req: Request, res: Response) {
        const { orderId, paymentId, userName, productName, totalAmount, address } = req.body;
         console.log("new order to save" , req.body);
        if (!orderId || !paymentId || !userName || !productName || !totalAmount || !address) {
            res.status(400).json({ errorMessage: "Missing required order details" });
            return;
        }

        try {
            const newOrder = await this.#prisma.order.create({
                data: {
                    orderId,
                    paymentId,
                    userName,
                    productName,
                    totalAmount,
                    address
                }
            });

            res.status(201).json(newOrder);
        } catch (error) {
            console.error("Error saving order:", error);
            res.status(500).json({ errorMessage: "Failed to save order" });
        }
    }


}

export default new OtherServices;