"use script";

// functions
function logger() {
  console.log("My name is Nikhil");
}
// calling/running/invoking function
logger();
logger();
logger();

function fruitProcessor(apples, oranges) {
  console.log(apples, oranges);
  let juice = `Juice is made of ${apples} apples & ${oranges} oranges`;
  return juice;
}
let applesOrangeJuice = fruitProcessor(5, 2);
console.log(applesOrangeJuice);

let orangeAppleJuice = fruitProcessor(3, 6);
console.log(orangeAppleJuice);

console.log("=========FUNCTIONS===========");
// function declaration
function calcAge1(birthYear) {
  return 2021 - birthYear;
}
const age1 = calcAge1(1993);
console.log(age1);

// function expression
const calcAge2 = function (birthYear) {
  return 2021 - birthYear;
};
const age2 = calcAge2(1993);
console.log(age2);

// Arrow function
let calcAge3 = (birthYear) => 2021 - birthYear;
console.log(`Arrow function = ${calcAge3(1993)}`);

let yearsUntillRetirement = (birthYear, name) => {
  let age = 2021 - birthYear;
  let retirement = 65 - age;
  return `${name} retires in ${retirement} years`;
};
console.log(yearsUntillRetirement(1993, "Nikhil"));

// Arrays
const friends = ["Nik", "Shek", "Shank"];
console.log(friends[1]);
//add elements
const newLength = friends.push("Sresh"); //result of oush function is the new array length
console.log(friends);
console.log(newLength);

friends.unshift("Abhi");
console.log(friends);
//remove elements
friends.pop(); //pop function returns the removed element
console.log(friends);

friends.shift();
console.log(friends);

console.log(friends.indexOf("Nik"));
console.log(friends.indexOf("Abhi")); //returns -1 if not present

friends.push(23);
console.log(friends.includes("23")); //includes method returns true/false if the element is in the array or not and is 'strict'
if (friends.includes("Shek")) {
  console.log("You have a friend Shek");
}

//Objects
console.log("=========Objects==========");
const nikhil = {
  firstName: "Nik",
  lastName: "Myana",
  birthYear: 1993,
  job: "Engineer",
  friends: ["Ab", "Shek", "Shank"],
  isDriversLicense: true,
  calcAge: function () {
    this.age = 2021 - this.birthYear;
    return this.age;
  },
  getSummary: function () {
    this.bio = `${this.firstName}  is a ${this.age} years old ${
      this.job
    }, and he has ${this.isDriversLicense ? "a" : "no"} driver's license.`;
    return this.bio;
  },
  test2: `${this.firstName}  is a ${this.age} years old ${
    this.job
  }, and he has ${this.isDriversLicense ? "a" : "no"} driver's license.`,
};
nikhil.calcAge(); //function call
console.log(nikhil.firstName);
console.log(nikhil["age"]);
//const interestedIn = prompt('What do you wanted to know? Choose between firstName, lastName, age, job, friends');
//console.log('Interested In : ' + interestedIn);

// if (nikhil[interestedIn]) {
//     console.log(nikhil[interestedIn]);
// }
// else {
//     console.log('Wrong selection! Choose only between firstName, lastName, age, job, friends');
// }
nikhil.location = "California";
nikhil["facebook"] = "nikhil myana";
console.log(nikhil);
console.log(
  `${nikhil.firstName} has ${nikhil.friends.length} friends, and his best friend is ${nikhil.friends[0]}`
);
console.log(
  `${nikhil.firstName} has ${nikhil["friends"].length} friends, and his best friend is ${nikhil["friends"][0]}`
);
console.log(nikhil.age);
console.log(nikhil.getSummary());
console.log(nikhil.test2);
const years = [1991, 2007, 1969, 2020];
const ages = [];
for (let i = 0; i < years.length; i++) {
  ages[i] = 2021 - years[i];
}
console.log(ages);
//console.log(years);
for (let i = 0; i < years.length; i++) {
  ages.push(2037 - years[i]);
  console.log(ages[i], i);
}
console.log(ages);
