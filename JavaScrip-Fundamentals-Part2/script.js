//Strict mode- activate use strict for using strict mode
//must be use in the first line before any code
//it is used to write a more secure code
//forbids us to do some things and when it fails it fails it shows erros in console
'use strict';

// let hasDriversLicense = false;
// const passTest = true;

// //if 'use strict" is not activated if there is a name spelling error nothing is displayed
// if (passTest) hasDriversLicense = true;
// if (hasDriversLicense) console.log("I can drive");

//interface, private might be implemented in the feature
//and the 'use strict prevent us to use the reserved words
// const interface = "Audio";
// const private = 532;

// const if = 23;

//-----------------------FUNCTIONS
//function declarations- 
// function logger() {
//     console.log("My name is Grig");
// }

// //calling //invoking// running the function
// logger();

// function fruitProcessor(apples, oranges) {
//     console.log(apples, oranges);
//     const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
//     return juice;
// }
// const appleJuice = fruitProcessor(3, 4);
// console.log(appleJuice);
// console.log(fruitProcessor(4, 5));

// const appleOrangeJuice = fruitProcessor(2, 5);
// console.log(appleOrangeJuice);

//----------------------------------Function declaration vs Expressions

// function calcAge1(birthYear) {
//     const age = 2037 - birthYear;
//     return age;
// }

// const age1 = calcAge1(1992);
// console.log(age1);

// //Function expression
// //Anonymous function
// //function is a value
// const calcAge2 = function (birthYear) {
//     return 2037 - birthYear;
// }

// const age2 = calcAge2(1992);
// console.log(age1, age2);

//-------------------------------------Arrow function
//the arrow function does not get this keyword
//implicit return for one line return statement
// const calcAge3 = birthYear => 2037 - birthYear;
// const age3 = calcAge3(1992);
// console.log(age3);

// // const yearsUntilRetirement = birthYear => {
// const yearsUntilRetirement = (birthYear, firstName) => {
//     const age = 2037 - birthYear;
//     const retirement = 65 - age;
//     // return retirement;
//     return `${firstName} retires in ${retirement} years`
// }

// console.log(yearsUntilRetirement(1992, "Grig"));
// console.log(yearsUntilRetirement(1965, "Ana"));


//---------------------------------calling function from another function

// function cutFruitPieces(fruit) {
//     return fruit * 4;
// }

// function fruitProcessor(apples, oranges) {
//     const applePieces = cutFruitPieces(apples);
//     const orangePieces = cutFruitPieces(oranges);
//     console.log(apples, oranges);
//     // const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
//     const juice = `Juice with ${applePieces} pieces of apples and ${orangePieces} pieces of oranges.`;
//     return juice;
// }

// console.log(fruitProcessor(2, 3));


//Function review

// const calcAge = function (birthYear) {
//     return 2037 - birthYear;
// }

// const yearsUntilRetirement = function (birthYear, firstName) {
//     const age = calcAge(birthYear);
//     const retirement = 65 - age;

//     if (retirement > 0) {
//         console.log(`${firstName} retires in ${retirement} years`);
//         return retirement;
//     } else {
//         console.log(`${firstName} has already retired`);
//         return -1;
//     }

//     // return retirement;
//     // return `${firstName} retires in ${retirement} years`
// }
// console.log(yearsUntilRetirement(1992, "Grig"));
// console.log(yearsUntilRetirement(1960, "Mike"));


//=----------------------Function challenge

// const calcAverage = (first, second, third) => (first + second + third) / 3;


// let averageDolphins = calcAverage(85, 54, 41);
// let averageKoalas = calcAverage(23, 34, 27);

// const checkWinner = function (averageDolphins, averageKoalas) {
//     if (averageDolphins >= averageKoalas * 2) {
//         console.log(`Dolphins win (${averageDolphins} vs ${averageKoalas})`);
//     } else if (averageKoalas >= averageDolphins * 2) {
//         console.log(`Koalas win (${averageKoalas} vs ${averageDolphins})`);
//     } else {
//         console.log(`No one wins. The average score were Dolphins:${averageDolphins} vs. Koalas:${averageKoalas} `);
//     }
// }
// checkWinner(averageDolphins, averageKoalas);
// averageDolphins = calcAverage(44, 23, 71);
// averageKoalas = calcAverage(65, 54, 49);
// console.log("New values");
// checkWinner(averageDolphins, averageKoalas);

//====================Arrays
// const friends = ["Michael", "Steven", "Peter"];
// console.log(friends);

// const yearsW = new Array(1992, "Hello", 1934, 2421, 2002);
// console.log(yearsW);

// console.log(friends[0]);
// console.log(friends[2]);
// console.log(friends.length);
// console.log(friends[friends.length - 1]);

// //The arrays are muttable, that means even the data is declared constant, the elements of the arrrays can be changed
// friends[2] = "Jay";
// console.log(friends);
// //not working this way
// // friends = ["Grig", "Hello"];

