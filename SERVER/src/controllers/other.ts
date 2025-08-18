import { Request, Response } from "express";
import otherServices from "../services/otherServices";


export function renderImage(req: Request, res: Response) {
     otherServices.renderImage(req, res);
}

export function renderProduct(req: Request, res: Response) {
     otherServices.renderProductImage(req, res);
}


export function handleOrderPayment(req: Request, res: Response) {
     otherServices.orderPayment(req, res);
}

export function handlePaymentVerify(req: Request, res: Response) {
     otherServices.paymentVerification(req, res);
}