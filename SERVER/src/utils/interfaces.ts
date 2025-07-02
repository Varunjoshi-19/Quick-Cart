export interface UserProps {
    name: string;
    email: string;
    phone?: string;
    password: string;
    salt: string;

}

export interface updateProfileProps {
    
name? : string;
phone?  : string;
imageData? : Buffer;
}


export interface ProductPayloadType {
    productName: string;
    productPrice: string;
    productImage: {
         data : Buffer,
         contentType : string;
    };
    productCategory : string;
    productDesc?: string;
    AdditionalInfo?: JSON;

}


export interface ProductType {
  productImage: Buffer;
  contentType: string;
}