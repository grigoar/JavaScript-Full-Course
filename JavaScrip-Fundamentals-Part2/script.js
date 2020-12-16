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

const calcAverage = (first, second, third) => (first + second + third) / 3;


let averageDolphins = calcAverage(85, 54, 41);
let averageKoalas = calcAverage(23, 34, 27);

const checkWinner = function (averageDolphins, averageKoalas) {
    if (averageDolphins >= averageKoalas * 2) {
        console.log(`Dolphins win (${averageDolphins} vs ${averageKoalas})`);
    } else if (averageKoalas >= averageDolphins * 2) {
        console.log(`Koalas win (${averageKoalas} vs ${averageDolphins})`);
    } else {
        console.log(`No one wins. The average score were Dolphins:${averageDolphins} vs. Koalas:${averageKoalas} `);
    }
}
checkWinner(averageDolphins, averageKoalas);
averageDolphins = calcAverage(44, 23, 71);
averageKoalas = calcAverage(65, 54, 49);
console.log("New values");
checkWinner(averageDolphins, averageKoalas);




















































