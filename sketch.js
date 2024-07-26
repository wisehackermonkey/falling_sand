

 


let grid_current;
let grid_buffer;
const N = 500;
const SCALE = 1;
const EMPTY = 0;
const SAND = 1;
let radius = 100	;
let MAX_CALL_DEPTH = 20;
function setup() {
  createCanvas(N, N);
  grid_current = create2DArray(N, N, EMPTY);
  grid_buffer = create2DArray(N, N, EMPTY);
  // Initialize some sand particles for demonstration
//   grid_current[0][5] = SAND;
//   grid_current[1][5] = SAND;
//   frameRate(15);
  background(GRAY)
  noSmooth()
//   noStroke()
}

function draw() {
	background(GRAY)
  grid_current = updateGridState(grid_buffer, grid_current);
  draw_pixels(SCALE, grid_current);
  fill(255, 0, 0, 0.40 * 255);
//   fill(255, 0, 0);
if( radius > 0){
  circle(mouseX, mouseY, radius * SCALE*2);
}
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
	 	  for (let row = N - 2; row >= 0; row--) {  
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


function keyPressed() {
	if (key === ' ') {
	  grid_current = create2DArray(N, N, EMPTY);
	}
	if (key === '-') {

	  radius--;

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


let noiseScale = 0.02;
let noiseStrength = 0.5;
let noiseVal = 0;
let call_depth = 0
function draw_pixels(scale, grid) {
	let tested = Array.from({ length: grid.length }, () => Array(grid[0].length).fill(false));
  
	
	//the box test to only check the top bottom left right corners of the box
	// function box_test(rowStart, rowEnd, colStart, colEnd) {
	// 	if (grid[rowStart][colStart] === 0 || grid[rowStart][colEnd - 1] === 0) {
	// 		return false;
	// 	}
	// 	if (grid[rowEnd - 1][colStart] === 0 || grid[rowEnd - 1][colEnd - 1] === 0) {
	// 		return false;
	// 	}
	// 	return true;
	// }
	//rewrite the tested box to test all its pixels and return false if any of them is empty
	function box_test(rowStart, rowEnd, colStart, colEnd) {
		for (let row = rowStart; row < rowEnd; row++) {
		  for (let col = colStart; col < colEnd; col++) {
			if (grid[row][col] === 0) {
			  return false;
			}
		  }
		}
		return true;
	  }

  
	function mark_tested(rowStart, rowEnd, colStart, colEnd) {
	  for (let row = rowStart; row < rowEnd; row++) {
		for (let col = colStart; col < colEnd; col++) {
		  tested[row][col] = true;
		}
	  }
	}
  
	function draw_shape(rowStart, rowEnd, colStart, colEnd) {
		beginShape();
		//fill random  color
		// c = random(255)
		fill(call_depth*40,0,0)//+100, c*1.5, c/2);

      vertex(colStart * scale, rowStart * scale);
	  vertex(colEnd * scale, rowStart * scale);
	  vertex(colEnd * scale, rowEnd * scale);
	  vertex(colStart * scale, rowEnd * scale);
	  endShape(CLOSE);

	}
  
	function recursive_draw(rowStart, rowEnd, colStart, colEnd, depth) {
	  if (depth > MAX_CALL_DEPTH || rowStart >= rowEnd || colStart >= colEnd) return;
	  call_depth = depth
	  if (box_test(rowStart, rowEnd, colStart, colEnd)) {
		mark_tested(rowStart, rowEnd, colStart, colEnd);
		draw_shape(rowStart, rowEnd, colStart, colEnd);
	  } else if (rowEnd - rowStart > 1 || colEnd - colStart > 1) {
		let midRow = Math.floor((rowStart + rowEnd) / 2);
		let midCol = Math.floor((colStart + colEnd) / 2);
  
		recursive_draw(rowStart, midRow, colStart, midCol, depth + 1);
		recursive_draw(rowStart, midRow, midCol, colEnd, depth + 1);
		recursive_draw(midRow, rowEnd, colStart, midCol, depth + 1);
		recursive_draw(midRow, rowEnd, midCol, colEnd, depth + 1);
	  }
	}
  

	recursive_draw(0, grid.length, 0, grid[0].length, 0);
  }

  