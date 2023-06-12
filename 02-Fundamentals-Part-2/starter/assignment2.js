"use strict";
// // FUNCTIONS
// console.log('\n======================= ASSSIGNMENT JAVASCRIPT =======================');
// console.log('\n====== FUNCTIONS ======');
// function describeCountry(country, population, capitalCity) {
//     let description = `${country} has ${population} million people and its capital city is ${capitalCity}`;
//     return description;
// }

// let myCountry = describeCountry('India', 120, 'Delhi');
// console.log(myCountry);
// let myCountry2 = describeCountry('US', 70, 'Washington DC');
// console.log(myCountry2);
// let myCountry3 = describeCountry('UK', 40, 'Birmingham');
// console.log(myCountry3);

// // FUNCTIONS DECLARATIONS VS EXPRESSIONS
// console.log('\n====== FUNCTIONS DECLARATIONS ======');
// function percentageOfWorld1(countryPopulation) {
//     return countryPopulation / 7900 * 100;
// }
// let indiaPopulation = percentageOfWorld1(600);
// console.log(`${indiaPopulation} percentage of world population`);
// let americaPopulation = percentageOfWorld1(150);
// console.log(`${americaPopulation} percentage of world population`);
// let chinaPopulation = percentageOfWorld1(1441);
// console.log(`${chinaPopulation} percentage of world population`);

// console.log('\n====== FUNCTIONS EXPRESSIONS======');
// let percentageOfWorld2 = function (countryPopulation) {
//     return countryPopulation / 7900 * 100;
// }
// let londonPopulation = percentageOfWorld2(600);
// console.log(`${londonPopulation} percentage of world population`);
// let germanyPopulation = percentageOfWorld2(150);
// console.log(`${germanyPopulation} percentage of world population`);
// let francePopulation = percentageOfWorld2(1441);
// console.log(`${francePopulation} percentage of world population`);

// console.log('\n====== ARROW FUNCTIONS ======');
// const percentageOfWorld3 = countryPopulation => (countryPopulation / 7900) * 100;
// console.log(percentageOfWorld3(600));
// console.log(percentageOfWorld3(150));
// console.log(percentageOfWorld3(1441));

// //Practising functions
// console.log('\n====== PRACTSING FUNCTIONS ======');
// function calcAge10(birthYear1) {
//     return 2021 - birthYear1;
// }
// const age10 = calcAge10(1993);

// const calcAge11 = function (birthYear1) {
//     return 2021 - birthYear1;
// }
// //const age11 = calcAge11(1993);

// console.log(`Function declared = ${age10}, Function expression = ${calcAge11(1993)}`);

// // CODING CHALLENGE #1
// console.log('\n============== CODING CHALLENGE #1 ===============');
// let calcAverage = (scr1, scr2, scr3) => (scr1 + scr2 + scr3) / 3;

// let checkWinner = function (avg_team1, avg_team2) {
//     if (avg_team1 >= (2 * avg_team2)) {
//         return `Dolphins's average is twice the Koalas's average with ${avg_team1} points`;
//     }
//     else if (avg_team2 >= (2 * avg_team1)) {
//         return `Koalas's average is more than twice the Dolphins's average with ${avg_team2} points`;
//     }
//     else {
//         return 'No team won';
//     }
// }
// console.log('\n====== TEST DATA 1 ======');
// let dolphinsAvg = calcAverage(44, 23, 71);
// let koalasAvg = calcAverage(65, 54, 49);
// console.log(dolphinsAvg, koalasAvg);
// console.log(checkWinner(dolphinsAvg, koalasAvg));

// console.log('\n====== TEST DATA 2 ======');
// dolphinsAvg = calcAverage(85, 54, 41);
// koalasAvg = calcAverage(23, 34, 27);
// console.log(dolphinsAvg, koalasAvg);
// console.log(checkWinner(dolphinsAvg, koalasAvg));

// console.log('\n====== ARRAYS CODING CHALLENGE #2 ======');
// const calcTip = function (bill) {
//     if (bill >= 50 && bill <= 300)
//         return bill * 0.15;
//     else
//         return bill * 0.2;
// }
// const tipTest = calcTip(100)
// console.log(tipTest);

// const bills = [125, 555, 44];
// console.log(bills);
// const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
// console.log(tips);
// const total = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];
// console.log(total);

// console.log('\n====== CODING CHALLENGE #3(OBJECTS) ======');
// const mark = {
//     fullname: 'Mark Miller',
//     mass: 78,
//     height: 1.69,
//     calcBMI: function () {
//         this.bmi = this.mass / (this.height * this.height);
//         return this.bmi;
//     }
// };
// const john = {
//     fullname: 'John Smith',
//     mass: 92,
//     height: 1.95,
//     calcBMI: function () {
//         this.bmi = this.mass / (this.height ** 2);
//         return this.bmi;
//     }
// };
// john.calcBMI();
// mark.calcBMI();

// if (john.bmi > mark.bmi) {
//     console.log(`${john.fullname}'s BMI (${john.bmi}) is higher than ${mark.fullname}'s BMI (${mark.bmi})`);
// }
// else if (mark.bmi > john.bmi) {
//     console.log(`${mark.fullname}'s BMI (${mark.bmi}) is higher than ${john.fullname}'s BMI (${john.bmi})`);
// }

// console.log('\n====== CODING CHALLENGE #4(LOOPS) ======');
// const billsNew = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
// const tipsNew = [];
// const totals = [];
// for (let i = 0; i < billsNew.length; i++) {
//     tipsNew[i] = calcTip(billsNew[i]);
//     //totals.push(tipsNew[i] + billsNew[i]);
//     totals[i] = tipsNew[i] + billsNew[i];
// }
// console.log(tipsNew, totals);

// const calcAverageNew = function (arr) {
//     let sum = 0;
//     for (let i = 0; i < arr.length; i++) {
//         sum = sum + arr[i];
//     }
//     let average = sum / arr.length;
//     console.log(average);
//     //return average;
// }
// //const bonusChallenge = calcAverageNew(billsNew);
// //console.log(bonusChallenge);
// calcAverageNew(billsNew);
