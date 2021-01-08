"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////
//-------------------------Asynchronous JavaScript . AJAX and APIS
//---------------------First AJAX Call: XML-HTTP-REQUEST
//old way

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.eu/rest/v2/name/${country}`);
//   request.send(); //when is done it send a signal load
//   // console.log(request.responseText);//empty-> not here yet
//   request.addEventListener("load", function () {
//     console.log(this.responseText);
//     // console.log(request.responseText);
//     //   const data = JSON.parse(this.responseText)[0];
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `
//     <article class="country">
//           <img class="country__img" src="${data.flag}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(
//               2
//             )} people</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name} language</p>
//             <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//           </div>
//     </article>
//   `;

//     countriesContainer.insertAdjacentHTML("beforeend", html);
//     countriesContainer.style.opacity = 1;
//   });
// };

//data might arrive at different times
//not-blocking requests
// getCountryData("romania");
// getCountryData("usa");
// getCountryData("germany");

//-----------------------------How the web Works: Requests and Responses
//--------------------------Welcome to Callback hell
//The Callback hell is the nested callbacks of the asynchronous functions

//Calling the neighbours of the country
//need to call for the data after the country is received

//handling  the error
const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  //   countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = "") {
  const html = `
    <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(
              2
            )} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name} language</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
    </article>
  `;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  //   countriesContainer.style.opacity = 1;
};

// const getCountryDataAndNeighbour = function (country) {
//   //Ajax call country 1
//   const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.eu/rest/v2/name/${country}`);
//   request.send(); //when is done it send a signal load
//   // console.log(request.responseText);//empty-> not here yet
//   //nested callbacks
//   request.addEventListener("load", function () {
//     console.log(this.responseText);
//     // console.log(request.responseText);
//     //   const data = JSON.parse(this.responseText)[0];
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     //Render country 1
//     renderCountry(data);

//     //Get neighbour country(2)
//     const [neighbour] = data.borders;

//     if (!neighbour) return;

//     //Ajax call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open("GET", `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     request2.send(); //when is done it send a signal load

//     //firing a new request in the loading fired event of the first request
//     //nested callback
//     request2.addEventListener("load", function () {
//       const data2 = JSON.parse(this.responseText);
//       console.log(data2);

//       renderCountry(data2, "neighbour");
//     });
//   });
// };

// // getCountryDataAndNeighbour("romania");
// getCountryDataAndNeighbour("usa");

// setTimeout(() => {
//   console.log("1 second passed");
//   setTimeout(() => {
//     console.log("2 second passed");
//     setTimeout(() => {
//       console.log("3 second passed");
//       setTimeout(() => {
//         console.log("4 second passed");
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

//Promises and the fetch API->to avoid callback hell
//Promises were introduced in 2015 (ES6)
// const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.eu/rest/v2/name/${country}`);
//   request.send(); //when is done it send a signal load
//return a Promise, state <pending>
// const request = fetch("https://restcountries.eu/rest/v2/name/romania");
// console.log(request);

//---------------------------------Consuming promises
// const getCountryData = function (country) {
//   //as soon as a response is available we execute a callback function-then(f())
//   //the function have an argument, which is the resulting response of a fulfill promise
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       //to read the data from the response->also asynchronous
//       return response.json(); //return a promise
//     })
//     //in order to get the response.json->data we need to apply one more time the then method
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
//   //in final we need 2 promises to get the data
// };

//-----------------Easier to implement and no more callbacks hell
// const getCountryData = function (country) {
//   //as soon as a response is available we execute a callback function-then(f())
//   //   //the function have an argument, which is the resulting response of a fulfill promise
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     //to read the data from the response->also asynchronous
//     .then((response) => response.json()) //return a promise
//     //in order to get the response.json->data we need to apply one more time the then method
//     .then((data) => renderCountry(data[0]));
//   //in final we need 2 promises to get the data
// };

// getCountryData("romania");

//----------------------Chaining promises
//this is flat chain of promises and we removed the callback hell
// const getCountryData = function (country) {
//   //Country 1
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then((response) => response.json()) //return a promise
//     .then((data) => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];

//       if (!neighbour) return;

//       //Country 2
//       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//       //   return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`).then((response) => response.json())//don't do this; this works but we are back in callback hell
//     }) //this return a new promise and then we handle the promise the data
//     .then((response) => response.json())
//     .then((data) => renderCountry(data, "neighbour"));
// };

// getCountryData("romania");

//------------------------------Handling Rejected promises

//when user loosing internet connection
//2 ways of handling rejects

// const getCountryData = function (country) {
//   //Country 1
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     //pass the error callback function direct in then method to handle the rejection
//     //we caught the error
//     .then(
//       (response) => {
//         console.log(response);

//         //if the error is thrown then the promise are terminated and it goes down to catch
//         if (!response.ok) throw new Error(`Country not found (${response.status})`);

//         return response.json();
//       }
//       //   (err) => alert(err)
//     ) //return a promise
//     .then((data) => {
//       renderCountry(data[0]);
//       //   const neighbour = data[0].borders[0];
//       const neighbour = "dfdfs";

//       if (!neighbour) return;

