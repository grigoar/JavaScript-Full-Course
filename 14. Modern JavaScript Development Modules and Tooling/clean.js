const shoppingCart = [
  { product: "bread", quantity: 6 },
  { product: "pizza", quantity: 2 },
  { product: "milk", quantity: 4 },
  { product: "water", quantity: 10 },
];

const allowedProducts = {
  lisbon: 5,
  others: 7,
};

const checkCorrectAllowedProducts = function (cart, numAllowed, city) {
  //guard clause
  if (!cart.length) return [];

  const allowed = numAllowed[city] >= 0 ? numAllowed[city] : numAllowed.others;
  // const allowed = numAllowed?.[city] ?? allowedProducts.others;

  const newCart = cart.map((item) => {
    const { product, quantity } = item;
    //don't return item.quantinty because it will modify the original object
    console.log(product, quantity);
    return {
      product,
      quantity: quantity > allowed ? allowed : quantity,
    };
  });

  return newCart;
};
const allowedShoppingCart = checkCorrectAllowedProducts(
  shoppingCart,
  allowedProducts,
  "lisbon"
  // "faro"
);
// console.log(shoppingCart);
console.log(allowedShoppingCart);

const createOrderDescription = function (cart) {
  // const [first] = cart[0];
  const [{ product: p, quantity: q }] = cart;

  return `Order with ${q} ${p}${cart.length > 1 ? ", etc..." : "."}`;
};
const description = createOrderDescription(allowedShoppingCart);

console.log(description);

// var sc = [
//   { product: 'bread', quantity: 6 },
//   { product: 'pizza', quantity: 2 },
//   { product: 'milk', quantity: 4 },
//   { product: 'water', quantity: 10 },
// ];

// var allow = {
//   lisbon: 5,
//   others: 7,
// };

// var description = '';

// var check = function (city) {
//   if (sc.length > 0) {
//     var allowed;
//     if (city == 'lisbon') {
//       allowed = allow.lisbon;
//     } else {
//       allowed = allow.others;
//     }

//     for (item of sc) {
//       if (item.quantity > allowed) item.quantity = allowed;
//     }
//   }
// };
// check('lisbon');
// console.log(sc);

// var createDescription = function () {
//   var first = sc[0];
//   var p = first.product;
//   var q = first.quantity;

//   if (sc.length > 1) {
//     description = 'Order with ' + q + ' ' + p + ', etc...';
//   } else {
//     description = 'Order with ' + q + ' ' + p + '.';
//   }
// };
// createDescription();

// console.log(description);
