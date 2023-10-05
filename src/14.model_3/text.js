import { getTextTexture } from "./funs";
import { faceBuffers } from "../js/model";
import viewShader from "./shader/viewShader";
import { Vector } from "../js/vector";
import { loadTexture, getViewData0 } from "../js/glSupply";
export default class Text {
  constructor(gl, options = {}) {
    this.shader = viewShader(gl);
    this.text = "";
    this.pos = [0, 0];
    this.width = 0;
    this.height = 0;
    this.texture = null;
    this.bufferData = null;

    this.options = {};
    Object.assign(this.options, options);
  }
  setText(gl, text, style) {
    this.text = text;
    const { width, height, textureData } = getTextTexture(text, style);
    this.width = width;
    this.height = height;
    this.texture = loadTexture(gl, textureData);
    this.bufferData = faceBuffers(gl);
  }
  onUpdate(fun) {
    this.fun = fun;
  }
  update(delta) {
    this.fun && this.fun(this, delta);
  }
  draw(gl, projectionMatrix, options) {
    //useTexture(gl, framebufferTextures.text);
    const bufferData = this.bufferData;
    const shaderProgram = this.shader;
    shaderProgram.use();
    shaderProgram.attribSet({
      vertexPosition: bufferData.positionBufferData.buffer,
      textureCoord: bufferData.textureCoordinatesBufferData.buffer,
    });
    bufferData.positionBufferData.set(getViewData0([...this.pos, ...Vector.add(this.pos, [this.width, this.height])]));
    shaderProgram.uniformSet({
      projectionMatrix: projectionMatrix,
      sampler: this.texture,
    });
    shaderProgram.draw(bufferData.indicesBufferData.length);
  }
}
