/**Destructuring Arrays
 * Destructuring Objects
 * Spread Operator
 * Rest pattern
 * Short Circuting
 * Nullish Coalescing Operator
 * for-of loop
 * Enhanced object literals (example in line no - 24 and 40)
 * Optional Chaining - Line 428
 * Looping objects: Object keys, values, entries
 * Sets
 * Maps
 * Strings and its methods
 */
'use strict';

// Data needed for first part of the section
//Below object is used in the next object as Enhanced object literal
const openingHours = {
  thu: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
  sun: {
    close: 24,
  },
};
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  //Enhanced object literal - which refers to object outside this object
  openingHours, //(use this when the openeingHours is written as separate object outside this object)

  //Enhanced object literal - no need to write function word
  // orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
  //   console.log(
  //     `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
  //   );
  // },
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },
  // orderDelivery: function (obj) {
  //   console.log(obj);
  // },
  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your pasta with ${ing1}, ${ing2}, ${ing3}`);
  },
  //Used in REST concept
  orderPizza: function (mainIngredients, ...otherIngrediants) {
    console.log(mainIngredients);
    console.log(otherIngrediants);
  },
};

restaurant.orderDelivery({
  starterIndex: 2,
  mainIndex: 0,
  address: '11-2-45 Bharathnagar, Siddipet',
  time: '9 am',
});

restaurant.orderDelivery({
  address: '29 Bear Paw, Irvine',
});

//================================ OBJECTs DESTRUCTURING ===============================================
console.log('\n======== OBJECTS DESTRUCTURING ==============');
//const { name, openingHours, categories } = restaurant;
//console.log(name, openingHours, categories);

//assigning different names to variables during destructuring
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;

console.log(restaurantName, hours, tags);
//default values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

//Mutating variables in object destructuring
let mv = 111;
let nv = 999;
const obj = { mv: 23, nv: 7, ov: 14 };
({ mv, nv } = obj);
console.log(mv, nv);

//Nested objects
const {
  fri: { open, close },
} = openingHours;
console.log(open, close);

//Destructuring
console.log('\n======== DESTRUCTURING OF ARRAYS ============');
const arr = [1, 2, 3];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr;
console.log(x, y, z);

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

//switching the variable values
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

//switching using destructuring
[main, secondary] = [secondary, main];
console.log(main, secondary);

//receive 2 return values from a function
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

//nested destructuring
const nested = [2, 4, [5, 6]];
const [p, , r] = nested;
console.log(p, r);
const [i, , [j, k]] = nested;
console.log(i, j, k);

//setting deafult values in destructuring
const [s, t, u] = [8, 9];
console.log(s, t, u); //8, 9, undefined

const [d = 1, e = 1, f = 1] = [8, 9];
console.log(d, e, f); //8, 9, 1

/*========================================== Spread Operator ===========================================
 *Spread operator is always right of assignment
 *Spread is used where we would write values separeted by commas
 *use case- to create new array; to pass mulitple values into a function
 *used to unpack the elements of an array
 *Spread operator doesn't create new variables
 *Iterables are arrays, strings, maps, sets but NOT objects
 */
console.log('\n====== Spread Operator =======');
const arr1 = [7, 8, 9];
const badArray = [1, 2, arr1[0], arr1[1], arr1[2]];
console.log(badArray);
const newArray = [1, 2, ...arr1];
console.log(newArray);
console.log(...newArray);
const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

//copy array
const mainMenuCopy = [...restaurant.mainMenu];

//join 2 arrays or more
const menu1 = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menu1);

//Iterables
const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters);
console.log(...str);
//console.log(`${...str} Schmedtmann`); ~= error(values separated vth commas cannot be used in templateliteral

//Can be used To pass an array in a method/function call-eg below
// const ingredients = [
//   prompt("let's make pasta! ingredient 1?"),
//   prompt('ingredient 2'),
//   prompt('ingredient 3'),
// ];

//console.log(ingredients);
//restaurant.orderPasta(...ingredients);

//From ES6 Spread can be used for objects also
const newRestaurant = { foundedIn: 1993, ...restaurant, founder: 'Mitch' };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name);

/*========================================= Rest pattern ==============================================
 *REST is always on left side of assignment
 *REST is used where we would write variables separated by commas
 *used to pack elements into an array, exactly opp to Spread
 *Used while destructuring
 */
console.log('\n====== Rest Pattern =======');
const [m, n, ...others] = [1, 2, 3, 4, 5];
console.log(m, n, others);

//SPREAD and REST used together below
const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

//Rest pattern in objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

//REST in functions
const addRest = function (...numbers) {
  let sumRest = 0;
  for (let i = 0; i < numbers.length; i++) {
    sumRest += numbers[i];
  }
  console.log(sumRest);
};
addRest(2, 3);
addRest(5, 3, 7, 2);
addRest(8, 2, 5, 3, 2, 1, 4);

const xRest = [23, 5, 7];
addRest(...xRest);

restaurant.orderPizza('mushrooms', 'onions', 'olives', 'spinach');
restaurant.orderPizza('mushrooms');

/*======================================= Short Circuting ==============================================
 *they can use ANY data type, return ANY data type
 *for OR operand first truthy value will be returned
 *we can use OR operand to set the default value
 *for AND - operand short circuits after the first falsy value as opp to OR
 *we can use AND operand to execute code in 2nd operand if the first one is true
 */
console.log('\n====== Short Circuting =======');
console.log('\n=== OR ===');
console.log(3 || 'Jonas'); //3
console.log('' || 'Jonas'); //Jonas
console.log(true || 0); //true
console.log(undefined || null); //null
console.log(undefined || 0 || '' || null || 'Hello' || 23); //hello

restaurant.numGuests = 23;
const guests2 = restaurant.numGuests || 10;
console.log(guests2); //23

restaurant.numGuests = 0;
const guests3 = restaurant.numGuests || 10;
console.log(guests3); //console prints 10 as restaurant.numGuests=0 which is falsy value

console.log('\n=== AND ===');
console.log(0 && 'Jonas'); //0
console.log(7 && 'Jonas'); //Jonas
console.log('Hello' && 23 && null && 'Jonas'); //null
//practical eg
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}

//restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');
restaurant.orderPizza2 && restaurant.orderPizza('mushrooms', 'spinach');
console.log(
  restaurant.orderPizza2 && restaurant.orderPizza('mushrooms', 'spinach')
);

//================================= Nullish Coalescing Operator ======================================
console.log('\n====== Nullish Coalescing Operator (??) =======');
//Nullish values: (null, undefined) and not include(0, '')
restaurant.numGuests = 0;
const guests4 = restaurant.numGuests ?? 10;
console.log(guests4); //console prints 0 as restaurant.numGuests=0 which is nullish value
console.log(restaurant.numGuests2 ?? 10); //prints 10 bcoz restaurant.numGuests2 is undefined which is nullish value

//================================= Logical assignment Operator ======================================
console.log('\n====== Logical assignment Operator =======');
const rest1 = {
  name: 'Capri',
  numGuests: 20,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

const rest3 = {
  name: 'Capri',
  numGuests: 0,
};

//OR assignment operator
console.log('OR assignment operator');
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10; can be written as below
rest1.numGuests ||= 10;
rest2.numGuests ||= 10;
console.log(rest1.numGuests);
console.log(rest2.numGuests);

//Nullish assignment operator (null or undefined)
console.log('Nullish assignment operator');
rest2.numGuests ??= 10;
rest3.numGuests ??= 10;
console.log(rest2.numGuests);
console.log(rest3.numGuests);

//AND assignment operator
console.log('AND assignment operator');
// rest1.owner = rest1.owner && '<ANONYMOUS>'; //prints 'undefined'
// rest2.owner = rest2.owner && '<ANONYMOUS>'; //prints 'ANONYMOUS'
//Above 2 statements can be written as below
rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';
console.log(rest1, rest2);

//Coding Challenge 1
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

console.log('\n========== SECTION 9 CODING CHALLENGE 1 ============');
//Question-1
const [players1, players2] = game.players;
console.log(players1);
console.log(players2);

//Question-2
const [gk_team1, ...fieldPlayers_team1] = players1;
console.log(gk_team1);
console.log(fieldPlayers_team1);

//Question-3
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

//Question-4
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Periscic'];
console.log(players1Final);

//Question-5
const { team1, x: draw, team2 } = game.odds;
console.log(team1, draw, team2);

//Question-6
const printGoals = function (...playerNames) {
  console.log(playerNames);
  console.log(`${playerNames.length} goals were scored`);
};
printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals('Davies', 'Muller');
printGoals(...game.scored);

//Question-7
team1 < team2 && console.log('Team1 is more likely to win');
team1 > team2 && console.log('Team2 is mroe likely to win');

/*========================================== for-of loop =============================================
 *
 */
console.log('\n========== for-of loop ============');
const menu2 = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu2) console.log(item);

for (const [i, el] of menu2.entries()) {
  console.log(`${i + 1} : ${el}`);
}

//======================================== Optional Chaining ==========================================
console.log('\n======== Optional Chaining ===========');
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);
//above statement in if doesn't print anything if the 'open' property doesn't exist
//console.log(restaurant.openingHours.mon.open);
//above console statement throws errors if the 'open' property doesn't exist
//Instead of if condition it can be written as below with Optional Chaining
console.log(restaurant.openingHours?.mon?.open); //prints undefined instead of throwing error
console.log(restaurant.openingHours?.sun?.open); //undefined

//Example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed'; //using nullish instead of OR to avoid undefined for 0 value on sat
  console.log(`On ${day}, we open at ${open}`);
}

//Optional chaining in Methods
console.log(restaurant.order?.(0, 1) ?? 'Method doesnt exist');
console.log(restaurant.orderRissotto?.(0, 1) ?? 'Method doesnt exist');

//Optional chaining in arrays
const users = [{ name: 'Nick', email: 'hello@nick.com' }];
console.log(users[0]?.name ?? 'user array empty');
console.log(users[1]?.name ?? 'user array empty');

//======================================== Objects looping =============================================
console.log('\n======== Objects looping ===========');
//Object KEYS looping
const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We are open ${properties.length} days : `;

