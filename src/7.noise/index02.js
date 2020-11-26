const vs = `attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
varying highp vec2 vTextureCoord;
uniform float uFlipY;
void main(void){
  vTextureCoord=aTextureCoord;
  gl_Position=vec4((2.*aVertexPosition+vec2(-1.,-1.))*vec2(1.,uFlipY),0.,1.);
}`;
const fs = `
precision mediump float;
varying vec2 vTextureCoord;
uniform lowp vec2 uSize;
uniform lowp float uDepth;
uniform int uType;
uniform vec3 uGrid;
uniform vec3 uPos;
uniform vec3 uLoop;
const float pi=3.14159265359;
const int OCTAVE_NUM=3;

vec2 random2(vec2 p){
  vec2 f=vec2(
    dot(p,vec2(1.271,3.117)),
    dot(p,vec2(2.695,1.833))
  );
  return-1.+2.*fract(sin(f)*437.585453123);
}

float noise_perlin(vec2 p){
  vec2 i=floor(p);
  vec2 f=fract(p);
  float a=dot(random2(i),f);
  float b=dot(random2(i+vec2(1.,0.)),f-vec2(1.,0.));
  float c=dot(random2(i+vec2(0.,1.)),f-vec2(0.,1.));
  float d=dot(random2(i+vec2(1.,1.)),f-vec2(1.,1.));
  vec2 u=smoothstep(0.,1.,f);
  //vec2 u=f*f*(3.-2.*f);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}

float fbm_noise_perlin(vec2 p){
  float f=0.;
  float a=.5;
  for(int i=0;i<OCTAVE_NUM;i++)
  {
    f+=a*noise_perlin(p);
    p*=2.;
    a/=2.;
  }
  return f;
}

void main()
{
  float f=fbm_noise_perlin(vTextureCoord*10.)*.5+.5;
  gl_FragColor=vec4(vec3(f),1.);
  
  //vec2 f=random2(vTextureCoord)*.5+.5;
  //gl_FragColor=vec4(f,0.,1.);
  
}
`;
const arrayBufferData = (gl, data, count, classType = Float32Array, usage = gl.STATIC_DRAW) => {
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
      _data = new classType(data);
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
      const temp = new classType(len + count);
      temp.set(_data);
      _data = temp;
      this.item(len / count, data);
    },
    item(index, data) {
      const temp = new classType(data);
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
const elementArrayBufferData = (gl, data, classType = Uint8Array, usage = gl.STATIC_DRAW) => {
  let _data; // = new Uint8Array(data);
  const buffer = gl.createBuffer();
  //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
  //gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, _data, usage);
  let bufferLength = 0;
  const count = 3;
  const obj = {
    buffer: buffer,
    get data() {
      return _data;
    },
    get length() {
      return _data.length;
    },
    set(data) {
      _data = new classType(data);
      bufferLength = 100 * Math.ceil(_data.length / count / 100);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, bufferLength * count * 4, usage);
      gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, 0, _data);
      //console.log(bufferLength, count);
    },
    add(data) {
      const len = _data.length;
      /*gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, (len + count) * 4, usage);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, _data);*/
      const tempBufferLength = 100 * Math.floor(_data.length / count / 100);
      if (tempBufferLength >= bufferLength) {
        bufferLength = tempBufferLength + 100;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, bufferLength * count * 4, usage);
        gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, 0, _data);
      }
      const temp = new classType(len + count);
      temp.set(_data);
      _data = temp;
      this.item(len / count, data);
    },
    item(index, data) {
      const temp = new classType(data);
      _data.set(temp, index * count);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
      gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, index * count * 4, temp);
    },
    getItem(index) {
      return Array.from(_data.slice(index * count, (index + 1) * count));
    },
  };
  obj.set(data);
  return obj;
};
const setFramebuffer = (gl, fbo, width, height) => {
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  if (width !== undefined && height !== undefined) {
    gl.viewport(0, 0, width, height);
  }
};
const useFramebufferTexture = (gl, framebufferTexture, resize = true) => {
  if (framebufferTexture) {
    if (resize) {
      setFramebuffer(gl, framebufferTexture.framebuffer, framebufferTexture.width, framebufferTexture.height);
    } else {
      setFramebuffer(gl, framebufferTexture.framebuffer);
    }
  } else {
    if (resize) {
      setFramebuffer(gl, null, gl.canvas.width, gl.canvas.height);
    } else {
      setFramebuffer(gl, null);
    }
  }
};
const clear = (gl) => {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
};
const useTexture = (gl, texture, clearBool = true, resize = true) => {
  useFramebufferTexture(gl, texture, resize);
  if (clearBool) {
    clear(gl);
  }
};
const attribFuns = {
  attribFloat(gl, shaderProgram, name, count) {
    const i = gl.getAttribLocation(shaderProgram, name);
    gl.enableVertexAttribArray(i);
    return (val) => {
      gl.bindBuffer(gl.ARRAY_BUFFER, val);
      gl.vertexAttribPointer(i, count, gl.FLOAT, false, 0, 0);
    };
  },
};
const uniformFuns = {
  uniform1f(gl, shaderProgram, name) {
    const i = gl.getUniformLocation(shaderProgram, name);
    return (val) => {
      gl.uniform1f(i, val);
    };
  },
  uniform2fv(gl, shaderProgram, name) {
    const i = gl.getUniformLocation(shaderProgram, name);
    return (val) => {
      gl.uniform2fv(i, val);
    };
  },
  uniform3fv(gl, shaderProgram, name) {
    const i = gl.getUniformLocation(shaderProgram, name);
    return (val) => {
      gl.uniform3fv(i, val);
    };
  },
  uniformTexture(gl, shaderProgram, name, index) {
    const i = gl.getUniformLocation(shaderProgram, name);
    return (val) => {
      //貼圖
      gl.activeTexture(gl.TEXTURE0 + index);
      gl.bindTexture(gl.TEXTURE_2D, val);
      gl.uniform1i(i, index);
    };
  },
  uniform1i(gl, shaderProgram, name) {
    const i = gl.getUniformLocation(shaderProgram, name);
    return (val) => {
      gl.uniform1i(i, val);
    };
  },
  uniformMatrix4fv(gl, shaderProgram, name) {
    const i = gl.getUniformLocation(shaderProgram, name);
    return (val) => {
      gl.uniformMatrix4fv(i, false, val);
    };
  },
};
const shaderProgramFun = (gl, shader, vs, fs, drawFun) => {
  const programInfo = shader(gl, vs, fs);
  return {
    programInfo: programInfo,
    use() {
      gl.useProgram(programInfo.program);
    },
    attribSet(vals) {
      for (let key in vals) {
        if (programInfo.attribLocations[key]) {
          programInfo.attribLocations[key](vals[key]);
        }
      }
    },
    uniformSet(vals) {
      for (let key in vals) {
        if (programInfo.uniformLocations[key]) {
          programInfo.uniformLocations[key](vals[key]);
        }
      }
    },
    elementSet(val) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, val);
    },
  };
};
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
//import noisePerlin3DShader from "../js/shader/noisePerlin3DShader";

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
      size: uniformFuns.uniform2fv(gl, shaderProgram, "uSize"),
      depth: uniformFuns.uniform1f(gl, shaderProgram, "uDepth"),
      grid: uniformFuns.uniform3fv(gl, shaderProgram, "uGrid"),
      pos: uniformFuns.uniform3fv(gl, shaderProgram, "uPos"),
      type: uniformFuns.uniform1i(gl, shaderProgram, "uType"),
      loop: uniformFuns.uniform3fv(gl, shaderProgram, "uLoop"),
    },
  };
  return programInfo;
};
const noisePerlin3DShader = (gl) => {
  return Object.assign(shaderProgramFun(gl, shader, vs, fs), {
    draw(length) {
      gl.drawElements(gl.TRIANGLES, length, gl.UNSIGNED_BYTE, 0);
    },
  });
};

