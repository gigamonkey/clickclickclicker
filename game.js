// This file contains the code for the clicker game that is required
// by the framework defined in clicker.js. The only requirements are
// that you define three functions: `setup`, `click`, and `update`.
// See the code in clicker.js for more discussion of how they are
// used. Simple version of all three functions are defined below.

let coins = 0;
let houses = 0;

let clickValue = 1;
let housePrice = 10;
let houseIncomePerSecond = 1;

// Called once by the clicker framework when the page is loaded.
// For now, use this so hook up an event handler on the "Buy House!"
// span.
function setup() {
    document.getElementById("buy-house").onclick = buyHouse;
}

// Called for each mouse click.
function click() {
  coins += clickValue;
}

// Called for each step of the animation. We are told the number
// (likely fractional) of seconds that have passed since the last
// update. If this function ever returns false, the animation loop
// will stop.
function update(elapsed) {

  // First, update the state of the world based on the amount of time
  // that has elapsed since the last time we were called.
  coins += incomePerSecond() * elapsed / 1000;

  // Then update the counts in the document.
  document.getElementById("coins").innerText = "" + Math.floor(coins);
  document.getElementById("houses").innerText = "" + Math.floor(houses);

  // And display a clickable span if we can afford a house.
  if (coins >= housePrice) {
    document.getElementById("buy-house").style.display = 'inline';
  } else {
    document.getElementById("buy-house").style.display = 'none';
  }

  // Keep going forever.
  return true;
}

function buyHouse() {
    coins -= housePrice;
    houses++;
}

// Compute the number of coins of passive income (i.e. not from
// clicks) we are currently earning per second.
function incomePerSecond() {
  return houses * houseIncomePerSecond;
}
