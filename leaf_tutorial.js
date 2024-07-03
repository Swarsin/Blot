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
    [leafL*0.85, 0]
  ])
]


//define bottom half:
const bottomHalf = bt.copy(topHalf);
bt.scale(bottomHalf, [1, -1], [0, 0]);

//adding noise to the leaf:
bt.iteratePoints(topHalf, (pt, t) => {
  const [x, y] = pt;
  const dy = bt.noise(t * 20.4, {octaves: 2}) * 0.15 * (t === 0 || t === 1 ? 0 : 1)
  return [x, y + dy]
})

bt.iteratePoints(bottomHalf, (pt, t) => {
  const [x, y] = pt;
  const dy = bt.noise(t * 20.8, {octaves: 2}) * -0.2 * (t === 0 || t === 1 ? 0 : 1)
  return [x, y + dy]
})


//function to add veins to leaf
function makeVeins() {
  const veins = [];

  let littleLinesMax = 59

  for (let i = 5; i < littleLinesMax; i++) {
    const t = i / (littleLinesMax - 1);
    const x0 = t * leafL;
    const y0 = 0;


//add to final lines
bt.join(finalLines, bottomHalf);
bt.join(finalLines, topHalf);
bt.join(finalLines, makeVeins());


//to scale and center on the paper:
const finalBounds = bt.bounds(finalLines);
const finalScale = width / finalBounds.width * 0.85;
bt.scale(finalLines, finalScale);
bt.translate(finalLines, [width / 2, height / 2], bt.bounds(finalLines).cc);

drawLines(finalLines);
