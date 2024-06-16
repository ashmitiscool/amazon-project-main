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
