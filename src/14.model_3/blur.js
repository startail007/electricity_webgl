import blurShader from "./shader/blurShader";
import { Vector } from "../js/vector";
import { loadTexture, getViewData0, useTexture, createFramebufferTexture } from "../js/glSupply";
export default class Blur {
  constructor(gl, options = {}) {
    this.temp = createFramebufferTexture(gl);

    this.options = {};
    Object.assign(this.options, options);
  }
  draw(gl, projectionMatrix, options) {
    useTexture(gl, this.temp);
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
      sampler: options.texture,
      flipY: -1,
      size: [options.width, options.height],
      dir: [1, 0],
      width: 20,
    });
    shaderProgram.draw(bufferData.indicesBufferData.length);
    useTexture(gl, null, false);

    let bool = options && options.framebufferTexture;
    if (bool) useTexture(gl, options.framebufferTexture);
    shaderProgram.uniformSet({
      sampler: this.temp.texture,
      flipY: bool ? -1 : 1,
      dir: [0, 1],
    });
    shaderProgram.draw(bufferData.indicesBufferData.length);
    if (bool) useTexture(gl, null, false);
  }
}
