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


  const values = existingItems.map((item) => {
    const matchingItem = Object.entries(item).find(([category, value]) => category === key);
    return matchingItem ? matchingItem[1] : null;
  }).filter(item => item !== null);

  console.log(values[0]);
}




ProductCategoryItem();
// getProduct("FASHION");