import { mat4 } from "gl-matrix";
import noise from "./noise.jpg";
import gradientColor from "./gradientColor.jpg";
import thicknessScale from "./thicknessScale.jpg";
import MoveBall from "./moveBall.js";

import {
  arrayBufferData,
  elementArrayBufferData,
  createFramebufferTexture,
  useTexture,
  loadTexture,
} from "../js/glSupply";
import { Vector, VectorE, getQuadraticCurveTo, getQuadraticCurveToTangent, Line } from "../js/vector";
import EasingFunctions from "../js/ease";
import electricityModelShader from "./shader/electricityModelShader";
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
    electricityModelShader: electricityModelShader(gl),
  };
  //緩衝資料
  const buffers = {
    model: modelBuffers(gl),
  };
  //貼圖
  const textures = {
    noise: loadTexture(gl, noise),
    gradientColor: loadTexture(gl, gradientColor),
    thicknessScale: loadTexture(gl, thicknessScale),
  };
  //滑鼠位置
  // const mPos = [gl.canvas.width * 0.5, gl.canvas.height * 0.5];
  const mPos = [0, 0];
  const pList = [];

  const size = [gl.canvas.clientWidth, gl.canvas.clientHeight];
  const framebufferTextures = {};
  // canvas.addEventListener("mousemove", (ev) => {
  //   VectorE.set(mPos, ev.offsetX, ev.offsetY);
  // });
  // let count = 0;
  // const s = [0, 0];
  // const e = [0, 0];
  // canvas.addEventListener("mousedown", (ev) => {
  //   VectorE.set(s, ev.offsetX, ev.offsetY);
  // });
  // canvas.addEventListener("mouseup", (ev) => {
  //   VectorE.set(e, ev.offsetX, ev.offsetY);
  //   pList.push({ s: [...s], e: [...e], t: 0 });
  // });
  canvas.addEventListener("mousemove", (ev) => {
    VectorE.set(mPos, ev.offsetX, ev.offsetY);
  });
  canvas.addEventListener("click", (ev) => {
    pList.push({
      p0: [400, 300],
      p1: [ev.offsetX, ev.offsetY],
      p2: [ev.offsetX, ev.offsetY],
      t: 0,
      random: 1000 * Math.random(),
    });
  });
  setInterval(() => {
    pList.push({
      p0: [400, 300],
      p1: [...mPos],
      p2: [...mPos],
      t: 0,
      random: 1000 * Math.random(),
    });
  }, 650);
  const moveball = new MoveBall(canvas);
  moveball.create(2);

  init(gl, programInfos, buffers, textures, {
    framebufferTextures,
    size,
  });
  let time = 0;
  function render(now) {
    const delta = (now - time) * 0.001;
    time = now;
    //console.log(1 / delta);
    requestAnimationFrame(render);
    //console.log(mPos);
    drawScene(gl, programInfos, buffers, textures, {
      now: now,
      delta,
      mPos,
      framebufferTextures,
      size,
      pList,
      moveball,
    });
  }
  requestAnimationFrame(render);
};

const init = (gl, programInfos, buffers, textures, datas) => {
  const { framebufferTextures, size } = datas;
};

