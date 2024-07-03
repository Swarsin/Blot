// check out the workshop tab to get started
// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

const width = 125;
const height = 125;
setDocDimensions(width, height);

// store final lines here
const finalLines = [];

//leaf dimensions
const leafL = bt.randInRange(5, 8)
const leafW = bt.randInRange(2, 4)

//define points for top half:
const topHalf = [
  bt.nurbs([
    [0, 0],
    [leafL * 0.15, leafW * 0.45],
    [leafL * 0.8, leafW * 0.19],
    [leafL * 0.85, 0]
  ])
]


//define bottom half:
const bottomHalf = bt.copy(topHalf);
bt.scale(bottomHalf, [1, -1], [0, 0]);

//adding noise to the leaf:
bt.iteratePoints(topHalf, (pt, t) => {
  const [x, y] = pt;
  const dy = bt.noise(t * 20.4, { octaves: 2 }) * 0.15 * (t === 0 || t === 1 ? 0 : 1)
  return [x, y + dy]
})

bt.iteratePoints(bottomHalf, (pt, t) => {
  const [x, y] = pt;
  const dy = bt.noise(t * 20.8, { octaves: 2 }) * -0.2 * (t === 0 || t === 1 ? 0 : 1)
  return [x, y + dy]
})

// function for creating veins 
function makeVeins() {
  const veins = [];

  let littleLinesMax = 59

  for (let i = 5; i < littleLinesMax; i++) {
    const t = i / (littleLinesMax - 1);
    const x0 = t * leafL;
    const y0 = 0;

    const y = bt.getPoint(topHalf, t + 0.2)[1]

    const angle = (-70 + t * 37 + bt.randInRange(-4, 4)) / 180 * Math.PI;
    let r = y * 0.8;

    const line = [
      bt.nurbs([
        [x0, y0],
        [x0 + Math.cos(angle) * r / 2 - y / 4, -(y0 + Math.sin(angle) * r / 2)],
        [x0 + Math.cos(angle) * r, -(y0 + Math.sin(angle) * r)]
      ])
    ];

    if (r < 0.01) continue;

    const trimTo = (i % 5 === 0) ?
      bt.randInRange(0.7, 0.9) :
      bt.randInRange(0.1, 0.7);

    bt.trim(line, 0, trimTo);

    bt.resample(line, 0.03);

    bt.iteratePoints(line, pt => {
      return Math.random() < (i % 5 === 0 ? 0.28 : 0.40) ? 'BREAK' : pt;
    });

    bt.join(veins, line);
  }
  return veins;
}

//creating the stem
const stem = [
  [
    [-leafL * 0.2, 0],
    [leafL * 0.85, 0]
  ]
];
bt.resample(stem, 0.01)


//add to final lines
bt.join(finalLines, bottomHalf);
bt.join(finalLines, topHalf);
bt.join(finalLines, makeVeins());

const bottomVeins = makeVeins();
bt.scale(bottomVeins, [1, -1], [0, 0]);
bt.join(finalLines, bottomVeins);
bt.join(finalLines, stem);

//to bend the leaf upwards
bt.iteratePoints(finalLines, pt => {
  let [x, y] = pt
  y += x * x * 0.05
  y += bt.noise([x * 0.2]) * 0.3
  return [x, y]
});


//to scale and center on the paper:
const finalBounds = bt.bounds(finalLines);
const finalScale = width / finalBounds.width * 0.85;
bt.scale(finalLines, finalScale);
bt.translate(finalLines, [width / 2, height / 2], bt.bounds(finalLines).cc);


drawLines(finalLines);
