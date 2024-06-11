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

    <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-name="${productObj.name}">
      Add to Cart
    </button>
  </div>
  `
  pageHTML += productHTML  
})
// document.body.innerHTML = pageHTML

const productsGrid = document.querySelector('.products-grid');
productsGrid.innerHTML = pageHTML;

// Add to Cart button working
const addToCartButtons = document.querySelectorAll('.js-add-to-cart-button');
addToCartButtons.forEach((addToCartButton) => {
  addToCartButton.addEventListener('click', () => {
    //TODO: Add to cart button functionality
    //TODO: check if product in cart already, else add new to cart
    // saving into data structure
    const productName = addToCartButton.dataset.productName
    cart.push({
      productName,
      quantity: 1
    })
    console.log(cart)
  })
})