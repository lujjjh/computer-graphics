export default class {
  constructor() {
    this.mapFunctions = [this.$identity];
  }

  $identity({ x, y }) {
    return { x, y };
  }

  map({ x, y }) {
    return this.mapFunctions.reduce(({ x, y }, fn) => fn({ x, y }), { x, y });
  }

  add(fn) {
    this.mapFunctions.push(fn);
  }
};
