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
  countriesContainer.style.opacity = 1;
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
// console.log("Test start");
// setTimeout(() => console.log("0 sec timer"), 0);

// Promise.resolve(`Resolved promise 1`).then((res) => console.log(res));

// //this takes a lot of time ... promise is put in the microtask and after that the timer is put
// //timers are not totally safe to use
// // Promise.resolve("Resolved promised 2").then((res) => {
// //   for (let i = 0; i < 10000; i++) console.log(res);
// // });

// console.log("Test end");

//-------------------------------------Building a simple promise
//the parameter is an executor
// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log("Lottery draw is happening 🔮");
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       //successful we call resolve->fulfilled promised
//       resolve("You win🎉");
//     } else {
//       reject(new Error("You lost your money 👀"));
//     }
//   }, 2000);
// });

// // Consuming promisees
// // lotteryPromise.then(
// //   (resolved) => console.log(resolved),
// //   (err) => console.error(err)
// // );

// lotteryPromise.then((resolved) => console.log(resolved)).catch((err) => console.error(err));

// //-----promisifying setTimeout- is transforming asynchronous calling based to promises based
// const wait = function (seconds) {
//   //create and return a promise
//   //we don't resolve the reject
//   //we can pass an empty resolve
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// // wait(2)
// //   .then(() => {
// //     console.log("I waited for 2 seconds");
// //     return wait(1);
// //   })
// //   .then(() => console.log("I waited for 1 second"));

// // setTimeout(() => {
// //   console.log("1 second passed");
// //   setTimeout(() => {
// //     console.log("2 second passed");
// //     setTimeout(() => {
// //       console.log("3 second passed");
// //       setTimeout(() => {
// //         console.log("4 second passed");
// //       }, 1000);
// //     }, 1000);
// //   }, 1000);
// // }, 1000);

// wait(2)
//   .then(() => {
//     console.log("1 second passed");
//     return wait(1);
//   })
//   .then(() => {
//     console.log("2 second passed");
//     return wait(1);
//   })
//   .then(() => {
//     console.log("3 second passed");
//     return wait(1);
//   })
//   .then(() => {
//     console.log("4 second passed");
//     return wait(1);
//   })
//   .then(() => console.log("I waited for 5 second"));

// //create a rejected promise immediately
// Promise.resolve("resolved promise").then((x) => console.log(x));
// // Promise.reject("rejected promise")
// Promise.reject(new Error("problem"))
//   // .then((x) => console.log(x))
//   .catch((x) => console.error(x));

//---------------------------Promisifying the geolocation API

// console.log("Getting position");

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   //when fulfilled we set the resolve with the position object
//     //   (position) => resolve(position),
//     //   (err) => reject(err)
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };
// getPosition()
//   .then((pos) => console.log(pos))
//   .catch((err) => console.log(err));

// const whereAmI = function (lat, lng) {
//   getPosition()
//     .then((pos) => {
//       // console.log(pos.coords);
//       const { latitude: lat, longitude: lng } = pos.coords;
//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })
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

// btn.addEventListener("click", whereAmI);

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/
// let image;
// const images = document.querySelector(".images");
// // console.log(images);
// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const image = document.createElement("img");
//     image.src = imgPath;
//     image.addEventListener("load", function () {
//       images.insertAdjacentElement("beforeend", image);
//       resolve(image);
//     });
//     image.addEventListener("error", function () {
//       reject(new Error("The image didn't load 😥. Try again"));
//     });
//   });
// };

// const wait = function (seconds) {
//   // setTimeout(resolve,seconds*1000)
//   return new Promise(function (resolve) {
//     console.log(`Passed ${seconds} seconds`);
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// createImage("img/img-1.jpg").then((res) => {
//   console.log("The image element: ", res);
//   wait(2)
//     .then(() => {
//       console.log("Execution paused for 2 seconds");
//       res.style.display = "none";
//       return createImage("img/img-2.jpg");
//     })
//     .then((res) => {
//       console.log("The image element: ", res);
//       wait(2).then(() => {
//         console.log("Execution paused for 2 seconds");
//         res.style.display = "none";
//         return createImage("img/img-2.jpg");
//       });
//     });
// });
// .catch((err) => console.error(`Something went wrong. ${err.message}`));

// let currentImage;

