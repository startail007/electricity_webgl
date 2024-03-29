import { arrayBufferData, elementArrayBufferData } from "./glSupply";
import { Vector, Line } from "./vector";
export const modelBuffers = (gl) => {
  const positions = [
    [-1.0, -1.0],
    [-1.0, 1.0],
    [1.0, -1.0],
    [1.0, 1.0],
  ].flat();
  const positionBufferData = arrayBufferData(gl, positions, 2);
  const textureCoordinates = [
    [0.0, 0.0],
    [0.0, 1.0],
    [1.0, 0.0],
    [1.0, 1.0],
  ].flat();
  const textureCoordinatesBufferData = arrayBufferData(gl, textureCoordinates, 2);
  const indices = [
    [1, 2, 0],
    [1, 3, 2],
  ].flat();
  //const indicesBufferData = elementArrayBufferData(gl, indices, Uint32Array);
  //const indicesBufferData = elementArrayBufferData(gl, indices, Uint16Array);
  const indicesBufferData = elementArrayBufferData(gl, indices, Uint8Array);

  return {
    positionBufferData: positionBufferData,
    textureCoordinatesBufferData: textureCoordinatesBufferData,
    indicesBufferData: indicesBufferData,
  };
};

export const infoModelBuffers = (gl, info, expand) => {
  const { points, section, length } = info;
  const positions = [];
  const textureCoordinates = [];
  const indices = [];
  const halfExpand = expand * 0.5;
  const addP = (p, n, expand) => {
    const p0 = Vector.add(p, Vector.scale(n, -expand));
    const p1 = Vector.add(p, Vector.scale(n, expand));
    return [p0, p1];
  };
  //const lines = [];

  let point, p;
  point = points[0];
  p = Vector.add(point.p, Vector.scale(point.t, -halfExpand));
  positions.push(...addP(p, point.n, halfExpand));

  points.forEach((point) => {
    const addPoints = addP(point.p, point.n, halfExpand);
    positions.push(...addPoints);
  });

  point = points[points.length - 1];
  p = Vector.add(point.p, Vector.scale(point.t, halfExpand));
  positions.push(...addP(p, point.n, halfExpand));

  const _section = [halfExpand, ...section, halfExpand];
  const _length = expand + length;
  const _section_rate = _section.map((el) => el / _length);
  textureCoordinates.push([0.0, 0.0], [0.0, 1.0]);
  let rate = 0;
  _section_rate.forEach((el) => {
    rate += el;
    textureCoordinates.push([rate, 0.0], [rate, 1.0]);
  });

  for (let j = 0; j < points.length + 2 - 1; j++) {
    indices.push([1 + j * 2, 2 + j * 2, 0 + j * 2], [1 + j * 2, 3 + j * 2, 2 + j * 2]);
  }

  const positionBufferData = arrayBufferData(gl, positions.flat(), 2);
  const textureCoordinatesBufferData = arrayBufferData(gl, textureCoordinates.flat(), 2);
  const indicesBufferData = elementArrayBufferData(gl, indices.flat(), Uint8Array);

  return {
    positionBufferData: positionBufferData,
    textureCoordinatesBufferData: textureCoordinatesBufferData,
    indicesBufferData: indicesBufferData,
  };
};

export const faceBuffers = (gl) => {
  const positions = [
    [0.0, 0.0],
    [0.0, 1.0],
    [1.0, 0.0],
    [1.0, 1.0],
  ].flat();
  const positionBufferData = arrayBufferData(gl, positions, 2);

  const textureCoordinates = [
    [0.0, 0.0],
    [0.0, 1.0],
    [1.0, 0.0],
    [1.0, 1.0],
  ].flat();
  const textureCoordinatesBufferData = arrayBufferData(gl, textureCoordinates, 2);

  //ELEMENT_ARRAY_BUFFER
  const indices = [
    [1, 2, 0],
    [1, 3, 2],
  ].flat();
  const indicesBufferData = elementArrayBufferData(gl, indices);

  return {
    positionBufferData: positionBufferData,
    textureCoordinatesBufferData: textureCoordinatesBufferData,
    indicesBufferData: indicesBufferData,
  };
};
