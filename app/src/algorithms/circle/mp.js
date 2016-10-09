import PointMapper from '../utils/PointMapper';

function circlePoints({ x, y }) {
  let points = [];
  points.push({ x: x, y: y });
  if (x !== y) points.push({ x: y, y: x });
  if (x !== 0) points.push({ x: -x, y: y });
  if (x !== 0) points.push({ x: y, y: -x });
  if (y !== 0) points.push({ x: x, y: -y });
  if (y !== 0) points.push({ x: -y, y: x });
  if (x !== 0 || y !== 0) points.push({ x: -x, y: -y });
  if (x !== y) points.push({ x: -y, y: -x });
  return points;
}

export default ({ selectedPixels }) => {
  let outline = [];
  let fills = [];

  let [center, edge] = selectedPixels;
  let mapPoint = new PointMapper();
  mapPoint.add(({ x, y }) => ({ x: x + center.x, y: y + center.y }));

  let dx = center.x - edge.x;
  let dy = center.y - edge.y;
  let r = ~~Math.sqrt(dx * dx + dy * dy);
  let [x, y] = [0, r];
  let e = 1 - r;
  while (x <= y) {
    outline.push(...circlePoints({ x, y }).map(point => mapPoint.map(point)));
    if (e < 0) {
      e += 2 * x + 3;
    } else {
      e += 2 * (x - y) + 5;
      y--;
    }
    x++;
  }

  return { outline, fills };
};
