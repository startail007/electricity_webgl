import { Float } from "../js/float.js";
import { Vector, VectorE } from "../js/vector.js";
export default class MoveBall {
  constructor(canvas) {
    this.canvas = canvas;
    this.mouse = [0, 0];
  }
  create(n) {
    this.d = new Array(n).fill(undefined).map(() => {
      return {
        p: [0, 0],
        v: [0, 0],
      };
    });
    this.canvas.addEventListener("mousemove", (e) => {
      this.mouse[0] = e.offsetX;
      this.mouse[1] = e.offsetY;
    });
  }
  draw(ctx) {
    for (let i = 0; i < this.d.length; i++) {
      ctx.fillStyle = "#00ff00";
      ctx.beginPath();
      ctx.arc(...this.d[i].p, 10, 0, 2 * Math.PI);
      ctx.fill();
    }

    for (let i = 0; i < this.d.length - 1; i++) {
      ctx.strokeStyle = "#00ff00";
      //ctx.lineWidth = Math.min(Vector.length(Vector.sub(point01, point02)) / 20, 20);
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(...this.d[i].p);
      ctx.lineTo(...this.d[i + 1].p);
      ctx.stroke();
    }
  }
  update() {
    for (let i = 0; i < this.d.length; i++) {
      const move = Vector.sub(Vector.mix(this.d[i].p, i - 1 >= 0 ? this.d[i - 1].p : this.mouse, 0.05), this.d[i].p);
      VectorE.add(this.d[i].v, move);
      VectorE.add(this.d[i].p, this.d[i].v);
      const r = i / (this.d.length - 1);
      VectorE.scale(this.d[i].v, Float.mix(0.6, 0.7, 1 - r));
    }
  }
}
