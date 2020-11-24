import { mat4 } from "gl-matrix";
import image from "./image.jpg";
import {
  arrayBufferData,
  elementArrayBufferData,
  createFramebufferTexture,
  useTexture,
  loadTexture,
} from "../js/glSupply";
import { Vector, VectorE } from "../js/vector";
import modelShader from "../js/shader/modelShader";
import electricityModelShader from "../js/shader/electricityModelShader";
import { Spark } from "../js/spark";

main();
function modelBuffers(gl) {
  const positions = [
    [-1.0, -1.0],
    [1.0, -1.0],
    [1.0, 1.0],
    [-1.0, 1.0],
  ].flat();
  const positionBufferData = arrayBufferData(gl, positions, 2);
  const textureCoordinates = [
    [0.0, 0.0],
    [1.0, 0.0],
    [1.0, 1.0],
    [0.0, 1.0],
  ].flat();
  const textureCoordinatesBufferData = arrayBufferData(gl, textureCoordinates, 2);
  const indices = [
    [0, 1, 3],
    [1, 2, 3],
  ].flat();
  //const indicesBufferData = elementArrayBufferData(gl, indices, Uint32Array);
  //const indicesBufferData = elementArrayBufferData(gl, indices, Uint16Array);
  const indicesBufferData = elementArrayBufferData(gl, indices, Uint8Array);

  return {
    positionBufferData: positionBufferData,
    textureCoordinatesBufferData: textureCoordinatesBufferData,
    indicesBufferData: indicesBufferData,
  };
}

function main() {
  const canvas = document.querySelector("#glcanvas");
  const options = {
    //premultipliedAlpha: false,
    alpha: false,
    //antialias: true,
  };
  const gl = canvas.getContext("webgl", options);
  /*let gl = canvas.getContext("webgl2", options);
  let isWebGL2 = true;
  if (!gl) {
    gl = canvas.getContext("webgl", options) || canvas.getContext("experimental-webgl", options);
    isWebGL2 = false;
  }*/
  if (!gl) {
    alert("無法初始化WebGL。您的瀏覽器或機器可能不支持它。");
    return;
  }
  //著色器資料
  const programInfos = {
    modelShader: modelShader(gl),
    electricityModelShader: electricityModelShader(gl),
  };
  //緩衝資料
  const buffers = { model: modelBuffers(gl) };
  //貼圖
  const textures = { image: loadTexture(gl, image) };
  //滑鼠位置
  const mPos = [gl.canvas.width * 0.5, gl.canvas.height * 0.5];

  const size = [gl.canvas.clientWidth, gl.canvas.clientHeight];
  const framebufferTextures = {};
  const particles = [];

  canvas.addEventListener("mousemove", (ev) => {
    VectorE.set(mPos, ev.pageX, ev.pageY);
  });
  canvas.addEventListener("mousedown", (ev) => {
    VectorE.set(mPos, ev.pageX, ev.pageY);
    for (let i = 0; i < 100; i++) {
      particles.push(
        new Spark(
          mPos,
          2 + Math.random() * 14,
          Math.random() * 2 * Math.PI,
          50 + Math.random() * 50,
          2 + 3 * Math.random()
        )
      );
    }
  });

  init(gl, programInfos, buffers, textures, { framebufferTextures, size });
  let time = 0;
  function render(now) {
    const delta = (now - time) * 0.001;
    time = now;
    //console.log(1 / delta);
    requestAnimationFrame(render);
    //console.log(mPos);
    drawScene(gl, programInfos, buffers, textures, { now, delta, mPos, framebufferTextures, size, particles });
  }
  requestAnimationFrame(render);
}

function init(gl, programInfos, buffers, textures, datas) {
  const { framebufferTextures, size } = datas;
  {
    const bufferData = buffers.model;
    const shaderProgram = programInfos.modelShader;
    shaderProgram.attribSet({
      vertexPosition: bufferData.positionBufferData.buffer,
      textureCoord: bufferData.textureCoordinatesBufferData.buffer,
    });
    shaderProgram.uniformSet({
      sampler: textures.image,
    });
  }
  {
    const bufferData = buffers.model;
    const shaderProgram = programInfos.electricityModelShader;
    shaderProgram.attribSet({
      vertexPosition: bufferData.positionBufferData.buffer,
      textureCoord: bufferData.textureCoordinatesBufferData.buffer,
    });
    shaderProgram.uniformSet({
      sampler: textures.image,
    });
  }
}

