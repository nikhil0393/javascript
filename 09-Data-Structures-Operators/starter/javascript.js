/**Destructuring Arrays
 * Destructuring Objects
 * Spread Operator
 * Rest pattern
 * Short Circuting
 * Nullish Coalescing Operator
 * for-of loop
 * Enhanced object literals (example in line no - 24 and 40)
 * Optional Chaining
 * Sets
 * Maps
 * Strings and its methods
 */
'use strict';

// Data needed for first part of the section
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
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj);
console.log(a, b);

//Destructuring
console.log('\n======== DESTRUCTURING OF ARRAYS ============');
const arr = [1, 2, 3];
const a1 = arr[0];
const b1 = arr[1];
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

//========================================== Spread Operator ===========================================
console.log('\n====== Spread Operator =======');
const arr1 = [7, 8, 9];
const badArray = [1, 2, arr1[0], arr1[1], arr1[2]];
console.log(badArray);
const newArray = [1, 2, ...arr1];
console.log(newArray);
console.log(...newArray);

//copy array
const mainMenuCopy = [...restaurant.mainMenu];

//join 2 arrays
const menu1 = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menu1);

// const ingredients = [
//   prompt("let's make pasta! ingredient 1?"),
//   prompt('ingredient 2'),
//   prompt('ingredient 3'),
// ];

//console.log(ingredients);
//restaurant.orderPasta(...ingredients);

//========================================= Rest pattern ==============================================
console.log('\n====== Rest Pattern =======');
const [m, n, ...others] = [1, 2, 3, 4, 5];
console.log(m, n, others);

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

//Rest pattern in objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

//======================================= Short Circuting ==============================================
console.log('\n====== Short Circuting =======');
console.log('\n=== OR ===');
console.log(3 || 'Jonas');
console.log('' || 'Jonas');
console.log(true || 0);
console.log(undefined || null);
console.log(undefined || 0 || '' || 'Hello' || 23 || null);

restaurant.numGuests = 23;
const guests2 = restaurant.numGuests || 10;
console.log(guests2); //23

restaurant.numGuests = 0;
const guests3 = restaurant.numGuests || 10;
console.log(guests3); //console prints 10 as restaurant.numGuests=0 which is falsy value

console.log('\n=== AND ===');
console.log(0 && 'Jonas');
console.log(7 && 'Jonas');
console.log('Hello' && 23 && null && 'Jonas');

//================================= Nullish Coalescing Operator ======================================
console.log('\n====== Nullish Coalescing Operator (??) =======');
//Nullish values: (null, undefined) and not include(0, '')
restaurant.numGuests = 0;
const guests4 = restaurant.numGuests ?? 10;
console.log(guests4); //console prints 0 as restaurant.numGuests=0 which is nullish value

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

//Coding Challenge
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
//Question 1
const [players1, players2] = game.players;
console.log(players1, players2);

//Question 2
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

//Question 3
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

//Question 4
const players1Final = ['Thiago', 'Coutinho', 'Perisic', ...players1];
console.log(players1Final);

//Question 5
// const { team1, team2, x: draw } = game.odds;
// console.log(team1, team2, draw);
//or
const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, team2, draw);

//Question 6
const printGoals = function (...playerNames) {
  console.log(`${playerNames} and the total score is ${playerNames.length}`);
};
printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals(...game.scored);

//Question 7
team1 < team2 && console.log('team 1 is likely to win');
team1 > team2 && console.log('team 2 is likely to win');

//========================================== for-of loop =============================================
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

//Example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed'; //using nullish instead or OR
  console.log(`On ${day}, we open at ${open}`);
}

//Optional chaining in Methods
console.log(restaurant.order?.(0, 1) ?? 'Method doesnt exist');
console.log(restaurant.orderRissotto?.(0, 1) ?? 'Method doesnt exist');

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

console.log('\n========== SECTION 9 CODING CHALLENGE 2 ============');
//Question 1
for (const [num, name] of game.scored.entries()) {
  console.log(`Goal ${num + 1} : ${name}`);
}

//Question 2
const oddValues = Object.values(game.odds);
console.log(oddValues);
let sum = 0;
for (const y of oddValues) {
  sum += y;
}
const avg = sum / oddValues.length;
console.log(avg);

