let cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

function displayCartProduct() {
  const cartWrapper = document.querySelector(".cart-wrapper");
  let result = "";
  cart.forEach((item) => {
    result += `
   <tr class="cart-item">
    <td class="cart-image">
        <img src=${item.img.singleImage} alt="">
        <i class="bi bi-x delete-cart" data-id=${item.id}></i>
    </td>
    <td>${item.name}</td>
    <td>${item.price.oldPrice.toFixed(2)}</td>
    <td class="product-quantity">${item.quantity}</td>
    <td class="product-subtotal">
    ${(item.price.newPrice * item.quantity).toFixed(2)}</td>
   </tr>
   `;
  });
  cartWrapper.innerHTML = result;
  removeCartItem();
}
displayCartProduct();

function removeCartItem() {
  const btnDeleteCart = document.querySelectorAll(".delete-cart");
  let cartItems = document.querySelector(".header-cart-count");

  btnDeleteCart.forEach((button) => {
    button.addEventListener("click", function (e) {
      const id = e.target.dataset.id;
      cart = cart.filter((item) => item.id !== Number(id));
      displayCartProduct();
      localStorage.setItem("cart", JSON.stringify(cart));
      cartItems.innerHTML = cart.length;
      saveCartValues();
    });
  });
}

function saveCartValues() {
  const cartTotal = document.getElementById("cart-total");
  const subtotal = document.getElementById("subtotal");
  const fastCargo = document.getElementById("fast-cargo");
  const discountValue = document.getElementById("discount-value");
  const shippingValue = document.getElementById("shipping");
  const shippingTotal = document.getElementById("shipping-total");
  const fastCargoPrice = 19;
  let itemsTotal = 0;
  let itemsTotal1 = 0;
  let itemsTotal2 = 0;
  let discountTotal = 0;
  let shipping = 0;
  let shipping1 = 0;

  cart.length > 0 && cart.forEach((item) => {
    itemsTotal += item.price.oldPrice * item.quantity;
    itemsTotal1 += item.price.newPrice * item.quantity;  
    discountTotal = (itemsTotal - itemsTotal1);
    shipping = (1000 - itemsTotal1);
  });

  subtotal.innerHTML = `${itemsTotal.toFixed(2)}₺`;
  cartTotal.innerHTML = `${itemsTotal1.toFixed(2)}₺`;
  discountValue.innerHTML = `${discountTotal.toFixed(2)}₺`;
  shippingValue.innerHTML = `${shipping.toFixed(2)}₺`;
  itemsTotal2 = itemsTotal1;

  fastCargo.addEventListener("change", function (e) {
    if (e.target.checked) {
      cartTotal.innerHTML = `${(itemsTotal1 + fastCargoPrice).toFixed(2)}₺`;
    } else {
      cartTotal.innerHTML = `${itemsTotal1.toFixed(2)}₺`;
    }
  });

  shippingValue.addEventListener("change", function (e) {
    if (shipping <= 0) {
      shippingValue.innerHTML = `${shipping1.toFixed(2)}₺`;
      shippingTotal.style.display = "none";
      cartTotal.innerHTML = `${itemsTotal2.toFixed(2)}₺`
    }
    else {}
  });
}
saveCartValues();