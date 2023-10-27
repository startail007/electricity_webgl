import { Vector } from "../js/vector";
import { loadTexture, getViewData0, useTexture, createFramebufferTexture } from "../js/glSupply";
export default class Composite {
  constructor(gl, options = {}) {
    this.options = {};
    Object.assign(this.options, options);
  }
  draw(gl, projectionMatrix, options) {
    const _options = {
      now: 0,
    };
    Object.assign(_options, options);
    const bufferData = this.options.bufferData;
    const shaderProgram = this.options.shader;
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
      glowSampler: options.glowTexture,
      sampler: options.texture,
      flipY: 1,
      size: [options.width, options.height],
      time: _options.now * 0.001,
    });
    shaderProgram.draw(bufferData.indicesBufferData.length);
  }
}
