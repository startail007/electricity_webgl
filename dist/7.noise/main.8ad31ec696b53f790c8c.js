!function(n){var e={};function o(r){if(e[r])return e[r].exports;var t=e[r]={i:r,l:!1,exports:{}};return n[r].call(t.exports,t,t.exports,o),t.l=!0,t.exports}o.m=n,o.c=e,o.d=function(n,e,r){o.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:r})},o.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},o.t=function(n,e){if(1&e&&(n=o(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var t in n)o.d(r,t,function(e){return n[e]}.bind(null,t));return r},o.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return o.d(e,"a",e),e},o.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},o.p="",o(o.s=69)}({0:function(n,e,o){"use strict";o.d(e,"h",(function(){return m})),o.d(e,"f",(function(){return r})),o.d(e,"c",(function(){return v})),o.d(e,"a",(function(){return i})),o.d(e,"d",(function(){return a})),o.d(e,"g",(function(){return u})),o.d(e,"b",(function(){return s})),o.d(e,"i",(function(){return p})),o.d(e,"e",(function(){return d})),o.d(e,"j",(function(){return _}));var r=function(n,e,o){var r=t(n,n.VERTEX_SHADER,e),i=t(n,n.FRAGMENT_SHADER,o),a=n.createProgram();return n.attachShader(a,r),n.attachShader(a,i),n.linkProgram(a),n.getProgramParameter(a,n.LINK_STATUS)?a:(alert("無法初始化著色器程序: "+n.getProgramInfoLog(a)),null)},t=function(n,e,o){var r=n.createShader(e);return n.shaderSource(r,o),n.compileShader(r),n.getShaderParameter(r,n.COMPILE_STATUS)?r:(alert("編譯著色器時發生錯誤: "+n.getShaderInfoLog(r)),n.deleteShader(r),null)},i=function(n,e,o){var r,t=arguments.length>3&&void 0!==arguments[3]?arguments[3]:Float32Array,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:n.STATIC_DRAW,a=n.createBuffer(),f=0,u={buffer:a,get data(){return r},get length(){return r.length},set:function(e){r=new t(e),f=100*Math.ceil(r.length/o/100),n.bindBuffer(n.ARRAY_BUFFER,a),n.bufferData(n.ARRAY_BUFFER,f*o*4,i),n.bufferSubData(n.ARRAY_BUFFER,0,r)},add:function(e){var u=r.length,c=100*Math.floor(r.length/o/100);c>=f&&(f=c+100,n.bindBuffer(n.ARRAY_BUFFER,a),n.bufferData(n.ARRAY_BUFFER,f*o*4,i),n.bufferSubData(n.ARRAY_BUFFER,0,r));var l=new t(u+o);l.set(r),r=l,this.item(u/o,e)},item:function(e,i){var f=new t(i);r.set(f,e*o),n.bindBuffer(n.ARRAY_BUFFER,a),n.bufferSubData(n.ARRAY_BUFFER,e*o*4,f)},getItem:function(n){return Array.from(r.slice(n*o,(n+1)*o))}};return u.set(e),u},a=function(n,e){var o,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Uint8Array,t=arguments.length>3&&void 0!==arguments[3]?arguments[3]:n.STATIC_DRAW,i=n.createBuffer(),a=0,f=3,u={buffer:i,get data(){return o},get length(){return o.length},set:function(e){o=new r(e),a=100*Math.ceil(o.length/f/100),n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,i),n.bufferData(n.ELEMENT_ARRAY_BUFFER,a*f*4,t),n.bufferSubData(n.ELEMENT_ARRAY_BUFFER,0,o)},add:function(e){var u=o.length,c=100*Math.floor(o.length/f/100);c>=a&&(a=c+100,n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,i),n.bufferData(n.ELEMENT_ARRAY_BUFFER,a*f*4,t),n.bufferSubData(n.ELEMENT_ARRAY_BUFFER,0,o));var l=new r(u+f);l.set(o),o=l,this.item(u/f,e)},item:function(e,t){var a=new r(t);o.set(a,e*f),n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,i),n.bufferSubData(n.ELEMENT_ARRAY_BUFFER,e*f*4,a)},getItem:function(n){return Array.from(o.slice(n*f,(n+1)*f))}};return u.set(e),u},f=function(n){var e=n.createTexture();return n.bindTexture(n.TEXTURE_2D,e),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.LINEAR),e},u=function(n,e){var o=f(n),r=new Image;return r.onload=function(){o.width=r.width,o.height=r.height,n.bindTexture(n.TEXTURE_2D,o),n.texImage2D(n.TEXTURE_2D,0,n.RGBA,n.RGBA,n.UNSIGNED_BYTE,r),n.bindTexture(n.TEXTURE_2D,null)},r.src=e,o},c=function(n,e,o,r){n.bindFramebuffer(n.FRAMEBUFFER,e),void 0!==o&&void 0!==r&&n.viewport(0,0,o,r)},l=function(n,e){var o=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];e?o?c(n,e.framebuffer,e.width,e.height):c(n,e.framebuffer):o?c(n,null,n.canvas.width,n.canvas.height):c(n,null)},v=function(n,e,o){var r={width:e||n.canvas.clientWidth,height:o||n.canvas.clientHeight},t=f(n);r.texture=t,n.texImage2D(n.TEXTURE_2D,0,n.RGBA,r.width,r.height,0,n.RGBA,n.UNSIGNED_BYTE,null);var i=n.createFramebuffer();return r.framebuffer=i,n.bindFramebuffer(n.FRAMEBUFFER,i),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,t,0),n.bindFramebuffer(n.FRAMEBUFFER,null),r},s={attribFloat:function(n,e,o,r){var t=n.getAttribLocation(e,o);return n.enableVertexAttribArray(t),function(e){n.bindBuffer(n.ARRAY_BUFFER,e),n.vertexAttribPointer(t,r,n.FLOAT,!1,0,0)}}},p={uniform1f:function(n,e,o){var r=n.getUniformLocation(e,o);return function(e){n.uniform1f(r,e)}},uniform2fv:function(n,e,o){var r=n.getUniformLocation(e,o);return function(e){n.uniform2fv(r,e)}},uniform3fv:function(n,e,o){var r=n.getUniformLocation(e,o);return function(e){n.uniform3fv(r,e)}},uniformTexture:function(n,e,o,r){var t=n.getUniformLocation(e,o);return function(e){n.activeTexture(n.TEXTURE0+r),n.bindTexture(n.TEXTURE_2D,e),n.uniform1i(t,r)}},uniform1i:function(n,e,o){var r=n.getUniformLocation(e,o);return function(e){n.uniform1i(r,e)}},uniformMatrix4fv:function(n,e,o){var r=n.getUniformLocation(e,o);return function(e){n.uniformMatrix4fv(r,!1,e)}}},m=function(n,e,o,r,t){var i=e(n,o,r);return{programInfo:i,use:function(){n.useProgram(i.program)},attribSet:function(n){for(var e in n)i.attribLocations[e]&&i.attribLocations[e](n[e])},uniformSet:function(n){for(var e in n)i.uniformLocations[e]&&i.uniformLocations[e](n[e])},elementSet:function(e){n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e)}}},d=function(n){return[[n[0],n[1]],[n[2],n[1]],[n[2],n[3]],[n[0],n[3]]].flat()},b=function(n){n.clearColor(0,0,0,1),n.clear(n.COLOR_BUFFER_BIT)},_=function(n,e){var o=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];l(n,e,r),o&&b(n)}},1:function(n,e,o){"use strict";o.d(e,"a",(function(){return u})),o.d(e,"b",(function(){return c}));var r=o(3),t=o.n(r),i=o(4),a=o.n(i),f=o(2),u=function(){function n(){t()(this,n)}return a()(n,null,[{key:"normalize",value:function(e){return n.length(e)?n.scale(e,1/n.length(e)):e}},{key:"rotate",value:function(n,e){var o=Math.cos(e),r=Math.sin(e);return[n[0]*o-n[1]*r,n[1]*o+n[0]*r]}},{key:"dot",value:function(n,e){return n[0]*e[0]+n[1]*e[1]}},{key:"cross",value:function(n,e){return n[0]*e[1]-n[1]*e[0]}},{key:"add",value:function(n,e){return[n[0]+e[0],n[1]+e[1]]}},{key:"sub",value:function(n,e){return[n[0]-e[0],n[1]-e[1]]}},{key:"projection",value:function(e,o){var r=n.dot(e,o)/n.dot(o,o);return[o[0]*r,o[1]*r]}},{key:"length",value:function(e){return Math.sqrt(n.dot(e,e))}},{key:"mul",value:function(n,e){return[n[0]*e[0],n[1]*e[1]]}},{key:"div",value:function(n,e){return[n[0]/e[0],n[1]/e[1]]}},{key:"scale",value:function(n,e){return[n[0]*e,n[1]*e]}},{key:"collisionCalc",value:function(e,o,r,t){return n.scale(n.add(n.scale(e,r-t),n.scale(o,2*t)),1/(r+t))}},{key:"getAngle",value:function(n){return Math.atan2(n[1],n[0])}},{key:"floor",value:function(n){return[Math.floor(n[0]),Math.floor(n[1])]}},{key:"fract",value:function(n){return[f.a.fract(n[0]),f.a.fract(n[1])]}},{key:"sin",value:function(n){return[Math.sin(n[0]),Math.sin(n[1])]}},{key:"cos",value:function(n){return[Math.cos(n[0]),Math.cos(n[1])]}},{key:"distance",value:function(e,o){return n.length(n.sub(o,e))}},{key:"mix",value:function(n,e,o){return[f.a.mix(n[0],e[0],o),f.a.mix(n[1],e[1],o)]}},{key:"abs",value:function(n){return[Math.abs(n[0]),Math.abs(n[1])]}},{key:"getLine",value:function(e,o){return{pos:e,dir:n.sub(o,e)}}},{key:"toLineDistance",value:function(e,o,r){var t=arguments.length>3&&void 0!==arguments[3]&&arguments[3],i=n.sub(r,o),a=i[1],f=-i[0],u=-o[0]*i[1]+i[0]*o[1],c=(e[0]*a+e[1]*f+u)/n.length(i);return t?c:Math.abs(c)}}]),n}(),c=function(){function n(){t()(this,n)}return a()(n,null,[{key:"set",value:function(n,e,o){return n[0]=e,n[1]=o,n}},{key:"normalize",value:function(e){var o=u.length(e);return o&&n.scale(e,1/o),e}},{key:"add",value:function(n,e){return n[0]+=e[0],n[1]+=e[1],n}},{key:"sub",value:function(n,e){return n[0]-=e[0],n[1]-=e[1],n}},{key:"scale",value:function(n,e){return n[0]*=e,n[1]*=e,n}},{key:"rotate",value:function(n,e){var o=Math.cos(e),r=Math.sin(e),t=[n[0]*o-n[1]*r,n[1]*o+n[0]*r];return n[0]=t[0],n[1]=t[1],n}}]),n}()},2:function(n,e,o){"use strict";o.d(e,"a",(function(){return f}));var r=o(3),t=o.n(r),i=o(4),a=o.n(i),f=function(){function n(){t()(this,n)}return a()(n,null,[{key:"mix",value:function(n,e,o){return n*(1-o)+e*o}},{key:"fract",value:function(n){return(n%=1)<0?n+1:n}},{key:"inverseMix",value:function(n,e,o){return(o-n)/(e-n)}},{key:"clamp",value:function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;return n<=e?e:n>=o?o:n}},{key:"smoothstep",value:function(n,e,o){return(o=clamp(inverseMix(n,e,o)))*o*(3-2*o)}}]),n}()},25:function(n,e,o){"use strict";var r=o(0),t=o(5),i=o.n(t),a=o(26),f=o.n(a),u=function(n,e,o){var t=Object(r.f)(n,e,o);return{program:t,attribLocations:{vertexPosition:r.b.attribFloat(n,t,"aVertexPosition",2),textureCoord:r.b.attribFloat(n,t,"aTextureCoord",2)},uniformLocations:{flipY:r.i.uniform1f(n,t,"uFlipY"),sampler:r.i.uniformTexture(n,t,"uSampler",0)}}};e.a=function(n){return Object.assign(Object(r.h)(n,u,i.a,f.a),{draw:function(e){n.drawElements(n.TRIANGLES,e,n.UNSIGNED_BYTE,0)}})}},26:function(n,e){n.exports="precision highp float;\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nvoid main()\n{\n  gl_FragColor=texture2D(uSampler,vTextureCoord);\n}\n"},3:function(n,e){n.exports=function(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}},4:function(n,e){function o(n,e){for(var o=0;o<e.length;o++){var r=e[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}n.exports=function(n,e,r){return e&&o(n.prototype,e),r&&o(n,r),n}},42:function(n,e){n.exports="precision highp float;\nvarying vec2 vTextureCoord;\nuniform lowp vec2 uSize;\nuniform int uType;\nuniform vec2 uGrid;\nuniform vec2 uPos;\nuniform vec2 uLoop;\n//const float pi=3.14159265359;\nconst int OCTAVE_NUM=3;\n\nvec2 random2(vec2 p,vec2 loop){\n  if(loop.x!=0.){\n    p.x=mod(p.x,loop.x);\n  }\n  if(loop.y!=0.){\n    p.y=mod(p.y,loop.y);\n  }\n  vec2 f=vec2(\n    dot(p,vec2(1.271,3.117)),\n    dot(p,vec2(2.695,1.833))\n  );\n  return-1.+2.*fract(sin(f)*437.585453123);\n}\n\nfloat noise_perlin(vec2 p,vec2 loop){\n  vec2 i=floor(p);\n  vec2 f=fract(p);\n  float a=dot(random2(i,loop),f);\n  float b=dot(random2(i+vec2(1.,0.),loop),f-vec2(1.,0.));\n  float c=dot(random2(i+vec2(0.,1.),loop),f-vec2(0.,1.));\n  float d=dot(random2(i+vec2(1.,1.),loop),f-vec2(1.,1.));\n  //vec2 u=smoothstep(0.,1.,f);\n  vec2 u=f*f*(3.-2.*f);\n  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);\n}\n\nfloat fbm_noise_perlin(vec2 p,vec2 loop){\n  float f=0.;\n  float a=.5;\n  for(int i=0;i<OCTAVE_NUM;i++)\n  {\n    f+=a*noise_perlin(p,loop);\n    p*=2.;\n    a/=2.;\n  }\n  return f;\n}\nfloat fbm_abs_noise_perlin(vec2 p,vec2 loop){\n  float f=0.;\n  float a=.5;\n  for(int i=0;i<OCTAVE_NUM;i++)\n  {\n    f+=a*abs(noise_perlin(p,loop));\n    p*=2.;\n    a/=2.;\n  }\n  return f;\n}\n\n/*float domain_wraping(vec2 p)\n{\n  return fbm_abs_noise_perlin(p+fbm_abs_noise_perlin(p+fbm_abs_noise_perlin(p)));\n}*/\n\nvoid main()\n{\n  vec2 uv=(vTextureCoord+uPos)*uGrid;\n  if(uType==1){\n    float f=noise_perlin(uv,uLoop)*.5+.5;\n    gl_FragColor=vec4(vec3(f),1.);\n    /*vec2 uv0=smoothstep(vec2(.5),vec2(.5),fract(uv));\n    float f=abs(uv0.x-uv0.y);\n    gl_FragColor=vec4(vec3(f),1.);*/\n  }else if(uType==2){\n    float f=fbm_noise_perlin(uv,uLoop)*.5+.5;\n    gl_FragColor=vec4(vec3(f),1.);\n  }else if(uType==3){\n    float f=fbm_abs_noise_perlin(uv,uLoop)*.5+.5;\n    gl_FragColor=vec4(vec3(f),1.);\n  }\n}\n\n"},43:function(n,e){n.exports="precision highp float;\nvarying vec2 vTextureCoord;\nuniform lowp vec2 uSize;\nuniform int uType;\nuniform vec2 uGrid;\nuniform vec2 uPos;\nuniform vec2 uLoop;\n//const float pi=3.14159265359;\nconst int OCTAVE_NUM=3;\n\n/*vec3 random3(vec3 p){\n  vec3 f=vec3(\n    dot(p,vec3(127.1,311.7,69.5)),\n    dot(p,vec3(269.5,183.3,132.7)),\n    dot(p,vec3(247.3,108.5,96.5))\n  );\n  return-1.+2.*fract(sin(f)*43758.5453123);\n}*/\nvec2 random2(vec2 p){\n  vec2 f=vec2(\n    dot(p,vec2(1.271,3.117)),\n    dot(p,vec2(2.695,1.833))\n  );\n  return-1.+2.*fract(sin(f)*437.585453123);\n}\n/*float random(vec2 p){\n  float f=dot(p,vec2(127.1,311.7));\n  return-1.+2.*fract(sin(f)*43758.5453123);\n}*/\n\nfloat noise_simplex(vec2 p){\n  const float K1=.366025404;// (sqrt(3)-1)/2;\n  const float K2=.211324865;// (3-sqrt(3))/6;\n  vec2 i=floor(p+(p.x+p.y)*K1);\n  vec2 a=p-i+(i.x+i.y)*K2;\n  float m=step(a.y,a.x);\n  vec2 o=vec2(m,1.-m);\n  vec2 b=a-o+K2;\n  vec2 c=a-1.+2.*K2;\n  vec3 h=max(.5-vec3(dot(a,a),dot(b,b),dot(c,c)),0.);\n  vec3 n=h*h*h*h*vec3(dot(a,random2(i+0.)),dot(b,random2(i+o)),dot(c,random2(i+1.)));\n  return dot(n,vec3(70.));\n}\n\nfloat fbm_noise_simplex(vec2 p){\n  float f=0.;\n  float a=.5;\n  for(int i=0;i<OCTAVE_NUM;i++)\n  {\n    f+=a*noise_simplex(p);\n    p*=2.;\n    a/=2.;\n  }\n  return f;\n}\n\nfloat fbm_abs_noise_simplex(vec2 p){\n  float f=0.;\n  float a=.5;\n  for(int i=0;i<OCTAVE_NUM;i++)\n  {\n    f+=a*abs(noise_simplex(p));\n    p*=2.;\n    a/=2.;\n  }\n  return f;\n}\n\nvoid main()\n{\n  vec2 uv=(vTextureCoord+uPos)*uGrid;\n  if(uType==1){\n    float f=noise_simplex(uv)*.5+.5;\n    gl_FragColor=vec4(vec3(f),1.);\n  }else if(uType==2){\n    float f=fbm_noise_simplex(uv)*.5+.5;\n    gl_FragColor=vec4(vec3(f),1.);\n  }else if(uType==3){\n    float f=fbm_abs_noise_simplex(uv)*.5+.5;\n    gl_FragColor=vec4(vec3(f),1.);\n  }\n}\n\n"},44:function(n,e){n.exports="precision highp float;\nvarying vec2 vTextureCoord;\nuniform lowp vec2 uSize;\nuniform int uType;\nuniform vec2 uGrid;\nuniform vec2 uPos;\nuniform vec2 uLoop;\n//const float pi=3.14159265359;\nconst int OCTAVE_NUM=3;\n\n/*vec3 random3(vec3 p){\n  vec3 f=vec3(\n    dot(p,vec3(127.1,311.7,69.5)),\n    dot(p,vec3(269.5,183.3,132.7)),\n    dot(p,vec3(247.3,108.5,96.5))\n  );\n  return-1.+2.*fract(sin(f)*43758.5453123);\n}\nvec2 random2(vec2 p){\n  vec2 f=vec2(\n    dot(p,vec2(127.1,311.7)),\n    dot(p,vec2(269.5,183.3))\n  );\n  return-1.+2.*fract(sin(f)*43758.5453123);\n}*/\nfloat random(vec2 p,vec2 loop){\n  if(loop.x!=0.){\n    p.x=mod(p.x,loop.x);\n  }\n  if(loop.y!=0.){\n    p.y=mod(p.y,loop.y);\n  }\n  float f=dot(p,vec2(1.271,3.117));\n  return-1.+2.*fract(sin(f)*437.585453123);\n}\n\nfloat noise_value(vec2 p,vec2 loop){\n  vec2 i=floor(p);\n  vec2 f=fract(p);\n  vec2 u=f*f*(3.-2.*f);\n  float a=random(i+vec2(0.,0.),loop);\n  float b=random(i+vec2(1.,0.),loop);\n  float c=random(i+vec2(0.,1.),loop);\n  float d=random(i+vec2(1.,1.),loop);\n  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);\n}\nfloat fbm_noise_value(vec2 p,vec2 loop){\n  float f=0.;\n  float a=.5;\n  for(int i=0;i<OCTAVE_NUM;i++)\n  {\n    f+=a*noise_value(p,loop);\n    p*=2.;\n    a/=2.;\n  }\n  return f;\n}\nfloat fbm_abs_noise_value(vec2 p,vec2 loop){\n  float f=0.;\n  float a=.5;\n  for(int i=0;i<OCTAVE_NUM;i++)\n  {\n    f+=a*abs(noise_value(p,loop));\n    p*=2.;\n    a/=2.;\n  }\n  return f;\n}\nvoid main()\n{\n  vec2 uv=(vTextureCoord+uPos)*uGrid;\n  if(uType==1){\n    float f=noise_value(uv,uLoop)*.5+.5;\n    gl_FragColor=vec4(vec3(f),1.);\n  }else if(uType==2){\n    float f=fbm_noise_value(uv,uLoop)*.5+.5;\n    gl_FragColor=vec4(vec3(f),1.);\n  }else if(uType==3){\n    float f=fbm_abs_noise_value(uv,uLoop)*.5+.5;\n    gl_FragColor=vec4(vec3(f),1.);\n  }\n}\n\n"},45:function(n,e){n.exports="precision highp float;\nvarying vec2 vTextureCoord;\nuniform lowp vec2 uSize;\nuniform int uType;\nuniform vec2 uGrid;\nuniform vec2 uPos;\nuniform vec2 uLoop;\n//const float pi=3.14159265359;\nconst int OCTAVE_NUM=3;\n\n/*vec3 random3(vec3 p){\n  vec3 f=vec3(\n    dot(p,vec3(127.1,311.7,69.5)),\n    dot(p,vec3(269.5,183.3,132.7)),\n    dot(p,vec3(247.3,108.5,96.5))\n  );\n  return-1.+2.*fract(sin(f)*43758.5453123);\n}*/\nvec2 random2(vec2 p,vec2 loop){\n  if(loop.x!=0.){\n    p.x=mod(p.x,loop.x);\n  }\n  if(loop.y!=0.){\n    p.y=mod(p.y,loop.y);\n  }\n  vec2 f=vec2(\n    dot(p,vec2(1.271,3.117)),\n    dot(p,vec2(2.695,1.833))\n  );\n  return-1.+2.*fract(sin(f)*437.585453123);\n}\n/*float random(vec2 p){\n  float f=dot(p,vec2(127.1,311.7));\n  return-1.+2.*fract(sin(f)*43758.5453123);\n}*/\nfloat noise_worley(vec2 p,vec2 loop){\n  vec2 i=floor(p);\n  vec2 f=fract(p);\n  float F1=1.;\n  for(int j=-1;j<=1;j++){\n    for(int k=-1;k<=1;k++){\n      vec2 neighbor=vec2(float(j),float(k));\n      vec2 point=random2(i+neighbor,loop)*.5+.5;\n      float d=length(point+neighbor-f);\n      F1=min(F1,d);\n    }\n  }\n  F1=F1*F1*(3.-2.*F1);\n  return F1;\n}\nfloat fbm_noise_worley(vec2 p,vec2 loop){\n  float f=0.;\n  float a=.5;\n  for(int i=0;i<OCTAVE_NUM;i++)\n  {\n    f+=a*noise_worley(p,loop);\n    p*=2.;\n    a/=2.;\n  }\n  return f;\n}\nfloat fbm_abs_noise_worley(vec2 p,vec2 loop){\n  float f=0.;\n  float a=.5;\n  for(int i=0;i<OCTAVE_NUM;i++)\n  {\n    f+=a*abs(noise_worley(p,loop)*2.-1.);\n    p*=2.;\n    a/=2.;\n  }\n  f=f*.5+.5;\n  return f;\n}\n\nvoid main()\n{\n  vec2 uv=(vTextureCoord+uPos)*uGrid;\n  if(uType==1){\n    float f=noise_worley(uv,uLoop);\n    gl_FragColor=vec4(vec3(f),1.);\n  }else if(uType==2){\n    float f=fbm_noise_worley(uv,uLoop);\n    gl_FragColor=vec4(vec3(f),1.);\n  }else if(uType==3){\n    float f=fbm_abs_noise_worley(uv,uLoop);\n    gl_FragColor=vec4(vec3(f),1.);\n  }\n}\n\n"},46:function(n,e){n.exports="precision highp float;\nvarying vec2 vTextureCoord;\nuniform lowp vec2 uSize;\nuniform lowp float uDepth;\nuniform int uType;\nuniform vec3 uGrid;\nuniform vec3 uPos;\nuniform vec3 uLoop;\nuniform sampler2D uSampler;\nconst float pi=3.14159265359;\nconst int OCTAVE_NUM=3;\n\nvec3 random3(vec3 p,vec3 loop){\n  if(loop.x!=0.){\n    p.x=mod(p.x,loop.x);\n  }\n  if(loop.y!=0.){\n    p.y=mod(p.y,loop.y);\n  }\n  if(loop.z!=0.){\n    p.z=mod(p.z,loop.z);\n  }\n  vec3 f=vec3(\n    dot(p,vec3(1.271,3.117,.695)),\n    dot(p,vec3(2.695,1.833,1.327)),\n    dot(p,vec3(2.473,1.085,.965))\n  );\n  return-1.+2.*fract(sin(f)*437.585453123);\n}\nfloat noise_perlin(vec3 p,vec3 loop){\n  vec3 i=floor(p);\n  vec3 s=fract(p);\n  float a=dot(random3(i,loop),s);\n  float b=dot(random3(i+vec3(1,0,0),loop),s-vec3(1,0,0));\n  float c=dot(random3(i+vec3(0,1,0),loop),s-vec3(0,1,0));\n  float d=dot(random3(i+vec3(0,0,1),loop),s-vec3(0,0,1));\n  float e=dot(random3(i+vec3(1,1,0),loop),s-vec3(1,1,0));\n  float f=dot(random3(i+vec3(1,0,1),loop),s-vec3(1,0,1));\n  float g=dot(random3(i+vec3(0,1,1),loop),s-vec3(0,1,1));\n  float h=dot(random3(i+vec3(1,1,1),loop),s-vec3(1,1,1));\n  vec3 u=smoothstep(0.,1.,s);\n  //vec3 u=s*s*(3.-2.*s);\n  return mix(mix(mix(a,b,u.x),mix(c,e,u.x),u.y),mix(mix(d,f,u.x),mix(g,h,u.x),u.y),u.z);\n}\nfloat fbm_noise_perlin(vec3 p,vec3 loop){\n  float f=0.;\n  float a=.5;\n  for(int i=0;i<OCTAVE_NUM;i++){\n    f+=a*noise_perlin(p,loop);\n    p*=2.;\n    a/=2.;\n  }\n  return f;\n}\nfloat fbm_abs_noise_perlin(vec3 p,vec3 loop){\n  float f=0.;\n  float a=.5;\n  for(int i=0;i<OCTAVE_NUM;i++){\n    f+=a*abs(noise_perlin(p,loop));\n    p*=2.;\n    a/=2.;\n  }\n  return f;\n}\n\nvoid main()\n{\n  vec3 uv=(vec3(vTextureCoord,0.)+uPos)*uGrid;\n  float f=fbm_abs_noise_perlin(uv,uLoop)*.5+.5;\n  gl_FragColor=vec4(vec3(1.5*f,1.5*f*f*f,f*f*f*f*f*f),1.);\n  \n}\n\n"},5:function(n,e){n.exports="attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nvarying highp vec2 vTextureCoord;\nuniform float uFlipY;\nvoid main(void){\n  vTextureCoord=aTextureCoord;\n  gl_Position=vec4((2.*aVertexPosition+vec2(-1.,-1.))*vec2(1.,uFlipY),0.,1.);\n}"},69:function(n,e,o){"use strict";o.r(e);var r=o(0),t=o(1),i=o(5),a=o.n(i),f=o(42),u=o.n(f),c=function(n,e,o){var t=Object(r.f)(n,e,o);return{program:t,attribLocations:{vertexPosition:r.b.attribFloat(n,t,"aVertexPosition",2),textureCoord:r.b.attribFloat(n,t,"aTextureCoord",2)},uniformLocations:{flipY:r.i.uniform1f(n,t,"uFlipY"),size:r.i.uniform2fv(n,t,"uSize"),grid:r.i.uniform2fv(n,t,"uGrid"),pos:r.i.uniform2fv(n,t,"uPos"),type:r.i.uniform1i(n,t,"uType"),loop:r.i.uniform2fv(n,t,"uLoop")}}},l=function(n){return Object.assign(Object(r.h)(n,c,a.a,u.a),{draw:function(e){n.drawElements(n.TRIANGLES,e,n.UNSIGNED_BYTE,0)}})},v=o(43),s=o.n(v),p=function(n,e,o){var t=Object(r.f)(n,e,o);return{program:t,attribLocations:{vertexPosition:r.b.attribFloat(n,t,"aVertexPosition",2),textureCoord:r.b.attribFloat(n,t,"aTextureCoord",2)},uniformLocations:{flipY:r.i.uniform1f(n,t,"uFlipY"),size:r.i.uniform2fv(n,t,"uSize"),grid:r.i.uniform2fv(n,t,"uGrid"),pos:r.i.uniform2fv(n,t,"uPos"),type:r.i.uniform1i(n,t,"uType"),loop:r.i.uniform2fv(n,t,"uLoop")}}},m=function(n){return Object.assign(Object(r.h)(n,p,a.a,s.a),{draw:function(e){n.drawElements(n.TRIANGLES,e,n.UNSIGNED_BYTE,0)}})},d=o(44),b=o.n(d),_=function(n,e,o){var t=Object(r.f)(n,e,o);return{program:t,attribLocations:{vertexPosition:r.b.attribFloat(n,t,"aVertexPosition",2),textureCoord:r.b.attribFloat(n,t,"aTextureCoord",2)},uniformLocations:{flipY:r.i.uniform1f(n,t,"uFlipY"),size:r.i.uniform2fv(n,t,"uSize"),grid:r.i.uniform2fv(n,t,"uGrid"),pos:r.i.uniform2fv(n,t,"uPos"),type:r.i.uniform1i(n,t,"uType"),loop:r.i.uniform2fv(n,t,"uLoop")}}},g=function(n){return Object.assign(Object(r.h)(n,_,a.a,b.a),{draw:function(e){n.drawElements(n.TRIANGLES,e,n.UNSIGNED_BYTE,0)}})},x=o(45),T=o.n(x),h=function(n,e,o){var t=Object(r.f)(n,e,o);return{program:t,attribLocations:{vertexPosition:r.b.attribFloat(n,t,"aVertexPosition",2),textureCoord:r.b.attribFloat(n,t,"aTextureCoord",2)},uniformLocations:{flipY:r.i.uniform1f(n,t,"uFlipY"),size:r.i.uniform2fv(n,t,"uSize"),grid:r.i.uniform2fv(n,t,"uGrid"),pos:r.i.uniform2fv(n,t,"uPos"),type:r.i.uniform1i(n,t,"uType"),loop:r.i.uniform2fv(n,t,"uLoop")}}},E=function(n){return Object.assign(Object(r.h)(n,h,a.a,T.a),{draw:function(e){n.drawElements(n.TRIANGLES,e,n.UNSIGNED_BYTE,0)}})},y=o(46),F=o.n(y),R=function(n,e,o){var t=Object(r.f)(n,e,o);return{program:t,attribLocations:{vertexPosition:r.b.attribFloat(n,t,"aVertexPosition",2),textureCoord:r.b.attribFloat(n,t,"aTextureCoord",2)},uniformLocations:{flipY:r.i.uniform1f(n,t,"uFlipY"),size:r.i.uniform2fv(n,t,"uSize"),depth:r.i.uniform1f(n,t,"uDepth"),grid:r.i.uniform3fv(n,t,"uGrid"),pos:r.i.uniform3fv(n,t,"uPos"),type:r.i.uniform1i(n,t,"uType"),loop:r.i.uniform3fv(n,t,"uLoop"),sampler:r.i.uniformTexture(n,t,"uSampler",0)}}},S=function(n){return Object.assign(Object(r.h)(n,R,a.a,F.a),{draw:function(e){n.drawElements(n.TRIANGLES,e,n.UNSIGNED_BYTE,0)}})},A=o(25);function P(n){var e=[[0,0],[1,0],[1,1],[0,1]].flat(),o=Object(r.a)(n,e,2),t=[[0,0],[1,0],[1,1],[0,1]].flat(),i=Object(r.a)(n,t,2),a=[[0,1,3],[1,2,3]].flat();return{positionBufferData:o,textureCoordinatesBufferData:i,indicesBufferData:Object(r.d)(n,a)}}!function(){var n=document.querySelector("#glcanvas"),e={alpha:!1},o=n.getContext("webgl2",e);o||(o=n.getContext("webgl",e)||n.getContext("experimental-webgl",e),!1);if(!o)return void alert("無法初始化WebGL。您的瀏覽器或機器可能不支持它。");var i={noisePerlinShader:l(o),noiseSimplexShader:m(o),noiseValueShader:g(o),noiseWorleyShader:E(o),noisePerlin3DShader:S(o),viewShader:Object(A.a)(o)},a={face:P(o),view:P(o)},f={image:Object(r.g)(o,"../img/image.2364c514fa27293af4f7918beff7047e.jpg")},u=[.5*o.canvas.width,.5*o.canvas.height];n.addEventListener("mousemove",(function(n){t.b.set(u,n.pageX,n.pageY)}));var c=[o.canvas.clientWidth,o.canvas.clientHeight],v={noise:Object(r.c)(o),noisePerlin3D:Object(r.c)(o)},s=[[{framebufferTexture:v.noisePerlin,shaderProgram:i.noisePerlinShader,type:1},{framebufferTexture:v.fbm_noisePerlin,shaderProgram:i.noisePerlinShader,type:2},{framebufferTexture:v.fbm_abs_noisePerlin,shaderProgram:i.noisePerlinShader,type:3}],[{framebufferTexture:v.noiseSimplex,shaderProgram:i.noiseSimplexShader,type:1},{framebufferTexture:v.fbm_noiseSimplex,shaderProgram:i.noiseSimplexShader,type:2},{framebufferTexture:v.fbm_abs_noiseSimplex,shaderProgram:i.noiseSimplexShader,type:3}],[{framebufferTexture:v.noiseValue,shaderProgram:i.noiseValueShader,type:1},{framebufferTexture:v.fbm_noiseValue,shaderProgram:i.noiseValueShader,type:2},{framebufferTexture:v.fbm_abs_noiseValue,shaderProgram:i.noiseValueShader,type:3}],[{framebufferTexture:v.noiseWorley,shaderProgram:i.noiseWorleyShader,type:1},{framebufferTexture:v.fbm_noiseWorley,shaderProgram:i.noiseWorleyShader,type:2},{framebufferTexture:v.fbm_abs_noiseWorley,shaderProgram:i.noiseWorleyShader,type:3}]];!function(n,e,o,t,i){for(var a=i.framebufferTextures,f=i.size,u=i.noiseTexture,c=o.face,l=0;l<6;l++)if(u[l])for(var v=0;v<6;v++)if(u[l][v]){var s=u[l][v].shaderProgram;s.use();var p=Object(r.e)([v/6,l/6,(v+1)/6,(l+1)/6]);c.positionBufferData.set(p),s.attribSet({vertexPosition:c.positionBufferData.buffer,textureCoord:c.textureCoordinatesBufferData.buffer}),s.uniformSet({size:f,grid:[12,12],type:u[l][v].type,pos:[0,0],flipY:1,loop:[0,0]}),Object(r.j)(n,a.noise,v+l==0),s.draw(c.indicesBufferData.length)}c.positionBufferData.set(Object(r.e)([0,0,1,1]))}(o,0,a,0,{framebufferTextures:v,size:c,noiseTexture:s});var p=0;requestAnimationFrame((function n(e){var t=.001*(e-p);p=e,requestAnimationFrame(n),function(n,e,o,t,i){var a=i.now,f=i.framebufferTextures,u=(i.mPos,i.size),c=(i.noiseTexture,o.face),l=e.noisePerlin3DShader;l.use(),l.attribSet({vertexPosition:c.positionBufferData.buffer,textureCoord:c.textureCoordinatesBufferData.buffer}),l.uniformSet({size:u,depth:500,grid:[20,20,20],type:1,pos:[0,0,5e-5*a],flipY:1,loop:[20,20,20],sampler:t.image}),Object(r.j)(n,f.noisePerlin3D),l.draw(c.indicesBufferData.length);var v=o.view,s=e.viewShader;s.use(),s.attribSet({vertexPosition:v.positionBufferData.buffer,textureCoord:v.textureCoordinatesBufferData.buffer}),s.uniformSet({flipY:-1}),Object(r.j)(n),v.textureCoordinatesBufferData.set(Object(r.e)([0,0,1,1])),v.positionBufferData.set(Object(r.e)([0,0,1,1])),s.uniformSet({sampler:f.noise.texture}),s.draw(v.indicesBufferData.length),v.positionBufferData.set(Object(r.e)([.5,0,1,.5])),s.uniformSet({sampler:f.noisePerlin3D.texture}),s.draw(v.indicesBufferData.length)}(o,i,a,f,{now:e,delta:t,mPos:u,framebufferTextures:v,size:c,noiseTexture:s})}))}()}});