const drawScene = (gl, programInfos, buffers, textures, datas) => {
  const { now, delta, framebufferTextures, mPos, size, pList, moveball } = datas;
  moveball.update();

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
      // wireframe: guiData.wireframe,
      wireframe: false,
      noiseSampler: textures.noise,
      gradientColorSampler: textures.gradientColor,
      thicknessScaleSampler: textures.thicknessScale,
      sub: true,
    });
    // useTexture(gl, null, false);
    useTexture(gl, null, true);

    // gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // gl.clearDepth(1.0);
    // gl.enable(gl.DEPTH_TEST);
    // gl.depthFunc(gl.LEQUAL);
    // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // const t = 1;
    // const s = Math.min(Vector.length(Vector.sub(moveball.d[0].p, moveball.d[1].p)) / 100, 2);
    // const startPos = moveball.d[0].p;
    // const endPos = moveball.d[1].p;
    // // const startPos = [100, 100];
    // // const endPos = [300, 300];
    // const v = Vector.sub(endPos, startPos);
    // const a = Vector.getAngle(v);
    // mat4.identity(modelViewMatrix);
    // mat4.translate(modelViewMatrix, modelViewMatrix, [...Vector.mix(startPos, endPos, 0.5), 0.0]);
    // /*const s = Vector.length(v);
    //     mat4.scale(modelViewMatrix, modelViewMatrix, [s, 1, 1]);*/
    // mat4.rotateZ(modelViewMatrix, modelViewMatrix, a);

    // const gradientColorRateData = [
    //   [0, 1],
    //   [0.5, 1],
    //   [0.8, 0],
    //   [1.2, 0],
    //   [1.5, 1],
    //   [2, 1],
    // ];
    // const thicknessScaleRateData = [
    //   [0, 1],
    //   [0.5, 1],
    //   [0.8, 0],
    //   [1.2, 0],
    //   [1.5, 1],
    //   [2, 1],
    // ];
    // const flowRateData = [
    //   [0, 0],
    //   [0.75, 0.5],
    //   [1.25, 0.5],
    //   [2, 1],
    // ];
    // const powerData = [
    //   [0, 0],
    //   [0.5, 1.5],
    //   [0.8, 6],
    //   [1.2, 2],
    //   [1.5, 1.5],
    //   [2, 0],
    // ];
    // shaderProgram.uniformSet({
    //   modelViewMatrix: modelViewMatrix,
    //   density: [0.2, 0.2],
    //   fixed: [1, 1],
    //   radius: [40, 40],
    //   thickness: [10, 10],
    //   borderPower: [2 * s, 2 * s],
    //   length: Vector.length(v),
    //   offset: 0,
    //   power: 2 * s,
    //   //power: lineInterpolation(powerData, t % powerData[powerData.length - 1][0]),
    //   gradientColorRate: 0,
    //   gradientColorRate: lineInterpolation(
    //     gradientColorRateData,
    //     t % gradientColorRateData[gradientColorRateData.length - 1][0]
    //   ),
    //   thicknessScaleRate: 0,
    //   thicknessScaleRate: lineInterpolation(
    //     thicknessScaleRateData,
    //     t % thicknessScaleRateData[thicknessScaleRateData.length - 1][0]
    //   ),
    //   flow: false,
    //   flow: true,
    //   flowSegment: 2,
    //   flowRate: lineInterpolation(flowRateData, t % flowRateData[flowRateData.length - 1][0]),
    // });
    // shaderProgram.draw(bufferData.indicesBufferData.length);

    for (let i = 0; i < pList.length; i++) {
      if (pList[i].t <= 2) {
        pList[i].t += delta;

        VectorE.set(pList[i].p2, ...Vector.mix(pList[i].p2, mPos, 0.5));
        VectorE.set(pList[i].p1, ...Vector.mix(pList[i].p1, Vector.mix(pList[i].p0, pList[i].p2, 0.5), 0.05));

        const startPos = pList[i].p0;
        const endPos = pList[i].p2;
        const v = Vector.sub(endPos, startPos);
        const a = Vector.getAngle(v);
        mat4.identity(modelViewMatrix);
        mat4.translate(modelViewMatrix, modelViewMatrix, [...Vector.mix(startPos, endPos, 0.5), 0.0]);
        /*const s = Vector.length(v);
        mat4.scale(modelViewMatrix, modelViewMatrix, [s, 1, 1]);*/
        mat4.rotateZ(modelViewMatrix, modelViewMatrix, a);

        const gradientColorRateData = [
          [0, 1],
          [0.5, 1],
          [0.8, 0],
          [1.2, 0],
          [1.5, 1],
          [2, 1],
        ];
        const thicknessScaleRateData = [
          [0, 10],
          [0.5, 1],
          [0.8, 0],
          [1.2, 0],
          [1.5, 1],
          [2, 10],
        ];
        const flowRateData = [
          [0, 0],
          [0.75, 0.5],
          [1.25, 0.5],
          [2, 1],
        ];
        const powerData = [
          [0, 0],
          [0.5, 1.5],
          [0.8, 4],
          [1.2, 2],
          [1.5, 1.5],
          [2, 0],
        ];
        let d = -Line.toLineDistance(pList[i].p1, pList[i].p0, pList[i].p2, true) * 0.5;
        if (Math.abs(d) > 50) {
          d = 50 * (d / Math.abs(d));
        }
        const len = Math.min(Vector.distance(pList[i].p1, pList[i].p2) / 2, 60);
        shaderProgram.uniformSet({
          time: now * 0.001 + pList[i].random,
          modelViewMatrix: modelViewMatrix,
          density: [0.2, 0.2],
          fixed: [1, 1],
          radius: [len, len],
          thickness: [10, 10],
          borderPower: [10, 2],
          length: Vector.length(v),
          offset: d,
          power: 2,
          power: lineInterpolation(powerData, pList[i].t % powerData[powerData.length - 1][0]),
          gradientColorRate: 0,
          gradientColorRate: lineInterpolation(
            gradientColorRateData,
            pList[i].t % gradientColorRateData[gradientColorRateData.length - 1][0]
          ),
          thicknessScaleRate: 0,
          thicknessScaleRate: lineInterpolation(
            thicknessScaleRateData,
            pList[i].t % thicknessScaleRateData[thicknessScaleRateData.length - 1][0]
          ),
          flow: false,
          flow: true,
          flowSegment: 2,
          flowRate: lineInterpolation(flowRateData, pList[i].t % flowRateData[flowRateData.length - 1][0]),
        });
        shaderProgram.draw(bufferData.indicesBufferData.length);
      } else {
        pList.splice(i, 1);
      }
    }
  }
};
main();
