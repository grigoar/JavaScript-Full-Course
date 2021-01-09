//Exported Module
//the exported if executed first
console.log("Exporting module...");

const shippingCost = 10;
export const cart = [];

//------------------named export at top level
// if (true) {
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to the cart`);
};

//multiple exports of named exports
const totalPrice = 237;
const totalQuantity = 23;

// export { totalPrice, totalQuantity };
export { totalPrice, totalQuantity as tq };

//---------------------default exports
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to the cart`);
}
