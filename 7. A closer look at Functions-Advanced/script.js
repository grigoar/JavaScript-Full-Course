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
// const lufthansa = {
//   airLine: "Lufthansa",
//   iataCode: "LH",
//   bookings: [],
//   //book:function(){}
//   book(flightNum, name) {
//     console.log(
//       `${name} booked a seat on ${this.airLine} flight ${this.iataCode}${flightNum}`
//     );
//     this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
//   },
// };

// lufthansa.book(239, "Grigore Nath");
// lufthansa.book(564, "Mike Ross");

// const eurowings = {
//   airLine: "Eurowings",
//   iataCode: "EW",
//   bookings: [],
// };

// //is a copy, and is now a function, but it doesn't have this anymore
// const book = lufthansa.book;

// //Does not work because this is undefined
// // book(23, "Sarah Williams");

// //call, apply and bind methods
// //the call methods pass the first argument to this
// //manipulating the this keyword with call method
// book.call(eurowings, 23, "Sarah Williams");
// console.log(eurowings);

// book.call(lufthansa, 236, "Maryy Cooper");
// console.log(lufthansa);

// const swiss = {
//   airLine: "Swiss Air Lines",
//   iataCode: "LX",
//   bookings: [],
// };

// book.call(swiss, 33, "Yone Ella");
// console.log(swiss);

// //Apply method same as call but pass an array of arguments , not a list
// const flightData = [2533, "Georfe Cooper"];
// book.apply(swiss, flightData);
// console.log(swiss);

// //we can use call instead of apply
// book.call(swiss, ...flightData);

// //----------------------------------------The bind Method
// //doesn't call immediately the function, it return a new function where this is bound

// //return a function
// //return the this
// //the this is set in stone
// const bookEW = book.bind(eurowings);
// const bookLH = book.bind(lufthansa);
// const bookLX = book.bind(swiss);

// bookEW(32432, "Griff Frig");

// //setting multiple parameters in stone
// const bookEW23 = book.bind(eurowings, 23);
// // const bookEW23 = book.bind(eurowings, 23, "Grig");
// bookEW23("Grig Nath");
// bookEW23("Marth Vision");

// // Bind with Even Listeners
// lufthansa.planes = 300;
// lufthansa.buyPlane = function () {
//   console.log(this);

//   this.planes++;
//   console.log(this.planes);
// };
// // lufthansa.buyPlane();
// //this return the button
// document
//   .querySelector(".buy")
//   .addEventListener("click", lufthansa.buyPlane.bind(lufthansa));

// //Partial application
// //we can preset parameters
// //the order of arguments matters
// //creating a more specific new function based on the mother function
// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 200));

// //set the this keyword to null if we don't care about it
// const addVAT = addTax.bind(null, 0.23);
// // const addTax = (value) => value + value * 0.23;
// console.log(addVAT(100));
// console.log(addVAT(23));

// //my function
// const addTaxRF = function (rate) {
//   return function (value) {
//     return value + value * rate;
//   };
// };
// console.log(addTaxRF(0.1)(200));

// const addTaxRate = function (rate) {
//   return function (value) {
//     return value + value * rate;
//   };
// };
// //we can loc  the first function to a value and use it afterwords
// const addVAT2 = addTaxRate(0.23);

// console.log(addVAT2(100));
// console.log(addVAT2(23));

//---------------------------Challenge #1
///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/
// const poll = {
//   question: "What is your favorite programming language?",
//   options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
//   //This generates [0,0,0,0]. More in the next section
//   answers: new Array(4).fill(0),
//   //-----------------------------my solution
//   //   registerNewAnswer: function () {
//   //     const answer = Number(
//   //       prompt(`${this.question}
//   //       ${poll.options[0]}
//   //       ${poll.options[1]}
//   //       ${poll.options[2]}
//   //       ${poll.options[3]}
//   //       (Write option number)`)
//   //     );
//   //     answer >= 0 && answer <= 3
//   //       ? this.answers[answer]++
//   //       : alert("Not a valid option!");
//   //     console.log(this.answers);
//   //     this.displayResults(this.answers);
//   //   },
//   //   displayResults(type) {
//   //     if (type === "array") console.log(this.answers);
//   //     else {
//   //       console.log(`Poll results are ${this.answers.join(", ")}`);
//   //     }
//   //   },
//   registerNewAnswer: function () {
//     const answer = Number(
//       prompt(
//         `${this.question}\n${this.options.join("\n")}(Write option number)`
//       )
//     );
//     // answer >= 0 && answer <= 3 && typeof answer === "number"
//     //   ? this.answers[answer]++
//     //   : alert("Not a valid option!");
//     //Short circuiting
//     answer >= 0 &&
//       answer <= 3 &&
//       typeof answer === "number" &&
//       this.answers[answer]++;
//     // console.log(this.answers);
//     this.displayResults();
//     this.displayResults("string");
//   },
//   displayResults(type = "array") {
//     if (type === "array") {
//       console.log(this.answers);
//     } else if (type === "string") {
//       //Poll results are 13, 2,4,1
//       console.log(`Poll results are ${this.answers.join(", ")}`);
//     }
//   },
// };
// // const displayResults = function (type) {
// //   type.isArray ? console.log(type) : console.log(`Poll results are ${type}`);
// // };

