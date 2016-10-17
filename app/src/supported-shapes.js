import lineDDA from './algorithms/line/dda';
import lineMP from './algorithms/line/mp';
import lineBresenham from './algorithms/line/bresenham';
import circleMP from './algorithms/circle/mp';
import polygonScan from './algorithms/polygon/scan';

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
      if (points.length < 3) return false;
      let first = points[0];
      let last = points[points.length - 1];
      return first.x === last.x && first.y === last.y;
    }
  }
];
