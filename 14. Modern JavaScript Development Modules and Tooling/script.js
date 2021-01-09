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
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to the cart (shipping cost id ${shippingCost})`);
  };

  const orderStock = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} order from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();
ShoppingCart2.addToCart("apple", 5);
ShoppingCart2.addToCart("pizza", 2);

//-------------------Everything closures
console.log(ShoppingCart2);
console.log(ShoppingCart2.shippingCost); //undefined