// const firstName = "grig";
// //accepts expressions
// const grig = [firstName, "Nath", 2020 - 1992, 'freelancer', friends];
// console.log(grig);


// const calcAge = function (birthYear) {
//     return 2037 - birthYear;
// }

// const years = [1990, 1967, 2002, 2010, 2018];

// calcAge(years);
// const age1 = calcAge(years[0]);
// const age2 = calcAge(years[1]);
// const age3 = calcAge(years[years.length - 1]);
// console.log(age1, age2, age3);

// const ages = [calcAge(years[0]), calcAge(years[1]), calcAge(years[years.length - 1])];
// console.log(ages);

//----------------------------------Array operations- Methods

// const friends = ["Michael", "Steven", "Peter"];
// //Add element at the end of the array
// //push method return length
// const newLength = friends.push("Jay");

// console.log(friends);

// //add a new element at the begging of the array
// friends.unshift("John");
// console.log(friends);

// //Remove elements
// //Remove from the end of the array
// //returning the removed element
// const popped = friends.pop();
// console.log(friends);
// console.log(popped);

// //removing first element from the array
// friends.shift();//First
// console.log(friends);

// //index of an element
// console.log(friends.indexOf("Steven"));
// console.log(friends.indexOf("Bob"));

// //verify if the element is in the array
// friends.push(23);
// console.log(friends.includes("Steven"));
// console.log(friends.includes("Bob"));
// //strict equality
// console.log(friends.includes("23"));//false
// console.log(friends.includes(23));//true

// if (friends.includes("Peter")) {
//     console.log("You have a friend called Peter");
// }


//==============================Array challenge

// const calcTip = bill => {
//     return (bill > 50 && bill <= 300) ? 15 / 100 * bill : 20 / 100 * bill;
// }
// console.log(calcTip(100));

// const bills = [125, 555, 44];
// const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])]
// const total = [bills[0] + calcTip(bills[0]), bills[1] + calcTip(bills[1]), bills[2] + calcTip(bills[2])]
// console.log(bills);
// console.log(tips);
// console.log(total);

//=======================OBJECTS
//pairs of keys(properties) and values
//OBJECT LITERAL SYNTAX
//order of keys doesn't matter
// const grig = {
//     firstName: "Grig",
//     lastName: "Nath",
//     age: 2039 - 1992,
//     job: "freelancer",
//     friends: ["Michael", "Steven", "Peter"]
// }

// // "." vs "[]"" notation
// console.log(grig);

// console.log(grig.lastName);
// //we can put an expression in the []
// console.log(grig["lastName"]);

// //in the [] we can compute some dynamic results
// const nameKey = "Name";
// console.log(grig["first" + nameKey]);
// console.log(grig["last" + nameKey]);

// // console.log(grig."last"+nameKey);//Doesn't work

// // const interestedIn = prompt("What do you want to know about Grig? Choose between firstName, lastName, age, job and friends");
// // console.log(interestedIn);
// // console.log(grig.interestedIn);//fail
// // console.log(grig[interestedIn]);//work

// // if (grig[interestedIn]) {
// //     console.log(grig[interestedIn]);//work
// // } else {
// //     alert("Wrong request! Choose between firstName, lastName, age, job and friends")
// // }
// grig.location = "Romania";
// grig["twitter"] = "@griggrig";
// console.log(grig);

// //Challenge
// //"Grig has 3 friends, and his best friend is called Michael"

// //"."(dot) is an operator
// //operator precedence Member Access "."(left to right),computed Member Access "..."(left-to-right)
// console.log(`${grig.firstName} has ${grig.friends.length}, and his best friend is called ${grig.friends.shift()}`);


//------------------------------------Object methods

// const grig = {
//     firstName: "Grig",
//     lastName: "Nath",
//     birthYear: 1992,
//     job: "freelancer",
//     friends: ["Michael", "Steven", "Peter"],
//     hasDriversLicence: true,

//     //we can use function expression
//     //any function attached to an object is a method
//     // calcAge: function (birthYear) {
//     //     return 2037 - birthYear;
//     // }
//     // calcAge: function () {
//     //     // console.log(this);
//     //     return 2037 - this.birthYear;
//     // }

//     calcAge: function () {
//         // console.log(this);
//         //creating new properties to store the new values and to not calculate for every time
//         this.age = 2037 - this.birthYear;
//         return this.age;
//     },
//     getSummary: function () {
//         // console.log(`${this.firstName} is a ${this.calcAge()} years old freelancer and he ${this.hasDriversLicence ? "has" : "hasn't"} a driver license`);
//         return `${this.firstName} is a ${this.calcAge()} years old ${this.job} and he ${this.hasDriversLicence ? "has" : "hasn't"} a driver license`
//     }

// }

