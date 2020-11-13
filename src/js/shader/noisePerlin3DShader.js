import { initShaderProgram, useFramebufferTexture, attribFuns, uniformFuns, shaderProgramFun } from "../glSupply";
import vs from "../../shader/screen.vs";
import fs from "../../shader/noisePerlin3D.fs";
const shader = (gl, vs, fs) => {
  const shaderProgram = initShaderProgram(gl, vs, fs);
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: attribFuns.attribFloat(gl, shaderProgram, "aVertexPosition", 2),
      textureCoord: attribFuns.attribFloat(gl, shaderProgram, "aTextureCoord", 2),
    },
    uniformLocations: {
      flipY: uniformFuns.uniform1f(gl, shaderProgram, "uFlipY"),
      size: uniformFuns.uniform2fv(gl, shaderProgram, "uSize"),
      depth: uniformFuns.uniform1f(gl, shaderProgram, "uDepth"),
      grid: uniformFuns.uniform3fv(gl, shaderProgram, "uGrid"),
      pos: uniformFuns.uniform3fv(gl, shaderProgram, "uPos"),
      type: uniformFuns.uniform1i(gl, shaderProgram, "uType"),
    },
  };
  return programInfo;
};
export default (gl) => {
  return Object.assign(shaderProgramFun(gl, shader, vs, fs), {
    draw(gl, length) {
      gl.drawElements(gl.TRIANGLE_STRIP, length, gl.UNSIGNED_BYTE, 0);
    },
  });
};
