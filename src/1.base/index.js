import { mat4 } from "gl-matrix";
import image from "./image.jpg";
main();

function main() {
  const canvas = document.querySelector("#glcanvas");
  const gl = canvas.getContext("webgl");
  if (!gl) {
    alert("無法初始化WebGL。您的瀏覽器或機器可能不支持它。");
    return;
  }
  //著色器資料
  const baseVS = require("../shader/base.vs");
  const baseFS = require("../shader/base.fs");
  const shaderProgram = initShaderProgram(gl, baseVS, baseFS);
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: (() => {
        const i = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        return (val) => {
          //頂點
          gl.bindBuffer(gl.ARRAY_BUFFER, val);
          gl.vertexAttribPointer(i, 2, gl.FLOAT, false, 0, 0);
          gl.enableVertexAttribArray(i);
        };
      })(),
      vertexColor: (() => {
        const i = gl.getAttribLocation(shaderProgram, "aVertexColor");
        return (val) => {
          //頂點顏色
          gl.bindBuffer(gl.ARRAY_BUFFER, val);
          gl.vertexAttribPointer(i, 4, gl.FLOAT, false, 0, 0);
          gl.enableVertexAttribArray(i);
        };
      })(),
      textureCoord: (() => {
        const i = gl.getAttribLocation(shaderProgram, "aTextureCoord");
        return (val) => {
          //貼圖UV座標
          gl.bindBuffer(gl.ARRAY_BUFFER, val);
          gl.vertexAttribPointer(i, 2, gl.FLOAT, false, 0, 0);
          gl.enableVertexAttribArray(i);
        };
      })(),
    },
    uniformLocations: {
      projectionMatrix: (() => {
        const i = gl.getUniformLocation(shaderProgram, "uProjectionMatrix");
        return (val) => {
          //投影矩陣
          gl.uniformMatrix4fv(i, false, val);
        };
      })(),
      modelViewMatrix: (() => {
        const i = gl.getUniformLocation(shaderProgram, "uModelViewMatrix");
        return (val) => {
          //模型矩陣
          gl.uniformMatrix4fv(i, false, val);
        };
      })(),
      sampler: (() => {
        const i = gl.getUniformLocation(shaderProgram, "uSampler");
        return (val, index) => {
          //貼圖
          gl.activeTexture(gl.TEXTURE0 + index);
          gl.bindTexture(gl.TEXTURE_2D, val);
          gl.uniform1i(i, index);
        };
      })(),
      size: (() => {
        const i = gl.getUniformLocation(shaderProgram, "uSize");
        return (val) => {
          //顯示畫面大小
          gl.uniform2fv(i, val);
        };
      })(),
      mouse: (() => {
        const i = gl.getUniformLocation(shaderProgram, "uMouse");
        return (val) => {
          //滑鼠位置
          gl.uniform2fv(i, val);
        };
      })(),
    },
  };
  const buffers = initBuffers(gl);

  const mPos = [0, 0];
  canvas.addEventListener("mousemove", (ev) => {
    mPos[0] = ev.pageX;
    mPos[1] = ev.pageY;
  });

  function render(now) {
    requestAnimationFrame(render);
    drawScene(gl, programInfo, buffers, mPos);
  }
  requestAnimationFrame(render);
}

function loadTexture(gl, url) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([0, 0, 255, 255]); // opaque blue
  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, pixel);

  const image = new Image();
  image.onload = function () {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);
    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
      gl.generateMipmap(gl.TEXTURE_2D);
    } else {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
  };
  image.src = url;

  return texture;
}
function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
}

function initBuffers(gl) {
  const positions = [
    [0.0, 0.0],
    [1.0, 0.0],
    [1.0, 1.0],
    [0.0, 1.0],
  ].flat();
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  const colors = [
    [1.0, 1.0, 1.0, 1.0], //white
    [1.0, 0.0, 0.0, 1.0], // red
    [0.0, 1.0, 0.0, 1.0], // green
    [0.0, 0.0, 1.0, 1.0], // blue
  ].flat();
  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  const textureCoordinates = [
    [0.0, 0.0],
    [1.0, 0.0],
    [1.0, 1.0],
    [0.0, 1.0],
  ].flat();
  const textureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);

  //ELEMENT_ARRAY_BUFFER
  const indices = [
    [0, 1, 3],
    [1, 2, 3],
  ].flat();
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);

  const texture = loadTexture(gl, image);

  return {
    position: positionBuffer,
    color: colorBuffer,
    textureCoord: textureCoordBuffer,
    texture: texture,
    indexLength: indices.length,
  };
}
function drawScene(gl, programInfo, buffers, mPos) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  /*const fieldOfView = (45 * Math.PI) / 180;
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();
  mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);
  const modelViewMatrix = mat4.create();
  mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, -3.0]);*/

  const projectionMatrix = mat4.create();
  const modelViewMatrix = mat4.create();

  //使用著色器程序
  gl.useProgram(programInfo.program);
  programInfo.attribLocations.vertexPosition(buffers.position);
  programInfo.attribLocations.vertexColor(buffers.color);
  programInfo.attribLocations.textureCoord(buffers.textureCoord);
  programInfo.uniformLocations.projectionMatrix(projectionMatrix);
  programInfo.uniformLocations.modelViewMatrix(modelViewMatrix);
  programInfo.uniformLocations.sampler(buffers.texture, 0);
  programInfo.uniformLocations.size([gl.canvas.clientWidth, gl.canvas.clientHeight]);
  programInfo.uniformLocations.mouse(mPos);

  //gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  gl.drawElements(gl.TRIANGLE_STRIP, buffers.indexLength, gl.UNSIGNED_BYTE, 0);
}

function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert("無法初始化著色器程序: " + gl.getProgramInfoLog(shaderProgram));
    return null;
  }
  return shaderProgram;
}

function loadShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert("編譯著色器時發生錯誤: " + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}
