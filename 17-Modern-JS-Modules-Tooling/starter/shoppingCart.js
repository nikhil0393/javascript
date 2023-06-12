/**Exporting module
 * Export types: Named exports; Default exports
 * We use Default exports only when we want export 1 thing per module
 * Export need to happen in top level code, meaning: it cannot be inside if blocks or loops etc
 */
console.log('Exporting module');

//Blocking code
// console.log('SHOPPING CART:: Start fetching users');
// await fetch('https://jsonplaceholder.typicode.com/users');
// console.log('SHOPPING CART:: Finish Fetching users');

const shippingCost = 10;
export const cart = [];

//NAMED EXPORT
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };

//DEAFULT EXPORT
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
