import { cart } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { centsToDollars } from "../subset/global_funcs.js";

// docstr: JS for checkout page

// @s generating html on the page
// todo: generate HTML of payment summary
// todo: generate HTML of delivery date
// issue: cart loading default values from cart instead of products added from amazon.js
console.log(cart);

function displayOrderSummary() {
  let orderSummaryHTML = ""; // string to store all the html of order summary
  // cntxt: cartItem for item in cart, product for item in products
  cart.forEach((cartItem) => {
    // todo: iterate through products array and extract the object which has the id same as the cartItem
    console.log(cartItem);
    let matchingItem; // matching item in products array
    const cartItemId = cartItem.productId;

    products.forEach((product) => {
      const productId = product.id;
      if (productId === cartItemId) {
        matchingItem = product;
      }
    });
    console.log(`Matching Item is`);
    console.log(matchingItem);
    // with matching item, we can access anything of the item through products array

    const html = /*html*/ `
    <div class="cart-item-container">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingItem.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingItem.name}
          </div>
          <div class="product-price">
            $${centsToDollars(matchingItem.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${cartItem.productId}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${cartItem.productId}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${cartItem.productId}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
    orderSummaryHTML += html;
  });
  const orderSummaryDiv = document.querySelector(".js-order-summary");
  orderSummaryDiv.innerHTML = orderSummaryHTML;
}
displayOrderSummary();
