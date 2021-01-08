"use strict";

// prettier-ignore
// const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

//-----------------Project planning
//142.	Planning a project steps: 1) User stories -> Description of the applications’ functionality from the user’s perspective. All user stories put together describe the entire application; 2) Features of the application; 3) Flowchart ->WHAT we will build ; 4)Architecture->HOW we will build it; 4) Development step-> Implementation of our plan using code

// let map, mapEvent;

class Workout {
  date = new Date();
  //we should use a library to create a new id
  id = (Date.now() + "").slice(-10);
  clicks=0;

  constructor(coords, distance, duration) {
    //   this.date = date;
    //   this.id = id;
    this.coords = coords; //[lat,lng]
    this.distance = distance; //in km
    this.duration = duration; //in min
    
  }

  _setDescription(){
    const  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
  }

  click(){
    this.clicks++;
  }
 
}

class Running extends Workout {
  // type = "running";
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();

    this.type = "running";
    this._setDescription();
  }

  calcPace() {
    //min/km
    //creating a new property
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
class Cycling extends Workout {
  type = "cycling";
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    // this.type = "cycling";
    this._setDescription();
  }

  calcSpeed() {
    //km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// const run1 = new Running([46, -23], 5.2, 35, 168);
// const cycling1 = new Cycling([47, -23], 27, 95, 532);
// console.log(run1);
// console.log(cycling1);

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");
///////////////////////////////////////////////
//Aplication Architecture
class App {
  #map;
  #mapEvent;
  #workouts = [];
  #mapZoomLevel = 13;

  constructor() {
    //Get user's position
    this._getPosition();

    //Get data from local storage
    this._getLocalStorage();

    //Attach event handlers
    form.addEventListener("submit", this._newWorkout.bind(this)); //this will point to form(DOM element) and we need to fix it using bind to point to the object

    inputType.addEventListener("change", this._toggleElevationField);
    // this.workouts = [];

    containerWorkouts.addEventListener("click", this._moveToPopup.bind(this));
  }

  _getPosition() {
    //for old browsers
    //getting the position from the browser with the geolocation method
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),

        function () {
          alert("Could not get your position");
        }
      );
    }
  }
  _loadMap(position) {
    //position parameter
    console.log(position);
    //destructuring object property
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    //   console.log(latitude, longitude);
    console.log(`https://www.google.com/maps/@${latitude},${longitude}z`);

    const coords = [latitude, longitude];

    console.log(this);
    this.#map = L.map("map").setView(coords, this.#mapZoomLevel);
    // console.log(map);

    //   L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    //creating an event when clicking on the map
    //Handling click on map
    this.#map.on("click", this._showForm.bind(this)); //this point to the map, need fix

    this.#workouts.forEach((work) => {
      this._renderWorkoutMarker(work);
    });
  }
  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove("hidden");
    inputDistance.focus();
  }
  _hideForm() {
    inputDistance.value = inputCadence.value = inputDuration.value = inputElevation.value = "";

    //dirty trick
    form.style.display = "none";
    form.classList.add("hidden");
    setTimeout(() => (form.style.display = "grid"), 1000);
  }
  _toggleElevationField() {
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
  }
  _newWorkout(e) {
    //helper functions
    const validInputs = (...inputs) => inputs.every((inp) => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every((inp) => inp > 0);

    // console.log(this);
    e.preventDefault();

    //Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout, cycling;

    //If activity running, create running object
    if (type === "running") {
      const cadence = +inputCadence.value;
      //Check if data is valid
      //guard
      //   if (!Number.isFinite(distance) || !Number.isFinite(duration) || !Number.isFinite(cadence))
      if (!validInputs(distance, duration, cadence) || !allPositive(distance, duration, cadence))
        return alert("Inputs have to be positive numbers!");

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    //If workout cycling, create cycling object
    if (type === "cycling") {
      const elevation = +inputElevation.value;
      if (!validInputs(distance, duration, elevation) || !allPositive(distance, duration))
        return alert("Inputs have to be positive numbers!");
      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    //Add new object to workout array
    this.#workouts.push(workout);
    console.log(workout);

    //Render workout on map as marker
    this._renderWorkoutMarker(workout);

    //Render workout on list
    this._renderWorkout(workout);

    //Hide Form + clear input fields
    //----------Clear input fields
    // inputDistance.value = inputCadence.value = inputDuration.value = inputElevation.value = "";
    this._hideForm();

    //Set local storage to all workouts
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    //-----------Display Marker
    // console.log(this.#mapEvent);
    // console.log(lat, lng);
    //adding a marker to the map
    // L.marker([lat, lng]).addTo(map).bindPopup("Workout").openPopup();
    //changing the bindPopup
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(`${workout.type === "running" ? "🏃‍♂️" : "🚲"} ${workout.description}`)
      .openPopup();
  }
  _renderWorkout(workout) {
    // console.log(`The workout added is ${workout.type}`);
    console.log("The workout added is: ", workout);
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <h2 class="workout__title">${workout.description}</h2>
      <div class="workout__details">
          <span class="workout__icon">${workout.type === "running" ? "🏃‍♂️" : "🚲"}</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
      </div>
          `;

    if (workout.type === "running") {
      html += `
     <div class="workout__details">
       <span class="workout__icon">⚡️</span>
       <span class="workout__value">${workout.pace.toFixed(1)}</span>
       <span class="workout__unit">min/km</span>
     </div>
     <div class="workout__details">
       <span class="workout__icon">🦶🏼</span>
       <span class="workout__value">${workout.cadence}</span>
       <span class="workout__unit">spm</span>
     </div>
   </li>
          `;
    }
    if (workout.type === "cycling") {
      html += `
    <div class="workout__details">
     <span class="workout__icon">⚡️</span>
     <span class="workout__value">${workout.speed.toFixed(1)}</span>
     <span class="workout__unit">km/h</span>
    </div>
     <div class="workout__details">
     <span class="workout__icon">⛰</span>
     <span class="workout__value">${workout.elevationGain}</span>
     <span class="workout__unit">m</span>
    </div>
  </li>
                `;
    }
    // console.log(html);
    form.insertAdjacentHTML("afterend", html);
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest(".workout");
    // console.log(workoutEl);

    if (!workoutEl) return;

    const workout = this.#workouts.find((work) => work.id === workoutEl.dataset.id);
    console.log(workout);

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });

    //using the public interface for clicks
    // workout.click();
    // console.log(workout.clicks);
  }

  _setLocalStorage() {
    //an API provided by the browser-> is blocking and will have performance issues
    //transform any object to a string
    //pairs [key,value]
    localStorage.setItem("workouts", JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    //when getting back the data from the local storage we get back the object but without the prototype chain
    //we should parse the data as a Running and Cycling objects
    //method click() from workout doesn't exist anymore
    const data = JSON.parse(localStorage.getItem("workouts"));
    console.log(data);
    if (!data) return;

    this.#workouts = data;
    this.#workouts.forEach((work) => {
      this._renderWorkout(work);
    });
  }

  //creating an public method for deleting all logs from local Storage

  reset() {
    localStorage.removeItem("workouts");
    location.reload();
  }
}

const app = new App();

//------------------------------------Using the Geolocation API
//---------------Displaying a map using a third library Leaflet
//----------------Display a Map Marker
//-------------------------Rendering workout form
//------------------------Project Architecture
//------------------------Refactoring for project architecture
//-----------------------Managing Workout data: Creating Classes
//-----------------------Creating a new Workout
//----------------------Rendering wourkouts
//---------------------Move to maker on click
//--------------------Working with localstorage
//--------------------Final Considerations

//Some potential future challenges
// -Ability to edit a workout
// -Ability to delete a workout
// -Ability to delete all containerWorkouts
// --Ability to sort workouts by a certain field(distance)
// -Re-build Running and Cycling objects coming from Local Storage
// -More realistic error and confirmation messages
// -Ability to position the map to show all workouts(very hard)
//-Ability to draw lines and shapes instead of just points (very hard -> Leafeat docs)
//-Geocode location from coordinates("Run in Cluj-Napoca, Romania")(affter asynchronous JavaScript section)
//-Desiplay weather data fro workout time and place (only after asynchronous JavaScript section)
