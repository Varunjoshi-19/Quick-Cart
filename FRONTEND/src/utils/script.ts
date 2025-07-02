
export function SlideToTop() {


    window.scrollTo({

        top: 0,
        left: 0,
        behavior: "smooth"
    })

}



export function loadProductsFromLocalStorage() {
        const storedProducts = localStorage.getItem("cartItems");
        if (storedProducts) {
            const parsedStoredProduct = JSON.parse(storedProducts);
           return parsedStoredProduct;
        }

        return null;


    }

