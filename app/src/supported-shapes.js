import lineDDA from './algorithms/line/dda';
import lineMP from './algorithms/line/mp';
import lineBresenham from './algorithms/line/bresenham';
import circleMP from './algorithms/circle/mp';
import polygonScan from './algorithms/polygon/scan';
import cohen from './algorithms/cuts/cohen';

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
    name: '圆',
    algorithms: [
      { name: '中点法', callback: circleMP }
    ],
    checkIfFinished(points) {
      return points.length === 2;
    }
  },
  {
    name: '多边形',
    algorithms: [
      { name: '扫描线', callback: polygonScan }
    ],
    checkIfFinished(points) {
      const { length } = points;
      if (length < 4) return false;
      return points[length - 2].x === points[length - 1].x &&
        points[length - 2].y === points[length - 1].y;
    }
  },
  {
    name: '裁剪',
    algorithms: [
      { name: 'Cohen', callback: cohen }
    ],
    checkIfFinished(points) {
      return points.length === 4;
    }
  }
];
