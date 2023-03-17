// -------- PRODUCT PAGE ---------
const productsParent = document.querySelector('.all-products');
const categories = document.querySelector(".categories");
const cartSidebar = document.querySelector('.cart-sidebar');
const cartCloseBtn = document.querySelector('.cart-close-button');
const cartRemoveAll = document.querySelector('.cart-remove-all-button');
const products = data.products;
const filters = [];

// ----------- CART --------------
const cartItemsContainer = document.querySelector('.cart-items-container');
const numberCartItems = document.querySelector('.cart-items');
const checkoutBtn = document.querySelector('.cart-checkout-button');
const cartTotalPrice = document.querySelector('.cart-total-price');
const infoDiv = document.querySelector('.info-message');
const infoText = document.querySelector('.message-text');

let basket = [];
let totalPrice = 0;

// event listeners for categories and cart buttons
categories.addEventListener("click", addFilter)
cartRemoveAll.addEventListener("click", clearCart)
checkoutBtn.addEventListener("click", () => {
    if (basket.length > 0) {
        checkoutClick()
    } else {
        const message = "Please add some items to the cart before checking out.";
        infoMessage(message, "fail");
    }
})

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

cartCloseBtn.addEventListener('click', () => {
    cartSidebar.classList.remove('show');
});

// /* ------------- CART ------------*/

function updateBasket() {
    // Remove existing html cart items
    cartItemsContainer.innerHTML = '';

    // Add each product in the cart to the cart items container
    basket.forEach(product => {
        const cartItem = document.createElement('div');
        const infoDiv = document.createElement('div');
        const buttonDiv = document.createElement('div');
        const cartItemName = document.createElement('p');
        const cartItemPrice = document.createElement('p');
        const cartItemRemoveBtn = document.createElement('button');

        cartItem.classList.add('cart-item');
        infoDiv.classList.add('cart-item-info');
        cartItemPrice.classList.add('item-price');
        cartItemName.textContent = product.name;
        cartItemPrice.textContent = '£' + product.price;
        cartItemRemoveBtn.innerHTML = '&times;';
        cartItemRemoveBtn.classList.add('cart-item-remove');

        cartItem.appendChild(infoDiv);
        cartItem.appendChild(buttonDiv);
        infoDiv.appendChild(cartItemName);
        infoDiv.appendChild(cartItemPrice);
        buttonDiv.appendChild(cartItemRemoveBtn);

        cartItemsContainer.appendChild(cartItem);

        // Event listener for remove button
        cartItemRemoveBtn.addEventListener("click", () => {
            basket = basket.filter(item => item !== product);
            const cartItemCount = parseInt(numberCartItems.textContent);
            numberCartItems.textContent = cartItemCount - 1;
            updateBasket();
        })
    });

    // updating the cart price
    updateCartPrice();
}

// clear the whole basket
function clearCart() {
    basket = [];
    cartItemsContainer.innerHTML = '';
    numberCartItems.textContent = 0;
    totalPrice = 0;
    cartTotalPrice.textContent = '£' + totalPrice.toFixed(2);
}

// updating cart price
function updateCartPrice() {
    totalPrice = basket.reduce((acc, product) => {
        return acc + product.price;
    }, 0);

    cartTotalPrice.textContent = '£' + totalPrice.toFixed(2);
}

function checkoutClick() {
    clearCart();
    cartSidebar.classList.remove('show');
    infoMessage("Purchase was successful!", "success");
}

function infoMessage(messageText, type) {
    infoText.textContent = messageText;
    infoDiv.classList.add("active");
    
    infoDiv.classList.add(`${type === 'fail' ? 'fail' : 'success'}`);
    
    // keeping the notification for 2 seconds
    setTimeout(() => {    
        infoDiv.classList.remove("active");
    }, 2000);
    setTimeout(() => {    
        infoDiv.classList.remove(`${type === 'fail' ? 'fail' : 'success'}`);
        infoText.textContent = "";
    }, 2200);

}
