//Values and Variables
const myCountryName = "India";
const myContinentName = "Asia";
let myCountryPopulation = 120000000;

console.log("Country Name = " + myCountryName);
console.log("Continent Name = " + myContinentName);
console.log("Population in country = " + myCountryPopulation);

// Data types
console.log('===== DATA TYPES =====');
const isIsland = false;
let language;
console.log(typeof isIsland);
console.log(typeof myCountryPopulation);
console.log(typeof myCountryName);
console.log(typeof language);

// Data types
console.log('===== LET, CONST, VAR =====');
language = 'Telugu';
// myContinentName = 'Europe';

// Basic Operators
console.log('\n===== BASIC OPERATORS =====');
let half_of_myCountryPopolation = myCountryPopulation / 2;
console.log("Half of my country population = " + half_of_myCountryPopolation);
myCountryPopulation++;
console.log("Population of India = " + myCountryPopulation);
let finland_population = 6000000;
console.log("India has more population than Finalnd : " + (myCountryPopulation > finland_population));
let avg_population = 33000000;
console.log("India's population is more than avg country population : " + (myCountryPopulation > avg_population));
let description = myCountryName + ' is in ' + myContinentName + ' and its ' + myCountryPopulation + ' people speak ' + language;
console.log(description);

// Coding Challenge 1
console.log('\n===== CODING CHALLENGE =====');
console.log('===== TEST DATA 1 =====');
let mark_mass = 78;
let mark_height = 1.69;
let john_mass = 92;
let john_height = 1.95;
let mark_BMI = mark_mass / mark_height ** 2;
let john_BMI = john_mass / john_height ** 2;
console.log("BMI of Mark : " + mark_BMI);
console.log("BMI of John : " + john_BMI);
let markHigherBMI = mark_BMI > john_BMI;
console.log("Mark BMI is higher than John BMI :: " + markHigherBMI);

console.log('===== TEST DATA 2 =====');
mark_mass = 95;
mark_height = 1.88;
john_mass = 85;
john_height = 1.76;
mark_BMI = mark_mass / mark_height ** 2;
john_BMI = john_mass / john_height ** 2;
console.log("BMI of Mark : " + mark_BMI);
console.log("BMI of John : " + john_BMI);
markHigherBMI = mark_BMI > john_BMI;
console.log("Mark BMI is higher than John BMI :: " + markHigherBMI);

// TEMPLATE LITERALS
console.log('\n===== TEMPLATE LITERALS =====');
description = `${myCountryName} is in ${myContinentName} and its ${myCountryPopulation} people speak ${language}`;
console.log(description);

//IF ELSE CONDITIONS CODING CHALLENGE 2
console.log('\n===== IF ELSE CONDITIONS CODING CHALLENGE 2 =====');
if (mark_BMI > john_BMI) {
    console.log(`Mark's BMI (${mark_BMI}) is higher than John BMI ${john_BMI}`);
} else {
    console.log(`john's BMI (${john_BMI}) is higher than Mark's BMI ${mark_BMI}`);
}

//TYPE CONVERSION & COERCION
console.log('\n===== TYPE CONVERSION & COERCION =====');
console.log('9' - '5');
console.log('19' - '13' + '17');
console.log('19' - '13' + 17);
console.log('123' > 57);
console.log(5 + 6 + '4' + 9 - 4 - 2);

//EQUALITY OPERATORS
/*console.log('\n===== EQUALITY OPERATORS =====');
let numNeighbours = Number(prompt('How many neighbour countries does your country have?'));
console.log('No of neighbouring countries : ' + numNeighbours);
console.log('Type of numNumbers : ' + typeof numNeighbours);
if (numNeighbours === 1)
    console.log('Only 1 border!');
else if (numNeighbours > 1)
    console.log('Have more than 1 border');
else
    console.log('No borders');*/

//LOGICAL OPERATORS
console.log('\n===== LOGICAL OPERATORS =====');
language = 'English';
console.log(language);
console.log(myCountryPopulation);
console.log(isIsland);

if (language === 'English' && myCountryPopulation < 500000000 && !isIsland) {
    console.log(`You should live in ${myCountryName}`);
} else {
    console.log(`${myCountryName} is not right for you`);
}

//CODING CHALLENGE 3
console.log('\n===== CODING CHALLENGE 3 =====');
let avg_dolphins = (96 + 108 + 89) / 3;
let avg_koalas = (88 + 91 + 110) / 3;
if (avg_dolphins > avg_koalas)
    console.log('Dolphins are the winners');
else if (avg_koalas > avg_dolphins)
    console.log('Koalas are the winners');
else
    console.log('Match is drawn btw Dolphins & Koalas');

//Bonus 1
avg_dolphins = (97 + 112 + 101) / 3;
avg_koalas = (109 + 95 + 123) / 3;

if (avg_dolphins > avg_koalas && avg_dolphins >= 100)
    console.log(`Dolphins has high score of ${avg_dolphins}`);
else if (avg_koalas > avg_dolphins && avg_koalas >= 100)
    console.log(`Koalas has high score of ${avg_koalas}`);

//Bonus 2
avg_dolphins = (97 + 112 + 101) / 3;
avg_koalas = (109 + 95 + 106) / 3;

if (avg_dolphins > avg_koalas && avg_dolphins >= 100)
    console.log(`Dolphins has high score of ${avg_dolphins}`);
else if (avg_koalas > avg_dolphins && avg_koalas >= 100)
    console.log(`Koalas has high score of ${avg_koalas}`);
else if (avg_koalas === avg_dolphins && avg_dolphins >= 100 && avg_koalas >= 100)
    console.log("It's a draw");

//THE SWITCH STATEMENT
console.log('\n===== THE SWITCH STATEMENT =====');
language = 'mandarin';
switch (language) {
    case 'chinese' || 'mandarin':
        console.log(`${language} has most number of speakers`);
        break;
    case 'spanish':
        console.log(`${language} is in 2nd place in Number of speakers`);
        break;
    case 'english':
        console.log(`${language} is in 3rd place`);
    case 'hindi':
        console.log(`${language} is Number 4`);
        break;
    case 'arabic':
        console.log(`${language} is 5th most spoken language`);
        break;
    default:
        console.log(`${language} is a great language too`);
}

//CONDITIONAL OPERATOR
console.log('\n===== CONDITIONAL OPERATOR =====');
myCountryPopulation = 1300000000;
let population = (myCountryPopulation > 330000000) ? 'above' : 'below';
console.log(`${myCountryName}'s population is ${population} average`);

//CODING CHALLENGE #4
console.log('\n===== CODING CHALLENGE #4 =====');
let bill = 430;
let tip = (bill >= 50 && bill <= 300) ?(bill * 0.15) : (bill * 0.2);
let final_bill = bill + tip;
console.log(`Bill = ${bill}; Tip = ${tip}; Final bill = ${final_bill}`);