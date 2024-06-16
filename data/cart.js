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
export let cart = [];

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
}
