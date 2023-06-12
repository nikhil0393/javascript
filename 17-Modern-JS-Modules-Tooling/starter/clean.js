'strict mode';
const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

/**--------------- IMMUTABILITY ---------------
 * An object can be made immutable using Object.freeze() - meaning cannot make any updates to that object props
 * Object.freeze() can only freeze top level props. If there are object inside an object, those can be mutated.
 */
console.log('\n----- %cIMMUTABILITY -----', 'font-size:14px;color:red');
const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});
spendingLimits.jay = 200; //will not get added as the Object is freezed
console.log('spendingLimits:: ', spendingLimits);

const getLimit = (limits, user) => limits?.[user] ?? 0;

//PURE FUNCTION
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  const cleanUser = user.toLowerCase();

  // const limit = spendingLimits[user] ? spendingLimits[user] : 0;//writing this statement using Optional chaining & Nullish coalising operator in getLimit()

  if (value <= getLimit(limits, cleanUser)) {
    // budget.push({ value: -value, description: description, user: user });
    //budget.push({ value: -value, description, user: cleanUser }); //Enhance object literal; if object property name is same as variable no need repeat it

    //budget.push will modify object which is outside this function meaning side effect(makes this function NOT PURE FUNC) which is not recommended, so instaed returning new array using SPREAD operator
    return [...state, { value: -value, description, user: cleanUser }];
  }
  return state;
};
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
console.log('newBudget1:: ', newBudget1);

const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');
console.log('newBudget2:: ', newBudget2);
console.log('newBudget3:: ', newBudget3);

const checkExpenses = function (state, limits) {
  // for (const entry of budget) {
  //   if (entry.value < -getLimit(limits, entry.user)) {
  //     entry.flag = 'limit';
  //   }
  // }
  return state.map(entry => {
    return entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry;
  });
};
checkExpenses(newBudget3);

const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log('finalBudget:: ', finalBudget);

//Displaying expenses bigger than number passed as argument
const logBigExpenses = function (state, bigLimit) {
  /*let output = '';
  for (const entry of budget) {
    // if (entry.value <= -bigLimit) {
    //   output += `${entry.description.slice(-2)} / `; // Emojis are 2 chars
    // }
    //Writing above if statement using ternary operator
    output +=
      entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : '';
  }
  output = output.slice(0, -2); // Remove last '/ '
  console.log(output);*/

  //Instead of doing above we can modify like below
  const bigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2))
    .join(' / ');
  console.log(bigExpenses);
};

logBigExpenses(finalBudget, 500);
