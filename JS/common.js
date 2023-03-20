// ------ MENU ------
const sideMenu = document.querySelector(".side-menu");
const menuBtn = document.querySelector(".menu-button");
const menuCloseBtn = document.querySelector(".close-button");
const numberCartItems = document.querySelector('.cart-items');
let cartItemNum = JSON.parse(localStorage.getItem("cartItemNum")) || 0;

if (cartItemNum !== 0) {
    numberCartItems.textContent = cartItemNum;
} 

// ------ EVENT LISTENERS
menuBtn.addEventListener("click", openMenu);
menuCloseBtn.addEventListener("click", closeMenu);


function openMenu() {
    if (cartSidebar.classList.contains("show")) {
        cartSidebar.classList.remove("show");
    }
    sideMenu.classList.add("active");
}


function closeMenu() {
    sideMenu.classList.remove("active");
}



// ------ CART ------
const cartBtn = document.querySelector('.cart-btn');
const cartSidebar = document.querySelector('.cart-sidebar');
const cartRemoveAll = document.querySelector('.cart-remove-all-button');
const cartCloseBtn = document.querySelector('.cart-close-button');
const cartItemsContainer = document.querySelector('.cart-items-container');
const checkoutBtn = document.querySelector('.cart-checkout-button');
const cartTotalPrice = document.querySelector('.cart-total-price');
const infoDiv = document.querySelector('.info-message');
const infoText = document.querySelector('.message-text');
let basket = JSON.parse(localStorage.getItem("basket"))  || [];
let totalPrice = JSON.parse(localStorage.getItem("totalPrice")) || 0;

// ------ EVENT LISTENERS
cartRemoveAll.addEventListener("click", clearCart)

cartBtn.addEventListener('click', () => {
    if (sideMenu.classList.contains("active")) {
        sideMenu.classList.remove("active");
    }
    cartSidebar.classList.add('show');
});

cartCloseBtn.addEventListener('click', () => {
    cartSidebar.classList.remove('show');
});

checkoutBtn.addEventListener("click", () => {
    if (basket.length > 0) {
        checkoutClick()
    } else {
        const message = "Please add some items to the cart before checking out.";
        infoMessage(message, "fail");
    }
})

// ------ METHODS

updateBasket()

// updating product backet
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

            // storing item count in cart value
            localStorage.setItem("cartItemNum", cartItemCount - 1);
            // storing basket products
            localStorage.setItem("basket", JSON.stringify(basket));

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

    // storing item count in cart value
    localStorage.setItem("cartItemNum", 0);
    // storing basket products
    localStorage.setItem("basket", null);

}

// clearing and closing basket
function checkoutClick() {
    clearCart();
    cartSidebar.classList.remove('show');
    infoMessage("Purchase was successful!", "success");

    // storing item count in cart value
    localStorage.setItem("cartItemNum", 0);
    // storing basket products
    localStorage.setItem("basket", null);
}

// updating cart price
function updateCartPrice() {
    totalPrice = basket.reduce((acc, product) => {
        return acc + product.price;
    }, 0);

    cartTotalPrice.textContent = '£' + totalPrice.toFixed(2);
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
