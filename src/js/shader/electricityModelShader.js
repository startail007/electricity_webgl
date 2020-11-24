import { initShaderProgram, useFramebufferTexture, attribFuns, uniformFuns, shaderProgramFun } from "../glSupply";
import vs from "../../shader/electricityModel.vs";
import fs from "../../shader/electricityModel.fs";
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
      sampler: uniformFuns.uniformTexture(gl, shaderProgram, "uSampler", 0),
      mouse: uniformFuns.uniform2fv(gl, shaderProgram, "uMouse"),
      length: uniformFuns.uniform1f(gl, shaderProgram, "uLength"),
      time: uniformFuns.uniform1f(gl, shaderProgram, "uTime"),
      startDensity: uniformFuns.uniform1f(gl, shaderProgram, "uStartDensity"),
      endDensity: uniformFuns.uniform1f(gl, shaderProgram, "uEndDensity"),
      startFixed: uniformFuns.uniform1f(gl, shaderProgram, "uStartFixed"),
      endFixed: uniformFuns.uniform1f(gl, shaderProgram, "uEndFixed"),
      startRadius: uniformFuns.uniform1f(gl, shaderProgram, "uStartRadius"),
      endRadius: uniformFuns.uniform1f(gl, shaderProgram, "uEndRadius"),
      lineWidth: uniformFuns.uniform1f(gl, shaderProgram, "ulineWidth"),
    },
  };
  return programInfo;
};
export default (gl) => {
  return Object.assign(shaderProgramFun(gl, shader, vs, fs), {
    draw(length) {
      gl.drawElements(gl.TRIANGLES, length, gl.UNSIGNED_INT, 0);
      //gl.drawElements(gl.TRIANGLES, length, gl.UNSIGNED_SHORT, 0);
      //gl.drawElements(gl.TRIANGLES, length, gl.UNSIGNED_BYTE, 0);

      //gl.drawArrays(gl.TRIANGLES, 0, length);
    },
  });
};
