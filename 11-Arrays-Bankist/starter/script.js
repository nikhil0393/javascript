/**Simple array methods(Slice, Splice, Reverse, Concat, Join, At)
 * ForOf and ForEach in Arrays
 * Bankist app
 * Array methods
 * Map, Filter, Reduce methods - Line385
 * FindIndex - Line 310
 * FIND method - 493
 * SOME & EVERY methods
 * FLAT & FLATMAP methods -Line 517
 */
'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////

// LECTURES

/*const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);*/

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr);
/**========== Simple Array methods ==========
 * other methods are push(), unshift, pop, shift, indexof, includes
 */
//SLICE - returns new array, doesn't mutate the original array
console.log('=====SLICE=====');
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
console.log(arr.slice()); //creates shallow copy of array, can be done using spread operator as well
console.log([...arr]);

//SPLICE - it mutates the original array
console.log('=====SPLICE=====');
//console.log(arr.splice(2));
const arrSpliced = arr.splice(-1);
console.log(arrSpliced);
console.log(arr);
arr.splice(1, 2); //2nd argument is no of the elements to be removed
console.log(arr);

//REVERSE - mutates original array
console.log('=====REVERSE=====');
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

//CONCAT
console.log('=====CONCAT=====');
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

//JOIN
console.log('=====JOIN=====');
console.log(letters.join(' - '));

//AT - this also works for Strings
console.log('=====AT=====');
const arr3 = [23, 11, 64];
console.log(arr3[0]);
console.log(arr3.at(0));
//different ways of retrieving last element of an array
console.log(arr3[arr3.length - 1]);
console.log(arr3.slice(-1)[0]);
console.log(arr3.at(-1));
console.log('nikhil'.at(0)); //can be used for String also
console.log('nikhil'.at(-1));

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log('\n=====for of loop=====');
for (const [i, movement] of movements.entries()) {
  if (movement > 0) console.log(`Movement ${i}: You deposited ${movement}`);
  else console.log(`Movement ${i}: You withdrew ${Math.abs(movement)}`);
}

//FOREACH method - we cannot use break/continuous in forEach method as we can do in 'for of' loop
console.log('\n----- FOREACH method in Array -----');
movements.forEach(function (mov, i, arr) {
  if (mov > 0) console.log(`Movement ${i}: You deposited ${mov}`);
  else console.log(`Movement ${i}: You withdrew ${Math.abs(mov)}`);
});

//FOREACH method in Maps
console.log('\n----- FOREACH method in Map -----');
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

/**In forEach method for Sets 1st & 2nd arguments points to current element only */
console.log('\n----- FOREACH method in Set -----');
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'Eur', 'GBP']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, key, set) {
  console.log(`${key}: ${value}`);
});

// BANKIST APP
console.log('\n----- BANKIST APP -----');
/////////////////////////////////////////////////
// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

