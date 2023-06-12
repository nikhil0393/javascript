//Default parameters
//Values vs Reference
//First class and higher order functions
//Functions returning functions
//Call, Apply and Bind methods
//Immediately Invoked functions
//Closures

'use strict';

/*==================================Default parameters==========================
 *default values can have any expressions
 */
console.log('====================Default parameters====================');
const bookings = [];
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  /**ES5 method of setting default value
   * numPassengers = numPassengers || 1;
   * price = price || 199;
   * In ES6 we set default value in aruguments directly
   */
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);
createBooking('LH123', undefined, 1000); //Cannot skip an argument so we mention undefined and so it takes default value for that argument

//==================================Values vs Reference==========================
const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 123456789,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;
  if (passenger.passport === 123456789) alert('Checked in');
  else alert('Wrong passport');
};

//checkIn(flight, jonas);
console.log(flight);
console.log(jonas);
//Is same as doing
const flighNum = flight;
const passenger = jonas;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000000);
};
newPassport(jonas);
//checkIn(flight, jonas);

/*==================================First class and higher order functions==========================
 *High order functions - a function that receives another function as an argument/that returns a new function or both.
 *this is possible because of first-class functions
 *callback allow us to create Abstraction
 */

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};
//Hgher order function
const transformer = function (str, fn) {
  console.log(`Original String: ${str}`);
  console.log(`Transformed String: ${fn(str)}`);
  console.log(`Function name: ${fn.name}`);
};

transformer('Javascript is the best!', upperFirstWord);
transformer('Javascript is the best!', oneWord);

const wave = function () {
  console.log(`✌`);
};
//document.body.addEventListener('click', wave);

['Nick', 'Jonas', 'Adam'].forEach(wave);

/*==================================functions returning functions==========================
 *
 */
console.log('\n===========Functions returning functions=============');
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Steven');

greet('Hello')('Jonas');
//Above example using Arrow function
const greetArrow = greetingArrow => nameArrow =>
  console.log(`${greetingArrow} ${nameArrow}`);

greetArrow('Hi')('Jonas');

//Call and Apply methods
/*==================================Call, Apply & Bind methods==========================
 *These methods are basically used to manually set the this keyword
 */
console.log('\n===========Call and Apply methods=============');
const lufthansa = {
  airline: 'Lufthansa',
  iatacode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iatacode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iatacode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Nikhil Myana');
lufthansa.book(635, 'Jonas');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iatacode: 'EU',
  bookings: [],
};

const book = lufthansa.book;
//calling book method defined in lufthansa object
//book(23, 'Sarah Williams');// here book is just a regular function call and so 'this' will point to undefined in regular function calls which in result throws an error

//Instead it can be done like below using Call method
book.call(eurowings, 23, 'Sarah Williams'); //1st argument indicated to which object 'this' keyword need to point
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iatacode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');
console.log(swiss);

//Apply method - same as call method but it take arguments : Object and an array of data
console.log('\n======Apply method======');
const flightData = [23, 'Nikhil Myana'];
book.apply(swiss, flightData);
console.log(swiss);
//Now a days instead of apply() we can just use call() as we can use spread operator for array destruturing
book.call(eurowings, ...flightData);
console.log(eurowings);

/*Bind method
 *Call the bind method on the function passing the Object as an argument
 *bind method doesnt call the book function instead it returns new function which point to the object passed as an argument
 */
console.log('\n----- %cBIND METHOD -----', 'font-size:14px;color:red');
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Steven Williams');
console.log(eurowings);

const bookEW23 = book.bind(eurowings, 23); //bookEW23 is a new function for specific flight num-23
bookEW23('Nikhil Myana'); //now this new func will only need Name argument as flightNum is predefined above
bookEW23('Sarah Williams'); //Output - Sarah Williams booked a seat on Eurrowings flight EW23

//Bind With Event listeners -
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log('this keyword point to:: ', this); //'this' in eventhandler always points to the element on which that eventhandler is attached
  this.planes++;
  console.log('Planes:: ', this.planes);
};
// lufthansa.buyPlane();
//document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);//this will point to '.buy' element

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

//Partial application - means a part of the arguments of Original function are already applied. bookEW23() is an eg of Partial application.
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

//first argument is for 'this' keyword but as we dont need it, we are just setting to null becuase it doesn't affect anything, it can be anything.
const addVAT = addTax.bind(null, 0.23); //this is actually same as below statement
//const addVATvthoutBind = value => value + value * 0.23;

console.log(addVAT(100)); //123
console.log(addVAT(23));
//doing same above using functions returning functions
const addTax1 = function (rate) {
  return function (value) {
    console.log(value + value * rate);
  };
};

const addVAT1 = addTax1(0.23);
addVAT1(100); //123
addVAT1(23);

//Coding Challenge-1
/*==================================Coding Challenge-1==========================*/
console.log('\n===========Coding Challenge-1=============');
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
};
//console.log(poll);

poll.displayResults = function (type = 'array') {
  if (type === 'array') {
    console.log(this.answers);
  } else if (type === 'string') {
    console.log(`Poll results are ${this.answers}`);
  }
};

poll.registerNewAnswer = function () {
  const answer = Number(
    prompt(
      `${this.question} \n${this.options.join('\n')} \n(Write option number)`
    )
  );
  //typeof answer === 'number' && answer <= this.answers.length && this.answers[answer]++;
  if (answer >= 0 && answer <= 3) {
    this.answers[answer]++;
  } else {
    alert('Enter number from the options only');
  }
  this.displayResults();
  this.displayResults('string');
};
//poll.registerNewAnswer();

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

//used Call method to manually set 'this' to new object which is created below with new arrays(test data)
poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });

/*==================================Immediately Invoked functions==========================*/
console.log('\n===========Immediately Invoked functions=============');
(function () {
  console.log('This will never run again');
})();

(() => console.log('This will also never run again'))();

/*==================================Closures==========================
 *Check screenshot
 *Execution context, Call stack, Scope chain
 *A closure makes a function remember all the variables that existed at the functions birth place
 *A function always has access to the Variable Environment of Execution Context in which it was created.
 */
console.log('\n===========Closures=============');
const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();
booker();
booker();
booker();

console.dir(booker);

//Example-1
let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);

h();
f();
console.dir(f);

//Example2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
    console.log(this);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000; //Closure has priority over Scope Chain, so perGroup defined here is not used in the function thou it is a group variable
boardPassengers(180, 3);

// Coding Challenge #2
/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
