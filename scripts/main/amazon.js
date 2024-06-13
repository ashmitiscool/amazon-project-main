/* Setting HTML of the page */
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

showCartQuantity();

// Add to Cart button working
let cartAddedIdObj = {};
initAddToCartButton();
function initAddToCartButton() {
  // only executed once
  const addToCartButtons = document.querySelectorAll(".js-add-to-cart-button");
  addToCartButtons.forEach((addToCartButton, index) => {
    addToCartButton.addEventListener("click", () => {
      // * CNTXT: executed every time button clicked
      // saving into cart array
      const productName = addToCartButton.dataset.productName;
      const productId = addToCartButton.dataset.productId;

      let isInCart = false; // flag
      let matchingItem;
      cart.forEach((item) => {
        // checking if the product already in the cart
        const itemName = item.productName;
        const itemId = item.productId;

        // checking if already in cart
        if (productId === itemId) {
          isInCart = true;
          matchingItem = item;
        }
      });
      const dropdown = document.querySelector(`.js-quantity-select${index}`);
      const dropdownValue = Number(dropdown.value);

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

function getCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((productObj) => {
    const productQuantity = productObj.quantity;
    cartQuantity += productQuantity;
  });
  return cartQuantity;
}

function showCartQuantity() {
  const cartQuantityDiv = document.querySelector(".cart-quantity");
  cartQuantityDiv.innerText = getCartQuantity();
}

// ! FIXME: When clearing timeout the previous product's prompt continues to display forever
function displayCartAdded(index) {
  const addedToCartLabel = document.querySelector(`.js-added-to-cart${index}`);
  clearTimeout(cartAddedIdObj[`${index}`]);

  cartAddedIdObj[`${index}`] = setTimeout(() => {
    addedToCartLabel.classList.remove("fullOpacity");
  }, 2000);
  addedToCartLabel.classList.add("fullOpacity");
}