//Display movements function
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  /** Here we are sorting movements when Sort argument is true else showing movements withour sorting
   * When sorting first we are creating shallow copy using slice(), instead of mutating the original
   * Then we created click functon below to */
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//Displaying balance function
const calcDisplayBalance = function (accnt) {
  accnt.balance = accnt.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${accnt.balance} €`;
};

//Display Summary function
const calcDisplaySummary = function (acc) {
  const deposits = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${deposits}€`;

  const withdrawals = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(withdrawals)}€`;
  //calculating interest on deposists
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      //console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);
//console.log(accounts);

//Update UI
const updateUI = function (curAccnt) {
  //Display movements
  displayMovements(curAccnt.movements);
  //Display balance
  calcDisplayBalance(curAccnt);
  //Display summary
  calcDisplaySummary(curAccnt);
};

//Event Handlers- Implementing Login
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  //To prevent form button from submitting/reloading the page
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and a message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    //unhiding the body container
    containerApp.style.opacity = 100;
    //Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur(); //used to loose focus in pin field after login
    //Updating UI
    updateUI(currentAccount);
  }
});

//Implementing Transfers
btnTransfer.addEventListener('click', function (e) {
  //To prevent form button from submitting/reloading the page
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(amount, receiverAcc);
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    //Updating UI
    updateUI(currentAccount);
  }
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferTo.blur();
});

//Request LOAN using SOME method
btnLoan.addEventListener('click', function (e) {
  //To prevent form button from submitting/reloading the page
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //checking condition -if any deposits of current accnt are more than 10% of loan requested
    //then add amount to movements
    currentAccount.movements.push(amount);
    //and update the UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

//CLOSE account using findindex method
console.log('\n----- FINDINDEX method -----');
btnClose.addEventListener('click', function (e) {
  //To prevent form button from submitting/reloading the page
  e.preventDefault();
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    //Delete account
    accounts.splice(index, 1);
    //Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

//Sorting functionality using sort()
let sorted = false;
btnSort.addEventListener('click', function (e) {
  //To prevent form button from submitting/reloading the page
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
console.log('\n----- Coding Challenge #1 -----');
const checkDogs = function (dogsJulia, dogsKate) {
  console.log(`Julia Dogs before removing Cats ${dogsJulia}`);
  const juliaDogs = dogsJulia.slice(1, -2);
  const dogs = juliaDogs.concat(dogsKate);
  console.log(dogs);
  dogs.forEach(function (age, i) {
    if (age >= 3)
      console.log(`Dog number ${i + 1} is an adult, and is ${age} years old`);
    else console.log(`Dog number ${i + 1} is still a puppy`);
  });
};

const juliaData1 = [3, 5, 2, 12, 7];
const kateData1 = [4, 1, 15, 8, 3];
const juliaData2 = [9, 16, 6, 8, 3];
const kateData2 = [10, 5, 6, 1, 4];

console.log('\n----- Testdata-1 -----');
checkDogs(juliaData1, kateData1);
console.log('\n----- Testdata-2 -----');
checkDogs(juliaData2, kateData2);

/**========== Map, Filter, Reduce methods ==========
 * Map - returns new array containing the results of applying an operation on all original array elements
 * Filter - returns new array containing the array elements that passed a specified test condition
 * Reduce - boils('reduces') all array elements down to one single value(eg: adding all elements together)
 */

console.log('\n----- MAP method -----');
const movementsEUR = [200, 450, -400, 3000, -650, -130, 70, 1300];

const euroToUSD = 1.1;

const movementsUSD = movementsEUR.map(function (mov) {
  return mov * euroToUSD;
});

const movementsUSDArrow = movementsEUR.map(mov => mov * euroToUSD);

console.log(movementsEUR);
console.log(movementsUSD);
console.log(movementsUSDArrow);

const movementsUSDfor = [];
for (const mov of movementsEUR) {
  movementsUSDfor.push(mov * euroToUSD);
}
console.log(movementsUSDfor);

const movementsDescriptitons = movementsEUR.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescriptitons);

console.log('\n----- FILTER method -----');

const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

console.log('\n----- REDUCE method -----');
const balance = movements.reduce(function (acc, cur, i, arr) {
  console.log(`Iteration ${i} : ${acc}`);
  return acc + cur;
}, 0);
console.log(balance);

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

console.log('\n----- Coding Challenge #2 -----');
const calcAverageHumanAge = function (ages) {
  //Task-1
  const humanAge = ages.map(dogAge =>
    dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4
  );
  console.log(humanAge);
  //Task-2
  const majorDogs = humanAge.filter(function (dogHuman) {
    if (dogHuman >= 18) return dogHuman;
  });
  console.log(majorDogs);
  //Task-3
  const avgDogAge =
    majorDogs.reduce(function (acc, cur) {
      //console.log(`Acc: ${acc}; Cur: ${cur}`);
      return acc + cur;
    }, 0) / majorDogs.length;
  console.log(avgDogAge);
};

console.log([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
console.log([16, 6, 10, 5, 6, 1, 4]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

console.log('\n----- Coding Challenge #3 -----');
const calcAverageHumanAgeArrow = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

const avgHumanAge1 = calcAverageHumanAgeArrow([5, 2, 4, 1, 15, 8, 3]);
const avgHumanAge2 = calcAverageHumanAgeArrow([16, 6, 10, 5, 6, 1, 4]);
console.log(avgHumanAge1, avgHumanAge2);

console.log('\n----- FIND method -----');
/**
 * FIND method of Arrays helps to find an element which satisfies certain condition
 * Most useful use case of this method is finding an object from an array; eg below
 * Return type of find() is an single element not an array
 * It returns the first element that match the condition
 */

const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);
//In array of objects
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account); //here it returns an object whose owner is Jessica Davis
//Same using forof loop
for (const account of accounts) {
  if (account.owner === 'Jessica Davis') {
    console.log(account);
  }
}

console.log('\n----- SOME & EVERY methods -----');
console.log(movements);
//Includes method check for EQUALITY
console.log(movements.includes(-130));

//SOME: method checks for CONDITION and returns true if any of the elements satisfy the condition
console.log(movements.some(mov => mov === -130));
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

console.log('\n----- EVERY method -----');
//EVERY: method checks for CONDITION and returns true only if all elements satisfies the condition
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

//Separate callback - writing callback separately and using in methods
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

console.log('\n----- FLAT & FLATMAP method -----');
/**
 * FLAT is Used to combine array of arrays into 1 single array
 * For array of nested arrays argument needs to be provided in method for how deep methods need to Flat
 */
const arrFlat = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arrFlat.flat());
const arrFlatDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrFlatDeep.flat()); //default argument is 1
console.log(arrFlatDeep.flat(2));

//Using this method to call overall balance of all accounts
const accountMovements = accounts.map(acc => acc.movements);
console.log('accountMovements:: ', accountMovements);

const allMovements = accountMovements.flat();
console.log('allMovements:: ', allMovements);

const overallBalance = allMovements.reduce((acc, cur) => acc + cur, 0);
console.log(`Overall Balance : ${overallBalance}`);

//Above can be done using METHDO CHAINING as well, like below
const overallBalanceMethodChaining = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, cur) => acc + cur, 0);
console.log(
  `Overall Balance using MethodChaining : ${overallBalanceMethodChaining}`
);

//FLATMAP - flatMap cannot be used to flat nested array more than 1 level deep
const overallBalanceFlatMap = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, cur) => acc + cur, 0);
console.log(`Overall Balance using FLATMAP : ${overallBalanceFlatMap}`);

//SORTING Arrays
//Strings
console.log('\n----- SORTING Arrays -----');
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
//Numbers
console.log(movements);
console.log(movements.sort());
/** [-130, -400, -650, 1300, 200, 3000, 450, 70]
 * this doesnot sort the array as expected because it converts numbers to Strings and sorts
 */
//Instead should be done like below
//return < 0 to sort like A, B (keep order)
//return > 0 to sort like B, A (switch order)
movements.sort((a, b) => {
  if (a > b) return 1;
  if (b > a) return -1;
});
console.log('Ascending : ', movements); // this sorts Ascending t0 Descending

movements.sort((a, b) => {
  if (a > b) return -1;
  if (b > a) return 1;
});
console.log('Descending : ', movements); // this sorts Descending to Ascending

//Above 2 implmentations can be improvised like below
//Ascending to Descending
movements.sort((a, b) => a - b); //return +num  or -ve num
console.log('Ascending : ', movements);

//Descending to Ascending
movements.sort((a, b) => b - a);
console.log('Descending : ', movements);

console.log('\n----- More Array methods -----');
const arrFill = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));
//Empty arays + fill method
const x = new Array(7);
console.log(x);
x.fill(1, 3, 5); //fills 1 from index 3 to 5 (index 5 is not included) - [empty × 3, 1, 1, empty × 2]
console.log(x);
x.fill(1); //fills 1 for whole array
console.log(x);

arrFill.fill(23, 2, 6); //[1, 2, 23, 23, 23, 23, 7]
console.log('arrFill:: ', arrFill);

console.log('\n----- Array methods programatically -----');
//Array.from - creating Array programatically, second argument is like a map function
const y = Array.from({ length: 7 }, () => 1);
console.log('Array Y:: ', y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log('Array Z:: ', z);

const m = Array.from(
  { length: 100 },
  (_, i) => Math.trunc(Math.random() * 6) + 1
);
console.log('Array of 100 random num from 0 to 6::\n ', m);

labelBalance.addEventListener('click', function () {
  const movementUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => el.textContent.replace('€', '')
  );
  console.log(movementUI);
});

//Array methods practise
console.log('\n----- Array methods Practise -----');
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, cur) => acc + cur, 0);
console.log(`Bank Deposit Sum : ${bankDepositSum}`);

//2.
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000).length;
console.log(numDeposits1000);

const numDeposits1000Reduce = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);
console.log(numDeposits1000Reduce);

let a = 10;
console.log(a++);
console.log(a);
console.log(++a);

//3.
const sums = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      //cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      //Above statement can also be written as below statement
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(sums);

//4.
//this is a nice title -> This Is is Nice Title
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');
  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));

///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.



GOOD LUCK 😀
*/
//TEST DATA:
console.log('\n----- Coding Challenge #4 -----');
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
//Task-1
console.log('\n----- Task-1 -----');
let recommendedFood;
dogs.forEach(function (dog) {
  dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
});
console.log(dogs);

//Task-2
console.log('\n----- Task-2 -----');
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);
console.log(
  `Sarah's dog is eating too ${
    dogSarah.curFood > dogSarah.recommendedFood ? 'much' : 'little'
  }`
);

//Task-3
console.log('\n----- Task-3 -----');
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

//Task-4
console.log('\n----- Task-4 -----');
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

//Task-5
console.log('\n----- Task-5 -----');
//dogs.forEach(mov => howMuchDogEat(mov));
const anyDogEatingExactAmnt = dogs.some(
  dog => dog.curFood === dog.recommendedFood
);
console.log(anyDogEatingExactAmnt);

//Task-6
console.log('\n----- Task-6 -----');
const checkDogsEatingOkay = dog =>
  dog.curFood <= dog.recommendedFood * 1.1 &&
  dog.curFood >= dog.recommendedFood * 0.9;

const anyDogEatingRecmAmnt = dogs.some(checkDogsEatingOkay);
console.log(anyDogEatingRecmAmnt);

//Task-7
console.log('\n----- Task-7 -----');
const dogsEatingOkayAmnt = dogs.filter(checkDogsEatingOkay);
console.log(dogsEatingOkayAmnt);

//Task-8
console.log('\n----- Task-8 -----');
const dogsArray = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(dogsArray);
