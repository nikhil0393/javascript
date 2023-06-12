'use strict';
/**
 * CLASSES & INSTANCES
 * OOP in JS:Prototypes; Prototypal Inheritance
 * Constructor Functions and the new Operator
 * Prototypal Inheritance & the Prototype Chain
 */

/**--------------- CLASSES & INSTANCES ---------------
 * Class - Like a blueprint from which we can create new objects
 * Instance - new object created from a class, we can create many instances of a class.
 * Instantiation: Objects(instances) are instantiated from a class which functions like a blueprint.
 * Behaviour(methods) is copied from class to all instances
 * 4 fundamental principles of OOP - Abstraction, Encapsulation, Inheritance, Polymorphism
 * Abstraction - ignoring or hiding details that dont matter, allowing us to get an overview perspective of the thing we are implementing, instead of messing the details that dont matter to our implementation - Check SS
 * Encapsulation - keeping properties and methods "private" inside the class, so they are "not accessible from outside the class". Some methods can be "exposed" as a public interface (API) - Check SS
 * Inheritance - Making all properties and methods of a certain class available to a child class, forming a hierarchical relationship between classes. This allows us to reuse common logic and to model real-world relationships. Child class can have its own methods & properties - Check SS
 * Polymorphism - A child class can overwrite a method it inherited from a parent class.(SS-polymorphism)
 */

/**--------------- OOP in JS:Prototypes ---------------
 * Objects are linked to prototype object
 * Prototypal inheritance: The prototype contains methods(behaviour) that are accessible to all objects linked to that proptotype
 * Behaviour is delegated to the linked prototype object
 * Check SS - Prototypes; ImplementingPrototypalInheritance
 */

/**--------------- CHAPTER: Constructor Functions and the new Operator ---------------
 * Diff with Constructor func and regular fn is we call Constructor func with "new" keyword
 * we can create as many diff objects as we want using this Constructor
 */

const Person = function (firstName, birthYear) {
  //Instance properties - bcoz these are availabel on all instances created using this c.func; 'this' points to new empty object
  this.firstName = firstName; //basically creating a new property in new empty object and setting it to argument
  this.birthYear = birthYear;

  //Never write methods like this as this methods will carry/copy over to every object created using this Constructor which will affect the performance. To avoid this we use Prototypal inheritance
  /*this.calcAge = function () {
    console.log(2037 - this.birthYear);
  };*/
};

const nikhil = new Person('Nikhil', '1993');
console.log(nikhil);
//When a Constructor func is called below 4 steps will happen
//1. New {} empty object is created
//2. function is called, 'this' keyword is assigned to empty object 'this = {}'
//3. new object {} is linked(__proto__prototype) to the cons.func's prototype property.
//4. function automatically returns object {} (by this time object may not be empty)

const naomika = new Person('Naomika', '2018');
const ash = new Person('Ashlesha', '1988');
console.log(naomika, ash);
console.log(nikhil instanceof Person); //true

/**--------------- Prototypes ---------------*/
console.log('\n----- %cPrototypes -----', 'font-size:14px;color:red');
console.log(Person.prototype); // prints nothing as there are no methods in Person C.func

Person.prototype.calcAge = function () {
  console.log(this.firstName, 2037 - this.birthYear);
};

nikhil.calcAge();
naomika.calcAge();

//NOTE - Person.prototype is the prototype of its linked objects but not the prototype of Person itself
console.log(nikhil.__proto__);
console.log(nikhil.__proto__ === Person.prototype); //true

console.log(Person.prototype.isPrototypeOf(nikhil)); //true
console.log(Person.prototype.isPrototypeOf(ash)); //true
console.log(Person.prototype.isPrototypeOf(Person)); //false

Person.prototype.species = 'Homo Sapiens';
console.log(nikhil.species, naomika.species);

console.log(nikhil.hasOwnProperty('firstName')); //true
console.log(nikhil.hasOwnProperty('species')); //false - bcoz it is not directly in 'nikhil' object but is in prototype property

/**--------------- Prototypal Inheritance & the Prototype Chain ---------------
 * Prototypal Inheritance - when a method was called on a object like 'nikhil.calcAge()' in above example but the 'nikhil object' doesn't contain this method, so then it tries to find that method in its prototype & uses that.
 * Every object in JS has a prototype
 * Here in our example above prototype of 'nikhil' object 'Person.prototype' which is attached to object '__proto__' property
 * Person.prototype is also an object which is a property of 'Person constructor' - so it has an prototype. 'Object.prototype' is the prototype of 'Person.prototype', so __proto__ of 'Person.prototype' points to 'Object.prototype'
 * 'Object.prototype' is also an & is property of 'Object constructor'. 'Object.prototype' is the top of Prototype chain so there is no proptotype for this & so the '__proto__' of 'Object.prototype' = null.
 * 'Object constructor' is the built in constructor for objects which is used when we write object literal '{...}'.
 * CHECK THE SCREENSHOTS IN IMG FOLDER
 */

