import { mat4 } from "gl-matrix";
import noise from "./noise.jpg";
import gradientColor from "./gradientColor.jpg";
import thicknessScale from "./thicknessScale.jpg";
import Electricity from "./electricity";
import Text from "./text";
import { loadTexture, createFramebufferTexture, useTexture } from "../js/glSupply";
import { Vector, VectorE, getQuadraticCurveInfo, getCubicCurveInfo } from "../js/vector";
import { getTextData, getNearestDistance } from "./funs";
import Blur from "./blur";
import Composite from "./composite";
const main = () => {
  const fps = document.getElementById("fps");
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

  const { posListG, normalListG } = getTextData("POWER", "bold 120px Courier New");
  const text01_posListG = posListG;
  const text01_normalListG = normalListG;
  const text01 = new Text(gl);
  text01.setText(gl, "POWER", "bold 120px Courier New");
  text01.pos = [gl.canvas.width * 0.5 - text01.width * 0.5, gl.canvas.height * 0.5 - text01.height * 0.5];

  const blur01 = new Blur(gl);
  const composite01 = new Composite(gl);
  //著色器資料
  const programInfos = {};
  //緩衝資料
  const buffers = {};
  //貼圖
  const textures = {
    noise: loadTexture(gl, noise),
    gradientColor: loadTexture(gl, gradientColor),
    thicknessScale: loadTexture(gl, thicknessScale),
  };
  //滑鼠位置
  // const mPos = [gl.canvas.width * 0.5, gl.canvas.height * 0.5];
  const mPos = [0, 0];
  const nearestPos = [0, 0];
  let nearestInfo = null;
  const pList = [];

  const size = [gl.canvas.clientWidth, gl.canvas.clientHeight];
  const framebufferTextures = {
    text: createFramebufferTexture(gl),
    blur: createFramebufferTexture(gl),
    // blurs: [createFramebufferTexture(gl), createFramebufferTexture(gl)],
  };
  canvas.addEventListener("mousemove", (ev) => {
    VectorE.set(mPos, ev.offsetX, ev.offsetY);
    const info = getNearestDistance(Vector.sub(mPos, text01.pos), text01_posListG);
    //const len = Vector.distance(mPos, [400, 300]);
    if (info.r >= 200 || (nearestInfo && info.i !== nearestInfo.i)) {
      const list = pList.filter((el) => el.group === "my" && !el.removeState);
      list.forEach((el) => {
        el.remove();
      });
    } else if (info.r <= 150) {
      VectorE.set(nearestPos, ...Vector.add(text01_posListG[info.i][info.j], text01.pos));
      const list = pList.filter((el) => el.group === "my" && !el.removeState);
      if (list.length <= 0) {
        const electricity = new Electricity(gl, getQuadraticCurveInfo, {
          group: "my",
          t: 0,
          tMax: 1.5,
          flow: true,
          expand: 140,
          pointList: [[...nearestPos], [...mPos], [...mPos]],
          textures: {
            noise: textures.noise,
            gradientColor: textures.gradientColor,
            thicknessScale: textures.thicknessScale,
          },
        });
        electricity.onUpdate((el, delta) => {
          const [p0, p1, p2] = el.options.pointList;
          const len = Vector.distance(p0, p2);
          const radius = Math.min(Math.max(len - 30, 5), 40);
          const power = Math.min(Math.max((500 - len) / len, 0.5), 1.5);
          el.radius = [radius, radius * 0.8];
          el.power = power;
          if (!el.removeState) {
            VectorE.set(p0, ...nearestPos);
          }

          el.options.n = Math.min(Math.max(Math.floor(Vector.distance(p0, mPos) / 8), 3), 30);
          //VectorE.set(p2, ...Vector.mix(p2, mPos, 0.5));
          //VectorE.set(p1, ...Vector.mix(p1, Vector.mix(p0, p2, 0.65), 0.075));

          VectorE.set(p2, ...Vector.mix(p2, mPos, 0.5));
          VectorE.set(p1, ...Vector.mix(p1, Vector.mix(p0, p2, 0.5), 0.25));
        });
        pList.push(electricity);
      }
    }
    nearestInfo = info;
  });

  // const i = 0;
  // const j = 0;
  // const p0 = Vector.add(text01_posListG[i][j], text01.pos);
  // const p3 = Vector.add(text01_posListG[i][j + 50], text01.pos);
  // const p1 = Vector.add(p0, Vector.scale(text01_normalListG[i][j + 25], 20));
  // const p2 = Vector.add(p3, Vector.scale(text01_normalListG[i][j + 25], 20));
  // const electricity = new Electricity(gl, getCubicCurveInfo, {
  //   pointList: [p0, p1, p2, p3],
  //   density: [1, 1],
  //   thickness: [3, 3],
  //   borderPower: [6, 6],
  //   expand: 40,
  //   sub: false,
  //   radius: [20, 20],
  //   n: 40,
  //   textures: {
  //     noise: textures.noise,
  //     gradientColor: textures.gradientColor,
  //     thicknessScale: textures.thicknessScale,
  //   },
  // });
  // pList.push(electricity);

  init(gl, programInfos, buffers, textures, {
    framebufferTextures,
    size,
  });
  let time = Date.now();
  function render(t) {
    const now = Date.now();
    const delta = (now - time) * 0.001;
    fps.textContent = Math.round(1 / delta);
    time = now;
    //console.log(1 / delta);
    requestAnimationFrame(render);
    //console.log(mPos);
    drawScene(gl, programInfos, buffers, textures, {
      now: t,
      delta,
      mPos,
      framebufferTextures,
      size,
      pList,
      text01,
      blur01,
      composite01,
    });
  }
  requestAnimationFrame(render);
};

const init = (gl, programInfos, buffers, textures, datas) => {
  const { framebufferTextures, size } = datas;
};

const drawScene = (gl, programInfos, buffers, textures, datas) => {
  const { now, delta, framebufferTextures, mPos, size, pList, text01, blur01, composite01 } = datas;

  const projectionMatrix = mat4.create();
  mat4.ortho(projectionMatrix, 0, gl.canvas.clientWidth, gl.canvas.clientHeight, 0, 0.1, 100);
  mat4.translate(projectionMatrix, projectionMatrix, [0.0, 0.0, -1.0]);

  gl.enable(gl.CULL_FACE);
  gl.enable(gl.BLEND);
  //gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clearDepth(1.0);
  //gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.clear(gl.COLOR_BUFFER_BIT);
  // {
  //   gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  //   text01.update(delta);
  //   text01.draw(gl, projectionMatrix);
  // }
  {
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // text01.update(delta);
    text01.draw(gl, projectionMatrix, { framebufferTexture: framebufferTextures.text });
  }
  {
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    blur01.draw(gl, projectionMatrix, {
      texture: framebufferTextures.text.texture,
      pos: [0, 0],
      width: gl.canvas.width,
      height: gl.canvas.height,
      framebufferTexture: framebufferTextures.blur,
    });
  }
  {
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    composite01.draw(gl, projectionMatrix, {
      glowTexture: framebufferTextures.blur.texture,
      texture: framebufferTextures.text.texture,
      pos: [0, 0],
      width: gl.canvas.width,
      height: gl.canvas.height,
      now,
    });
  }

  {
    gl.blendFunc(gl.ONE, gl.ONE);
    for (let i = 0; i < pList.length; i++) {
      const el = pList[i];
      el.update(delta);
      el.draw(gl, projectionMatrix, { now });
    }

    for (let i = 0; i < pList.length; i++) {
      const el = pList[i];
      if (el.confirmRemove) {
        pList.splice(i, 1);
      }
    }
  }
};
main();
