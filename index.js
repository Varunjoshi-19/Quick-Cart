function getProduct(key) {
    const existingItems = [{
      FASHION: ["MEN", "WOMEN"],
      ELECTRONIC: ["MOBILES", "LAPTOPS", "SMART WATCH ACCESSORIES", "CAMERAS"],
      FOOTWEAR: ["MEN FOOTWEAR", "WOMEN FOOTWEAR"],
      BEAUTY: [],
      BAGS: ["MEN BAGS", "WOMEN BAGS"],
      WELLNESS: [],
      GROCERIES: []
    }];
    
    
    const values = existingItems.map((item) => {
      const matchingItem = Object.entries(item).find(([category, value]) => category === key);
      return matchingItem ? matchingItem[1] : null; 
    }).filter(item => item !== null); 
    
    console.log(values[0]);
  }
  
  getProduct("FASHION");
  