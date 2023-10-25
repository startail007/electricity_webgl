import { faceBuffers } from "../js/model";
import blurShader from "./shader/blurShader";
import { Vector } from "../js/vector";
import { loadTexture, getViewData0, useTexture } from "../js/glSupply";
export default class Blur {
  constructor(gl, options = {}) {
    this.shader = blurShader(gl);
    this.bufferData = faceBuffers(gl);

    this.options = {};
    Object.assign(this.options, options);
  }
  draw(gl, projectionMatrix, options) {
    let bool = options && options.framebufferTexture;

    if (bool) useTexture(gl, options.framebufferTexture);
    const bufferData = this.bufferData;
    const shaderProgram = this.shader;
    shaderProgram.use();
    shaderProgram.attribSet({
      vertexPosition: bufferData.positionBufferData.buffer,
      textureCoord: bufferData.textureCoordinatesBufferData.buffer,
    });
    bufferData.positionBufferData.set(
      getViewData0([...options.pos, ...Vector.add(options.pos, [options.width, options.height])])
    );
    shaderProgram.uniformSet({
      projectionMatrix: projectionMatrix,
      sampler: options.texture,
      flipY: bool ? -1 : 1,
      size: [options.width, options.height],
    });
    shaderProgram.draw(bufferData.indicesBufferData.length);
    if (bool) useTexture(gl, undefined);
  }
}
