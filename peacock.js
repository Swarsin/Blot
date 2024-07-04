// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

const width = 125;
const height = 125;

setDocDimensions(width, height);


// store final lines here
const finalLines = [];

//feather dimensions
const featherL = 2;
const featherW = 2;
const maxPatterns = 5;

//creating halves of the feather first
const leftHalf = [
  bt.nurbs([
  [0, 0],
  [featherW * 0.50, featherL * 0.5],
  [0, featherL]
  ])
];

const rightHalf = bt.copy(leftHalf);
bt.scale(leftHalf, [-1, 1], [0, 0]);

//defining a part feather
var partFeather = [];
bt.join(partFeather, leftHalf);
bt.join(partFeather, rightHalf);

var fullFeather = [];

for (let i = 1; i < maxPatterns; i++) {
  let scaledFeather = bt.scale(partFeather, [i, i], [0, 0]);
  fullFeather.push(scaledFeather);
}

for (let i = 0; i < fullFeather.length; i++) {
  drawLines(fullFeather[i])
}

console.log(fullFeather)