// createImage("img/img-1.jpg")
//   .then((img) => {
//     console.log(img);
//     currentImage = img;
//     return wait(2);
//   })
//   .then(() => {
//    console.log("Showned image for 2 sec")
//   currentImage.style.display = "none";
//   wait(2);
//   })
//   .then(() => {
//console.log("Passed 2 seconds of emptiness ")
//     currentImage.style.display = "none";
//     return createImage("img/img-2.jpg");
//   })
//   .then((img) => {
//     console.log(img);
//     currentImage = img;
//     return wait(2);
//   })
//   .then(() => {
//     console.log("passed another 2 sec");
//     currentImage.style.display = "none";
//   })
//   .catch((err) => console.error(`Something went wrong. ${err.message}`));

//------------better solution

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const imgContainer = document.querySelector(".images");

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement("img");
//     img.src = imgPath;

//     img.addEventListener("load", function () {
//       imgContainer.append(img);
//       resolve(img);
//     });

//     img.addEventListener("error", function () {
//       reject(new Error("Image not found"));
//     });
//   });
// };

// let currentImg;
// createImage("img/img-1.jpg")
//   .then((img) => {
//     currentImg = img;
//     console.log("Image 1 loaded");
//     return wait(4);
//   })
//   .then(() => {
//     console.log("4 seconds passed");
//     currentImg.style.display = "none";
//     return wait(4);
//   })
//   .then(() => {
//     console.log("4 seconds of empty passed");
//     // currentImg.style.display = "none";
//     return createImage("img/img-2.jpg");
//   })
//   .then((img) => {
//     currentImg = img;
//     console.log("Image 2 loaded");
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = "none";
//   })
//   .catch((err) => console.error(err));

//-----------------------------Consuming promises with async/await

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

//async starting a background execution, when encountering the await the execution is blocked, but is not a problem because the async function is asynchronous
//we are using the await to stop the code, and when the promise is return the object is assigned to something
// const whereAmI = async function () {
//   //Geolocation
//   const pos = await getPosition();
//   const { latitude: lat, longitude: lng } = pos.coords;

//   //Reverse geocoding
//   const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//   const dataGeo = await resGeo.json();
//   console.log(dataGeo);

//   //Country data
//   //stopping execution when meeting await
//   const res = await fetch(`https://restcountries.eu/rest/v2/name/${dataGeo.country}`);
//   // fetch(`https://restcountries.eu/rest/v2/name/${country}`).then((res) => console.log(res));
//   const data = await res.json();
//   console.log(data);
//   renderCountry(data[0]);
// };
// whereAmI();
// console.log("First");

//--------------------------------Error handling with try...catch for async/await
//catching error for async functions
// try {
//   let y = 1;
//   const x = 2;
//   // y = 3;
//   x = 3;
// } catch (err) {
//   console.error(err.message);
// }

// const whereAmI = async function () {
//   try {
//     //Geolocation
//     const pos = await getPosition();
//     const { latitude: lat, longitude: lng } = pos.coords;

//     //Reverse geocoding
//     const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);

//     if (!resGeo.ok) throw new Error("Problem getting location data");

//     const dataGeo = await resGeo.json();
//     // console.log(dataGeo);

//     //Country data
//     //stopping execution when meeting await
//     const res = await fetch(`https://restcountries.eu/rest/v2/name/${dataGeo.country}`);
//     // fetch(`https://restcountries.eu/rest/v2/name/${country}`).then((res) => console.log(res));
//     if (!res.ok) throw new Error("Problem getting country");
//     const data = await res.json();
//     // console.log(data);
//     renderCountry(data[0]);

//     return `You are in ${dataGeo.city}, ${dataGeo.country}`;
//   } catch (err) {
//     console.error(`${err} ✨`);
//     renderError(`Something went wrong 🧨 ${err.message}`);

//     //Reject promise returned from async function
//     //we rethtrow the error so we can catch the error when it propagate down
//     throw err;
//   }
// };
// console.log(`1:Will get location`);
// const city = whereAmI();//at this point the js doesn't know about the string to return and it returned promise, and the fulfill is the returning string
// whereAmI()
//   .then((city) => console.log(`2:${city} fulfilled promise`))
//   .catch((err) => console.error(`2:${err.message} 🎆`))
//   .finally(() => console.log("3.Finished getting location")); //the resolve value of the promise
// console.log(city);

//---------------------------Returning values from async functions
// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(`2:${city} fulfilled promise`);
//   } catch (err) {
//     console.error(`2:${err.message} 🎆`);
//   }
//   console.log("3.Finished getting location");
// })();

//-------------------Running promises in parallel

//Running all the promises functions in parallel using Promise.all
//If 1 promies is rejected than it will short circuit the function Promise.all
//use for loading multiple async function in parallel(much more faster)

