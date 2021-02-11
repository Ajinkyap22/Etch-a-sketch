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

  // Adding event listener here because the squares need to be reselected everytime the createGrid() function is called
  document
    .querySelectorAll(".square")
    .forEach((square) =>
      square.addEventListener(
        "mouseover",
        () => (square.style.backgroundColor = randomColor())
      )
    );
}

window.onload = createGrid();

// Grid must change color each time you hover over them
function randomColor() {
  let hexCode = "#";

  while (hexCode.length < 7) {
    hexCode += Math.round(Math.random() * 15).toString(16);
  }

  return hexCode;
}

// Change color function
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

// EVENT LISTENERS

// Change the slider label value as the slider moves
slider.oninput = function () {
  sliderLabel.textContent = this.value;
};

// Add a button on top which clears all the current grids & prompts the user for new grid size
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

// Change outline & color of btns, add hover style, active style, change heading color
