import { product1 } from "./glide.js";

let cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

function addToCart(products) {
  const cartItems = document.querySelector(".header-cart-count");
  const buttons = [...document.getElementsByClassName("add-to-cart")];
  buttons.forEach((button) => {
    const inCart = cart.find((item) => item.id === Number(button.dataset.id));
    if (inCart) {
      button.setAttribute("disabled", "disabled");
    } else {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        const id = e.target.dataset.id;
        const findProduct = products.find(
          (product) => product.id === Number(id)
        );
        cart.push({ ...findProduct, quantity: 1 });
        localStorage.setItem("cart", JSON.stringify(cart));
        button.setAttribute("disabled", "disabled");
        cartItems.innerHTML = cart.length;
      });
    }
  });
}

function productRoute() {
  const productLink = document.getElementsByClassName("product-link");
  Array.from(productLink).forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const id = e.target.dataset.id;
      localStorage.setItem("productId", JSON.stringify(id));
      window.location.href = "single-product.html";
    });
  });
}

function productsFunc(products) {
  const productsContainer = document.getElementById("product-list");

  let results = "";
  products.forEach((item) => {
    results += `
    <li class="product-item glide__slide">
      <div class="product-image">
        <a href="#">
          <img src=${item.img.singleImage} class="img1" alt="" />
          <img src=${item.img.thumbs[1]} class="img2" alt="" />
        </a>
      </div>
      <div class="product-info">
        <a href="#" class="product-title">${item.name}</a>
        <div class="product-prices">
          <strong>${item.price.newPrice.toFixed(2)}₺</strong>
          <span>${item.price.oldPrice.toFixed(2)}₺</span>
        </div>
        <span class="product-discount">-${item.discount}%</span>
        <div class="product-links">
          <button class="add-to-cart" data-id=${item.id}>
            <i class="bi bi-basket2-fill"></i>
          </button>
          <button>
            <i class="bi bi-heart-fill"></i>
          </button>
          <a href="#" class="product-link" data-id=${item.id}>
            <i class="bi bi-eye-fill"></i>
          </a>
        </div>
      </div>
    </li>
  `;
  productsContainer ? (productsContainer.innerHTML = results) : "";
  addToCart(products);
  });
  product1();
  productRoute();
}

export default productsFunc;