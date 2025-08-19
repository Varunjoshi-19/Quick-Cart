import fashionImg from "../assets/fashion.png";
import footwear from "../assets/footwear.png";
import electronic from "../assets/electronic.png";
import beauty from "../assets/beauty.png";
import groceries from "../assets/groceries.png";
import wellness from "../assets/wellness.png";
import bag from "../assets/bag.png";

import banner1 from "../assets/1.jpg";
import banner2 from "../assets/2.jpg";
import banner3 from "../assets/3.jpg";
import banner4 from "../assets/4.jpg";
import banner5 from "../assets/5.jpg";
import banner6 from "../assets/6.jpg";


import saleImage1 from "../assets/laptopSale.jpg";
import saleImage2 from "../assets/grocerySale.jpg";


import shirtImage from "../assets/shirt.svg";
import discountImage from "../assets/discount.svg";
import vehicleImage from "../assets/vehicle.svg";
import priceImage from "../assets/price.svg";
import offer1 from "../assets/offer1.png";
import offer2 from "../assets/offer2.png";
import offer3 from "../assets/offer3.png";
import offer4 from "../assets/offer4.png";
import offer6 from "../assets/offer6.png";
import offer7 from "../assets/offer7.png";
import offer8 from "../assets/offer8.png";



export const Images = [

    {
        src: fashionImg,
        name: "FASHION",
        backgroundColor: "#103E00",
        isSelected: true
    },
    {
        src: footwear,
        name: "FOOTWEAR",
        backgroundColor: "#3D1203",
        isSelected: false
    },
    {
        src: electronic,
        name: "ELECTRONICS",
        backgroundColor: "#34003C",
        isSelected: false
    },
    {
        src: beauty,
        name: "BEAUTY",
        backgroundColor: "#212425",
        isSelected: false
    },
    {
        src: groceries,
        name: "GROCERIES",
        backgroundColor: "#41002D",
        isSelected: false
    },
    {
        src: bag,
        name: "BAG",
        backgroundColor: "#0C443B",
        isSelected: false
    },
    {
        src: wellness,
        name: "WELLNESS",
        backgroundColor: "#3A003A",
        isSelected: false
    },



]

export const OFFERS = [offer1, offer2, offer3, offer4];
export const OFFERS2 = [offer6, offer7, offer8];

export const BannerImages = [banner1, banner2, banner3, banner4, banner5, banner6];

export const SalesImages = [saleImage1, saleImage2];


export const SvgImages = [

    {

        src: shirtImage,
        content: "Everyday fresh Products",

    },
    {

        src: vehicleImage,
        content: "Free delivery for order over 159rs",

    },
    {

        src: discountImage,
        content: "Daily Mega Discount",

    },
    {

        src: priceImage,
        content: "Best price in the market"

    }

];

const existingItems = [{
    FASHION: ["MEN", "WOMEN"],
    ELECTRONICS: ["MOBILES", "LAPTOPS", "SMART WATCH ACCESSORIES", "CAMERAS"],
    FOOTWEAR: ["MEN FOOTWEAR", "WOMEN FOOTWEAR"],
    BEAUTY: ["EYELINER", "MASCARA", "ROLLER"],
    BAGS: ["MEN BAGS", "WOMEN BAGS"],
    WELLNESS: ["ALMOND", "BEANS"],
    GROCERIES: ["TAMATO", "ONIONS", "AVACADO"]
}];

export function CurrentHoverItemList(key: string) {

    const values = existingItems.map((item) => {
        const matchingItem = Object.entries(item).find(([category]) => category === key);
        return matchingItem ? matchingItem[1] : null;
    }).filter(item => item !== null);

    return values[0];

}

export function ProductCategoryItem(): string[] {

    const items = existingItems.map((item) => {

        return Object.entries(item).map((each) => {

            return each[1];
        })

    })

    let eachItems: string[] = [];

    items.map(item => {
        item.map(underItem => {

            underItem.map(singleItem => {
                eachItems.push(singleItem);
            })

        })
    })

    return eachItems;


}


