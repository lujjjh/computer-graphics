export default () => {
  let pixel = Object.create(null);
  pixel.selected = false;
  pixel.painted = false;
  pixel.brushColor = '#00c';
  return pixel;
};
