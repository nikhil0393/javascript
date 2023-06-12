// Remember, we're gonna use strict mode in all scripts now!
'use strict';

const x = '23';
const calcAge = birthYear => 2021 - birthYear;

const printForecast = function (arr) {
  let str = '...';
  for (let i = 0; i < arr.length; i++) {
    str = str + `${arr[i]} degree C in ${i + 1} days ...`;
  }
  console.log(str);
};

printForecast([17, 21, 23]);
printForecast([12, 5, -5, 0, 4]);
