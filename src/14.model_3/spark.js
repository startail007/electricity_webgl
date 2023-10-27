import { Vector, VectorE } from "../js/vector";
import { mat4 } from "gl-matrix";
import EasingFunctions from "../js/ease";
export default class Spark {
  constructor(gl, options = {}) {
    this.options = {
      pos: [0, 0],
      velocity: 10,
      direct: 0,
      lifespan: 25,
      thickness: 3,
      friction: 0.94,
      gravity: [0, 0.981],
      colorStart: [1, 0, 0, 1],
      colorEnd: [1, 1, 0, 1],
    };
    Object.assign(this.options, options);
    this.options.pos = Vector.clone(this.options.pos);
    this.options.prevPos = Vector.clone(this.options.pos);
    this.options.maxlife = this.options.lifespan;
    this.options.swing = Math.random();
    this.options.velocityPos = [
      Math.cos(this.options.direct) * this.options.velocity,
      Math.sin(this.options.direct) * this.options.velocity,
    ];
    this.options.modelViewMatrix = mat4.create();
  }
  update(delta) {
    VectorE.set(this.options.prevPos, ...this.options.pos);
    VectorE.add(this.options.pos, this.options.velocityPos);
    const swingV = [0, Math.sin(this.options.swing * 2 * Math.PI)];
    VectorE.rotate(swingV, Vector.getAngle(this.options.velocityPos));
    VectorE.scale(swingV, this.options.lifespan / this.options.maxlife);
    VectorE.add(this.options.velocityPos, swingV);
    VectorE.add(this.options.velocityPos, Vector.add(this.options.gravity, [0, -0.6]));
    VectorE.scale(this.options.velocityPos, this.options.friction);
    this.options.swing += 0.1;
    this.options.swing %= 1;

    const startPos = this.options.prevPos;
    const endPos = this.options.pos;
    const v = Vector.sub(endPos, startPos);
    const a = Vector.getAngle(v);
    mat4.identity(this.options.modelViewMatrix);
    mat4.translate(this.options.modelViewMatrix, this.options.modelViewMatrix, [
      ...Vector.mix(startPos, endPos, 0.5),
      0.0,
    ]);
    mat4.rotateZ(this.options.modelViewMatrix, this.options.modelViewMatrix, a);

    if (this.options.lifespan > 0) {
      this.options.lifespan -= delta;
    }
  }
  draw(gl, projectionMatrix, options) {
    const bufferData = this.options.bufferData;
    const shaderProgram = this.options.shader;
    shaderProgram.use();
    shaderProgram.attribSet({
      vertexPosition: bufferData.positionBufferData.buffer,
      textureCoord: bufferData.textureCoordinatesBufferData.buffer,
    });
    shaderProgram.elementSet(bufferData.indicesBufferData.buffer);
    shaderProgram.uniformSet({
      projectionMatrix: projectionMatrix,
      wireframe: false,
      gradientColorSampler: this.options.textures.gradientColor,
    });

    const thickness = this.options.thickness * EasingFunctions.easeOutQuad(this.lifeRate);

    shaderProgram.uniformSet({
      modelViewMatrix: this.options.modelViewMatrix,
      size: [
        Vector.distance(this.options.prevPos, this.options.pos) + thickness * 2 * (1 + 4),
        thickness * 2 * (1 + 4),
      ],
    });
    shaderProgram.draw(bufferData.indicesBufferData.length);
  }
  get lifeRate() {
    return this.options.lifespan / this.options.maxlife;
  }
}
