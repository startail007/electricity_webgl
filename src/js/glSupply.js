const initShaderProgram = (gl, vsSource, fsSource) => {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert("無法初始化著色器程序: " + gl.getProgramInfoLog(shaderProgram));
    return null;
  }
  return shaderProgram;
};

const loadShader = (gl, type, source) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert("編譯著色器時發生錯誤: " + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};
const arrayBufferData = (gl, data, count, usage = gl.STATIC_DRAW) => {
  let _data;
  const buffer = gl.createBuffer();
  let bufferLength = 0;
  const obj = {
    buffer: buffer,
    get data() {
      return _data;
    },
    get length() {
      return _data.length;
    },
    set(data) {
      _data = new Float32Array(data);
      /*gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, _data.length * 4, usage);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, _data);*/
      bufferLength = 100 * Math.ceil(_data.length / count / 100);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, bufferLength * count * 4, usage);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, _data);
    },
    add(data) {
      const len = _data.length;
      /*gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, (len + count) * 4, usage);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, _data);*/
      const tempBufferLength = 100 * Math.floor(_data.length / count / 100);
      if (tempBufferLength >= bufferLength) {
        bufferLength = tempBufferLength + 100;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, bufferLength * count * 4, usage);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, _data);
      }
      const temp = new Float32Array(len + count);
      temp.set(_data);
      _data = temp;
      this.item(len / count, data);
    },
    item(index, data) {
      const temp = new Float32Array(data);
      _data.set(temp, index * count);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferSubData(gl.ARRAY_BUFFER, index * count * 4, temp);
    },
    getItem(index) {
      return Array.from(_data.slice(index * count, (index + 1) * count));
    },
  };
  obj.set(data);
  return obj;
};

const arrayBufferData0 = (gl, data, count, usage = gl.STATIC_DRAW) => {
  let _data;
  const buffer = gl.createBuffer();
  const obj = {
    buffer: buffer,
    get data() {
      return _data;
    },
    get length() {
      return _data.length;
    },
    set(data) {
      _data = new Float32Array(1024 * count);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, 1024 * count * 4, usage);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, _data);
    },
    use() {
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    },
    item(index, data) {
      const temp = new Float32Array(data);
      _data.set(temp, index * count);
      gl.bufferSubData(gl.ARRAY_BUFFER, index * count * 4, temp);
    },
    zero(index) {
      const temp = new Float32Array((1024 - index) * count);
      _data.set(temp, index * count);
      gl.bufferSubData(gl.ARRAY_BUFFER, index * count * 4, temp);
    },
    getItem(index) {
      return Array.from(_data.slice(index * count, (index + 1) * count));
    },
  };
  obj.set(data);
  return obj;
};

const elementArrayBufferData = (gl, data, usage = gl.STATIC_DRAW) => {
  let _data = new Uint8Array(data);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, _data, usage);
  const obj = {
    buffer: buffer,
    get data() {
      return _data;
    },
    get length() {
      return _data.length;
    },
  };
  return obj;
};

const createAndSetupTexture = (gl) => {
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  return texture;
};
const loadTexture = (gl, url) => {
  const texture = createAndSetupTexture(gl);
  const image = new Image();
  image.onload = function () {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  };
  image.src = url;
  return texture;
};
const setFramebuffer = (gl, fbo, width, height) => {
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.viewport(0, 0, width, height);
};

const useFramebufferTexture = (gl, framebufferTexture) => {
  setFramebuffer(gl, framebufferTexture.framebuffer, framebufferTexture.width, framebufferTexture.height);
};
const createFramebufferTexture = (gl, width, height) => {
  const obj = {
    width: width || gl.canvas.clientWidth,
    height: height || gl.canvas.clientHeight,
  };
  const texture = createAndSetupTexture(gl);
  obj.texture = texture;
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, obj.width, obj.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  const fbo = gl.createFramebuffer();
  obj.framebuffer = fbo;
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  /*obj.use = () => {
    setFramebuffer(gl, fbo, obj.width, obj.height);
  };*/
  return obj;
};
const createFramebufferTextures = (gl, n, width, height) => {
  const framebufferTextures = [];
  for (let i = 0; i < n; i++) {
    framebufferTextures.push(createFramebufferTexture(gl, width, height));
  }
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  return framebufferTextures;
};
export {
  initShaderProgram,
  loadShader,
  setFramebuffer,
  useFramebufferTexture,
  createFramebufferTexture,
  createFramebufferTextures,
  arrayBufferData,
  arrayBufferData0,
  elementArrayBufferData,
  createAndSetupTexture,
  loadTexture,
};
