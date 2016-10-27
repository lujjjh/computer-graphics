import line from '../line/dda';

let inside = {
  left: (pt, boundary) => pt.x >= boundary.left,
  right: (pt, boundary) => pt.x < boundary.right,
  bottom: (pt, boundary) => pt.y >= boundary.bottom,
  top: (pt, boundary) => pt.y < boundary.top
};

let intersect = (pt1, pt2, boundary, type) => {
  let x, y;
  let k = (pt1.y - pt2.y) / (pt1.x - pt2.x);
  let invk = (pt1.x - pt2.x) / (pt1.y - pt2.y);
  switch (type) {
    case 'left':
      x = boundary.left;
      y = pt1.y + k * (x - pt1.x);
      break;
    case 'right':
      x = boundary.right;
      y = pt1.y + k * (x - pt1.x);
      break;
    case 'bottom':
      y = boundary.bottom;
      x = pt1.x + invk * (y - pt1.y);
      break;
    case 'top':
      y = boundary.top;
      x = pt1.x + invk * (y - pt1.y);
      break;
  }
  x = Math.round(x);
  y = Math.round(y);
  return { x, y };
};

let sutherland = ({ vertex, boundary, type }) => {
  let outVertex = [];

  let s = vertex[vertex.length - 1];
  let localInside = inside[type];
  for (let i = 0; i < vertex.length; i++) {
    let p = vertex[i];
    if (localInside(p, boundary)) {
      if (!localInside(s, boundary)) {
        outVertex.push(intersect(s, p, boundary, type));
      }
      outVertex.push(p);
    } else if (localInside(s, boundary)) {
      outVertex.push(intersect(s, p, boundary, type));
    }
    s = p;
  }

  return outVertex;
};

export default ({ selectedPixels }) => {
  let vertex = [];
  let boundary = {};

  // extract vertex and boundary
  {
    vertex.push(selectedPixels[0]);
    let i = 1;
    while (i < selectedPixels.length) {
      let vertice = selectedPixels[i++];
      if (vertice.x === vertex[0].x && vertice.y === vertex[0].y) break;
      vertex.push(vertice);
    }
    let pt1 = selectedPixels[i++];
    let pt2 = selectedPixels[i++];
    Object.assign(boundary, {
      left: Math.min(pt1.x, pt2.x),
      bottom: Math.min(pt1.y, pt2.y),
      right: Math.max(pt1.x, pt2.x),
      top: Math.max(pt1.y, pt2.y)
    });
  }

  vertex = sutherland({ vertex, boundary, type: 'left' });
  vertex = sutherland({ vertex, boundary, type: 'top' });
  vertex = sutherland({ vertex, boundary, type: 'right' });
  vertex = sutherland({ vertex, boundary, type: 'bottom' });

  let outline = [];
  vertex.reduce((prev, current) => {
    outline = outline.concat(line({ selectedPixels: [prev, current] }).outline);
    return current;
  }, vertex[vertex.length - 1]);

  return { outline, fills: [] };
};
