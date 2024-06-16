import { cart } from "../../data/cart.js";
import { products } from "../../data/products.js";

// docstr: JS for checkout page

// @s generating html on the page
// todo: extract the data from the cart and generate the html on the page
// issue: cart loading default values from cart instead of products added from amazon.js
console.log(cart);

function displayOrderSummary() {
  let orderSummaryHTML = "";
  cart.forEach((cartItem) => {
    // todo: iterate through products array and extract the object which has the id same as the cartItem
    console.log(cartItem);
    const html = /*html*/ `
    <div class="cart-item-container">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="images/products/athletic-cotton-socks-6-pairs.jpg">

        <div class="cart-item-details">
          <div class="product-name">
            Black and Gray Athletic Cotton Socks - 6 Pairs
          </div>
          <div class="product-price">
            $10.90
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
              name="delivery-option-1">
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
              name="delivery-option-1">
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
              name="delivery-option-1">
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
  const orderSummaryDiv = document.querySelector(".order-summary");
  orderSummaryDiv.innerHTML = orderSummaryHTML;
}
displayOrderSummary();
