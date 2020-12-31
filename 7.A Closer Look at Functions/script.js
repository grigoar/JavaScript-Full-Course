"use strict";

//-----------------------------------------Default parameters
// const bookings = [];
// // const createBooking = function (flightNum, numPassengers, price) {
// //ES 6 DEFAULT VALUES
// //can set the default value based on the previous declared parameters
// const createBooking = function (
//   flightNum,
//   numPassengers = 1,
//   price = 199 * numPassengers
// ) {
//   //Before ES6
//   //default value old way
//   //   numPassengers = numPassengers || 1;
//   //   price = price || 199;

//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };
// createBooking("LH123");
// createBooking("LH123", 2, 900);
// createBooking("LH123", 2);
// createBooking("LH123", 5);

// //can't skip parameters
// // createBooking("LH123", 1000);
// createBooking("LH123", undefined, 1000);

//------------- How passing arguments works: Value vs Reference
// const flight = "Lh1234";
// const grig = {
//   name: "Grig Nath",
//   passport: 2345235325,
// };

// const checkIn = function (flightNum, passenger) {
//   flightNum = "LH999";
//   passenger.name = "Mr. " + passenger.name;

//   if (passenger.passport === 2345235325) {
//     alert("Check in");
//   } else {
//     alert("Wrong passport");
//   }
// };
// checkIn(flight, grig);
// console.log(flight);
// console.log(grig);

// // flightNum = flight;
// //Is the same as doing ...
// //primitive value is just passing a copy to the function
// const flightNum = flight;
// //reference value- is passing a reference to the function
// const passenger = grig;

// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 100000000000000);
// };
// //creating a problem, as it will change problems, we need to be carefull
// newPassport(grig);
// checkIn(flight, grig);

//Passing by value
//Passing by reference does not exist in JavaScript

//--------------First-class and higher=order function

// 83.	JavaScript have First-class functions(they are values and is a concept). This means: =JavaScript treats functions a first-class citizens; =This means that functions are simply values; = Functions are just another “type” of objects; = Store functions in variables or properties; = Pass functions as arguments or OTHER functions(event handlers); = Return functions FROM functions; = Call methods on functions(bind)
// 84.	JavaScript have Higher Order functions: = A function that receives another function as an argument, that returns a new function, or both;  = This is only possible because of first-class function. 1.Function that receives another function (eventHandler-Higher-order function, and the function return on click( Callback function); 2. Function that returns a function(function name -Higher-order function and the return of that function is a returned function)

// //Function Accepting Callback Functions
// const oneWord = function (str) {
//   return str.replace(/ /g, "").toLowerCase();
// };

// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(" ");
//   return [first.toUpperCase(), ...others].join(" ");
// };

// //Higher-order function it take as a parameter a function
// // add a layer of abstraction- the high-order is at a higher level of abstraction, and it need a lower order function
// const transformer = function (str, fn) {
//   console.log(`Original string: ${str}`);
//   console.log(`Transformed string: ${fn(str)}`);

//   console.log(`Transformed by: ${fn.name}`);
// };
// //we don't call the function, we just pass the function
// //this is named callback functions
// transformer(" JavaScript is the best!", upperFirstWord);

// transformer(" JavaScript is the best!", oneWord);

// //JS uses callback all the time
// const high5 = function () {
//   console.log("hh5");
// };
// document.body.addEventListener("click", high5);

// //passing a callback function to forEach method
// ["Grig", "Ana", "Flo"].forEach(high5);

// //---------------------------Function that return a new function
// //is important for functional programming
// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };
// //this is a function
// const greeterHey = greet("Hey");
// greeterHey("Grig");
// greeterHey("Steven");

// greet("Hello")("Grig Nath");

// //Change to arrow function
// // const greetArr = (greeting) => {
// //   return function (name) {
// //     console.log(`${greeting} ${name}`);
// //   };
// // };
// //is an arrow function return another arrow function
// const greetArr = (greeting) => (name) => console.log(`${greeting} ${name}`);
// greetArr("Hello, ")("Grigore");

//---------------------------The call and apply methods
const lufthansa = {
  airLine: "Lufthansa",
  iataCode: "LH",
  bookings: [],
  //book:function(){}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airLine} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, "Grigore Nath");
lufthansa.book(564, "Mike Ross");

const eurowings = {
  airLine: "Eurowings",
  iataCode: "EW",
  bookings: [],
};

//is a copy, and is now a function, but it doesn't have this anymore
const book = lufthansa.book;

//Does not work because this is undefined
// book(23, "Sarah Williams");

//call, apply and bind methods
//the call methods pass the first argument to this
//manipulating the this keyword with call method
book.call(eurowings, 23, "Sarah Williams");
console.log(eurowings);

book.call(lufthansa, 236, "Maryy Cooper");
console.log(lufthansa);

const swiss = {
  airLine: "Swiss Air Lines",
  iataCode: "LX",
  bookings: [],
};

book.call(swiss, 33, "Yone Ella");
console.log(swiss);

//Apply method same as call but pass an array of arguments , not a list
const flightData = [2533, "Georfe Cooper"];
book.apply(swiss, flightData);
console.log(swiss);

//we can use call instead of apply
book.call(swiss, ...flightData);

//----------------------------------------The bind Method
//doesn't call immediately the function, it return a new function where this is bound

//return a function
//return the this
//the this is set in stone
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(32432, "Griff Frig");

//setting multiple parameters in stone
const bookEW23 = book.bind(eurowings, 23);
// const bookEW23 = book.bind(eurowings, 23, "Grig");
bookEW23("Grig Nath");
bookEW23("Marth Vision");

// Bind with Even Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};
// lufthansa.buyPlane();
//this return the button
document
  .querySelector(".buy")
  .addEventListener("click", lufthansa.buyPlane.bind(lufthansa));

//Partial application
//we can preset parameters
//the order of arguments matters
//creating a more specific new function based on the mother function
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

//set the this keyword to null if we don't care about it
const addVAT = addTax.bind(null, 0.23);
// const addTax = (value) => value + value * 0.23;
console.log(addVAT(100));
console.log(addVAT(23));

//my function
const addTaxRF = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
console.log(addTaxRF(0.1)(200));

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
//we can loc  the first function to a value and use it afterwords
const addVAT2 = addTaxRate(0.23);

console.log(addVAT2(100));
console.log(addVAT2(23));
