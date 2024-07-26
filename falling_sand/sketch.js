


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
const N = 200;
const SCALE = 3;
const EMPTY = 0;
const SAND = 1;
let radius = 10	;

function setup() {
  createCanvas(800, 800);
  grid_current = create2DArray(N, N, EMPTY);
  grid_buffer = create2DArray(N, N, EMPTY);
  // Initialize some sand particles for demonstration
//   grid_current[0][5] = SAND;
//   grid_current[1][5] = SAND;
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
// 	let tested = Array.from({ length: grid.length }, () => Array(grid[0].length).fill(false));
  
// 	function box_test(row, col, size) {
// 	  for (let i = 0; i < size; i++) {
// 		for (let j = 0; j < size; j++) {
// 		  if (row + i >= grid.length || col + j >= grid[0].length || grid[row + i][col + j] !== 1) {
// 			return false;
// 		  }
// 		}
// 	  }
// 	  return true;
// 	}
  
// 	function mark_tested(row, col, size) {
// 	  for (let i = 0; i < size; i++) {
// 		for (let j = 0; j < size; j++) {
// 		  tested[row + i][col + j] = true;
// 		}
// 	  }
// 	}
  
// 	function draw_shape(row, col, size) {
// 	  vertex(col * scale, row * scale);
// 	  vertex((col + size) * scale, row * scale);
// 	  vertex((col + size) * scale, (row + size) * scale);
// 	  vertex(col * scale, (row + size) * scale);
// 	}
  
// 	function recursive_draw(rowStart, rowEnd, colStart, colEnd) {
// 	  if (rowStart >= rowEnd || colStart >= colEnd) return;
  
// 	  let midRow = Math.floor((rowStart + rowEnd) / 2);
// 	  let midCol = Math.floor((colStart + colEnd) / 2);
  
// 	  recursive_draw(rowStart, midRow, colStart, midCol);
// 	  recursive_draw(rowStart, midRow, midCol, colEnd);
// 	  recursive_draw(midRow, rowEnd, colStart, midCol);
// 	  recursive_draw(midRow, rowEnd, midCol, colEnd);
  
// 	  for (let row = rowStart; row < rowEnd; row++) {
// 		for (let col = colStart; col < colEnd; col++) {
// 		  if (grid[row][col] === 1 && !tested[row][col]) {
// 			let maxSize = 1;
// 			while (box_test(row, col, maxSize)) {
// 			  maxSize++;
// 			}
// 			maxSize--; // Revert to last passing size
  
// 			mark_tested(row, col, maxSize);
// 			draw_shape(row, col, maxSize);
// 		  }
// 		}
// 	  }
// 	}
  
// 	beginShape();
// 	recursive_draw(0, grid.length, 0, grid[0].length);
// 	endShape(CLOSE);
//   }


function draw_pixels(scale, grid) {
	let tested = Array.from({ length: grid.length }, () => Array(grid[0].length).fill(false));
	const MAX_CALL_DEPTH = 100;
  
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
	  vertex(colStart * scale, rowStart * scale);
	  vertex(colEnd * scale, rowStart * scale);
	  vertex(colEnd * scale, rowEnd * scale);
	  vertex(colStart * scale, rowEnd * scale);
	  endShape(CLOSE);

	}
  
	function recursive_draw(rowStart, rowEnd, colStart, colEnd, depth) {
	  if (depth > MAX_CALL_DEPTH || rowStart >= rowEnd || colStart >= colEnd) return;
  
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



// function draw_pixels(scale, grid) {
// 	let kernelX = [
// 	  [-1, 0, 1],
// 	  [-2, 0, 2],
// 	  [-1, 0, 1]
// 	];
  
// 	let kernelY = [
// 	  [-1, -2, -1],
// 	  [0, 0, 0],
// 	  [1, 2, 1]
// 	];
  
// 	beginShape();
// 	for (let row = 1; row < N - 1; row++) {
// 	  for (let col = 1; col < N - 1; col++) {
// 		let sumX = 0;
// 		let sumY = 0;
  
// 		// Apply the kernels
// 		for (let i = -1; i <= 1; i++) {
// 		  for (let j = -1; j <= 1; j++) {
// 			sumX += grid[row + i][col + j] * kernelX[i + 1][j + 1];
// 			sumY += grid[row + i][col + j] * kernelY[i + 1][j + 1];
// 		  }
// 		}
  
// 		let magnitude = sqrt(sumX * sumX + sumY * sumY);
  
// 		// If an edge is detected, add a vertex
// 		if (magnitude > 0) {
// 		  vertex(col * scale, row * scale);
// 		  vertex((col + 1) * scale, row * scale);
// 		  vertex((col + 1) * scale, (row + 1) * scale);
// 		  vertex(col * scale, (row + 1) * scale);
// 		}
// 	  }
// 	}
// 	endShape(CLOSE);
//   }










// function draw_pixels(scale, grid) {
// 	// Find contours of sand regions
// 	let contours = findContours(grid);
	
// 	// Simplify and draw each contour
// 	for (let contour of contours) {
// 	  let simplifiedContour = simplifyContour(contour, 0.9); // Adjust epsilon as needed
	  
// 	  beginShape(QUADS);
// 	  for (let point of simplifiedContour) {
// 		let col = point.x;
// 		let row = point.y;
// 		// fill(row, col, 128, "HSV"); // Sandstone yellow
// 		fill(255); // Sandstone yellow
// 		vertex(col * scale, row * scale);
// 	  }
// 	  endShape(CLOSE);
// 	}
//   }
  
//   function findContours(grid) {
// 	let contours = [];
// 	let visited = Array(N).fill().map(() => Array(N).fill(false));
	
// 	for (let row = 0; row < N; row++) {
// 	  for (let col = 0; col < N; col++) {
// 		if (grid[row][col] === SAND && !visited[row][col]) {
// 		  let contour = [];
// 		  let pos = {x: col, y: row};
// 		  do {
// 			contour.push(pos);
// 			visited[pos.y][pos.x] = true;
// 			pos = findNextUnvisited(grid, visited, pos);
// 		  } while (pos && (pos.x !== col || pos.y !== row));
// 		  contours.push(contour);
// 		}
// 	  }
// 	}
// 	return contours;
//   }
  
//   function findNextUnvisited(grid, visited, pos) {
// 	const directions = [
// 	  {dx: 0, dy: -1}, {dx: 1, dy: -1}, {dx: 1, dy: 0}, {dx: 1, dy: 1},
// 	  {dx: 0, dy: 1}, {dx: -1, dy: 1}, {dx: -1, dy: 0}, {dx: -1, dy: -1}
// 	];
// 	for (let dir of directions) {
// 	  let nx = pos.x + dir.dx;
// 	  let ny = pos.y + dir.dy;
// 	  if (nx >= 0 && nx < N && ny >= 0 && ny < N &&
// 		  grid[ny][nx] === SAND && !visited[ny][nx]) {
// 		return {x: nx, y: ny};
// 	  }
// 	}
// 	return null;
//   }
  
//   function simplifyContour(points, epsilon) {
// 	if (points.length <= 2) return points;
	
// 	let maxDist = 0;
// 	let index = 0;
// 	let end = points.length - 1;
	
// 	for (let i = 1; i < end; i++) {
// 	  let dist = pointLineDistance(points[i], points[0], points[end]);
// 	  if (dist > maxDist) {
// 		index = i;
// 		maxDist = dist;
// 	  }
// 	}
	
// 	if (maxDist > epsilon) {
// 	  let results1 = simplifyContour(points.slice(0, index + 1), epsilon);
// 	  let results2 = simplifyContour(points.slice(index), epsilon);
// 	  return [...results1.slice(0, -1), ...results2];
// 	} else {
// 	  return [points[0], points[end]];
// 	}
//   }
  
//   function pointLineDistance(point, lineStart, lineEnd) {
// 	let dx = lineEnd.x - lineStart.x;
// 	let dy = lineEnd.y - lineStart.y;
// 	let numerator = Math.abs(dy * point.x - dx * point.y + lineEnd.x * lineStart.y - lineEnd.y * lineStart.x);
// 	let denominator = Math.sqrt(dx * dx + dy * dy);
// 	return numerator / denominator;
//   }