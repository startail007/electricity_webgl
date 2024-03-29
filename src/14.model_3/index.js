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
import Spark from "./spark";
import sparkShader from "./shader/sparkShader";
import blurShader from "./shader/blurShader";
import compositeShader from "./shader/compositeShader";
import electricityModelShader from "./shader/electricityModelShader";
import { modelBuffers, faceBuffers } from "../js/model";
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

  //著色器資料
  const programInfos = {
    sparkShader: sparkShader(gl),
    blurShader: blurShader(gl),
    compositeShader: compositeShader(gl),
    electricityModelShader: electricityModelShader(gl),
  };
  //緩衝資料
  const buffers = {
    model: modelBuffers(gl),
    face: faceBuffers(gl),
  };
  //貼圖
  const textures = {
    noise: loadTexture(gl, noise),
    gradientColor: loadTexture(gl, gradientColor),
    thicknessScale: loadTexture(gl, thicknessScale),
  };

  const textStr = "POWER";
  const { posListG, normalListG } = getTextData(textStr, "bold 120px Courier New");
  const text01_posListG = posListG;
  const text01_normalListG = normalListG;
  const text01 = new Text(gl);
  text01.setText(gl, textStr, "bold 120px Courier New");
  text01.pos = [gl.canvas.width * 0.5 - text01.width * 0.5, gl.canvas.height * 0.5 - text01.height * 0.5];

  const blur01 = new Blur(gl, {
    bufferData: buffers.face,
    shader: programInfos.blurShader,
  });
  const composite01 = new Composite(gl, {
    bufferData: buffers.face,
    shader: programInfos.compositeShader,
  });
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
  const particles = [];
  canvas.addEventListener("mousemove", (ev) => {
    VectorE.set(mPos, ev.offsetX, ev.offsetY);
    const info = getNearestDistance(Vector.sub(mPos, text01.pos), text01_posListG);
    //const len = Vector.distance(mPos, [400, 300]);
    if (info.r >= 200 || (nearestInfo && info.i !== nearestInfo.i)) {
      const list = pList.filter((el) => el.group === "main" && !el.removeState);
      list.forEach((el) => {
        el.remove();
      });
    } else if (info.r <= 150) {
      VectorE.set(nearestPos, ...Vector.add(text01_posListG[info.i][info.j], text01.pos));
      const list = pList.filter((el) => el.group === "main" && !el.removeState);
      if (list.length <= 0) {
        const electricity = new Electricity(gl, getQuadraticCurveInfo, {
          group: "main",
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
          shader: programInfos.electricityModelShader,
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

  canvas.addEventListener("mousedown", (ev) => {
    VectorE.set(mPos, ev.pageX, ev.pageY);
    for (let i = 0; i < 100; i++) {
      particles.push(
        new Spark(gl, {
          pos: mPos,
          velocity: 2 + Math.random() * 12,
          direct: Math.random() * 2 * Math.PI,
          lifespan: 0.3 + Math.random() * 0.3,
          thickness: 4 + 3 * Math.random(),
          bufferData: buffers.model,
          shader: programInfos.sparkShader,
          textures: {
            gradientColor: textures.gradientColor,
          },
        })
      );
    }
  });

  const getRandomTextPos = () => {
    const ii = Math.floor(Math.random() * text01_posListG.length);
    const jj = Math.floor(Math.random() * text01_posListG[ii].length);
    return [ii, jj];
  };
  const addNinor = () => {
    const [ii0, jj0] = getRandomTextPos();
    const [ii1, jj1] = getRandomTextPos();
    const p0 = Vector.add(text01_posListG[ii0][jj0], text01.pos);
    const p3 = Vector.add(text01_posListG[ii1][jj1], text01.pos);
    const len = Vector.distance(p0, p3);
    if (len > 20 && len < 140) {
      const p1 = Vector.add(Vector.mix(p0, p3, 0.25), Vector.scale(text01_normalListG[ii0][jj0], len * 0.1));
      const p2 = Vector.add(Vector.mix(p0, p3, 0.75), Vector.scale(text01_normalListG[ii1][jj1], len * 0.1));
      const electricity = new Electricity(gl, getCubicCurveInfo, {
        group: "minor",
        pointList: [p0, p1, p2, p3],
        density: [0.6, 0.6],
        thickness: [6, 6],
        borderPower: [2, 2],
        expand: 60,
        sub: true,
        radius: [30, 30],
        n: 80,
        t: 0,
        tMax: len / 100,
        flow: true,
        textures: {
          noise: textures.noise,
          gradientColor: textures.gradientColor,
          thicknessScale: textures.thicknessScale,
        },
        shader: programInfos.electricityModelShader,
      });
      electricity.onUpdate((el, delta) => {
        if (el.tRate >= 0.5) {
          el.remove();
        }
      });
      pList.push(electricity);
      return { electricity, normal0: text01_normalListG[ii0][jj0], normal1: text01_normalListG[ii1][jj1] };
    }
  };
  // let count = 0;
  // while (count < 4) {
  //   const bool = addNinor();
  //   if (bool) {
  //     count++;
  //   }
  // }

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
      particles,
      text01_posListG,
      text01_normalListG,
      addNinor,
    });
  }
  requestAnimationFrame(render);
};

const init = (gl, programInfos, buffers, textures, datas) => {
  const { framebufferTextures, size } = datas;
};

const drawScene = (gl, programInfos, buffers, textures, datas) => {
  const {
    now,
    delta,
    framebufferTextures,
    mPos,
    size,
    pList,
    text01,
    blur01,
    composite01,
    particles,
    text01_posListG,
    text01_normalListG,
    addNinor,
  } = datas;

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

  if (Math.random() > 0.8) {
    const ii = Math.floor(Math.random() * text01_posListG.length);
    const jj = Math.floor(Math.random() * text01_posListG[ii].length);
    for (let i = 0; i < Math.random() * 2 + 1; i++) {
      particles.push(
        new Spark(gl, {
          pos: Vector.add(text01_posListG[ii][jj], text01.pos),
          velocity: 2 + Math.random() * 5,
          direct: Vector.getAngle(text01_normalListG[ii][jj]) + 0.1 * (Math.random() - 0.5) * Math.PI,
          lifespan: 0.3 + Math.random() * 0.3,
          thickness: 4 + 3 * Math.random(),
          bufferData: buffers.model,
          shader: programInfos.sparkShader,
          textures: {
            gradientColor: textures.gradientColor,
          },
        })
      );
    }
  }
  if (Math.random() > 0.9) {
    const info = addNinor();
    if (info) {
      const { electricity, normal0, normal1 } = info;
      const [p0, p1, p2, p3] = electricity.options.pointList;
      //console.log(p0, p1, p2, p3);
      for (let i = 0; i < Math.random() * 2 + 2; i++) {
        particles.push(
          new Spark(gl, {
            pos: p0,
            velocity: 2 + Math.random() * 5,
            direct: Vector.getAngle(normal0) + 0.5 * (Math.random() - 0.5) * Math.PI,
            lifespan: 0.5 + Math.random() * 0.5,
            thickness: 4 + 3 * Math.random(),
            bufferData: buffers.model,
            shader: programInfos.sparkShader,
            textures: {
              gradientColor: textures.gradientColor,
            },
          })
        );
      }
      for (let i = 0; i < Math.random() * 2 + 2; i++) {
        particles.push(
          new Spark(gl, {
            pos: p3,
            velocity: 2 + Math.random() * 5,
            direct: Vector.getAngle(normal1) + 0.5 * (Math.random() - 0.5) * Math.PI,
            lifespan: 0.5 + Math.random() * 0.5,
            thickness: 4 + 3 * Math.random(),
            bufferData: buffers.model,
            shader: programInfos.sparkShader,
            textures: {
              gradientColor: textures.gradientColor,
            },
          })
        );
      }
    }
  }
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
      if (el.group == "main") {
        if (el.tRate > 0.4 && el.tRate < 0.6) {
          if (Math.random() > 0.25) {
            const pos = el.options.pointList[0];
            const pos0 = el.options.pointList[1];
            const dir = Vector.sub(pos0, pos);
            const a = Math.atan2(dir[1], dir[0]);
            for (let j = 0; j < 2; j++) {
              particles.push(
                new Spark(gl, {
                  pos: pos,
                  velocity: 2 + Math.random() * 12,
                  direct: a + (Math.random() - 0.5) * Math.PI,
                  lifespan: 0.3 + Math.random() * 0.3,
                  thickness: 4 + 3 * Math.random(),
                  bufferData: buffers.model,
                  shader: programInfos.sparkShader,
                  textures: {
                    gradientColor: textures.gradientColor,
                  },
                })
              );
            }
          }
        }
      }
    }

    for (let i = 0; i < pList.length; i++) {
      const el = pList[i];
      if (el.confirmRemove) {
        pList.splice(i, 1);
      }
    }
  }
  {
    gl.blendFunc(gl.ONE, gl.ONE);
    for (let i = 0; i < particles.length; i++) {
      const el = particles[i];
      el.update(delta);
      if (el.lifeRate <= 0) particles.splice(i, 1);
    }

    for (let i = 0; i < particles.length; i++) {
      const el = particles[i];
      el.draw(gl, projectionMatrix);
    }
  }
};
main();
