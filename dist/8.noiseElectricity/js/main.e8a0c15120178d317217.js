!function(r){var e={};function n(t){if(e[t])return e[t].exports;var a=e[t]={i:t,l:!1,exports:{}};return r[t].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=r,n.c=e,n.d=function(r,e,t){n.o(r,e)||Object.defineProperty(r,e,{enumerable:!0,get:t})},n.r=function(r){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(r,"__esModule",{value:!0})},n.t=function(r,e){if(1&e&&(r=n(r)),8&e)return r;if(4&e&&"object"==typeof r&&r&&r.__esModule)return r;var t=Object.create(null);if(n.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var a in r)n.d(t,a,function(e){return r[e]}.bind(null,a));return t},n.n=function(r){var e=r&&r.__esModule?function(){return r.default}:function(){return r};return n.d(e,"a",e),e},n.o=function(r,e){return Object.prototype.hasOwnProperty.call(r,e)},n.p="",n(n.s=63)}([function(r,e,n){"use strict";n.d(e,"h",(function(){return p})),n.d(e,"f",(function(){return t})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return o})),n.d(e,"d",(function(){return i})),n.d(e,"g",(function(){return f})),n.d(e,"b",(function(){return d})),n.d(e,"i",(function(){return v})),n.d(e,"e",(function(){return m})),n.d(e,"j",(function(){return h}));var t=function(r,e,n){var t=a(r,r.VERTEX_SHADER,e),o=a(r,r.FRAGMENT_SHADER,n),i=r.createProgram();return r.attachShader(i,t),r.attachShader(i,o),r.linkProgram(i),r.getProgramParameter(i,r.LINK_STATUS)?i:(alert("無法初始化著色器程序: "+r.getProgramInfoLog(i)),null)},a=function(r,e,n){var t=r.createShader(e);return r.shaderSource(t,n),r.compileShader(t),r.getShaderParameter(t,r.COMPILE_STATUS)?t:(alert("編譯著色器時發生錯誤: "+r.getShaderInfoLog(t)),r.deleteShader(t),null)},o=function(r,e,n){var t,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:Float32Array,o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:r.STATIC_DRAW,i=r.createBuffer(),u=0,f={buffer:i,get data(){return t},get length(){return t.length},set:function(e){t=new a(e),u=100*Math.ceil(t.length/n/100),r.bindBuffer(r.ARRAY_BUFFER,i),r.bufferData(r.ARRAY_BUFFER,u*n*4,o),r.bufferSubData(r.ARRAY_BUFFER,0,t)},add:function(e){var f=t.length,c=100*Math.floor(t.length/n/100);c>=u&&(u=c+100,r.bindBuffer(r.ARRAY_BUFFER,i),r.bufferData(r.ARRAY_BUFFER,u*n*4,o),r.bufferSubData(r.ARRAY_BUFFER,0,t));var l=new a(f+n);l.set(t),t=l,this.item(f/n,e)},item:function(e,o){var u=new a(o);t.set(u,e*n),r.bindBuffer(r.ARRAY_BUFFER,i),r.bufferSubData(r.ARRAY_BUFFER,e*n*4,u)},getItem:function(r){return Array.from(t.slice(r*n,(r+1)*n))}};return f.set(e),f},i=function(r,e){var n,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Uint8Array,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:r.STATIC_DRAW,o=r.createBuffer(),i=0,u=3,f={buffer:o,get data(){return n},get length(){return n.length},set:function(e){n=new t(e),i=100*Math.ceil(n.length/u/100),r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,o),r.bufferData(r.ELEMENT_ARRAY_BUFFER,i*u*4,a),r.bufferSubData(r.ELEMENT_ARRAY_BUFFER,0,n)},add:function(e){var f=n.length,c=100*Math.floor(n.length/u/100);c>=i&&(i=c+100,r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,o),r.bufferData(r.ELEMENT_ARRAY_BUFFER,i*u*4,a),r.bufferSubData(r.ELEMENT_ARRAY_BUFFER,0,n));var l=new t(f+u);l.set(n),n=l,this.item(f/u,e)},item:function(e,a){var i=new t(a);n.set(i,e*u),r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,o),r.bufferSubData(r.ELEMENT_ARRAY_BUFFER,e*u*4,i)},getItem:function(r){return Array.from(n.slice(r*u,(r+1)*u))}};return f.set(e),f},u=function(r){var e=r.createTexture();return r.bindTexture(r.TEXTURE_2D,e),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.LINEAR),e},f=function(r,e){var n=u(r),t=new Image;return t.onload=function(){n.width=t.width,n.height=t.height,r.bindTexture(r.TEXTURE_2D,n),r.texImage2D(r.TEXTURE_2D,0,r.RGBA,r.RGBA,r.UNSIGNED_BYTE,t),r.bindTexture(r.TEXTURE_2D,null)},t.src=e,n},c=function(r,e,n,t){r.bindFramebuffer(r.FRAMEBUFFER,e),void 0!==n&&void 0!==t&&r.viewport(0,0,n,t)},l=function(r,e){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];e?n?c(r,e.framebuffer,e.width,e.height):c(r,e.framebuffer):n?c(r,null,r.canvas.width,r.canvas.height):c(r,null)},s=function(r,e,n){var t={width:e||r.canvas.clientWidth,height:n||r.canvas.clientHeight},a=u(r);t.texture=a,r.texImage2D(r.TEXTURE_2D,0,r.RGBA,t.width,t.height,0,r.RGBA,r.UNSIGNED_BYTE,null);var o=r.createFramebuffer();return t.framebuffer=o,r.bindFramebuffer(r.FRAMEBUFFER,o),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,a,0),r.bindFramebuffer(r.FRAMEBUFFER,null),t},d={attribFloat:function(r,e,n,t){var a=r.getAttribLocation(e,n);return r.enableVertexAttribArray(a),function(e){r.bindBuffer(r.ARRAY_BUFFER,e),r.vertexAttribPointer(a,t,r.FLOAT,!1,0,0)}}},v={uniform1f:function(r,e,n){var t=r.getUniformLocation(e,n);return function(e){r.uniform1f(t,e)}},uniform2fv:function(r,e,n){var t=r.getUniformLocation(e,n);return function(e){r.uniform2fv(t,e)}},uniform3fv:function(r,e,n){var t=r.getUniformLocation(e,n);return function(e){r.uniform3fv(t,e)}},uniformTexture:function(r,e,n,t){var a=r.getUniformLocation(e,n);return function(e){r.activeTexture(r.TEXTURE0+t),r.bindTexture(r.TEXTURE_2D,e),r.uniform1i(a,t)}},uniform1i:function(r,e,n){var t=r.getUniformLocation(e,n);return function(e){r.uniform1i(t,e)}},uniformMatrix4fv:function(r,e,n){var t=r.getUniformLocation(e,n);return function(e){r.uniformMatrix4fv(t,!1,e)}}},p=function(r,e,n,t,a){var o=e(r,n,t);return{programInfo:o,use:function(){r.useProgram(o.program)},attribSet:function(r){for(var e in r)o.attribLocations[e]&&o.attribLocations[e](r[e])},uniformSet:function(r){for(var e in r)o.uniformLocations[e]&&o.uniformLocations[e](r[e])},elementSet:function(e){r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e)}}},m=function(r){return[[r[0],r[1]],[r[2],r[1]],[r[2],r[3]],[r[0],r[3]]].flat()},g=function(r){r.clearColor(0,0,0,1),r.clear(r.COLOR_BUFFER_BIT)},h=function(r,e){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],t=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];l(r,e,t),n&&g(r)}},function(r,e,n){"use strict";n.d(e,"a",(function(){return f})),n.d(e,"b",(function(){return c}));var t=n(3),a=n.n(t),o=n(4),i=n.n(o),u=n(2),f=function(){function r(){a()(this,r)}return i()(r,null,[{key:"normalize",value:function(e){return r.length(e)?r.scale(e,1/r.length(e)):e}},{key:"rotate",value:function(r,e){var n=Math.cos(e),t=Math.sin(e);return[r[0]*n-r[1]*t,r[1]*n+r[0]*t]}},{key:"dot",value:function(r,e){return r[0]*e[0]+r[1]*e[1]}},{key:"cross",value:function(r,e){return r[0]*e[1]-r[1]*e[0]}},{key:"add",value:function(r,e){return[r[0]+e[0],r[1]+e[1]]}},{key:"sub",value:function(r,e){return[r[0]-e[0],r[1]-e[1]]}},{key:"projection",value:function(e,n){var t=r.dot(e,n)/r.dot(n,n);return[n[0]*t,n[1]*t]}},{key:"length",value:function(e){return Math.sqrt(r.dot(e,e))}},{key:"mul",value:function(r,e){return[r[0]*e[0],r[1]*e[1]]}},{key:"div",value:function(r,e){return[r[0]/e[0],r[1]/e[1]]}},{key:"scale",value:function(r,e){return[r[0]*e,r[1]*e]}},{key:"collisionCalc",value:function(e,n,t,a){return r.scale(r.add(r.scale(e,t-a),r.scale(n,2*a)),1/(t+a))}},{key:"getAngle",value:function(r){return Math.atan2(r[1],r[0])}},{key:"floor",value:function(r){return[Math.floor(r[0]),Math.floor(r[1])]}},{key:"fract",value:function(r){return[u.a.fract(r[0]),u.a.fract(r[1])]}},{key:"sin",value:function(r){return[Math.sin(r[0]),Math.sin(r[1])]}},{key:"cos",value:function(r){return[Math.cos(r[0]),Math.cos(r[1])]}},{key:"distance",value:function(e,n){return r.length(r.sub(n,e))}},{key:"mix",value:function(r,e,n){return[u.a.mix(r[0],e[0],n),u.a.mix(r[1],e[1],n)]}},{key:"abs",value:function(r){return[Math.abs(r[0]),Math.abs(r[1])]}},{key:"getLine",value:function(e,n){return{pos:e,dir:r.sub(n,e)}}}]),r}(),c=function(){function r(){a()(this,r)}return i()(r,null,[{key:"set",value:function(r,e,n){return r[0]=e,r[1]=n,r}},{key:"normalize",value:function(e){var n=f.length(e);return n&&r.scale(e,1/n),e}},{key:"add",value:function(r,e){return r[0]+=e[0],r[1]+=e[1],r}},{key:"sub",value:function(r,e){return r[0]-=e[0],r[1]-=e[1],r}},{key:"scale",value:function(r,e){return r[0]*=e,r[1]*=e,r}},{key:"rotate",value:function(r,e){var n=Math.cos(e),t=Math.sin(e),a=[r[0]*n-r[1]*t,r[1]*n+r[0]*t];return r[0]=a[0],r[1]=a[1],r}}]),r}()},function(r,e,n){"use strict";n.d(e,"a",(function(){return u}));var t=n(3),a=n.n(t),o=n(4),i=n.n(o),u=function(){function r(){a()(this,r)}return i()(r,null,[{key:"mix",value:function(r,e,n){return r*(1-n)+e*n}},{key:"fract",value:function(r){return(r%=1)<0?r+1:r}},{key:"inverseMix",value:function(r,e,n){return(n-r)/(e-r)}},{key:"clamp",value:function(r){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;return r<=e?e:r>=n?n:r}},{key:"smoothstep",value:function(r,e,n){return(n=clamp(inverseMix(r,e,n)))*n*(3-2*n)}}]),r}()},function(r,e){r.exports=function(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}},function(r,e){function n(r,e){for(var n=0;n<e.length;n++){var t=e[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(r,t.key,t)}}r.exports=function(r,e,t){return e&&n(r.prototype,e),t&&n(r,t),r}},function(r,e){r.exports="attribute vec2 aVertexPosition;\r\nattribute vec2 aTextureCoord;\r\nvarying highp vec2 vTextureCoord;\r\nuniform float uFlipY;\r\nvoid main(void){\r\n  vTextureCoord=aTextureCoord;\r\n  gl_Position=vec4((2.*aVertexPosition+vec2(-1.,-1.))*vec2(1.,uFlipY),0.,1.);\r\n}"},function(r,e,n){var t=n(13),a=n(14),o=n(15),i=n(16);r.exports=function(r){return t(r)||a(r)||o(r)||i()}},,function(r,e){r.exports=function(r,e){(null==e||e>r.length)&&(e=r.length);for(var n=0,t=new Array(e);n<e;n++)t[n]=r[n];return t}},function(r,e,n){"use strict";var t=n(0),a=n(5),o=n.n(a),i=n(10),u=n.n(i),f=function(r,e,n){var a=Object(t.f)(r,e,n);return{program:a,attribLocations:{vertexPosition:t.b.attribFloat(r,a,"aVertexPosition",2),textureCoord:t.b.attribFloat(r,a,"aTextureCoord",2)},uniformLocations:{flipY:t.i.uniform1f(r,a,"uFlipY"),sampler:t.i.uniformTexture(r,a,"uSampler",0),size:t.i.uniform2fv(r,a,"uSize"),dir:t.i.uniform2fv(r,a,"uDir"),width:t.i.uniform1f(r,a,"uWidth"),power:t.i.uniform1f(r,a,"uPower")}}};e.a=function(r){return Object.assign(Object(t.h)(r,f,o.a,u.a),{draw:function(e){r.drawElements(r.TRIANGLES,e,r.UNSIGNED_BYTE,0)}})}},function(r,e){r.exports="precision mediump float;\r\nvarying vec2 vTextureCoord;\r\nuniform sampler2D uSampler;\r\nuniform lowp vec2 uSize;\r\nuniform vec2 uDir;\r\nuniform float uWidth;\r\nuniform float uPower;\r\nconst float pi=3.14159265359;\r\nvoid main()\r\n{\r\n  vec4 color=texture2D(uSampler,vTextureCoord);\r\n  const int N=10;\r\n  float ii=max(uWidth,float(N))/float(N);\r\n  for(int i=1;i<=N;i++){\r\n    if(uWidth<float(N)&&float(i)>uWidth){\r\n      break;\r\n    }\r\n    float val=cos((float(i)/float(N))*pi);\r\n    float rate=pow(exp(2.*val)/exp(2.),.75);\r\n    color+=rate*texture2D(uSampler,vTextureCoord+float(i)*ii*uDir/uSize);\r\n    color+=rate*texture2D(uSampler,vTextureCoord-float(i)*ii*uDir/uSize);\r\n  }\r\n  //color.rgb/=color.a;\r\n  gl_FragColor=uPower*color;\r\n}\r\n"},function(r,e,n){"use strict";var t=n(0),a=n(5),o=n.n(a),i=n(12),u=n.n(i),f=function(r,e,n){var a=Object(t.f)(r,e,n);return{program:a,attribLocations:{vertexPosition:t.b.attribFloat(r,a,"aVertexPosition",2),textureCoord:t.b.attribFloat(r,a,"aTextureCoord",2)},uniformLocations:{flipY:t.i.uniform1f(r,a,"uFlipY"),samplerA:t.i.uniformTexture(r,a,"uSamplerA",0),samplerB:t.i.uniformTexture(r,a,"uSamplerB",1)}}};e.a=function(r){return Object.assign(Object(t.h)(r,f,o.a,u.a),{draw:function(e){r.drawElements(r.TRIANGLES,e,r.UNSIGNED_BYTE,0)}})}},function(r,e){r.exports="precision mediump float;\r\nvarying vec2 vTextureCoord;\r\nuniform sampler2D uSamplerA;\r\nuniform sampler2D uSamplerB;\r\nvoid main()\r\n{\r\n  gl_FragColor=texture2D(uSamplerA,vTextureCoord)+texture2D(uSamplerB,vTextureCoord);\r\n}\r\n"},function(r,e,n){var t=n(8);r.exports=function(r){if(Array.isArray(r))return t(r)}},function(r,e){r.exports=function(r){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(r))return Array.from(r)}},function(r,e,n){var t=n(8);r.exports=function(r,e){if(r){if("string"==typeof r)return t(r,e);var n=Object.prototype.toString.call(r).slice(8,-1);return"Object"===n&&r.constructor&&(n=r.constructor.name),"Map"===n||"Set"===n?Array.from(r):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?t(r,e):void 0}}},function(r,e){r.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},,,,,,,function(r,e,n){"use strict";var t=n(0),a=n(5),o=n.n(a),i=n(24),u=n.n(i),f=function(r,e,n){var a=Object(t.f)(r,e,n);return{program:a,attribLocations:{vertexPosition:t.b.attribFloat(r,a,"aVertexPosition",2),textureCoord:t.b.attribFloat(r,a,"aTextureCoord",2)},uniformLocations:{flipY:t.i.uniform1f(r,a,"uFlipY"),sampler:t.i.uniformTexture(r,a,"uSampler",0)}}};e.a=function(r){return Object.assign(Object(t.h)(r,f,o.a,u.a),{draw:function(e){r.drawElements(r.TRIANGLES,e,r.UNSIGNED_BYTE,0)}})}},function(r,e){r.exports="precision highp float;\r\nvarying vec2 vTextureCoord;\r\nuniform sampler2D uSampler;\r\nvoid main()\r\n{\r\n  gl_FragColor=texture2D(uSampler,vTextureCoord);\r\n}\r\n"},,,,,,,,,,,,,,,,,,,,function(r,e){r.exports="precision highp float;\r\nvarying vec2 vTextureCoord;\r\nuniform vec2 uSize;\r\nuniform float uTime;\r\n\r\nuniform float uLineWidth;\r\n\r\nuniform vec2 uStartPos;\r\nuniform vec2 uEndPos;\r\nuniform float uOffset;\r\n\r\nuniform bool uBranchBool;\r\nuniform vec2 uBranchStartPos;\r\nuniform vec2 uBranchEndPos;\r\nuniform float uBranchOffset;\r\nuniform bool uStartFixed;\r\nuniform bool uEndFixed;\r\n//uniform sampler2D uSampler;\r\n\r\nconst float pi=3.14159265359;\r\nconst int OCTAVE_NUM=5;\r\n\r\nfloat distLine(vec2 p,vec2 a,vec2 b,float w){\r\n  vec2 pa=p-a;\r\n  vec2 ba=b-a;\r\n  float t=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);\r\n  return length(pa-ba*t)/w;\r\n}\r\nfloat gradual(vec2 p,vec2 a,vec2 b){\r\n  vec2 pa=p-a;\r\n  vec2 ba=b-a;\r\n  return clamp(dot(pa,ba)/dot(ba,ba),0.,1.);\r\n}\r\nvec3 random3(vec3 p){\r\n  vec3 f=vec3(\r\n    dot(p,vec3(1.271,3.117,.695)),\r\n    dot(p,vec3(2.695,1.833,1.327)),\r\n    dot(p,vec3(2.473,1.085,.965))\r\n  );\r\n  return-1.+2.*fract(sin(f)*437.585453123);\r\n}\r\nfloat noise_perlin(vec3 p){\r\n  vec3 i=floor(p);\r\n  vec3 s=fract(p);\r\n  float a=dot(random3(i),s);\r\n  float b=dot(random3(i+vec3(1,0,0)),s-vec3(1,0,0));\r\n  float c=dot(random3(i+vec3(0,1,0)),s-vec3(0,1,0));\r\n  float d=dot(random3(i+vec3(0,0,1)),s-vec3(0,0,1));\r\n  float e=dot(random3(i+vec3(1,1,0)),s-vec3(1,1,0));\r\n  float f=dot(random3(i+vec3(1,0,1)),s-vec3(1,0,1));\r\n  float g=dot(random3(i+vec3(0,1,1)),s-vec3(0,1,1));\r\n  float h=dot(random3(i+vec3(1,1,1)),s-vec3(1,1,1));\r\n  //vec3 u=smoothstep(0.,1.,s);\r\n  vec3 u=s*s*(3.-2.*s);\r\n  return mix(mix(mix(a,b,u.x),mix(c,e,u.x),u.y),mix(mix(d,f,u.x),mix(g,h,u.x),u.y),u.z);\r\n}\r\nfloat fbm_noise_perlin(vec3 p){\r\n  float f=0.;\r\n  float a=1.;\r\n  for(int i=0;i<OCTAVE_NUM;i++)\r\n  {\r\n    f+=a*noise_perlin(p);\r\n    p=2.*p;\r\n    a/=2.;\r\n  }\r\n  return f;\r\n}\r\nfloat fbm_abs_noise_perlin(vec3 p){\r\n  float f=0.;\r\n  float a=1.;\r\n  for(int i=0;i<OCTAVE_NUM;i++)\r\n  {\r\n    f+=a*abs(noise_perlin(p));\r\n    p=2.*p;\r\n    a/=2.;\r\n  }\r\n  return f;\r\n}\r\n\r\nvec2 random2(vec2 p,vec2 loop){\r\n  if(loop.x!=0.){\r\n    p.x=mod(p.x,loop.x);\r\n  }\r\n  if(loop.y!=0.){\r\n    p.y=mod(p.y,loop.y);\r\n  }\r\n  vec2 f=vec2(\r\n    dot(p,vec2(1.271,3.117)),\r\n    dot(p,vec2(2.695,1.833))\r\n  );\r\n  return-1.+2.*fract(sin(f)*437.585453123);\r\n}\r\n\r\nfloat noise_perlin(vec2 p,vec2 loop){\r\n  vec2 i=floor(p);\r\n  vec2 f=fract(p);\r\n  float a=dot(random2(i,loop),f);\r\n  float b=dot(random2(i+vec2(1.,0.),loop),f-vec2(1.,0.));\r\n  float c=dot(random2(i+vec2(0.,1.),loop),f-vec2(0.,1.));\r\n  float d=dot(random2(i+vec2(1.,1.),loop),f-vec2(1.,1.));\r\n  //vec2 u=smoothstep(0.,1.,f);\r\n  vec2 u=f*f*(3.-2.*f);\r\n  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);\r\n}\r\n\r\nfloat fbm_noise_perlin(vec2 p,vec2 loop){\r\n  float f=0.;\r\n  float a=.5;\r\n  for(int i=0;i<OCTAVE_NUM;i++)\r\n  {\r\n    f+=a*noise_perlin(p,loop);\r\n    p*=2.;\r\n    a/=2.;\r\n  }\r\n  return f;\r\n}\r\nvec4 drawLight(float d){\r\n  float highColorRate=smoothstep(1.,0.,d);\r\n  float baseColorRate=smoothstep(1.,0.,d/4.);\r\n  float glowColorRate=smoothstep(1.,0.,d/8.);\r\n  float endColorRate=smoothstep(1.,0.,d/16.);\r\n  vec4 highColor=vec4(1.,1.,1.,1.);\r\n  vec4 baseColor=vec4(.35,.98,.98,1.);\r\n  vec4 glowColor=vec4(.28,.73,.78,1.);\r\n  vec4 endColor=vec4(.2,.25,.91,1.);\r\n  vec4 color=mix(.5*baseColor,highColor,highColorRate)*endColorRate;\r\n  color=mix(.25*glowColor,color,baseColorRate)*endColorRate;\r\n  color=mix(.125*endColor,color,glowColorRate)*endColorRate;\r\n  return color;\r\n}\r\nvec4 distLightLine(vec2 p,vec2 a,vec2 b,float w){\r\n  float d=distLine(p,a,b,w);\r\n  return drawLight(d);\r\n}\r\nvec2 swingFun(vec2 uv,vec2 startPos,vec2 endPos,float power,float offset,float time){\r\n  vec2 v=endPos-startPos;\r\n  v=normalize(v);\r\n  vec2 uv0=uv*clamp(1./max(power,.01),.01,5.);\r\n  float a=0.;\r\n  if(power>.01){\r\n    a=fbm_noise_perlin(vec3(uv0,time));\r\n  }else{\r\n    a=abs(noise_perlin(vec3(uv0,time*2.)))-.5;\r\n  }\r\n  v=vec2(-v.y,v.x);\r\n  vec2 move=a*vec2(cos(a*2.*pi),sin(a*2.*pi))+offset*v;\r\n  return move*.3*power/length(1.5);\r\n  \r\n}\r\nvec4 elBall(vec2 uv,vec2 pos,float r,float time){\r\n  float len=length(uv-pos);\r\n  if(len<.05){\r\n    float a=abs(noise_perlin(vec3(uv*200.,time)));\r\n    return.15*drawLight(a*len*400.)*pow(clamp(1.-len/.05,0.,1.),3.);\r\n  }else{\r\n    return vec4(0.);\r\n  }\r\n}\r\n\r\nvoid main()\r\n{\r\n  vec4 color=vec4(0.);\r\n  vec2 aspectRatio=vec2(uSize.x/uSize.y,1.);\r\n  vec2 coord=vTextureCoord*aspectRatio;\r\n  vec2 startPos=uStartPos/uSize.y;\r\n  vec2 endPos=uEndPos/uSize.y;\r\n  vec2 branchStartPos=uBranchStartPos/uSize.y;\r\n  vec2 branchEndPos=uBranchEndPos/uSize.y;\r\n  float lineWidth=uLineWidth/uSize.y;\r\n  //float d=distLine(coord,startPos,endPos,uSize.x/uSize.y);\r\n  float len=distance(startPos,endPos);\r\n  //float d1=distLine(coord,branchStartPos,branchEndPos,uSize.x/uSize.y);\r\n  float len1=distance(branchStartPos,branchEndPos);\r\n  //if(d<max(len,.333)||(uBranchBool&&d1<max(len1,.333))){\r\n    \r\n    float gradualVal=gradual(coord,startPos,endPos);\r\n    float swing=sin(gradualVal*pi);\r\n    swing=1.-pow(1.-swing,2.);\r\n    \r\n    float gradualVal1=0.;\r\n    float branchSwing=0.;\r\n    if(uBranchBool){\r\n      gradualVal1=gradual(coord,branchStartPos,branchEndPos);\r\n      branchSwing=sin(gradualVal1*pi);\r\n      branchSwing=1.-pow(1.-branchSwing,2.);\r\n      if(!uStartFixed&&uEndFixed){\r\n        swing=mix(swing,branchSwing,gradualVal1);\r\n      }else if(uStartFixed&&!uEndFixed){\r\n        swing=mix(swing,branchSwing,1.-gradualVal1);\r\n      }else if(!uStartFixed&&!uEndFixed){\r\n        swing=mix(swing,branchSwing,branchSwing);\r\n      }else{\r\n        swing=mix(swing,branchSwing,1.-branchSwing);\r\n      }\r\n    }\r\n    \r\n    vec2 uv001=vTextureCoord*aspectRatio;\r\n    if(swing!=0.){\r\n      uv001+=swing*swingFun(1.2*uv001*aspectRatio,startPos,endPos,1.2*len,uOffset,uTime*3.);\r\n      if(uBranchBool){\r\n        if(branchSwing!=0.){\r\n          uv001+=gradualVal1*branchSwing*swingFun(1.2*uv001*aspectRatio,branchStartPos,branchEndPos,1.2*len1,uBranchOffset,uTime*3.);\r\n        }\r\n      }\r\n    }\r\n    float r=clamp(pow(.5*length(1.5)/len,2.),lineWidth,lineWidth*2.);\r\n    float gradualVal2=gradualVal;\r\n    if(uBranchBool){\r\n      gradualVal2=gradualVal1;\r\n    }\r\n    r*=mix(1.-.5*sin(gradualVal2*pi),3.,clamp(.01/len,0.,1.));\r\n    \r\n    if(uBranchBool){\r\n      color+=distLightLine(uv001,branchStartPos,branchEndPos,r);\r\n    }else{\r\n      color+=distLightLine(uv001,startPos,endPos,r);\r\n    }\r\n    \r\n    if(uBranchBool){\r\n      if(uStartFixed){\r\n        color+=elBall(coord,branchStartPos,1./len1,uTime*3.);\r\n      }\r\n      if(uEndFixed){\r\n        color+=elBall(coord,branchEndPos,1./len1,uTime*3.);\r\n      }\r\n    }else{\r\n      if(uStartFixed){\r\n        color+=elBall(coord,startPos,1./len,uTime*3.);\r\n      }\r\n      if(uEndFixed){\r\n        color+=elBall(coord,endPos,1./len,uTime*3.);\r\n      }\r\n    }\r\n    \r\n  //}\r\n  \r\n  gl_FragColor=color;\r\n}\r\n\r\n"},function(r,e){r.exports="precision mediump float;\r\nvarying vec2 vTextureCoord;\r\nuniform lowp vec2 uSize;\r\nuniform float uTime;\r\nuniform vec2 uStartPos;\r\nuniform vec2 uControlPos;\r\nuniform vec2 uEndPos;\r\nuniform float uLineSrcRate;\r\nuniform vec2 uLineTargetPos;\r\n\r\nuniform float uLineWidth;\r\nuniform bool uOffsetBool;\r\n\r\nconst float pi=3.14159265359;\r\nconst int OCTAVE_NUM=5;\r\n\r\nfloat distLine(vec2 p,vec2 a,vec2 b,float w){\r\n  vec2 pa=p-a;\r\n  vec2 ba=b-a;\r\n  float t=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);\r\n  return length(pa-ba*t)/w;\r\n}\r\nvec3 random3(vec3 p){\r\n  vec3 f=vec3(\r\n    dot(p,vec3(127.1,311.7,69.5)),\r\n    dot(p,vec3(269.5,183.3,132.7)),\r\n    dot(p,vec3(247.3,108.5,96.5))\r\n  );\r\n  return-1.+2.*fract(sin(f)*43758.5453123);\r\n}\r\nfloat noise_perlin(vec3 p){\r\n  vec3 i=floor(p);\r\n  vec3 s=fract(p);\r\n  float a=dot(random3(i),s);\r\n  float b=dot(random3(i+vec3(1,0,0)),s-vec3(1,0,0));\r\n  float c=dot(random3(i+vec3(0,1,0)),s-vec3(0,1,0));\r\n  float d=dot(random3(i+vec3(0,0,1)),s-vec3(0,0,1));\r\n  float e=dot(random3(i+vec3(1,1,0)),s-vec3(1,1,0));\r\n  float f=dot(random3(i+vec3(1,0,1)),s-vec3(1,0,1));\r\n  float g=dot(random3(i+vec3(0,1,1)),s-vec3(0,1,1));\r\n  float h=dot(random3(i+vec3(1,1,1)),s-vec3(1,1,1));\r\n  //vec3 u=smoothstep(0.,1.,s);\r\n  vec3 u=s*s*(3.-2.*s);\r\n  return mix(mix(mix(a,b,u.x),mix(c,e,u.x),u.y),mix(mix(d,f,u.x),mix(g,h,u.x),u.y),u.z);\r\n}\r\nfloat fbm_noise_perlin(vec3 p){\r\n  float f=0.;\r\n  float a=1.;\r\n  for(int i=0;i<OCTAVE_NUM;i++)\r\n  {\r\n    f+=a*noise_perlin(p);\r\n    p=2.*p;\r\n    a/=2.;\r\n  }\r\n  return f;\r\n}\r\n\r\nfloat cross(vec2 v0,vec2 v1){\r\n  return v0.x*v1.y-v0.y*v1.x;\r\n}\r\nvec2 getQuadraticCurveTo(vec2 p0,vec2 p1,vec2 p2,float t){\r\n  return p0*(1.-t)*(1.-t)+p1*2.*(1.-t)*t+p2*t*t;\r\n}\r\nvec2 getQuadraticCurveToTangent(vec2 p0,vec2 p1,vec2 p2,float t){\r\n  return 2.*t*(p0-p1*2.+p2)+2.*(-p0+p1);\r\n}\r\n\r\nfloat quadraticCurveGradual(vec2 p,vec2 a,vec2 b,vec2 c,float w){\r\n  float s=.5;\r\n  float rate=.5;\r\n  const int N=8;\r\n  vec2 p0=getQuadraticCurveTo(a,b,c,0.);\r\n  vec2 p2=getQuadraticCurveTo(a,b,c,1.);\r\n  vec2 p1=getQuadraticCurveTo(a,b,c,rate);\r\n  for(int i=0;i<N;i++){\r\n    vec2 t=getQuadraticCurveToTangent(a,b,c,rate);\r\n    t=vec2(-t.y,t.x);\r\n    if(cross(p-p1,t)<0.){\r\n      rate-=s*.5;\r\n      p2=p1;\r\n    }else{\r\n      rate+=s*.5;\r\n      p0=p1;\r\n    }\r\n    s*=.5;\r\n    p1=getQuadraticCurveTo(a,b,c,rate);\r\n  }\r\n  return rate;\r\n}\r\nvec2 quadraticCurve(vec2 p,vec2 a,vec2 b,vec2 c,float w){\r\n  float s=.5;\r\n  float rate=.5;\r\n  const int N=8;\r\n  vec2 p0=getQuadraticCurveTo(a,b,c,0.);\r\n  vec2 p2=getQuadraticCurveTo(a,b,c,1.);\r\n  vec2 p1=getQuadraticCurveTo(a,b,c,rate);\r\n  for(int i=0;i<N;i++){\r\n    vec2 t=getQuadraticCurveToTangent(a,b,c,rate);\r\n    t=vec2(-t.y,t.x);\r\n    if(cross(p-p1,t)<0.){\r\n      rate-=s*.5;\r\n      p2=p1;\r\n    }else{\r\n      rate+=s*.5;\r\n      p0=p1;\r\n    }\r\n    s*=.5;\r\n    p1=getQuadraticCurveTo(a,b,c,rate);\r\n  }\r\n  return vec2(distLine(p,p0,p2,w),rate);\r\n}\r\n\r\nvec4 distLightLine(vec2 p,vec2 a,vec2 b,vec2 c,float w){\r\n  vec2 quadraticCurveData=quadraticCurve(p,a,b,c,w);\r\n  float d=quadraticCurveData.x;\r\n  \r\n  float highColorRate=smoothstep(1.,0.,d);\r\n  float baseColorRate=smoothstep(1.,0.,d/4.);\r\n  float glowColorRate=smoothstep(1.,0.,d/16.);\r\n  vec4 highColor=vec4(1.,1.,1.,1.);\r\n  vec4 baseColor=vec4(.5,1.,1.,0.);\r\n  vec4 glowColor=vec4(.25,1.,1.,1.);\r\n  return highColorRate*highColor+.5*pow(baseColorRate,2.)*baseColor+.25*pow(glowColorRate,4.)*glowColor;\r\n}\r\nfloat gradual(vec2 p,vec2 a,vec2 b){\r\n  vec2 pa=p-a;\r\n  vec2 ba=b-a;\r\n  return clamp(dot(pa,ba)/dot(ba,ba),0.,1.);\r\n}\r\nvoid main()\r\n{\r\n  \r\n  vec2 lineStartPos,lineEndPos,lineControlPos;\r\n  if(uOffsetBool){\r\n    lineStartPos=getQuadraticCurveTo(uStartPos,uControlPos,uEndPos,uLineSrcRate);\r\n    lineEndPos=uLineTargetPos;\r\n    lineControlPos=mix(lineStartPos,lineEndPos,.5)+vec2(0.,0.);\r\n  }\r\n  vec4 color=vec4(0.);\r\n  float len=distance(uStartPos,uEndPos);\r\n  vec2 aspectRatio=vec2(uSize.x/uSize.y,1.);\r\n  vec2 coord=vTextureCoord*uSize;\r\n  {\r\n    //float gradualVal=quadraticCurveGradual(coord,uStartPos,uControlPos,uEndPos,1.);\r\n    float gradualVal=gradual(coord,uStartPos,uEndPos);\r\n    float gradualVal1=0.;\r\n    if(uOffsetBool){\r\n      //gradualVal1=quadraticCurveGradual(coord,lineStartPos,lineControlPos,lineEndPos,1.);\r\n      gradualVal1=gradual(coord,lineStartPos,lineEndPos);\r\n      gradualVal1=pow(gradualVal1,2.);\r\n    }\r\n    \r\n    float swing=sin(gradualVal*pi);\r\n    swing=1.-pow(1.-swing,2.);\r\n    if(uOffsetBool){\r\n      swing=mix(swing,sin((1.-gradualVal1)*.5*pi),gradualVal1);\r\n    }\r\n    vec2 uv001=vTextureCoord;\r\n    if(swing!=0.){\r\n      vec2 uv002=uv001*aspectRatio*clamp(500./max(len,10.),.75,10.);\r\n      if(uOffsetBool){\r\n        float len1=distance(lineStartPos,lineEndPos);\r\n        uv002*=1.+abs(.1*gradualVal1*(len-len1)/len1);\r\n      }\r\n      float a=fbm_noise_perlin(vec3(uv002,uTime*3.));\r\n      vec2 move=a*vec2(cos(a*2.*pi),sin(a*2.*pi));\r\n      float power=.3*len/length(uSize);\r\n      uv001+=swing*power*move;\r\n    }\r\n    \r\n    float r=clamp(pow(.5*length(uSize)/len,2.),uLineWidth,uLineWidth*2.);\r\n    uv001*=uSize;\r\n    float gradualVal0=gradualVal;\r\n    if(uOffsetBool){\r\n      gradualVal0=gradualVal1;\r\n    }\r\n    r*=mix((.5+.5*(1.-sin(gradualVal0*pi))),3.,clamp(10./len,0.,1.));\r\n    \r\n    if(uOffsetBool){\r\n      color+=distLightLine(uv001,lineStartPos,lineControlPos,lineEndPos,r);\r\n    }else{\r\n      color+=distLightLine(uv001,uStartPos,uControlPos,uEndPos,r);\r\n    }\r\n  }\r\n  gl_FragColor=color;\r\n  \r\n}\r\n\r\n"},,,,,,,,,,,,,,,,,,function(r,e,n){"use strict";n.r(e);var t=n(0),a=n(1),o=n(5),i=n.n(o),u=n(44),f=n.n(u),c=function(r,e,n){var a=Object(t.f)(r,e,n);return{program:a,attribLocations:{vertexPosition:t.b.attribFloat(r,a,"aVertexPosition",2),textureCoord:t.b.attribFloat(r,a,"aTextureCoord",2)},uniformLocations:{flipY:t.i.uniform1f(r,a,"uFlipY"),time:t.i.uniform1f(r,a,"uTime"),size:t.i.uniform2fv(r,a,"uSize"),startPos:t.i.uniform2fv(r,a,"uStartPos"),endPos:t.i.uniform2fv(r,a,"uEndPos"),offset:t.i.uniform1f(r,a,"uOffset"),lineWidth:t.i.uniform1f(r,a,"uLineWidth"),branchBool:t.i.uniform1i(r,a,"uBranchBool"),branchOffset:t.i.uniform1f(r,a,"uBranchOffset"),branchStartPos:t.i.uniform2fv(r,a,"uBranchStartPos"),branchEndPos:t.i.uniform2fv(r,a,"uBranchEndPos"),startFixed:t.i.uniform1i(r,a,"uStartFixed"),endFixed:t.i.uniform1i(r,a,"uEndFixed")}}},l=function(r){return Object.assign(Object(t.h)(r,c,i.a,f.a),{draw:function(e){r.drawElements(r.TRIANGLES,e,r.UNSIGNED_BYTE,0)}})},s=n(45),d=n.n(s),v=function(r,e,n){var a=Object(t.f)(r,e,n);return{program:a,attribLocations:{vertexPosition:t.b.attribFloat(r,a,"aVertexPosition",2),textureCoord:t.b.attribFloat(r,a,"aTextureCoord",2)},uniformLocations:{flipY:t.i.uniform1f(r,a,"uFlipY"),time:t.i.uniform1f(r,a,"uTime"),size:t.i.uniform2fv(r,a,"uSize"),startPos:t.i.uniform2fv(r,a,"uStartPos"),controlPos:t.i.uniform2fv(r,a,"uControlPos"),endPos:t.i.uniform2fv(r,a,"uEndPos"),offsetBool:t.i.uniform1i(r,a,"uOffsetBool"),lineSrcRate:t.i.uniform1f(r,a,"uLineSrcRate"),lineTargetPos:t.i.uniform2fv(r,a,"uLineTargetPos"),lineWidth:t.i.uniform1f(r,a,"uLineWidth")}}},p=function(r){return Object.assign(Object(t.h)(r,v,i.a,d.a),{draw:function(e){r.drawElements(r.TRIANGLES,e,r.UNSIGNED_BYTE,0)}})},m=n(23),g=n(9),h=n(11),b=n(6),x=n.n(b),E=n(2),S=function(r){return"number"==typeof r?r:"string"==typeof r&&/\~/g.test(r)?parseFloat(r.replace(/(.+)\~(.+)/g,(function(r,e,n){return E.a.mix(parseFloat(e),parseFloat(n),Math.random())}))):void 0},T=function(r){var e=[[0,0],[1,0],[1,1],[0,1]].flat(),n=Object(t.a)(r,e,2),a=[[0,0],[1,0],[1,1],[0,1]].flat(),o=Object(t.a)(r,a,2),i=[[0,1,3],[1,2,3]].flat();return{positionBufferData:n,textureCoordinatesBufferData:o,indicesBufferData:Object(t.d)(r,i)}},P=function(r,e,n,t,o){o.framebufferTextures,o.size,o.textData,o.textPos;var i=o.electricityRangeList,u=o.electricityList;u.forEach((function(r,e,n){!function(r,e,n,t){if("text"==t.start.type){if(t.start.index){var o=t.start.index.array,i=t.start.index.i,u=t.start.index.j;i=null!=i?i:Math.floor(o.length*Math.random()),u=null!=u?u:Math.floor(o[i].length*Math.random()),a.b.set(r.start.index,i,u)}r.start.range=S(t.start.range),r.start.seed=S(t.start.seed)}else"pos"==t.start.type?t.start.pos&&a.b.set.apply(a.b,[r.start.pos].concat(x()(t.start.pos))):"sub"==t.start.type&&(r.start.src=S(t.start.src),r.start.rate=S(t.start.rate),r.start.range=S(t.start.range),r.start.seed=S(t.start.seed));if("text"==t.end.type){if(t.end.index){a.b.set(r.end.index,t.end.i,t.end.j);var f=t.end.index.array,c=t.end.index.i,l=t.end.index.j,s=t.end.index.uniteRange;t.end.index.unite&&"text"==t.start.type?(c=null!=c?c:r.start.index[0],l=null!=l?l:Math.floor((r.start.index[1]+S(s))%f[c].length)):(c=null!=c?c:Math.floor(f.length*Math.random()),l=null!=l?l:Math.floor(f[c].length*Math.random())),a.b.set(r.end.index,c,l)}r.end.range=S(t.end.range),r.end.seed=S(t.end.seed)}else"pos"==t.end.type?t.end.pos&&a.b.set.apply(a.b,[r.end.pos].concat(x()(t.end.pos))):"sub"==t.end.type&&(r.end.src=S(t.end.src),r.end.rate=S(t.end.rate),r.end.range=S(t.end.range),r.end.seed=S(t.end.seed));r.lineWidth=S(t.lineWidth),r.lifeTimeMax=r.lifeTime=S(t.lifeTime),r.offset=S(t.offset)}(r,0,0,i[e])})),console.log(u)},y=function(r,e,n,o,i){var u=i.now,f=i.framebufferTextures,c=(i.mPos,i.size),l=(i.textData,i.textPos);i.electricityRangeList,i.electricityList;r.enable(r.BLEND),r.blendFunc(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA);var s=n.view,d=e.viewShader;d.use(),d.attribSet({vertexPosition:s.positionBufferData.buffer,textureCoord:s.textureCoordinatesBufferData.buffer}),d.uniformSet({flipY:1}),Object(t.j)(r,f.text),s.textureCoordinatesBufferData.set(Object(t.e)([0,0,1,1]));var v=l[0]/r.canvas.width,p=l[1]/r.canvas.height;s.positionBufferData.set(Object(t.e)([v,p,v+o.text.width/r.canvas.width,p+o.text.height/r.canvas.height])),d.uniformSet({sampler:o.text}),d.draw(s.indicesBufferData.length);var m=n.face,g=e.blurShader;g.use(),g.attribSet({vertexPosition:m.positionBufferData.buffer,textureCoord:m.textureCoordinatesBufferData.buffer}),g.uniformSet({size:c,flipY:1,sampler:f.text.texture,width:10,power:.2,dir:[.7071,.7071]}),Object(t.j)(r,f.blurs[0]),g.draw(m.indicesBufferData.length),g.uniformSet({sampler:f.blurs[0].texture,dir:[.7071,-.7071]}),Object(t.j)(r,f.blurs[1]),g.draw(m.indicesBufferData.length),Object(t.j)(r);var h=n.face,b=e.addShader;b.use(),b.attribSet({vertexPosition:h.positionBufferData.buffer,textureCoord:h.textureCoordinatesBufferData.buffer}),b.uniformSet({flipY:-1,samplerA:f.text.texture,samplerB:f.blurs[1].texture}),b.draw(h.indicesBufferData.length);var x=n.face,E=e.electricityShader;E.use(),E.attribSet({vertexPosition:x.positionBufferData.buffer,textureCoord:x.textureCoordinatesBufferData.buffer}),E.uniformSet({size:c,time:.001*u,flipY:-1}),r.blendFunc(r.ONE,r.ONE);var S=[100,200],T=[100,500];E.uniformSet({startPos:S,endPos:T,lineWidth:2,branchBool:!1,offset:0}),E.draw(x.indicesBufferData.length),E.uniformSet({branchBool:!0,branchStartPos:a.a.mix(S,T,.6666),branchEndPos:[200,480],lineWidth:.5,branchOffset:-1,startFixed:!1,endFixed:!0}),E.draw(x.indicesBufferData.length),E.uniformSet({branchBool:!0,branchStartPos:a.a.mix(S,T,.3333),branchEndPos:[200,200],lineWidth:.5,branchOffset:1,startFixed:!1,endFixed:!0}),E.draw(x.indicesBufferData.length)};!function(){var r=document.querySelector("#glcanvas"),e={alpha:!1},n=r.getContext("webgl2",e);if(n||(n=r.getContext("webgl",e)||r.getContext("experimental-webgl",e),!1),n){var o=function(r,e){if(!(r.length<=0)){var n=document.createElement("canvas"),t=n.getContext("2d");t.textAlign="start",t.textBaseline="hanging",t.font=e;var o=t.measureText(r),i=o.actualBoundingBoxRight-o.actualBoundingBoxLeft,u=o.actualBoundingBoxDescent+o.actualBoundingBoxAscent;n.width=i+22,n.height=u+22,t.textAlign="start",t.textBaseline="hanging",t.font=e,t.fillStyle="#ffffff",t.fillText(r,11,o.actualBoundingBoxAscent+11);for(var f=t.getImageData(0,0,n.width,n.height),c=f.data,l=function(r,e,n){return 4*(e+n*r.width)},s=[[0,-1],[1,0],[0,1],[-1,0]],d=[],v=[],p=t.createImageData(f.width,f.height),m=function(r){for(var e=function(e){var n=l(f,e,r);if(c[n+3]>127&&s.some((function(n){return e+n[0]<0||e+n[0]>=f.width||r+n[1]<0||r+n[1]>=f.height||c[l(f,e+n[0],r+n[1])+3]<=127}))){p.data[n+0]=255,p.data[n+1]=255,p.data[n+2]=255,p.data[n+3]=255,d.push([e,r]);var t=s.map((function(t){return a.a.scale(t,c[l(f,e+t[0],r+t[1])+3]-c[n+3])})),o=[0,0];t.forEach((function(r){a.b.add(o,r)})),a.b.normalize(o),v.push(o)}},n=0;n<f.width;n++)e(n)},g=0;g<f.height;g++)m(g);for(var h=[],b=0;b<d.length-1;b++){for(var x=-1,E=b+1;E<d.length;E++){var S=a.a.abs(a.a.sub(d[b],d[E]));if(S[0]<=1&&S[1]<=1&&(x=E,S[0]*S[1]==0))break}if(x>=0){var T=[d[b+1],d[x]];d[x]=T[0],d[b+1]=T[1];var P=[v[b+1],v[x]];v[x]=P[0],v[b+1]=P[1]}else h.push(b+1)}h.push(d.length);for(var y=[],w=[],R=0,B=0;B<h.length;B++)y.push(d.slice(R,h[B])),w.push(v.slice(R,h[B])),R=h[B];t.clearRect(0,0,n.width,n.height),t.globalAlpha=.5,t.fillStyle="#ffffff",t.strokeStyle="#3f7fff",t.lineWidth=1,t.globalAlpha=.35,t.fillText(r,11,o.actualBoundingBoxAscent+11),t.globalAlpha=.5,t.strokeText(r,11,o.actualBoundingBoxAscent+11);var C=n.toDataURL();return{width:n.width,height:n.height,posListG:y,normalListG:w,base64:C}}}("POWER","bold 100px Courier New"),i=[.5*n.canvas.width-.5*o.width,.5*n.canvas.height-.5*o.height],u={electricityShader:l(n),quadraticCurveElectricityShader:p(n),viewShader:Object(m.a)(n),blurShader:Object(g.a)(n),addShader:Object(h.a)(n)},f={face:T(n),view:T(n)},c={text:Object(t.g)(n,o.base64),image:Object(t.g)(n,"../img/image.c0ad24103ffb3cb48c09355b0f9bff2b.jpg")},s=[.5*n.canvas.width,.5*n.canvas.height];r.addEventListener("mousemove",(function(r){a.b.set(s,r.pageX,r.pageY)}));for(var d=[n.canvas.clientWidth,n.canvas.clientHeight],v={text:Object(t.c)(n),blurs:[Object(t.c)(n),Object(t.c)(n)]},b=[{active:!0,start:{type:"pos",pos:[0,0]},end:{type:"text",range:"20~40",seed:"0~100"},lineWidth:3,lifeTime:"50~100",offset:"0.05~0.2"},{active:!0,start:{type:"sub",src:0,rate:"0.5~0.95",range:"0.1~0.4",seed:"0~100"},end:{type:"text",range:"10~40",seed:"0~100"},lineWidth:"0.4~0.6",lifeTime:"25~50",offset:"0.1~0.25"},{active:!0,start:{type:"sub",src:0,rate:"0.5~0.95",range:"0.1~0.4",seed:"0~100"},end:{type:"text",range:"10~40",seed:"0~100"},lineWidth:"0.4~0.6",lifeTime:"25~50",offset:"0.1~0.25"},{active:!0,start:{type:"sub",src:0,rate:"0~1",range:"0.1~0.4",seed:"0~100"},end:{type:"sub",src:0,rate:"0~1",range:"0.1~0.4",seed:"0~100"},lineWidth:"0.5~0.8",lifeTime:"25~50",offset:"-1~1"}],x=0;x<o.posListG.length;x++)for(var E=Math.ceil(o.posListG[x].length/200)+1,S=0;S<E;S++)b.push({active:!0,start:{type:"text",index:{array:o.posListG,i:x},range:"5~10",seed:"0~100"},end:{type:"text",index:{array:o.posListG,unite:!0,uniteRange:"10~40",i:x},range:"5~10",seed:"0~100"},lineWidth:"0.25~0.75",lifeTime:"40~80",offset:"0.2~0.8"});var w=b.map((function(r,e,n){return function(r,e,n){var t={};return t.type=r.start.type+"-"+r.end.type,t.active=r.active,t.start={type:r.start.type},"text"==r.start.type?(t.start.index=[0,0],t.start.range=0,t.start.seed=0):"pos"==r.start.type?t.start.pos=[0,0]:"sub"==r.start.type&&(t.start.src=0,t.start.rate=0),t.end={type:r.start.type},"text"==r.end.type?(t.end.index=[0,0],t.end.range=0,t.end.seed=0):"pos"==r.end.type?t.end.pos=[0,0]:"sub"==r.end.type&&(t.end.src=0,t.end.rate=0),t.lineWidth=0,t.lifeTime=0,t.lifeTimeMax=0,t.offset=0,t}(r)}));P(n,u,f,c,{framebufferTextures:v,size:d,textData:o,textPos:i,electricityRangeList:b,electricityList:w});var R=0;requestAnimationFrame((function r(e){var t=.001*(e-R);R=e,requestAnimationFrame(r),y(n,u,f,c,{now:e,delta:t,mPos:s,framebufferTextures:v,size:d,textData:o,textPos:i,electricityRangeList:b,electricityList:w})}))}else alert("無法初始化WebGL。您的瀏覽器或機器可能不支持它。")}()}]);