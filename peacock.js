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
const maxPatterns = 5; //minus 2 because of scaling, as it starts from 2 


//creating halves of the feather first
const leftHalf = [
  bt.nurbs([
    [0, 0],
    [featherW * 0.50, featherL * 0.5],
    [0, featherL]
  ])
];

const rightHalf = bt.copy(leftHalf);
bt.scale(rightHalf, [-1, 1], [0, 0]);

const pattern = [
  bt.nurbs([
    [-featherW * 0.25, featherL * 0.25],
    [0, 0.5],
    [featherW * 0.25, featherL * 0.25],
    [0, 1.5],
    [-featherW * 0.25, featherL * 0.25]
  ])
]
bt.scale(pattern, [1, -1], [0, 0.75]);


//defining a part feather
var partFeather = [];
bt.join(partFeather, leftHalf);
bt.join(partFeather, rightHalf);


//creating full feather
const fullFeather = [];

for (let i = 2; i < maxPatterns; i++) {
  const scaledFeather = bt.copy(partFeather);
  bt.scale(scaledFeather, [i, i], [0, 0]);
  bt.join(fullFeather, scaledFeather);
}
bt.join(fullFeather, partFeather);
bt.join(fullFeather, pattern);

bt.translate(fullFeather, [0, 25])


//adding shaft of feather
const shaft = [
  [0, 0],
  [0, 25],
  [0, 0]
];
fullFeather.push(shaft);

function addBarbs() {
  const barbs = [];

  
}

function makeVeins() {
  const veins = [];

  let littleLinesMax = 61
  for (let i = 4; i < littleLinesMax - 5; i++) {
    const t = i / (littleLinesMax - 1); // this line to get t values 0 to 1 while iterating is very common
    const x0 = 0;
    const y0 = t * leafLength;


drawLines(fullFeather)


// var fullFeather = [];

// for (let i = 1; i < maxPatterns; i++) {
//   let scaledFeather = bt.scale(partFeather, [i, i], [0, 0]);
//   fullFeather.push(scaledFeather);
// }

// for (let i = 0; i < fullFeather.length; i++) {
//   drawLines(fullFeather[i]);
// }

// console.log(fullFeather)