/**--------------- Prototypal Inheritance on built in objects --------------- */
console.log(
  '\n----- %cPrototypal Inheritance on built in objects -----',
  'font-size:14px;color:red'
);
console.log(nikhil.__proto__); //Person prototype
console.log(nikhil.__proto__.__proto__); //Objects prototype
console.log(nikhil.__proto__.__proto__.__proto__); //null

console.dir(Person.prototype.constructor); //Person object

//Arrays are objects too & so they have the prototype
const arr = [3, 5, 6, 7, 6, 3, 8, 8, 7]; //'new Array() === []'
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype); //true

console.log(arr.__proto__.__proto__); //Object prototype
//So we can extend the functionality of Arrays by adding new methods to Array.prototype - by which all arrays can use that method
//NOTE: this is however not a good idea
Array.prototype.unique = function () {
  return [...new Set(this)]; //this points to the array which calls this method
};

console.log('%cArray Unique: ', 'color:red', arr.unique());

const h1 = document.querySelector('h1'); //DOM elements are also objects
console.log(h1.__proto__); //HTMLHeadingElement
console.log(h1.__proto__.__proto__); //HTMLElement
console.log(h1.__proto__.__proto__.__proto__); //Element
console.log(h1.__proto__.__proto__.__proto__.__proto__); //Node
console.log(h1.__proto__.__proto__.__proto__.__proto__.__proto__); //EventTarget
console.log(h1.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__); //Object - top level

///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/
console.log('\n----- %cCoding Challenge #1 -----', 'font-size:14px;color:red');
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const BMW = new Car('BMW', 120);
BMW.accelerate();

const Mercedes = new Car('Mercedes', 95);
Mercedes.brake();

/**--------------- ES6 Classes ---------------
 * Classes are not HOISTED - means func can be used even before they are declared
 * Classes are first-class citizens - means they can be passed into & retruned from a function
 * Classes are executed in STRICT-MODE
 */
console.log('\n----- %cES6 Classes -----', 'font-size:14px;color:red');
//Class expression
//const PersonCl = class{}

//Class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    //same as cons.func here also 'this' points to new object created
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  //Methods will be added to .prototype property of PersonCl
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  //getter in class
  get age() {
    return 2037 - this.birthYear;
  }

  //set a property that already exists
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  //STATIC method in a CLASS
  static hey() {
    console.log('%cFrom ES6 Class: ', 'color:red', 'Hey there 🙌');
    console.log(this); //the cons.func itself
  }
}

const jessica = new PersonCl('Jessica Davis', 1996);
console.log('%cPersonCl: ', 'color:red', jessica);
jessica.calcAge();
console.log('%cGetter in class: ', 'color:red', jessica.age);

console.log(jessica.__proto__ === PersonCl.prototype); //true

//We can also add methods to classes manually like did for cons.func
// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };

jessica.greet();

const walter = new PersonCl('Walter White', 1965);

/**--------------- Setters & Getters ---------------
 * Every object in JS can have setters & getters
 */
console.log('\n----- %cSetters & Getters -----', 'font-size:14px;color:red');

const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],

  //getter
  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest);

account.latest = 50;
console.log(account.movements);

/**--------------- Static methods --------------- */
console.log('\n----- %cStatic methods -----', 'font-size:14px;color:red');
//Adding static method to 'Person consc'
Person.hey = function () {
  console.log('%cFrom Cons.func: ', 'color:red', 'Hey there ✌');
  console.log(this); //the cons.func itself
};

//Calling static method
Person.hey();
//nikhil.hey(); //STATIC methods cannot be used on objects created from Cons.func

//Calling static method from Class
PersonCl.hey();

/**--------------- Object.create ---------------
 * Check SCREENSHOT
 * Object.create will create a new object and Prototype of new object will be the object passed in.
 */
console.log('\n----- %cObject.create -----', 'font-size:14px;color:red');
//creating prototye
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);

steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__ === PersonProto); //true

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();

///////////////////////////////////////
// Coding Challenge #2

/*1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.
*/

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

console.log('\n----- %cCoding Challenge #2 -----', 'font-size:14px;color:red');
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed = this.speed + 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed = this.speed - 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this; //we can chain the methods by doing this, see below ES6 classes for more info
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new CarCl('Ford', 120);
console.log(ford.speedUS);
ford.accelerate();
ford.brake();
console.log(ford.speedUS);
ford.speedUS = 125;
console.log(ford);

