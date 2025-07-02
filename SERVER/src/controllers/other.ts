import { Request, Response } from "express";
import otherServices from "../services/otherServices";


export function renderImage(req : Request , res : Response) { 
otherServices.renderImage(req , res);
}

export function renderProduct(req : Request , res : Response) {
     otherServices.renderProductImage(req ,res);
}