for (const day of properties) {
  openStr += `${day}, `;
}
console.log(openStr);

//Object VALUES looping
const values = Object.values(openingHours);
console.log(values);

//Looping Entire OBJECT
const entries = Object.entries(openingHours);
console.log(entries);

for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}

/**const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
}; */
console.log('\n========== SECTION 9 CODING CHALLENGE 2 ============');
//Question 1
console.log('\n===== Question-1 =====');
for (const [goal, player] of game.scored.entries()) {
  console.log(`Goal ${goal + 1} : ${player}`);
}

//Question-2
console.log('\n===== Question-2 =====');
const oddsArray = Object.values(game.odds);
console.log('oddsArray: ', oddsArray);
let sumOdds = 0;
let avgOdds;
for (const odds of oddsArray) {
  sumOdds += odds;
}
avgOdds = sumOdds / oddsArray.length;
console.log(`Avg of odds: ${avgOdds}`);

//Question-3
console.log('\n===== Question-3 =====');
const gameOdds = Object.entries(game.odds);
console.log(gameOdds);
for (const [team, odd] of gameOdds) {
  const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
  console.log(`Odd of ${teamStr}: ${odd}`);
}

//Question-4
console.log('\n===== Question-4 =====');
/*const scorers = {
  Gnarby: 1,
  Hummels: 1,
  Lewandowski: 2,
};*/
// So the solution is to loop over the array, and add the array elements as object properties, and then increase the count as we encounter a new occurence of a certain element
const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
  console.log(scorers);
}
console.log(scorers);

