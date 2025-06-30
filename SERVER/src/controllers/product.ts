import { Request, Response } from "express";
import { ProductService } from "../services/product-services";


export function addNewProduct(req: Request, res: Response) {
     ProductService.handleAddNewProduct(req, res)
}




