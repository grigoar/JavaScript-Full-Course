
// let js = 'amazing';
// console.log(40 + 8 + 23 - 10);

// //Values-the smallest unit in javascript
// console.log("Grig");
// console.log(5);

// //declaring a variable and assigning a value to it
// //creating a box with the label firstName and putting the value "Grig"
// let firstName = "Grigg"
// console.log(firstName);

// let years = 3;


//----------------------------------Data Types: Objects and Primitives
// console.log(true);
// let javascriptIsFun = true;
// console.log(":" + javascriptIsFun + typeof javascriptIsFun);
// console.log(typeof true)
// console.log(typeof 23)
// console.log(typeof "grig")

// //Dynamic typing
// javascriptIsFun = "YES!";
// console.log(":" + javascriptIsFun + typeof javascriptIsFun);

// let year;
// console.log(year);//undefined
// console.log(typeof year);//undefined

// year = 1992;
// console.log(year);//undefined
// console.log(typeof year);//undefined

// console.log(typeof null);//it is a bug because the null is not an object, it should be null, like undefined is undefined

// //-------------------------let const(ES6) and var
// console.log("-------------------------let const(ES6) and var");

// //mutable variable
// let age = 30;
// //mutating the variable
// age = 31;

// //immutable variable
// const birthYear = 1992;
// // birthYear = 1999;
// //need to be initialized
// // const job;

// //should use const for variables first and change after to let if needed

// //old way of declaring the variables
// var job = 'programmer';
// job = 'teacher';

// //if not declaring the variable it will be assigned to the global variable window
// lastName = 'Nath';
// console.log(lastName);

// //-------------------------operators in javascript
// console.log("-------------------------operators in javascript");

// //Math operators
// const now = 2036;
// const ageJonas = now - 234;
// const ageSara = now - 2364;
// console.log(ageJonas, ageSara)

// console.log(ageJonas * 2, ageSara / 2);
// //2 ** means 2 to the power of 3
// const firstName = "grig";
// const lastName = "nath";
// console.log(firstName + " " + lastName);

// //Assignment operators
// let x = 10 + 5;
// x += 10;
// console.log(x);

// //Comparison operators
// console.log(ageJonas > ageSara);
// const isFullAge = ageSara >= 18;

//-------------------------operators precedence
console.log("-------------------------operators precedence");
const now = 2036;
const ageJonas = now - 1990;
const ageSara = now - 2018;

console.log(now - 1991 > now - 2018)

let x, y;//undefined
x = y = 25 - 10 - 5;
console.log(x, y);

const averageAge = (ageJonas + ageSara) / 2;
console.log(averageAge);






















