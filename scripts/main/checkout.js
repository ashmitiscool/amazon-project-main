import { cart as exportedCart, getCartQuantity } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { centsToDollars } from "../subset/global_funcs.js";

// docstr: JS for checkout page

showNumInCart(exportedCart);

// @s generating html on the page
// todo: generate HTML of payment summary
// todo: generate HTML of delivery date
// issue: cart loading default values from cart instead of products added from amazon.js

// * Generates HTML and underlying code of buttons in the Order Summary
// ( not the payment one though that is named as Order summary on the page )
function displayOrderSummary(cart) {
  console.log("Cart is gg :");
  console.log(cart);
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

  // todo: add event listener to all update and delete buttons on the order summary
  // adding event listeners / functionality to update and delete buttons
  cart.forEach((cartItem) => {
    const cartItemId = cartItem.productId;
    const updateButton = document.querySelector(`.js-update-cart${cartItemId}`);
    const deleteButton = document.querySelector(
      `.js-delete-from-cart${cartItemId}`
    );
    console.log(`updateButton is`);
    console.log(updateButton);
    console.log(`deleteButton is`);
    console.log(deleteButton);
    // update button functioning
    updateButton.addEventListener("click", () => {
      /*toBeImplemented*/
      updateButtonWork();
    });
    // update button functioning
    deleteButton.addEventListener("click", () => {
      /*toBeImplemented*/
      deleteButtonWork(cartItemId);
    });
  });
  // changing the checkout item text whenever this function called
  showNumInCart(cart);
}
displayOrderSummary(exportedCart);

function updateButtonWork() {}

// in the starting of the program it will be empty
let newCart = [];
function deleteButtonWork(productId) {
  // ! Below few commented lines of code will NOT delete the product from the cart, it will just remove it from the page
  // const cartItemContainer = document.querySelector(
  //   `.js-cart-item-container${productId}`
  // );
  // cartItemContainer.remove();

  if (newCart.length === 0) {
    newCart = JSON.parse(JSON.stringify(exportedCart)); // hard copy of exported cart first time executed
  }
  let deletedCart = [];
  newCart.forEach((cartItem) => {
    if (cartItem.productId != productId) {
      deletedCart.push(cartItem);
    }
  });
  newCart = JSON.parse(JSON.stringify(deletedCart));
  // ^ hard copy of deletedCart
  displayOrderSummary(newCart);
}

// cntxt: Displays the number of items beside the 'checkout' text on the top bar
// * (does not return the number of elements in cart, that is getCartQuantity() from cart.js)
function showNumInCart(cart) {
  const checkOutNumOfItems = document.querySelector(".return-to-home-link");
  checkOutNumOfItems.innerText = `${getCartQuantity(cart)} items`;
}
