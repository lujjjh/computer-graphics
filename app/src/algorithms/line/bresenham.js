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

  let e = -dx;
  let x = start.x;
  let y = start.y;

  for (let i = 0; i <= dx; i++) {
    outline.push(mapPoint.map({ x, y }));
    x++;
    e += 2 * dy;
    if (e >= 0) {
      y++;
      e -= 2 * dx;
    }
  }

  return { outline, fills };
};