// //the functions are values
// const calcAge = function (birthYear) {
//     return 2037 - birthYear;
// }
// // console.log(grig.calcAge(1992));
// // console.log(grig["calcAge"](1992));
// //calculate once and than the property age is defined
// console.log(grig.calcAge());
// console.log(grig.age);
// console.log(grig.age);
// console.log(grig.age);

// //Challenge
// // console.log(`${grig.firstName} is a ${grig.calcAge()} years old freelancer and he ${grig.hasDriversLicence ? "has" : "hasn't"} a driver license`);
// console.log(grig.getSummary());

//--------------------Challenge #3
// const mark = {
//     firstName: "Mark",
//     lastName: "Miller",
//     mass: 78,
//     height: 1.69,

//     calcBMI: function () {
//         this.BMI = this.mass / this.height ** 2;
//         return this.BMI;
//     }
// }
// const john = {
//     firstName: "John",
//     lastName: "Smith",
//     mass: 92,
//     height: 1.95,

//     calcBMI: function () {
//         this.BMI = this.mass / this.height ** 2;
//         return this.BMI;
//     }
// }
// console.log(mark.BMI);
// console.log(mark.calcBMI());
// console.log(mark.BMI);
// console.log(john.BMI);
// console.log(john.calcBMI());
// console.log(john.BMI);


// if (mark.BMI > john.BMI) {
//     console.log(`${mark.firstName} ${mark.lastName}'s BMI(${mark.BMI}) is higher than ${john.firstName} ${john.lastName}'s BMI (${john.BMI}) !`);
// } else {
//     console.log(`${john.firstName} ${john.lastName}'s BMI(${john.BMI}) is higher than ${mark.firstName} ${mark.lastName}'s BMI (${mark.BMI}) !`);
// }

//-----------------------ITERATIONS-LOOPS
// console.log("Lifting weights repetition 1");
// console.log("Lifting weights repetition 2...");

//for loop keeps running while condition is TRUE
// for (let rep = 1; rep <= 10; rep++) {
//     console.log(`Lifting weights repetition ${rep}`);
// }

// const grigArray = [
//     "grig", "nath", 2020, "freelancer", ["john", "mike", "Peter", "Steven"],
//     true
// ];
// const types = []
// for (let i = 0; i < grigArray.length; i++) {
//     //Reading an array
//     console.log(grigArray[i], typeof grigArray[i]);
//     //Build a new array 1
//     types.push(typeof grigArray[i]);
//     //Build a new array 2
//     // types[i] = typeof grigArray[i];

// }
// console.log(types);

// const years = [1991, 2008, 1969, 2020];
// const ages = [];
// for (let i = 0; i < years.length; i++) {
//     ages.push(2037 - years[i]);
// }
// console.log(ages);

// //continue and break
// for (let i = 0; i < grigArray.length; i++) {
//     if (typeof grigArray[i] !== 'string') continue;
//     console.log(grigArray[i], typeof grigArray[i]);
// }
// console.log("BREAK WITH NUMBER");
// for (let i = 0; i < grigArray.length; i++) {
//     if (typeof grigArray[i] === 'number') break;
//     console.log(grigArray[i], typeof grigArray[i]);
// }

//-----------------Looping Backwards and Loops in loops

// const grigArray = [
//     "grig", "nath", 2020, "freelancer", ["john", "mike", "Peter", "Steven"],
//     true
// ];

// for (let i = grigArray.length - 1; i >= 0; i--) {
//     console.log(i, grigArray[i]);
// }

// for (let exercise = 1; exercise < 4; exercise++) {
//     console.log(`====Starting exercise ${exercise}`);

//     for (let rep = 1; rep < 6; rep++) {
//         console.log(`Exercise ${exercise} :Lifting weights repetition ${rep}`);
//     }
// }


//===========While loop
// for (let rep = 1; rep <= 10; rep++) {
//     console.log(`Lifting weights repetition ${rep}`);
// }

// let rep = 1;
// while (rep <= 10) {
//     console.log(`Lifting weights repetition ${rep}`);
//     rep++;
// }

// let dice = Math.trunc(Math.random() * 6) + 1;
// // console.log(dice);

// while (dice != 6) {
//     console.log(`You rolled a ${dice}`)
//     dice = Math.trunc(Math.random() * 6) + 1;
//     if (dice === 6) console.log("Loop is about to end...");
// }

//----------Final challenge
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];

const tips = [];
const totals = [];

const calcTip = bill => {
    return (bill > 50 && bill <= 300) ? 15 / 100 * bill : 20 / 100 * bill;
}

for (let i = 0; i < bills.length; i++) {
    const tip = calcTip(bills[i]);
    tips.push(tip);
    totals.push(tip + bills[i]);
}
console.log(bills);
console.log(tips);
console.log(totals);

//function expression
const calcAverage1 = function (arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum / arr.length;
}
console.log(calcAverage1(totals));
//function declaration
function calcAverage2(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum / arr.length;
}
console.log(calcAverage2(totals));
console.log(calcAverage2(tips));













































