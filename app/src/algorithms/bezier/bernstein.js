function factorial(n) {
  let result = 1;
  for (let i = 1; i < n + 1; i++) {
    result *= i;
  }
  return result;
}

function bernstein(t, i) {
  let Bernstein;
  Bernstein = (factorial(3) / (factorial(i) * factorial(3 - i))) * Math.pow(t, i) * Math.pow(1 - t, 3 - i);
  return Bernstein;
}

export default ({ selectedPixels }) => {
  let outline = [];
  let [pt0, pt1, pt2, pt3] = selectedPixels;
  let pt = [];
  pt.push({ x: pt0.x, y: pt0.y });
  pt.push({ x: pt1.x, y: pt1.y });
  pt.push({ x: pt2.x, y: pt2.y });
  pt.push({ x: pt3.x, y: pt3.y });
//   let pt = P_i(pt0, pt1, pt2, pt3);
  let nextPt = { x: 0, y: 0 };
  for (let t = 0; t <= 1; t += 0.00001) {
    nextPt = { x: 0, y: 0 };
    for (let i = 0; i < 4; i++) {
      nextPt.x += pt[i].x * bernstein(t, i);
      nextPt.y += pt[i].y * bernstein(t, i);
    }
    outline.push({ x: Math.round(nextPt.x), y: Math.round(nextPt.y) });
  }
  return { outline, fills: [] };
};
