import { infoModelBuffers } from "../js/model";
import { lineInterpolation } from "../js/base";
import { VectorE } from "../js/vector";
export default class Electricity {
  constructor(gl, curveInfo, options = {}) {
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
      removeState: false,
      remove: false,
      expand: 150,
      n: 30,
      density: [0.2, 0.4],
      thickness: [5, 3],
      borderPower: [6, 4],
      sub: true,
      radius: [20, 20],
      power: 1,
    };
    Object.assign(this.options, options);
    this.gradientColorRateData = [
      [0, 1],
      [0.1, 1],
      [0.25, 0],
      [0.75, 0],
      [0.9, 1],
      [1, 1],
    ];
    this.thicknessScaleRateData = [
      [0, 2],
      [0.1, 0],
      [0.25, 0],
      [0.75, 0],
      [0.9, 0],
      [1, 2],
    ];
    // this.powerData = [
    //   [0, 0],
    //   [0.1, 0],
    //   [0.2, 1.5],
    //   [0.35, 4],
    //   [0.65, 3],
    //   [0.8, 1.5],
    //   [0.9, 0],
    //   [1, 0],
    // ];
    this.powerData = [
      [0, 0],
      [0.1, 0],
      [0.2, 0.75],
      [0.35, 2],
      [0.65, 1.5],
      [0.8, 0.75],
      [0.9, 0],
      [1, 0],
    ];
    this.flowRateData = [
      [0, 0],
      [0.1, 0],
      [0.3, 0.5],
      [0.7, 0.5],
      [0.9, 1],
      [1, 1],
    ];
  }
  onUpdate(fun) {
    this.fun = fun;
  }
  update(delta) {
    this.fun && this.fun(this, delta);

    if (this.options.flow) {
      if (this.options.removeState) {
        if (this.tRate < 1) {
          this.options.t += delta;
        } else {
          this.options.remove = true;
        }
      } else {
        if (this.tRate < 0.5) {
          this.options.t += delta;
        }
      }
    }
  }
  removeBefore(delta) {}
  getBufferData(gl) {
    const { expand, n } = this.options;
    const curveInfo = this.curveInfo(...this.options.pointList, n);
    const bufferData = infoModelBuffers(gl, curveInfo, expand);
    return { bufferData, length: curveInfo.length };
  }
  draw(gl, projectionMatrix, options) {
    const _options = {
      now: 0,
    };
    Object.assign(_options, options);
    const { textures, expand, randomSeed, thickness, borderPower, density, sub, radius, power } = this.options;
    const shaderProgram = this.options.shader;
    shaderProgram.use();
    const { bufferData, length } = this.getBufferData(gl);
    shaderProgram.attribSet({
      vertexPosition: bufferData.positionBufferData.buffer,
      textureCoord: bufferData.textureCoordinatesBufferData.buffer,
    });
    shaderProgram.elementSet(bufferData.indicesBufferData.buffer);
    //const len = Math.min(length, 40);
    const tRate = this.tRate;
    shaderProgram.uniformSet({
      projectionMatrix: projectionMatrix,
      wireframe: false,
      noiseSampler: textures.noise,
      gradientColorSampler: textures.gradientColor,
      thicknessScaleSampler: textures.thicknessScale,
      sub: sub,
      time: _options.now * 0.001 + randomSeed,
      expand: expand,
      density: density,
      fixed: [1, 1],
      //radius: [len, len * 0.8],
      radius: radius,
      thickness: thickness,
      borderPower: borderPower,
      length: length,
      power: 1,
      power: power * lineInterpolation(this.powerData, tRate),
      gradientColorRate: 0,
      gradientColorRate: lineInterpolation(this.gradientColorRateData, tRate),
      thicknessScaleRate: 0,
      thicknessScaleRate: lineInterpolation(this.thicknessScaleRateData, tRate),
      flow: this.options.flow,
      flowRate: lineInterpolation(this.flowRateData, tRate),
    });
    shaderProgram.draw(bufferData.indicesBufferData.length);
  }

  remove() {
    this.options.removeState = true;
  }
  get group() {
    return this.options.group;
  }
  get removeState() {
    return this.options.removeState;
  }
  get confirmRemove() {
    return this.options.remove;
  }
  get tRate() {
    return this.options.t / this.options.tMax;
  }
  set radius(val) {
    VectorE.set(this.options.radius, ...val);
  }
  set power(val) {
    this.options.power = val;
  }
}
