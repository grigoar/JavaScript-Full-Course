"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

//-----------------Project planning
//142.	Planning a project steps: 1) User stories -> Description of the applications’ functionality from the user’s perspective. All user stories put together describe the entire application; 2) Features of the application; 3) Flowchart ->WHAT we will build ; 4)Architecture->HOW we will build it; 4) Development step-> Implementation of our plan using code

// let map, mapEvent;

class Workout {
  date = new Date();
  //we should use a library to create a new id
  id = (Date.now() + "").slice(-10);

  constructor(coords, distance, duration) {
    //   this.date = date;
    //   this.id = id;
    this.coords = coords; //[lat,lng]
    this.distance = distance; //in km
    this.duration = duration; //in min
  }
}

class Running extends Workout {
  // type = "running";
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this.calcSpeed();
    this.type = "running";
  }

  calcPace() {
    //min/km
    //creating a new property
    this.pace = this.duration / this.distance;
    return this.pace;
  }

  calcSpeed() {
    //km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}
class Cycling extends Workout {
  type = "cycling";
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    // this.type = "cycling";
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

  constructor() {
    this._getPosition();

    form.addEventListener("submit", this._newWorkout.bind(this)); //this will point to form(DOM element) and we need to fix it using bind to point to the object

    inputType.addEventListener("change", this._toggleElevationField);
    // this.workouts = [];
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
    this.#map = L.map("map").setView(coords, 13);
    // console.log(map);

    //   L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    //creating an event when clicking on the map
    //Handling click on map
    this.#map.on("click", this._showForm.bind(this)); //this point to the map, need fix
  }
  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove("hidden");
    inputDistance.focus();
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
    this.renderWorkoutMarker(workout);

    //Render workout on list

    //Hide Form + clear input fields
    //----------Clear input fields
    inputDistance.value = inputCadence.value = inputDuration.value = inputElevation.value = "";
  }

  renderWorkoutMarker(workout) {
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
      .setPopupContent(`${workout.distance}`)
      .openPopup();
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
