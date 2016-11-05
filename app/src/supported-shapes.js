import lineDDA from './algorithms/line/dda';
import lineMP from './algorithms/line/mp';
import lineBresenham from './algorithms/line/bresenham';
import circleMP from './algorithms/circle/mp';
import polygonScan from './algorithms/polygon/scan';
import cohen from './algorithms/cuts/cohen';
import sutherland from './algorithms/polygon/clip';
import rectangle from './algorithms/rectangle/rectangle';
import bezier from './algorithms/bezier/de';
import bernstein from './algorithms/bezier/bernstein';
import translation from './algorithms/transformation/translation';
import rotate from './algorithms/transformation/rotate';

export default [
  {
    name: '直线',
    algorithms: [
      { name: 'DDA', callback: lineDDA },
      { name: '中点法', callback: lineMP },
      { name: 'Bresenham', callback: lineBresenham }
    ],
    checkIfFinished(points) {
      return points.length === 2;
    }
  },
  {
    name: '矩形',
    algorithms: [
      { name: '矩形边框', callback: rectangle }
    ],
    checkIfFinished(points) {
      return points.length === 2;
    }
  },
  {
    name: '圆',
    algorithms: [
      { name: '中点法', callback: circleMP }
    ],
    checkIfFinished(points) {
      return points.length === 2;
    }
  },
  {
    name: '填充',
    algorithms: [
      { name: '多边形', callback: polygonScan }
    ],
    checkIfFinished(points) {
      const { length } = points;
      if (length < 4) return false;
      return points[length - 2].x === points[length - 1].x &&
        points[length - 2].y === points[length - 1].y;
    }
  },
  {
    name: '裁剪直线',
    algorithms: [
      { name: 'Cohen', callback: cohen }
    ],
    checkIfFinished(points) {
      return points.length === 4;
    }
  },
  {
    name: '裁剪多边形',
    algorithms: [
      { name: 'Sutherland', callback: sutherland }
    ],
    checkIfFinished(points) {
      const { length } = points;
      let start = points[0];
      let i = 1;
      for (; i < length; i++) {
        if (points[i].x === start.x && points[i].y === start.y) break;
      }
      return i + 2 === length - 1;
    }
  },
  {
    name: '曲线',
    algorithms: [
      { name: 'bezier', callback: bezier },
      { name: 'bernstein', callback: bernstein }
    ],
    checkIfFinished(points) {
      return points.length === 4;
    }
  },
  {
    name: '曲线平移',
    algorithms: [
      { name: 'translation', callback: translation }
    ],
    checkIfFinished(points) {
      return points.length === 6;
    }
  },
  {
    name: '曲线旋转',
    algorithms: [
      { name: 'rotate', callback: rotate }
    ],
    checkIfFinished(points) {
      return points.length === 7;
    }
  }
];
