import { initShaderProgram, attribFuns, uniformFuns, shaderProgramFun } from "../../js/glSupply";
import vs from "./composite.vs";
import fs from "./composite.fs";
const shader = (gl, vs, fs) => {
  const shaderProgram = initShaderProgram(gl, vs, fs);
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: attribFuns.attribFloat(gl, shaderProgram, "aVertexPosition", 2),
      textureCoord: attribFuns.attribFloat(gl, shaderProgram, "aTextureCoord", 2),
    },
    uniformLocations: {
      projectionMatrix: uniformFuns.uniformMatrix4fv(gl, shaderProgram, "uProjectionMatrix"),
      flipY: uniformFuns.uniform1f(gl, shaderProgram, "uFlipY"),
      glowSampler: uniformFuns.uniformTexture(gl, shaderProgram, "uGlowSampler", 0),
      sampler: uniformFuns.uniformTexture(gl, shaderProgram, "uSampler", 1),
      size: uniformFuns.uniform2fv(gl, shaderProgram, "uSize"),
      time: uniformFuns.uniform1f(gl, shaderProgram, "uTime"), //時間
    },
  };
  return programInfo;
};

export default (gl) => {
  return Object.assign(shaderProgramFun(gl, shader, vs, fs), {
    draw(length) {
      gl.drawElements(gl.TRIANGLES, length, gl.UNSIGNED_BYTE, 0);
    },
  });
};
