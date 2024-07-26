


// // function setup() {
// // 	createCanvas(windowWidth, windowHeight);
// // 	// put setup code here
// // 	background(0)
// // 	print("works")
// // }

// // function draw() {
// // 	// put drawing code here
// // 	//https://youtu.be/ArcHpsTXhb0?t=174
// // }



let grid_current;
let grid_buffer;
const N = 250;
const SCALE = 3;
const EMPTY = 0;
const SAND = 1;
let radius = 10	;

function setup() {
  createCanvas(800, 800);
  grid_current = create2DArray(N, N, EMPTY);
  grid_buffer = create2DArray(N, N, EMPTY);
  // Initialize some sand particles for demonstration
  grid_current[0][5] = SAND;
  grid_current[1][5] = SAND;
//   frameRate(15);
  background(GRAY)
  noSmooth()
  noStroke()
}

function draw() {
	background(GRAY)
  grid_current = updateGridState(grid_buffer, grid_current);
  draw_pixels(SCALE, grid_current);
  fill(255, 0, 0, 0.40 * 255);
//   fill(255, 0, 0);
  circle(mouseX, mouseY, radius * SCALE*2);
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


function updateGridState(grid_buffer, grid_current) {
// 	  for (let i = 0; i < N; i++) {
//     for (let j = 0; j < N; j++) {
// 		grid_buffer[i][j] = grid_current[i][j];
//     }
//   }

	// for (let row = 0; row < N - 1; row++) {
	//   for (let col = 0; col < N; col++) {
	  for (let row = N - 2; row >= 0; row--) { // Start from second last row
		//sum row and if its grater than 0 the skip loop

    for (let col = 0; col < N; col++) {
		if (grid_current[row][col] === SAND) {
		  if (grid_current[row + 1][col] === EMPTY) {
			grid_buffer[row][col] = EMPTY;
			grid_buffer[row + 1][col] = SAND;
		  } else if (col > 0 && grid_current[row + 1][col] === SAND && grid_current[row + 1][col - 1] === EMPTY) {
			grid_buffer[row][col] = EMPTY;
			grid_buffer[row + 1][col - 1] = SAND;
		  } else if (col > 0 && grid_current[row - 1][col] === SAND && grid_current[row - 1][col + 1] === EMPTY) {
			grid_buffer[row][col] = EMPTY;
			grid_buffer[row - 1][col + 1] = SAND;
		  } else {
			grid_buffer[row][col] = grid_current[row][col];
		  }
		} else {
		  grid_buffer[row][col] = grid_current[row][col];
		}
	  }
	}
	return grid_buffer;
  }
// function mousePressed() {
// 	let col = floor(mouseX / SCALE);
// 	let row = floor(mouseY / SCALE);
// 	if (col >= 0 && col < N && row >= 0 && row < N) {
// 		grid_current[row][col] = SAND;
// 	}
// 	print("mouse pressed")
//   }

function keyPressed() {
	if (key === ' ') {
	  grid_current = create2DArray(N, N, EMPTY);
	}
	if (key === '-') {
		if (radius -1 === 0) {
			//draw a circle of size radius * scale factor make its opacaity 30 and red
			

	  radius--;
		}

	} 
	if (key === '=') {
	  radius++;
	}
  }
function mousePressed() {
	let col = floor(mouseX / SCALE);
	let row = floor(mouseY / SCALE);
	if (col >= 0 && col < N && row >= 0 && row < N) {
		grid_current[row][col] = SAND;
	  setSandAtPosition(row, col);
	}
  }
  
  function mouseDragged() {
	let col = floor(mouseX / SCALE);
	let row = floor(mouseY / SCALE);
	if (col >= 0 && col < N && row >= 0 && row < N) {
	  grid_current[row][col] = SAND;
	  setSandAtPosition(row, col);
	}
  }
//   function setSandAtPosition(row, col) {
// 	const radius = 2;
// 	for (let i = -radius; i <= radius; i++) {
// 	  for (let j = -radius; j <= radius; j++) {
// 		let newRow = row + i;
// 		let newCol = col + j;
// 		if (newRow >= 0 && newRow < N && newCol >= 0 && newCol < N) {
// 		  grid_current[newRow][newCol] = SAND;
// 		}
// 	  }
// 	}
//   }
function setSandAtPosition(row, col) {
    // radius = 3;
    for (let i = -radius; i <= radius; i++) {
      for (let j = -radius; j <= radius; j++) {
        let newRow = row + i;
        let newCol = col + j;
		
        let distance = floor(sqrt(i * i + j * j)+.5)
        if (distance <= radius && newRow >= 0 && newRow < N && newCol >= 0 && newCol < N) {
          grid_current[newRow][newCol] = SAND;
        }
      }
    }
}
// function draw_pixels(scale, grid) {
//   for (let row = 0; row < N; row++) {
// 	// 	 if (grid_current[row].reduce((a, b) => a + b, 0) === 0) {
// 	// 	continue;
// 	//  }
//     for (let col = 0; col < N; col++) {
//       if (grid[row][col] === SAND) {
//         fill(194*row+col%255, 178, 128); // Sandstone yellow
//       } else{
// 		fill(0);
// 	  }
//       square(col * scale, row * scale, scale);
//     }
//   }
// }

function draw_pixels(scale, grid) {
	beginShape(QUADS);
	for (let row = 0; row < N; row++) {
	  for (let col = 0; col < N; col++) {
		if (grid[row][col] === SAND) {
		  fill(row, col, 128,"HSV"); // Sandstone yellow
		  vertex(col * scale, row * scale);
		vertex((col + 1) * scale, row * scale);
		vertex((col + 1) * scale, (row + 1) * scale);
		vertex(col * scale, (row + 1) * scale);
		}
		
	  }
	}
	endShape(CLOSE);
  }