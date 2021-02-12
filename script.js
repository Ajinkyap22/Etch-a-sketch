"use strict";

// VARIABLES
const container = document.querySelector(".container");
const form = document.querySelector(".new-grid");
const colorPicker = document.querySelector(".color");
const slider = document.querySelector(".slider");
const sliderLabel = document.querySelector(".slider-label");

// FUNCTIONS

// Create a grid container with default size = 16 x 16
function createGrid(size = 16) {
  // Deleting previously added divs
  container.innerHTML = "";

  for (let i = 1; i <= size ** 2; i++) {
    // Create a div element
    const div = document.createElement("div");

    // Add a class to the div
    div.setAttribute("class", "square");

    // Append the div to container
    container.appendChild(div);
  }

  // Organize grid by the grid template properties
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  // Adding this here because the squares need to be reselected everytime the createGrid() function is called
  drawRandom();
}

// Generate a random color
function randomColor() {
  let hexCode = "#";

  while (hexCode.length < 7) {
    hexCode += Math.round(Math.random() * 15).toString(16);
  }

  return hexCode;
}

// draw a single color on hover
function drawOnHover(color) {
  document
    .querySelectorAll(".square")
    .forEach((square) =>
      square.addEventListener(
        "mouseover",
        () => (square.style.backgroundColor = color)
      )
    );
}

// Draw random colors on hover
function drawRandom() {
  document
    .querySelectorAll(".square")
    .forEach((square) =>
      square.addEventListener(
        "mouseover",
        () => (square.style.backgroundColor = randomColor())
      )
    );
}

// EVENT LISTENERS

// Change the slider label value as the slider moves
slider.oninput = function () {
  sliderLabel.textContent = `${this.value} X ${this.value}`;
};

// A button on top which clears all the current grids & takes new grid size from user
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const newGridSize = +document.querySelector(".slider").value;

  createGrid(newGridSize);
});

// Reset grid back to 16 x 16 white when reset is clicked
document
  .querySelector(".reset")
  .addEventListener("click", createGrid.bind(this, 16));

// Change the color when the input of color picker is changed
colorPicker.addEventListener("input", function () {
  drawOnHover(colorPicker.value);
});

// Eraser to change square color back to white
document
  .querySelector(".eraser")
  .addEventListener("click", drawOnHover.bind(this, "#FFF"));

// RGB button to switch back to random colors after erasing
document.querySelector(".rgb").addEventListener("click", drawRandom);

// MAIN FUNCTION CALL
window.onload = createGrid();
