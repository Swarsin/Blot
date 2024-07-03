// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

const width = 125;
const height = 125;

setDocDimensions(width, height);

// to draw a line from origin to top right corner of the page
// drawLines([
//   [[0, 0], [width, height]]
// ])

// to draw a square
// const s = 50

// drawLines([
//     [[0, 0], [0, s]],
//     [[0, s], [s, s]],
//     [[s, s], [s, 0]],
//     [[s, 0], [0, 0]]
// ])

//also to draw a square - but a better way - uses polylines 
// const s = 50;

// drawLines([
//     [[0, 0], [0, s], [s, s], [s, 0], [0, 0]]
// ])

//draw a pentagon
// const shape = (n, size) => {
//   const t = new bt.Turtle()
//   for (let i = 0; i < n; i++) t.forward(size).right(360/n)
//   return t.lines()
// }
// drawLines(shape(5, 80))

//draw feather
// const shth = 3  // shaft thickness
// const shl = 120  // shaft length
// const cl = 30  // calamus length (part without vanes)
// const vw = 20  // vane width, per vane
// const t = new bt.Turtle()

// // start pointing diagonally, and further within drawing area
// t.left(45).jump([20, 20])

// // draw the shaft
// t.forward(shl).left(90).forward(shth).left(90)
// t.forward(shl).left(90).forward(shth).left(90)

// // move to start of vanes
// t.up().forward(cl).left(90).forward(shth/2).right(90).down()

// // draw vanes
// const short = vw * Math.sqrt(2)
// const long = shl - cl - 2 * vw

// t.left(45)
// t.forward(short).right(45).forward(long).right(45).forward(short)
// .right(90)
// t.forward(short).right(45).forward(long).right(45).forward(short)

// drawLines(t.lines())


// // Shaft is a stretched triangle
// const shaft = bt.resample([[[0, 0], [1, 0], [0, -130], [-1, 0], [0, 0]]], 4)

// // Vanes are a Catmull-Rom curve
// const vanes = [bt.catmullRom([[0, 0], [-14, 16], [-22, 77], [0, 100], [15, 79], [14, 31], [0, 0]])]

// // move the vanes nearer to the end of the shaft
// bt.translate(vanes, [0, bt.bounds(shaft).cb[1] - bt.bounds(vanes).cb[1] - 8])

// // combine the two shapes, then move and rotate them together!
// const feather = [...shaft, ...vanes]
// bt.translate(feather, [width / 2, height / 2], bt.bounds(feather).cc)
// bt.iteratePoints(feather, ([x, y]) => [x - 0.002*(width/2-y)*(width/2-y), y])
// bt.rotate(feather, 135)
// drawLines(feather)

// // store final lines here
// const finalLines = [];

// // create a polyline
// const polyline = [
//   [30, 90],
//   [100, 90],
//   [100, 30],
//   [30, 30],
//   [30, 90]
// ];

// // add the polyline to the final lines

// finalLines.push(polyline);

// // transform lines using the toolkit
// bt.rotate(finalLines, 45);

// // draw it
// drawLines(finalLines);
