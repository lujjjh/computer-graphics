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

// ************** 给直线的端点编码 ***************
function Encode(pt, left, right) {
  let ptx = 0; // ptx是返回的端点编码

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

  // function wantpush(code1, code2) {
  //   for (var i = code2; i >= code1; i--) {
  //     let push1 = [];
  //     push1.push();
  //   }
  // }

export default ({ selectedPixels }) => {
  let [line1, line2, left, right] = selectedPixels;
  // line1是直线的第一个端点，line2是直线的第二个端点
  // left是矩形框的左上角端点，right是矩形框的右下角端点

  line1 = { ...line1 };
  line2 = { ...line2 };
  left = { ...left };
  right = { ...right };
  [left.x, left.y, right.x, right.y] = [
    Math.min(left.x, right.x),
    Math.max(left.y, right.y),
    Math.max(left.x, right.x),
    Math.min(left.y, right.y)
  ];

  let code1 = 0;
  let code2 = 0;
  code1 = Encode(line1, left, right);
  code2 = Encode(line2, left, right);
  // code1和2是直线两个端点的编码

  // ********用编码判断直线是否需要裁剪并进行绘制***********

  // ************* 计算直线与各边的交点 *************
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
  leftside.x = Math.round(leftside.x);
  leftside.y = Math.round(leftside.y);
  rightside.x = Math.round(rightside.x);
  rightside.y = Math.round(rightside.y);
  topside.x = Math.round(topside.x);
  topside.y = Math.round(topside.y);
  bottomside.x = Math.round(bottomside.x);
  bottomside.y = Math.round(bottomside.y);
  // ************* end of 计算直线与各边的交点 *************

  if (code1 & code2) {
    return { outline: [], fills: [] };
  }
  if (code1 === 0 && code2 === 0) {
    return dda({ selectedPixels: [line1, line2] });
  }

// *********** 判断起点的选择 ***********
  switch (code1) {
    case T: {
      line1.y = left.y;
      line1.x = topside.x;
      break;
    }
    case L: {
      line1.x = left.x;
      line1.y = leftside.y;
      break;
    }
    case B: {
      line1.y = right.y;
      line1.x = bottomside.x;
      break;
    }
    case R: {
      line1.x = right.x;
      line1.y = rightside.y;
      break;
    }
    case LT: {
      if (topside.x >= left.x && topside.x <= right.x) {
        line1.x = topside.x;
        line1.y = left.y;
        break;
      } else if (leftside.y <= left.y && leftside.y >= right.y) {
        line1.y = leftside.y;
        line1.x = left.x;
        break;
      } else {
        return { outline: [], fills: [] };
      }
    }
    case RT: {
      if (topside.x >= left.x && topside.x <= right.x) {
        line1.x = topside.x;
        line1.y = left.y;
        break;
      } else if (leftside.y <= left.y && leftside.y >= right.y) {
        line1.y = leftside.y;
        line1.x = right.x;
        break;
      } else {
        return { outline: [], fills: [] };
      }
    }
    case RB: {
      if (leftside.y <= left.y && leftside.y >= right.y) {
        line1.y = leftside.y;
        line1.x = right.x;
        break;
      } else if (bottomside.x >= left.x && bottomside.x <= right.x) {
        line1.x = bottomside.x;
        line1.y = right.y;
        break;
      } else {
        return { outline: [], fills: [] };
      }
    }
    case LB: {
      if (bottomside.x >= left.x && bottomside.x <= right.x) {
        line1.x = bottomside.x;
        line1.y = right.y;
        break;
      } else if (leftside.y <= left.y && leftside.y >= right.y) {
        line1.y = leftside.y;
        line1.x = left.x;
        break;
      } else {
        return { outline: [], fills: [] };
      }
    }
  }
// ************ end of 判断起点的选择 ***********

// *********** 判断终点的选择 ***********
  switch (code2) {
    case T: {
      line2.y = left.y;
      line2.x = topside.x;
      break;
    }
    case L: {
      line2.x = left.x;
      line2.y = leftside.y;
      break;
    }
    case B: {
      line2.y = right.y;
      line2.x = bottomside.x;
      break;
    }
    case R: {
      line2.x = right.x;
      line2.y = rightside.y;
      break;
    }
    case LT: {
      if (topside.x >= left.x && topside.x <= right.x) {
        line2.x = topside.x;
        line2.y = left.y;
        break;
      } else if (leftside.y <= left.y && leftside.y >= right.y) {
        line2.y = leftside.y;
        line2.x = left.x;
        break;
      } else {
        return { outline: [], fills: [] };
      }
    }
    case RT: {
      if (topside.x >= left.x && topside.x <= right.x) {
        line2.x = topside.x;
        line2.y = left.y;
        break;
      } else if (leftside.y <= left.y && leftside.y >= right.y) {
        line2.y = leftside.y;
        line2.x = right.x;
        break;
      } else {
        return { outline: [], fills: [] };
      }
    }
    case RB: {
      if (leftside.y <= left.y && leftside.y >= right.y) {
        line2.y = leftside.y;
        line2.x = right.x;
        break;
      } else if (bottomside.x >= left.x && bottomside.x <= right.x) {
        line2.x = bottomside.x;
        line2.y = right.y;
        break;
      } else {
        return { outline: [], fills: [] };
      }
    }
    case LB: {
      if (bottomside.x >= left.x && bottomside.x <= right.x) {
        line2.x = bottomside.x;
        line2.y = right.y;
        break;
      } else if (leftside.y <= left.y && leftside.y >= right.y) {
        line2.y = leftside.y;
        line2.x = left.x;
        break;
      } else {
        return { outline: [], fills: [] };
      }
    }
  }
// *********** end of 判断终点的选择 ***********

  if (line1.x > right.x || line1.x < left.x || line1.y > left.y || line1.y < right.y || line2.x > right.x || line2.x < left.x || line2.y > left.y || line2.y < right.y) {
    return { outline: [], fills: [] };
  }

  return dda({ selectedPixels: [line1, line2] });

};
