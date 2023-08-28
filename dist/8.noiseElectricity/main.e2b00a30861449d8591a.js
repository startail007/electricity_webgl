!function(e){var n={};function t(r){if(n[r])return n[r].exports;var a=n[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,t),a.l=!0,a.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var a in e)t.d(r,a,function(n){return e[n]}.bind(null,a));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=70)}([function(e,n,t){"use strict";t.d(n,"h",(function(){return p})),t.d(n,"f",(function(){return r})),t.d(n,"c",(function(){return s})),t.d(n,"a",(function(){return o})),t.d(n,"d",(function(){return i})),t.d(n,"g",(function(){return f})),t.d(n,"b",(function(){return d})),t.d(n,"i",(function(){return v})),t.d(n,"e",(function(){return m})),t.d(n,"j",(function(){return h}));var r=function(e,n,t){var r=a(e,e.VERTEX_SHADER,n),o=a(e,e.FRAGMENT_SHADER,t),i=e.createProgram();return e.attachShader(i,r),e.attachShader(i,o),e.linkProgram(i),e.getProgramParameter(i,e.LINK_STATUS)?i:(alert("無法初始化著色器程序: "+e.getProgramInfoLog(i)),null)},a=function(e,n,t){var r=e.createShader(n);return e.shaderSource(r,t),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(alert("編譯著色器時發生錯誤: "+e.getShaderInfoLog(r)),e.deleteShader(r),null)},o=function(e,n,t){var r,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:Float32Array,o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:e.STATIC_DRAW,i=e.createBuffer(),u=0,f={buffer:i,get data(){return r},get length(){return r.length},set:function(n){r=new a(n),u=100*Math.ceil(r.length/t/100),e.bindBuffer(e.ARRAY_BUFFER,i),e.bufferData(e.ARRAY_BUFFER,u*t*4,o),e.bufferSubData(e.ARRAY_BUFFER,0,r)},add:function(n){var f=r.length,c=100*Math.floor(r.length/t/100);c>=u&&(u=c+100,e.bindBuffer(e.ARRAY_BUFFER,i),e.bufferData(e.ARRAY_BUFFER,u*t*4,o),e.bufferSubData(e.ARRAY_BUFFER,0,r));var l=new a(f+t);l.set(r),r=l,this.item(f/t,n)},item:function(n,o){var u=new a(o);r.set(u,n*t),e.bindBuffer(e.ARRAY_BUFFER,i),e.bufferSubData(e.ARRAY_BUFFER,n*t*4,u)},getItem:function(e){return Array.from(r.slice(e*t,(e+1)*t))}};return f.set(n),f},i=function(e,n){var t,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Uint8Array,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:e.STATIC_DRAW,o=e.createBuffer(),i=0,u=3,f={buffer:o,get data(){return t},get length(){return t.length},set:function(n){t=new r(n),i=100*Math.ceil(t.length/u/100),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,o),e.bufferData(e.ELEMENT_ARRAY_BUFFER,i*u*4,a),e.bufferSubData(e.ELEMENT_ARRAY_BUFFER,0,t)},add:function(n){var f=t.length,c=100*Math.floor(t.length/u/100);c>=i&&(i=c+100,e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,o),e.bufferData(e.ELEMENT_ARRAY_BUFFER,i*u*4,a),e.bufferSubData(e.ELEMENT_ARRAY_BUFFER,0,t));var l=new r(f+u);l.set(t),t=l,this.item(f/u,n)},item:function(n,a){var i=new r(a);t.set(i,n*u),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,o),e.bufferSubData(e.ELEMENT_ARRAY_BUFFER,n*u*4,i)},getItem:function(e){return Array.from(t.slice(e*u,(e+1)*u))}};return f.set(n),f},u=function(e){var n=e.createTexture();return e.bindTexture(e.TEXTURE_2D,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),n},f=function(e,n){var t=u(e),r=new Image;return r.onload=function(){t.width=r.width,t.height=r.height,e.bindTexture(e.TEXTURE_2D,t),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,r),e.bindTexture(e.TEXTURE_2D,null)},r.src=n,t},c=function(e,n,t,r){e.bindFramebuffer(e.FRAMEBUFFER,n),void 0!==t&&void 0!==r&&e.viewport(0,0,t,r)},l=function(e,n){var t=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];n?t?c(e,n.framebuffer,n.width,n.height):c(e,n.framebuffer):t?c(e,null,e.canvas.width,e.canvas.height):c(e,null)},s=function(e,n,t){var r={width:n||e.canvas.clientWidth,height:t||e.canvas.clientHeight},a=u(e);r.texture=a,e.texImage2D(e.TEXTURE_2D,0,e.RGBA,r.width,r.height,0,e.RGBA,e.UNSIGNED_BYTE,null);var o=e.createFramebuffer();return r.framebuffer=o,e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,a,0),e.bindFramebuffer(e.FRAMEBUFFER,null),r},d={attribFloat:function(e,n,t,r){var a=e.getAttribLocation(n,t);return e.enableVertexAttribArray(a),function(n){e.bindBuffer(e.ARRAY_BUFFER,n),e.vertexAttribPointer(a,r,e.FLOAT,!1,0,0)}}},v={uniform1f:function(e,n,t){var r=e.getUniformLocation(n,t);return function(n){e.uniform1f(r,n)}},uniform2fv:function(e,n,t){var r=e.getUniformLocation(n,t);return function(n){e.uniform2fv(r,n)}},uniform3fv:function(e,n,t){var r=e.getUniformLocation(n,t);return function(n){e.uniform3fv(r,n)}},uniformTexture:function(e,n,t,r){var a=e.getUniformLocation(n,t);return function(n){e.activeTexture(e.TEXTURE0+r),e.bindTexture(e.TEXTURE_2D,n),e.uniform1i(a,r)}},uniform1i:function(e,n,t){var r=e.getUniformLocation(n,t);return function(n){e.uniform1i(r,n)}},uniformMatrix4fv:function(e,n,t){var r=e.getUniformLocation(n,t);return function(n){e.uniformMatrix4fv(r,!1,n)}}},p=function(e,n,t,r,a){var o=n(e,t,r);return{programInfo:o,use:function(){e.useProgram(o.program)},attribSet:function(e){for(var n in e)o.attribLocations[n]&&o.attribLocations[n](e[n])},uniformSet:function(e){for(var n in e)o.uniformLocations[n]&&o.uniformLocations[n](e[n])},elementSet:function(n){e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,n)}}},m=function(e){return[[e[0],e[1]],[e[2],e[1]],[e[2],e[3]],[e[0],e[3]]].flat()},g=function(e){e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT)},h=function(e,n){var t=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];l(e,n,r),t&&g(e)}},function(e,n,t){"use strict";t.d(n,"a",(function(){return f})),t.d(n,"b",(function(){return c}));var r=t(3),a=t.n(r),o=t(4),i=t.n(o),u=t(2),f=function(){function e(){a()(this,e)}return i()(e,null,[{key:"normalize",value:function(n){return e.length(n)?e.scale(n,1/e.length(n)):n}},{key:"rotate",value:function(e,n){var t=Math.cos(n),r=Math.sin(n);return[e[0]*t-e[1]*r,e[1]*t+e[0]*r]}},{key:"dot",value:function(e,n){return e[0]*n[0]+e[1]*n[1]}},{key:"cross",value:function(e,n){return e[0]*n[1]-e[1]*n[0]}},{key:"add",value:function(e,n){return[e[0]+n[0],e[1]+n[1]]}},{key:"sub",value:function(e,n){return[e[0]-n[0],e[1]-n[1]]}},{key:"projection",value:function(n,t){var r=e.dot(n,t)/e.dot(t,t);return[t[0]*r,t[1]*r]}},{key:"length",value:function(n){return Math.sqrt(e.dot(n,n))}},{key:"mul",value:function(e,n){return[e[0]*n[0],e[1]*n[1]]}},{key:"div",value:function(e,n){return[e[0]/n[0],e[1]/n[1]]}},{key:"scale",value:function(e,n){return[e[0]*n,e[1]*n]}},{key:"collisionCalc",value:function(n,t,r,a){return e.scale(e.add(e.scale(n,r-a),e.scale(t,2*a)),1/(r+a))}},{key:"getAngle",value:function(e){return Math.atan2(e[1],e[0])}},{key:"floor",value:function(e){return[Math.floor(e[0]),Math.floor(e[1])]}},{key:"fract",value:function(e){return[u.a.fract(e[0]),u.a.fract(e[1])]}},{key:"sin",value:function(e){return[Math.sin(e[0]),Math.sin(e[1])]}},{key:"cos",value:function(e){return[Math.cos(e[0]),Math.cos(e[1])]}},{key:"distance",value:function(n,t){return e.length(e.sub(t,n))}},{key:"mix",value:function(e,n,t){return[u.a.mix(e[0],n[0],t),u.a.mix(e[1],n[1],t)]}},{key:"abs",value:function(e){return[Math.abs(e[0]),Math.abs(e[1])]}},{key:"getLine",value:function(n,t){return{pos:n,dir:e.sub(t,n)}}}]),e}(),c=function(){function e(){a()(this,e)}return i()(e,null,[{key:"set",value:function(e,n,t){return e[0]=n,e[1]=t,e}},{key:"normalize",value:function(n){var t=f.length(n);return t&&e.scale(n,1/t),n}},{key:"add",value:function(e,n){return e[0]+=n[0],e[1]+=n[1],e}},{key:"sub",value:function(e,n){return e[0]-=n[0],e[1]-=n[1],e}},{key:"scale",value:function(e,n){return e[0]*=n,e[1]*=n,e}},{key:"rotate",value:function(e,n){var t=Math.cos(n),r=Math.sin(n),a=[e[0]*t-e[1]*r,e[1]*t+e[0]*r];return e[0]=a[0],e[1]=a[1],e}}]),e}()},function(e,n,t){"use strict";t.d(n,"a",(function(){return u}));var r=t(3),a=t.n(r),o=t(4),i=t.n(o),u=function(){function e(){a()(this,e)}return i()(e,null,[{key:"mix",value:function(e,n,t){return e*(1-t)+n*t}},{key:"fract",value:function(e){return(e%=1)<0?e+1:e}},{key:"inverseMix",value:function(e,n,t){return(t-e)/(n-e)}},{key:"clamp",value:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;return e<=n?n:e>=t?t:e}},{key:"smoothstep",value:function(e,n,t){return(t=clamp(inverseMix(e,n,t)))*t*(3-2*t)}}]),e}()},function(e,n){e.exports=function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}},function(e,n){function t(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}e.exports=function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}},function(e,n){e.exports="attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nvarying highp vec2 vTextureCoord;\nuniform float uFlipY;\nvoid main(void){\n  vTextureCoord=aTextureCoord;\n  gl_Position=vec4((2.*aVertexPosition+vec2(-1.,-1.))*vec2(1.,uFlipY),0.,1.);\n}"},function(e,n,t){var r=t(10),a=t(11),o=t(12),i=t(13);e.exports=function(e){return r(e)||a(e)||o(e)||i()}},,function(e,n){e.exports=function(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}},,function(e,n,t){var r=t(8);e.exports=function(e){if(Array.isArray(e))return r(e)}},function(e,n){e.exports=function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}},function(e,n,t){var r=t(8);e.exports=function(e,n){if(e){if("string"==typeof e)return r(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?r(e,n):void 0}}},function(e,n){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},function(e,n,t){"use strict";var r=t(0),a=t(5),o=t.n(a),i=t(15),u=t.n(i),f=function(e,n,t){var a=Object(r.f)(e,n,t);return{program:a,attribLocations:{vertexPosition:r.b.attribFloat(e,a,"aVertexPosition",2),textureCoord:r.b.attribFloat(e,a,"aTextureCoord",2)},uniformLocations:{flipY:r.i.uniform1f(e,a,"uFlipY"),sampler:r.i.uniformTexture(e,a,"uSampler",0),size:r.i.uniform2fv(e,a,"uSize"),dir:r.i.uniform2fv(e,a,"uDir"),width:r.i.uniform1f(e,a,"uWidth"),power:r.i.uniform1f(e,a,"uPower")}}};n.a=function(e){return Object.assign(Object(r.h)(e,f,o.a,u.a),{draw:function(n){e.drawElements(e.TRIANGLES,n,e.UNSIGNED_BYTE,0)}})}},function(e,n){e.exports="precision mediump float;\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform lowp vec2 uSize;\nuniform vec2 uDir;\nuniform float uWidth;\nuniform float uPower;\nconst float pi=3.14159265359;\nvoid main()\n{\n  vec4 color=texture2D(uSampler,vTextureCoord);\n  const int N=10;\n  float ii=max(uWidth,float(N))/float(N);\n  for(int i=1;i<=N;i++){\n    if(uWidth<float(N)&&float(i)>uWidth){\n      break;\n    }\n    float val=cos((float(i)/float(N))*pi);\n    float rate=pow(exp(2.*val)/exp(2.),.75);\n    color+=rate*texture2D(uSampler,vTextureCoord+float(i)*ii*uDir/uSize);\n    color+=rate*texture2D(uSampler,vTextureCoord-float(i)*ii*uDir/uSize);\n  }\n  //color.rgb/=color.a;\n  gl_FragColor=uPower*color;\n}\n"},function(e,n,t){"use strict";var r=t(0),a=t(5),o=t.n(a),i=t(17),u=t.n(i),f=function(e,n,t){var a=Object(r.f)(e,n,t);return{program:a,attribLocations:{vertexPosition:r.b.attribFloat(e,a,"aVertexPosition",2),textureCoord:r.b.attribFloat(e,a,"aTextureCoord",2)},uniformLocations:{flipY:r.i.uniform1f(e,a,"uFlipY"),samplerA:r.i.uniformTexture(e,a,"uSamplerA",0),samplerB:r.i.uniformTexture(e,a,"uSamplerB",1)}}};n.a=function(e){return Object.assign(Object(r.h)(e,f,o.a,u.a),{draw:function(n){e.drawElements(e.TRIANGLES,n,e.UNSIGNED_BYTE,0)}})}},function(e,n){e.exports="precision mediump float;\nvarying vec2 vTextureCoord;\nuniform sampler2D uSamplerA;\nuniform sampler2D uSamplerB;\nvoid main()\n{\n  gl_FragColor=texture2D(uSamplerA,vTextureCoord)+texture2D(uSamplerB,vTextureCoord);\n}\n"},,,,,,,,function(e,n,t){"use strict";var r=t(0),a=t(5),o=t.n(a),i=t(26),u=t.n(i),f=function(e,n,t){var a=Object(r.f)(e,n,t);return{program:a,attribLocations:{vertexPosition:r.b.attribFloat(e,a,"aVertexPosition",2),textureCoord:r.b.attribFloat(e,a,"aTextureCoord",2)},uniformLocations:{flipY:r.i.uniform1f(e,a,"uFlipY"),sampler:r.i.uniformTexture(e,a,"uSampler",0)}}};n.a=function(e){return Object.assign(Object(r.h)(e,f,o.a,u.a),{draw:function(n){e.drawElements(e.TRIANGLES,n,e.UNSIGNED_BYTE,0)}})}},function(e,n){e.exports="precision highp float;\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nvoid main()\n{\n  gl_FragColor=texture2D(uSampler,vTextureCoord);\n}\n"},,,,,,,,,,,,,,,,,,,,,function(e,n){e.exports="precision highp float;\nvarying vec2 vTextureCoord;\nuniform vec2 uSize;\nuniform float uTime;\n\nuniform float uLineWidth;\n\nuniform vec2 uStartPos;\nuniform vec2 uEndPos;\nuniform float uOffset;\n\nuniform bool uBranchBool;\nuniform vec2 uBranchStartPos;\nuniform vec2 uBranchEndPos;\nuniform float uBranchOffset;\nuniform bool uStartFixed;\nuniform bool uEndFixed;\n//uniform sampler2D uSampler;\n\nconst float pi=3.14159265359;\nconst int OCTAVE_NUM=5;\n\nfloat distLine(vec2 p,vec2 a,vec2 b,float w){\n  vec2 pa=p-a;\n  vec2 ba=b-a;\n  float t=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);\n  return length(pa-ba*t)/w;\n}\nfloat gradual(vec2 p,vec2 a,vec2 b){\n  vec2 pa=p-a;\n  vec2 ba=b-a;\n  return clamp(dot(pa,ba)/dot(ba,ba),0.,1.);\n}\nvec3 random3(vec3 p){\n  vec3 f=vec3(\n    dot(p,vec3(1.271,3.117,.695)),\n    dot(p,vec3(2.695,1.833,1.327)),\n    dot(p,vec3(2.473,1.085,.965))\n  );\n  return-1.+2.*fract(sin(f)*437.585453123);\n}\nfloat noise_perlin(vec3 p){\n  vec3 i=floor(p);\n  vec3 s=fract(p);\n  float a=dot(random3(i),s);\n  float b=dot(random3(i+vec3(1,0,0)),s-vec3(1,0,0));\n  float c=dot(random3(i+vec3(0,1,0)),s-vec3(0,1,0));\n  float d=dot(random3(i+vec3(0,0,1)),s-vec3(0,0,1));\n  float e=dot(random3(i+vec3(1,1,0)),s-vec3(1,1,0));\n  float f=dot(random3(i+vec3(1,0,1)),s-vec3(1,0,1));\n  float g=dot(random3(i+vec3(0,1,1)),s-vec3(0,1,1));\n  float h=dot(random3(i+vec3(1,1,1)),s-vec3(1,1,1));\n  //vec3 u=smoothstep(0.,1.,s);\n  vec3 u=s*s*(3.-2.*s);\n  return mix(mix(mix(a,b,u.x),mix(c,e,u.x),u.y),mix(mix(d,f,u.x),mix(g,h,u.x),u.y),u.z);\n}\nfloat fbm_noise_perlin(vec3 p){\n  float f=0.;\n  float a=1.;\n  for(int i=0;i<OCTAVE_NUM;i++)\n  {\n    f+=a*noise_perlin(p);\n    p=2.*p;\n    a/=2.;\n  }\n  return f;\n}\nfloat fbm_abs_noise_perlin(vec3 p){\n  float f=0.;\n  float a=1.;\n  for(int i=0;i<OCTAVE_NUM;i++)\n  {\n    f+=a*abs(noise_perlin(p));\n    p=2.*p;\n    a/=2.;\n  }\n  return f;\n}\n\nvec2 random2(vec2 p,vec2 loop){\n  if(loop.x!=0.){\n    p.x=mod(p.x,loop.x);\n  }\n  if(loop.y!=0.){\n    p.y=mod(p.y,loop.y);\n  }\n  vec2 f=vec2(\n    dot(p,vec2(1.271,3.117)),\n    dot(p,vec2(2.695,1.833))\n  );\n  return-1.+2.*fract(sin(f)*437.585453123);\n}\n\nfloat noise_perlin(vec2 p,vec2 loop){\n  vec2 i=floor(p);\n  vec2 f=fract(p);\n  float a=dot(random2(i,loop),f);\n  float b=dot(random2(i+vec2(1.,0.),loop),f-vec2(1.,0.));\n  float c=dot(random2(i+vec2(0.,1.),loop),f-vec2(0.,1.));\n  float d=dot(random2(i+vec2(1.,1.),loop),f-vec2(1.,1.));\n  //vec2 u=smoothstep(0.,1.,f);\n  vec2 u=f*f*(3.-2.*f);\n  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);\n}\n\nfloat fbm_noise_perlin(vec2 p,vec2 loop){\n  float f=0.;\n  float a=.5;\n  for(int i=0;i<OCTAVE_NUM;i++)\n  {\n    f+=a*noise_perlin(p,loop);\n    p*=2.;\n    a/=2.;\n  }\n  return f;\n}\nvec4 drawLight(float d){\n  float highColorRate=smoothstep(1.,0.,d);\n  float baseColorRate=smoothstep(1.,0.,d/4.);\n  float glowColorRate=smoothstep(1.,0.,d/8.);\n  float endColorRate=smoothstep(1.,0.,d/16.);\n  vec4 highColor=vec4(1.,1.,1.,1.);\n  vec4 baseColor=vec4(.35,.98,.98,1.);\n  vec4 glowColor=vec4(.28,.73,.78,1.);\n  vec4 endColor=vec4(.2,.25,.91,1.);\n  vec4 color=mix(.5*baseColor,highColor,highColorRate)*endColorRate;\n  color=mix(.25*glowColor,color,baseColorRate)*endColorRate;\n  color=mix(.125*endColor,color,glowColorRate)*endColorRate;\n  return color;\n}\nvec4 distLightLine(vec2 p,vec2 a,vec2 b,float w){\n  float d=distLine(p,a,b,w);\n  return drawLight(d);\n}\nvec2 swingFun(vec2 uv,vec2 startPos,vec2 endPos,float power,float offset,float time){\n  vec2 v=endPos-startPos;\n  v=normalize(v);\n  vec2 uv0=uv*clamp(1./max(power,.01),.01,5.);\n  float a=0.;\n  if(power>.01){\n    a=fbm_noise_perlin(vec3(uv0,time));\n  }else{\n    a=abs(noise_perlin(vec3(uv0,time*2.)))-.5;\n  }\n  v=vec2(-v.y,v.x);\n  vec2 move=a*vec2(cos(a*2.*pi),sin(a*2.*pi))+offset*v;\n  return move*.3*power/length(1.5);\n  \n}\nvec4 elBall(vec2 uv,vec2 pos,float r,float time){\n  float len=length(uv-pos);\n  if(len<.05){\n    float a=abs(noise_perlin(vec3(uv*200.,time)));\n    return.15*drawLight(a*len*400.)*pow(clamp(1.-len/.05,0.,1.),3.);\n  }else{\n    return vec4(0.);\n  }\n}\n\nvoid main()\n{\n  vec4 color=vec4(0.);\n  vec2 aspectRatio=vec2(uSize.x/uSize.y,1.);\n  vec2 coord=vTextureCoord*aspectRatio;\n  vec2 startPos=uStartPos/uSize.y;\n  vec2 endPos=uEndPos/uSize.y;\n  vec2 branchStartPos=uBranchStartPos/uSize.y;\n  vec2 branchEndPos=uBranchEndPos/uSize.y;\n  float lineWidth=uLineWidth/uSize.y;\n  //float d=distLine(coord,startPos,endPos,uSize.x/uSize.y);\n  float len=distance(startPos,endPos);\n  //float d1=distLine(coord,branchStartPos,branchEndPos,uSize.x/uSize.y);\n  float len1=distance(branchStartPos,branchEndPos);\n  //if(d<max(len,.333)||(uBranchBool&&d1<max(len1,.333))){\n    \n    float gradualVal=gradual(coord,startPos,endPos);\n    float swing=sin(gradualVal*pi);\n    swing=1.-pow(1.-swing,2.);\n    \n    float gradualVal1=0.;\n    float branchSwing=0.;\n    if(uBranchBool){\n      gradualVal1=gradual(coord,branchStartPos,branchEndPos);\n      branchSwing=sin(gradualVal1*pi);\n      branchSwing=1.-pow(1.-branchSwing,2.);\n      if(!uStartFixed&&uEndFixed){\n        swing=mix(swing,branchSwing,gradualVal1);\n      }else if(uStartFixed&&!uEndFixed){\n        swing=mix(swing,branchSwing,1.-gradualVal1);\n      }else if(!uStartFixed&&!uEndFixed){\n        swing=mix(swing,branchSwing,branchSwing);\n      }else{\n        swing=mix(swing,branchSwing,1.-branchSwing);\n      }\n    }\n    \n    vec2 uv001=vTextureCoord*aspectRatio;\n    if(swing!=0.){\n      uv001+=swing*swingFun(1.2*uv001*aspectRatio,startPos,endPos,1.2*len,uOffset,uTime*3.);\n      if(uBranchBool){\n        if(branchSwing!=0.){\n          uv001+=gradualVal1*branchSwing*swingFun(1.2*uv001*aspectRatio,branchStartPos,branchEndPos,1.2*len1,uBranchOffset,uTime*3.);\n        }\n      }\n    }\n    float r=clamp(pow(.5*length(1.5)/len,2.),lineWidth,lineWidth*2.);\n    float gradualVal2=gradualVal;\n    if(uBranchBool){\n      gradualVal2=gradualVal1;\n    }\n    r*=mix(1.-.5*sin(gradualVal2*pi),3.,clamp(.01/len,0.,1.));\n    \n    if(uBranchBool){\n      color+=distLightLine(uv001,branchStartPos,branchEndPos,r);\n    }else{\n      color+=distLightLine(uv001,startPos,endPos,r);\n    }\n    \n    if(uBranchBool){\n      if(uStartFixed){\n        color+=elBall(coord,branchStartPos,1./len1,uTime*3.);\n      }\n      if(uEndFixed){\n        color+=elBall(coord,branchEndPos,1./len1,uTime*3.);\n      }\n    }else{\n      if(uStartFixed){\n        color+=elBall(coord,startPos,1./len,uTime*3.);\n      }\n      if(uEndFixed){\n        color+=elBall(coord,endPos,1./len,uTime*3.);\n      }\n    }\n    \n  //}\n  \n  gl_FragColor=color;\n}\n\n"},function(e,n){e.exports="precision mediump float;\nvarying vec2 vTextureCoord;\nuniform lowp vec2 uSize;\nuniform float uTime;\nuniform vec2 uStartPos;\nuniform vec2 uControlPos;\nuniform vec2 uEndPos;\nuniform float uLineSrcRate;\nuniform vec2 uLineTargetPos;\n\nuniform float uLineWidth;\nuniform bool uOffsetBool;\n\nconst float pi=3.14159265359;\nconst int OCTAVE_NUM=5;\n\nfloat distLine(vec2 p,vec2 a,vec2 b,float w){\n  vec2 pa=p-a;\n  vec2 ba=b-a;\n  float t=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);\n  return length(pa-ba*t)/w;\n}\nvec3 random3(vec3 p){\n  vec3 f=vec3(\n    dot(p,vec3(127.1,311.7,69.5)),\n    dot(p,vec3(269.5,183.3,132.7)),\n    dot(p,vec3(247.3,108.5,96.5))\n  );\n  return-1.+2.*fract(sin(f)*43758.5453123);\n}\nfloat noise_perlin(vec3 p){\n  vec3 i=floor(p);\n  vec3 s=fract(p);\n  float a=dot(random3(i),s);\n  float b=dot(random3(i+vec3(1,0,0)),s-vec3(1,0,0));\n  float c=dot(random3(i+vec3(0,1,0)),s-vec3(0,1,0));\n  float d=dot(random3(i+vec3(0,0,1)),s-vec3(0,0,1));\n  float e=dot(random3(i+vec3(1,1,0)),s-vec3(1,1,0));\n  float f=dot(random3(i+vec3(1,0,1)),s-vec3(1,0,1));\n  float g=dot(random3(i+vec3(0,1,1)),s-vec3(0,1,1));\n  float h=dot(random3(i+vec3(1,1,1)),s-vec3(1,1,1));\n  //vec3 u=smoothstep(0.,1.,s);\n  vec3 u=s*s*(3.-2.*s);\n  return mix(mix(mix(a,b,u.x),mix(c,e,u.x),u.y),mix(mix(d,f,u.x),mix(g,h,u.x),u.y),u.z);\n}\nfloat fbm_noise_perlin(vec3 p){\n  float f=0.;\n  float a=1.;\n  for(int i=0;i<OCTAVE_NUM;i++)\n  {\n    f+=a*noise_perlin(p);\n    p=2.*p;\n    a/=2.;\n  }\n  return f;\n}\n\nfloat cross(vec2 v0,vec2 v1){\n  return v0.x*v1.y-v0.y*v1.x;\n}\nvec2 getQuadraticCurveTo(vec2 p0,vec2 p1,vec2 p2,float t){\n  return p0*(1.-t)*(1.-t)+p1*2.*(1.-t)*t+p2*t*t;\n}\nvec2 getQuadraticCurveToTangent(vec2 p0,vec2 p1,vec2 p2,float t){\n  return 2.*t*(p0-p1*2.+p2)+2.*(-p0+p1);\n}\n\nfloat quadraticCurveGradual(vec2 p,vec2 a,vec2 b,vec2 c,float w){\n  float s=.5;\n  float rate=.5;\n  const int N=8;\n  vec2 p0=getQuadraticCurveTo(a,b,c,0.);\n  vec2 p2=getQuadraticCurveTo(a,b,c,1.);\n  vec2 p1=getQuadraticCurveTo(a,b,c,rate);\n  for(int i=0;i<N;i++){\n    vec2 t=getQuadraticCurveToTangent(a,b,c,rate);\n    t=vec2(-t.y,t.x);\n    if(cross(p-p1,t)<0.){\n      rate-=s*.5;\n      p2=p1;\n    }else{\n      rate+=s*.5;\n      p0=p1;\n    }\n    s*=.5;\n    p1=getQuadraticCurveTo(a,b,c,rate);\n  }\n  return rate;\n}\nvec2 quadraticCurve(vec2 p,vec2 a,vec2 b,vec2 c,float w){\n  float s=.5;\n  float rate=.5;\n  const int N=8;\n  vec2 p0=getQuadraticCurveTo(a,b,c,0.);\n  vec2 p2=getQuadraticCurveTo(a,b,c,1.);\n  vec2 p1=getQuadraticCurveTo(a,b,c,rate);\n  for(int i=0;i<N;i++){\n    vec2 t=getQuadraticCurveToTangent(a,b,c,rate);\n    t=vec2(-t.y,t.x);\n    if(cross(p-p1,t)<0.){\n      rate-=s*.5;\n      p2=p1;\n    }else{\n      rate+=s*.5;\n      p0=p1;\n    }\n    s*=.5;\n    p1=getQuadraticCurveTo(a,b,c,rate);\n  }\n  return vec2(distLine(p,p0,p2,w),rate);\n}\n\nvec4 distLightLine(vec2 p,vec2 a,vec2 b,vec2 c,float w){\n  vec2 quadraticCurveData=quadraticCurve(p,a,b,c,w);\n  float d=quadraticCurveData.x;\n  \n  float highColorRate=smoothstep(1.,0.,d);\n  float baseColorRate=smoothstep(1.,0.,d/4.);\n  float glowColorRate=smoothstep(1.,0.,d/16.);\n  vec4 highColor=vec4(1.,1.,1.,1.);\n  vec4 baseColor=vec4(.5,1.,1.,0.);\n  vec4 glowColor=vec4(.25,1.,1.,1.);\n  return highColorRate*highColor+.5*pow(baseColorRate,2.)*baseColor+.25*pow(glowColorRate,4.)*glowColor;\n}\nfloat gradual(vec2 p,vec2 a,vec2 b){\n  vec2 pa=p-a;\n  vec2 ba=b-a;\n  return clamp(dot(pa,ba)/dot(ba,ba),0.,1.);\n}\nvoid main()\n{\n  \n  vec2 lineStartPos,lineEndPos,lineControlPos;\n  if(uOffsetBool){\n    lineStartPos=getQuadraticCurveTo(uStartPos,uControlPos,uEndPos,uLineSrcRate);\n    lineEndPos=uLineTargetPos;\n    lineControlPos=mix(lineStartPos,lineEndPos,.5)+vec2(0.,0.);\n  }\n  vec4 color=vec4(0.);\n  float len=distance(uStartPos,uEndPos);\n  vec2 aspectRatio=vec2(uSize.x/uSize.y,1.);\n  vec2 coord=vTextureCoord*uSize;\n  {\n    //float gradualVal=quadraticCurveGradual(coord,uStartPos,uControlPos,uEndPos,1.);\n    float gradualVal=gradual(coord,uStartPos,uEndPos);\n    float gradualVal1=0.;\n    if(uOffsetBool){\n      //gradualVal1=quadraticCurveGradual(coord,lineStartPos,lineControlPos,lineEndPos,1.);\n      gradualVal1=gradual(coord,lineStartPos,lineEndPos);\n      gradualVal1=pow(gradualVal1,2.);\n    }\n    \n    float swing=sin(gradualVal*pi);\n    swing=1.-pow(1.-swing,2.);\n    if(uOffsetBool){\n      swing=mix(swing,sin((1.-gradualVal1)*.5*pi),gradualVal1);\n    }\n    vec2 uv001=vTextureCoord;\n    if(swing!=0.){\n      vec2 uv002=uv001*aspectRatio*clamp(500./max(len,10.),.75,10.);\n      if(uOffsetBool){\n        float len1=distance(lineStartPos,lineEndPos);\n        uv002*=1.+abs(.1*gradualVal1*(len-len1)/len1);\n      }\n      float a=fbm_noise_perlin(vec3(uv002,uTime*3.));\n      vec2 move=a*vec2(cos(a*2.*pi),sin(a*2.*pi));\n      float power=.3*len/length(uSize);\n      uv001+=swing*power*move;\n    }\n    \n    float r=clamp(pow(.5*length(uSize)/len,2.),uLineWidth,uLineWidth*2.);\n    uv001*=uSize;\n    float gradualVal0=gradualVal;\n    if(uOffsetBool){\n      gradualVal0=gradualVal1;\n    }\n    r*=mix((.5+.5*(1.-sin(gradualVal0*pi))),3.,clamp(10./len,0.,1.));\n    \n    if(uOffsetBool){\n      color+=distLightLine(uv001,lineStartPos,lineControlPos,lineEndPos,r);\n    }else{\n      color+=distLightLine(uv001,uStartPos,uControlPos,uEndPos,r);\n    }\n  }\n  gl_FragColor=color;\n  \n}\n\n"},,,,,,,,,,,,,,,,,,,,,,function(e,n,t){"use strict";t.r(n);var r=t(0),a=t(1),o=t(5),i=t.n(o),u=t(47),f=t.n(u),c=function(e,n,t){var a=Object(r.f)(e,n,t);return{program:a,attribLocations:{vertexPosition:r.b.attribFloat(e,a,"aVertexPosition",2),textureCoord:r.b.attribFloat(e,a,"aTextureCoord",2)},uniformLocations:{flipY:r.i.uniform1f(e,a,"uFlipY"),time:r.i.uniform1f(e,a,"uTime"),size:r.i.uniform2fv(e,a,"uSize"),startPos:r.i.uniform2fv(e,a,"uStartPos"),endPos:r.i.uniform2fv(e,a,"uEndPos"),offset:r.i.uniform1f(e,a,"uOffset"),lineWidth:r.i.uniform1f(e,a,"uLineWidth"),branchBool:r.i.uniform1i(e,a,"uBranchBool"),branchOffset:r.i.uniform1f(e,a,"uBranchOffset"),branchStartPos:r.i.uniform2fv(e,a,"uBranchStartPos"),branchEndPos:r.i.uniform2fv(e,a,"uBranchEndPos"),startFixed:r.i.uniform1i(e,a,"uStartFixed"),endFixed:r.i.uniform1i(e,a,"uEndFixed")}}},l=function(e){return Object.assign(Object(r.h)(e,c,i.a,f.a),{draw:function(n){e.drawElements(e.TRIANGLES,n,e.UNSIGNED_BYTE,0)}})},s=t(48),d=t.n(s),v=function(e,n,t){var a=Object(r.f)(e,n,t);return{program:a,attribLocations:{vertexPosition:r.b.attribFloat(e,a,"aVertexPosition",2),textureCoord:r.b.attribFloat(e,a,"aTextureCoord",2)},uniformLocations:{flipY:r.i.uniform1f(e,a,"uFlipY"),time:r.i.uniform1f(e,a,"uTime"),size:r.i.uniform2fv(e,a,"uSize"),startPos:r.i.uniform2fv(e,a,"uStartPos"),controlPos:r.i.uniform2fv(e,a,"uControlPos"),endPos:r.i.uniform2fv(e,a,"uEndPos"),offsetBool:r.i.uniform1i(e,a,"uOffsetBool"),lineSrcRate:r.i.uniform1f(e,a,"uLineSrcRate"),lineTargetPos:r.i.uniform2fv(e,a,"uLineTargetPos"),lineWidth:r.i.uniform1f(e,a,"uLineWidth")}}},p=function(e){return Object.assign(Object(r.h)(e,v,i.a,d.a),{draw:function(n){e.drawElements(e.TRIANGLES,n,e.UNSIGNED_BYTE,0)}})},m=t(25),g=t(14),h=t(16),b=t(6),x=t.n(b),E=t(2),S=function(e){return"number"==typeof e?e:"string"==typeof e&&/\~/g.test(e)?parseFloat(e.replace(/(.+)\~(.+)/g,(function(e,n,t){return E.a.mix(parseFloat(n),parseFloat(t),Math.random())}))):void 0},T=function(e){var n=[[0,0],[1,0],[1,1],[0,1]].flat(),t=Object(r.a)(e,n,2),a=[[0,0],[1,0],[1,1],[0,1]].flat(),o=Object(r.a)(e,a,2),i=[[0,1,3],[1,2,3]].flat();return{positionBufferData:t,textureCoordinatesBufferData:o,indicesBufferData:Object(r.d)(e,i)}},P=function(e,n,t,r,o){o.framebufferTextures,o.size,o.textData,o.textPos;var i=o.electricityRangeList,u=o.electricityList;u.forEach((function(e,n,t){!function(e,n,t,r){if("text"==r.start.type){if(r.start.index){var o=r.start.index.array,i=r.start.index.i,u=r.start.index.j;i=null!=i?i:Math.floor(o.length*Math.random()),u=null!=u?u:Math.floor(o[i].length*Math.random()),a.b.set(e.start.index,i,u)}e.start.range=S(r.start.range),e.start.seed=S(r.start.seed)}else"pos"==r.start.type?r.start.pos&&a.b.set.apply(a.b,[e.start.pos].concat(x()(r.start.pos))):"sub"==r.start.type&&(e.start.src=S(r.start.src),e.start.rate=S(r.start.rate),e.start.range=S(r.start.range),e.start.seed=S(r.start.seed));if("text"==r.end.type){if(r.end.index){a.b.set(e.end.index,r.end.i,r.end.j);var f=r.end.index.array,c=r.end.index.i,l=r.end.index.j,s=r.end.index.uniteRange;r.end.index.unite&&"text"==r.start.type?(c=null!=c?c:e.start.index[0],l=null!=l?l:Math.floor((e.start.index[1]+S(s))%f[c].length)):(c=null!=c?c:Math.floor(f.length*Math.random()),l=null!=l?l:Math.floor(f[c].length*Math.random())),a.b.set(e.end.index,c,l)}e.end.range=S(r.end.range),e.end.seed=S(r.end.seed)}else"pos"==r.end.type?r.end.pos&&a.b.set.apply(a.b,[e.end.pos].concat(x()(r.end.pos))):"sub"==r.end.type&&(e.end.src=S(r.end.src),e.end.rate=S(r.end.rate),e.end.range=S(r.end.range),e.end.seed=S(r.end.seed));e.lineWidth=S(r.lineWidth),e.lifeTimeMax=e.lifeTime=S(r.lifeTime),e.offset=S(r.offset)}(e,0,0,i[n])})),console.log(u)},y=function(e,n,t,o,i){var u=i.now,f=i.framebufferTextures,c=(i.mPos,i.size),l=(i.textData,i.textPos);i.electricityRangeList,i.electricityList;e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA);var s=t.view,d=n.viewShader;d.use(),d.attribSet({vertexPosition:s.positionBufferData.buffer,textureCoord:s.textureCoordinatesBufferData.buffer}),d.uniformSet({flipY:1}),Object(r.j)(e,f.text),s.textureCoordinatesBufferData.set(Object(r.e)([0,0,1,1]));var v=l[0]/e.canvas.width,p=l[1]/e.canvas.height;s.positionBufferData.set(Object(r.e)([v,p,v+o.text.width/e.canvas.width,p+o.text.height/e.canvas.height])),d.uniformSet({sampler:o.text}),d.draw(s.indicesBufferData.length);var m=t.face,g=n.blurShader;g.use(),g.attribSet({vertexPosition:m.positionBufferData.buffer,textureCoord:m.textureCoordinatesBufferData.buffer}),g.uniformSet({size:c,flipY:1,sampler:f.text.texture,width:10,power:.2,dir:[.7071,.7071]}),Object(r.j)(e,f.blurs[0]),g.draw(m.indicesBufferData.length),g.uniformSet({sampler:f.blurs[0].texture,dir:[.7071,-.7071]}),Object(r.j)(e,f.blurs[1]),g.draw(m.indicesBufferData.length),Object(r.j)(e);var h=t.face,b=n.addShader;b.use(),b.attribSet({vertexPosition:h.positionBufferData.buffer,textureCoord:h.textureCoordinatesBufferData.buffer}),b.uniformSet({flipY:-1,samplerA:f.text.texture,samplerB:f.blurs[1].texture}),b.draw(h.indicesBufferData.length);var x=t.face,E=n.electricityShader;E.use(),E.attribSet({vertexPosition:x.positionBufferData.buffer,textureCoord:x.textureCoordinatesBufferData.buffer}),E.uniformSet({size:c,time:.001*u,flipY:-1}),e.blendFunc(e.ONE,e.ONE);var S=[100,200],T=[100,500];E.uniformSet({startPos:S,endPos:T,lineWidth:2,branchBool:!1,offset:0}),E.draw(x.indicesBufferData.length),E.uniformSet({branchBool:!0,branchStartPos:a.a.mix(S,T,.6666),branchEndPos:[200,480],lineWidth:.5,branchOffset:-1,startFixed:!1,endFixed:!0}),E.draw(x.indicesBufferData.length),E.uniformSet({branchBool:!0,branchStartPos:a.a.mix(S,T,.3333),branchEndPos:[200,200],lineWidth:.5,branchOffset:1,startFixed:!1,endFixed:!0}),E.draw(x.indicesBufferData.length)};!function(){var e=document.querySelector("#glcanvas"),n={alpha:!1},t=e.getContext("webgl2",n);if(t||(t=e.getContext("webgl",n)||e.getContext("experimental-webgl",n),!1),t){var o=function(e,n){if(!(e.length<=0)){var t=document.createElement("canvas"),r=t.getContext("2d");r.textAlign="start",r.textBaseline="hanging",r.font=n;var o=r.measureText(e),i=o.actualBoundingBoxRight-o.actualBoundingBoxLeft,u=o.actualBoundingBoxDescent+o.actualBoundingBoxAscent;t.width=i+22,t.height=u+22,r.textAlign="start",r.textBaseline="hanging",r.font=n,r.fillStyle="#ffffff",r.fillText(e,11,o.actualBoundingBoxAscent+11);for(var f=r.getImageData(0,0,t.width,t.height),c=f.data,l=function(e,n,t){return 4*(n+t*e.width)},s=[[0,-1],[1,0],[0,1],[-1,0]],d=[],v=[],p=r.createImageData(f.width,f.height),m=function(e){for(var n=function(n){var t=l(f,n,e);if(c[t+3]>127&&s.some((function(t){return n+t[0]<0||n+t[0]>=f.width||e+t[1]<0||e+t[1]>=f.height||c[l(f,n+t[0],e+t[1])+3]<=127}))){p.data[t+0]=255,p.data[t+1]=255,p.data[t+2]=255,p.data[t+3]=255,d.push([n,e]);var r=s.map((function(r){return a.a.scale(r,c[l(f,n+r[0],e+r[1])+3]-c[t+3])})),o=[0,0];r.forEach((function(e){a.b.add(o,e)})),a.b.normalize(o),v.push(o)}},t=0;t<f.width;t++)n(t)},g=0;g<f.height;g++)m(g);for(var h=[],b=0;b<d.length-1;b++){for(var x=-1,E=b+1;E<d.length;E++){var S=a.a.abs(a.a.sub(d[b],d[E]));if(S[0]<=1&&S[1]<=1&&(x=E,S[0]*S[1]==0))break}if(x>=0){var T=[d[b+1],d[x]];d[x]=T[0],d[b+1]=T[1];var P=[v[b+1],v[x]];v[x]=P[0],v[b+1]=P[1]}else h.push(b+1)}h.push(d.length);for(var y=[],w=[],R=0,B=0;B<h.length;B++)y.push(d.slice(R,h[B])),w.push(v.slice(R,h[B])),R=h[B];r.clearRect(0,0,t.width,t.height),r.globalAlpha=.5,r.fillStyle="#ffffff",r.strokeStyle="#3f7fff",r.lineWidth=1,r.globalAlpha=.35,r.fillText(e,11,o.actualBoundingBoxAscent+11),r.globalAlpha=.5,r.strokeText(e,11,o.actualBoundingBoxAscent+11);var C=t.toDataURL();return{width:t.width,height:t.height,posListG:y,normalListG:w,base64:C}}}("POWER","bold 100px Courier New"),i=[.5*t.canvas.width-.5*o.width,.5*t.canvas.height-.5*o.height],u={electricityShader:l(t),quadraticCurveElectricityShader:p(t),viewShader:Object(m.a)(t),blurShader:Object(g.a)(t),addShader:Object(h.a)(t)},f={face:T(t),view:T(t)},c={text:Object(r.g)(t,o.base64),image:Object(r.g)(t,"../img/image.c0ad24103ffb3cb48c09355b0f9bff2b.jpg")},s=[.5*t.canvas.width,.5*t.canvas.height];e.addEventListener("mousemove",(function(e){a.b.set(s,e.pageX,e.pageY)}));for(var d=[t.canvas.clientWidth,t.canvas.clientHeight],v={text:Object(r.c)(t),blurs:[Object(r.c)(t),Object(r.c)(t)]},b=[{active:!0,start:{type:"pos",pos:[0,0]},end:{type:"text",range:"20~40",seed:"0~100"},lineWidth:3,lifeTime:"50~100",offset:"0.05~0.2"},{active:!0,start:{type:"sub",src:0,rate:"0.5~0.95",range:"0.1~0.4",seed:"0~100"},end:{type:"text",range:"10~40",seed:"0~100"},lineWidth:"0.4~0.6",lifeTime:"25~50",offset:"0.1~0.25"},{active:!0,start:{type:"sub",src:0,rate:"0.5~0.95",range:"0.1~0.4",seed:"0~100"},end:{type:"text",range:"10~40",seed:"0~100"},lineWidth:"0.4~0.6",lifeTime:"25~50",offset:"0.1~0.25"},{active:!0,start:{type:"sub",src:0,rate:"0~1",range:"0.1~0.4",seed:"0~100"},end:{type:"sub",src:0,rate:"0~1",range:"0.1~0.4",seed:"0~100"},lineWidth:"0.5~0.8",lifeTime:"25~50",offset:"-1~1"}],x=0;x<o.posListG.length;x++)for(var E=Math.ceil(o.posListG[x].length/200)+1,S=0;S<E;S++)b.push({active:!0,start:{type:"text",index:{array:o.posListG,i:x},range:"5~10",seed:"0~100"},end:{type:"text",index:{array:o.posListG,unite:!0,uniteRange:"10~40",i:x},range:"5~10",seed:"0~100"},lineWidth:"0.25~0.75",lifeTime:"40~80",offset:"0.2~0.8"});var w=b.map((function(e,n,t){return function(e,n,t){var r={};return r.type=e.start.type+"-"+e.end.type,r.active=e.active,r.start={type:e.start.type},"text"==e.start.type?(r.start.index=[0,0],r.start.range=0,r.start.seed=0):"pos"==e.start.type?r.start.pos=[0,0]:"sub"==e.start.type&&(r.start.src=0,r.start.rate=0),r.end={type:e.start.type},"text"==e.end.type?(r.end.index=[0,0],r.end.range=0,r.end.seed=0):"pos"==e.end.type?r.end.pos=[0,0]:"sub"==e.end.type&&(r.end.src=0,r.end.rate=0),r.lineWidth=0,r.lifeTime=0,r.lifeTimeMax=0,r.offset=0,r}(e)}));P(t,u,f,c,{framebufferTextures:v,size:d,textData:o,textPos:i,electricityRangeList:b,electricityList:w});var R=0;requestAnimationFrame((function e(n){var r=.001*(n-R);R=n,requestAnimationFrame(e),y(t,u,f,c,{now:n,delta:r,mPos:s,framebufferTextures:v,size:d,textData:o,textPos:i,electricityRangeList:b,electricityList:w})}))}else alert("無法初始化WebGL。您的瀏覽器或機器可能不支持它。")}()}]);