import { initShaderProgram, attribFuns, uniformFuns, shaderProgramFun } from "./glSupply";
import vs from "./electricityModel.vs";
import fs from "./electricityModel.fs";
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
      noiseSampler: uniformFuns.uniformTexture(gl, shaderProgram, "uNoiseSampler", 0), //噪聲貼圖
      gradientColorSampler: uniformFuns.uniformTexture(gl, shaderProgram, "uGradientColorSampler", 1), //漸層色貼圖
      thicknessScaleSampler: uniformFuns.uniformTexture(gl, shaderProgram, "uThicknessScaleSampler", 2), //線段粗細貼圖
      length: uniformFuns.uniform1f(gl, shaderProgram, "uLength"), //線段長度
      time: uniformFuns.uniform1f(gl, shaderProgram, "uTime"), //時間
      density: uniformFuns.uniform2fv(gl, shaderProgram, "uDensity"), //扭曲的質量
      fixed: uniformFuns.uniform2fv(gl, shaderProgram, "uFixed"), //頭尾固定
      radius: uniformFuns.uniform2fv(gl, shaderProgram, "uRadius"), //扭曲的半徑範圍
      thickness: uniformFuns.uniform2fv(gl, shaderProgram, "uThickness"), //線段粗細
      power: uniformFuns.uniform1f(gl, shaderProgram, "uPower"), //中間電流能量
      borderPower: uniformFuns.uniform2fv(gl, shaderProgram, "uBorderPower"), //頭尾球狀能量
      gradientColorRate: uniformFuns.uniform1f(gl, shaderProgram, "uGradientColorRate"), //漸層色位置
      thicknessScaleRate: uniformFuns.uniform1f(gl, shaderProgram, "uThicknessScaleRate"), //線段粗細位置
      expand: uniformFuns.uniform1f(gl, shaderProgram, "uExpand"), //擴張大小

      sub: uniformFuns.uniform1i(gl, shaderProgram, "uSub"), //子電流

      flow: uniformFuns.uniform1i(gl, shaderProgram, "uFlow"), //流動開關
      flowRate: uniformFuns.uniform1f(gl, shaderProgram, "uFlowRate"), //流動段位置

      wireframe: uniformFuns.uniform1i(gl, shaderProgram, "uWireframe"), //外框
    },
  };
  return programInfo;
};
export default (gl) => {
  return Object.assign(shaderProgramFun(gl, shader, vs, fs), {
    draw(length) {
      //gl.drawElements(gl.TRIANGLES, length, gl.UNSIGNED_INT, 0);
      //gl.drawElements(gl.TRIANGLES, length, gl.UNSIGNED_SHORT, 0);
      gl.drawElements(gl.TRIANGLES, length, gl.UNSIGNED_BYTE, 0);

      //gl.drawArrays(gl.TRIANGLES, 0, length);
    },
  });
};
