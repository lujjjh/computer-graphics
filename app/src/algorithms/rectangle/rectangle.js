import dda from '../line/dda';

export default ({ selectedPixels }) => {
  let [point1, point3] = selectedPixels;
  let point2 = { x: 0, y: 0 };
  let point4 = { x: 0, y: 0 };
  point2.x = point3.x;
  point2.y = point1.y;
  point4.y = point3.y;
  point4.x = point1.x;
  let outline = [];
  outline.push.apply(outline, dda({ selectedPixels: [point1, point2] }).outline);
  outline.push.apply(outline, dda({ selectedPixels: [point2, point3] }).outline);
  outline.push.apply(outline, dda({ selectedPixels: [point3, point4] }).outline);
  outline.push.apply(outline, dda({ selectedPixels: [point4, point1] }).outline);
  return { outline, fills: [] };
  // dda({ selectedPixels: [point2, point3] });
  // dda({ selectedPixels: [point3, point4] });
  // dda({ selectedPixels: [point4, point1] });
  // return { outline: [], fills: [] };
  // return dda({ selectedPixels: [point1, point3] });
};
