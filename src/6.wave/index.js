import {
  arrayBufferData,
  elementArrayBufferData,
  loadTexture,
  createFramebufferTexture,
  useTexture,
} from "../js/glSupply";
import { Vector, VectorE } from "../js/vector";
import image from "./image.jpg";
import waveShader from "../js/shader/waveShader";
import normalShader from "../js/shader/normalShader";
import refractShader from "../js/shader/refractShader";
import viewShader from "../js/shader/viewShader";

main();
main0();
function main0() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.lineWidth = 1;
  const r = 40;
  const len = 400;

  ctx.strokeStyle = "#ff0000";
  ctx.beginPath();
  for (let i = 0; i < 800; i++) {
    const angle = (i / len) * 2 * Math.PI + 0.5 * Math.PI;
    const vector = [Math.cos(angle), Math.sin(angle)];
    VectorE.scale(vector, r);
    const point = Vector.add([i, 100], vector);
    if (i === 0) {
      ctx.moveTo(...point);
    } else {
      ctx.lineTo(...point);
    }
  }
  ctx.stroke();

  ctx.strokeStyle = "#000000";
  ctx.beginPath();
  for (let i = 0; i < 800; i++) {
    const angle = (i / len) * 2 * Math.PI + 0.5 * Math.PI;
    //const point = Vector.add([i, 100], [0, -r + r * Math.exp(Math.pow(Math.abs(Math.sin(-0.5 * angle)), 2.5))]);
    const point = Vector.add([i, 100], [0, -r + r * 2 * Math.pow(Math.exp(2 * Math.sin(angle)) / Math.exp(2), 0.75)]);
    if (i === 0) {
      ctx.moveTo(...point);
    } else {
      ctx.lineTo(...point);
    }
  }
  ctx.stroke();

  ctx.strokeStyle = "#0000ff";
  ctx.beginPath();
  ctx.moveTo(0, 100);
  ctx.lineTo(800, 100);
  ctx.stroke();
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
    waveShader: waveShader(gl),
    normalShader: normalShader(gl),
    refractShader: refractShader(gl),
    viewShader: viewShader(gl),
  };
  //緩衝資料
  const buffers = { face: faceBuffers(gl), view: faceBuffers(gl) };
  //貼圖
  const textures = { image: loadTexture(gl, image) };
  //滑鼠位置
  const mPos = [gl.canvas.width * 0.5, gl.canvas.height * 0.5];

  canvas.addEventListener("mousemove", (ev) => {
    VectorE.set(mPos, ev.pageX, ev.pageY);
  });

  const size = [gl.canvas.clientWidth, gl.canvas.clientHeight];
  const framebufferTextures = {
    wave: createFramebufferTexture(gl),
    normal: createFramebufferTexture(gl),
    refract: createFramebufferTexture(gl),
  };

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
function drawScene(gl, programInfos, buffers, textures, datas) {
  const { now, framebufferTextures, mPos, size } = datas;
  {
    const bufferData = buffers.face;
    const shaderProgram = programInfos.waveShader;
    shaderProgram.use();
    shaderProgram.attribSet({
      vertexPosition: bufferData.positionBufferData.buffer,
      textureCoord: bufferData.textureCoordinatesBufferData.buffer,
    });
    shaderProgram.uniformSet({
      size: size,
      flipY: 1,
      time: now,
    });
    useTexture(gl, framebufferTextures.wave);
    shaderProgram.draw(bufferData.indicesBufferData.length);
  }

  {
    const bufferData = buffers.face;
    const shaderProgram = programInfos.normalShader;
    shaderProgram.use();
    shaderProgram.attribSet({
      vertexPosition: bufferData.positionBufferData.buffer,
      textureCoord: bufferData.textureCoordinatesBufferData.buffer,
    });
    shaderProgram.uniformSet({
      size: size,
      flipY: 1,
      sampler: framebufferTextures.wave.texture,
      height: 20,
    });
    useTexture(gl, framebufferTextures.normal);
    shaderProgram.draw(bufferData.indicesBufferData.length);
  }

  {
    const bufferData = buffers.face;
    const shaderProgram = programInfos.refractShader;
    shaderProgram.use();
    shaderProgram.attribSet({
      vertexPosition: bufferData.positionBufferData.buffer,
      textureCoord: bufferData.textureCoordinatesBufferData.buffer,
    });
    shaderProgram.uniformSet({
      size: size,
      flipY: 1,
      sampler: textures.image,
      normalSampler: framebufferTextures.normal.texture,
      refractiveIndex: 1.33,
      distance: 1000,
    });
    useTexture(gl, framebufferTextures.refract);
    shaderProgram.draw(bufferData.indicesBufferData.length);
  }

  {
    const mPosRate = Vector.div(mPos, size);

    const bufferData = buffers.view;
    const shaderProgram = programInfos.viewShader;
    shaderProgram.use();
    shaderProgram.attribSet({
      vertexPosition: bufferData.positionBufferData.buffer,
      textureCoord: bufferData.textureCoordinatesBufferData.buffer,
    });
    shaderProgram.uniformSet({
      flipY: -1,
    });
    useTexture(gl);

    {
      const corner = [mPosRate[0], 0, 1, mPosRate[1]];
      const view = [
        [corner[0], corner[1]],
        [corner[2], corner[1]],
        [corner[2], corner[3]],
        [corner[0], corner[3]],
      ].flat();
      bufferData.positionBufferData.set(view);
      bufferData.textureCoordinatesBufferData.set(view);
      shaderProgram.uniformSet({
        sampler: framebufferTextures.wave.texture,
      });
      shaderProgram.draw(bufferData.indicesBufferData.length);
    }

    {
      const corner = [mPosRate[0], mPosRate[1], 1, 1];
      const view = [
        [corner[0], corner[1]],
        [corner[2], corner[1]],
        [corner[2], corner[3]],
        [corner[0], corner[3]],
      ].flat();
      bufferData.positionBufferData.set(view);
      bufferData.textureCoordinatesBufferData.set(view);
      shaderProgram.uniformSet({
        sampler: framebufferTextures.normal.texture,
      });
      shaderProgram.draw(bufferData.indicesBufferData.length);
    }

    {
      const corner = [0, 0, mPosRate[0], 1];
      const view = [
        [corner[0], corner[1]],
        [corner[2], corner[1]],
        [corner[2], corner[3]],
        [corner[0], corner[3]],
      ].flat();
      bufferData.positionBufferData.set(view);
      bufferData.textureCoordinatesBufferData.set(view);
      shaderProgram.uniformSet({
        sampler: framebufferTextures.refract.texture,
      });
      shaderProgram.draw(bufferData.indicesBufferData.length);
    }
  }
}
