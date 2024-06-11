/* Setting HTML of the page */
let pageHTML = ''
products.forEach((productObj) => { // products: array --> from products.js 
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
      $${(productObj.priceCents/100).toFixed(2)}
    </div>

    <div class="product-quantity-container">
      <select>
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

    <div class="added-to-cart">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-name="${productObj.name}" data-product-id="${productObj.id}">
      Add to Cart
    </button>
  </div>
  `
  pageHTML += productHTML  
})

const productsGrid = document.querySelector('.products-grid');
productsGrid.innerHTML = pageHTML;

console.log(getCartQuantity());


// Add to Cart button working
function initAddToCartButton() { 
  // only executed once
  const addToCartButtons = document.querySelectorAll('.js-add-to-cart-button');
  addToCartButtons.forEach((addToCartButton) => {
    addToCartButton.addEventListener('click', () => { // executed every time button clicked
      // saving into cart array
      const productName = addToCartButton.dataset.productName;
      const productId = addToCartButton.dataset.productId;

      let isInCart = false // flag
      let matchingItem;
      cart.forEach((item) => { // checking if the product already in the cart
        const itemName = item.productName;
        const itemId = item.productId;
        
        if (productId === itemId) {
          isInCart = true;
          matchingItem = item;        
        }
      })    
      if (!isInCart) {
        cart.push({
          productId,
          quantity: 1
        })      
      } else {
        matchingItem.quantity += 1;
      }
      console.log(cart)
      const cartQuantity = getCartQuantity();
      console.log(cartQuantity);
    })
  })
}
initAddToCartButton();

// TODO: Update the cart image to show the amount in cart when loading the page and when updating the cart
function getCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((productObj) => {
    const productQuantity = productObj.quantity;
    cartQuantity += productQuantity;    
  })
  return cartQuantity;
}