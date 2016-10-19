import dda from '../line/dda';

const L = 1;
const R = 2;
const B = 4;
const T = 8;
const LT = 9;
const RT = 10;
const LB = 5;
const RB = 6;

// dda({ })

function Encode(pt, left, right) {
  let ptx = 0; // ptx是返回的端点编码

  // ************** 给直线的端点编码 ***************
  if (pt.x < left.x) {
    ptx = ptx | L;
  } else if (pt.x > right.x) {
    ptx = ptx | R;
  }

  if (pt.y < right.y) {
    ptx = ptx | B;
  } else if (pt.y > left.y) {
    ptx = ptx | T;
  }
  return ptx;
}
  // ************** end of 给直线的端点编码 ***************

  // function wantpush(lineptx1, lineptx2) {
  //   for (var i = lineptx2; i >= lineptx1; i--) {
  //     let push1 = [];
  //     push1.push();
  //   }
  // }

export default ({ selectedPixels }) => {
  let [line1, line2, left, right] = selectedPixels;
  // line1是直线的第一个端点，line2是直线的第二个端点
  // left是矩形框的左上角端点，right是矩形框的右下角端点
  let outline = [];
  let fills = [];

  let lineptx1 = 0;
  let lineptx2 = 0;
  lineptx1 = Encode(line1, left, right);
  debugger;
  lineptx2 = Encode(line2, left, right);
  // lineptx1和2是直线两个端点的编码

  // ********用编码判断直线是否需要裁剪并进行绘制***********

  // ***计算直线与各边的交点***
  let rightside = { x: 0, y: 0 };
  let leftside = { x: 0, y: 0 };
  let topside = { x: 0, y: 0 };
  let bottomside = { x: 0, y: 0 };
  // rightside, leftside, topside, bottomside是直线与上下左右的交点（可能在延长线上）
  rightside.x = right.x;
  rightside.y = (line1.y - line2.y) / (line1.x - line2.x) * (right.x - line2.x) + line2.y;
  leftside.x = left.x;
  leftside.y = (line1.y - line2.y) / (line1.x - line2.x) * (left.x - line2.x) + line2.y;
  topside.y = left.y;
  topside.x = line2.x + ((line1.x - line2.x) / (line1.y - line2.y) * (left.y - line2.y));
  bottomside.y = right.y;
  bottomside.x = line2.x + ((line1.x - line2.x) / (line1.y - line2.y) * (right.y - line2.y));
  leftside = Math.round(leftside);
  rightside = Math.round(rightside);
  topside = Math.round(topside);
  bottomside = Math.round(bottomside);
  // ***计算直线与各边的交点***

// if(lineptx1 & lineptx2){ 不画 }

switch(lineptx1){
  case T:{
    line1.y = left.y;
    line1.x = topside.x;
    break;
  }
  case L:{
    line1.x = left.x;
    line1.y = leftside.y;
    break;
  }
  case B:{
    line1.y = right.y;
    line1.x = bottomside.x;
    break;
  }
  case R:{
    line1.x = right.x;
    line1.y = rightside.y;
    break;
  }
  case LT:{
    
  }
}

  if (lineptx1 | lineptx2 === 0) {
    return dda({ selectedPixels: [line1, line2] });
  } else if (lineptx1 & lineptx2 !== 0) {
    return { outline, fills };
  }

  // if (lineptx1 & lineptx2 != 0) {

  // }
  // return { outline,fills };
};
