// //Importing module
// //With named imports we need to give the same name and use {}
// // import { addToCart, totalPrice as price, totalQuantity } from "./shoppingCart.js";
// // import { addToCart, totalPrice as price, tq } from "./shoppingCart.js";
// console.log("Importing module...");
// // console.log(shippingCost);
// // addToCart("bread", 6);

// // console.log(totalPrice, totalQuantity);
// // console.log(price, totalQuantity);
// // console.log(price, tq);

// //-------------An Overview of modern JavaScript development
// //-------------An overview of modules in JavaScript
// //--------------Exporting and importing Modules in ES6
// //--------------The Module Pattern

// // import * as ShoppingCart from "./shoppingCart.js";
// // ShoppingCart.addToCart("bread", 5);
// // console.log(ShoppingCart.totalPrice);
// //is like an Open API

// //----------------------import default exports
// // import add, { addToCart, totalPrice as price, totalQuantity } from "./shoppingCart.js";
import add, { cart } from "./shoppingCart.js";
add("pizza", 2);
add("bread", 2);
add("apples", 2);
// console.log(price);

// //imports are not copy of the exports, they are linked and they are pointing to the same data in the memory
console.log(cart);

//-------------------------------------------Old modules works but have limitations
// const ShoppingCart2 = (function () {
//   const cart = [];
//   const shippingCost = 10;
//   const totalPrice = 237;
//   const totalQuantity = 23;

//   const addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(`${quantity} ${product} added to the cart (shipping cost id ${shippingCost})`);
//   };

//   const orderStock = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(`${quantity} ${product} order from supplier`);
//   };

//   return {
//     addToCart,
//     cart,
//     totalPrice,
//     totalQuantity,
//   };
// })();
// ShoppingCart2.addToCart("apple", 5);
// ShoppingCart2.addToCart("pizza", 2);

// //-------------------Everything closures
// console.log(ShoppingCart2);
// console.log(ShoppingCart2.shippingCost); //undefined

//---------------------------COMMONJS Modules
//Export
//this works in nodeJS, this not working in browser
// export.addToCart = function (product, quantity) {
//       cart.push({ product, quantity });
//       console.log(`${quantity} ${product} added to the cart (shipping cost id ${shippingCost})`);
//     };

// //Import
// const {addToCart} = require("./shoppingCart.js")

//---------------------------A brief introduction to the command line
//:ls
//cd ..
//cd
//cd ../..
//create a new folder: mkdir folderName
// type nul > your_file.txt ;>   Creates a new file; >>  Preserves content of the file
//CTRL + C : cancel command
//delete: del fileName
//move move fileName location(../)
//delete folder: rmdir TEST

//------------------------Introduction to NPM
//Node packaging manager(managing all the libraries and dependencies in one place)
//npm init to create package.json
//install library: npm install leaflet , npm i leaflet
//install lodash library for different functions: npm -i lodash-es(for ES modules)-> if not wee need a bondle modulator

//import javascript file for lodash for deep clone
// import cloneDeep from "./node_modules/lodash-es/cloneDeep.js";
import cloneDeep from "lodash-es"; //simple import
// import cloneDeep from "lodash"; //simple import

const state = {
  cart: [
    { product: "bread", quantity: 5 },
    { product: "pizza", quantity: 3 },
  ],
  user: { loggedIn: true },
};

//shallow copy
const stateClone = Object.assign({}, state);
// state.user.loggedIn = false;

//need lodash for deep copy
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateClone);
console.log(stateDeepClone);

//if the project is moved somewhere else we can use "npm i" to intall all the dependencies and libraries back

//------------------------Bundling with Parcel and NPM scripts
//save-dev is used when we install tools not direct dependencies
//install like npm i parcel --sav-dev

//need to install global install to use the commands

//npx commands :->npx parcel index.html
//install exact version:->npm i parcel@1.12.4
//uninstall:-> npm uninstall parcel

//parcel build a script, and the type="module " doesn't work

//hot module replacement:-> will not reload the page
if (module.hot) {
  module.hot.accept();
}

//create a script for running the running parcel
//"start": "parcel index.html"
//and running it with npm run "scriptName"

//run final bundle

//install packages globally: npm i parcel "-g"

//globally means we don't need to write npx , but is not good for keeping the local version of libraries updated

//Configuring BBABEL and polyfilling
//BABEL for transpiling to ES5

class Person {
  greeting = "Hei";
  constructor(name) {
    this.name = name;
    console.log(`${this.greeting} ${this.name}`);
  }
}

const grig = new Person("Grig");

console.log("Grig" ?? null);

console.log(cart.find((el) => el.quantity >= 2));
//find(), Promise, newer features are not translated to ES5
//only syntax can be transpile
//features need to polyfilling
Promise.resolve("TEST").then((x) => console.log(x));

//need a library for polyfilling
//install npm i core-js
import "core-js/stable";
// import "core-js/stable/array/find";
// import "core-js/stable/array/promise";

//Polyfilling async functions
//npm i regenerator-runtime
import "regenerator-runtime/runtime";

//------------------Modern, clean and Declarative JavaScript Programming
