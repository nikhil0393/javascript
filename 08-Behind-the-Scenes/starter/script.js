/*Javascript Engine and runtime;
Execution context and call stack;
Scope and the Scope chain;
Variable environment: Hoisting and TDZ; 
this keyword
Regular functions vs Arrow functions*
Primitives vs Reference types/
'use strict';

/*JAVASCRIPT ENGINE AND RUNTIME
-JS Engine is a program which executes JS code, every browser has its JS engine
-Google has V8 engine
-JS engine has Callstack(where code is executed) and Heap
-Callstack(where code is executed) using Execution context
-Heap is unstructured memory location which stores objects

*/
function calcAge(birthYear) {
  const age = 2037 - birthYear;
  console.log(firstName);
  return age;
}

/*let age = 30;
let oldAge = age;
oldAge = 31;
console.log(age);
console.log(oldAge);*/
const firstName = 'Nikhil';
calcAge(1993);

/**EXECUTION CONTEXT AND CALL STACK
 *Global execution context will be created for top level code (means code not inside a function).
 *For every function call and method a EXECUTION CONTEXT will be created
 *All ECs together make a Call Stack
 *Inside EC - Variable env, Scope chain, this keyword
 *Variable env - let, const & var declarations; functions; arguments object
 *Arrow func don't get arguments object, this keyword
 */

/**SCOPE AND THE SCOPE CHAIN
 *Global, function and block scopes
 *let, const - block scoped and var - function scoped
 *
 */

/*VARIABLE ENVIRONMENT: HOISTING AND TDZ
-Execution context contains 3 things Variable environment, Scope chain and this keyword
-Hoisting makes some variables to be accessed even b4 they are declared, means - b4 execution, code is scanned for variable declaration, for each variable a new property is created in Variable environment object
-TDZ introduced in ES6 to make it easier to avoid and catch errors
-Any variable set to 'var' will be Hoisted and set to undefined
-Temporary dead zone(TDZ) for let, const variables starts from the begining of current scope untill the code where it is defined.
-In functions only function declaration can be used before it is declared
-Variables declared with 'var' will create a property on the global window object but no let. const
*/
//Variables
console.log(me); //undefined
//console.log(job); //Cannot access 'job' before initialization
//console.log(year); //Cannot access 'job' before initialization

var me = 'Nikhil M';
let job = 'programmer';
const year = 1993;

//functions
console.log(addDecl(2, 3)); //5
//console.log(addExpr(2, 3)); //Cannot access 'addExpr' before initialization
console.log(addArrow); //undefined bcoz it is 'var'
//console.log(addArrow(2, 3));

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
}; //Cannot access 'addExpr' before initialization

var addArrow = (a, b) => a + b; //addArrow is not a function bcoz 'var' is undefined

//Examples
console.log(numProducts); //undefined
if (!numProducts) deleteShopping(); //functions will be executed as result-undefined which is falsy value
var numProducts = 10;
function deleteShopping() {
  console.log('All products deleted!');
}

var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x); //true - bcoz x-var will be created as a property in window object
console.log(y === window.y); //false - bcoz y-let will not be created as a property in window object
console.log(z === window.z); //false - bcoz z-const will not be created as a property in window object

/**this keyword
 * this is not static, its value is assigned only when function is actually called.
 * Method - points to Object calling the method
 * Simple function call - this is undefined(in strict mode) else points to window object
 * Arrow functions - don't get their own this keyword, this points to parents scope
 * Event listener = this points to DOM element that handler is attached to
 * this - will NOT point to function itself, to variable env of function
 */
console.log('this in global env: ', this); //point to window object
function calcAge1(birthYear1) {
  console.log(2022 - birthYear1);
  console.log('this in function call(func declaration): ', this);//point to window object
}
calcAge1(1993);

const calAgeArrow = birthYear => {
  console.log(2022 - birthYear);
  console.log('this in function call(func expression): ', this);//point to window object
};
calAgeArrow(1993);

const Nikhil = {
  birthYear: 1993,
  calcAge: function () {
    console.log('this in method: ',this);//point to Object calling the method
    //console.log(2022 - this.birthYear);
  },
};
Nikhil.calcAge();

const matilda = {
  year: 2022,
};
matilda.calcAge = Nikhil.calcAge;
matilda.calcAge(); //~= cannot read properties of undefined

const f = Nikhil.calcAge;
f();

/**REGULAR FUNC VS ARROW FUNC
 *this in Arrow func(when defined inside an object) will have global scope not the parent function scope
 *use Arrow func when this is used in a func defined inside a method
 */
var lastName = 'Matilda';
const Myana = {
  firstName: 'Myana',
  year: 1993,
  calcAge: function () {
    //console.log(this);
    console.log(2022 - this.birthYear);
    //SOLUTION 1
    const self = true;
    const isMillenial = function () {
      console.log(self); //points to Myana object
      console.log(this); //undefined
      //console.log(this.year >= 1981 && this.year <= 1996);
      console.log(self.year >= 1981 && self.year <= 1996);
    };
    isMillenial();
    //SOLUTION 2 - to use arrow func in which this points to calcage method(i.c parent scope)
    const isMillenial2 = () => {
      console.log(this); //here this points to calcAge method
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillenial2();
  },

  greetArrow: () => {
    console.log(this.firstName);
    console.log(`Hey ${this.firstName}`); //this points to window object
  },
  greetArrow2: () => {
    console.log(this.lastName);
    console.log(`Hey ${this.lastName}`); //this points to window object
  },
};
Myana.greetArrow();
Myana.greetArrow2(); //cause var variable creates a property in window object
Myana.calcAge();

/*arguments keyword
 *only available in regular functions like this keyword
 */
const addExpr1 = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpr1(2, 5);
const addExpr2 = (a, b) => {
  //console.log(arguments);
  return a + b;
};
addExpr2(2, 5);

/**PRIMITIVES VS REFERENCE TYPES
 *Primitives - numbers, strings, booleans, undefined, null, symbol, BigInt(these are stored in Callstack i.e execution context where they are created)
 *Reference types - objects, functions, arrays(stored in heap)
 */
//Primitive values example
let age = 30;
let oldAge = age;
age = 31;
console.log(oldAge); //30
console.log(age); //31
//Reference values example
const me1 = {
  name: 'nikhil',
  age: 30,
};
const friend = me1;
friend.age = 27;
console.log('friend : ', friend); //{name: 'nikhil', age: 27}
console.log('me1', me1); //{name: 'nikhil', age: 27}

//Copying objects
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};
const jessicaCopy = Object.assign({}, jessica); //using this new object will point to new memory in heap but this is applicable only for 1 level not deep clone(meaning an object inside an object, eg below)
jessicaCopy.lastName = 'Davis';
console.log('Before marriage', jessica);
console.log('After marriage', jessicaCopy);
//deep clone eg
jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');
console.log('Before marriage', jessica);
console.log('After marriage', jessicaCopy);
