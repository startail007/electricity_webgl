import { Spark } from "../js/spark";
import { Electricity } from "../js/electricity.js";
import {
  initShaderProgram,
  setFramebuffer,
  useFramebufferTexture,
  createFramebufferTexture,
  createFramebufferTextures,
  arrayBufferData,
  elementArrayBufferData,
  arrayBufferData0,
} from "../js/glSupply";
import { Point, PointE } from "../js/point";
main();
function lineWidthShader(gl, vs, fs) {
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
        gl.enableVertexAttribArray(i);
        return (val) => {
          //頂點
          gl.bindBuffer(gl.ARRAY_BUFFER, val);
          gl.vertexAttribPointer(i, 2, gl.FLOAT, false, 0, 0);
        };
      })(),
      vertexColor: (() => {
        const i = gl.getAttribLocation(shaderProgram, "aVertexColor");
        gl.enableVertexAttribArray(i);
        return (val) => {
          //頂點顏色
          gl.bindBuffer(gl.ARRAY_BUFFER, val);
          gl.vertexAttribPointer(i, 4, gl.FLOAT, false, 0, 0);
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
  /*const positionBufferData = arrayBufferData0(gl, [], 2, gl.DYNAMIC_DRAW);
  const colorBufferData = arrayBufferData0(gl, [], 4, gl.DYNAMIC_DRAW);
  const lineWidthBufferData = arrayBufferData0(gl, [], 4, gl.DYNAMIC_DRAW);*/

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
  /*canvas.addEventListener("mousedown", (ev) => {
    //canvas.addEventListener("mousemove", (ev) => {
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
  });*/

  const particles = [];
  let time = 0;

  const electricitys = [];
  electricitys.push({ data: new Electricity(100, 0.05, 0.15), posStart: [200, 100], posEnd: [0, 0] });
  electricitys.push({ data: new Electricity(100, 0.05, 0.15), posStart: [600, 100], posEnd: [0, 0] });
  electricitys.push({ data: new Electricity(100, 0.05, 0.15), posStart: [600, 500], posEnd: [0, 0] });
  electricitys.push({ data: new Electricity(100, 0.05, 0.15), posStart: [200, 500], posEnd: [0, 0] });
  //const mainElectricity = new Electricity(100, 0.05, 0.15);

  function render(now) {
    const delta = (now - time) * 0.001;
    time = now;
    //console.log(1 / delta);
    requestAnimationFrame(render);
    drawScene(
      gl,
      programInfos,
      buffers,
      textures,

      { delta, mPos, framebufferTextures, tempFramebufferTextures, electricitys, particles }
    );
  }
  requestAnimationFrame(render);
}
const getElectricityBufferData = (electricity, posStart, posEnd, m) => {
  electricity.data_deform = m;
  electricity.data_wave = electricity.data_limit * m;
  electricity.update();
  electricity.flow(posStart, posEnd);
  const positions = electricity.segmentShow.flat();
  const colors = electricity.segmentShow.flatMap(() => [0.25, 1.0, 1.0, 1.0]);
  const lineWidths = electricity.segmentShow.flatMap((e, i, array) => {
    const size = 0.3 + 0.2 * (1 - Math.abs(i - (array.length - 1) * 0.5) / ((array.length - 1) * 0.5));
    return [size, 0.0, 0.0, 0.0];
  });
  return { positions, colors, lineWidths };
};
function drawScene(gl, programInfos, buffers, textures, datas) {
  const { delta, mPos, framebufferTextures, tempFramebufferTextures, electricitys, particles } = datas;
  let count = 0;
  let framebufferTexture;
  const size = [gl.canvas.clientWidth, gl.canvas.clientHeight];
  {
    const bufferData = buffers.line;

    const lineShader = programInfos.lineShader;
    gl.useProgram(lineShader.program);
    lineShader.uniformLocations.size(size);
    lineShader.uniformLocations.flipY(1);

    electricitys.forEach((electricity, index) => {
      PointE.set(electricity.posEnd, ...mPos);
      const r = Point.distance(electricity.posStart, electricity.posEnd);
      if (r < 400) {
        //for (let i = 0; i < 10; i++) {
        if (Math.random() > 0.7) {
          const spark = new Spark(
            electricity.posStart,
            2 + Math.random() * 14,
            Math.random() * 2 * Math.PI,
            25 + Math.random() * 25,
            2 + 3 * Math.random()
          );
          spark.setColor([0, 1, 0.5, 1.0], [0.25, 1.0, 1.0, 1.0]);
          particles.push(spark);
        }
        //}
        if (Math.random() > 0.95) {
          electricity.data.init();
        }
        const electricityBufferData = getElectricityBufferData(
          electricity.data,
          electricity.posStart,
          electricity.posEnd,
          r / electricity.data.segmentNum
        );

        electricityBufferData.lineWidths.forEach((el, i, array) => {
          const rate = 1 - Math.pow(Math.min(r / 400, 1), 5);
          if (i % 4 == 0) {
            array[i] *= 0.6 + rate * 0.4;
          }
        });

        buffers.line.positionBufferData.set(electricityBufferData.positions);
        buffers.line.colorBufferData.set(electricityBufferData.colors);
        buffers.line.lineWidthBufferData.set(electricityBufferData.lineWidths);
      } else {
        buffers.line.positionBufferData.set([]);
        buffers.line.colorBufferData.set([]);
        buffers.line.lineWidthBufferData.set([]);
      }
      lineShader.attribLocations.vertexPosition(bufferData.positionBufferData.buffer);

      useFramebufferTexture(gl, framebufferTextures.line);
      if (index == 0) {
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
      }
      lineShader.attribLocations.vertexColor(bufferData.colorBufferData.buffer);
      gl.drawArrays(gl.LINE_STRIP, 0, bufferData.positionBufferData.data.length / 2);

      useFramebufferTexture(gl, framebufferTextures.lineWidth);
      if (index == 0) {
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
      }
      lineShader.attribLocations.vertexColor(bufferData.lineWidthBufferData.buffer);
      gl.drawArrays(gl.LINE_STRIP, 0, bufferData.positionBufferData.data.length / 2);
    });

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

    useFramebufferTexture(gl, framebufferTextures.line);
    lineShader.attribLocations.vertexColor(bufferData.colorBufferData.buffer);
    gl.drawArrays(gl.LINES, 0, bufferData.positionBufferData.data.length / 2);

    useFramebufferTexture(gl, framebufferTextures.lineWidth);
    lineShader.attribLocations.vertexColor(bufferData.lineWidthBufferData.buffer);
    gl.drawArrays(gl.LINES, 0, bufferData.positionBufferData.data.length / 2);
  }

  {
    const bufferData = buffers.face;
    const lineWidthShader = programInfos.lineWidthShader;
    gl.useProgram(lineWidthShader.program);
    lineWidthShader.attribLocations.vertexPosition(bufferData.positionBufferData.buffer);
    lineWidthShader.attribLocations.textureCoord(bufferData.textureCoordinatesBufferData.buffer);
    lineWidthShader.uniformLocations.flipY(1);
    lineWidthShader.uniformLocations.sampler(framebufferTextures.line.texture);
    lineWidthShader.uniformLocations.lineWidthSampler(framebufferTextures.lineWidth.texture);
    lineWidthShader.uniformLocations.size(size);

    useFramebufferTexture(gl, framebufferTextures.glow);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLE_STRIP, bufferData.indicesBufferData.length, gl.UNSIGNED_BYTE, 0);
  }

  {
    const bufferData = buffers.face;
    const glowShader = programInfos.glowShader;
    gl.useProgram(glowShader.program);
    glowShader.attribLocations.vertexPosition(bufferData.positionBufferData.buffer);
    glowShader.attribLocations.textureCoord(bufferData.textureCoordinatesBufferData.buffer);
    glowShader.uniformLocations.flipY(1);
    glowShader.uniformLocations.sampler(framebufferTextures.glow.texture);
    glowShader.uniformLocations.size(size);

    setFramebuffer(gl, null, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 0.1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    glowShader.uniformLocations.flipY(-1);

    gl.drawElements(gl.TRIANGLE_STRIP, bufferData.indicesBufferData.length, gl.UNSIGNED_BYTE, 0);
  }
}
