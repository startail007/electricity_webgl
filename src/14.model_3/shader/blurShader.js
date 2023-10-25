import { initShaderProgram, attribFuns, uniformFuns, shaderProgramFun } from "../../js/glSupply";
import vs from "./blur.vs";
import fs from "./blur.fs";
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
      sampler: uniformFuns.uniformTexture(gl, shaderProgram, "uSampler", 0),
      size: uniformFuns.uniform2fv(gl, shaderProgram, "uSize"),
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
