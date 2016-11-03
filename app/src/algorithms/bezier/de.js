function distance(point1, point2) {   // calculate distance between two points
  let dx = point1.x - point2.x;
  let dy = point1.y - point2.y;
  let distance = dx * dx + dy * dy;
  distance = Math.sqrt(distance);
  return distance;
}

function definePt(point1, point2, t) {    // find the next point
  let nextPoint = { x: 0, y: 0 };
  nextPoint.x = (1 - t) * point1.x + t * point2.x;
  nextPoint.y = (1 - t) * point1.y + t * point2.y;
  return nextPoint;
}

function maxLength(pt0_0, pt0_1, pt0_2, pt0_3) {    // find the max length among all points
  let length1, length2, length3, length4, length5, length6, maxlength;
  length1 = distance(pt0_0, pt0_1);
  length2 = distance(pt0_0, pt0_2);
  length3 = distance(pt0_0, pt0_3);
  length4 = distance(pt0_1, pt0_2);
  length5 = distance(pt0_1, pt0_3);
  length6 = distance(pt0_2, pt0_3);
  maxlength = Math.max(length1, length2, length3, length4, length5, length6);
  return maxlength;
}

export default ({ selectedPixels }) => {
  let outline = [];
  let fills = [];
  let [pt0_0, pt0_1, pt0_2, pt0_3] = selectedPixels;
  outline.push({ x: pt0_1.x, y: pt0_1.y }, {x: pt0_2.x, y: pt0_2.y });
  let maxlength;
  maxlength = maxLength(pt0_0, pt0_1, pt0_2, pt0_3);
  let pt1_0, pt1_1, pt1_2;
  let pt2_0, pt2_1;
  let pt3_0;
  for (let t = 0; t <= 1; t += 0.1 / maxlength) {
    pt1_0 = definePt(pt0_0, pt0_1, t);
    pt1_1 = definePt(pt0_1, pt0_2, t);
    pt1_2 = definePt(pt0_2, pt0_3, t);

    pt2_0 = definePt(pt1_0, pt1_1, t);
    pt2_1 = definePt(pt1_1, pt1_2, t);

    pt3_0 = definePt(pt2_0, pt2_1, t);
    outline.push({ x: Math.round(pt3_0.x), y: Math.round(pt3_0.y) });
  }
  return { outline, fills };
};
