// Remember, we're gonna use strict mode in all scripts now!
"use strict";

// const xbcsdf = 23;

// const y = 23;

// if (y === 23) console.log(23);

// const calcAge = (birthYear) => 2037 - birthYear;

// console.log(calcAge(1992));

//-------------------------------------------------------------------------------------------------
// 25.	4 Stepps to solve any problem: 1. Make sure you 100% understand the problem. Ask the right questions to get a clear picture of  the problem.
// 2. Divide and conquer: Break a big problem into smaller sub-problems.
// 3.Don’t be afraid to do a much research as you have to.
// 4. For bigger problems, write pseudo-code before writing the actual code.
//-------------------------------------------------------------------------------------------------

//---------------------------------------------------PROBLEM:
//We work for a company building a smart home thremometer. Our most recent task is this: "Given and array of temperatures of one day, calculate the temperature amplitude. Keep in mind that sometimes there might be a sensor error."
// const temperatures = [3, -2, -6, -1, "error", 9, 13, 17, 15, 14, 9, 5];

// //1)Understanding the problem
// //-What is temp amplitude? A: difference between the highest and lowest temp.
// //-How to compute max and min temperatures?
// // = What's a sensor error? And what it do?

// // 2) Breaking up into sub-problems
// // - How to ignore errors?
// // - Find max value in temp array
// // - Find min value in temp array
// // - Subtract min from max (amplitude) and return it

// const calcTempAmplitude = function (temps) {
//   let max = temps[0];
//   let min = temps[0];
//   for (let i = 0; i < temps.length; i++) {
//     const curTemp = temps[i];
//     if (typeof curTemp !== "number") continue;

//     if (curTemp > max) max = curTemp;
//     if (curTemp < min) min = curTemp;
//   }
//   console.log(max, min);
//   return max - min;
// };

// calcTempAmplitude(temperatures);

// const amplitude = calcTempAmplitude(temperatures);
// console.log(amplitude);

// //PROBLEM 2:
// // Function should now receive 2 arrays of temps

// //1) Understanding the problem
// // - With 2 arrays, should we implement functionality twice?NO: just merge the arrays

// //2)Breaking up into sub-problems
// //How to merge two arrays?

// // const array1 = ['a', 'b', 'c'];
// // const array2 = ['d', 'e', 'f'];
// // const array3 = array1.concat(array2);

// const calcTempAmplitudeNew = function (t1, t2) {
//   const temps = t1.concat(t2);
//   console.log(temps);

//   let max = temps[0];
//   let min = temps[0];
//   for (let i = 0; i < temps.length; i++) {
//     const curTemp = temps[i];
//     if (typeof curTemp !== "number") continue;

//     if (curTemp > max) max = curTemp;
//     if (curTemp < min) min = curTemp;
//   }
//   console.log(max, min);
//   return max - min;
// };

// calcTempAmplitudeNew(temperatures);

// const amplitudeNew = calcTempAmplitudeNew([3, 5, 1], [9, 0, 6]);
// console.log(amplitudeNew);

//--------------------------------DEBUGGING
// const measureKelvin = function () {
//   const measurement = {
//     type: "temperature",
//     unit: "celsius",
//     //C) FIX
//     // value: Number(prompt("Degree celsius:")),
//     value: 10,
//   };
//   console.log(measurement);
//   console.table(measurement);
//   console.log(measurement.value);
//   //   console.warn(measurement.value);
//   //   console.error(measurement.value);
//   const kelvin = measurement.value + 273;
//   return kelvin;
// };

// //A) Identify
// console.log(measureKelvin());

// const calcTempAmplitudeBug = function (t1, t2) {
//   const temps = t1.concat(t2);
//   console.log(temps);

//   let max = 0;
//   let min = 0;
//   for (let i = 0; i < temps.length; i++) {
//     const curTemp = temps[i];
//     if (typeof curTemp !== "number") continue;

//     //setting manually a breakpoint
//     debugger;
//     if (curTemp > max) max = curTemp;
//     if (curTemp < min) min = curTemp;
//   }
//   console.log(max, min);
//   return max - min;
// };

// const amplitudeBug = calcTempAmplitudeBug([3, 5, 1], [9, 4, 6]);

// //Identify the bug
// console.log(amplitudeBug);

//Challenge
//Given an array of forecasted maximum temperatures, the thermometer displays a string with these temperatures.
//Create a function "printForecast" which takes in an array "arr" and logs a string like the above to the console.
// 17C in 1 days... 21C in 2 days... 23C in 3 days...
//Use the problem-solving framework: Understand the problem and break it up into sub-problems

//test data 1: [17, 21, 23];
//test data 2: [12, 5, -5, 0, 4]

// //1) Understanding the problem
// Array transformed to string, separated by ...
// What is the X days? A: index + 1

// //2)Breaking up into sub-problems
//Transform array into string
//take the array and loop each element
//declare an empty string
//after each element append a new string to the string to return...maybe string templates
//return the string
const data1 = [17, 21, 23];
const data2 = [12, 5, -5, 0, 4];
// const printForecast = function (arr) {
//   let stringToReturn = "...";
//   for (let i = 0; i < arr.length; i++) {
//     stringToReturn += `${arr[i]}C in ${i + 1} days...`;
//     // console.log(stringToReturn);
//   }
//   return stringToReturn;
// };
const printForecast = function (arr) {
  let str = "...";
  for (let i = 0; i < arr.length; i++) {
    str += `${arr[i]}C in ${i + 1} days ... `;
  }
  return str;
};

console.log(printForecast(data1));
console.log(printForecast(data2));
