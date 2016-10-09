import PointMapper from '../utils/PointMapper';

export default ({ selectedPixels }) => {
  let outline = [];
  let fills = [];

  let [start, end] = selectedPixels;

  // clone
  start = Object.assign({}, start);
  end = Object.assign({}, end);

  let mapPoint = new PointMapper();

  if (start.x > end.x) {
    [start, end] = [end, start];
  }
  if (start.y > end.y) {
    [start.y, end.y] = [end.y, start.y];
    mapPoint.add(({ x, y }) => ({ x: end.x - (x - start.x), y }));
  }
  let dx = end.x - start.x;
  let dy = end.y - start.y;
  if (dx < dy) {
    [start.x, start.y, end.x, end.y] = [start.y, start.x, end.y, end.x];
    [dx, dy] = [dy, dx];
    mapPoint.add(({ x, y }) => ({ x: y, y: x }));
  }

  let a = start.y - end.y;
  let b = end.x - start.x;

  let d = 2 * a + b;
  let delta1 = a + a;
  let delta2 = delta1 + b + b;

  let { x, y } = start;

  do {
    outline.push(mapPoint.map({ x, y }));
    x++;
    if (d > 0) {
      d += delta1;
    } else {
      y++;
      d += delta2;
    }
  } while (x <= end.x);

  return { outline, fills };
};
