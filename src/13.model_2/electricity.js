import { infoModelBuffers } from "../js/model";
export default class Electricity {
  constructor(curveInfo, options) {
    this.curveInfo = curveInfo;
    this.fun = null;
    this.id = Date.now() + "_" + Math.floor(Math.random() * 100000);
    this.options = {
      group: "",
      pointList: [],
      t: 1,
      tMax: 2,
      randomSeed: 1000 * Math.random(),
      flow: false,
      remove: false,
      expand: 150,
      n: 30,
    };
    Object.assign(this.options, options);
  }
  onUpdate(fun) {
    this.fun = fun;
  }
  update(delta) {
    this.fun && this.fun(this, delta);
  }
  getBufferData(gl) {
    const { expand, n } = this.options;
    const curveInfo = this.curveInfo(...this.options.pointList, n);
    const bufferData = infoModelBuffers(gl, curveInfo, expand);
    return { bufferData, length: curveInfo.length };
  }
  get group() {
    return this.options.group;
  }
  get remove() {
    return this.options.remove;
  }
  get tRate() {
    return this.options.t / this.options.tMax;
  }
  get randomSeed() {
    return this.options.randomSeed;
  }
  get expand() {
    return this.options.expand;
  }
  get flow() {
    return this.options.flow;
  }
  set remove(val) {
    this.options.remove = val;
  }
  get t() {
    return this.options.t;
  }
  set t(val) {
    this.options.t = val;
  }
}
