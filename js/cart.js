function getCartFromLocalStorage() {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

function updateLocalStorage(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function changeWidth() {
  const progressBar = document.querySelector(".progress-bar-1 .progress-bar");
  const percentage = itemsTotal1 / 10; 
  progressBar.style.width = `${percentage}%`;
}

function displayCartProduct(cart) {
  const cartWrapper = document.querySelector(".cart-wrapper");
  const cartItemsCount = document.querySelector(".header-cart-count");
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
        <td class="product-subtotal">${(item.price.newPrice * item.quantity).toFixed(2)}</td>
      </tr>
    `;
  });

  cartWrapper.innerHTML = result;
  cartItemsCount.innerHTML = cart.length.toString();
  removeCartItem(cart);
}

function removeCartItem(cart) {
  const btnDeleteCart = document.querySelectorAll(".delete-cart");

  btnDeleteCart.forEach((button) => {
    button.addEventListener("click", function (e) {
      const id = e.target.dataset.id;
      const updatedCart = cart.filter((item) => item.id !== Number(id));
      updateLocalStorage(updatedCart);
      displayCartProduct(updatedCart);
      saveCartValues(updatedCart);
    });
  });
}


function saveCartValues(cart) {
  const progressBar1 = document.querySelector(".progress-bar-1");
  const progressBarTitle3 = document.getElementById("progress-bar-title3");
  const progressBarTitle1 = document.getElementById("progress-bar-title1");
  const progressBarTitle2 = document.getElementById("progress-bar-title2");
  const cartTotal = document.getElementById("cart-total");
  const subtotal = document.getElementById("subtotal");
  const fastCargoCheckbox = document.getElementById("fast-cargo");
  const discountValue = document.getElementById("discount-value");
  const shippingValue = document.getElementById("shipping");
  const shippingTotal = document.getElementById("shipping-total");
  const fastCargoPrice = 19;

  let itemsTotal = 0;
  let itemsTotal1 = 0;
  let Bar2 = 0;

  cart.forEach((item) => {
    itemsTotal += item.price.oldPrice * item.quantity;
    itemsTotal1 += item.price.newPrice * item.quantity;
  });

  const discountTotal = itemsTotal - itemsTotal1;
  const shipping = Math.max(1000 - itemsTotal1, 0);

  subtotal.innerHTML = `${itemsTotal.toFixed(2)}₺`;
  cartTotal.innerHTML = `${itemsTotal1.toFixed(2)}₺`;
  discountValue.innerHTML = `${discountTotal.toFixed(2)}₺`;
  shippingValue.innerHTML = `${shipping.toFixed(2)}₺`;

  if (shipping <= 0) {
    progressBarTitle1.innerHTML = `ALIŞVERİŞLERİNİZDE KARGO ÜCRETSİZ!`;
    progressBarTitle1.style.padding = `15px 0px 0px 15px`;
    progressBarTitle1.style.fontSize = `25px`;
    progressBarTitle2.style.display = `none`;
    shippingTotal.style.display = `none`;
    progressBar1.style.display = `none`;
  } 
  else {
    progressBar1.style.display = `block`;
    shippingTotal.style = `
      display = inline-block;
      justify-content = space-between;
    `;

    fastCargoCheckbox.addEventListener("change", function (e) {
      if (e.target.checked) {
        cartTotal.innerHTML = `${(itemsTotal1 + fastCargoPrice).toFixed(2)}₺`;
      } else {
        cartTotal.innerHTML = `${itemsTotal1.toFixed(2)}₺`;
      }
    });

    const progressBarTitle3Content = `
      <div class="progress-bar-title">
        <h4>
          <strong>1.000,00₺</strong> VE ÜZERİ ALIŞVERİŞLERİNİZDE KARGO ÜCRETSİZ!
        </h4>
        <p>
          Sepetinize <span id="shipping">${shipping.toFixed(2)}₺</span>'lik daha ürün ekleyin kargo ücreti ödemeyin.
        </p>
      </div>
    `;
    progressBarTitle3.innerHTML = progressBarTitle3Content;
  }
}

const initialCart = getCartFromLocalStorage();
displayCartProduct(initialCart);
saveCartValues(initialCart);