const getJSON = function (url, errorMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    //if the error is thrown then the promise are terminated and it goes down to catch
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

const get3Countries = async function (c1, c2, c3) {
  try {
    const [data1] = await getJSON(`https://restcountries.eu/rest/v2/name/${c1}`);
    const [data2] = await getJSON(`https://restcountries.eu/rest/v2/name/${c2}`);
    const [data3] = await getJSON(`https://restcountries.eu/rest/v2/name/${c3}`);
    console.log("datas: ", data1, data2, data3);

    const data = await Promise.all([
      getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
    ]);
    console.log(data);
    console.log(data.map((d) => d[0].capital));

    console.log([data1.capital, data2.capital, data3.capital]);
  } catch (err) {
    console.error(err);
  }
};
get3Countries("romania", "portugal", "tanzania");

//------------------------------Other promise combinators: Race, Allsettled and Any
//Promise.race
//array of prommises and return a promise
//faster prmomise wins the race,(doesn't matter if is rejected or repsonse), it short circuite

//This is pretty usefull for the situation when the data should be rejected and the user should be informed that fetching the data takes too long
// const getJSON = function (url, errorMsg = "Something went wrong") {
//   return fetch(url).then((response) => {
//     //if the error is thrown then the promise are terminated and it goes down to catch
//     if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
//     return response.json();
//   });
// };
// //IFFI(funtions that run only once)
// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.eu/rest/v2/name/italy`),
//     getJSON(`https://restcountries.eu/rest/v2/name/mexic`),
//     getJSON(`https://restcountries.eu/rest/v2/name/romania`),
//   ]);
//   console.log(res[0]);
// })();

// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error("request took too long"));
//     }, s * 1000);
//   });
// };

// Promise.race([getJSON(`https://restcountries.eu/rest/v2/name/romania`), timeout(0.1)])
//   .then((res) => console.log(res[0]))
//   .catch((err) => console.error(err));

//Promise.allSettled(ES2020)
//returned all the settled promises
// Promise.allSettled([
//   Promise.resolve("Success"),
//   Promise.reject("ERROR"),
//   Promise.resolve("Another success"),
// ])
//   .then((res) => console.log(res))
//   .catch((err) => console.error(err));

// //Promise.any (ES2021)
// //return the first fulfilled promise
// Promise.any([
//   Promise.resolve("Success"),
//   Promise.reject("ERROR"),
//   Promise.resolve("Another success"),
// ])
//   .then((res) => console.log(res))
//   .catch((err) => console.error(err));

///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector(".images");

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement("img");
    img.src = imgPath;

    img.addEventListener("load", function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener("error", function () {
      reject(new Error("Image not found"));
    });
  });
};

let currentImg;
// createImage("img/img-1.jpg")
//   .then((img) => {
//     currentImg = img;
//     console.log("Image 1 loaded");
//     return wait(4);
//   })
//   .then(() => {
//     console.log("4 seconds passed");
//     currentImg.style.display = "none";
//     return wait(4);
//   })
//   .then(() => {
//     console.log("4 seconds of empty passed");
//     // currentImg.style.display = "none";
//     return createImage("img/img-2.jpg");
//   })
//   .then((img) => {
//     currentImg = img;
//     console.log("Image 2 loaded");
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = "none";
//   })
//   .catch((err) => console.error(err));

const loadNPause = async function () {
  try {
    let image = await createImage("img/img-1.jpg");
    // currentImg = image;

    let wait3 = await wait(3); //.then(() => (currentImg.style.display = "none"));
    // currentImg.style.display = "none";
    image.style.display = "none";

    await wait(3);

    image = await createImage("img/img-2.jpg");
    // currentImg = image;

    await wait(3);

    image.style.display = "none";
  } catch (error) {
    console.error(error.message);
  }
};
// loadNPause();

// 1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
// 2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
// 3. Check out the 'imgs' array in the console! Is it like you expected?
// 4. Use a promise combinator function to actually get the images from the array 😉
// 5. Add the 'paralell' class to all the images (it has some CSS styles).
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async (imgSrc) => {
      const img = await createImage(imgSrc);
      return img;
    });
    //the async function always return promise
    console.log("Something array of images: ", imgs);
    // const realImgs = await Promise.allSettled(imgs);
    const realImgs = await Promise.all(imgs);
    console.log("the image elements", realImgs);
    realImgs.forEach((img) => {
      img.classList.add("parallel");
    });
  } catch (error) {
    console.error(`Something is not working. ${error.message}`);
  }
};

loadAll(["img/img-1.jpg", "img/img-2.jpg", "img/img-3.jpg"]);
