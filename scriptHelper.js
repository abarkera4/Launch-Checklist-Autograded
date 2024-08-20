// Write your helper functions here!

require("cross-fetch/polyfill");

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
  // Here is the HTML formatting for our mission target div.
  /*
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: </li>
                     <li>Diameter: </li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: </li>
                     <li>Number of Moons: </li>
                 </ol>
                 <img src="">
    */

  let missionTarget = document.getElementById("missionTarget");
  missionTarget.innerHTML = `
        <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src="${imageUrl}">
    `;
}

function validateInput(testInput) {
  if (testInput === "") {
    return "Empty";
  } else if (isNaN(testInput)) {
    return "Not a Number";
  } else {
    return "Is a Number";
  }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
  let pilotStatus = document.getElementById("pilotStatus");
  let copilotStatus = document.getElementById("copilotStatus");
  let fuelStatus = document.getElementById("fuelStatus");
  let cargoStatus = document.getElementById("cargoStatus");
  let launchStatus = document.getElementById("launchStatus");
  let isValid = true;

  if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
    alert("All fields are required!");
    isValid = false;
  } else if (validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number" || validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number") {
    alert("Fuel Level and Cargo Level must be numbers! Pilot and Co-pilot names must be letters!");
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
  copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;

  if (fuelLevel < 10000) {
    fuelStatus.innerHTML = "Fuel level too low for launch";
    launchStatus.innerHTML = "Shuttle Not Ready for Launch";
    launchStatus.style.color = "red";
    list.style.visibility = "visible";
  } else {
    fuelStatus.innerHTML = "Fuel level high enough for launch";
  }

  if (cargoLevel > 10000) {
    cargoStatus.innerHTML = "Cargo mass too heavy for launch";
    launchStatus.innerHTML = "Shuttle Not Ready for Launch";
    launchStatus.style.color = "red";
    list.style.visibility = "visible";
  } else {
    cargoStatus.innerHTML = "Cargo mass low enough for launch";
  }

  if (fuelLevel >= 10000 && cargoLevel <= 10000) {
    launchStatus.innerHTML = "Shuttle is Ready for Launch";
    launchStatus.style.color = "green";
    list.style.visibility = "visible";
  }
}

async function myFetch() {
  let planetsReturned;

  planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
    return response.json();
  });

  return planetsReturned;
}

function pickPlanet(planets) {
  let planet = planets[Math.floor(Math.random() * planets.length)];
  return planet;
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
