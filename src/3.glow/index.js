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
    blurShader: blurShader(gl),
    lineShader: lineShader(gl),
    lineWidthShader: lineWidthShader(gl),
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
  buffers.line.positionBufferData.set(
    [
      [0.0, 0.0],
      [150.0, 100.0],
      [200.0, 200.0],
      [400.0, 200.0],
    ].flat()
  );
  buffers.line.colorBufferData.set(
    [
      [1.0, 1.0, 1.0, 1.0],
      [1.0, 0.0, 0.0, 1.0],
      [0.0, 1.0, 0.0, 1.0],
      [0.0, 0.0, 1.0, 1.0],
    ].flat()
  );
  buffers.line.lineWidthBufferData.set(
    [
      [1.0, 0.0, 0.0, 0.0],
      [0.2, 0.0, 0.0, 0.0],
      [0.5, 0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0],
    ].flat()
  );
  canvas.addEventListener("mousedown", (ev) => {
    //canvas.addEventListener("mousemove", (ev) => {
    PointE.set(mPos, ev.pageX, ev.pageY);
    buffers.line.positionBufferData.add(mPos);
    buffers.line.colorBufferData.add([Math.random(), Math.random(), Math.random(), 1]);
    buffers.line.lineWidthBufferData.add([0.2 + 0.8 * Math.random(), 0.0, 0.0, 1]);
    console.log(buffers.line.positionBufferData.length / 2);
  });

  let time = 0;
  function render(now) {
    const delta = (now - time) * 0.001;
    time = now;
    //console.log(1 / delta);
    requestAnimationFrame(render);
    drawScene(delta, gl, programInfos, buffers, textures, size, mPos, framebufferTextures);
  }
  requestAnimationFrame(render);
}
function drawScene(delta, gl, programInfos, buffers, textures, size, mPos, framebufferTextures) {
  /*gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);*/

  //console.log(colors);

  //console.log(particles.length);
  {
    const bufferData = buffers.line;
    {
      const pos01 = bufferData.positionBufferData.getItem(0);
      pos01[0] += 50 * delta;
      pos01[0] %= 100;
      bufferData.positionBufferData.item(0, pos01);
    }
    {
      const pos01 = bufferData.positionBufferData.getItem(2);
      pos01[1] += 50 * delta;
      pos01[1] %= 100;
      bufferData.positionBufferData.item(2, pos01);
    }
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
    shaderProgram.draw(gl, gl.LINE_STRIP, bufferData.positionBufferData.data.length / 2);

    shaderProgram.attribSet({
      vertexColor: bufferData.lineWidthBufferData.buffer,
    });
    shaderProgram.useTexture(gl, framebufferTextures.lineWidth);
    shaderProgram.draw(gl, gl.LINE_STRIP, bufferData.positionBufferData.data.length / 2);
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
    /*gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    gl.enable(gl.BLEND);
    gl.blendEquation(gl.FUNC_ADD);
    //gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.blendFunc(gl.ONE, gl.ZERO);
    //gl.blendFunc(gl.ONE, gl.ZERO);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);*/
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
