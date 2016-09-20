export default ({ selectedPixels }) => {
  let outline = [];
  let fills = [];

  let [start, end] = selectedPixels;

  let dx = end.x - start.x;
  let dy = end.y - start.y;

  let steps = Math.max(Math.abs(dx), Math.abs(dy));
  let deltaX = dx / steps;
  let deltaY = dy / steps;
  let { x, y } = start;
  while (steps-- >= 0) {
    outline.push({ x: Math.round(x), y: Math.round(y) });
    x += deltaX;
    y += deltaY;
  }

  return { outline, fills };
};
