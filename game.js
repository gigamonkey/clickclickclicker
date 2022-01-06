// This file contains the code for the clicker game that is required by the framework
// defined in clicker.js. The only requirements are that you define three functions:
// `setup`, `click`, and `update`. See the code in clicker.js for more discussion 
// of how they are used. Simple version of both functions are defined below.

let coins = 0;
let houses = 0;

let clickValue = 1;
let housePrice = 10;
let houseIncomePerSecond = 1;

function setup() {
    document.getElementById("buy-house").onclick = e => buy("house");
}

function buy(what) {
  if (what === "house") {
    coins -= housePrice;
    houses++;
  } else {
    console.log(`Don't know how to buy ${what}`)
  }
}

// This function is called for each click, including each individual click of a
// double or triple click.
function click() {
  coins += clickValue;
}

// The function called for each step of the animation. We are told the number 
// (likely fractional) of seconds that have passed since the last update. 
// If this function ever returns false, the animation loop will stop.
function update(elapsed) {

  // Update values
  coins += incomePerSecond() * elapsed / 1000;

  // Then update the document.
  document.getElementById("coins").innerText = "" + Math.floor(coins);
  document.getElementById("houses").innerText = "" + Math.floor(houses);

  document.getElementById("buy-house").style.display = coins >= housePrice ? 'inline' : 'none';

  // Keep going forever.
  return true;
}

// Compute the number of coins of passive income (i.e. not from clicks) we
// are currently earning per second.
function incomePerSecond() {
  return houses * houseIncomePerSecond;
}