import { mat4 } from "gl-matrix";
import noise from "./noise.jpg";
import gradientColor from "./gradientColor.jpg";
import thicknessScale from "./thicknessScale.jpg";

import {
  arrayBufferData,
  elementArrayBufferData,
  createFramebufferTexture,
  useTexture,
  loadTexture,
} from "../js/glSupply";
import {
  Vector,
  VectorE,
  getQuadraticCurveTo,
  getQuadraticCurveToTangent,
} from "../js/vector";
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
  const textureCoordinatesBufferData = arrayBufferData(
    gl,
    textureCoordinates,
    2
  );
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
    gl =
      canvas.getContext("webgl", options) ||
      canvas.getContext("experimental-webgl", options);
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
  const mPos = [gl.canvas.width * 0.5, gl.canvas.height * 0.5];

  const size = [gl.canvas.clientWidth, gl.canvas.clientHeight];
  const framebufferTextures = {};

  canvas.addEventListener("mousemove", (ev) => {
    VectorE.set(mPos, ev.pageX, ev.pageY);
  });

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
    });
  }
  requestAnimationFrame(render);
};

const init = (gl, programInfos, buffers, textures, datas) => {
  const { framebufferTextures, size } = datas;
};

const drawScene = (gl, programInfos, buffers, textures, datas) => {
  const { now, delta, framebufferTextures, mPos, size } = datas;

  const projectionMatrix = mat4.create();
  mat4.ortho(
    projectionMatrix,
    0,
    gl.canvas.clientWidth,
    gl.canvas.clientHeight,
    0,
    0.1,
    100
  );
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
    useTexture(gl, null, false);
    /*gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);*/
    {
      const startPos = [100, 100];
      const endPos = [...mPos];
      const v = Vector.sub(endPos, startPos);
      const a = Vector.getAngle(v);
      mat4.identity(modelViewMatrix);
      mat4.translate(modelViewMatrix, modelViewMatrix, [
        ...Vector.mix(startPos, endPos, 0.5),
        0.0,
      ]);
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
        [0, 1],
        [0.5, 1],
        [0.8, 0],
        [1.2, 0],
        [1.5, 1],
        [2, 1],
      ];
      // const flowRateData = [
      //   [0, 0],
      //   [0.5, 0.5],
      //   [1.5, 0.5],
      //   [2, 1],
      // ];
      const flowRateData = [
        [0, 0],
        [0.75, 0.5],
        [1.25, 0.5],
        [2, 1],
      ];
      const powerData = [
        [0, 0],
        [0.5, 1.5],
        [0.8, 2],
        [1.2, 2],
        [1.5, 1.5],
        [2, 0],
      ];
      shaderProgram.uniformSet({
        modelViewMatrix: modelViewMatrix,
        density: [0.2, 0.2],
        fixed: [1, 1],
        radius: [40, 40],
        thickness: [10, 10],
        borderPower: [3, 3],
        length: Vector.length(v),
        offset: 0,
        power: 2,
        power: lineInterpolation(
          powerData,
          (now * 0.001) % powerData[powerData.length - 1][0]
        ),
        gradientColorRate: 0,
        gradientColorRate: lineInterpolation(
          gradientColorRateData,
          (now * 0.001) %
            gradientColorRateData[gradientColorRateData.length - 1][0]
        ),
        thicknessScaleRate: 0,
        thicknessScaleRate: lineInterpolation(
          thicknessScaleRateData,
          (now * 0.001) %
            thicknessScaleRateData[thicknessScaleRateData.length - 1][0]
        ),
        flow: false,
        flow: true,
        flowSegment: 2,
        flowRate: lineInterpolation(
          flowRateData,
          (now * 0.001) % flowRateData[flowRateData.length - 1][0]
        ),
      });
      shaderProgram.draw(bufferData.indicesBufferData.length);
    }
  }
};
main();