/*================================================ SETS ================================================
 *Collection of unique values, can hold mixed datatypes
 *order of elements doesnt matter
 *main use case of Set is usually to remove duplicates from arrays
 */
console.log(
  '\n=================================== SETS ========================================='
);
const ordersSet = new Set(['Pasta', 'Pizza', 'Pizza', 'Riso', 'Pasta']); //pass any iterable in Set, here it is array
console.log(ordersSet); // prints only unique elements from array

console.log(new Set('String')); //here iterable is String
console.log(ordersSet.size);
console.log(ordersSet.has('Pizza')); //true
console.log(ordersSet.has('Bread')); //false
ordersSet.add('Garlic Bread');
ordersSet.add('Risotto');
//ordersSet.clear(); //this deletes all elements in Set

for (const order of ordersSet) console.log(order);
//converting set to an array
const ordersUnique = [...new Set(ordersSet)];
console.log(ordersUnique);
const staff = ['waiter', 'chef', 'manager', 'waiter', 'manager', 'chef'];
const staffUnique = [...new Set(staff)];
console.log(staffUnique);
console.log(new Set('jonasschmedtmann').size);

/*================================================= MAPS ==============================================
 *It is used store in keys value pairs similar to Objects
 *But keys in objects are always Strings where as keys in Maps can be anything like even an object/array
 */
