import de from '../bezier/de';

export default ({ selectedPixels }) => {
  let remeberControlPts = [];
  let [pt0_0, pt0_1, pt0_2, pt0_3, translation1, translation2] = selectedPixels;
  remeberControlPts.push({ x: pt0_0.x, y: pt0_0.y }, { x: pt0_1.x, y: pt0_1.y }, {x: pt0_2.x, y: pt0_2.y }, { x: pt0_3.x, y: pt0_3.y });
  let Tx, Ty;
  Tx = translation1.x - translation2.x;
  Ty = translation1.y - translation2.y;
  for (let i = 0; i < 4; i++) {
    remeberControlPts[i].x -= Tx;
    remeberControlPts[i].y -= Ty;
  }
  return de({ selectedPixels: [remeberControlPts[0], remeberControlPts[1], remeberControlPts[2], remeberControlPts[3]] });
};
