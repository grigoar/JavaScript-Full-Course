"use strict";

const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

//compute the properties names
//ES 6 ENHANCE
const openingHours = {
  [weekdays[3]]: {
    // thu: {
    open: 12,
    close: 22,
  },
  // fri: {
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  // sat: {
  [`day-${2 + 6}`]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};
const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  //ES6 enhanced object literals
  openingHours,
  //instead of
  // openingHours:openingHours,

  // openingHours: {
  //   thu: {
  //     open: 12,
  //     close: 22,
  //   },
  //   fri: {
  //     open: 11,
  //     close: 23,
  //   },
  //   sat: {
  //     open: 0, // Open 24 hours
  //     close: 24,
  //   },
  // },

  //From ES6 Enhancement
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  // order: function (starterIndex, mainIndex) {
  //   return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  // },

  // orderDelivery: function (obj) {
  //we can do destructuring of the object right away
  // orderDelivery: function ({ starterIndex , mainIndex, time, address }) {
  //can add default values
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = "20:00",
    address,
  }) {
    // console.log(obj);
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ingredients: ${ing1}, ${ing2}, ${ing3}`
    );
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};
//-------------------------Objects Destructuring

// restaurant.orderDelivery({
//   time: "22:30",
//   address: "Via de Sole, 23",
//   mainIndex: 2,
//   starterIndex: 2,
// });

// restaurant.orderDelivery({
//   address: "Via de Sole, 23",
//   starterIndex: 1,
// });

// //we need to use the property name of the object in the destructuring
// // the order doesn't matter
// //for API calls
// const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);

// //for new names of the property name of the object
// const {
//   name: restaurantName,
//   openingHours: hours,
//   categories: tags,
// } = restaurant;
// console.log(restaurantName, hours, tags);

// //we can set a default value and changing the name
// const { menu = [], starterMenu: starters = [] } = restaurant;
// console.log(menu, starters);

// // Mutating variables
// let a = 111;
// let b = 999;
// const obj = { a: 23, b: 7, c: 14 };
// // let { a, b } = obj;
// //we need parentheses so that the compiler doesn't interpret it like a block
// ({ a, b } = obj);
// console.log(a, b);

// //Nested objects
// // const { fri } = openingHours;

// //for nesting data
// const {
//   // fri: { open, close },
//   fri: { open: o, close: c },
// } = openingHours;
// // console.log(fri);
// // console.log(open, close);
// console.log(o, c);

//------------------------------Arrays destructuring
// const arr = [2, 3, 4];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];

// //it looks like an array but it is not, it is just destructuring assignment
// const [x, y, z] = arr;
// console.log(x, y, z);
// console.log(arr);

// //Destructuring - we can skip an element with " "
// // const [first, , second] = restaurant.categories;
// let [main, , secondary] = restaurant.categories;
// // console.log(first, second);
// console.log(main, secondary);

// // //swap elements
// // const temp = main;
// // main = secondary;
// // secondary = temp;
// // console.log(main, secondary);

// //Swapping elements by destructuring
// [main, secondary] = [secondary, main];
// console.log(main, secondary);

// // console.log(restaurant.order(2,0));
// //destructuring
// //Receive 2 return values from a function
// const [starter, mainCourse] = restaurant.order(2, 0);
// console.log(starter, mainCourse);

// //nested arrays
// //nested destructuring
// const nested = [2, 4, [5, 6]];
// // const [i, , j] = nested;
// // console.log(i, j);
// //we need to do destructuring inside of destructuring to have access to the nested array
// const [i, , [j, k]] = nested;
// console.log(i, j, k);

// //default values
// // const [p, q, r] = [8, 9];
// const [p = 1, q = 1, r = 1] = [8, 9];
// console.log(p, q, r);

// //-------------------------------------------------Spread Operator
// //it helps to expend an array
// const arr = [7, 8, 9];
// const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
// console.log(badNewArr);

// //the spread operator copy all the elements out of the array
// // const newArr = [1, 2, arr];
// const newArr = [1, 2, ...arr];
// console.log(newArr);
// //When we need the elements of an array individual
// console.log(...newArr);

// //creating a new array
// const newMenu = [...restaurant.mainMenu, "Gnocci"];
// console.log(newMenu);

// //Copy array
// const mainMenuCopy = [...restaurant.mainMenu];

// //Join 2 arrays
// const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
// console.log(menu);

// //spread operator work on all iterables
// //Iterables: arrays, string, maps, sets. NOT objects
// const str = "Grig";
// const letters = [...str, " ", "S."];
// console.log(letters);

// console.log(...str);
// console.log("j", "o");
// //can put multpiple values into sting literal
// // console.log(`${...str} Nath`);

// restaurant.orderPasta("tomato", "cheese", "ham");

// // //Real-world example
// // const ingredients = [
// //   prompt("Let's make pasta! Ingredient 1?"),
// //   prompt(" Ingredient 2?"),
// //   prompt("Ingredient 3?"),
// // ];
// // console.log(ingredients);

// // // restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
// // restaurant.orderPasta(...ingredients);

// //Objects - Spread operator
// const newRestaurant = { foundedIn: 1993, ...restaurant, founder: "Guiseppe" };
// console.log(newRestaurant);

// const restaurantCopy = { ...restaurant };
// restaurantCopy.name = "Restaurante Roma";
// console.log(restaurantCopy.name);
// console.log(restaurant.name);

//------------------------------------------------------Rest operator-------------------

// //1)Destructuring

// //SPREAD, because on RIGHT side of =
// const arr = [1, 2, ...[3, 4]];
// console.log(arr);

// //REST , because on LEFT side of =
// const [a, b, ...others] = [1, 2, 3, 4, 5];
// console.log(a, b, others);

// //The REST operator must be the last parameter and only one rest element
// const [pizza, , risotto, ...otherFood] = [
//   ...restaurant.mainMenu,
//   ...restaurant.starterMenu,
// ];
// console.log(pizza, risotto, otherFood);

// //Objects
// const { sat, ...weekdays } = restaurant.openingHours;
// console.log(weekdays);

// //2)Functions
// //can take all the arguments passed to the function with the rest operator
// const add = function (...numbers) {
//   console.log(numbers);
//   let sum = 0;
//   for (let i = 0; i < numbers.length; i++) {
//     sum += numbers[i];
//   }
//   console.log(sum);
// };
// add(2, 3);
// add(5, 6, 3, 6, 7);
// add(5, 6, 3, 6, 7, 4, 7, 23);

// const x = [23, 5, 7];
// //SPREAD OPERATOR(PACK  the VALUE) => REST OPERATOR (UNPACK the VALUE)
// add(...x);

// restaurant.orderPizza("mushrooms", "onion", "olives", "spinach");
// restaurant.orderPizza("mushrooms");
// // restaurant.orderPizza();

//-------------------------------Short Circuiting && and ||

// //Use ANY data type, return ANY data type, short-circuiting evaluation
// //if the first value is truthy than the first value is immediately returned, if not the second value is returned

// console.log("--------------OR------------------------");
// console.log(3 || "Grig");
// console.log("" || "Grig");
// console.log(true || 0);
// console.log(undefined || "");
// console.log(undefined || null);

// console.log(undefined || 0 || "" || "Hello" || 23 || null);

// //this is not working
// // restaurant.numGuests = 0;
// restaurant.numGuests = 23;
// const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
// console.log(guests1);

// //we can define default value instead of ternary operator
// const guest2 = restaurant.numGuests || 10;
// console.log(guest2);

// console.log("--------------AND------------------------");
// //Use ANY data type, return ANY data type, short-circuiting evaluation
// //if the first value is falsy than the first value is immediately returned, if not the second value is returned
// //is exactly the opposite of the OR operator
// console.log(0 && "Grig");
// console.log(7 && "Grig");

// console.log("Hello" && 23 && null && "grig");

// //verify if the orderPizza exists
// if (restaurant.orderPizza) {
//   restaurant.orderPizza("mushrooms", "spinach");
// }
// //we can check if the orderPizza method exist and if is not short circuiting then call the method
// restaurant.orderPizza && restaurant.orderPizza("mushrooms", "spinach");

// //-----------------------------------------The nullish Coalescing Operator
// restaurant.numGuests = 0;

// //we can define default value instead of ternary operator
// const guest2 = restaurant.numGuests || 10;
// console.log(guest2);

// //Nullish: null and undefined (not include 0 or "")
// const guestCorrect = restaurant.numGuests ?? 10;
// console.log(guestCorrect);

// //------------------------------Challenge-------------------------
// const game = {
//   team1: "Bayern Munich",
//   team2: "Borrussia Dortmund",
//   players: [
//     [
//       "Neuer",
//       "Pavard",
//       "Martinez",
//       "Alaba",
//       "Davies",
//       "Kimmich",
//       "Goretzka",
//       "Coman",
//       "Muller",
//       "Gnarby",
//       "Lewandowski",
//     ],
//     [
//       "Burki",
//       "Schulz",
//       "Hummels",
//       "Akanji",
//       "Hakimi",
//       "Weigl",
//       "Witsel",
//       "Hazard",
//       "Brandt",
//       "Sancho",
//       "Gotze",
//     ],
//   ],
//   score: "4:0",
//   scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
//   date: "Nov 9th, 2037",
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },

//   //using rest operator
//   printGoals: function (...players) {
//     for (let i = 0; i < players.length; i++) {
//       console.log(players[i] + " scored");
//     }
//     console.log(`Total number of goals scored is ${players.length}`);
//   },
// };

// //destructuring
// const [players1, players2] = game.players;
// console.log(players1, "other team", players2);

// //destructuring with rest operator
// const [gk, ...fieldPlayers] = players1;
// console.log(gk + " and the  field players: " + fieldPlayers);

// //joining the two teams with the spread operator
// const allPlayers = [...players1, ...players2];
// console.log(allPlayers);

// //creating a new array with the spread operator
// const players1Final = [...players1, "Thiago", "Coutinho", "Perisic"];
// console.log(players1Final);

// //pairs of object property name and the name we want
// //destructuring the object fields
// // const { team1: team1, x: draw, team2: team2 } = game.odds;
// //destructuring nested objects
// const {
//   odds: { team1: team1, x: draw, team2: team2 },
// } = game;
// console.log(team1, draw, team2);

// game.printGoals("Davies", "Muller", "Levandowsky", "Kimich");
// console.log("Second game =====================");
// game.printGoals(...game.scored);

// //who will win based on the odds
// // const winningTeam = team1 || draw || team2;
// // console.log(winningTeam);

// team1 < team2 && console.log("Team 1 is more likely to win");
// team1 > team2 && console.log("Team 2 is more likely to win");

//--------------------Looping arrays The FOR-OF LOOP----------------------
// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// for (const item of menu) {
//   console.log(item);
// }

// // for (const item of menu.entries()) {
// //destructuring the element
// for (const [i, el] of menu.entries()) {
//   // console.log(item);
//   // console.log(`${item[0] + 1}: ${item[1]}`);
//   console.log(`${i + 1}: ${el}`);
// }
// console.log([...menu.entries()]);

//---------------------------------Enhanced Object Literals-------------------------------
console.log(restaurant);
//enhances methods, fields name, and compute property names
