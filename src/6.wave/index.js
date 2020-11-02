import {
  initShaderProgram,
  createFramebufferTextures,
  arrayBufferData,
  elementArrayBufferData,
  loadTexture,
} from "../js/glSupply";
import { Point, PointE } from "../js/point";
import image from "./image.jpg";
main();
function waveShader(gl, vs, fs) {
  const shaderProgram = initShaderProgram(gl, vs, fs);
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: (() => {
        const i = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(i);
        return (val) => {
          //頂點
          gl.bindBuffer(gl.ARRAY_BUFFER, val);
          gl.vertexAttribPointer(i, 2, gl.FLOAT, false, 0, 0);
        };
      })(),
      textureCoord: (() => {
        const i = gl.getAttribLocation(shaderProgram, "aTextureCoord");
        gl.enableVertexAttribArray(i);
        return (val) => {
          //貼圖UV座標
          gl.bindBuffer(gl.ARRAY_BUFFER, val);
          gl.vertexAttribPointer(i, 2, gl.FLOAT, false, 0, 0);
        };
      })(),
    },
    uniformLocations: {
      flipY: (() => {
        const i = gl.getUniformLocation(shaderProgram, "uFlipY");
        return (val) => {
          //翻轉水平
          gl.uniform1f(i, val);
        };
      })(),
      time: (() => {
        const i = gl.getUniformLocation(shaderProgram, "uTime");
        return (val) => {
          //時間
          gl.uniform1f(i, val);
        };
      })(),
      size: (() => {
        const i = gl.getUniformLocation(shaderProgram, "uSize");
        return (val) => {
          //顯示畫面大小
          gl.uniform2fv(i, val);
        };
      })(),
    },
  };
  return programInfo;
}

function faceBuffers(gl) {
  const positions = [
    [0.0, 0.0],
    [1.0, 0.0],
    [1.0, 1.0],
    [0.0, 1.0],
  ].flat();
  const positionBufferData = arrayBufferData(gl, positions, 2);

  const textureCoordinates = [
    [0.0, 0.0],
    [1.0, 0.0],
    [1.0, 1.0],
    [0.0, 1.0],
  ].flat();
  const textureCoordinatesBufferData = arrayBufferData(gl, textureCoordinates, 2);

  //ELEMENT_ARRAY_BUFFER
  const indices = [
    [0, 1, 3],
    [1, 2, 3],
  ].flat();
  const indicesBufferData = elementArrayBufferData(gl, indices);

  return {
    positionBufferData: positionBufferData,
    textureCoordinatesBufferData: textureCoordinatesBufferData,
    indicesBufferData: indicesBufferData,
  };
}

function main() {
  const canvas = document.querySelector("#glcanvas");
  const gl = canvas.getContext("webgl");
  if (!gl) {
    alert("無法初始化WebGL。您的瀏覽器或機器可能不支持它。");
    return;
  }
  //著色器資料
  const programInfos = {
    waveShader: waveShader(gl, require("../shader/wave.vs"), require("../shader/wave.fs")),
  };
  //緩衝資料
  const buffers = { face: faceBuffers(gl) };
  //貼圖
  const textures = [loadTexture(gl, image)];
  //滑鼠位置
  const mPos = [0, 0];

  canvas.addEventListener("mousemove", (ev) => {
    PointE.set(mPos, ev.pageX, ev.pageY);
  });

  const framebufferTextures = {};
  const tempFramebufferTextures = createFramebufferTextures(gl, 2);

  let time = 0;
  function render(now) {
    const delta = (now - time) * 0.001;
    time = now;
    //console.log(1 / delta);
    requestAnimationFrame(render);
    drawScene(gl, programInfos, buffers, textures, { now, delta, mPos, framebufferTextures, tempFramebufferTextures });
  }
  requestAnimationFrame(render);
}
function drawScene(gl, programInfos, buffers, textures, datas) {
  const { now } = datas;
  const size = [gl.canvas.clientWidth, gl.canvas.clientHeight];
  {
    const bufferData = buffers.face;
    const waveShader = programInfos.waveShader;
    gl.useProgram(waveShader.program);
    waveShader.attribLocations.vertexPosition(bufferData.positionBufferData.buffer);
    waveShader.attribLocations.textureCoord(bufferData.textureCoordinatesBufferData.buffer);
    waveShader.uniformLocations.time(now);
    waveShader.uniformLocations.size(size);

    gl.clearColor(0.0, 0.0, 0.0, 0.1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    waveShader.uniformLocations.flipY(-1);

    gl.drawElements(gl.TRIANGLE_STRIP, bufferData.indicesBufferData.length, gl.UNSIGNED_BYTE, 0);
  }
}