function drawScene(gl, programInfos, buffers, textures, datas) {
  const { now, delta, framebufferTextures, mPos, size, particles } = datas;

  particles.forEach((el, i, ary) => {
    el.update(delta);
    el.lifespan <= 0 && ary.splice(i, 1);
  });

  gl.enable(gl.BLEND);
  //gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.blendFunc(gl.ONE, gl.ONE);

  const projectionMatrix = mat4.create();
  mat4.ortho(projectionMatrix, 0, gl.canvas.clientWidth, gl.canvas.clientHeight, 0, 0.1, 100);
  mat4.translate(projectionMatrix, projectionMatrix, [0.0, 0.0, -1.0]);
  const modelViewMatrix = mat4.create();
  {
    const bufferData = buffers.model;

    const shaderProgram = programInfos.electricityModelShader;
    shaderProgram.use();
    shaderProgram.uniformSet({
      projectionMatrix: projectionMatrix,
      mouse: mPos,
      time: now * 0.001,
    });
    useTexture(gl);

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
      mat4.rotateZ(modelViewMatrix, modelViewMatrix, a);
      shaderProgram.uniformSet({
        modelViewMatrix: modelViewMatrix,
        startDensity: 0.003,
        endDensity: 0.003,
        startFixed: 1,
        endFixed: 1,
        startRadius: 60,
        endRadius: 60,
        lineWidth: 10,
        length: Vector.length(v),
      });
      shaderProgram.draw(bufferData.indicesBufferData.length);
    }
    {
      const startPos = [250, 100];
      const endPos = [380, 400];
      const v = Vector.sub(endPos, startPos);
      const a = Vector.getAngle(v);
      mat4.identity(modelViewMatrix);
      mat4.translate(modelViewMatrix, modelViewMatrix, [...Vector.mix(startPos, endPos, 0.5), 0.0]);
      mat4.rotateZ(modelViewMatrix, modelViewMatrix, a);
      shaderProgram.uniformSet({
        modelViewMatrix: modelViewMatrix,
        startDensity: 0.003,
        endDensity: 0.009,
        startFixed: 0.0,
        endFixed: 0.8,
        startRadius: 60,
        endRadius: 20,
        lineWidth: 5,
        length: Vector.length(v),
      });
      shaderProgram.draw(bufferData.indicesBufferData.length);
    }
    {
      const startPos = [250, 100];
      const endPos = [250, 400];
      const v = Vector.sub(endPos, startPos);
      const a = Vector.getAngle(v);
      mat4.identity(modelViewMatrix);
      mat4.translate(modelViewMatrix, modelViewMatrix, [...Vector.mix(startPos, endPos, 0.5), 0.0]);
      mat4.rotateZ(modelViewMatrix, modelViewMatrix, a);
      shaderProgram.uniformSet({
        modelViewMatrix: modelViewMatrix,
        startDensity: 0.003,
        endDensity: 0.009,
        startFixed: 0.0,
        endFixed: 0.0,
        startRadius: 60,
        endRadius: 20,
        lineWidth: 5,
        length: Vector.length(v),
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
        startDensity: 0.009,
        endDensity: 0.009,
        startFixed: 1,
        endFixed: 1,
        startRadius: 20,
        endRadius: 20,
        lineWidth: 5,
        length: Vector.length(v),
      });
      shaderProgram.draw(bufferData.indicesBufferData.length);
    }
  }
  {
    const bufferData = buffers.model;

    const shaderProgram = programInfos.modelShader;
    shaderProgram.use();
    shaderProgram.uniformSet({
      projectionMatrix: projectionMatrix,
    });

    useTexture(gl, null, false);
    particles.forEach((el, i, ary) => {
      const startPos = el.prevPos;
      const endPos = el.pos;
      const r = 30 * (el.lifespan / el.maxlife);
      const v = Vector.sub(endPos, startPos);
      const a = Vector.getAngle(v);
      mat4.identity(modelViewMatrix);
      mat4.translate(modelViewMatrix, modelViewMatrix, [...Vector.mix(startPos, endPos, 0.5), 0.0]);
      mat4.rotateZ(modelViewMatrix, modelViewMatrix, a);
      shaderProgram.uniformSet({
        modelViewMatrix: modelViewMatrix,
        size: [Vector.length(v) + r, r],
      });
      shaderProgram.draw(bufferData.indicesBufferData.length);
    });
  }
}
