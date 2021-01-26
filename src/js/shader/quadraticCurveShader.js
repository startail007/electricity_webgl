import { initShaderProgram, attribFuns, uniformFuns, shaderProgramFun } from "../glSupply";
import vs from "../../shader/screen.vs";
import fs from "../../shader/quadraticCurve.fs";
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
      time: uniformFuns.uniform1f(gl, shaderProgram, "uTime"),
      startPos: uniformFuns.uniform2fv(gl, shaderProgram, "uStartPos"),
      controlPos: uniformFuns.uniform2fv(gl, shaderProgram, "uControlPos"),
      endPos: uniformFuns.uniform2fv(gl, shaderProgram, "uEndPos"),
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
