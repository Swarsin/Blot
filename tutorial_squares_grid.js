// check out the workshop tab to get started
// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

const width = 120;
const height = 120;

setDocDimensions(width, height);

// store final lines here
const finalLines = [];
//bt.join(finalLines, rect(10, 10)) //for only one square

//for making a 10x10 grid of squares
const gridWidth = 10
const gridLength = 10

for (let j = 0; j < gridLength; j++) {
  for (let i = 0; i < gridWidth; i++) {
    const square = rect(10, 10);
    bt.translate(square, [10*i, 10*j]);
    bt.translate(square, [bt.randInRange(-1, 1)*i/5, bt.randInRange(-1, 1)*i/5]);
    bt.rotate(square, bt.randInRange(-1*i, 1*i))
    bt.join(finalLines, square);
  }
}

//creating constant representing the bounds of the final lines 
const finalLinesBounds = bt.bounds(finalLines);

//moves center of drawing to center of doc
bt.translate(
  finalLines, 
  [width/2, height/2],
  finalLinesBounds.cc  
);

function rect(w, h) {
  return [
    [
      [-w/2, h/2],
      [w/2, h/2],
      [w/2, -h/2],
      [-w/2, -h/2],
      [-w/2, h/2],
    ]
  ]
}
  
drawLines(finalLines);
