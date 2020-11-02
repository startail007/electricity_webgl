import {
  initShaderProgram,
  setFramebuffer,
  createFramebufferTexture,
  createFramebufferTextures,
  arrayBufferData,
  elementArrayBufferData,
  loadTexture,
} from "../js/glSupply";
import { PointE } from "../js/point";
main();

function lineWidthShader(gl, vs, fs) {
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
        return (val, index = 0) => {
          //貼圖
          gl.activeTexture(gl.TEXTURE0 + index);
          gl.bindTexture(gl.TEXTURE_2D, val);
          gl.uniform1i(i, index);
        };
      })(),
      lineWidthSampler: (() => {
        const i = gl.getUniformLocation(shaderProgram, "uLineWidthSampler");
        return (val, index = 1) => {
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
    },
  };
  return programInfo;
}

function glowShader(gl, vs, fs) {
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
        return (val, index = 0) => {
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

function lineShader(gl, vs, fs) {
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
      vertexColor: (() => {
        const i = gl.getAttribLocation(shaderProgram, "aVertexColor");
        return (val) => {
          //頂點顏色
          gl.bindBuffer(gl.ARRAY_BUFFER, val);
          gl.vertexAttribPointer(i, 4, gl.FLOAT, false, 0, 0);
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
  const gl = canvas.getContext("webgl");
  if (!gl) {
    alert("無法初始化WebGL。您的瀏覽器或機器可能不支持它。");
    return;
  }
  //著色器資料
  const programInfos = {
    glowShader: glowShader(gl, require("../shader/glow.vs"), require("../shader/glow.fs")),
    lineShader: lineShader(gl, require("../shader/line.vs"), require("../shader/line.fs")),
    lineWidthShader: lineWidthShader(gl, require("../shader/lineWidth.vs"), require("../shader/lineWidth.fs")),
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

  const framebufferTextures = {
    line: createFramebufferTexture(gl),
    lineWidth: createFramebufferTexture(gl),
    glow: createFramebufferTexture(gl),
  };
  const tempFramebufferTextures = createFramebufferTextures(gl, 2);
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
    drawScene(delta, gl, programInfos, buffers, textures, mPos, framebufferTextures, tempFramebufferTextures);
  }
  requestAnimationFrame(render);
}
function drawScene(delta, gl, programInfos, buffers, textures, mPos, framebufferTextures, tempFramebufferTextures) {
  /*gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);*/

  //console.log(colors);

  //console.log(particles.length);
  let count = 0;
  let framebufferTexture;
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

    const lineShader = programInfos.lineShader;
    gl.useProgram(lineShader.program);
    lineShader.attribLocations.vertexPosition(bufferData.positionBufferData.buffer);
    lineShader.uniformLocations.size([gl.canvas.clientWidth, gl.canvas.clientHeight]);
    lineShader.uniformLocations.flipY(1);

    //gl.drawArrays(gl.LINES, 0, bufferData.indexLength);
    //gl.lineWidth(50.0);
    //gl.lineWidth(2.0);
    //console.log();
    //gl.drawArrays(gl.LINE_STRIP, 0, bufferData.indexLength);

    setFramebuffer(gl, framebufferTextures.line.framebuffer, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    lineShader.attribLocations.vertexColor(bufferData.colorBufferData.buffer);
    gl.drawArrays(gl.LINE_STRIP, 0, bufferData.positionBufferData.data.length / 2);

    setFramebuffer(gl, framebufferTextures.lineWidth.framebuffer, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    lineShader.attribLocations.vertexColor(bufferData.lineWidthBufferData.buffer);
    gl.drawArrays(gl.LINE_STRIP, 0, bufferData.positionBufferData.data.length / 2);
  }

  {
    //使用著色器程序
    const bufferData = buffers.face;
    const lineWidthShader = programInfos.lineWidthShader;
    gl.useProgram(lineWidthShader.program);
    lineWidthShader.attribLocations.vertexPosition(bufferData.positionBufferData.buffer);
    lineWidthShader.attribLocations.textureCoord(bufferData.textureCoordinatesBufferData.buffer);
    lineWidthShader.uniformLocations.flipY(1);
    lineWidthShader.uniformLocations.sampler(framebufferTextures.line.texture);
    lineWidthShader.uniformLocations.lineWidthSampler(framebufferTextures.lineWidth.texture);
    lineWidthShader.uniformLocations.size([gl.canvas.clientWidth, gl.canvas.clientHeight]);

    /*setFramebuffer(gl, null, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    lineWidthShader.uniformLocations.flipY(-1);

    gl.drawElements(gl.TRIANGLE_STRIP, bufferData.indicesBufferData.length, gl.UNSIGNED_BYTE, 0);*/

    setFramebuffer(gl, framebufferTextures.glow.framebuffer, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLE_STRIP, bufferData.indicesBufferData.length, gl.UNSIGNED_BYTE, 0);
  }

  {
    //使用著色器程序
    const bufferData = buffers.face;
    const glowShader = programInfos.glowShader;
    gl.useProgram(glowShader.program);
    glowShader.attribLocations.vertexPosition(bufferData.positionBufferData.buffer);
    glowShader.attribLocations.textureCoord(bufferData.textureCoordinatesBufferData.buffer);
    glowShader.uniformLocations.flipY(1);
    glowShader.uniformLocations.sampler(framebufferTextures.glow.texture);
    //glowShader.uniformLocations.sampler(textures[0]);
    glowShader.uniformLocations.size([gl.canvas.clientWidth, gl.canvas.clientHeight]);
    glowShader.uniformLocations.mouse(mPos);

    /*for (let i = 0; i < 2; i++) {
      framebufferTexture = tempFramebufferTextures[count % 2];
      setFramebuffer(gl, framebufferTexture.framebuffer, gl.canvas.width, gl.canvas.height);
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawElements(gl.TRIANGLE_STRIP, bufferData.indicesBufferData.length, gl.UNSIGNED_BYTE, 0);
      glowShader.uniformLocations.sampler(framebufferTexture.texture);
      count++;
    }*/

    setFramebuffer(gl, null, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    glowShader.uniformLocations.flipY(-1);

    gl.drawElements(gl.TRIANGLE_STRIP, bufferData.indicesBufferData.length, gl.UNSIGNED_BYTE, 0);
  }
}
