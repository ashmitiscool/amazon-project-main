// docstr: Code relating to manipulating data and retrieving data from cart

import { hardCopy } from "../scripts/subset/global_funcs.js";

// format
/* Cart DOCUMENTATION
Structure like 
array[
  obj{
    productId:,
    quantity:
  }
] 
*/
// temporarily adding default values to the cart just for development of checkout.js
export let cart = JSON.parse(localStorage.getItem("cart")) || [
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 2,
  },
  {
    productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    quantity: 1,
  },
];

export function getCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((productObj) => {
    const productQuantity = productObj.quantity;
    cartQuantity += productQuantity;
  });
  return cartQuantity;
}

// cntxt: executed every time 'add to cart' button clicked
// format -> addToCartButton: Button element on amazon home page
// format -> index: index of the button element ( 0 at top left )
// Extracts data from amazon homepage
export function addToCart(addToCartButton, index) {
  const productName = addToCartButton.dataset.productName;
  const productId = addToCartButton.dataset.productId; // ID of the product which 'Add to Cart' button is pressed (not necessarily in cart)

  let isInCart = false; // flag to check if in cart
  let matchingItem;

  // @s checking if already in cart
  // iterating through all items in cart
  // format -> cart: array of cart product objects from cart.js
  cart.forEach((cartItem) => {
    const itemName = cartItem.productName;
    const itemId = cartItem.productId; // ID of the product iterable in the cart

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
  saveCartInStorage();
}

export function deleteFromCart(productId) {
  let deletedCart = []; // cart which does not contain the deleted item (temporary use)
  // @s adding items to deletedCart
  cart.forEach((cartItem) => {
    if (cartItem.productId != productId) {
      deletedCart.push(cartItem);
    }
  });
  cart = hardCopy(deletedCart);
  // ^ hard copy of deletedCart
  saveCartInStorage();
}

export function saveCartInStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
