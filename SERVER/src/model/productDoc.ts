import { validate } from "graphql";
import { Schema, model } from "mongoose"
import { buffer } from "stream/consumers";


const ProductSchema = new Schema({

     productName: {
          type: String,
          required: true
     },
     productPrice: {
          type: Number,
          required: true
     },
     productDesc: {
          type: String
     },
     productImage: {
          data: {
               type: Buffer,
               required: true,
          },
          contentType: {
               type: String,
               required: true
          }
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
          type: Schema.Types.Mixed,
          default: {},

     }


}, { timestamps: true });



export default model("Products", ProductSchema);