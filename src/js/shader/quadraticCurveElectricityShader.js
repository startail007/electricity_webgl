import { initShaderProgram, useFramebufferTexture, attribFuns, uniformFuns, shaderProgramFun } from "../glSupply";
import vs from "../../shader/screen.vs";
import fs from "../../shader/quadraticCurveElectricity.fs";
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
      time: uniformFuns.uniform1f(gl, shaderProgram, "uTime"),
      size: uniformFuns.uniform2fv(gl, shaderProgram, "uSize"),
      startPos: uniformFuns.uniform2fv(gl, shaderProgram, "uStartPos"),
      controlPos: uniformFuns.uniform2fv(gl, shaderProgram, "uControlPos"),
      endPos: uniformFuns.uniform2fv(gl, shaderProgram, "uEndPos"),
      offsetBool: uniformFuns.uniform1i(gl, shaderProgram, "uOffsetBool"),
      lineSrcRate: uniformFuns.uniform1f(gl, shaderProgram, "uLineSrcRate"),
      lineTargetPos: uniformFuns.uniform2fv(gl, shaderProgram, "uLineTargetPos"),
      lineWidth: uniformFuns.uniform1f(gl, shaderProgram, "uLineWidth"),
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
