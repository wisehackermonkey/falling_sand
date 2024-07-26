# falling sand
inspired by https://www.youtube.com/watch?v=ArcHpsTXhb0
Another Falling Sand Game

npm  i -gp5-manager

p5 server

http://localhost:5555/#/falling_sand
![alt text](image.png)
![alt text](image-4.png)
first working verions!!!
![alt text](image-1.png)
# first working piling behavor
![](image-3.png)
# prompt
```python
write a javscript p5.js sketch.
creates two grid's
grid_current = a NxN arrays, (hiegnt, width),initalized to all 0 's
grid_buffer = a NxN arrays, (hiegnt, width), initalized to all 0's
create a enum {0: empty, 1: sand}
set current position to 
where height defaults to 10
      width  defaults to 10

create a function updateGridState to screen
inputs: 
grid_buffer, grid_current

for each row in grid

iterate the columns
if grid[current row+1][current column] is equal to enum "empty"
    set grid_buffer [current row][current column] to 'empty'
    # move the sand pixel down 
    set grid_buffer [current_rowrow+1][current column] to "sand"
if  cell bellow current is sand and grid to left & down is 'EMPTY'
    set left and down = SAND
    set current index to EMPTY



returns buffer grid

create a function draw_pixels

inputs: 
scale factor for pixels default to 4x size, grid
for each position in grid draw a rect of size scale factor by scale factor
set fill color to sandstone yellow
return 

create a function that sets the current mouse position mapped to which current grid location its pointed to and sets it from EMPTY to full
also set the surounding pixels in a radius of 5 to SAND

funciton draw()
set the result of updateGridState(scale factor, grid_buffer, grid_current) to current grid
draw_pixels
```

prompt v1
draw_pixels
create a edge detection kernal if the sum of the kernal detects a edge add a vertext to beginshape
if not dont do anything


![alt text](image-5.png)
DUDE THIS LOOKS AWESOME
but has error of vertex drawing order
![alt text](image-6.png)

fixed! was simple
dam this one came out looking really cool
prompt v2
draw_pixels
recusively do
start by splitting the grid into 4 quadrents test each, keep sub dividing untill box test size is 1
set call limit to 10

box test is iterate through 
if 0 is found then box test fails
    recurvivly subdivide the box 
if all are 1's then pass
    add vertex's for all 4 corners of.

