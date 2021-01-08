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

const getCountryDataAndNeighbour = function (country) {
  //Ajax call country 1
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.eu/rest/v2/name/${country}`);
  request.send(); //when is done it send a signal load
  // console.log(request.responseText);//empty-> not here yet
  //nested callbacks
  request.addEventListener("load", function () {
    console.log(this.responseText);
    // console.log(request.responseText);
    //   const data = JSON.parse(this.responseText)[0];
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    //Render country 1
    renderCountry(data);

    //Get neighbour country(2)
    const [neighbour] = data.borders;

    if (!neighbour) return;

    //Ajax call country 2
    const request2 = new XMLHttpRequest();
    request2.open("GET", `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    request2.send(); //when is done it send a signal load

    //firing a new request in the loading fired event of the first request
    //nested callback
    request2.addEventListener("load", function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, "neighbour");
    });
  });
};

// getCountryDataAndNeighbour("romania");
getCountryDataAndNeighbour("usa");

setTimeout(() => {
  console.log("1 second passed");
  setTimeout(() => {
    console.log("2 second passed");
    setTimeout(() => {
      console.log("3 second passed");
      setTimeout(() => {
        console.log("4 second passed");
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