//       //Country 2
//       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     }) //this return a new promise and then we handle the promise the data
//     .then((response) => {
//       //if the error is thrown then the promise are terminated and it goes down to catch
//       if (!response.ok) throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     // , (err) => alert(err))
//     .then((data) => renderCountry(data, "neighbour"))
//     //second way to catch globally the rejections
//     //always use catch!!!!!!!!!!!!!!!!!!!!!!
//     .catch((err) => {
//       console.error(`${err}🎆🎆🎆`);
//       renderError(`Something went wrong 🎆🎆🎆 ${err.message}. Try again!`);
//     })
//     //always called no matter the response
//     .finally(() => {
//       //to show the loading circle while the data is loading
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener("click", function () {
//   getCountryData("romania");
// });

// getCountryData("sdfdsfds");

//-------------------Throwing errors manually

// const getJSON = function (url, errorMsg = "Something went wrong") {
//   return fetch(url).then((response) => {
//     //if the error is thrown then the promise are terminated and it goes down to catch
//     if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

//     return response.json();
//   });
// };
// const getCountryData = function (country) {
//   //Country 1
//   getJSON(`https://restcountries.eu/rest/v2/name/${country}`, "Country not found")
//     .then((data) => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];
//       //   const neighbour = "dfdfs";

//       if (!neighbour) throw new Error("No neighbour found!");

//       //Country 2
//       return getJSON(`https://restcountries.eu/rest/v2/alpha/${neighbour}`, "Country not found");
//     }) //this return a new promise and then we handle the promise the data
//     .then((data) => renderCountry(data, "neighbour"))
//     .catch((err) => {
//       console.error(`${err}🎆🎆🎆`);
//       renderError(`Something went wrong 🎆🎆🎆 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener("click", function () {
//   getCountryData("romania");
// });

// getCountryData("australia");

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

//--------------------------my challenge
// const getCountryData = function (countryCode) {
//   fetch(`https://restcountries.eu/rest/v2/name/${countryCode}`)
//     .then((response) => {
//       if (!response.ok) throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then((data) => {
//       console.log("Data first country: ", data);
//       const neighbour = data[0].borders[0];
//       if (!neighbour) return;
//       console.log(`The flag will be rendered ${neighbour}`);
//       renderCountry(data[0]);

//       return fetch(`https://restcountries.eu/rest/v2/name/${neighbour}`);
//     })
//     .then((response) => {
//       // console.log(response);
//       return response.json();
//     })
//     .then((data) => {
//       console.log("Data neighbour: ", data);
//       renderCountry(data[0], "neighbour");
//     })
//     .catch((err) => console.error(`Something went wrong when finding a country -> ${err.message}`))
//     .finally(() => (countriesContainer.style.opacity = 1));
// };

// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then((response) => {
//       //   console.log(response);

//       if (!response.ok && response.status === 403)
//         throw new Error(
//           `Request not handled by the fetch. There are too many requests per second! StatusText: ${response.statusText}.`
//         );
//       return response.json();
//     })
//     .then((data) => {
//       //   console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}!`);
//       getCountryData(data.country.toLowerCase());
//     })
//     .catch((err) => {
//       console.error(`Something went wrong! 🎇🎇🎇 ${err.message}.`);
//     });
//   // .finally(() => console.log("always finally is catch"));
// };
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

// const getCountryData = function (countryCode) {
//   fetch(`https://restcountries.eu/rest/v2/name/${countryCode}`)
//     .then((response) => {
//       if (!response.ok) throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then((data) => {
//       console.log("Data first country: ", data);
//       const neighbour = data[0].borders[0];
//       if (!neighbour) return;
//       console.log(`The flag will be rendered ${neighbour}`);
//       renderCountry(data[0]);

//       return fetch(`https://restcountries.eu/rest/v2/name/${neighbour}`);
//     })
//     .then((response) => {
//       // console.log(response);
//       return response.json();
//     })
//     .then((data) => {
//       console.log("Data neighbour: ", data);
//       renderCountry(data[0], "neighbour");
//     })
//     .catch((err) => console.error(`Something went wrong when finding a country -> ${err.message}`))
//     .finally(() => (countriesContainer.style.opacity = 1));
// };

//---------------------------------------------------better solution
// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then((response) => {
//       //   console.log(response);

//       if (!response.ok && response.status === 403)
//         throw new Error(
//           `Request not handled by the fetch. There are too many requests per second! StatusText: ${response.statusText}.`
//         );
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}!`);
//       //   getCountryData(data.country.toLowerCase());
//       return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
//     })
//     .then((response) => {
//       if (!response.ok) throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then((data) => {
//       console.log("The country searched: ", data);
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];
//       if (!neighbour) throw new Error("No neighbour found!");
//       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("Neighbour", data);
//       renderCountry(data, "neighbour");
//     })
//     .catch((err) => {
//       console.error(`Something went wrong! 🎇🎇🎇 ${err.message}.`);
//     })
//     .finally(() => (countriesContainer.style.opacity = 1));
// };

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

//------------------------------------Asynchronous behind the scenes: The Event Loop

//----------------------------------The Event Loop in Practice
console.log("Test start");
setTimeout(() => console.log("0 sec timer"), 0);

Promise.resolve(`Resolved promise 1`).then((res) => console.log(res));

//this takes a lot of time ... promise is put in the microtask and after that the timer is put
//timers are not totally safe to use
Promise.resolve("Resolved promised 2").then((res) => {
  for (let i = 0; i < 10000; i++) console.log(res);
});

console.log("Test end");