console.log(
  '\n=================================== MAPS ========================================'
);
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenz, Italy');
console.log(rest.set(2, 'Lisbon, Portugal'));
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :(');

console.log(rest.get('name'));
console.log(rest.get(true));

const time = 8;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

console.log(rest.has('categories'));
rest.delete(2);
//rest.clear(); will delete all elements
console.log(rest);
console.log('MAP SIZE : ', rest.size);

/*Below get method will not work bcoz here set and get are not pointing to same key, so to make it work assign array to a avriable first and use variable as the key like shown below
rest.set([1, 2], 'Test');
console.log(rest);
console.log(rest.get([1, 2]));
*/
const arr12 = [1, 2];
rest.set(arr12, 'Test');
console.log(rest.get(arr12));
rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);
console.log(rest.size);

const question = new Map([
  ['question', 'What is the best programming language?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try again!'],
]);
console.log(question);

//Convert object to map
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);
//Quiz app
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key} : ${value}`);
}
const answer = 3;
//const answer = Number(prompt('Your answer'));
console.log(answer);
console.log(question.get(question.get('correct') === answer));

//convert map to array
console.log([...question]);
console.log(question.entries());
console.log([...question.keys()]);
console.log(question.values());

//Coding Challenge
const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

console.log('\n========== SECTION 9 CODING CHALLENGE 3 ============');
//Question-1
console.log('\n===== Question-1 =====');
const events = [...gameEvents.values()];
console.log(events);
const uniqueGameEvents = [...new Set(events)];
console.log(uniqueGameEvents);

//Question-2
console.log('\n===== Question-2 =====');
gameEvents.delete(64);
console.log(gameEvents);

//Question-3
console.log('\n===== Question-3 =====');
const gameTime = [...gameEvents.keys()].pop();
console.log(gameTime);
console.log(
  `An event happened, on average, every ${gameTime / gameEvents.size} minutes`
);

//Question-4
console.log('\n===== Question-4 =====');
for (const [min, eve] of gameEvents.entries()) {
  const timePeriod = min <= 45 ? 'FIRST' : 'SECOND';
  console.log(`[${timePeriod} HALF] ${min} : ${eve}`);
}

/*=============================================Working with STRINGS=====================================*/
console.log(
  '\n============================ STRINGS ==================================='
);
const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]); //A
console.log(plane[1]); //3
console.log(plane[2]); //2
console.log('B380'[0]);
console.log(airline.length);
console.log('B727'.length);

console.log(airline.indexOf('r')); //6 - first 'r' occurence
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('Portugal'));
//console.log(airline.lastIndexOf('Portugal'));

//SLICE
console.log(airline.slice(4)); //Air Portugal - extracts string from index 4 and prints
console.log(airline.slice(4, 7)); //2nd index value is not included

console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));

console.log(airline.slice(-2));
console.log(airline.slice(1, -1));

//Fixing capitalization
console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

const passenger = 'jOnAS';
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

const email = 'helo@nikhil.io';
const loginEmail = ' Helo@NikhiL.io \n';
console.log(email);
const correctEmail = loginEmail.toLowerCase().trim();
console.log(correctEmail);

//replacing content
const priceGB = '288,70#';
const priceUS = priceGB.replace('#', '$').replace(',', '.');
console.log(priceUS);

const announcement =
  'All passengers please come to Boarding door 23. Boarding door 23!';
console.log(announcement.replaceAll('door', 'gate'));
console.log(announcement.replace(/door/g, 'gate')); //alternate way of replaceAll using reg expressions

//Booleans
const airplane = 'Airbus A320neo';
console.log(airplane.includes('A320'));
console.log(airplane.includes('Boeing'));
console.log(airplane.startsWith('A'));

if (airplane.startsWith('Air') && airplane.endsWith('neo')) {
  console.log('Part of new Airbus family');
}
//Practise exercise
const checkBaggae = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are NOT allowed on board');
  } else {
    console.log('Welcome aboard!!');
  }
};
checkBaggae('I have a laptop, some Food and a pocket Knife');
checkBaggae('Socks and camera');
checkBaggae('Got some snacks and a gun for protection');

//SPLIT and JOIN
console.log('a+very+nice+string'.split('+'));
console.log('Sai Nikhil Myana'.split(' '));
console.log(['Sai', 'Nikhil', 'Myana'].join(' '));
const [firstName, lastName] = 'Nikhil Myana'.split(' ');
const newName = ['Mr', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];
  for (const n of names) {
    //namesUpper.push(n[0].toUpperCase() + n.slice(1));
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(' '));
};
capitalizeName('Jessica ann smith davis');

//Padding
const message = 'Go to gate 23!';
console.log(message.padStart(20, '+').padEnd(30, '+'));
console.log('Nikhil'.padStart(20, '+').padEnd(30, '+'));

const maskCreditCard = function (number) {
  const creditString = number + '';
  const length = creditString.length;
  // const lastFour = creditString.slice(-4);
  console.log(creditString.slice(-4).padStart(length, '*'));
};

maskCreditCard(987654321);
maskCreditCard('1234567890');

//Repeat
const message2 = 'Bad weather... All Departures Delayed... ';
console.log(message2.repeat(3));

const plansInLine = function (n) {
  return `There are ${n} planes in line ${'✈'.repeat(n)}`;
};
console.log(plansInLine(3));

//CODING CHALLENGE 4
console.log('\n========== CODING CHALLENGE 4 ============');
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

/**
underscore_case
  first_name
Some_Variable
   calculate_AGE
delayed_departure
 */
document.querySelector('button').addEventListener('click', function () {
  const text = document
    .querySelector('textarea')
    .value.toLowerCase()
    .split('\n');
  console.log(text);
  let i = 1;
  for (const output of text) {
    //const result = output.split('_').join('').trim().padEnd(20, ' ');
    const [first, second] = output.split('_');
    const newOutput = [
      first,
      second.replace(second[0], second[0].toUpperCase()),
    ]
      .join('')
      .trim()
      .padEnd(20, ' ');
    console.log(`${newOutput}${'✅'.repeat(i)}`);
    i++;
  }
});
//CODING CHALLENGE
console.log('\n========== CODING CHALLENGE ============');
// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

//console.log(flights.split('+'));
const getFlightCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  const details = `${type.startsWith('_Delayed') ? '⛔' : ' '}${type
    .replaceAll('_', '')
    .trim()} from ${getFlightCode(from)} to ${getFlightCode(
    to
  )} (${time.replace(':', 'h')})`.padStart(50, '-');
  console.log(details);
}
