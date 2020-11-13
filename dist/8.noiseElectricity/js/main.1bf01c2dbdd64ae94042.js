!function(e){var r={};function n(t){if(r[t])return r[t].exports;var o=r[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=r,n.d=function(e,r,t){n.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,r){if(1&r&&(e=n(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(n.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)n.d(t,o,function(r){return e[r]}.bind(null,o));return t},n.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(r,"a",r),r},n.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},n.p="",n(n.s=59)}({0:function(e,r,n){"use strict";n.d(r,"g",(function(){return m})),n.d(r,"e",(function(){return t})),n.d(r,"c",(function(){return v})),n.d(r,"a",(function(){return a})),n.d(r,"d",(function(){return u})),n.d(r,"f",(function(){return f})),n.d(r,"b",(function(){return s})),n.d(r,"h",(function(){return d}));var t=function(e,r,n){var t=o(e,e.VERTEX_SHADER,r),a=o(e,e.FRAGMENT_SHADER,n),u=e.createProgram();return e.attachShader(u,t),e.attachShader(u,a),e.linkProgram(u),e.getProgramParameter(u,e.LINK_STATUS)?u:(alert("無法初始化著色器程序: "+e.getProgramInfoLog(u)),null)},o=function(e,r,n){var t=e.createShader(r);return e.shaderSource(t,n),e.compileShader(t),e.getShaderParameter(t,e.COMPILE_STATUS)?t:(alert("編譯著色器時發生錯誤: "+e.getShaderInfoLog(t)),e.deleteShader(t),null)},a=function(e,r,n){var t,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:e.STATIC_DRAW,a=e.createBuffer(),u=0,i={buffer:a,get data(){return t},get length(){return t.length},set:function(r){t=new Float32Array(r),u=100*Math.ceil(t.length/n/100),e.bindBuffer(e.ARRAY_BUFFER,a),e.bufferData(e.ARRAY_BUFFER,u*n*4,o),e.bufferSubData(e.ARRAY_BUFFER,0,t)},add:function(r){var i=t.length,f=100*Math.floor(t.length/n/100);f>=u&&(u=f+100,e.bindBuffer(e.ARRAY_BUFFER,a),e.bufferData(e.ARRAY_BUFFER,u*n*4,o),e.bufferSubData(e.ARRAY_BUFFER,0,t));var c=new Float32Array(i+n);c.set(t),t=c,this.item(i/n,r)},item:function(r,o){var u=new Float32Array(o);t.set(u,r*n),e.bindBuffer(e.ARRAY_BUFFER,a),e.bufferSubData(e.ARRAY_BUFFER,r*n*4,u)},getItem:function(e){return Array.from(t.slice(e*n,(e+1)*n))}};return i.set(r),i},u=function(e,r){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:e.STATIC_DRAW,t=new Uint8Array(r),o=e.createBuffer();e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,o),e.bufferData(e.ELEMENT_ARRAY_BUFFER,t,n);var a={buffer:o,get data(){return t},get length(){return t.length}};return a},i=function(e){var r=e.createTexture();return e.bindTexture(e.TEXTURE_2D,r),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),r},f=function(e,r){var n=i(e),t=new Image;return t.onload=function(){e.bindTexture(e.TEXTURE_2D,n),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,t)},t.src=r,n},c=function(e,r,n,t){e.bindFramebuffer(e.FRAMEBUFFER,r),null==n&&null==t&&e.viewport(0,0,n,t)},l=function(e,r){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];r?n?c(e,r.framebuffer,r.width,r.height):c(e,r.framebuffer):n?c(e,null,e.canvas.width,e.canvas.height):c(e,null)},v=function(e,r,n){var t={width:r||e.canvas.clientWidth,height:n||e.canvas.clientHeight},o=i(e);t.texture=o,e.texImage2D(e.TEXTURE_2D,0,e.RGBA,t.width,t.height,0,e.RGBA,e.UNSIGNED_BYTE,null);var a=e.createFramebuffer();return t.framebuffer=a,e.bindFramebuffer(e.FRAMEBUFFER,a),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,o,0),e.bindFramebuffer(e.FRAMEBUFFER,null),t},s={attribFloat:function(e,r,n,t){var o=e.getAttribLocation(r,n);return e.enableVertexAttribArray(o),function(r){e.bindBuffer(e.ARRAY_BUFFER,r),e.vertexAttribPointer(o,t,e.FLOAT,!1,0,0)}}},d={uniform1f:function(e,r,n){var t=e.getUniformLocation(r,n);return function(r){e.uniform1f(t,r)}},uniform2fv:function(e,r,n){var t=e.getUniformLocation(r,n);return function(r){e.uniform2fv(t,r)}},uniform3fv:function(e,r,n){var t=e.getUniformLocation(r,n);return function(r){e.uniform3fv(t,r)}},uniformTexture:function(e,r,n,t){var o=e.getUniformLocation(r,n);return function(r){e.activeTexture(e.TEXTURE0+t),e.bindTexture(e.TEXTURE_2D,r),e.uniform1i(o,t)}},uniform1i:function(e,r,n){var t=e.getUniformLocation(r,n);return function(r){e.uniform1i(t,r)}}},m=function(e,r,n,t,o){var a=r(e,n,t);return{programInfo:a,use:function(e){e.useProgram(a.program)},attribSet:function(e){for(var r in e)a.attribLocations[r]&&a.attribLocations[r](e[r])},uniformSet:function(e){for(var r in e)a.uniformLocations[r]&&a.uniformLocations[r](e[r])},useTexture:function(e,r){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];l(e,r),n&&(e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT))}}}},1:function(e,r){e.exports=function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}},2:function(e,r){function n(e,r){for(var n=0;n<r.length;n++){var t=r[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}e.exports=function(e,r,t){return r&&n(e.prototype,r),t&&n(e,t),e}},3:function(e,r){e.exports="attribute vec2 aVertexPosition;\r\nattribute vec2 aTextureCoord;\r\nvarying highp vec2 vTextureCoord;\r\nuniform float uFlipY;\r\nvoid main(void){\r\n  vTextureCoord=aTextureCoord;\r\n  gl_Position=vec4((2.*aVertexPosition+vec2(-1.,-1.))*vec2(1.,uFlipY),0.,1.);\r\n}"},37:function(e,r){e.exports="precision mediump float;\r\nvarying vec2 vTextureCoord;\r\nuniform lowp vec2 uSize;\r\nuniform float uTime;\r\nuniform vec2 uStartPos;\r\nuniform vec2 uEndPos;\r\n\r\nconst float pi=3.14159265359;\r\nconst int OCTAVE_NUM=5;\r\n\r\n/*struct LineEquation{float a;float b;float c;};\r\nfloat cross(vec2 v0,vec2 v1){\r\n  return v0.x*v1.y-v0.y*v1.x;\r\n}\r\nLineEquation getLineEquation(vec2 p0,vec2 p1){\r\n  vec2 vector=p1-p0;\r\n  return LineEquation(vector.y,-vector.x,cross(vector,p0));\r\n}\r\nfloat pointToLineEquationDistance(LineEquation lineEquation,vec2 p){\r\n  return abs(lineEquation.a*p.x+lineEquation.b*p.y+lineEquation.c)/sqrt(lineEquation.a*lineEquation.a+lineEquation.b*lineEquation.b);\r\n}*/\r\nfloat distLine(vec2 p,vec2 a,vec2 b,float w){\r\n  vec2 pa=p-a;\r\n  vec2 ba=b-a;\r\n  float t=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);\r\n  return length(pa-ba*t)/w;\r\n}\r\nfloat gradual(vec2 p,vec2 a,vec2 b){\r\n  vec2 pa=p-a;\r\n  vec2 ba=b-a;\r\n  return clamp(dot(pa,normalize(ba))/length(ba),0.,1.);\r\n}\r\nvec3 random3(vec3 p){\r\n  vec3 f=vec3(\r\n    dot(p,vec3(127.1,311.7,69.5)),\r\n    dot(p,vec3(269.5,183.3,132.7)),\r\n    dot(p,vec3(247.3,108.5,96.5))\r\n  );\r\n  return-1.+2.*fract(sin(f)*43758.5453123);\r\n}\r\nfloat noise_perlin(vec3 p){\r\n  vec3 i=floor(p);\r\n  vec3 s=fract(p);\r\n  float a=dot(random3(i),s);\r\n  float b=dot(random3(i+vec3(1,0,0)),s-vec3(1,0,0));\r\n  float c=dot(random3(i+vec3(0,1,0)),s-vec3(0,1,0));\r\n  float d=dot(random3(i+vec3(0,0,1)),s-vec3(0,0,1));\r\n  float e=dot(random3(i+vec3(1,1,0)),s-vec3(1,1,0));\r\n  float f=dot(random3(i+vec3(1,0,1)),s-vec3(1,0,1));\r\n  float g=dot(random3(i+vec3(0,1,1)),s-vec3(0,1,1));\r\n  float h=dot(random3(i+vec3(1,1,1)),s-vec3(1,1,1));\r\n  //vec3 u=smoothstep(0.,1.,s);\r\n  vec3 u=s*s*(3.-2.*s);\r\n  return mix(mix(mix(a,b,u.x),mix(c,e,u.x),u.y),mix(mix(d,f,u.x),mix(g,h,u.x),u.y),u.z);\r\n}\r\nfloat fbm_noise_perlin(vec3 p){\r\n  float f=0.;\r\n  float a=1.;\r\n  for(int i=0;i<OCTAVE_NUM;i++)\r\n  {\r\n    f+=a*noise_perlin(p);\r\n    p=2.*p;\r\n    a/=2.;\r\n  }\r\n  return f;\r\n}\r\nfloat fbm_abs_noise_perlin(vec3 p){\r\n  float f=0.;\r\n  float a=1.;\r\n  for(int i=0;i<OCTAVE_NUM;i++)\r\n  {\r\n    f+=a*abs(noise_perlin(p));\r\n    p=2.*p;\r\n    a/=2.;\r\n  }\r\n  return f;\r\n}\r\n\r\nvec2 random2(vec2 p,vec2 loop){\r\n  if(loop.x!=0.){\r\n    p.x=mod(p.x,loop.x);\r\n  }\r\n  if(loop.y!=0.){\r\n    p.y=mod(p.y,loop.y);\r\n  }\r\n  vec2 f=vec2(\r\n    dot(p,vec2(127.1,311.7)),\r\n    dot(p,vec2(269.5,183.3))\r\n  );\r\n  return-1.+2.*fract(sin(f)*43758.5453123);\r\n}\r\n\r\nfloat noise_perlin(vec2 p,vec2 loop){\r\n  vec2 i=floor(p);\r\n  vec2 f=fract(p);\r\n  float a=dot(random2(i,loop),f);\r\n  float b=dot(random2(i+vec2(1.,0.),loop),f-vec2(1.,0.));\r\n  float c=dot(random2(i+vec2(0.,1.),loop),f-vec2(0.,1.));\r\n  float d=dot(random2(i+vec2(1.,1.),loop),f-vec2(1.,1.));\r\n  //vec2 u=smoothstep(0.,1.,f);\r\n  vec2 u=f*f*(3.-2.*f);\r\n  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);\r\n}\r\nvoid main()\r\n{\r\n  \r\n  vec4 color=vec4(0.);\r\n  float len=distance(uStartPos,uEndPos);\r\n  \r\n  //vec2 uvCoord=vTextureCoord;\r\n  vec2 rate=vec2(uSize.x/uSize.y,1.);\r\n  vec2 coord=vTextureCoord*uSize;\r\n  {\r\n    float gradualVal=gradual(coord,uStartPos,uEndPos);\r\n    //color+=vec4(vec3(gradualVal),1.);\r\n    float free=sin(gradualVal*pi);\r\n    free=1.-pow(1.-free,2.);\r\n    //color+=vec4(vec3(free),1.);\r\n    vec2 uv001=vTextureCoord;\r\n    if(free!=0.){\r\n      vec2 uv002=uv001*rate*clamp(500./max(len,10.),.75,10.);\r\n      float a=fbm_noise_perlin(vec3(uv002,uTime*.003));\r\n      float r=fbm_noise_perlin(vec3(uv002,uTime*.003));\r\n      vec2 move=r*vec2(cos(a*2.*pi),sin(a*2.*pi));\r\n      float power=.3*len/length(uSize);\r\n      uv001+=free*power*move;\r\n    }\r\n    //color+=vec4(uv001,0.,1.);\r\n    \r\n    float r=clamp(pow(.5*length(uSize)/len,2.),2.,4.);\r\n    uv001*=uSize;\r\n    float gradualVal0=gradual(uv001,uStartPos,uEndPos);\r\n    r*=mix((.5+.5*(1.-sin(gradualVal0*pi))),3.,clamp(10./len,0.,1.));\r\n    //gl_FragColor=vec4(vec3(sin(gradualVal0*pi)),1.);\r\n    float highColorRate=smoothstep(1.,0.,distLine(uv001,uStartPos,uEndPos,r));\r\n    float baseColorRate=smoothstep(1.,0.,distLine(uv001,uStartPos,uEndPos,r*4.));\r\n    float glowColorRate=smoothstep(1.,0.,distLine(uv001,uStartPos,uEndPos,r*16.));\r\n    vec4 highColor=vec4(1.,1.,1.,1.);\r\n    vec4 baseColor=vec4(.5,1.,1.,0.);\r\n    vec4 glowColor=vec4(.25,1.,1.,1.);\r\n    color+=highColorRate*highColor+.5*pow(baseColorRate,2.)*baseColor+.25*pow(glowColorRate,4.)*glowColor;\r\n  }\r\n  {\r\n    vec2 uv=coord-uStartPos;\r\n    float len=length(uv);\r\n    \r\n    /*float a=noise_perlin(vec2(floor(80.*(.5*atan(uv.y,uv.x)/pi+.5)),len/20.-uTime*.005),vec2(80.,0.));\r\n    float b=noise_perlin(vec2((40.*(.5*atan(uv.y,uv.x)/pi+.5)),len/20.-uTime*.005),vec2(40.,0.));\r\n    \r\n    float baseColorRate=smoothstep(1.,0.,len/100.);\r\n    color+=vec4(3.*b*a*baseColorRate);*/\r\n    \r\n    float a=smoothstep(.05,0.,abs(noise_perlin(vec2((20.*(.5*atan(uv.y,uv.x)/pi+.5)),len/20.-uTime*.005),vec2(20.,0.))));\r\n    float baseColorRate=smoothstep(1.,0.,len/100.);\r\n    color+=vec4(a*pow(baseColorRate,2.)*vec4(.5,1.,1.,0.));\r\n  }\r\n  gl_FragColor=color;\r\n  \r\n}\r\n\r\n"},4:function(e,r,n){"use strict";n.d(r,"a",(function(){return i})),n.d(r,"b",(function(){return f}));var t=n(1),o=n.n(t),a=n(2),u=n.n(a),i=function(){function e(){o()(this,e)}return u()(e,null,[{key:"normalize",value:function(r){return e.length(r)?e.scale(r,1/e.length(r)):r}},{key:"rotate",value:function(e,r){var n=Math.cos(r),t=Math.sin(r);return[e[0]*n-e[1]*t,e[1]*n+e[0]*t]}},{key:"dot",value:function(e,r){return e[0]*r[0]+e[1]*r[1]}},{key:"cross",value:function(e,r){return e[0]*r[1]-e[1]*r[0]}},{key:"add",value:function(e,r){return[e[0]+r[0],e[1]+r[1]]}},{key:"sub",value:function(e,r){return[e[0]-r[0],e[1]-r[1]]}},{key:"projection",value:function(r,n){var t=e.dot(r,n)/e.dot(n,n);return[n[0]*t,n[1]*t]}},{key:"length",value:function(r){return Math.sqrt(e.dot(r,r))}},{key:"mul",value:function(e,r){return[e[0]*r[0],e[1]*r[1]]}},{key:"div",value:function(e,r){return[e[0]/r[0],e[1]/r[1]]}},{key:"scale",value:function(e,r){return[e[0]*r,e[1]*r]}},{key:"collisionCalc",value:function(r,n,t,o){return e.scale(e.add(e.scale(r,t-o),e.scale(n,2*o)),1/(t+o))}},{key:"getAngle",value:function(e){return Math.atan2(e[1],e[0])}}]),e}(),f=function(){function e(){o()(this,e)}return u()(e,null,[{key:"set",value:function(e,r,n){return e[0]=r,e[1]=n,e}},{key:"normalize",value:function(r){var n=i.length(r);return n&&e.scale(r,1/n),r}},{key:"add",value:function(e,r){return e[0]+=r[0],e[1]+=r[1],e}},{key:"sub",value:function(e,r){return e[0]-=r[0],e[1]-=r[1],e}},{key:"scale",value:function(e,r){return e[0]*=r,e[1]*=r,e}},{key:"rotate",value:function(e,r){var n=Math.cos(r),t=Math.sin(r),o=[e[0]*n-e[1]*t,e[1]*n+e[0]*t];return e[0]=o[0],e[1]=o[1],e}}]),e}()},5:function(e,r,n){"use strict";n.d(r,"a",(function(){return f})),n.d(r,"b",(function(){return c}));var t=n(1),o=n.n(t),a=n(2),u=n.n(a),i=n(4),f=function(){function e(){o()(this,e)}return u()(e,null,[{key:"toPosRate",value:function(e,r,n){return[e[0]*(1-n)+r[0]*n,e[1]*(1-n)+r[1]*n]}},{key:"cross",value:function(e,r,n){return(e[0]-r[0])*(n[1]-r[1])-(n[0]-r[0])*(e[1]-r[1])}},{key:"getCenter",value:function(e,r){return[.5*(e[0]+r[0]),.5*(e[1]+r[1])]}},{key:"getVector",value:function(e,r){return[r[0]-e[0],r[1]-e[1]]}},{key:"addVector",value:function(e,r){return[e[0]+r[0],e[1]+r[1]]}},{key:"distance",value:function(r,n){return i.a.length(e.getVector(r,n))}},{key:"getLine",value:function(r,n){return{point:r,vector:e.getVector(r,n)}}}]),e}(),c=function(){function e(){o()(this,e)}return u()(e,null,[{key:"set",value:function(e,r,n){return e[0]=r,e[1]=n,e}},{key:"addVector",value:function(e,r){return e[0]+=r[0],e[1]+=r[1],e}}]),e}()},59:function(e,r,n){"use strict";n.r(r);var t=n(0),o=(n(4),n(5)),a=n(3),u=n.n(a),i=n(37),f=n.n(i),c=function(e,r,n){var o=Object(t.e)(e,r,n);return{program:o,attribLocations:{vertexPosition:t.b.attribFloat(e,o,"aVertexPosition",2),textureCoord:t.b.attribFloat(e,o,"aTextureCoord",2)},uniformLocations:{flipY:t.h.uniform1f(e,o,"uFlipY"),time:t.h.uniform1f(e,o,"uTime"),size:t.h.uniform2fv(e,o,"uSize"),startPos:t.h.uniform2fv(e,o,"uStartPos"),endPos:t.h.uniform2fv(e,o,"uEndPos")}}},l=function(e){return Object.assign(Object(t.g)(e,c,u.a,f.a),{draw:function(e,r){e.drawElements(e.TRIANGLE_STRIP,r,e.UNSIGNED_BYTE,0)}})};function v(e){var r=[[0,0],[1,0],[1,1],[0,1]].flat(),n=Object(t.a)(e,r,2),o=[[0,0],[1,0],[1,1],[0,1]].flat(),a=Object(t.a)(e,o,2),u=[[2,0,1],[3,2,0]].flat();return{positionBufferData:n,textureCoordinatesBufferData:a,indicesBufferData:Object(t.d)(e,u)}}!function(){var e=document.querySelector("#glcanvas"),r=e.getContext("webgl",{alpha:!1});if(!r)return void alert("無法初始化WebGL。您的瀏覽器或機器可能不支持它。");var n={electricityShader:l(r)},t={face:v(r),view:v(r)},a=[.5*r.canvas.width,.5*r.canvas.height];e.addEventListener("mousemove",(function(e){o.b.set(a,e.pageX,e.pageY)}));var u=[r.canvas.clientWidth,r.canvas.clientHeight],i={};f={framebufferTextures:i,size:u},f.framebufferTextures,f.size;var f;var c=0;requestAnimationFrame((function e(o){var f=.001*(o-c);c=o,requestAnimationFrame(e),function(e,r,n,t,o){var a=o.now,u=(o.framebufferTextures,o.mPos),i=o.size,f=n.face,c=r.electricityShader;c.use(e),c.attribSet({vertexPosition:f.positionBufferData.buffer,textureCoord:f.textureCoordinatesBufferData.buffer}),c.uniformSet({size:i,time:a,flipY:-1,startPos:[200,100],endPos:u}),c.useTexture(e),e.enable(e.CULL_FACE),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.enable(e.BLEND),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ONE),c.draw(e,f.indicesBufferData.length),c.uniformSet({startPos:[600,100],endPos:u}),c.draw(e,f.indicesBufferData.length),c.uniformSet({startPos:[600,500],endPos:u}),c.draw(e,f.indicesBufferData.length),c.uniformSet({startPos:[200,500],endPos:u}),c.draw(e,f.indicesBufferData.length)}(r,n,t,0,{now:o,delta:f,mPos:a,framebufferTextures:i,size:u})}))}()}});