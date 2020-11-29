import {
  arrayBufferData,
  elementArrayBufferData,
  createFramebufferTexture,
  getViewData,
  loadTexture,
  useTexture,
} from "../js/glSupply";
import { Vector, VectorE } from "../js/vector";
import electricityShader from "../js/shader/electricityShader";
import quadraticCurveElectricityShader from "../js/shader/quadraticCurveElectricityShader";
import viewShader from "../js/shader/viewShader";
import blurShader from "../js/shader/blurShader";
import addShader from "../js/shader/addShader";
import image from "./image.jpg";
import {
  getTextData,
  getNearestDistance,
  createElectricityData,
  resetElectricityData,
  getListGIndex,
  getListGPosSlide,
  getOffset,
  getLineSlide,
} from "./funs";

const faceBuffers = (gl) => {
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
};

const main = () => {
  const canvas = document.querySelector("#glcanvas");
  const options = {
    //premultipliedAlpha: false,
    alpha: false,
    //antialias: true,
  };
  //const gl = canvas.getContext("webgl", options);
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
  const text = "POWER";
  const textFont = "bold 100px Courier New";
  const textData = getTextData(text, textFont);
  const textPos = [gl.canvas.width * 0.5 - textData.width * 0.5, gl.canvas.height * 0.5 - textData.height * 0.5];

  //著色器資料
  const programInfos = {
    electricityShader: electricityShader(gl),
    quadraticCurveElectricityShader: quadraticCurveElectricityShader(gl),
    viewShader: viewShader(gl),
    blurShader: blurShader(gl),
    addShader: addShader(gl),
  };
  //緩衝資料
  const buffers = {
    face: faceBuffers(gl),
    view: faceBuffers(gl),
  };
  //貼圖
  const textures = { text: loadTexture(gl, textData.base64), image: loadTexture(gl, image) };
  //滑鼠位置
  const mPos = [gl.canvas.width * 0.5, gl.canvas.height * 0.5];

  canvas.addEventListener("mousemove", (ev) => {
    VectorE.set(mPos, ev.pageX, ev.pageY);
  });

  const size = [gl.canvas.clientWidth, gl.canvas.clientHeight];
  const framebufferTextures = {
    text: createFramebufferTexture(gl),
    blurs: [createFramebufferTexture(gl), createFramebufferTexture(gl)],
  };
  const electricityRangeList = [
    {
      active: true,
      start: { type: "pos", pos: [0, 0] },
      end: { type: "text", range: "20~40", seed: "0~100" },
      lineWidth: 3,
      lifeTime: "50~100",
      offset: "0.05~0.2",
    },
    {
      active: true,
      start: { type: "sub", src: 0, rate: "0.5~0.95", range: "0.1~0.4", seed: "0~100" },
      end: { type: "text", range: "10~40", seed: "0~100" },
      lineWidth: "0.4~0.6",
      lifeTime: "25~50",
      offset: "0.1~0.25",
    },
    {
      active: true,
      start: { type: "sub", src: 0, rate: "0.5~0.95", range: "0.1~0.4", seed: "0~100" },
      end: { type: "text", range: "10~40", seed: "0~100" },
      lineWidth: "0.4~0.6",
      lifeTime: "25~50",
      offset: "0.1~0.25",
    },
    {
      active: true,
      start: { type: "sub", src: 0, rate: "0~1", range: "0.1~0.4", seed: "0~100" },
      end: { type: "sub", src: 0, rate: "0~1", range: "0.1~0.4", seed: "0~100" },
      lineWidth: "0.5~0.8",
      lifeTime: "25~50",
      offset: "-1~1",
    },
  ];
  for (let i = 0; i < textData.posListG.length; i++) {
    const count = Math.ceil(textData.posListG[i].length / 200) + 1;
    for (let j = 0; j < count; j++) {
      electricityRangeList.push({
        active: true,
        start: { type: "text", index: { array: textData.posListG, i: i }, range: "5~10", seed: "0~100" },
        end: {
          type: "text",
          index: { array: textData.posListG, unite: true, uniteRange: "10~40", i: i },
          range: "5~10",
          seed: "0~100",
        },
        lineWidth: "0.25~0.75",
        lifeTime: "40~80",
        offset: "0.2~0.8",
      });
    }
  }

  const electricityList = electricityRangeList.map((el, index, array) => {
    return createElectricityData(el, index, array);
  });

  init(gl, programInfos, buffers, textures, {
    framebufferTextures,
    size,
    textData,
    textPos,
    electricityRangeList,
    electricityList,
  });
  let time = 0;
  function render(now) {
    const delta = (now - time) * 0.001;
    time = now;
    //console.log(1 / delta);
    requestAnimationFrame(render);
    //console.log(mPos);
    drawScene(gl, programInfos, buffers, textures, {
      now,
      delta,
      mPos,
      framebufferTextures,
      size,
      textData,
      textPos,
      electricityRangeList,
      electricityList,
    });
  }
  requestAnimationFrame(render);
};
const init = (gl, programInfos, buffers, textures, datas) => {
  const { framebufferTextures, size, textData, textPos, electricityRangeList, electricityList } = datas;
  electricityList.forEach((el, index, array) => {
    resetElectricityData(el, index, array, electricityRangeList[index]);
  });
  console.log(electricityList);
};
const drawScene = (gl, programInfos, buffers, textures, datas) => {
  const { now, framebufferTextures, mPos, size, textData, textPos, electricityRangeList, electricityList } = datas;
  /*gl.enable(gl.CULL_FACE);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.enable(gl.BLEND);
  gl.blendEquation(gl.FUNC_ADD);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);*/

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  //gl.blendFunc(gl.ONE, gl.ONE);
  {
    const bufferData = buffers.view;
    const shaderProgram = programInfos.viewShader;
    shaderProgram.use();
    shaderProgram.attribSet({
      vertexPosition: bufferData.positionBufferData.buffer,
      textureCoord: bufferData.textureCoordinatesBufferData.buffer,
    });
    shaderProgram.uniformSet({
      flipY: 1,
    });
    useTexture(gl, framebufferTextures.text);
    bufferData.textureCoordinatesBufferData.set(getViewData([0, 0, 1, 1]));

    {
      const x = textPos[0] / gl.canvas.width;
      const y = textPos[1] / gl.canvas.height;
      bufferData.positionBufferData.set(
        getViewData([x, y, x + textures.text.width / gl.canvas.width, y + textures.text.height / gl.canvas.height])
      );

      shaderProgram.uniformSet({
        sampler: textures.text,
      });
      shaderProgram.draw(bufferData.indicesBufferData.length);
    }
  }

  {
    const bufferData = buffers.face;
    const shaderProgram = programInfos.blurShader;
    shaderProgram.use();
    shaderProgram.attribSet({
      vertexPosition: bufferData.positionBufferData.buffer,
      textureCoord: bufferData.textureCoordinatesBufferData.buffer,
    });
    shaderProgram.uniformSet({
      size: size,
      flipY: 1,
      sampler: framebufferTextures.text.texture,
      width: 10,
      power: 0.2,
      dir: [0.7071, 0.7071],
    });
    useTexture(gl, framebufferTextures.blurs[0]);
    shaderProgram.draw(bufferData.indicesBufferData.length);

    shaderProgram.uniformSet({
      sampler: framebufferTextures.blurs[0].texture,
      dir: [0.7071, -0.7071],
    });
    useTexture(gl, framebufferTextures.blurs[1]);
    shaderProgram.draw(bufferData.indicesBufferData.length);
  }

  useTexture(gl);
  {
    const bufferData = buffers.face;
    const shaderProgram = programInfos.addShader;
    shaderProgram.use();
    shaderProgram.attribSet({
      vertexPosition: bufferData.positionBufferData.buffer,
      textureCoord: bufferData.textureCoordinatesBufferData.buffer,
    });
    shaderProgram.uniformSet({
      flipY: -1,
      samplerA: framebufferTextures.text.texture,
      samplerB: framebufferTextures.blurs[1].texture,
    });
    shaderProgram.draw(bufferData.indicesBufferData.length);
  }
  //const indexData = getNearestDistance(Vector.sub(mPos, textPos), textData.posListG);
  {
    const bufferData = buffers.face;
    const shaderProgram = programInfos.electricityShader;
    shaderProgram.use();
    shaderProgram.attribSet({
      vertexPosition: bufferData.positionBufferData.buffer,
      textureCoord: bufferData.textureCoordinatesBufferData.buffer,
    });
    shaderProgram.uniformSet({
      //sampler: textures.image,
      size: size,
      time: now * 0.001,
      flipY: -1,
    });
    gl.blendFunc(gl.ONE, gl.ONE);
    const startPos = [100, 200];
    const endPos = [100, 500];
    shaderProgram.uniformSet({
      startPos: startPos,
      endPos: endPos,
      lineWidth: 2,
      branchBool: false,
      offset: 0,
    });
    shaderProgram.draw(bufferData.indicesBufferData.length);
    shaderProgram.uniformSet({
      branchBool: true,
      branchStartPos: Vector.mix(startPos, endPos, 0.6666),
      branchEndPos: [200, 480],
      lineWidth: 0.5,
      branchOffset: -1,
      startFixed: false,
      endFixed: true,
    });
    shaderProgram.draw(bufferData.indicesBufferData.length);

    shaderProgram.uniformSet({
      branchBool: true,
      branchStartPos: Vector.mix(startPos, endPos, 0.3333),
      branchEndPos: [200, 200],
      lineWidth: 0.5,
      branchOffset: 1,
      startFixed: false,
      endFixed: true,
    });
    shaderProgram.draw(bufferData.indicesBufferData.length);

    /*electricityList.forEach((el, index, array) => {
      if (el.lifeTimeMax) {
        el.lifeTime--;
        if (el.lifeTime <= 0) {
          resetElectricityData(el, index, array, electricityRangeList[index]);
        }
      }
    });

    const indexData = getNearestDistance(Vector.sub(mPos, textPos), textData.posListG);
    electricityList[0].active = indexData.i != -1;
    VectorE.set(electricityList[0].start.pos, ...mPos);
    VectorE.set(electricityList[0].end.index, indexData.i, indexData.j);
    VectorE.set(electricityList[1].end.index, ...getListGIndex(textData.posListG, [indexData.i, indexData.j], -10));
    VectorE.set(electricityList[2].end.index, ...getListGIndex(textData.posListG, [indexData.i, indexData.j], 10));

    electricityList.forEach((el, index, array) => {
      if (el.active) {
        const el0 = el.start.src == undefined ? el : array[el.start.src];
        const startPos = el0.start.pos || getListGPosSlide(textData.posListG, el0.start, textPos, now * 0.005);
        const endPos = el0.end.pos || getListGPosSlide(textData.posListG, el0.end, textPos, now * 0.005);

        shaderProgram.uniformSet({
          startPos: startPos,
          endPos: endPos,
          branchBool: false,
          startFixed: true,
          endFixed: true,
        });

        shaderProgram.uniformSet({
          offset: el0.offset * getOffset(el0, textData.normalListG, Vector.sub(endPos, startPos)),
          lineWidth: el.lineWidth,
        });
        if (el.start.src != undefined || el.end.src != undefined) {
          const branchStartPos =
            el.start.src != undefined
              ? getLineSlide(el.start, startPos, endPos, el.start.rate, now * 0.005)
              : el.start.pos || getListGPosSlide(textData.posListG, el.start, textPos, now * 0.005);
          const branchEndPos =
            el.end.src != undefined
              ? getLineSlide(el.end, startPos, endPos, el.end.rate, now * 0.005)
              : el.end.pos || getListGPosSlide(textData.posListG, el.end, textPos, now * 0.005);

          shaderProgram.uniformSet({
            branchBool: true,
            branchStartPos: branchStartPos,
            branchEndPos: branchEndPos,
            branchOffset: el.offset * getOffset(el, textData.normalListG, Vector.sub(branchEndPos, branchStartPos)),
            startFixed: el.start.src == undefined,
            endFixed: el.end.src == undefined,
          });
        }
        shaderProgram.draw(bufferData.indicesBufferData.length);
      }
    });*/
  }
};
main();
