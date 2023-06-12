/**
 * Rounding Integers
 * Rounding decimals
 * Remainder operator
 * Numeric separators
 */
'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2022-07-25T17:01:17.194Z',
    '2022-07-30T23:36:17.929Z',
    '2022-08-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    /*const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0); //as month is 0 based in date() we are adding 1
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;*/
    //Instead using Intl API like below
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

//Formatting the numbers to resp country format & currency
const formatCur = function (value, locale, cur) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: cur,
  }).format(value);
};

//Display Movements
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  //Set timeout to 5 min
  let time = 120;
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(Math.trunc(time % 60)).padStart(2, 0);
    //In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    //When 0 sec, stop timer and logout user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }

    //Decrese 1sec
    time--;
  };
  //Call the timer every sec
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

//Fake always logged in
/*currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;*/
//Experimenting Intl API
console.log('\n----- Experimenting Intl API -----');
const now = new Date();
const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'long',
  year: '2-digit',
  weekday: 'long',
};
const locale = navigator.language;
console.log(locale);
console.log(new Intl.DateTimeFormat(locale, options).format(now));

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //Create current date and time
    /*const now = new Date();
    const day = `${now.getDate()}`.padStart(2, 0);
    const month = `${now.getMonth() + 1}`.padStart(2, 0); //as month is 0 based in date() we are adding 1
    const year = now.getFullYear();
    const hour = `${now.getHours()}`.padStart(2, 0);
    const min = `${now.getMinutes()}`.padStart(2, 0);
    labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
    */
    //Instead of above approach, used Intl API approach below
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long',
      year: '2-digit',
      weekday: 'long',
    };
    //const locale = navigator.language;
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    //Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value); //Here we used Rounding integers concept

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //Here implementing loan to be approved after 2.5 sec
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      //Add transfer date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 2500);
  }
  inputLoanAmount.value = '';

  //Reset timer
  clearInterval(timer);
  timer = startLogOutTimer();
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

//Base 10 - from 0 to 9 (which we generally represent in Base format)
//Binary base 2 - 0, 1 (internally numbers in JS are represented in 0's & 1's which is Binary format)
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 == 0.3); //false

//Converison - String to Numbers
console.log(Number('23')); //or can be wriiten as
console.log(+'23'); //When + is used JS does type coercion meaning it converts to numbers

//Parsing - can also be used to parse a number from a String
console.log('\n----- PARSING -----');
console.log(Number.parseInt('30px')); //30
console.log(Number.parseInt('30px', 10));
/*
 * 2nd argument is regex which represent whether to use Binary or Base
 * 10 is for Base numbers, 2 is used when we work with Binary
 */
console.log(Number.parseInt('e23', 10)); //NaN - for parseInt method to work it needs to be start with number only
console.log(Number.parseInt('2.5rem')); //2
console.log(Number.parseInt('   2.5rem')); //2 - will work even if it includes spaces
console.log(Number.parseFloat('2.5rem')); //2.5
console.log(parseFloat('2.5rem')); //Can also be written like this as these are global functions but it is not recommended

console.log('\n----- isNaN -----');
//Check if value is NaN
console.log(Number.isNaN(20)); //false
console.log(Number.isNaN('20')); //false
console.log(Number.isNaN(+'20')); //false
console.log(Number.isNaN(+'20X')); //true - because it is not a Num
console.log(Number.isNaN(23 / 0)); //false

console.log('\n----- isFinite -----');
//Check if a value is Number
console.log(Number.isFinite(20)); //true
console.log(Number.isFinite('20')); //false
console.log(Number.isFinite(+'20X')); //false
console.log(Number.isFinite(23 / 0)); //false

console.log('\n----- isInteger -----');
console.log(Number.isInteger(23)); //true
console.log(Number.isInteger(23.0)); //true

console.log(Math.sqrt(25)); //5
console.log(25 ** (1 / 2)); //5 - also sqr root of 25 using exp
console.log(8 ** (1 / 3)); //2 - cubic root

console.log(Math.max(5, 18, 23, 11, 2)); //23
console.log(Math.max(5, 18, '23', 11, 2)); //23 - max() can do type coercion
console.log(Math.max(5, 18, '23px', 11, 2)); //NaN - but cant do Parsing

console.log(Math.min(5, 18, 23, 11, 2)); //2

console.log(Math.PI * Number.parseFloat('10px') ** 2); //eg-Area of a circle with 10px radius

