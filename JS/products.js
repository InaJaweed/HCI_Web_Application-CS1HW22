// -------- PRODUCT PAGE ---------
const productsParent = document.querySelector('.all-products');
const categories = document.querySelector(".categories");
const products = data.products;
const filters = [];

// ------ EVENT LISTENERS
categories.addEventListener("click", addFilter)


// Displaying products on screen load
displayProducts();

// adding a filter for the products
function addFilter(event) {
    removeProducts();
    const isCategoryBtn = event.target.classList.contains('category');
    const category = event.target.textContent.toLowerCase().replace(/\s+|&/g, '');

    if (isCategoryBtn) {
        if (!filters.includes(category)) {
            filters.push(category);
            event.target.classList.add("pressed");
        } else {
            filters.splice(filters.indexOf(category), 1);
            event.target.classList.remove("pressed");
        }
    }
    displayProducts();
}

// rendering products on the product page
function displayProducts() {
    products.forEach(product => {
        if (filters.length === 0 || product.category.some(c => filters.includes(c.toLowerCase().replace(/\s+|&/g, '')))) {
            const productOuterBox = document.createElement("div");
            const productInnerBox = document.createElement("img");
            const productName = document.createElement("p");
            const productPrice = document.createElement("p");
            const addToCartBtn = document.createElement("button");
            // const productDesc = document.createElement("p");
            productsParent.appendChild(productOuterBox);
            productOuterBox.appendChild(productInnerBox);
            productOuterBox.appendChild(productName);
            productOuterBox.appendChild(productPrice);
            productOuterBox.appendChild(addToCartBtn);

            productOuterBox.classList.add("product-outer-box");
            productInnerBox.classList.add("product-inner-box");
            productPrice.classList.add("product-price");
            addToCartBtn.classList.add("add-to-cart");
            productInnerBox.src = "../images_products/" + product.image;
            productName.textContent = product.name;
            productPrice.textContent = "£" + product.price;
            addToCartBtn.textContent = "Add to Basket";

            addToCartBtn.addEventListener('click', () => {
                const selectedProduct = {
                    id: product.id,
                    name: product.name,
                    price: product.price
                };
                basket.push(selectedProduct);
                updateBasket();
                const cartItemCount = parseInt(numberCartItems.textContent);
                numberCartItems.textContent = cartItemCount + 1;
                // storing item count in cart value
                localStorage.setItem("cartItemNum", cartItemCount + 1);
                // storing basket products
                localStorage.setItem("basket", JSON.stringify(basket));

                // Show success message
                // const successMsg = document.createElement('div');
                // successMsg.classList.add('success-msg');
                // successMsg.textContent = `${product.name} added to cart!`;
                // productOuterBox.appendChild(successMsg);
                // setTimeout(() => {
                //     successMsg.remove();
                // }, 2000);
            });

        }
    });
}

function removeProducts() {
    productsParent.innerHTML = "";
}
