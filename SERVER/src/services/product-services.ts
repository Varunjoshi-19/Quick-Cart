import { ProductPayloadType } from "../utils/interfaces";
import { Response, Request } from "express";
import productDoc from "../model/productDoc";

export class ProductService {


     public static async handleAddNewProduct(req: Request, res: Response) {

          const { productName, productPrice, productDesc, productCategory, AdditionalInfo } = req.body;
          const imagefile = req.file;

          if (!productName || !productPrice || !imagefile) {
               res.status(404).json({ error: "failed to upload missing info" });
               return;
          }

          const query: ProductPayloadType = {
               productName,
               productPrice,
               productCategory,
               productImage: {
                    data: imagefile.buffer,
                    contentType: imagefile.mimetype
               }

          }

          if (productDesc) query.productDesc = productDesc;

          if (AdditionalInfo) {
               const parsedInfo = JSON.parse(AdditionalInfo);
               query.AdditionalInfo = parsedInfo;
          }



          try {
               const product: any = await productDoc.create(query);
               if (!product || product == "") {
                    res.status(404).json({ error: "failed to add product" });
                    return;
               }

               res.status(202).json({ message: "Your Product Added Successfully" });
          }
          catch (error) {
               res.status(505).json({ error: "Internal issue failed to add" });
          }





     }

     public static async fetchProducts(req: Request, res: Response) {

          try {
               const products = await productDoc.find({});
               if (!products) {
                    res.status(404).json({ errorMessage: "no products avaiable" });
                    return;
               }

               res.status(200).json({ products });
          }
          catch (error) {
               console.error(error);
          }
     }





}


