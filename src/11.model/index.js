import { mat4 } from "gl-matrix";
import noise from "./noise.jpg";
import gradientColor from "./gradientColor.jpg";
import thicknessScale from "./thicknessScale.jpg";

import * as dat from "dat.gui";

import {
  arrayBufferData,
  elementArrayBufferData,
  createFramebufferTexture,
  useTexture,
  loadTexture,
} from "../js/glSupply";
import { Vector, VectorE, getQuadraticCurveTo, getQuadraticCurveToTangent } from "../js/vector";
import EasingFunctions from "../js/ease";
import modelShader from "../js/shader/modelShader";
import electricityModelShader from "../js/shader/electricityModelShader";
import electricityBranchModelShader from "../js/shader/electricityBranchModelShader";
import { Spark } from "../js/spark";
import { Float } from "../js/float";
import { lagrangeInterpolation, lineInterpolation } from "../js/base";

const modelBuffers = (gl) => {
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
const curveModelBuffers = (gl) => {
  const getArrayMix = (N, fun) => {
    return new Array(N).fill(undefined).flatMap((el, index, array) => {
      const rate = index / (array.length - 1);
      return fun(rate, el, index, array);
    });
  };
  const N = 30;

  const positions = getArrayMix(N, (rate) => {
    const f = Float.mix(-1, 1, rate);
    return [
      [f, -1.0],
      [f, 1.0],
    ];
  }).flat();
  const positionBufferData = arrayBufferData(gl, positions, 2);

  const textureCoordinates = getArrayMix(N, (rate) => {
    const f = Float.mix(0, 1, rate);
    return [
      [f, 0.0],
      [f, 1.0],
    ];
  }).flat();
  const textureCoordinatesBufferData = arrayBufferData(gl, textureCoordinates, 2);

  const indices = getArrayMix(N - 1, (rate, el, index) => {
    const i = index * 2;
    return [
      [i + 1, i + 2, i + 0],
      [i + 1, i + 3, i + 2],
    ];
  }).flat();
  //const indicesBufferData = elementArrayBufferData(gl, indices, Uint32Array);
  //const indicesBufferData = elementArrayBufferData(gl, indices, Uint16Array);
  const indicesBufferData = elementArrayBufferData(gl, indices, Uint8Array);

  return {
    positionBufferData: positionBufferData,
    textureCoordinatesBufferData: textureCoordinatesBufferData,
    indicesBufferData: indicesBufferData,
  };
};

const main = () => {
  const canvas = document.querySelector("#glcanvas");
  const options = {
    //premultipliedAlpha: false,
    alpha: false,
    //antialias: true,
  };
  //const gl = canvas.getContext("webgl", options);
  let gl = canvas.getContext("webgl2", options);
  let isWebGL2 = true;
  if (!gl) {
    gl = canvas.getContext("webgl", options) || canvas.getContext("experimental-webgl", options);
    isWebGL2 = false;
  }
  if (!gl) {
    alert("無法初始化WebGL。您的瀏覽器或機器可能不支持它。");
    return;
  }
  //著色器資料
  const programInfos = {
    modelShader: modelShader(gl),
    electricityModelShader: electricityModelShader(gl),
    electricityBranchModelShader: electricityBranchModelShader(gl),
  };
  //緩衝資料
  const buffers = { model: modelBuffers(gl), curveModel: curveModelBuffers(gl) };
  //貼圖
  const textures = {
    noise: loadTexture(gl, noise),
    gradientColor: loadTexture(gl, gradientColor),
    thicknessScale: loadTexture(gl, thicknessScale),
  };
  //滑鼠位置
  const mPos = [gl.canvas.width * 0.5, gl.canvas.height * 0.5];

  const size = [gl.canvas.clientWidth, gl.canvas.clientHeight];
  const framebufferTextures = {};
  const particles = [];

  canvas.addEventListener("mousemove", (ev) => {
    VectorE.set(mPos, ev.pageX, ev.pageY);
    for (let i = 0; i < 3; i++) {
      particles.push(
        new Spark(
          mPos,
          2 + Math.random() * 14,
          Math.random() * 2 * Math.PI,
          0.25 + Math.random() * 0.25,
          2 + 3 * Math.random()
        )
      );
    }
  });
  canvas.addEventListener("mousedown", (ev) => {
    VectorE.set(mPos, ev.pageX, ev.pageY);
    for (let i = 0; i < 100; i++) {
      particles.push(
        new Spark(
          mPos,
          2 + Math.random() * 14,
          Math.random() * 2 * Math.PI,
          0.5 + Math.random() * 0.5,
          2 + 3 * Math.random()
        )
      );
    }
  });

  const gui = new dat.GUI();

  const guiData = {
    wireframe: true,
  };

  const controller_wireframe = gui.add(guiData, "wireframe").name("顯示外框");
  /*controller_wireframe.onFinishChange((value) => {
    console.log(guiData);
  });*/

  init(gl, programInfos, buffers, textures, { framebufferTextures, size, guiData });
  let time = 0;
  function render(now) {
    const delta = (now - time) * 0.001;
    time = now;
    //console.log(1 / delta);
    requestAnimationFrame(render);
    //console.log(mPos);
    drawScene(gl, programInfos, buffers, textures, { now, delta, mPos, framebufferTextures, size, particles, guiData });
  }
  requestAnimationFrame(render);
};

const init = (gl, programInfos, buffers, textures, datas) => {
  const { framebufferTextures, size } = datas;
};

const drawScene = (gl, programInfos, buffers, textures, datas) => {
  const { now, delta, framebufferTextures, mPos, size, particles, guiData } = datas;

  const projectionMatrix = mat4.create();
  mat4.ortho(projectionMatrix, 0, gl.canvas.clientWidth, gl.canvas.clientHeight, 0, 0.1, 100);
  mat4.translate(projectionMatrix, projectionMatrix, [0.0, 0.0, -1.0]);

  gl.enable(gl.CULL_FACE);
  gl.enable(gl.BLEND);
  //gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.blendFunc(gl.ONE, gl.ONE);

  const modelViewMatrix = mat4.create();
  {
    const bufferData = buffers.model;
    const shaderProgram = programInfos.electricityModelShader;
    shaderProgram.use();
    shaderProgram.attribSet({
      vertexPosition: bufferData.positionBufferData.buffer,
      textureCoord: bufferData.textureCoordinatesBufferData.buffer,
    });
    shaderProgram.elementSet(bufferData.indicesBufferData.buffer);

    shaderProgram.uniformSet({
      projectionMatrix: projectionMatrix,
      mouse: Vector.add(Vector.mul(mPos, [1, -1]), [0, size[1]]),
      time: now * 0.001,
      wireframe: guiData.wireframe,
      noiseSampler: textures.noise,
      gradientColorSampler: textures.gradientColor,
      thicknessScaleSampler: textures.thicknessScale,
      sub: true,
    });
    useTexture(gl, null, false);
    /*gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);*/
    {
      const startPos = [100, 100];
      const endPos = [400, 100];
      const v = Vector.sub(endPos, startPos);
      const a = Vector.getAngle(v);
      mat4.identity(modelViewMatrix);
      mat4.translate(modelViewMatrix, modelViewMatrix, [...Vector.mix(startPos, endPos, 0.5), 0.0]);
      /*const s = Vector.length(v);
      mat4.scale(modelViewMatrix, modelViewMatrix, [s, 1, 1]);*/
      mat4.rotateZ(modelViewMatrix, modelViewMatrix, a);

      const flowRateData = [
        [0, 0],
        [0.5, 0.5],
        [1.5, 0.5],
        [2, 1],
      ];
      const gradientColorRateData = [
        [0, 1],
        [0.8, 0],
        [1.2, 0],
        [2, 1],
      ];
      const thicknessScaleRateData = [
        [0, 1],
        [0.8, 0],
        [1.2, 0],
        [2, 1],
      ];
      shaderProgram.uniformSet({
        modelViewMatrix: modelViewMatrix,
        density: [0.6, 0.6],
        fixed: [1, 1],
        radius: [40, 40],
        thickness: [10, 10],
        borderPower: [1, 1],
        length: Vector.length(v),
        offset: 0,
        power: 1,
        gradientColorRate: lineInterpolation(
          gradientColorRateData,
          (now * 0.001) % gradientColorRateData[gradientColorRateData.length - 1][0]
        ),
        thicknessScaleRate: lineInterpolation(
          thicknessScaleRateData,
          (now * 0.001) % thicknessScaleRateData[thicknessScaleRateData.length - 1][0]
        ),
        flow: true,
        flowSegment: 2,
        flowRate: lineInterpolation(flowRateData, (now * 0.001) % flowRateData[flowRateData.length - 1][0]),
      });
      shaderProgram.draw(bufferData.indicesBufferData.length);
    }
    {
      const startPos = [100, 200];
      const endPos = [400, 200];
      const v = Vector.sub(endPos, startPos);
      const a = Vector.getAngle(v);
      mat4.identity(modelViewMatrix);
      mat4.translate(modelViewMatrix, modelViewMatrix, [...Vector.mix(startPos, endPos, 0.5), 0.0]);
      mat4.rotateZ(modelViewMatrix, modelViewMatrix, a);
      shaderProgram.uniformSet({
        modelViewMatrix: modelViewMatrix,
        density: [0.6, 0.6],
        fixed: [1, 1],
        radius: [20, 20],
        thickness: [20, 20],
        borderPower: [1, 1],
        length: Vector.length(v),
        offset: 60,
        power: 1,
        gradientColorRate: 0,
        thicknessScaleRate: 0,
        flow: false,
      });
      shaderProgram.draw(bufferData.indicesBufferData.length);
    }
    {
      const startPos = [250, 200 + 60];
      const endPos = [380, 400];
      const v = Vector.sub(endPos, startPos);
      const a = Vector.getAngle(v);
      mat4.identity(modelViewMatrix);
      mat4.translate(modelViewMatrix, modelViewMatrix, [...Vector.mix(startPos, endPos, 0.5), 0.0]);
      mat4.rotateZ(modelViewMatrix, modelViewMatrix, a);
      shaderProgram.uniformSet({
        modelViewMatrix: modelViewMatrix,
        density: [0.6, 0.3],
        fixed: [0.0, 0.9],
        radius: [20, 30],
        thickness: [5, 5],
        borderPower: [1, 1],
        length: Vector.length(v),
        offset: -30,
        power: 1,
        gradientColorRate: 0,
        thicknessScaleRate: 0,
        flow: false,
      });
      shaderProgram.draw(bufferData.indicesBufferData.length);
    }
    {
      const startPos = [250, 200 + 60];
      const endPos = [250, 400];
      const v = Vector.sub(endPos, startPos);
      const a = Vector.getAngle(v);
      mat4.identity(modelViewMatrix);
      mat4.translate(modelViewMatrix, modelViewMatrix, [...Vector.mix(startPos, endPos, 0.5), 0.0]);
      mat4.rotateZ(modelViewMatrix, modelViewMatrix, a);
      shaderProgram.uniformSet({
        modelViewMatrix: modelViewMatrix,
        density: [0.6, 0.3],
        fixed: [0, 0],
        radius: [20, 30],
        thickness: [5, 5],
        borderPower: [1, 1],
        length: Vector.length(v),
        offset: 0,
        power: 1,
        gradientColorRate: 0,
        thicknessScaleRate: 0,
        flow: false,
      });
      shaderProgram.draw(bufferData.indicesBufferData.length);
    }
    {
      const startPos = [100, 400];
      const endPos = [400, 400];
      const v = Vector.sub(endPos, startPos);
      const a = Vector.getAngle(v);
      mat4.identity(modelViewMatrix);
      mat4.translate(modelViewMatrix, modelViewMatrix, [...Vector.mix(startPos, endPos, 0.5), 0.0]);
      mat4.rotateZ(modelViewMatrix, modelViewMatrix, a);
      shaderProgram.uniformSet({
        modelViewMatrix: modelViewMatrix,
        density: [0.3, 0.3],
        fixed: [1, 1],
        radius: [30, 30],
        thickness: [5, 5],
        borderPower: [1, 1],
        length: Vector.length(v),
        offset: 0,
        power: 1,
        gradientColorRate: 0,
        thicknessScaleRate: 0,
        flow: false,
      });
      shaderProgram.draw(bufferData.indicesBufferData.length);
    }

    {
      const startPos = [250, 400];
      const endPos = [250, 450];
      const v = Vector.sub(endPos, startPos);
      const a = Vector.getAngle(v);
      mat4.identity(modelViewMatrix);
      mat4.translate(modelViewMatrix, modelViewMatrix, [...Vector.mix(startPos, endPos, 0.5), 0.0]);
      mat4.rotateZ(modelViewMatrix, modelViewMatrix, a);
      shaderProgram.uniformSet({
        modelViewMatrix: modelViewMatrix,
        density: [0.3, 0.75],
        fixed: [0, 1],
        radius: [30, 15],
        thickness: [5, 5],
        borderPower: [1, 1],
        length: Vector.length(v),
        offset: 0,
        power: 1,
        gradientColorRate: 0,
        thicknessScaleRate: 0,
        flow: false,
      });
      shaderProgram.draw(bufferData.indicesBufferData.length);
    }
  }

  {
    const bufferData = buffers.model;
    const shaderProgram = programInfos.electricityBranchModelShader;
    shaderProgram.use();
    shaderProgram.attribSet({
      vertexPosition: bufferData.positionBufferData.buffer,
      textureCoord: bufferData.textureCoordinatesBufferData.buffer,
    });
    shaderProgram.elementSet(bufferData.indicesBufferData.buffer);

    shaderProgram.uniformSet({
      projectionMatrix: projectionMatrix,
      mouse: Vector.add(Vector.mul(mPos, [1, -1]), [0, size[1]]),
      time: now * 0.001,
      wireframe: guiData.wireframe,
      noiseSampler: textures.noise,
      gradientColorSampler: textures.gradientColor,
      sub: true,
    });
    useTexture(gl, null, false);
    {
      const startPos = [500, 100];
      const endPos = [700, 100];
      const v = Vector.sub(endPos, startPos);
      const a = Vector.getAngle(v);
      mat4.identity(modelViewMatrix);
      mat4.translate(modelViewMatrix, modelViewMatrix, [...Vector.mix(startPos, endPos, 0.5), 0.0]);
      mat4.rotateZ(modelViewMatrix, modelViewMatrix, a);
      shaderProgram.uniformSet({
        modelViewMatrix: modelViewMatrix,
        density: [0.6, 0.6],
        fixed: [1, 1],
        radius: [40, 40],
        thickness: [10, 10],
        length: Vector.length(v),
        offset: 0,
        power: 1,
      });
      shaderProgram.draw(bufferData.indicesBufferData.length);
    }
  }

  {
    particles.forEach((el, i, ary) => {
      el.update(delta);
      el.lifespan <= 0 && ary.splice(i, 1);
    });

    const bufferData = buffers.model;
    const shaderProgram = programInfos.modelShader;
    shaderProgram.use();
    shaderProgram.attribSet({
      vertexPosition: bufferData.positionBufferData.buffer,
      textureCoord: bufferData.textureCoordinatesBufferData.buffer,
    });
    shaderProgram.elementSet(bufferData.indicesBufferData.buffer);
    shaderProgram.uniformSet({
      projectionMatrix: projectionMatrix,
      wireframe: guiData.wireframe,
      gradientColorSampler: textures.gradientColor,
    });

    useTexture(gl, null, false);
    particles.forEach((el, i, ary) => {
      const startPos = el.prevPos;
      const endPos = el.pos;
      const thickness = 5 * EasingFunctions.easeOutQuad(el.lifespan / el.maxlife);
      const v = Vector.sub(endPos, startPos);
      const a = Vector.getAngle(v);
      mat4.identity(modelViewMatrix);
      mat4.translate(modelViewMatrix, modelViewMatrix, [...Vector.mix(startPos, endPos, 0.5), 0.0]);
      mat4.rotateZ(modelViewMatrix, modelViewMatrix, a);
      shaderProgram.uniformSet({
        modelViewMatrix: modelViewMatrix,
        size: [Vector.length(v) + thickness * 2 * (1 + 8), thickness * 2 * (1 + 8)],
      });
      shaderProgram.draw(bufferData.indicesBufferData.length);
    });
  }
};
main();
