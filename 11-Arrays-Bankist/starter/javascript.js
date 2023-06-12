/**Simple array methods(Slice, Splice, Reverse, Concat, Join, At)
 * ForOf and ForEach in Arrays
 * Bankist app
 *
 */
'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////

// LECTURES

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
let arr = ['a', 'b', 'c', 'd', 'e'];

//SLICE method
console.log('SLICE METHOD');
console.log(arr.slice(2));
console.log(arr.slice(2, 4)); //index at 2nd parameter will not be included in new array
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2)); //index at 2nd parameter will not be included in new array
console.log(arr.slice()); //creates shallow array meaning same array
console.log([...arr]); //creates shallow array meaning same array

//SPLICE method
console.log('\nSPLICE METHOD');
arr.splice(-1);
console.log(arr);
arr.splice(1, 2); //In splice 2nd parameter is no of elements to be retrieved from actual array
console.log(arr);
arr.splice(0, 1);
console.log(arr);

//REVERSE method
console.log('\nREVERSE METHOD');
arr = ['a', 'b', 'c', 'd', 'e'];
const arr1 = ['j', 'g', 'h', 'i', 'f'];
console.log(arr1.reverse()); //this method mutates actual array
console.log(arr1);

//CONCAT
console.log('\nCONCAT METHOD');
const letters = arr.concat(arr1); //can also be achievd using SPREAD operator
console.log(letters);
console.log([...arr, ...arr1]);

//JOIN method
console.log('\nJOIN METHOD');
console.log(letters.join(' - '));

//AT method
console.log('\nAT METHOD');
const arr2 = [23, 11, 56];
console.log(arr2[0]);
console.log(arr2.at(0));
//getting last element from array in diff ways
console.log(arr2[arr2.length - 1]);
console.log(arr2.slice(-1)[0]);
console.log(arr2.at(-1));
//can be used for String also
console.log('Nikhil'.at(0));
console.log('Nikhil'.at(-1));

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

console.log('\n=== USING FOR OF ===');
// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i}: You withdrew ${Math.abs(movement)}`);
  }
}

console.log('\n=== USING FOR EACH IN ARRAYS ===');
movements.forEach(function (mov, index, array) {
  if (mov > 0) {
    console.log(`Movement ${index}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${index}: You withdrew ${Math.abs(mov)}`);
  }
});

console.log('\n=== FOR EACH in MAP ===');
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key} : ${value}`);
});

console.log('\n=== FOR EACH in SET ===');
const currenciesUnique = new Set(['USD', 'EUR', 'GBP', 'EUR', 'USD']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _value, set) {
  console.log(`${value} : ${_value}`);
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

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

const displayElements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
                     <div class="movements__type movements__type--${type}">${i} ${type}</div>
                     <div class="movements__value">${mov}</div>
                   </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayElements(account1.movements);

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce(function (acc, mov) {
    return acc + mov;
  }, 0);
  labelBalance.textContent = `${balance} EUR`;
};
calcDisplayBalance(account1.movements);

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(user => user[0])
      .join('');
  });
};
createUsernames(accounts);
console.log(accounts);

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

console.log('=====Coding Challenge #1=====');

const checkDogs = function (dogsJulia, dogsKate) {
  const actualDogsJulia = dogsJulia.slice();
  actualDogsJulia.splice(-2);
  actualDogsJulia.splice(0, 1);
  console.log(actualDogsJulia);
  const dogs = actualDogsJulia.concat(dogsKate);
  console.log(dogs);
  dogs.forEach(function (mov, i) {
    mov >= 3
      ? console.log(`Dog number ${i + 1} is an adult, and is ${mov} years old`)
      : console.log(`Dog number ${i + 1} is still a puppy 🐶`);
  });
};
const dogsJulia1 = [3, 5, 2, 12, 7];
const dogsKate1 = [4, 1, 15, 8, 3];
const dogsJulia2 = [9, 16, 6, 8, 3];
const dogsKate2 = [10, 5, 6, 1, 4];
checkDogs(dogsJulia1, dogsKate1);
checkDogs(dogsJulia2, dogsKate2);

console.log('\n===============MAP method===============');
const euroToUSD = 1.1;
const movementsUSD = movements.map(function (mov) {
  return mov * 1.1;
});
console.log(movements);
console.log(movementsUSD);

//USING ARROW function
const movementsUSDArrow = movements.map(mov => mov * 1.1);
console.log(movementsUSDArrow);

//Using FOR-OF instead of MAP
const movementsUSDfor = [];
for (const mov of movements) {
  movementsUSDfor.push(mov * euroToUSD);
}
console.log(movementsUSDfor);

const movementsDescriptons = movements.map(function (mov, index, arr) {
  if (mov > 0) {
    return `Movement ${index}: You deposited ${mov}`;
  } else {
    return `Movement ${index}: You withdrew ${Math.abs(mov)}`;
  }
});
console.log(movementsDescriptons);

console.log('\n===============FILTER method===============');
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

//Using FOR-OF instead of FILTER
const depositsFor = [];
for (const mov of movements) {
  if (mov > 0) depositsFor.push(mov);
}
console.log(depositsFor);

const withdrawals = movements.filter(function (mov) {
  return mov < 0;
});
console.log(withdrawals);
const withdrawalsMap = movements.map(function (mov) {
  return mov < 0;
});
console.log(withdrawalsMap);

console.log('\n===============REDUCE method===============');
const balance = movements.reduce(function (acc, cur, i, arr) {
  console.log(`Iteration ${i} : ACC - ${acc}, CUR - ${cur}`);
  return acc + cur;
}, 0);
console.log(`Balance - ${balance}`);

//Max value in array eg using REDUCE
const maxValue = movements.reduce(function (acc, cur) {
  if (acc > cur) return acc;
  else return cur;
}, movements[0]);
console.log(maxValue);

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

console.log('=====Coding Challenge #2=====');
const calcAverageHumanAge = function (ages) {
  const humanYears = ages.map(function (age) {
    if (age <= 2) return 2 * age;
    else return 16 + age * 4;
  });
  console.log(humanYears);

  const dogsAbove_18HumanYears = humanYears.filter(function (humanAge) {
    return humanAge >= 18;
  });
  console.log(dogsAbove_18HumanYears);

  const sumOfHumanAge = dogsAbove_18HumanYears.reduce(
    (acc, cur) => acc + cur,
    0
  );
  console.log(sumOfHumanAge);
  const avgOfHumanAge = sumOfHumanAge / dogsAbove_18HumanYears.length;
  console.log(avgOfHumanAge);
};
console.log('TEST DATA-1');
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
console.log('TEST DATA-2');
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