main();
function faceBuffers(gl) {
  const positions = [
    [0.0, 0.0],
    [1.0, 0.0],
    [1.0, 1.0],
    [0.0, 1.0],
  ].flat();
  const positionBufferData = arrayBufferData(gl, positions, 2);

  const textureCoordinates = [
    [0.0, 0.0],
    [1.0, 0.0],
    [1.0, 1.0],
    [0.0, 1.0],
  ].flat();
  const textureCoordinatesBufferData = arrayBufferData(gl, textureCoordinates, 2);

  //ELEMENT_ARRAY_BUFFER
  const indices = [
    [0, 1, 3],
    [1, 2, 3],
  ].flat();
  const indicesBufferData = elementArrayBufferData(gl, indices);

  return {
    positionBufferData: positionBufferData,
    textureCoordinatesBufferData: textureCoordinatesBufferData,
    indicesBufferData: indicesBufferData,
  };
}

function main() {
  const canvas = document.querySelector("#glcanvas");
  const gl = canvas.getContext("webgl", {
    //premultipliedAlpha: false,
    alpha: false,
  });
  if (!gl) {
    alert("無法初始化WebGL。您的瀏覽器或機器可能不支持它。");
    return;
  }
  /*const options = {
    //premultipliedAlpha: false,
    alpha: false,
    //antialias: true,
  };
  let gl = canvas.getContext("webgl2", options);
  let isWebGL2 = true;
  if (!gl) {
    gl = canvas.getContext("webgl", options) || canvas.getContext("experimental-webgl", options);
    isWebGL2 = false;
  }
  if (!gl) {
    alert("無法初始化WebGL。您的瀏覽器或機器可能不支持它。");
    return;
  }*/
  //著色器資料
  const programInfos = {
    noisePerlin3DShader: noisePerlin3DShader(gl),
  };
  //緩衝資料
  const buffers = { face: faceBuffers(gl) };

  const size = [gl.canvas.clientWidth, gl.canvas.clientHeight];

  let time = 0;
  function render(now) {
    const delta = (now - time) * 0.001;
    time = now;
    requestAnimationFrame(render);
    drawScene(gl, programInfos, buffers, { now, delta, size });
  }
  requestAnimationFrame(render);
}

function drawScene(gl, programInfos, buffers, datas) {
  const { now, size, noiseTexture } = datas;

  {
    const bufferData = buffers.face;
    const shaderProgram = programInfos.noisePerlin3DShader;
    shaderProgram.use();
    shaderProgram.attribSet({
      vertexPosition: bufferData.positionBufferData.buffer,
      textureCoord: bufferData.textureCoordinatesBufferData.buffer,
    });
    shaderProgram.uniformSet({
      size: size,
      depth: 500,
      grid: [20, 20, 20],
      type: 1,
      pos: [0, 0, now * 0.00005],
      flipY: 1,
      loop: [20, 20, 20],
    });
    useTexture(gl);
    shaderProgram.draw(bufferData.indicesBufferData.length);
  }
}
