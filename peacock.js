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
const shaftLength = 25
const shaft = [
  [0, 0],
  [0, 25],
  [0, 0]
];
fullFeather.push(shaft);

//tying to add barbs to the feather now:
bt.join(fullFeather, addBarbs())

const rightBarbs = addBarbs();
bt.scale(rightBarbs, [-1, 1], [0, 0]);
bt.join(fullFeather, rightBarbs);


function addBarbs() {
  const barbs = [];

  let maxBarbs = 90;
  for (let i = 40; i < maxBarbs; i++) {
    const t = i / (maxBarbs - 1);

    const y0 = t * shaftLength;
    const x0 = 0;

    const y = bt.getPoint(leftHalf, t + 0.1)[1]

    const angle = (150 + t * -20 + bt.randInRange(-4, 4)) / 180 * Math.PI;
    let r = y * 0.45;

    const line = [
      bt.nurbs([
        [x0, y0],
        [
          -(x0 + Math.cos(angle) * r / 180 - y / 5),
          (y0 + Math.sin(angle) * r / 2)
        ],
        [
          -(x0 + Math.cos(angle) * 0.5 * r),
          (y0 + Math.sin(angle) * 0.5 * r)
        ]
      ])
    ];

    if (r < 0.01) continue;

    bt.join(barbs, line);
  }
  return barbs;
}

//array of bunch of feathers
const featherCount = bt.randInRange(8, 15);
const feathers = [];
for (let i = 0; i < featherCount; i++) {
  const oneFeather = bt.copy(fullFeather);
  bt.rotate(oneFeather, i * (180 / featherCount), [0, 0]);
  bt.join(finalLines, oneFeather);
}


//to center the feathers onto the page:
const finalLinesBounds = bt.bounds(finalLines);
bt.translate(
  finalLines,
  [width / 2, height / 2],
  [0, 0]
);


//to make the feather upright
bt.rotate(finalLines, 270, [width / 2, height / 2]);


//making the actual peacock now :)
const peacock = new bt.Turtle()
  .jump([(width / 2) - 20], height / 2)
  .arc(-180, 40)


//draw the polylines
drawLines(finalLines);
drawLines(peacock.lines())
