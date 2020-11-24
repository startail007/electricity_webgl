import { Vector } from "./vector";
import { numberCrop, randomSeedList } from "./base.js";
class ElectricityData {
  constructor(segmentNum) {
    this.segmentNum = segmentNum;
    this.segmentAngle = this.createSegmentAngle(segmentNum);
    this.segmentPos = this.createSegmentPos(segmentNum + 1);
  }

  createSegmentAngle(n) {
    let data = new Array(n);
    for (let i = 0; i < n; i++) {
      data[i] = 0;
    }
    return data;
  }

  initSegmentAngle(swing, limit, randomSeedList) {
    let data = this.segmentAngle;
    let randomSeed = Math.floor(Math.random() * randomSeedList.length);
    let angle = 0;
    for (let i = 0, len = data.length; i < len; i++) {
      angle = angle * 0.2 + swing * randomSeedList[(i + randomSeed) % randomSeedList.length];
      data[i] = angle;
    }
    this.limitSegmentAngle(limit);
    this.balanceSegmentAngle();
    return this;
  }
  swingSegmentAngle(swing, limit, randomSeedList) {
    let data = this.segmentAngle;
    let randomSeed = Math.floor(Math.random() * randomSeedList.length);
    let a0;
    for (let i = data.length - 1; i >= 0; i--) {
      a0 =
        i - 1 >= 0
          ? data[i - 1]
          : swing * randomSeedList[(i + randomSeed - 1 + randomSeedList.length) % randomSeedList.length];
      data[i] = data[i] * 0.5 + a0 * 0.5 + swing * randomSeedList[(i + randomSeed) % randomSeedList.length];
    }
    this.limitSegmentAngle(limit);
    this.balanceSegmentAngle();
  }
  limitSegmentAngle(limit) {
    let data = this.segmentAngle;
    for (let i = 0, len = data.length; i < len; i++) {
      data[i] = numberCrop(data[i], -limit, limit);
    }
  }
  balanceSegmentAngle() {
    let data = this.segmentAngle;
    let sum = data.reduce((pv, cv) => pv + cv, 0);
    let n = data.length;
    let m = -sum / n;
    for (let i = 0; i < n; i++) {
      data[i] += m;
    }
  }

  createSegmentPos(n) {
    let data = new Array(n + 1);
    for (let i = 0; i <= n; i++) {
      data[i] = [0, 0];
    }
    return data;
  }

  initSegmentPos() {
    let data = this.segmentPos;
    for (let i = 0, len = data.length; i < len; i++) {
      data[i][0] = 0;
      data[i][1] = 0;
    }
    return this;
  }

  deformSegmentPos(angleList, m) {
    let data = this.segmentPos;
    if (m !== 0) {
      let n = angleList.length;
      let a0 = 0;
      let pp0 = [0, 0];
      let a1 = 0;
      let pp1 = [0, 0];
      let rate = 0;
      for (let i = 0; i <= n; i++) {
        rate = m * (1 - i / n);
        if (i > 0) {
          a0 += angleList[i - 1];
          pp0[0] += Math.cos(a0) - 1;
          pp0[1] += Math.sin(a0);
        }
        data[i][0] += pp0[0] * rate;
        data[i][1] += pp0[1] * rate;

        if (n + 1 - i < n) {
          a1 -= angleList[n + 1 - i];
          pp1[0] -= Math.cos(a1) - 1;
          pp1[1] -= Math.sin(a1);
        }
        data[n - i][0] += pp1[0] * rate;
        data[n - i][1] += pp1[1] * rate;
      }
    }
    return this;
  }
  waveSegmentPos(angleList, h) {
    let data = this.segmentPos;
    if (h !== 0) {
      let n = angleList.length;
      let y0 = 0;
      let y1 = 0;
      let rate = 0;
      for (let i = 0; i <= n; i++) {
        rate = i / n;
        rate = Math.sin(rate * Math.PI) * h * (1 - rate);
        if (i > 0) {
          y0 = y0 + Math.sin(angleList[i - 1] * 0.2) / Math.cos(angleList[i - 1]);
        }
        data[i][1] += y0 * rate;

        if (n + 1 - i < n) {
          y1 = y1 - Math.sin(angleList[n + 1 - i] * 0.2) / Math.cos(angleList[n + 1 - i]);
        }
        data[n - i][1] += y1 * rate;
      }
    }
    return this;
  }
  limitSegmentPos(limit) {
    let data = this.segmentPos;
    let n = data.length - 1;
    let max = -Infinity;
    let min = Infinity;
    for (let i = 0; i <= n; i++) {
      if (data[i][1] > max) {
        max = data[i][1];
      } else if (data[i][1] < min) {
        min = data[i][1];
      }
    }
    let h = max - min;
    if (h > limit) {
      for (let i = 0; i <= n; i++) {
        data[i][1] *= limit / h;
      }
    }
    return this;
  }
  setPosToLineData(data, p0, p1) {
    let posList = new Array(data.length);
    let angle = Math.atan2(p1[1] - p0[1], p1[0] - p0[0]);
    for (let i = 0, len = data.length; i < len; i++) {
      posList[i] = Vector.add(Vector.rotate(data[i], angle), Vector.mix(p0, p1, i / (len - 1)));
    }
    return posList;
  }
}
class Electricity extends ElectricityData {
  constructor(segment, angle_swing, angle_limit, data_deform, data_wave, data_limit) {
    super(segment);
    this.setSegmentAngleParameter(angle_swing, angle_limit);
    this.setSegmentPosParameter(data_deform, data_wave, data_limit);
    this.init();
  }

  setSegmentAngleParameter(angle_swing = 0.1, angle_limit = 0.3) {
    this.angle_swing = angle_swing;
    this.angle_limit = angle_limit;
  }
  setSegmentPosParameter(data_deform = 2, data_wave = 80, data_limit = 40) {
    this.data_deform = data_deform;
    this.data_wave = data_wave;
    this.data_limit = data_limit;
  }

  init() {
    this.initSegmentAngle(this.angle_swing, this.angle_limit, randomSeedList);
    this.initSegmentPos();
    this.segmentShow = this.segmentPos;
  }

  update() {
    this.swingSegmentAngle(this.angle_swing, this.angle_limit, randomSeedList);
    this.initSegmentPos();
    this.deformSegmentPos(this.segmentAngle, this.data_deform);
    this.waveSegmentPos(this.segmentAngle, this.data_wave);
    this.limitSegmentPos(this.data_limit);
  }

  flow(p0, p1) {
    this.segmentShow = this.setPosToLineData(this.segmentPos, p0, p1);
  }

  /*render(ctx, strokeStyle, lineWidth, glowStyle, glow) {
    setShadow(ctx, 0, 0, glow, glowStyle);
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    this.segmentShow.forEach(function (el, i) {
      if (i === 0) {
        ctx.moveTo(el[0], el[1]);
      } else {
        ctx.lineTo(el[0], el[1]);
      }
    });
    ctx.stroke();
    clearShadow(ctx);
  }*/

  toString() {}
}
export { Electricity };
