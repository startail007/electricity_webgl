import { initShaderProgram, attribFuns, uniformFuns, shaderProgramFun } from "../glSupply";
import vs from "../../shader/electricityBranchModel.vs";
import fs from "../../shader/electricityBranchModel.fs";
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
      modelViewMatrix: uniformFuns.uniformMatrix4fv(gl, shaderProgram, "uModelViewMatrix"),
      noiseSampler: uniformFuns.uniformTexture(gl, shaderProgram, "uNoiseSampler", 0),
      gradientColorSampler: uniformFuns.uniformTexture(gl, shaderProgram, "uGradientColorSampler", 1),
      mouse: uniformFuns.uniform2fv(gl, shaderProgram, "uMouse"),
      length: uniformFuns.uniform1f(gl, shaderProgram, "uLength"),
      time: uniformFuns.uniform1f(gl, shaderProgram, "uTime"),
      density: uniformFuns.uniform2fv(gl, shaderProgram, "uDensity"),
      fixed: uniformFuns.uniform2fv(gl, shaderProgram, "uFixed"),
      radius: uniformFuns.uniform2fv(gl, shaderProgram, "uRadius"),
      thickness: uniformFuns.uniform2fv(gl, shaderProgram, "uThickness"),
      offset: uniformFuns.uniform1f(gl, shaderProgram, "uOffset"),
      power: uniformFuns.uniform1f(gl, shaderProgram, "uPower"),

      wireframe: uniformFuns.uniform1i(gl, shaderProgram, "uWireframe"),
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