const randomInt = (min, max) =>
  Math.trunc(Math.random() * (max - min) + 1) + min;
console.log(randomInt(10, 20));

/** --------------- Rounding Integers --------------- */
console.log('\n----- Rounding Integers -----');
console.log(Math.round(23.3)); //23
console.log(Math.round(23.9)); //24

console.log(Math.ceil(23.3)); //24
console.log(Math.ceil(23.9)); //24

console.log(Math.floor(23.3)); //23
console.log(Math.floor('23.9')); //23

console.log(Math.trunc(-23.3)); //-23
console.log(Math.trunc(-23.8)); //-23
console.log(Math.floor(-23.3)); //-24

//Rounding decimals - toFixed will return type String
//Number is primitive; Primitives doesn't have methods; So here Boxing will convert Number to NumObject and perfrm operation and then converts back to Number
console.log((2.7).toFixed(0)); //3
console.log((2.7).toFixed(3)); //2.700
console.log((2.345).toFixed(2)); //2.35
console.log(+(2.345).toFixed(2)); //2.35 -converting String to Number

console.log(5 % 2); //1
const isEven = n => n % 2 === 0;
console.log(isEven(8));
console.log(isEven(23));
console.log(isEven(514));

//console.log(document.querySelectorAll('.movements__row'));
labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});

/**
 * --------------- Numeric separators ---------------
 */
console.log('\n----- Numeric separators -----');
const diameter = 287_400_000_000;
console.log(diameter);

const price = 345_99;
console.log(price);

const transferFee1 = 15_00;
const transferFee2 = 1_500;

const PI = 3.1415;
console.log(PI);

console.log(Number('230_000'));
console.log(parseInt('230_000'));

/**
 * --------------- Big Int ---------------
 */
console.log('\n----- Big Int -----');
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);

console.log(48928472920383394893n);
console.log(BigInt(483948575));

//Operations
console.log(10000n + 10000n);
console.log(2332049238021300n * 302323n);

const huge = 3239232834234423n;
const num = 23;
//console.log(huge * num); throw an error(BigInt cant work with other types), instead
console.log(huge * BigInt(num));

//Exceptions - for below operations(logical & string concats) bigint can work with other types
console.log(20n > 15);
console.log(20n === 20); //strict operator cant do type coercion
console.log(typeof 20n);
console.log(20n == '20');

/**
 * --------------- Creating Dates ---------------
 * Dates can be created in 4 ways
 */
console.log('\n----- Creating Dates -----');
//Create a date
const now1 = new Date();
console.log(now1);

console.log(new Date('Aug 01 2022 14:54:17'));
console.log(new Date('December 24, 2015'));
console.log(new Date(account1.movements[0]));

console.log(new Date(2037, 10, 19, 15, 23, 5)); //y, m, d, h, min, s
console.log(new Date(2037, 10, 31)); //JS prints correct date even if we pass wrong date

console.log(new Date(0)); //0 mlsec from utc creation which is 1970
console.log(new Date(3 * 24 * 60 * 60 * 1000)); //3 days after UTC creation

//Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay()); //4 - is the 4th day of the week
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.getTime());

console.log(new Date(2142285780000));

console.log(Date.now());

future.setFullYear(2040);
console.log(future);

console.log(+future);
const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const days1 = calcDaysPassed(new Date(2037, 4, 14), new Date(2037, 4, 24));
console.log(days1, typeof days1);
const td_tm = calcDaysPassed(new Date('2022-07-31T10:51:36.790Z'), new Date());
console.log(td_tm);

console.log('\n----- Number formatting -----');
const numm = 3447643.23;
const options1 = {
  //style: 'unit',
  //unit: 'mile-per-hour',
  style: 'currency',
  currency: 'EUR',
  //useGrouping: false, //will remove the separators when set to false
};
console.log('US:      ', new Intl.NumberFormat('en-US', options1).format(numm));
console.log('Germany: ', new Intl.NumberFormat('de-DE', options1).format(numm));
console.log('Syria:   ', new Intl.NumberFormat('ar-SY', options1).format(numm));

console.log('\n----- SetTimeOut & SetInterval -----');
//SetTimeOut
const ingredients = ['Olives', 'Spinach'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza 🍕 with ${ing1} & ${ing2}`),
  3000,
  ...ingredients
);
console.log('Waiting...');

if (ingredients.includes('Spinach')) clearTimeout(pizzaTimer);

//SetInterval
// setInterval(() => {
//   const now = new Date();
//   console.log(`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);
// }, 1000);
