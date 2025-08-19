import { Request, Response } from "express";
import { ProductService } from "../services/product-services";


export function addNewProduct(req: Request, res: Response) {
     ProductService.handleAddNewProduct(req, res)
}


export function getOrders(req : Request , res : Response) {
     ProductService.handleGetOrder(req, res)
      
}


export function getAllProducts(req : Request , res : Response) { 
     ProductService.fetchProducts(req , res);
}


