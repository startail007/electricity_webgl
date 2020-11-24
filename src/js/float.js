class Float {
  static mix(a, b, t) {
    return a * (1 - t) + b * t;
  }
  static fract(val) {
    val = val % 1;
    return val < 0 ? val + 1 : val;
  }
}
export { Float };
