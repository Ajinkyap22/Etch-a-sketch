"use strict";

// VARIABLES
const container = document.querySelector(".container");
const form = document.querySelector(".new-grid");

// Create a grid container with default size = 16 x 16
function createGrid(size = 16) {
  // Deleting previously added divs
  container.innerHTML = "";

  // Clear input field
  document.querySelector(".grid-size").value = "";

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
    .forEach((square) => square.addEventListener("mouseover", randomRGB));
}

createGrid();

// Add a button on top which clears all the current grids & prompts the user for new grid size
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const newGridSize = +document.querySelector(".grid-size").value;

  createGrid(newGridSize);
});

// Grid must change color each time you hover over them
function randomRGB(e) {
  const r = Math.floor(Math.random() * 255) + 1;
  const g = Math.floor(Math.random() * 255) + 1;
  const b = Math.floor(Math.random() * 255) + 1;

  e.target.style.backgroundColor = `rgb(${r},${g},${b})`;
}

// Reset grid back to 16 x 16 white when reset is clicked
document
  .querySelector(".reset")
  .addEventListener("click", createGrid.bind(this, 16));

// Add a black color selector button