// // const registerNewAnswer = function () {
// //   const answer = Number(
// //     prompt(`${poll.question}
// //     ${poll.options[0]}
// //     ${poll.options[1]}
// //     ${poll.options[2]}
// //     ${poll.options[3]}
// //     (Write option number)`)
// //   );
// //   answer >= 0 && answer <= 3
// //     ? poll.answers[answer]++
// //     : alert("Not a valid option!");
// //   console.log(poll.answers);
// //   displayResults(poll.answers);
// // };
// // registerNewAnswer();
// // poll.registerNewAnswer();

// const callPoll = poll.registerNewAnswer;
// callPoll.call(poll);

// // document.querySelector(".poll").addEventListener("click", registerNewAnswer);
// document.querySelector(".poll").addEventListener("click", callPoll.bind(poll));

// const data1 = [5, 2, 3];
// const data2 = [1, 5, 3, 9, 6, 1];

// const pollDisplay = poll.displayResults;
// const pollDisplayData = pollDisplay.bind(window);

// pollDisplayData(data1);
// pollDisplayData(data2);

// //the method search for the object.answers and we can manually set the object with the answers
// poll.displayResults.call({ answers: data1 }, "string");
// poll.displayResults.call({ answers: data2 }, "string");

//-------------------------------------------------------Immediately invoked function expression
//executed only once and after it goes away
//this is used for encapsulation based on scope in order to not be overwritten
//this is a pattern

// const runOnce = function () {
//   console.log("This will never run again");
// };
// runOnce();

// // runOnce();
// //we can trick JS to think this is an expression so we wrap it with ()
// // we can call it only once ->Immediately invoked function expression ()
// (function () {
//   console.log("This will never run again");
//   //this data is encapsulation
//   //with the help of scope
//   const isPrivate = 23;
// })();

// // console.log(isPrivate);

// (() => console.log("This will ALSO never run again"))();

// //blocks also protect data
// {
//   const isPrivate = 23;
//   //var is not protected by block
//   var notPrivate = 33;
// }
// // console.log(isPrivate);
// console.log(notPrivate);

// --------------------------------------------------------Closures
//we don't create explicitly
//a closer is a function that remembers all the elements of the function that created the inner function(closer) at birth date
//every function have access to the variable environment ov the execution context where it was created even the function that created the inner function is no longer active in call stack
//the variables are attached to the inner functions(closers)
//Variable environment is attached to the function somewhere in the engine, exactly as it was at the time and place the function was created,
//the closure doesn't loose connection with the environment where it was created in the first place
//priority to look for variable in the closure variable environment even bigger priority than scope chain
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

console.dir(booker);

//-------------More closures examples

//--------Example 1
//f was created outside the g scope
//f was defined in g function
//f was created in global scope but the function was defined in g
let f;
const g = function () {
  const a = 23;
  //kind of f function born
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  //Re-assigning the function f
  //reborn of f function
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);
//in function h we re-assigned the f function
h();
f();
console.dir(f);

//---------Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  //callback function
  //this is also a closure
  //this function was called completed independently
  setTimeout(function () {
    console.log(`We are not boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  //this will not wait until the setTimeout is called
  console.log(`Will start boarding in ${wait} seconds`);
};

//callback function
// setTimeout(function () {
//   console.log("Timer");
// }, 1000);

//verify the closure priority over the priority scope
const perGroup = 1000;
boardPassengers(180, 3);

//-------------------Closure - Challenge
//this iffy executes and is gone, but the document.querySelector("body").addEventListener save the variable environment
(function () {
  const header = document.querySelector("h1");
  header.style.color = "red";
  //this is a closure and it was born when the function was called. It remembers all the variables(header.style.color) in the backpack and it can change it when clicked
  document.querySelector("body").addEventListener("click", function () {
    header.style.color = "blue";
  });
})();

// document.querySelector("body").addEventListener("click", function () {});