/**--------------- Inheritance btw classes: Constructor Functions ---------------
 * Check SS - InheritanceClass1; InheritanceClass2
 */
console.log(
  '\n----- %cInheritance btw classes: Constructor Functions -----',
  'font-size:14px;color:red'
);

const PersonI = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

PersonI.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const StudentI = function (firstName, birthYear, course) {
  PersonI.call(this, firstName, birthYear); //using call() to set this keyword = this
  this.course = course;
};

//Linking prototypes - this should be done before adding any methods to Student.prototype else Object.create will override all objects
StudentI.prototype = Object.create(PersonI.prototype);

StudentI.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new StudentI('Mike', 2020, 'Computer Science');
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof StudentI); //true
console.log(mike instanceof PersonI); //true
console.log(mike instanceof Object); //true

//Setting the StudentI constructor back to StudentI as it will be changed after assiging this - 'StudentI.prototype = Object.create(PersonI.prototype)'
StudentI.prototype.constructor = StudentI;
console.dir(StudentI.prototype.constructor);

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/
console.log('\n----- %cCoding Challenge #3 -----', 'font-size:14px;color:red');
/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  console.log(`${this.make} is going at ${this.speed + 10} km/h`);
};

Car.prototype.brake = function () {
  console.log(`${this.make} is going at ${this.speed - 5} km/h`);
};

const BMW = new Car('BMW', 120);
BMW.accelerate();

const Mercedes = new Car('Mercedes', 95);
Mercedes.brake();
*/

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

const tesla = new EV('Tesla', 120, 23);
tesla.brake();
tesla.chargeBattery(25);
tesla.accelerate();

/**--------------- Inheritance btw classes: ES6 classes --------------- */
console.log(
  '\n----- %cInheritance btw classes: ES6 classes -----',
  'font-size:14px;color:red'
);
/**
class PersonCl {
  constructor(fullName, birthYear) {
    //same as cons.func here also 'this' points to new object created
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  //Methods will be added to .prototype property of PersonCl
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  //getter in class
  get age() {
    return 2037 - this.birthYear;
  }

  //set a property that already exists
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  //STATIC method in a CLASS
  static hey() {
    console.log('%cFrom ES6 Class: ', 'color:red', 'Hey there 🙌');
    console.log(this); //the cons.func itself
  }
}
*/

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    //super needs to be always first
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  //overriding method from parent class
  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();

/**--------------- Inheritance btw classes: Object.create --------------- */
console.log(
  '\n----- %cInheritance btw classes: Object.create -----',
  'font-size:14px;color:red'
);

const PersonPrototype = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const stevenproto = Object.create(PersonPrototype);

const StudentPrototype = Object.create(PersonPrototype);
StudentPrototype.init = function (firstName, birthYear, course) {
  PersonPrototype.init.call(this, firstName, birthYear);
  this.course = course;
};
StudentPrototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentPrototype);
jay.init('Jay', 2010, 'Computer Science');
jay.introduce();

/**--------------- Class example --------------- */
console.log('\n----- %c ES6 Class example -----', 'font-size:14px;color:red');

/**--------------- Encapuslation: Protected properties & methods; Private classfields & methods ---------------
 * Public fields, Private fields, Public methods, Private methods
 */
console.log(
  '----- %cEncapuslation: Protected properties & methods; Private classfields & methods -----',
  'font-size:14px;color:red'
);

class Account {
  //Public fields - these are present on all instances through the class, not present in prototype of the class
  locale = navigator.language;

  //Private fields - cant be accessed outside the class; available on all instances and not on prototype
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    //Protected property
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  //Public methods as well
  //Public interfaces also referred as API's
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this; //returning the object itself here to make the methods chainable
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
      return this;
    }
  }

  static helper() {
    console.log('Helper');
  }

  //Private methods
  #approveLoan() {
    return true;
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
console.log(acc1.getMovements());
console.log(acc1);
Account.helper();
//Chaining methods
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1.getMovements());

///////////////////////////////////////
// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/
console.log('\n----- %cCoding Challenge #4 -----', 'font-size:14px;color:red');
/*
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed = this.speed + 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed = this.speed - 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

//Constructor -coding-3
const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};
*/

class EVCL extends CarCl {
  //Private property
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }
}

const rivian = new EVCL('Rivian', 120, 23);
rivian.chargeBattery(60).brake().accelerate().accelerate();
console.log(rivian.speedUS); //getter from parent class
