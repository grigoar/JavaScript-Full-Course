import { TIMEOUT_SEC } from "./config.js";
//contain the functions that we use frequently into the project
//adding a timeout
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

//AJAX request
export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    //stop the execution until the promise is returned
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (error) {
    console.log("Helpers getJSON", error.message);
    //rethrowing the error for asyinc in the next model module
    //propagating the error to the next async function
    throw error;
  }
};

// export const getJSON = async function (url) {
//   try {
//     //adding a race to see if the duration for fetching the data takes to long
//     const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
//     // const res = await fetch(
//     //   url
//     //   // `${API_URL}${id}`
//     //   // "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc8f7"
//     // );

//     //stop the execution until the promise is returned
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);

//     return data;
//   } catch (error) {
//     console.log("Helpers getJSON", error.message);
//     //rethrowing the error for asyinc in the next model module
//     //propagating the error to the next async function
//     throw error;
//   }
// };

// export const sendJSON = async function (url, uploadData) {
//   try {
//     //creating a POST request to the server
//     const fetchPro = fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(uploadData),
//     });

//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     //stop the execution until the promise is returned
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);

//     return data;
//   } catch (error) {
//     console.log("Helpers getJSON", error.message);
//     //rethrowing the error for asyinc in the next model module
//     //propagating the error to the next async function
//     throw error;
//   }
// };
