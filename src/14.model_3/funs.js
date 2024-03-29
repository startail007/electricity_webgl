import { noise_value } from "../js/noise";
import { Float } from "../js/float";
import { Vector, VectorE } from "../js/vector";
CanvasRenderingContext2D.prototype.fillTextWithSpacing = function (text, x, y, spacing = 0) {
  let totalWidth = x;
  for (let i = 0; i < text.length; i++) {
    this.fillText(text[i], totalWidth, y);
    const temp = this.measureText(text[i]);
    totalWidth += temp.actualBoundingBoxRight + temp.actualBoundingBoxLeft + spacing;
  }
};
CanvasRenderingContext2D.prototype.strokeTextWithSpacing = function (text, x, y, spacing = 0) {
  let totalWidth = x;
  for (let i = 0; i < text.length; i++) {
    this.strokeText(text[i], totalWidth, y);
    const temp = this.measureText(text[i]);
    totalWidth += temp.actualBoundingBoxRight + temp.actualBoundingBoxLeft + spacing;
  }
};
export const getTextRect = (ctx, text, font, spacing = 0) => {
  ctx.textAlign = "start";
  ctx.textBaseline = "hanging";
  ctx.font = font;
  const info = { pos: [0, 0], size: [0, 0] };
  if (text.length === 0) return info;
  let totalWidth = 0;
  let temp = ctx.measureText(text[0]);
  info.pos[0] = temp.actualBoundingBoxLeft;
  info.pos[1] = temp.actualBoundingBoxAscent;
  info.size[1] = temp.actualBoundingBoxDescent + temp.actualBoundingBoxAscent;
  totalWidth += temp.actualBoundingBoxRight + temp.actualBoundingBoxLeft;
  for (let i = 1; i < text.length; i++) {
    temp = ctx.measureText(text[i]);
    totalWidth += temp.actualBoundingBoxRight + temp.actualBoundingBoxLeft + spacing;
  }
  info.size[0] = totalWidth;
  return info;
};
export const getTextTexture = (s, font, border = 5, spacing = 5) => {
  if (s.length <= 0) return;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const { pos, size } = getTextRect(ctx, s, font, spacing);
  canvas.width = size[0] + border * 2;
  canvas.height = size[1] + border * 2;
  ctx.textAlign = "start";
  ctx.textBaseline = "hanging";
  ctx.font = font;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.rect(0, 0, canvas.width, canvas.height);
  // ctx.fillStyle = "#ff0000";
  // ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#3f7fff";
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.75;
  ctx.fillTextWithSpacing(s, pos[0] + border, pos[1] + border, spacing);
  ctx.globalAlpha = 0.5;
  ctx.strokeTextWithSpacing(s, pos[0] + border, pos[1] + border, spacing);
  const textureData = canvas.toDataURL();
  return { width: canvas.width, height: canvas.height, textureData };
};
export const getTextData = (s, font, border = 5, spacing = 5) => {
  if (s.length <= 0) return;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const { pos, size } = getTextRect(ctx, s, font, spacing);
  canvas.width = size[0] + border * 2;
  canvas.height = size[1] + border * 2;
  ctx.textAlign = "start";
  ctx.textBaseline = "hanging";
  ctx.font = font;
  ctx.fillStyle = "#ffffff";
  ctx.fillTextWithSpacing(s, pos[0] + border, pos[1] + border, spacing);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const getIndex = (imageData, x, y) => {
    return (x + y * imageData.width) * 4;
  };
  const dir = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ];
  const posList = [];
  const normalList = [];
  const temp = ctx.createImageData(imageData.width, imageData.height);
  for (let j = 0; j < imageData.height; j++) {
    for (let i = 0; i < imageData.width; i++) {
      const index = getIndex(imageData, i, j);
      if (data[index + 3] > 127) {
        const bool = dir.some((el) => {
          if (i + el[0] < 0 || i + el[0] >= imageData.width || j + el[1] < 0 || j + el[1] >= imageData.height) {
            return true;
          }
          return data[getIndex(imageData, i + el[0], j + el[1]) + 3] <= 127;
        });
        if (bool) {
          temp.data[index + 0] = 255;
          temp.data[index + 1] = 255;
          temp.data[index + 2] = 255;
          temp.data[index + 3] = 255;
          posList.push([i, j]);

          const normalVector = dir.map((el) =>
            Vector.scale(el, data[index + 3] - data[getIndex(imageData, i + el[0], j + el[1]) + 3])
          );
          const v = [0, 0];
          normalVector.forEach((el) => {
            VectorE.add(v, el);
          });
          VectorE.normalize(v);
          normalList.push(v);
        }
      }
    }
  }
  const spliceList = [];
  for (let i = 0; i < posList.length - 1; i++) {
    let index = -1;
    for (let j = i + 1; j < posList.length; j++) {
      const p = Vector.abs(Vector.sub(posList[i], posList[j]));
      if (p[0] <= 1 && p[1] <= 1) {
        index = j;
        if (p[0] * p[1] === 0) {
          break;
        }
      }
    }
    if (index >= 0) {
      [posList[index], posList[i + 1]] = [posList[i + 1], posList[index]];
      [normalList[index], normalList[i + 1]] = [normalList[i + 1], normalList[index]];
    } else {
      spliceList.push(i + 1);
    }
  }
  spliceList.push(posList.length);

  const posListG = [];
  const normalListG = [];
  let index = 0;
  for (let i = 0; i < spliceList.length; i++) {
    posListG.push(posList.slice(index, spliceList[i]));
    normalListG.push(normalList.slice(index, spliceList[i]));
    index = spliceList[i];
  }
  return { posListG, normalListG };
};
export const getNearestDistance = (pos, posListG) => {
  const data = { i: -1, j: -1, r: Infinity };
  for (let i = 0; i < posListG.length; i++) {
    const posList = posListG[i];
    for (let j = 0; j < posList.length; j++) {
      const r = Vector.distance(posList[j], pos);
      if (r < data.r) {
        data.i = i;
        data.j = j;
        data.r = r;
      }
    }
  }
  return data;
};
export const getDirNearestDistance = (pos, posListG, dir) => {
  const dir0 = Vector.rotate(dir, -0.1);
  const dir1 = Vector.rotate(dir, 0.1);
  const data = { i: -1, j: -1, r: Infinity };
  for (let i = 0; i < posListG.length; i++) {
    const posList = posListG[i];
    for (let j = 0; j < posList.length; j++) {
      if (Vector.cross(Vector.sub(pos, posList[j]), dir0) > 0 && Vector.cross(Vector.sub(pos, posList[j]), dir1) < 0) {
        const r = Vector.distance(posList[j], pos);
        if (r < data.r) {
          data.i = i;
          data.j = j;
          data.r = r;
        }
      }
    }
  }
  return data;
};
export const getRangeNumber = (val) => {
  if (typeof val == "number") {
    return val;
  } else if (typeof val == "string") {
    if (/\~/g.test(val)) {
      return parseFloat(
        val.replace(/(.+)\~(.+)/g, (val, a, b) => {
          return Float.mix(parseFloat(a), parseFloat(b), Math.random());
        })
      );
    }
  }
};
export const createElectricityData = (el, index, array) => {
  const obj = {};
  obj.type = el.start.type + "-" + el.end.type;
  obj.active = el.active;
  obj.start = { type: el.start.type };
  if (el.start.type == "text") {
    obj.start.index = [0, 0];
    obj.start.range = 0;
    obj.start.seed = 0;
  } else if (el.start.type == "pos") {
    obj.start.pos = [0, 0];
  } else if (el.start.type == "sub") {
    obj.start.src = 0;
    obj.start.rate = 0;
  }

  obj.end = { type: el.start.type };
  if (el.end.type == "text") {
    obj.end.index = [0, 0];
    obj.end.range = 0;
    obj.end.seed = 0;
  } else if (el.end.type == "pos") {
    obj.end.pos = [0, 0];
  } else if (el.end.type == "sub") {
    obj.end.src = 0;
    obj.end.rate = 0;
  }
  obj.lineWidth = 0;
  obj.lifeTime = 0;
  obj.lifeTimeMax = 0;
  obj.offset = 0;
  return obj;
};
export const resetElectricityData = (el, index, array, electricitySetData) => {
  if (electricitySetData.start.type == "text") {
    if (electricitySetData.start.index) {
      const array = electricitySetData.start.index.array;
      let i = electricitySetData.start.index.i;
      let j = electricitySetData.start.index.j;
      i = i != undefined ? i : Math.floor(array.length * Math.random());
      j = j != undefined ? j : Math.floor(array[i].length * Math.random());
      VectorE.set(el.start.index, i, j);
    }
    el.start.range = getRangeNumber(electricitySetData.start.range);
    el.start.seed = getRangeNumber(electricitySetData.start.seed);
  } else if (electricitySetData.start.type == "pos") {
    if (electricitySetData.start.pos) {
      VectorE.set(el.start.pos, ...electricitySetData.start.pos);
    }
  } else if (electricitySetData.start.type == "sub") {
    el.start.src = getRangeNumber(electricitySetData.start.src);
    el.start.rate = getRangeNumber(electricitySetData.start.rate);
    el.start.range = getRangeNumber(electricitySetData.start.range);
    el.start.seed = getRangeNumber(electricitySetData.start.seed);
  }
  if (electricitySetData.end.type == "text") {
    if (electricitySetData.end.index) {
      VectorE.set(el.end.index, electricitySetData.end.i, electricitySetData.end.j);

      const array = electricitySetData.end.index.array;
      let i = electricitySetData.end.index.i;
      let j = electricitySetData.end.index.j;
      const uniteRange = electricitySetData.end.index.uniteRange;
      if (electricitySetData.end.index.unite && electricitySetData.start.type == "text") {
        i = i != undefined ? i : el.start.index[0];
        j = j != undefined ? j : Math.floor((el.start.index[1] + getRangeNumber(uniteRange)) % array[i].length);
      } else {
        i = i != undefined ? i : Math.floor(array.length * Math.random());
        j = j != undefined ? j : Math.floor(array[i].length * Math.random());
      }
      VectorE.set(el.end.index, i, j);
    }
    el.end.range = getRangeNumber(electricitySetData.end.range);
    el.end.seed = getRangeNumber(electricitySetData.end.seed);
  } else if (electricitySetData.end.type == "pos") {
    if (electricitySetData.end.pos) {
      VectorE.set(el.end.pos, ...electricitySetData.end.pos);
    }
  } else if (electricitySetData.end.type == "sub") {
    el.end.src = getRangeNumber(electricitySetData.end.src);
    el.end.rate = getRangeNumber(electricitySetData.end.rate);
    el.end.range = getRangeNumber(electricitySetData.end.range);
    el.end.seed = getRangeNumber(electricitySetData.end.seed);
  }
  el.lineWidth = getRangeNumber(electricitySetData.lineWidth);
  el.lifeTimeMax = el.lifeTime = getRangeNumber(electricitySetData.lifeTime);
  el.offset = getRangeNumber(electricitySetData.offset);
  return el;
};
export const getListGIndex = (posListG, index, offset = 0) => {
  const posList = posListG[index[0]];
  let i = index[1];
  if (offset != 0) {
    i = (i + offset) % posList.length;
    if (i < 0) {
      i += posList.length;
    }
  }
  return [index[0], i];
};
export const getListGPos = (posListG, index, offset, pos) => {
  const data = getListGIndex(posListG, index, offset);
  return Vector.add(posListG[data[0]][data[1]], pos);
};
export const getLineSlide = (el, startPos, endPos, rate, time) => {
  if (el.src != undefined && el.range) {
    const f = el.range * noise_value([time, el.seed], [100, 100]);
    rate = Math.min(Math.max(rate + f, 0), 1);
  }
  return Vector.mix(startPos, endPos, rate);
};
export const getListGPosSlide = (posListG, el, textPos, time) => {
  let indexOffset = 0;
  if (el.src == undefined && el.range) {
    const f = el.range * noise_value([time, el.seed], [100, 100]);
    indexOffset = Math.floor(f);
  }
  return getListGPos(posListG, el.index, indexOffset, textPos);
};
export const getOffset = (el, normalListG, vector) => {
  let offset = 0;
  if (el.start.index || el.end.index) {
    let normal = [0, 0];
    if (el.start.index) {
      normal = getListGPos(normalListG, el.start.index, 0, normal);
    }
    if (el.end.index) {
      normal = getListGPos(normalListG, el.end.index, 0, normal);
    }
    offset = Vector.cross(vector, normal) > 0 ? 1 : -1;
  }
  return offset;
};
