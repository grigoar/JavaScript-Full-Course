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
// import add, { cart } from "./shoppingCart.js";
// add("pizza", 2);
// add("bread", 2);
// add("apples", 2);
// // console.log(price);

// //imports are not copy of the exports, they are linked and they are pointing to the same data in the memory
// console.log(cart);

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
import cloneDeep from "./node_modules/lodash-es/cloneDeep.js";

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
console.log(stateClone);

//need lodash for deep copy
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateDeepClone);

//if the project is moved somewhere else we can use "npm i" to intall all the dependencies and libraries back
