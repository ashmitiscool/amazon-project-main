import {
  cart as exportedCart,
  getCartQuantity,
  deleteFromCart,
  saveCartInStorage,
} from "../../data/cart.js";
import { products } from "../../data/products.js";
import { centsToDollars } from "../subset/global_funcs.js";
import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"; // default export
/* No brackets, default export, brackets, named export */

// @s DayJS practicing
const today = dayjs();
const weekLater = today.add(7, "day");
const tomorrow = today.add(1, "day");
const days3Later = today.add(3, "day");

// console.log(today.add(7, "day")); // manipulating dates
// console.log(weekLater.format("dddd, MMMM D"));
const weekLaterFrmtted = weekLater.format("dddd, MMMM D");
console.log(weekLaterFrmtted);
const days3LaterFrmtted = days3Later.format("dddd, MMMM D");
console.log(days3LaterFrmtted);
const tomorrowFrmtted = tomorrow.format("dddd, MMMM D");
console.log(tomorrowFrmtted);

hello();

// docstr: JS for checkout page

showNumInCart();

// @s generating html on the page
// todo: generate HTML of payment summary

// * Generates HTML and underlying code of buttons in the Order Summary
// ( not the payment one though that is named as Order summary on the page )
function displayOrderSummary() {
  let orderSummaryHTML = ""; // string to store all the html of order summary
  // cntxt: cartItem for item in cart, product for product in products
  exportedCart.forEach((cartItem) => {
    let matchingItem; // matching item in products array
    const cartItemId = cartItem.productId;

    products.forEach((product) => {
      const productId = product.id;
      if (productId === cartItemId) {
        matchingItem = product;
      }
    });
    // with matching item, we can access anything of the item through products array

    // @s HTML Code:
    const html = /*html*/ `
    <div class="cart-item-container js-cart-item-container${cartItemId}">
      <div class="delivery-date delivery-date-${cartItemId}">
        Delivery date: ${weekLaterFrmtted}
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
              Quantity: <span class="quantity-label js-quantity-label-${
                matchingItem.id
              }">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-cart${
              cartItem.productId
            }">
              Update
            </span>
            <div style="display: inline-block;" class="save-quantity-div-${
              cartItem.productId
            }"></div>
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
              class="delivery-option-input delivery-option-input-free-ship-${
                cartItem.productId
              }"
              name="delivery-option-${cartItem.productId}" data-del-type='free'>
            <div>
              <div class="delivery-option-date">
                ${weekLaterFrmtted}
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input delivery-option-input-3days-ship-${
                cartItem.productId
              }"
              name="delivery-option-${
                cartItem.productId
              }" data-del-type='3days'>
            <div>
              <div class="delivery-option-date">
                ${days3LaterFrmtted}
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input delivery-option-input-1day-ship-${
                cartItem.productId
              }"
              name="delivery-option-${cartItem.productId}" data-del-type='1day'>
            <div>
              <div class="delivery-option-date">
                ${tomorrowFrmtted}
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

  // @s adding event listeners / functionality to update, delete and radio buttons
  exportedCart.forEach((cartItem) => {
    const cartItemId = cartItem.productId;
    const updateButton = document.querySelector(`.js-update-cart${cartItemId}`);
    const deleteButton = document.querySelector(
      `.js-delete-from-cart${cartItemId}`
    );
    const radioButtonFree = document.querySelector(
      `.delivery-option-input-free-ship-${cartItem.productId}`
    );
    console.log("Free");
    console.log(radioButtonFree);
    const radioButton3days = document.querySelector(
      `.delivery-option-input-3days-ship-${cartItem.productId}`
    );
    console.log("3 days shipping");
    console.log(radioButton3days);
    const radioButton1day = document.querySelector(
      `.delivery-option-input-1day-ship-${cartItem.productId}`
    );
    console.log("1 day shipping");
    console.log(radioButton1day);

    const radioButtonArray = [
      radioButtonFree,
      radioButton3days,
      radioButton1day,
    ];

    // @s update button functioning
    updateButton.addEventListener("click", () => {
      console.log(`Prod Id is ${cartItemId}`);
      updateButtonWork(cartItemId);
    });
    // @s delete button functioning
    deleteButton.addEventListener("click", () => {
      deleteFromCart(cartItemId);
      displayOrderSummary();
    });
    // @s radio button functioning
    radioButtonArray.forEach((radioButton) => {
      radioButton.addEventListener("click", () => {
        const deliveryDateDiv = document.querySelector(
          `.delivery-date-${cartItemId}`
        );
        console.log(deliveryDateDiv);
        if (radioButton.dataset.delType === "free") {
          console.log("free");
          deliveryDateDiv.innerText = `Delivery date: ${weekLaterFrmtted}`;
        }
        if (radioButton.dataset.delType === "3days") {
          console.log("3days");
          deliveryDateDiv.innerText = `Delivery date: ${days3LaterFrmtted}`;
        }
        if (radioButton.dataset.delType === "1day") {
          console.log("1day");
          deliveryDateDiv.innerText = `Delivery date: ${tomorrowFrmtted}`;
        }
      });
    });
  });
  // changing the checkout item text whenever this function called
  showNumInCart();
}
displayOrderSummary();

function updateButtonWork(id) {
  console.log(`id got is ${id}`);
  const quantityLabel = document.querySelector(`.js-quantity-label-${id}`);
  // console.log(quantityLabel.innerText);
  const prevQuantity = quantityLabel.innerText; // * quantity before changing
  quantityLabel.innerText = "";
  // * Removing the update link
  document.querySelector(`.js-update-cart${id}`).remove();
  const saveDiv = document.querySelector(`.save-quantity-div-${id}`);
  // console.log(updateLink);
  saveDiv.innerHTML = /*html*/ `
    <input class="quantity-input js-quantity-input-${id}" placeholder="${prevQuantity}">
    <span class='save-quantity-link-${id} link-primary'>Save<span>
  `;
  // @s Event Listener for save link of product of that specific id
  const saveLink = document.querySelector(`.save-quantity-link-${id}`);
  console.log(saveLink);
  const quantityInput = document.querySelector(`.js-quantity-input-${id}`);
  quantityInput.value = prevQuantity;
  saveLink.addEventListener("click", () => {
    const newQuantity = Number(quantityInput.value);
    saveNewQuantity(id, newQuantity);
  });
  quantityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const newQuantity = Number(quantityInput.value);
      saveNewQuantity(id, newQuantity);
    }
  });
}

function saveNewQuantity(id, newQuantity) {
  if (newQuantity === 0) {
    deleteFromCart(id);
  } else if (newQuantity > 0 && newQuantity < 1000) {
    let matchingItem;
    exportedCart.forEach((cartItem) => {
      if (cartItem.productId === id) {
        matchingItem = cartItem;
      }
    });
    matchingItem.quantity = newQuantity;
  } else {
    console.log("Quantity Invalid");
  }
  saveCartInStorage();
  displayOrderSummary();
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
