import lineDDA from './algorithms/line/dda';
import lineMP from './algorithms/line/mp';
import lineBresenham from './algorithms/line/bresenham';
import circleMP from './algorithms/circle/mp';

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
  }
];