//Question 3

const l = Object.values(game.odds);
console.log(l);
const g = Object.entries(game.odds);
for (const [team, odd] of g) {
  const teamStr = team === x ? 'draw' : `victory ${game[team]}`;
  console.log(`Odd of ${teamStr} : ${odd}`);
}

//================================================ SETS ================================================
console.log('\n========== SETS ============');
const ordersSet = new Set(['Pasta', 'Pizza', 'Pizza', 'Riso', 'Pasta']); //pass any iterable in Set, here it is array
console.log(ordersSet); // prints only unique elements from array

console.log(new Set('String')); //here iterable is String
console.log(ordersSet.size);
console.log(ordersSet.has('Pizza'));
ordersSet.add('Garlic Bread');
ordersSet.add('Risotto');
//ordersSet.clear(); //this deletes all elements in Set

for (const order of ordersSet) console.log(order);
//convert set to an array
const ordersUnique = [...new Set(ordersSet)];
console.log(ordersUnique);

//================================================= MAPS ==============================================
console.log('\n========== MAPS ============');
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenz, Italy');
console.log(rest.set(2, 'Lisbon, Portugal'));
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are close :(');

console.log(rest.get('name'));
console.log(rest.get(true));

const time = 14;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

console.log(rest.has('categories'));
rest.delete(2);
//rest.clear(); will delete all elements

const arr12 = [1, 2];
rest.set(arr12, 'Test');
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

//convert object to map
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
console.log(question.keys());
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

//Question 1
const arrayGE = [...gameEvents];
console.log(gameEvents.keys());
console.log(gameEvents.values());
const eventsSet = new Set(gameEvents.values());
//console.log(events);
const events = [...eventsSet];
console.log(events);

//Question 2

//Question 3

//Question 4
for (const [time, events] of gameEvents.entries()) {
  const zone = time <= 45 ? 'FIRST' : 'SECOND';
  console.log(`[${zone} HALF] ${time}: ${events}`);
}

//=============================================Working with STRINGS=====================================
const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log('B380'[0]);
console.log(airline.length);
console.log('B727'.length);

console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('Portugal'));
//console.log(airline.lastIndexOf('Portugal'));

console.log(airline.slice(4)); //takes index of String
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
console.log(announcement.replace(/door/g, 'gate'));

//Booleans
const airplane = 'Airbus A320neo';
console.log(airplane.includes('A320'));
console.log(airplane.includes('Boeing'));
console.log(airplane.startsWith('A'));

if (airplane.startsWith('Air') && airplane.endsWith('neo')) {
  console.log('Part of new Airbus family');
}

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
const plansInLine = function (n) {
  return `There are ${n} planes in line ${'✈'.repeat(n)}`;
};
console.log(plansInLine(3));

//CODING CHALLENGE 4
console.log('\n========== CODING CHALLENGE 4 ============');
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));
//const text = document.querySelector('textarea').value;

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  //const newText = text.slice(text[0], text.indexOf('_'));
  const textArray = text.split('\n');
  console.log(textArray);
  for (const [i, textValue] of textArray.entries()) {
    const trimText = textValue.toLowerCase().trim();
    const firstHalf = trimText.slice(trimText[0], trimText.indexOf('_'));
    const scndHalf = trimText.slice(trimText.indexOf('_') + 1);
    const scndUpper = scndHalf.replace(scndHalf[0], scndHalf[0].toUpperCase());
    //console.log(firstHalf + scndUpper);
    //2nd sol
    const [first, second] = textValue.toLowerCase().trim().split('_');
    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`);
  }
});

//CODING CHALLENGE
console.log('\n========== CODING CHALLENGE ============');
// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

console.log(flights.split('+'));
for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  const output = `${type.startsWith('_Delayed') ? '⛔' : ''}${type.replaceAll(
    '_',
    ' '
  )} from ${from.slice(0, 3).toUpperCase()} to ${to
    .slice(0, 3)
    .toUpperCase()} (${time.replace(':', 'h')})`;
  //console.log(output.length);
  console.log(output.padStart(43));
}
