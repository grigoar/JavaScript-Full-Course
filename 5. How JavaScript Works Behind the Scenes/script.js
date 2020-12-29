"use strict";

// //is defined in a global scope
// //it creates its own scope which is an variable environment of its execution context
// function calcAge(birthYear) {
//   const age = 2037 - birthYear;
//   console.log(firstName);

//   function printAge() {
//     let output = `${firstName}, you are ${age}, born in ${birthYear}`;
//     console.log(output);

//     if (birthYear >= 1981 && birthYear <= 1996) {
//       //Creating NEW variable with same name as outer scope's variable
//       //first scope is used, and does not look in outer scope
//       const firstName = "Steven";
//       var millenial = true; //ignore the block scope, it apply the function scope
//       const str = `Oh, and you're a millenial, ${firstName}`;
//       console.log(str);

//       //the scope is only in this block that was defined
//       //unless the use strict mode is removed
//       function add(a, b) {
//         return a + b;
//       }

//       //   const output = "NEW OUTPUT";
//       //Reassingning outer scope's variable
//       output = "NEW OUTPUT";
//     }
//     // console.log(str);//Reference error
//     console.log(millenial);
//     // console.log(add(2, 3));//works if not strict
//     console.log(output);
//     console.log(firstName);
//   }
//   printAge();

//   return age;
// }

// const firstName = "Grigore";
// calcAge(1992);
// // console.log(age);//Reference Error
// // printAge();//Reference Error

// //Variables
// //Temporary Dead Zone from current scope to variable declaration
// console.log(me);
// // console.log(job);//can't access lexical declaration 'addExpr' before initialization
// // console.log(year);//can't access lexical declaration 'addExpr' before initialization

// //var variables are hoisted as undefined
// var me = "Grig";
// let job = "freelancer";
// const year = 1991;

// //Functions
// console.log(addDecl(1, 2));
// // console.log(addExpr(1, 2)); //can't access lexical declaration 'addExpr' before initialization
// // console.log(addArrow(1, 2)); //can't access lexical declaration 'addExpr' before initialization
// //if trying to access the var expression or arrow function the var will return undefined

// function addDecl(a, b) {
//   return a + b;
// }
// // const addExpr = function (a, b) {
// //   return a + b;
// // };
// var addExpr = function (a, b) {
//   //addExpr is not a function
//   return a + b;
// };
// // const addArrow = (a, b) => a + b;
// var addArrow = (a, b) => a + b; //addArrow is not a function

// //Example - DON'T USE VAR
// console.log(numProducts); //undefined != falsy
// if (!numProducts) deleteShoppingCart();

// var numProducts = 10;

// function deleteShoppingCart() {
//   console.log("all products deleted!");
// }

// //property to global window object-> some problems might occur
// var x = 1;
// let y = 2;
// const z = 3;

// console.log(x === window.x);
// console.log(y === window.x);
// console.log(z === window.x);

//--------------------------------Regular function vs arrow functions
// //Pitfalls
// //var firstName = "Matilda";
// const grig = {
//   firstName: "Grig",
//   year: 1992,
//   calcAge: function () {
//     // console.log(this);
//     console.log(2037 - this.year);

//     //   //solution 1 to "this" keyword not working
//     //   const self = this; //self or that
//     //   const isMillenial = function () {
//     //     console.log(this);
//     //     console.log(self);
//     //     // console.log(this.year >= 1981 && this.year <= 1996);
//     //     console.log(self.year >= 1981 && self.year <= 1996);
//     //   };

//     //solution 2 to "this" keyword not working
//     //using the arrow function for using the outer function
//     const isMillenial = () => {
//       console.log(this);
//       // console.log(self);
//       console.log(this.year >= 1981 && this.year <= 1996);
//       // console.log(self.year >= 1981 && self.year <= 1996);
//     };
//     isMillenial();
//   },

//   //it calls the window object instead of current object
//   //don't use the arrow functions as methods
//   greet: () => {
//     // greet: function () {
//     console.log(this);
//     console.log(`Hey ${this.firstName}`);
//   },
// };
// grig.greet();
// // console.log(this.firstName);//undefined
// grig.calcAge();

// //arguments keyword
// const addExpr = function (a, b) {
//   //the regular functions have access to arguments object
//   console.log(arguments);
//   return a + b;
// };
// addExpr(2, 5);
// addExpr(2, 5, 8, 12);

// //arrow functions does not have arguments object
// var addArrow = (a, b) => {
//   console.log(arguments);
//   return a + b;
// };
// // addArrow(2, 5, 6);

//-------------Primitive vs. Objects (primitive Vs. reference types)
// //Primitives
// let age = 30;
// let oldAge = age;
// age = 31;

// console.log(age);
// console.log(oldAge);

// const me = {
//   name: "Grig",
//   age: 30,
// };

// //Vs object (reference types)
// const friend = me;
// friend.age = 28;
// console.log("Friend", friend);
// console.log("Me", me);

// ---------Primitive vs Objects

//Primitive types
let lastName = "Nath";
let oldLastName = lastName;

lastName = "Davis";
console.log(lastName, oldLastName);

//Reference types
const jessica = {
  firstName: "Jessica",
  lastName: "Williams",
  age: 27,
};
const marriedJessica = jessica;
marriedJessica.lastName = "Davis";
console.log("Before marriage: ", jessica);
console.log("After marriage: ", marriedJessica);

//there is created a new object in the memory
// marriedJessica = {}; //not working because it is a const
//changing the object is very different than changing a property of the object

//Coping objects
const jessica2 = {
  firstName: "Jessica",
  lastName: "Williams",
  age: 27,
  family: ["Alice", "Bob"],
};

//creating a new object and assigning it the value of the initial object
//works only on the first level(inner object don't work if changed), need deep clone
//it create a shallow copy
const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = "Davis";

jessicaCopy.family.push("Mary");
jessicaCopy.family.push("John");

//changing the family object of the outer object in both references instead of only one; family object is a reference to the family object from both separate objects
//not really bug but it can leads to problems
console.log("Before marriage: ", jessica2);
console.log("After marriage: ", jessicaCopy);

//lowdash library for deep clone the initial object
