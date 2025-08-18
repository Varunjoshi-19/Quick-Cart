const existingItems = [{
  FASHION: ["MEN", "WOMEN"],
  ELECTRONICS: ["MOBILES", "LAPTOPS", "SMART WATCH ACCESSORIES", "CAMERAS"],
  FOOTWEAR: ["MEN FOOTWEAR", "WOMEN FOOTWEAR"],
  BEAUTY: ["EYELINER", "MASCARA", "ROLLER"],
  BAGS: ["MEN BAGS", "WOMEN BAGS"],
  WELLNESS: ["ALMOND", "BEANS"],
  GROCERIES: ["TAMATO", "ONIONS", "AVACADO"]
}];

function getProduct(key) {


  let productlist = {};
  const [value] = existingItems.map(item => {
    return Object.entries(item).find(([category, list]) => {
      console.log("run times");
      if (category == key) {
        productlist = list;
        return item;
      }
      return null;


    })

  })


  console.log(value)
}



const productList = [

  {
    id: 1,
    produtctName: "tv",
    price: 12000,
    quantity: 0
  },

  {
    id: 2,
    produtctName: "mobile",
    price: 15000,
    quantity: 0
  },
  {
    id: 3,
    produtctName: "washing machine",
    price: 5000,
    quantity: 0
  },
  {
    id: 4,
    produtctName: "computer",
    price: 23000,
    quantity: 0
  }


];


function addToCartProduct(count, productId) {

  let i = 0;
  const updatedProduct = productList.find(product => {

    if (product.id == productId) {
      product.quantity += count;
      return product;  // only stop the iteration if it find the turthy value.
    }
    console.log(`in ${i++} iteration not found`);
    return null;


  })

  console.log(updatedProduct);

}




addToCartProduct(2, 3);
// addToCartProduct(-1, 2);
// addToCartProduct(3, 2);


// getProduct("FASHION");