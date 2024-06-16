// docstr: Main Amazon Home Page JS Code

import { cart, getCartQuantity } from "../../data/cart.js";
import { products } from "../../data/products.js";

// cntxt: setting HTML of displaying products on page
function setHTML() {
  let pageHTML = "";
  products.forEach((productObj, index) => {
    // products: array --> from products.js
    const productHTML = /*html*/ `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${productObj.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${productObj.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${productObj.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${productObj.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(productObj.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select class="quantity-select js-quantity-select${index}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart${index}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-name="${
        productObj.name
      }" data-product-id="${productObj.id}">
        Add to Cart
      </button>
    </div>
    `;
    pageHTML += productHTML;
  });

  const productsGrid = document.querySelector(".products-grid");
  productsGrid.innerHTML = pageHTML;
}
setHTML();

function showCartQuantity() {
  const cartQuantityDiv = document.querySelector(".cart-quantity");
  cartQuantityDiv.innerText = getCartQuantity();
}
showCartQuantity();

// @s Initializing Add to Cart button
let cartAddedIdObj = {};
// cntxt ^ Stores IDs of the timeouts in displayCartAdded()
// format -> obj{ index(int): timeOutId }

function initAddToCartButton() {
  // ! only executed once
  const addToCartButtons = document.querySelectorAll(".js-add-to-cart-button");
  addToCartButtons.forEach((addToCartButton, index) => {
    addToCartButton.addEventListener("click", () => {
      // cntxt: executed every time button clicked
      const productName = addToCartButton.dataset.productName;
      const productId = addToCartButton.dataset.productId;

      let isInCart = false; // flag to check if in cart
      let matchingItem;

      // @s checking if already in cart
      // iterating through all items in cart
      // format -> cart: array of cart product objects from cart.js
      cart.forEach((cartItem) => {
        const itemName = cartItem.productName;
        const itemId = cartItem.productId;

        // checking if already in cart
        if (productId === itemId) {
          isInCart = true;
          matchingItem = cartItem;
        }
      });

      const dropdown = document.querySelector(`.js-quantity-select${index}`);
      const dropdownValue = Number(dropdown.value);

      // @s Adding to cart logic
      // saving into cart array

      // if not in cart
      if (!isInCart) {
        cart.push({
          productId,
          quantity: dropdownValue,
        });
      } else {
        // if in cart
        matchingItem.quantity += dropdownValue;
      }
      console.log(cart);
      showCartQuantity();
      displayCartAdded(index);
    });
  });
}
initAddToCartButton();

function displayCartAdded(index) {
  const addedToCartLabel = document.querySelector(`.js-added-to-cart${index}`);
  clearTimeout(cartAddedIdObj[`${index}`]);

  cartAddedIdObj[`${index}`] = setTimeout(() => {
    addedToCartLabel.classList.remove("fullOpacity");
  }, 2000);
  addedToCartLabel.classList.add("fullOpacity");
}
