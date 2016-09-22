import lineDDA from './algorithms/line/dda';
import lineMP from './algorithms/line/mp';

export default [
  {
    name: '直线',
    algorithms: [
      { name: 'DDA', callback: lineDDA },
      { name: '中点法', callback: lineMP }
    ],
    checkIfFinished(points) {
      return points.length === 2;
    }
  },
  {
    name: '圆',
    algorithms: [
      { name: '中点法' }
    ],
    checkIfFinished(points) {
      return points.length === 2;
    }
  }
];
