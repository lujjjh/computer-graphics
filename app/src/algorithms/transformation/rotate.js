import de from '../bezier/de';

function distance(point1, point2) {   // calculate distance between two points
  let dx = point1.x - point2.x;
  let dy = point1.y - point2.y;
  let distance = dx * dx + dy * dy;
  distance = Math.sqrt(distance);
  return distance;
}

function cos(b, c, a) {
  let ans;
  ans = (b * b + c * c - a * a) / (2 * b * c);
  return ans;
}

function averagePt(a, b, c, d) {
  let average;
  average.x = (a.x + b.x + c.x + d.x) / 4;
  average.y = (a.y + b.y + c.y + d.y) / 4;
  return average;
}

export default ({ selectedPixels }) => {
  let remeberControlPts = [];
  let [pt0_0, pt0_1, pt0_2, pt0_3, rotate1, rotate2, rotate3] = selectedPixels;
  remeberControlPts.push({ x: pt0_0.x, y: pt0_0.y }, { x: pt0_1.x, y: pt0_1.y }, {x: pt0_2.x, y: pt0_2.y }, { x: pt0_3.x, y: pt0_3.y });
  let average;
  average.x = averagePt(pt0_0.x, pt0_1.x, pt0_2.x, pt0_3.x);
  average.y = averagePt(pt0_0.y, pt0_1.y, pt0_2.y, pt0_3.y);
  let a = distance(rotate1, rotate2);
  let b = distance(rotate2, rotate3);
  let c = distance(rotate3, rotate1);
  let cosA = cos(b, c, a);
  let sinA = Math.sin(Math.acos(cosA));
  for (let i = 0; i < 4; i++) {
    remeberControlPts[i].x += average.x;
    remeberControlPts[i].y += average.y;
    remeberControlPts[i].x = remeberControlPts[i].x * cosA - remeberControlPts[i].y * sinA;
    remeberControlPts[i].y = remeberControlPts[i].x * sinA + remeberControlPts[i].y * cosA;
    remeberControlPts[i].x -= average.x;
    remeberControlPts[i].y -= average.y;
    remeberControlPts[i].x = Math.round(remeberControlPts[i].x);
    remeberControlPts[i].y = Math.round(remeberControlPts[i].y);
  }
  return de({ selectedPixels: [remeberControlPts[0], remeberControlPts[1], remeberControlPts[2], remeberControlPts[3]] });
};
