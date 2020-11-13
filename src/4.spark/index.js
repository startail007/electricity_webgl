import { Spark } from "../js/spark";
import { createFramebufferTexture, arrayBufferData, elementArrayBufferData } from "../js/glSupply";
import { PointE } from "../js/point";
import lineWidthShader from "../js/shader/lineWidthShader";
import blurShader from "../js/shader/blurShader";
import addShader from "../js/shader/addShader";
import lineShader from "../js/shader/lineShader";
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
    [2, 0, 1],
    [3, 2, 0],
  ].flat();
  const indicesBufferData = elementArrayBufferData(gl, indices);

  return {
    positionBufferData: positionBufferData,
    textureCoordinatesBufferData: textureCoordinatesBufferData,
    indicesBufferData: indicesBufferData,
  };
}

function lineBuffers(gl) {
  const positionBufferData = arrayBufferData(gl, [], 2, gl.DYNAMIC_DRAW);
  const colorBufferData = arrayBufferData(gl, [], 4, gl.DYNAMIC_DRAW);
  const lineWidthBufferData = arrayBufferData(gl, [], 4, gl.DYNAMIC_DRAW);

  return {
    positionBufferData: positionBufferData,
    colorBufferData: colorBufferData,
    lineWidthBufferData: lineWidthBufferData,
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
    lineShader: lineShader(gl),
    lineWidthShader: lineWidthShader(gl),
    blurShader: blurShader(gl),
    addShader: addShader(gl),
  };
  //緩衝資料
  const buffers = { face: faceBuffers(gl), line: lineBuffers(gl) };
  //貼圖
  const textures = [];
  //滑鼠位置
  const mPos = [0, 0];

  canvas.addEventListener("mousemove", (ev) => {
    PointE.set(mPos, ev.pageX, ev.pageY);
  });

  const size = [gl.canvas.clientWidth, gl.canvas.clientHeight];
  const framebufferTextures = {
    lineColor: createFramebufferTexture(gl),
    lineWidth: createFramebufferTexture(gl),
    line: createFramebufferTexture(gl),
    blurX: createFramebufferTexture(gl),
    blurY: createFramebufferTexture(gl),
  };
  canvas.addEventListener("mousedown", (ev) => {
    PointE.set(mPos, ev.pageX, ev.pageY);
    for (let i = 0; i < 50; i++) {
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

  const particles = [];
  let time = 0;

  function render(now) {
    const delta = (now - time) * 0.001;
    time = now;
    requestAnimationFrame(render);
    drawScene(gl, programInfos, buffers, textures, {
      delta,
      mPos,
      framebufferTextures,
      particles,
      size,
    });
  }
  requestAnimationFrame(render);
}
function drawScene(gl, programInfos, buffers, textures, datas) {
  const { delta, mPos, framebufferTextures, particles, size } = datas;
  particles.forEach((el, i, ary) => {
    el.update(delta);
    el.lifespan <= 0 && ary.splice(i, 1);
  });
  const positions = particles.flatMap((el) => el.positions);
  const colors = particles.flatMap((el) => el.colors);
  const lineWidths = particles.flatMap((el) => el.lineWidths);

  buffers.line.positionBufferData.set(positions);
  buffers.line.colorBufferData.set(colors);
  buffers.line.lineWidthBufferData.set(lineWidths);

  {
    const bufferData = buffers.line;
    const shaderProgram = programInfos.lineShader;
    shaderProgram.use(gl);
    shaderProgram.uniformSet({
      size: size,
      flipY: 1,
    });

    shaderProgram.attribSet({
      vertexPosition: bufferData.positionBufferData.buffer,
    });
    shaderProgram.attribSet({
      vertexColor: bufferData.colorBufferData.buffer,
    });
    shaderProgram.useTexture(gl, framebufferTextures.lineColor);
    shaderProgram.draw(gl, gl.LINES, bufferData.positionBufferData.data.length / 2);

    shaderProgram.attribSet({
      vertexColor: bufferData.lineWidthBufferData.buffer,
    });
    shaderProgram.useTexture(gl, framebufferTextures.lineWidth);
    shaderProgram.draw(gl, gl.LINES, bufferData.positionBufferData.data.length / 2);
  }

  {
    const bufferData = buffers.face;
    const shaderProgram = programInfos.lineWidthShader;
    shaderProgram.use(gl);
    shaderProgram.attribSet({
      vertexPosition: bufferData.positionBufferData.buffer,
      textureCoord: bufferData.textureCoordinatesBufferData.buffer,
    });
    shaderProgram.uniformSet({
      size: size,
      flipY: 1,
      sampler: framebufferTextures.lineColor.texture,
      lineWidthSampler: framebufferTextures.lineWidth.texture,
    });
    shaderProgram.useTexture(gl, framebufferTextures.line);
    shaderProgram.draw(gl, bufferData.indicesBufferData.length);
  }

  {
    const bufferData = buffers.face;
    const shaderProgram = programInfos.blurShader;
    shaderProgram.use(gl);
    shaderProgram.attribSet({
      vertexPosition: bufferData.positionBufferData.buffer,
      textureCoord: bufferData.textureCoordinatesBufferData.buffer,
    });
    shaderProgram.uniformSet({
      size: size,
      flipY: 1,
      sampler: framebufferTextures.line.texture,
      width: 10,
      power: 0.125,
      dir: [1, 0],
    });
    shaderProgram.useTexture(gl, framebufferTextures.blurX);
    shaderProgram.draw(gl, bufferData.indicesBufferData.length);

    shaderProgram.uniformSet({
      sampler: framebufferTextures.blurX.texture,
      dir: [0, 1],
    });
    shaderProgram.useTexture(gl, framebufferTextures.blurY);
    shaderProgram.draw(gl, bufferData.indicesBufferData.length);
  }

  {
    const bufferData = buffers.face;
    const shaderProgram = programInfos.addShader;
    shaderProgram.use(gl);
    shaderProgram.attribSet({
      vertexPosition: bufferData.positionBufferData.buffer,
      textureCoord: bufferData.textureCoordinatesBufferData.buffer,
    });
    shaderProgram.uniformSet({
      flipY: -1,
      samplerA: framebufferTextures.line.texture,
      samplerB: framebufferTextures.blurY.texture,
    });
    shaderProgram.useTexture(gl);
    shaderProgram.draw(gl, bufferData.indicesBufferData.length);
  }
}
