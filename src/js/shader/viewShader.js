import { initShaderProgram, useFramebufferTexture, attribFuns, uniformFuns, shaderProgramFun } from "../glSupply";
import vs from "../../shader/screen.vs";
import fs from "../../shader/view.fs";
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
      sampler: uniformFuns.uniformTexture(gl, shaderProgram, "uSampler", 0),
    },
  };
  return programInfo;
};
export default (gl) => {
  return Object.assign(shaderProgramFun(gl, shader, vs, fs), {
    getViewData(corner) {
      return [
        [corner[0], corner[1]],
        [corner[2], corner[1]],
        [corner[2], corner[3]],
        [corner[0], corner[3]],
      ].flat();
    },
    draw(gl, length) {
      gl.drawElements(gl.TRIANGLE_STRIP, length, gl.UNSIGNED_BYTE, 0);
    },
  });
};
