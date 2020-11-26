import {
  arrayBufferData,
  elementArrayBufferData,
  createFramebufferTexture,
  getViewData,
  useTexture,
  loadTexture,
} from "../js/glSupply";
import { Vector, VectorE } from "../js/vector";
import noisePerlinShader from "../js/shader/noisePerlinShader";
import noiseSimplexShader from "../js/shader/noiseSimplexShader";
import noiseValueShader from "../js/shader/noiseValueShader";
import noiseWorleyShader from "../js/shader/noiseWorleyShader";
import noisePerlin3DShader from "../js/shader/noisePerlin3DShader";
import viewShader from "../js/shader/viewShader";
import image from "./image.jpg";

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
  /*const gl = canvas.getContext("webgl", {
    //premultipliedAlpha: false,
    alpha: false,
  });
  if (!gl) {
    alert("無法初始化WebGL。您的瀏覽器或機器可能不支持它。");
    return;
  }*/
  const options = {
    //premultipliedAlpha: false,
    alpha: false,
    //antialias: true,
  };
  let gl = canvas.getContext("webgl2", options);
  let isWebGL2 = true;
  if (!gl) {
    gl = canvas.getContext("webgl", options) || canvas.getContext("experimental-webgl", options);
    isWebGL2 = false;
  }
  if (!gl) {
    alert("無法初始化WebGL。您的瀏覽器或機器可能不支持它。");
    return;
  }
  //著色器資料
  const programInfos = {
    //noiseShader: noiseShader(gl, require("../shader/screen.vs"), require("../shader/noise.fs")),
    noisePerlinShader: noisePerlinShader(gl),
    noiseSimplexShader: noiseSimplexShader(gl),
    noiseValueShader: noiseValueShader(gl),
    noiseWorleyShader: noiseWorleyShader(gl),
    noisePerlin3DShader: noisePerlin3DShader(gl),
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
    noise: createFramebufferTexture(gl),
    noisePerlin3D: createFramebufferTexture(gl),
  };

  const noiseTexture = [
    [
      { framebufferTexture: framebufferTextures.noisePerlin, shaderProgram: programInfos.noisePerlinShader, type: 1 },
      {
        framebufferTexture: framebufferTextures.fbm_noisePerlin,
        shaderProgram: programInfos.noisePerlinShader,
        type: 2,
      },
      {
        framebufferTexture: framebufferTextures.fbm_abs_noisePerlin,
        shaderProgram: programInfos.noisePerlinShader,
        type: 3,
      },
    ],
    [
      { framebufferTexture: framebufferTextures.noiseSimplex, shaderProgram: programInfos.noiseSimplexShader, type: 1 },
      {
        framebufferTexture: framebufferTextures.fbm_noiseSimplex,
        shaderProgram: programInfos.noiseSimplexShader,
        type: 2,
      },
      {
        framebufferTexture: framebufferTextures.fbm_abs_noiseSimplex,
        shaderProgram: programInfos.noiseSimplexShader,
        type: 3,
      },
    ],
    [
      { framebufferTexture: framebufferTextures.noiseValue, shaderProgram: programInfos.noiseValueShader, type: 1 },
      {
        framebufferTexture: framebufferTextures.fbm_noiseValue,
        shaderProgram: programInfos.noiseValueShader,
        type: 2,
      },
      {
        framebufferTexture: framebufferTextures.fbm_abs_noiseValue,
        shaderProgram: programInfos.noiseValueShader,
        type: 3,
      },
    ],
    [
      { framebufferTexture: framebufferTextures.noiseWorley, shaderProgram: programInfos.noiseWorleyShader, type: 1 },
      {
        framebufferTexture: framebufferTextures.fbm_noiseWorley,
        shaderProgram: programInfos.noiseWorleyShader,
        type: 2,
      },
      {
        framebufferTexture: framebufferTextures.fbm_abs_noiseWorley,
        shaderProgram: programInfos.noiseWorleyShader,
        type: 3,
      },
    ],
  ];

  init(gl, programInfos, buffers, textures, { framebufferTextures, size, noiseTexture });
  let time = 0;
  function render(now) {
    const delta = (now - time) * 0.001;
    time = now;
    //console.log(1 / delta);
    requestAnimationFrame(render);
    //console.log(mPos);
    drawScene(gl, programInfos, buffers, textures, { now, delta, mPos, framebufferTextures, size, noiseTexture });
  }
  requestAnimationFrame(render);
}

function init(gl, programInfos, buffers, textures, datas) {
  const { framebufferTextures, size, noiseTexture } = datas;

  const bufferData = buffers.face;
  for (let j = 0; j < 6; j++) {
    if (noiseTexture[j]) {
      for (let i = 0; i < 6; i++) {
        if (noiseTexture[j][i]) {
          const shaderProgram = noiseTexture[j][i].shaderProgram;
          shaderProgram.use();
          const view = getViewData([i / 6, j / 6, (i + 1) / 6, (j + 1) / 6]);
          bufferData.positionBufferData.set(view);
          shaderProgram.attribSet({
            vertexPosition: bufferData.positionBufferData.buffer,
            textureCoord: bufferData.textureCoordinatesBufferData.buffer,
          });
          shaderProgram.uniformSet({
            size: size,
            grid: [12, 12],
            type: noiseTexture[j][i].type,
            pos: [0, 0],
            flipY: 1,
            loop: [0, 0],
          });
          useTexture(gl, framebufferTextures.noise, i + j == 0);
          shaderProgram.draw(bufferData.indicesBufferData.length);
        }
      }
    }
  }
  bufferData.positionBufferData.set(getViewData([0, 0, 1, 1]));
}
function drawScene(gl, programInfos, buffers, textures, datas) {
  const { now, framebufferTextures, mPos, size, noiseTexture } = datas;

  {
    const bufferData = buffers.face;
    const shaderProgram = programInfos.noisePerlin3DShader;
    shaderProgram.use();
    shaderProgram.attribSet({
      vertexPosition: bufferData.positionBufferData.buffer,
      textureCoord: bufferData.textureCoordinatesBufferData.buffer,
    });
    shaderProgram.uniformSet({
      size: size,
      depth: 500,
      grid: [20, 20, 20],
      type: 1,
      pos: [0, 0, now * 0.00005],
      flipY: 1,
      loop: [20, 20, 20],
      sampler: textures.image,
    });
    useTexture(gl, framebufferTextures.noisePerlin3D);
    shaderProgram.draw(bufferData.indicesBufferData.length);
  }

  {
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
    bufferData.textureCoordinatesBufferData.set(getViewData([0, 0, 1, 1]));

    {
      bufferData.positionBufferData.set(getViewData([0, 0, 1, 1]));

      shaderProgram.uniformSet({
        sampler: framebufferTextures.noise.texture,
      });
      shaderProgram.draw(bufferData.indicesBufferData.length);
    }

    {
      bufferData.positionBufferData.set(getViewData([0.5, 0, 1, 0.5]));

      shaderProgram.uniformSet({
        sampler: framebufferTextures.noisePerlin3D.texture,
      });
      shaderProgram.draw(bufferData.indicesBufferData.length);
    }
  }
}
