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
  // [`day-${2 + 6}`]: {
  [weekdays[5]]: {
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
// console.log(restaurant);
//enhances methods, fields name, and compute property names

//-------------------------Optional chaining--------------------

// if (restaurant.openingHours && restaurant.openingHours.mon) {
//   console.log(restaurant.openingHours.mon.open);
// }
// if (restaurant.openingHours.fri) {
//   console.log(restaurant.openingHours.fri.open);
// }

// //with OPTIONAL CHAINING
// // console.log(restaurant.openingHours.mon.open);
// console.log(restaurant.openingHours.mon?.open); //if is not defined we get undefined right away
// console.log(restaurant.openingHours?.mon?.open);

// const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

// for (const day of days) {
//   console.log(day);
//   //we can define a default
//   // const open = restaurant.openingHours[day]?.open || "closed";
//   const open = restaurant.openingHours[day]?.open ?? "closed";
//   // openingHours.mon
//   console.log(`On ${day}, we open at ${open}`);
// }

// //Methods
// console.log(restaurant.order?.(0, 1) ?? "Method does not exist");
// console.log(restaurant.orderRisotto?.(0, 1) ?? "Method does not exist");

// //Arrays
// const users = [{ name: "Grig", email: "grig@yahoo.com" }];
// console.log(users[0]?.name ?? "User array empty");
// console.log(users[1]?.name ?? "User array empty");

// if (users.length > 0) console.log(users[0].name);
// else console.log("user array empty");

//-------------------------Looping objects object Keys, Values and Entries

// //Properties names
// const properties = Object.keys(openingHours);
// console.log(properties);

// // console.log(`We are open on ${properties.length} days`);
// let openStr = `We are open on ${properties.length} days: `;

// // for (const day of Object.keys(openingHours)) {
// for (const day of properties) {
//   // console.log(day);
//   openStr += `${day}, `;
// }
// console.log(openStr);

// //Property Values
// const values = Object.values(openingHours);
// console.log(values);

// //loop Entire object
// //return an array of entries
// const entries = Object.entries(openingHours);
// // console.log(entries);

// // for (const x of entries) {
// // for a simple structure we can use const [key, value], but here is an object as a value
// for (const [key, { open, close }] of entries) {
//   // console.log(x);
//   console.log(`On ${key} we open at ${open} and close at ${close}`);
// }

//-------------------------------------Challenge 2-----------------------------
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
// };

// const playersScored = Object.entries(game.scored);
// // for (const [key, player] of playersScored) {
// //if there is an array we use method "entries()" and if we want to loop an object we use the Object.entries(ourObject)
// for (const [key, player] of game.scored.entries()) {
//   console.log(key, typeof key);
//   const goalNr = Number(key) + 1;
//   console.log(`Goal ${goalNr}: ${player}`);
// }

// const odds = Object.values(game.odds);
// let avrOdds = 0;
// for (const odd of odds) {
//   avrOdds += odd;
// }
// console.log(avrOdds / odds.length);

// const oddsTeams = Object.entries(game.odds);
// for (const [team, odd] of oddsTeams) {
//   //my implementation------------------------
//   // const teamD = game[team];
//   // console.log(game[team]);
//   // // game[team] !== "x"
//   // //   ? console.log(`Odd of victory ${teamD}: ${odd}`)
//   // //   : console.log(`Odd of draw: ${odd}`);
//   // game[team]
//   //   ? console.log(`Odd of victory ${teamD}: ${odd}`)
//   //   : console.log(`Odd of draw: ${odd}`);

//   //nicer implementation
//   const teamStr = team === "x" ? "draw" : `victory ${game[team]}`;
//   console.log(`Odd of ${teamStr}: ${odd}`);
// }

// const scorers = {};
// for (const player of game.scored) {
//   // console.log(scorer);
//   scorers[player] ? scorers[player]++ : (scorers[player] = 1);
// }
// console.log(scorers);

// //------------------------------------Sets
// const ordersSet = new Set([
//   "Pasta",
//   "Pizza",
//   "Pizza",
//   "Risotto",
//   "Pasta",
//   "Pizza",
// ]);
// console.log(ordersSet);

// console.log(new Set("Grig"));

// console.log(ordersSet.size);
// //has method to check if an element is in array, like the include for Arrays
// console.log(ordersSet.has("Pizza"));
// console.log(ordersSet.has("Bread"));

// //add elements
// ordersSet.add("Garlic Bread");
// ordersSet.add("Garlic Bread");
// console.log(ordersSet);

// //remove elements
// ordersSet.delete("Risotto");
// console.log(ordersSet);
// // ordersSet.clear();
// for (const order of ordersSet) {
//   console.log(order);
// }

// //in Set there are no indexes

// //Example
// const staff = ["Waiter", "chef", "Waiter", "manager", "Chef", "Master"];
// // const staffUnique = new Set(staff);
// //conversion from set to array
// const staffUnique = [...new Set(staff)];
// console.log(staffUnique);
// console.log(
//   //how many entries are unique in the array
//   new Set(["Waiter", "chef", "Waiter", "manager", "Chef", "Master"]).size
// );

// //how much unique letters are in my name?
// console.log(new Set("nathgrigore").size);

//--------------------------------------------------Maps
// const rest = new Map();
// rest.set("name", "Classico Italiano");
// rest.set(1, "Firenze, Italy");
// rest.set(2, "Lisbon, Portugal");
// console.log(rest.set(2, "Lisbon, Portugal"));

// ///we can chain the setting the new elements
// rest
//   .set("categories", ["Italian", "Pizzeria", "Vegetarian", "Organic"])
//   .set("open", 11)
//   .set("close", 23)
//   .set(true, "We are open :D")
//   .set(false, "We are closed");

// console.log(rest.get("name"));
// console.log(rest.get(true));
// console.log(rest.get("1"));
// console.log(rest.get(1));

// const time = 21;
// //clever but not practical
// console.log(rest.get(time > rest.get("open") && time < rest.get("close")));

// console.log(rest.has("categories"));
// rest.delete(2);

// const arr = [1, 2];
// // rest.set([1, 2], "Test");
// rest.set(arr, "Test");
// console.log(rest);

// // rest.clear();
// console.log(rest.size);

// //using array as map keys, need a separate variable
// console.log(rest.get([1, 2])); //undefined
// console.log(rest.get(arr));

// //can add DOM elements
// rest.set(document.querySelector("h1"), "Heading");
// console.log(rest);

// //we can create a new map directly with the values like an array
// //but if we need to add new entries programmatically we need the set method
// const question = new Map([
//   ["question", "What is the best programming language in the world?"],
//   [1, "C"],
//   [2, "Java"],
//   [3, "JavaScript"],
//   ["correct", 3],
//   [true, "Correct :d"],
//   [false, "Try again"],
// ]);
// console.log(question);

// //Convert object to map
// console.log(Object.entries(openingHours));
// const hoursMap = new Map(Object.entries(openingHours));

// console.log(hoursMap);

// //Quiz app
// //Iteration of Maps
// console.log(question.get("question"));
// for (const [key, value] of question) {
//   if (typeof key === "number") {
//     console.log(`Answer ${key}: ${value}`);
//   }
// }
// // const answer = Number(prompt("Your answer"));
// const answer = 3;
// console.log(answer);

// // if (answer === question.get("correct")) console.log(question.get(true));
// // else console.log(question.get(false));
// console.log(question.get(answer === question.get("correct")));

// //convert a map to an array
// console.log([...question]);
// console.log(...question.entries());
// console.log(...question.values());
// console.log(...question.keys());

//------------------------------------Which data structure to use?
// 76.	Arrays: - Use when you need ordered list of values(might contain duplicates); - Use when you need to manipulate data as arrays have handy methods.
// 77.	Sets: -Use when you need to work with unique values; -Use when high-performance is really important; -Use to remove duplicates from arrays
// 78.	Objects: -More “traditional” key/value store (“abused” objects); -Easier to write and access values with . and []; -Use when you need to include functions (methods); - Use when working with JSON(can convert to map)
// 79.	Maps: -Better Performance; -Keys can have any data type ; -Easy to iterate ; -Easy to compute size; -Use when you simply need to map key to values; - Use when you need keys that are not strings

//-------------------------------------Challenge nr3
// const gameEvents = new Map([
//   [17, "⚽️ GOAL"],
//   [36, "🔁 Substitution"],
//   [47, "⚽️ GOAL"],
//   [61, "🔁 Substitution"],
//   [64, "🔶 Yellow card"],
//   [69, "🔴 Red card"],
//   [70, "🔁 Substitution"],
//   [72, "🔁 Substitution"],
//   [76, "⚽️ GOAL"],
//   [80, "⚽️ GOAL"],
//   [92, "🔶 Yellow card"],
// ]);
// // const gameEvents = new Map([
// //   []
// // ]);

// // const events = [...gameEvents.values];
// // console.log(...gameEvents.values());

// console.log(...gameEvents.values());
// //creating an array from a set
// // const events = new Set(gameEvents.values());
// const events = [...new Set(gameEvents.values())];
// console.log(events);
// // console.log(events);
// gameEvents.delete(64);
// console.log(gameEvents);
// console.log(
//   `An even happened, on average, every ${90 / gameEvents.size} minutes`
// );
// const time = [...gameEvents.keys()].pop();
// console.log(time);

// for (const [key, value] of gameEvents) {
//   const half = key <= 45 ? `[FIRST HALF]` : `[SECOND HALF]`;
//   console.log(`${half} ${key}: ${value}`);
// }

// //------------------------Strings-------------------------
// //Stings are primitives and are immutable
// const airline = "TAP Air Portugal";
// const plane = "A320";
// console.log(plane[0]);
// console.log(plane[1]);
// console.log(plane[2]);
// console.log("B737"[0]);

// console.log(airline.length);
// console.log("B747".length);

// //at what position a character is in the sting
// console.log(airline.indexOf("r"));
// console.log(airline.lastIndexOf("r"));
// //case sensitive
// console.log(airline.indexOf("Portugal"));

// //extraction start at position ...
// //don`t change the initial string and return a new string
// console.log(airline.slice(4));
// console.log(airline.slice(4, 6)); //2 characters extracted

// //extract without hard code
// console.log(airline.slice(0, airline.indexOf(" ")));
// console.log(airline.slice(airline.lastIndexOf(" ") + 1));

// console.log(airline.slice(-2));
// console.log(airline.slice(1, -1));

// const checkMiddleSeat = function (seat) {
//   //B and E are middle seats
//   const s = seat.slice(-1);
//   if (s === "B" || s === "E") {
//     console.log("you got the middle seat :D");
//   } else console.log("You got lucky");
// };
// checkMiddleSeat("11B");
// checkMiddleSeat("23C");
// checkMiddleSeat("3E");

// //Boxing. Javascript is smart and takes the primitive string and converts behind the scene to an object string so we can call the methods. After calling the method it returns a primitive string again(unboxing)
// console.log(new String("grig"));
// console.log(typeof new String("grig"));

// console.log(typeof new String("grig").slice(1));

// console.log(airline.toLowerCase());
// console.log(airline.toUpperCase());

// //Fix capitalization in name
// const passenger = "gRiG";
// const passengerLower = passenger.toLowerCase();
// const passengerCorrect =
//   passengerLower[0].toUpperCase() + passengerLower.slice(1);
// console.log(passengerCorrect);

// // Check/ Comparing emails
// const email = "grig@yahoo.com";
// const loginEmail = "Grig@yahoO.Com \n";

// // const lowerEmail = loginEmail.toLowerCase();
// // const trimmedEmail = lowerEmail.trim();
// // console.log(trimmedEmail);

// //replace faster
// const normalizedEmail = loginEmail.toLowerCase().trim();
// console.log(normalizedEmail);

// console.log(email === normalizedEmail);

// //Replace parts of strings
// const priceGB = "288,97$";
// const priceUS = priceGB.replace("$", "&").replace(",", ".");
// console.log(priceUS);

// //replace words into a string
// const announcement = `All passengers come to barding door 23. Boarding door 23`;
// console.log(announcement.replace("door", "gate"));
// console.log(announcement.replaceAll("door", "gate"));

// //regular expression
// //string global
// console.log(announcement.replace(/door/g, "gate"));

// //Methods that return Booleans
// const plane1 = "Airbus A320neo";
// console.log(plane1.includes("A320"));
// console.log(plane1.includes("A3209"));
// console.log(plane1.startsWith("neo"));
// console.log(plane1.startsWith("A32"));

// if (plane1.startsWith("Airbus") && plane1.endsWith("neo")) {
//   console.log("Part of the NEW Airbus family");
// }

//Practice exercise
// const checkBaggage = function (items) {
//   const baggage = items.toLowerCase();
//   if (baggage.includes("knife") || baggage.includes("gun")) {
//     console.log("You are not allowed on board");
//   } else {
//     console.log("Welcome aboard");
//   }
// };
// checkBaggage("I have a laptop, some FooD and a pocket Knife");
// checkBaggage("Socks and camera");
// checkBaggage("Got some snacks and a gun for protection");

// //--------------Part 3
// //Split with join
// console.log("a+very+nice+string".split("+"));
// console.log("Grigore Nath".split(" "));

// const [firstName, lastName] = "Grigore Nath".split(" ");

// //adding spaces/others with join
// const newName = ["Mr.", firstName, lastName.toUpperCase()].join(" ");
// console.log(newName);

// const capitalizeName = function (name) {
//   const names = name.split(" ");
//   const namesUpper = [];
//   for (const word of names) {
//     // namesUpper.push(word[0].toUpperCase() + word.slice(1));
//     namesUpper.push(word.replace(word[0], word[0].toUpperCase()));
//   }
//   console.log(namesUpper.join(" "));
// };
// capitalizeName("jessica ann smith davis");
// capitalizeName("grigore nath");

// //Padding of strings
// //stings to have the same length
// const message = "Go to gate 23!";
// console.log(message.padStart(25, "+"));
// console.log(message.padStart(25, "+").padEnd(35, "+"));
// console.log("Grig".padStart(25, "+").padEnd(35, "+"));

// const maskCreditCard = function (number) {
//   // const str = String(number);
//   const str = number + "";
//   const last = str.slice(-4);
//   return last.padStart(str.length, "*");
// };

// console.log(maskCreditCard(3434223423423432423));
// console.log(maskCreditCard("12123432432423423999"));

// //Repeat method
// const message2 = "Bad weather... All Departures Delayed... ";

// console.log(message2.repeat(5));

// const planesInLine = function (n) {
//   console.log(`There are ${n} planes in line ${"plane ".repeat(n)}`);
// };

// planesInLine(5);
// planesInLine(3);
// planesInLine(13);

//--------------------------------Strings challenge
// text data
// underscore_case
// first_name
// Some_Variable
// calculate_AGE
// delayed_departure

/*
underscore_case
first_name
Some_Variable
calculate_AGE
delayed_departure
*/
document.body.append(document.createElement("textarea"));
document.body.append(document.createElement("button"));
let text = "";

//----------------------------MY implementation------------------------------------------
// document.querySelector("button").addEventListener("click", function () {
//   text = document.querySelector("textarea").value;

//   text = text.toLowerCase().trim();
//   const lineSplitter = text.split("\n");
//   console.log(lineSplitter);
//   let star = 0;
//   for (let longWord of lineSplitter) {
//     star++;
//     let [firstWord, secondWord] = longWord.split("_");
//     secondWord = secondWord.replace(secondWord[0], secondWord[0].toUpperCase());
//     //secondWord = secondWord[0].toUpperCase + secondWord.slice(1);
//     let finishedWord = firstWord + secondWord;
//     // console.log(firstWord + secondWord);
//     // console.log(`${firstWord}${secondWord}`);

//     console.log(`${finishedWord.padEnd(35, " ")}${"*".repeat(star)}`);
//   }

//   // const finishedLine = transformLine.join(transformLine[0]);

//   // console.log(text);
// });

//original implementation
document.querySelector("button").addEventListener("click", function () {
  text = document.querySelector("textarea").value;
  const rows = text.split("\n");
  console.log(rows);

  // for (const row of rows) {
  //if we want to get the indexes we need to deconstruct the entries
  for (const [i, row] of rows.entries()) {
    const [first, second] = row.toLowerCase().trim().split("_");
    // console.log(row, first, second);
    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;

    console.log(`${output.padEnd(20, " ")}${"*".repeat(i + 1)}`);
  }
});
