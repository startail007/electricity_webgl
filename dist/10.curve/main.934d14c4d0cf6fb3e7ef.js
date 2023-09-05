!function(e){var t={};function n(r){if(t[r])return t[r].exports;var u=t[r]={i:r,l:!1,exports:{}};return e[r].call(u.exports,u,u.exports,n),u.l=!0,u.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var u in e)n.d(r,u,function(t){return e[t]}.bind(null,u));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=77)}({0:function(e,t,n){"use strict";n.d(t,"h",(function(){return b})),n.d(t,"f",(function(){return r})),n.d(t,"c",(function(){return v})),n.d(t,"a",(function(){return a})),n.d(t,"d",(function(){return o})),n.d(t,"g",(function(){return f})),n.d(t,"b",(function(){return s})),n.d(t,"i",(function(){return d})),n.d(t,"e",(function(){return m})),n.d(t,"j",(function(){return p}));var r=function(e,t,n){var r=u(e,e.VERTEX_SHADER,t),a=u(e,e.FRAGMENT_SHADER,n),o=e.createProgram();return e.attachShader(o,r),e.attachShader(o,a),e.linkProgram(o),e.getProgramParameter(o,e.LINK_STATUS)?o:(alert("無法初始化著色器程序: "+e.getProgramInfoLog(o)),null)},u=function(e,t,n){var r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(alert("編譯著色器時發生錯誤: "+e.getShaderInfoLog(r)),e.deleteShader(r),null)},a=function(e,t,n){var r,u=arguments.length>3&&void 0!==arguments[3]?arguments[3]:Float32Array,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:e.STATIC_DRAW,o=e.createBuffer(),i=0,f={buffer:o,get data(){return r},get length(){return r.length},set:function(t){r=new u(t),i=100*Math.ceil(r.length/n/100),e.bindBuffer(e.ARRAY_BUFFER,o),e.bufferData(e.ARRAY_BUFFER,i*n*4,a),e.bufferSubData(e.ARRAY_BUFFER,0,r)},add:function(t){var f=r.length,c=100*Math.floor(r.length/n/100);c>=i&&(i=c+100,e.bindBuffer(e.ARRAY_BUFFER,o),e.bufferData(e.ARRAY_BUFFER,i*n*4,a),e.bufferSubData(e.ARRAY_BUFFER,0,r));var l=new u(f+n);l.set(r),r=l,this.item(f/n,t)},item:function(t,a){var i=new u(a);r.set(i,t*n),e.bindBuffer(e.ARRAY_BUFFER,o),e.bufferSubData(e.ARRAY_BUFFER,t*n*4,i)},getItem:function(e){return Array.from(r.slice(e*n,(e+1)*n))}};return f.set(t),f},o=function(e,t){var n,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Uint8Array,u=arguments.length>3&&void 0!==arguments[3]?arguments[3]:e.STATIC_DRAW,a=e.createBuffer(),o=0,i=3,f={buffer:a,get data(){return n},get length(){return n.length},set:function(t){n=new r(t),o=100*Math.ceil(n.length/i/100),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,a),e.bufferData(e.ELEMENT_ARRAY_BUFFER,o*i*4,u),e.bufferSubData(e.ELEMENT_ARRAY_BUFFER,0,n)},add:function(t){var f=n.length,c=100*Math.floor(n.length/i/100);c>=o&&(o=c+100,e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,a),e.bufferData(e.ELEMENT_ARRAY_BUFFER,o*i*4,u),e.bufferSubData(e.ELEMENT_ARRAY_BUFFER,0,n));var l=new r(f+i);l.set(n),n=l,this.item(f/i,t)},item:function(t,u){var o=new r(u);n.set(o,t*i),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,a),e.bufferSubData(e.ELEMENT_ARRAY_BUFFER,t*i*4,o)},getItem:function(e){return Array.from(n.slice(e*i,(e+1)*i))}};return f.set(t),f},i=function(e){var t=e.createTexture();return e.bindTexture(e.TEXTURE_2D,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),t},f=function(e,t){var n=i(e),r=new Image;return r.onload=function(){n.width=r.width,n.height=r.height,e.bindTexture(e.TEXTURE_2D,n),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,r),e.bindTexture(e.TEXTURE_2D,null)},r.src=t,n},c=function(e,t,n,r){e.bindFramebuffer(e.FRAMEBUFFER,t),void 0!==n&&void 0!==r&&e.viewport(0,0,n,r)},l=function(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];t?n?c(e,t.framebuffer,t.width,t.height):c(e,t.framebuffer):n?c(e,null,e.canvas.width,e.canvas.height):c(e,null)},v=function(e,t,n){var r={width:t||e.canvas.clientWidth,height:n||e.canvas.clientHeight},u=i(e);r.texture=u,e.texImage2D(e.TEXTURE_2D,0,e.RGBA,r.width,r.height,0,e.RGBA,e.UNSIGNED_BYTE,null);var a=e.createFramebuffer();return r.framebuffer=a,e.bindFramebuffer(e.FRAMEBUFFER,a),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,u,0),e.bindFramebuffer(e.FRAMEBUFFER,null),r},s={attribFloat:function(e,t,n,r){var u=e.getAttribLocation(t,n);return e.enableVertexAttribArray(u),function(t){e.bindBuffer(e.ARRAY_BUFFER,t),e.vertexAttribPointer(u,r,e.FLOAT,!1,0,0)}}},d={uniform1f:function(e,t,n){var r=e.getUniformLocation(t,n);return function(t){e.uniform1f(r,t)}},uniform2fv:function(e,t,n){var r=e.getUniformLocation(t,n);return function(t){e.uniform2fv(r,t)}},uniform3fv:function(e,t,n){var r=e.getUniformLocation(t,n);return function(t){e.uniform3fv(r,t)}},uniformTexture:function(e,t,n,r){var u=e.getUniformLocation(t,n);return function(t){e.activeTexture(e.TEXTURE0+r),e.bindTexture(e.TEXTURE_2D,t),e.uniform1i(u,r)}},uniform1i:function(e,t,n){var r=e.getUniformLocation(t,n);return function(t){e.uniform1i(r,t)}},uniformMatrix4fv:function(e,t,n){var r=e.getUniformLocation(t,n);return function(t){e.uniformMatrix4fv(r,!1,t)}}},b=function(e,t,n,r,u){var a=t(e,n,r);return{programInfo:a,use:function(){e.useProgram(a.program)},attribSet:function(e){for(var t in e)a.attribLocations[t]&&a.attribLocations[t](e[t])},uniformSet:function(e){for(var t in e)a.uniformLocations[t]&&a.uniformLocations[t](e[t])},elementSet:function(t){e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t)}}},m=function(e){return[[e[0],e[1]],[e[2],e[1]],[e[2],e[3]],[e[0],e[3]]].flat()},E=function(e){e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT)},p=function(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];l(e,t,r),n&&E(e)}},1:function(e,t,n){"use strict";n.d(t,"a",(function(){return f})),n.d(t,"b",(function(){return c}));var r=n(3),u=n.n(r),a=n(4),o=n.n(a),i=n(2),f=function(){function e(){u()(this,e)}return o()(e,null,[{key:"normalize",value:function(t){return e.length(t)?e.scale(t,1/e.length(t)):t}},{key:"rotate",value:function(e,t){var n=Math.cos(t),r=Math.sin(t);return[e[0]*n-e[1]*r,e[1]*n+e[0]*r]}},{key:"dot",value:function(e,t){return e[0]*t[0]+e[1]*t[1]}},{key:"cross",value:function(e,t){return e[0]*t[1]-e[1]*t[0]}},{key:"add",value:function(e,t){return[e[0]+t[0],e[1]+t[1]]}},{key:"sub",value:function(e,t){return[e[0]-t[0],e[1]-t[1]]}},{key:"projection",value:function(t,n){var r=e.dot(t,n)/e.dot(n,n);return[n[0]*r,n[1]*r]}},{key:"length",value:function(t){return Math.sqrt(e.dot(t,t))}},{key:"mul",value:function(e,t){return[e[0]*t[0],e[1]*t[1]]}},{key:"div",value:function(e,t){return[e[0]/t[0],e[1]/t[1]]}},{key:"scale",value:function(e,t){return[e[0]*t,e[1]*t]}},{key:"collisionCalc",value:function(t,n,r,u){return e.scale(e.add(e.scale(t,r-u),e.scale(n,2*u)),1/(r+u))}},{key:"getAngle",value:function(e){return Math.atan2(e[1],e[0])}},{key:"floor",value:function(e){return[Math.floor(e[0]),Math.floor(e[1])]}},{key:"fract",value:function(e){return[i.a.fract(e[0]),i.a.fract(e[1])]}},{key:"sin",value:function(e){return[Math.sin(e[0]),Math.sin(e[1])]}},{key:"cos",value:function(e){return[Math.cos(e[0]),Math.cos(e[1])]}},{key:"distance",value:function(t,n){return e.length(e.sub(n,t))}},{key:"mix",value:function(e,t,n){return[i.a.mix(e[0],t[0],n),i.a.mix(e[1],t[1],n)]}},{key:"abs",value:function(e){return[Math.abs(e[0]),Math.abs(e[1])]}},{key:"getLine",value:function(t,n){return{pos:t,dir:e.sub(n,t)}}}]),e}(),c=function(){function e(){u()(this,e)}return o()(e,null,[{key:"set",value:function(e,t,n){return e[0]=t,e[1]=n,e}},{key:"normalize",value:function(t){var n=f.length(t);return n&&e.scale(t,1/n),t}},{key:"add",value:function(e,t){return e[0]+=t[0],e[1]+=t[1],e}},{key:"sub",value:function(e,t){return e[0]-=t[0],e[1]-=t[1],e}},{key:"scale",value:function(e,t){return e[0]*=t,e[1]*=t,e}},{key:"rotate",value:function(e,t){var n=Math.cos(t),r=Math.sin(t),u=[e[0]*n-e[1]*r,e[1]*n+e[0]*r];return e[0]=u[0],e[1]=u[1],e}}]),e}()},2:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var r=n(3),u=n.n(r),a=n(4),o=n.n(a),i=function(){function e(){u()(this,e)}return o()(e,null,[{key:"mix",value:function(e,t,n){return e*(1-n)+t*n}},{key:"fract",value:function(e){return(e%=1)<0?e+1:e}},{key:"inverseMix",value:function(e,t,n){return(n-e)/(t-e)}},{key:"clamp",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;return e<=t?t:e>=n?n:e}},{key:"smoothstep",value:function(e,t,n){return(n=clamp(inverseMix(e,t,n)))*n*(3-2*n)}}]),e}()},3:function(e,t){e.exports=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},4:function(e,t){function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}e.exports=function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}},5:function(e,t){e.exports="attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nvarying highp vec2 vTextureCoord;\nuniform float uFlipY;\nvoid main(void){\n  vTextureCoord=aTextureCoord;\n  gl_Position=vec4((2.*aVertexPosition+vec2(-1.,-1.))*vec2(1.,uFlipY),0.,1.);\n}"},50:function(e,t){e.exports="precision mediump float;\nvarying vec2 vTextureCoord;\nuniform lowp vec2 uSize;\nuniform float uTime;\nuniform vec2 uStartPos;\nuniform vec2 uControlPos;\nuniform vec2 uEndPos;\nconst float pi=3.14159265359;\n\nfloat distLine(vec2 p,vec2 a,vec2 b,float w){\n  vec2 pa=p-a;\n  vec2 ba=b-a;\n  float t=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);\n  return length(pa-ba*t)/w;\n}\nfloat ball(vec2 f,float r){\n  return smoothstep(1.,.99,length(f)/r);\n}\nfloat cross(vec2 v0,vec2 v1){\n  return v0.x*v1.y-v0.y*v1.x;\n}\nvec2 getQuadraticCurveTo(vec2 p0,vec2 p1,vec2 p2,float t){\n  return p0*(1.-t)*(1.-t)+p1*2.*(1.-t)*t+p2*t*t;\n}\nvec2 getQuadraticCurveToTangent(vec2 p0,vec2 p1,vec2 p2,float t){\n  return 2.*t*(p0-p1*2.+p2)+2.*(-p0+p1);\n}\n/*float distLine0(vec2 p,vec2 a,vec2 b){\n  vec2 pa=p-a;\n  vec2 ba=b-a;\n  float t=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);\n  return length(pa-ba*t);\n}*/\nvec2 quadraticCurve(vec2 p,vec2 a,vec2 b,vec2 c,float w){\n  float s=.5;\n  float rate=.5;\n  const int N=8;\n  vec2 p0=getQuadraticCurveTo(a,b,c,0.);\n  vec2 p2=getQuadraticCurveTo(a,b,c,1.);\n  vec2 p1=getQuadraticCurveTo(a,b,c,rate);\n  for(int i=0;i<N;i++){\n    /*float line0 = distLine(p,p1,p0,1.);\n    float line1 = distLine(p,p1,p2,1.);\n    if(line0<line1){\n      rate-=s*.5;\n      p2 = p1;\n    }else if(line0>line1){\n      rate+=s*.5;\n      p0 = p1;\n    }else{*/\n      vec2 t=getQuadraticCurveToTangent(a,b,c,rate);\n      t=vec2(-t.y,t.x);\n      if(cross(p-p1,t)<0.){\n        rate-=s*.5;\n        p2=p1;\n      }else{\n        rate+=s*.5;\n        p0=p1;\n      }\n    //}\n    s*=.5;\n    p1=getQuadraticCurveTo(a,b,c,rate);\n  }\n  //return vec2(length(p-p1)/w,rate);\n  return vec2(distLine(p,p0,p2,w),rate);\n}\nvoid main()\n{\n  \n  vec4 color=vec4(0.);\n  vec2 uv=vTextureCoord*uSize;\n  \n  vec2 uv0=quadraticCurve(uv,uStartPos,uControlPos,uEndPos,5.);\n  color+=uv0.y;\n  color=mix(color,vec4(1.,0.,0.,1.),smoothstep(1.,0.,uv0.x));\n  \n  vec2 p=getQuadraticCurveTo(uStartPos,uControlPos,uEndPos,fract(uTime*.1));\n  color+=ball(uv-p,5.);\n  \n  vec2 t=getQuadraticCurveToTangent(uStartPos,uControlPos,uEndPos,fract(uTime*.1));\n  t=vec2(-t.y,t.x);\n  color+=smoothstep(1.,0.,distLine(uv,p,p+10.*normalize(t),1.));\n  \n  gl_FragColor=color;\n}\n\n"},77:function(e,t,n){"use strict";n.r(t);var r=n(0),u=n(1),a=n(5),o=n.n(a),i=n(50),f=n.n(i),c=function(e,t,n){var u=Object(r.f)(e,t,n);return{program:u,attribLocations:{vertexPosition:r.b.attribFloat(e,u,"aVertexPosition",2),textureCoord:r.b.attribFloat(e,u,"aTextureCoord",2)},uniformLocations:{flipY:r.i.uniform1f(e,u,"uFlipY"),size:r.i.uniform2fv(e,u,"uSize"),time:r.i.uniform1f(e,u,"uTime"),startPos:r.i.uniform2fv(e,u,"uStartPos"),controlPos:r.i.uniform2fv(e,u,"uControlPos"),endPos:r.i.uniform2fv(e,u,"uEndPos")}}},l=function(e){return Object.assign(Object(r.h)(e,c,o.a,f.a),{draw:function(t){e.drawElements(e.TRIANGLES,t,e.UNSIGNED_BYTE,0)}})};function v(e){var t=[[0,0],[1,0],[1,1],[0,1]].flat(),n=Object(r.a)(e,t,2),u=[[0,0],[1,0],[1,1],[0,1]].flat(),a=Object(r.a)(e,u,2),o=[[0,1,3],[1,2,3]].flat();return{positionBufferData:n,textureCoordinatesBufferData:a,indicesBufferData:Object(r.d)(e,o)}}!function(){var e=document.querySelector("#glcanvas"),t=e.getContext("webgl",{alpha:!1});if(!t)return void alert("無法初始化WebGL。您的瀏覽器或機器可能不支持它。");var n={quadraticCurveShader:l(t)},a={face:v(t),view:v(t)},o=[.5*t.canvas.width,.5*t.canvas.height];e.addEventListener("mousemove",(function(e){u.b.set(o,e.pageX,e.pageY)}));var i=[t.canvas.clientWidth,t.canvas.clientHeight],f={};var c=0;requestAnimationFrame((function e(u){var l=.001*(u-c);c=u,requestAnimationFrame(e),function(e,t,n,u,a){var o=a.now,i=(a.framebufferTextures,a.mPos,a.size),f=n.face,c=t.quadraticCurveShader;c.use(),c.attribSet({vertexPosition:f.positionBufferData.buffer,textureCoord:f.textureCoordinatesBufferData.buffer}),c.uniformSet({size:i,time:.001*o,flipY:-1,startPos:[300,400],controlPos:[400,300],endPos:[500,400]}),Object(r.j)(e),c.draw(f.indicesBufferData.length)}(t,n,a,0,{now:u,delta:l,mPos:o,framebufferTextures:f,size:i})}))}()}});