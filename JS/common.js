const sideMenu = document.querySelector(".side-menu");
const menuBtn = document.querySelector(".menu-button");
const cartBtn = document.querySelector('.cart-btn');
const menuCloseBtn = document.querySelector(".close-button");

menuBtn.addEventListener("click", openMenu);
menuCloseBtn.addEventListener("click", closeMenu);

function openMenu() {
    sideMenu.classList.add("active");
}

cartBtn.addEventListener('click', () => {
    cartSidebar.classList.add('show');
});

function closeMenu() {
    sideMenu.classList.remove("active");
}
