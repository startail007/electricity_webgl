import { mat4 } from "gl-matrix";
import noise from "./noise.jpg";
import gradientColor from "./gradientColor.jpg";
import thicknessScale from "./thicknessScale.jpg";
import Electricity from "./electricity";
import {
  arrayBufferData,
  elementArrayBufferData,
  createFramebufferTexture,
  useTexture,
  loadTexture,
  getViewData0,
} from "../js/glSupply";
import { Vector, VectorE, getQuadraticCurveInfo, getCubicCurveInfo } from "../js/vector";
import EasingFunctions from "../js/ease";
import electricityModelShader from "./shader/electricityModelShader";
import viewShader from "../js/shader/viewShader";
import { lagrangeInterpolation, lineInterpolation } from "../js/base";
import { modelBuffers } from "../js/model";

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
  const buffers = {};
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
  const framebufferTextures = {
    text: createFramebufferTexture(gl),
    blurs: [createFramebufferTexture(gl), createFramebufferTexture(gl)],
  };
  canvas.addEventListener("mousemove", (ev) => {
    VectorE.set(mPos, ev.offsetX, ev.offsetY);

    const len = Vector.distance(mPos, [400, 300]);
    if (len <= 300) {
      const list = pList.filter((el) => el.group === "my" && !el.remove);
      if (list.length <= 0) {
        const electricity = new Electricity(getQuadraticCurveInfo, {
          group: "my",
          t: 0,
          flow: true,
          pointList: [[400, 300], [...mPos], [...mPos]],
        });
        electricity.onUpdate((el, delta) => {
          console.log();
          if (el.flow) {
            if (el.remove) {
              if (el.tRate < 1) {
                el.t += delta;
              } else {
                const i = pList.findIndex((item) => item.id === el.id);
                pList.splice(i, 1);
              }
            } else {
              if (el.tRate < 0.5) {
                el.t += delta;
              }
            }
          }
          const [p0, p1, p2] = el.options.pointList;
          el.options.n = Math.min(Math.max(Math.floor(Vector.distance(p0, mPos) / 8), 3), 30);
          VectorE.set(p2, ...Vector.mix(p2, mPos, 0.5));
          VectorE.set(p1, ...Vector.mix(p1, Vector.mix(p0, p2, 0.65), 0.075));
        });
        pList.push(electricity);
      }
    } else if (len >= 350) {
      const list = pList.filter((el) => el.group === "my" && !el.remove);
      list.forEach((el) => {
        el.remove = true;
      });
    }
  });

  const electricity = new Electricity(getCubicCurveInfo, {
    pointList: [
      [300, 100],
      [200, 300],
      [600, 300],
      [500, 100],
    ],
  });
  pList.push(electricity);

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
    });
  }
  requestAnimationFrame(render);
};

const init = (gl, programInfos, buffers, textures, datas) => {
  const { framebufferTextures, size } = datas;
};

const drawScene = (gl, programInfos, buffers, textures, datas) => {
  const { now, delta, framebufferTextures, mPos, size, pList } = datas;

  const projectionMatrix = mat4.create();
  mat4.ortho(projectionMatrix, 0, gl.canvas.clientWidth, gl.canvas.clientHeight, 0, 0.1, 100);
  mat4.translate(projectionMatrix, projectionMatrix, [0.0, 0.0, -1.0]);

  gl.enable(gl.CULL_FACE);
  gl.enable(gl.BLEND);
  //gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clearDepth(1.0);
  //gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.clear(gl.COLOR_BUFFER_BIT);

  {
    gl.blendFunc(gl.ONE, gl.ONE);
    const gradientColorRateData = [
      [0, 1],
      [0.1, 1],
      [0.25, 0],
      [0.75, 0],
      [0.9, 1],
      [1, 1],
    ];
    const thicknessScaleRateData = [
      [0, 2],
      [0.1, 0],
      [0.25, 0],
      [0.75, 0],
      [0.9, 0],
      [1, 2],
    ];
    const powerData = [
      [0, 0],
      [0.1, 0],
      [0.2, 1.5],
      [0.35, 4],
      [0.65, 3],
      [0.8, 1.5],
      [0.9, 0],
      [1, 0],
    ];
    const flowRateData = [
      [0, 0],
      [0.1, 0],
      [0.3, 0.5],
      [0.7, 0.5],
      [0.9, 1],
      [1, 1],
    ];
    for (let i = 0; i < pList.length; i++) {
      const shaderProgram = programInfos.electricityModelShader;
      shaderProgram.use();
      shaderProgram.uniformSet({
        projectionMatrix: projectionMatrix,
        time: now * 0.001,
        wireframe: false,
        noiseSampler: textures.noise,
        gradientColorSampler: textures.gradientColor,
        thicknessScaleSampler: textures.thicknessScale,
        sub: true,
      });
      const el = pList[i];
      //useTexture(gl, null, true);
      const { bufferData, length } = el.getBufferData(gl);
      el.update(delta);

      shaderProgram.attribSet({
        vertexPosition: bufferData.positionBufferData.buffer,
        textureCoord: bufferData.textureCoordinatesBufferData.buffer,
      });
      shaderProgram.elementSet(bufferData.indicesBufferData.buffer);

      const len = Math.min(length, 60);
      const tRate = el.tRate;
      shaderProgram.uniformSet({
        time: now * 0.001 + el.randomSeed,
        expand: el.expand,
        density: [0.2, 0.4],
        fixed: [1, 1],
        radius: [len, len * 0.8],
        thickness: [8, 6],
        borderPower: [10, 8],
        length: length,
        power: 2,
        power: lineInterpolation(powerData, tRate),
        gradientColorRate: 0,
        gradientColorRate: lineInterpolation(gradientColorRateData, tRate),
        thicknessScaleRate: 0,
        thicknessScaleRate: lineInterpolation(thicknessScaleRateData, tRate),
        flow: el.flow,
        flowRate: lineInterpolation(flowRateData, tRate),
      });
      shaderProgram.draw(bufferData.indicesBufferData.length);
    }
  }
};
main();
