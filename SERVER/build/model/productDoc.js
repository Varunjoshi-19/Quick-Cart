"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    productName: {
        type: String,
        required: true
    },
    productPrice: {
        type: String,
        required: true
    },
    productDesc: {
        type: String
    },
    productImage: {
        data: Buffer,
        contentType: String
    },
    productCategory: {
        type: String,
        required: true
    },
    relaventImages: [
        {
            data: Buffer,
            contentType: String
        }
    ],
    AdditionalInfo: {
        type: mongoose_1.Schema.Types.Mixed,
        default: {},
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Products", ProductSchema);
