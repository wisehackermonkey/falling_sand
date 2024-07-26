


// function setup() {
// 	createCanvas(windowWidth, windowHeight);
// 	// put setup code here
// 	background(0)
// 	print("works")
// }

// function draw() {
// 	// put drawing code here
// 	//https://youtu.be/ArcHpsTXhb0?t=174
// }



let grid_current;
let grid_buffer;
const N = 25;
const SCALE = 16;
const EMPTY = 0;
const SAND = 1;

function setup() {
  createCanvas(400, 400);
  grid_current = create2DArray(N, N, EMPTY);
  grid_buffer = create2DArray(N, N, EMPTY);
  // Initialize some sand particles for demonstration
  grid_current[0][5] = SAND;
  grid_current[2][5] = SAND;
  frameRate(3);
  background(GRAY)
}

function draw() {
  grid_current = updateGridState(grid_buffer, grid_current);
  draw_pixels(SCALE, grid_current);
}

function create2DArray(rows, cols, initialValue) {
  let arr = [];
  for (let i = 0; i < rows; i++) {
    arr[i] = [];
    for (let j = 0; j < cols; j++) {
      arr[i][j] = initialValue;
    }
  }
  return arr;
}

function updateGridState(buffer, current) {
  // Copy current grid to buffer
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      buffer[i][j] = current[i][j];
    }
  }

  for (let row = N - 2; row >= 0; row--) { // Start from second last row
    for (let col = 0; col < N; col++) {
      if (current[row][col] === SAND && current[row + 1][col] === EMPTY) {
        buffer[row][col] = EMPTY;
        buffer[row + 1][col] = SAND;
      }
    }
  }

  return buffer;
}

function draw_pixels(scale, grid) {
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      if (grid[row][col] === SAND) {
        fill(194, 178, 128); // Sandstone yellow
      } else {
        fill(0); // Black for empty
      }
      rect(col * scale, row * scale, scale, scale);
    }
  }
}