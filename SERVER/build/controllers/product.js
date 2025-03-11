"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productDoc_1 = __importDefault(require("../model/productDoc"));
class Product {
    static handleAddNewProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { productName, productPrice, productDesc, productCategory, AdditionalInfo } = req.body;
            const imagefile = req.file;
            if (!productName || !productPrice || !imagefile) {
                res.status(404).json({ error: "failed to upload missing info" });
                return;
            }
            const query = {
                productName,
                productPrice,
                productCategory,
                productImage: {
                    data: imagefile.buffer,
                    contentType: imagefile.mimetype
                }
            };
            if (productDesc)
                query.productDesc = productDesc;
            if (AdditionalInfo) {
                const parsedInfo = JSON.parse(AdditionalInfo);
                query.AdditionalInfo = parsedInfo;
            }
            try {
                const product = yield productDoc_1.default.create(query);
                if (!product || product == "") {
                    res.status(404).json({ error: "failed to add product" });
                    return;
                }
                res.status(202).json({ message: "Your Product Added Successfully" });
            }
            catch (error) {
                res.status(505).json({ error: "Internal issue failed to add" });
            }
            res.json({ message: "upload info" });
        });
    }
}
exports.default = Product;
