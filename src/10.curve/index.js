import { arrayBufferData, elementArrayBufferData, createFramebufferTexture, useTexture } from "../js/glSupply";
import { Vector, VectorE } from "../js/vector";
import quadraticCurveShader from "../js/shader/quadraticCurveShader";

main();
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
  const gl = canvas.getContext("webgl", {
    //premultipliedAlpha: false,
    alpha: false,
  });
  if (!gl) {
    alert("無法初始化WebGL。您的瀏覽器或機器可能不支持它。");
    return;
  }
  //著色器資料
  const programInfos = {
    quadraticCurveShader: quadraticCurveShader(gl),
  };
  //緩衝資料
  const buffers = { face: faceBuffers(gl), view: faceBuffers(gl) };
  //貼圖
  const textures = {};
  //滑鼠位置
  const mPos = [gl.canvas.width * 0.5, gl.canvas.height * 0.5];

  canvas.addEventListener("mousemove", (ev) => {
    VectorE.set(mPos, ev.pageX, ev.pageY);
  });

  const size = [gl.canvas.clientWidth, gl.canvas.clientHeight];
  const framebufferTextures = {};

  init(gl, programInfos, buffers, textures, { framebufferTextures, size });
  let time = 0;
  function render(now) {
    const delta = (now - time) * 0.001;
    time = now;
    //console.log(1 / delta);
    requestAnimationFrame(render);
    //console.log(mPos);
    drawScene(gl, programInfos, buffers, textures, { now, delta, mPos, framebufferTextures, size });
  }
  requestAnimationFrame(render);
}

function init(gl, programInfos, buffers, textures, datas) {
  //const { framebufferTextures, size } = datas;
}
function drawScene(gl, programInfos, buffers, textures, datas) {
  const { now, framebufferTextures, mPos, size } = datas;

  {
    const bufferData = buffers.face;
    const shaderProgram = programInfos.quadraticCurveShader;
    shaderProgram.use();
    shaderProgram.attribSet({
      vertexPosition: bufferData.positionBufferData.buffer,
      textureCoord: bufferData.textureCoordinatesBufferData.buffer,
    });
    shaderProgram.uniformSet({
      size: size,
      time: now * 0.001,
      flipY: -1,
      startPos: [300, 400],
      controlPos: [400, 300],
      endPos: [500, 400],
    });
    useTexture(gl);
    shaderProgram.draw(bufferData.indicesBufferData.length);
  }
}
