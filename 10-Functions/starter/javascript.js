//Default parameters
//Values vs Reference
//Functions returning functions
//Call, Apply and Bind methods
//Immediately Invoked functions
//Closures

'use strict';

//Default parameters
const bookings = [];
const createBooking = function (
  flightNum,
  numPassn = 1,
  price = 199 * numPassn
) {
  const booking = {
    flightNum,
    numPassn,
    price,
  };
  //console.log(booking);
  bookings.push(booking);
};

createBooking('A380');
createBooking('B380', 4, 700);
createBooking('C380', 3);
createBooking('D380', undefined, 500);

//Values vs Reference
const flight = 'LH234';
const nikhil = {
  name: 'Sainikhil Myana',
  passport: 23649482934,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 23649482934) {
    alert('Checked In!');
  } else {
    alert('Wrong passport number!!');
  }
};

// checkIn(flight, nikhil);
// console.log(flight);
// console.log(nikhil);

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000000);
};

newPassport(nikhil);
//checkIn(flight, nikhil);
console.log(flight);
console.log(nikhil);

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

const transformer = function (str, fn) {
  console.log(`Original String : ${str}`);
  console.log(`Transformed String : ${fn(str)}`);
  console.log(`Function Name : ${fn.name}`);
};

transformer('Javascript is best!', upperWord);
transformer('Javascript is best!', oneWord);

//Functions calling functions
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greetingHey = greet('Hey');
greetingHey('Jonas');
greetingHey('Nikhil');

greet('Hello')('Nikhil');

//same above funciton using arrow function
const greet1 = greeting1 => name1 => console.log(`${greeting1} ${name1}`);
greet1('Yo')('Mike');

//Using Call, apply and bind methods for functions
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
lufthansa.book(999, 'Myana');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iatacode: 'EW',
  bookings: [],
};

const swiss = {
  airline: 'Swiss',
  iatacode: 'SW',
  bookings: [],
};

const book = lufthansa.book; //copying same book function outside lufthansa object

book.call(eurowings, 23, 'Jonas'); //using call method to point 'this' to eurowings object instead of lufthansa
console.log(eurowings);

book.call(lufthansa, 237, 'Padma');
console.log(lufthansa);

//Apply method - same as call method but takes array as arguments after 1st argument
const flightData = [250, 'Mary Cooper'];

//book.apply(eurowings, flightData);
//console.log(eurowings);
//or instead we can use call method
book.call(eurowings, ...flightData);
console.log(eurowings);

//Bind method
const bookEW = book.bind(eurowings);
const bookSW = book.bind(swiss);
bookEW(123, 'Nick');
bookSW(456, 'Pump');

const bookEW23 = book.bind(eurowings, 23);
bookEW23('Yash');
bookEW23('Sindhu');

//Bind With Event listeners
lufthansa.planes = 300;
lufthansa.buyPlanes = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlanes.bind(lufthansa));

//Bind with partial application(used to preset values)
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23); //same as addVAT = value => value + value * 0.23;
console.log(addVAT(100));
console.log(addVAT(23));

//same above bind application without using Bind instead using function calling functions
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));

//Coding challenge
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer: function () {
    const selectedPoll = prompt(
      `${this.question} \n${this.options[0]} \n${this.options[1]} \n${this.options[2]} \n${this.options[3]}\n(Write opton number)`
    );
    //above can also be written as
    //`${this.question}\n${this.options.join('\n')}`
    const poll = Number(selectedPoll);
    if (poll >= 0 && poll <= 3) {
      this.answers[poll] = this.answers[poll] + 1;
      console.log(this.answers);
    } else alert(`You entered wrong choice!! ${poll}`);
    this.displayResults();
    this.displayResults('string');
  },
  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};
//poll.registerNewAnswer();
//console.log(typeof selectedPoll, selectedPoll);
document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));
//Bonus challenge
poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
poll.displayResults.call({ answers: [5, 2, 3] });

//Immediately Invoked functions -- these function dont really contain function names
(function () {
  console.log('This function is only called once');
})();

(() => console.log('This will ALSO never run again'))();

//CLOSURES
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

boardPassengers(180, 2);
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
