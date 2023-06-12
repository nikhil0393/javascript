/**
 * IMPORTING MODULES
 * TOP LEVEL: AWAIT
 * MODULE PATTERN
 */

/**
 * Bundling - joins all modules into one file
 * Build process 1.Bundling 2.Transpiling/Polyfilling
 * Babel converts modern JS back to ES5 called Transpiling/Polyfilling
 * Build tools - Webpack or Parcel (these are called bundlers)
 */

/**--------------- IMPORTING MODULES --------------- */
console.log('\n----- %cIMPORTING MODULES -----', 'font-size:14px;color:red');

console.log('\n%cNAMED IMPORTS', 'font-size:14px;color:red');
/*
import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
addToCart('bread', 10);
console.log(price, tq);
*/

import * as ShoppingCart from './shoppingCart.js';
ShoppingCart.addToCart('bread', 10);
console.log(ShoppingCart.totalPrice);

console.log('\n%cDEFAULT IMPORTS', 'font-size:14px;color:red');
/**
 * We can import Named & Default imports together but not advised
 */
//import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';
import add, { cart } from './shoppingCart.js';

add('pizza', 2);
add('bread', 5);
add('apples', 10);

console.log(cart);

/**--------------- TOP LEVEL: AWAIT ---------------
 * Await keyword now also works outside async functions but only in modules
 */
console.log('\n----- %cTOP LEVEL: AWAIT -----', 'font-size:14px;color:red');
console.log('Start fetching');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
console.log('End fetching');

const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();

  return { title: data.at(-1).title, text: data.at(-1).body };
};

const lastPost = getLastPost();
console.log(lastPost);
//Result of this is not the Object as per the async function but instead a Promise will be returned here because by the time the async function is called the fetch has not returned yet. So workaround for this is like below: as the returned is Promise, we can use then() on that

//Not very clean
lastPost.then(last => console.log('lastPost:: ', last));
//Instead we can use Top level Await
const lastPostAwait = await getLastPost();
console.log('lastPostAwait:: ', lastPostAwait);

/**--------------- MODULE PATTERN ---------------
 * This pattern was used before the concept of Modules but the problem with this is:
 * If we want to create 1 module per file like ES6 module the we have to create multiple scripts and we have to link them in HTML file which will create some problems like: careful about the order in which they need to be added and all variables will be in Global scope and also we cannot bundle them using Module bundler
 */
console.log('\n----- %cMODULE PATTERN -----', 'font-size:14px;color:red');

const ShoppingCartIIFE = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
  };

  const orderStock = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCartIIFE.addToCart('apples', 4);
ShoppingCartIIFE.addToCart('pizza', 2);
console.log(ShoppingCartIIFE);
console.log(ShoppingCartIIFE.shippingCost); //undefined because this property is scoped only to that function

/**--------------- INTRODUCTION TO NPM ---------------
 * Parcel is used to bundle modules
 */
console.log('\n----- %cINTRODUCTION TO NPM -----', 'font-size:14px;color:red');
// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};
const stateClone = Object.assign({}, state); //copying the object but when done like this, new object updates when anything is chnaged in the original object
const stateDeepClone = cloneDeep(state); //whereas this will the exact copy of the initial object and will not get updated

state.user.loggedIn = false;
console.log(stateClone);
console.log(stateDeepClone);

if (module.hot) {
  module.hot.accept();
}

/**--------------- Configuring Babel & Polyfilling ---------------
 * Babel converts/transpiles the JS code to ES5 to support all browsers
 * Some of the new features cannot be transpiled so we Polyfill them
 *
 */
console.log(
  '\n----- %cConfiguring Babel & Polyfilling -----',
  'font-size:14px;color:red'
);

//Babel use to polyfill out the box before but now they recommend using another library which is done by importing like below
import 'core-js/stable'; //this will polyfill lot of fetures which may not be needed instead we cancan only polyfill specific fetures needed like below
//import 'core-js/stable/array/find';

//For Polyfilling async functions below package needs to import after installing
import 'regenerator-runtime/runtime';

/**--------------- DECLARATIVE & FUNCTIONAL JS PRINCIPLES --------------- */
console.log(
  '\n----- %cDECLARATIVE & FUNCTIONAL JS PRINCIPLES -----',
  'font-size:14px;color:red'
);
