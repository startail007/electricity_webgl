import { mat4 } from "gl-matrix";
import image from "./image.jpg";
main();

function filterShader(gl, vs, fs) {
  const shaderProgram = initShaderProgram(gl, vs, fs);
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
      flipY: (() => {
        const i = gl.getUniformLocation(shaderProgram, "uFlipY");
        return (val) => {
          //翻轉水平
          gl.uniform1f(i, val);
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
      filter: (() => {
        const i = gl.getUniformLocation(shaderProgram, "uFilter[0]");
        return (val) => {
          //濾鏡陣列
          gl.uniform1fv(i, val);
        };
      })(),
    },
  };
  return programInfo;
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
    filterShader: filterShader(gl, require("../shader/filter.vs"), require("../shader/filter.fs")),
  };
  //模型框
  const buffers = initBuffers(gl);
  //貼圖
  const textures = [loadTexture(gl, image)];
  //滑鼠位置
  const mPos = [0, 0];

  canvas.addEventListener("mousemove", (ev) => {
    mPos[0] = ev.pageX;
    mPos[1] = ev.pageY;
  });

  const framebufferTextures = [];
  for (let i = 0; i < 2; i++) {
    const obj = {};
    const texture = createAndSetupTexture(gl);
    obj.texture = texture;

    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      gl.canvas.clientWidth,
      gl.canvas.clientHeight,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      null
    );

    const fbo = gl.createFramebuffer();
    obj.framebuffer = fbo;
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);

    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    framebufferTextures.push(obj);
  }
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);

  function render(now) {
    requestAnimationFrame(render);
    drawScene(gl, programInfos, buffers, textures, mPos, framebufferTextures);
  }
  requestAnimationFrame(render);
}

function createAndSetupTexture(gl) {
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  return texture;
}

function setFramebuffer(gl, fbo, width, height) {
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.viewport(0, 0, width, height);
}

function loadTexture(gl, url) {
  const texture = createAndSetupTexture(gl);
  const image = new Image();
  image.onload = function () {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  };
  image.src = url;
  return texture;
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

  return {
    position: positionBuffer,
    textureCoord: textureCoordBuffer,
    indexLength: indices.length,
  };
}
function drawScene(gl, programInfos, buffers, textures, mPos, framebufferTextures) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  //使用著色器程序
  const filterShader = programInfos.filterShader;
  gl.useProgram(filterShader.program);
  filterShader.attribLocations.vertexPosition(buffers.position);
  filterShader.attribLocations.textureCoord(buffers.textureCoord);
  filterShader.uniformLocations.flipY(1);
  filterShader.uniformLocations.sampler(textures[0], 0);
  filterShader.uniformLocations.size([gl.canvas.clientWidth, gl.canvas.clientHeight]);
  filterShader.uniformLocations.mouse(mPos);

  let count = 0;
  {
    const framebufferTexture = framebufferTextures[count % 2];
    setFramebuffer(gl, framebufferTexture.framebuffer, gl.canvas.width, gl.canvas.height);
    const filter = [
      [-2, -1, 0],
      [-1, 1, 1],
      [0, 1, 2],
    ].flat();
    const weight = filter.reduce((p, c) => p + c, 0);
    filterShader.uniformLocations.filter(filter.map((val) => val / weight));
    gl.drawElements(gl.TRIANGLE_STRIP, buffers.indexLength, gl.UNSIGNED_BYTE, 0);
    //gl.bindTexture(gl.TEXTURE_2D, framebufferTexture.texture);
    filterShader.uniformLocations.sampler(framebufferTexture.texture, 0);
    count++;
  }
  {
    const framebufferTexture = framebufferTextures[count % 2];
    setFramebuffer(gl, framebufferTexture.framebuffer, gl.canvas.width, gl.canvas.height);
    const filter = [
      [0.111, 0.111, 0.111],
      [0.111, 0.111, 0.111],
      [0.111, 0.111, 0.111],
    ].flat();
    const weight = filter.reduce((p, c) => p + c, 0);
    filterShader.uniformLocations.filter(filter.map((val) => val / weight));
    gl.drawElements(gl.TRIANGLE_STRIP, buffers.indexLength, gl.UNSIGNED_BYTE, 0);
    //gl.bindTexture(gl.TEXTURE_2D, framebufferTexture.texture);
    filterShader.uniformLocations.sampler(framebufferTexture.texture, 0);
    count++;
  }

  setFramebuffer(gl, null, gl.canvas.width, gl.canvas.height);
  filterShader.uniformLocations.flipY(-1);
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
