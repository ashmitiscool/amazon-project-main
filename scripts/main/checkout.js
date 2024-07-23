import {
  cart as exportedCart,
  getCartQuantity,
  deleteFromCart,
} from "../../data/cart.js";
import { products } from "../../data/products.js";
import { centsToDollars, hardCopy } from "../subset/global_funcs.js";

// docstr: JS for checkout page

showNumInCart(exportedCart);

// @s generating html on the page
// todo: generate HTML of payment summary
// todo: generate HTML of delivery date
// todo: remove the cart parameter from the functions, they all should refer to exportedCart
// issue: cart loading default values from cart instead of products added from amazon.js

// * Generates HTML and underlying code of buttons in the Order Summary
// ( not the payment one though that is named as Order summary on the page )
function displayOrderSummary() {
  console.log("Cart is gg :");
  console.log(exportedCart);
  let orderSummaryHTML = ""; // string to store all the html of order summary
  // cntxt: cartItem for item in cart, product for product in products
  exportedCart.forEach((cartItem) => {
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

    // @s HTML Code:
    const html = /*html*/ `
    <div class="cart-item-container js-cart-item-container${cartItemId}">
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
            <span class="update-quantity-link link-primary js-update-cart${
              cartItem.productId
            }">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-from-cart${
              cartItem.productId
            }">
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

  // @s adding event listeners / functionality to update and delete buttons
  exportedCart.forEach((cartItem) => {
    const cartItemId = cartItem.productId;
    const updateButton = document.querySelector(`.js-update-cart${cartItemId}`);
    const deleteButton = document.querySelector(
      `.js-delete-from-cart${cartItemId}`
    );
    console.log(`updateButton is`);
    console.log(updateButton);
    console.log(`deleteButton is`);
    console.log(deleteButton);
    // @s update button functioning
    updateButton.addEventListener("click", () => {
      /*toBeImplemented*/
      updateButtonWork();
    });
    // @s delete button functioning
    deleteButton.addEventListener("click", () => {
      deleteFromCart(cartItemId);
      displayOrderSummary();
    });
  });
  // changing the checkout item text whenever this function called
  showNumInCart(exportedCart);
}
displayOrderSummary();

function updateButtonWork() {
  // ! To be implemented
}

// cntxt: Displays the number of items beside the 'checkout' text on the top bar
// * (does not return the number of elements in cart, that is getCartQuantity() from cart.js)
function showNumInCart() {
  const checkOutNumOfItems = document.querySelector(".return-to-home-link");
  const cartQuantity = getCartQuantity();
  if (cartQuantity === 1) {
    checkOutNumOfItems.innerText = `${getCartQuantity()} item`;
  } else {
    checkOutNumOfItems.innerText = `${getCartQuantity()} items`;
  }
}
