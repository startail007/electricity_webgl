!function(t){var n={};function e(r){if(n[r])return n[r].exports;var u=n[r]={i:r,l:!1,exports:{}};return t[r].call(u.exports,u,u.exports,e),u.l=!0,u.exports}e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var u in t)e.d(r,u,function(n){return t[n]}.bind(null,u));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=91)}({0:function(t,n,e){"use strict";e.d(n,"g",(function(){return r})),e.d(n,"a",(function(){return o})),e.d(n,"d",(function(){return a})),e.d(n,"h",(function(){return f})),e.d(n,"c",(function(){return v})),e.d(n,"b",(function(){return s})),e.d(n,"j",(function(){return d})),e.d(n,"i",(function(){return m})),e.d(n,"e",(function(){return b})),e.d(n,"f",(function(){return h})),e.d(n,"k",(function(){return g}));var r=function(t,n,e){var r=u(t,t.VERTEX_SHADER,n),o=u(t,t.FRAGMENT_SHADER,e),a=t.createProgram();return t.attachShader(a,r),t.attachShader(a,o),t.linkProgram(a),t.getProgramParameter(a,t.LINK_STATUS)?a:(alert("無法初始化著色器程序: "+t.getProgramInfoLog(a)),null)},u=function(t,n,e){var r=t.createShader(n);return t.shaderSource(r,e),t.compileShader(r),t.getShaderParameter(r,t.COMPILE_STATUS)?r:(alert("編譯著色器時發生錯誤: "+t.getShaderInfoLog(r)),t.deleteShader(r),null)},o=function(t,n,e){var r,u=arguments.length>3&&void 0!==arguments[3]?arguments[3]:Float32Array,o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:t.STATIC_DRAW,a=t.createBuffer(),i=0,f={buffer:a,get data(){return r},get length(){return r.length},set:function(n){r=new u(n),i=100*Math.ceil(r.length/e/100),t.bindBuffer(t.ARRAY_BUFFER,a),t.bufferData(t.ARRAY_BUFFER,i*e*4,o),t.bufferSubData(t.ARRAY_BUFFER,0,r)},add:function(n){var f=r.length,c=100*Math.floor(r.length/e/100);c>=i&&(i=c+100,t.bindBuffer(t.ARRAY_BUFFER,a),t.bufferData(t.ARRAY_BUFFER,i*e*4,o),t.bufferSubData(t.ARRAY_BUFFER,0,r));var l=new u(f+e);l.set(r),r=l,this.item(f/e,n)},item:function(n,o){var i=new u(o);r.set(i,n*e),t.bindBuffer(t.ARRAY_BUFFER,a),t.bufferSubData(t.ARRAY_BUFFER,n*e*4,i)},getItem:function(t){return Array.from(r.slice(t*e,(t+1)*e))}};return f.set(n),f},a=function(t,n){var e,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Uint8Array,u=arguments.length>3&&void 0!==arguments[3]?arguments[3]:t.STATIC_DRAW,o=t.createBuffer(),a=0,i=3,f={buffer:o,get data(){return e},get length(){return e.length},set:function(n){e=new r(n),a=100*Math.ceil(e.length/i/100),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,o),t.bufferData(t.ELEMENT_ARRAY_BUFFER,a*i*4,u),t.bufferSubData(t.ELEMENT_ARRAY_BUFFER,0,e)},add:function(n){var f=e.length,c=100*Math.floor(e.length/i/100);c>=a&&(a=c+100,t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,o),t.bufferData(t.ELEMENT_ARRAY_BUFFER,a*i*4,u),t.bufferSubData(t.ELEMENT_ARRAY_BUFFER,0,e));var l=new r(f+i);l.set(e),e=l,this.item(f/i,n)},item:function(n,u){var a=new r(u);e.set(a,n*i),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,o),t.bufferSubData(t.ELEMENT_ARRAY_BUFFER,n*i*4,a)},getItem:function(t){return Array.from(e.slice(t*i,(t+1)*i))}};return f.set(n),f},i=function(t){var n=t.createTexture();return t.bindTexture(t.TEXTURE_2D,n),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),n},f=function(t,n){var e=i(t),r=new Image;return r.onload=function(){e.width=r.width,e.height=r.height,t.bindTexture(t.TEXTURE_2D,e),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,r),t.bindTexture(t.TEXTURE_2D,null)},r.src=n,e},c=function(t,n,e,r){t.bindFramebuffer(t.FRAMEBUFFER,n),void 0!==e&&void 0!==r&&t.viewport(0,0,e,r)},l=function(t,n){var e=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];n?e?c(t,n.framebuffer,n.width,n.height):c(t,n.framebuffer):e?c(t,null,t.canvas.width,t.canvas.height):c(t,null)},v=function(t,n,e){var r={width:n||t.canvas.clientWidth,height:e||t.canvas.clientHeight},u=i(t);r.texture=u,t.texImage2D(t.TEXTURE_2D,0,t.RGBA,r.width,r.height,0,t.RGBA,t.UNSIGNED_BYTE,null);var o=t.createFramebuffer();return r.framebuffer=o,t.bindFramebuffer(t.FRAMEBUFFER,o),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,u,0),t.bindFramebuffer(t.FRAMEBUFFER,null),r},s={attribFloat:function(t,n,e,r){var u=t.getAttribLocation(n,e);return t.enableVertexAttribArray(u),function(n){t.bindBuffer(t.ARRAY_BUFFER,n),t.vertexAttribPointer(u,r,t.FLOAT,!1,0,0)}}},d={uniform1f:function(t,n,e){var r=t.getUniformLocation(n,e);return function(n){t.uniform1f(r,n)}},uniform2fv:function(t,n,e){var r=t.getUniformLocation(n,e);return function(n){t.uniform2fv(r,n)}},uniform3fv:function(t,n,e){var r=t.getUniformLocation(n,e);return function(n){t.uniform3fv(r,n)}},uniformTexture:function(t,n,e,r){var u=t.getUniformLocation(n,e);return function(n){t.activeTexture(t.TEXTURE0+r),t.bindTexture(t.TEXTURE_2D,n),t.uniform1i(u,r)}},uniform1i:function(t,n,e){var r=t.getUniformLocation(n,e);return function(n){t.uniform1i(r,n)}},uniformMatrix4fv:function(t,n,e){var r=t.getUniformLocation(n,e);return function(n){t.uniformMatrix4fv(r,!1,n)}}},m=function(t,n,e,r,u){var o=n(t,e,r);return{programInfo:o,use:function(){t.useProgram(o.program)},attribSet:function(t){for(var n in t)o.attribLocations[n]&&o.attribLocations[n](t[n])},uniformSet:function(t){for(var n in t)o.uniformLocations[n]&&o.uniformLocations[n](t[n])},elementSet:function(n){t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,n)}}},b=function(t){return[[t[0],t[1]],[t[2],t[1]],[t[2],t[3]],[t[0],t[3]]].flat()},h=function(t){return[[t[0],t[1]],[t[0],t[3]],[t[2],t[1]],[t[2],t[3]]].flat()},E=function(t){t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT)},g=function(t,n){var e=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];l(t,n,r),e&&E(t)}},1:function(t,n,e){"use strict";e.d(n,"b",(function(){return f})),e.d(n,"c",(function(){return c})),e.d(n,"a",(function(){return l})),e.d(n,"e",(function(){return b})),e.d(n,"d",(function(){return h}));var r=e(3),u=e.n(r),o=e(4),a=e.n(o),i=e(2),f=function(){function t(){u()(this,t)}return a()(t,null,[{key:"normalize",value:function(n){return t.length(n)?t.scale(n,1/t.length(n)):n}},{key:"rotate",value:function(t,n){var e=Math.cos(n),r=Math.sin(n);return[t[0]*e-t[1]*r,t[1]*e+t[0]*r]}},{key:"dot",value:function(t,n){return t[0]*n[0]+t[1]*n[1]}},{key:"cross",value:function(t,n){return t[0]*n[1]-t[1]*n[0]}},{key:"add",value:function(t,n){return[t[0]+n[0],t[1]+n[1]]}},{key:"sub",value:function(t,n){return[t[0]-n[0],t[1]-n[1]]}},{key:"projection",value:function(n,e){var r=t.dot(n,e)/t.dot(e,e);return[e[0]*r,e[1]*r]}},{key:"length",value:function(n){return Math.sqrt(t.dot(n,n))}},{key:"mul",value:function(t,n){return[t[0]*n[0],t[1]*n[1]]}},{key:"div",value:function(t,n){return[t[0]/n[0],t[1]/n[1]]}},{key:"scale",value:function(t,n){return[t[0]*n,t[1]*n]}},{key:"collisionCalc",value:function(n,e,r,u){return t.scale(t.add(t.scale(n,r-u),t.scale(e,2*u)),1/(r+u))}},{key:"getAngle",value:function(t){return Math.atan2(t[1],t[0])}},{key:"floor",value:function(t){return[Math.floor(t[0]),Math.floor(t[1])]}},{key:"fract",value:function(t){return[i.a.fract(t[0]),i.a.fract(t[1])]}},{key:"sin",value:function(t){return[Math.sin(t[0]),Math.sin(t[1])]}},{key:"cos",value:function(t){return[Math.cos(t[0]),Math.cos(t[1])]}},{key:"distance",value:function(n,e){return t.length(t.sub(e,n))}},{key:"mix",value:function(t,n,e){return[i.a.mix(t[0],n[0],e),i.a.mix(t[1],n[1],e)]}},{key:"abs",value:function(t){return[Math.abs(t[0]),Math.abs(t[1])]}}]),t}(),c=function(){function t(){u()(this,t)}return a()(t,null,[{key:"set",value:function(t,n,e){return t[0]=n,t[1]=e,t}},{key:"normalize",value:function(n){var e=f.length(n);return e&&t.scale(n,1/e),n}},{key:"add",value:function(t,n){return t[0]+=n[0],t[1]+=n[1],t}},{key:"sub",value:function(t,n){return t[0]-=n[0],t[1]-=n[1],t}},{key:"scale",value:function(t,n){return t[0]*=n,t[1]*=n,t}},{key:"rotate",value:function(t,n){var e=Math.cos(n),r=Math.sin(n),u=[t[0]*e-t[1]*r,t[1]*e+t[0]*r];return t[0]=u[0],t[1]=u[1],t}}]),t}(),l=function(){function t(){u()(this,t)}return a()(t,null,[{key:"doLineSegmentsIntersect",value:function(t,n,e,r){function u(t,n,e){var r=(n[1]-t[1])*(e[0]-n[0])-(n[0]-t[0])*(e[1]-n[1]);return 0===r?0:r>0?1:2}function o(t,n,e){return n[0]<=Math.max(t[0],e[0])&&n[0]>=Math.min(t[0],e[0])&&n[1]<=Math.max(t[1],e[1])&&n[1]>=Math.min(t[1],e[1])}var a=u(t,n,e),i=u(t,n,r),f=u(e,r,t),c=u(e,r,n);return a!==i&&f!==c||(!(0!==a||!o(t,e,n))||(!(0!==i||!o(t,r,n))||(!(0!==f||!o(e,t,r))||!(0!==c||!o(e,n,r)))))}},{key:"getLine",value:function(t,n){return{pos:t,dir:f.sub(n,t)}}},{key:"toLineDistance",value:function(t,n,e){var r=arguments.length>3&&void 0!==arguments[3]&&arguments[3],u=f.sub(e,n),o=u[1],a=-u[0],i=-n[0]*u[1]+u[0]*n[1],c=(t[0]*o+t[1]*a+i)/f.length(u);return r?c:Math.abs(c)}}]),t}(),v=function(t,n,e,r){var u=r*r;return[t[0]*(u-2*r+1)+2*n[0]*(1-r)*r+e[0]*u,t[1]*(u-2*r+1)+2*n[1]*(1-r)*r+e[1]*u]},s=function(t,n,e,r){return[2*r*(t[0]-2*n[0]+e[0])+2*(-t[0]+n[0]),2*r*(t[1]-2*n[1]+e[1])+2*(-t[1]+n[1])]},d=function(t,n,e,r,u){var o=u*u,a=u*u*u;return[t[0]*(3*o-a-3*u+1)+n[0]*(3*a-6*o+3*u)+e[0]*(-3*a+3*o)+r[0]*a,t[1]*(3*o-a-3*u+1)+n[1]*(3*a-6*o+3*u)+e[1]*(-3*a+3*o)+r[1]*a]},m=function(t,n,e,r,u){var o=u*u;return[-3*t[0]+3*n[0]+2*u*(3*t[0]-6*n[0]+3*e[0])+3*o*(-t[0]+3*n[0]-3*e[0]+r[0]),-3*t[1]+3*n[1]+2*u*(3*t[1]-6*n[1]+3*e[1])+3*o*(-t[1]+3*n[1]-3*e[1]+r[1])]},b=function(t,n,e,r){for(var u=[],o=[],a=null,i=0;i<r;i++){var c=i/(r-1),l=v(t,n,e,c),d=f.normalize(s(t,n,e,c));u.push({p:l,t:d,n:[-d[1],d[0]]}),a&&o.push(f.distance(l,a)),a=l}var m=o.reduce((function(t,n){return t+n}));return{points:u,section:o,length:m}},h=function(t,n,e,r,u){for(var o=[],a=[],i=null,c=0;c<u;c++){var l=c/(u-1),v=d(t,n,e,r,l),s=f.normalize(m(t,n,e,r,l));o.push({p:v,t:s,n:[-s[1],s[0]]}),i&&a.push(f.distance(v,i)),i=v}var b=a.reduce((function(t,n){return t+n}));return{points:o,section:a,length:b}}},2:function(t,n,e){"use strict";e.d(n,"a",(function(){return i}));var r=e(3),u=e.n(r),o=e(4),a=e.n(o),i=function(){function t(){u()(this,t)}return a()(t,null,[{key:"mix",value:function(t,n,e){return t*(1-e)+n*e}},{key:"fract",value:function(t){return(t%=1)<0?t+1:t}},{key:"inverseMix",value:function(t,n,e){return(e-t)/(n-t)}},{key:"clamp",value:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;return t<=n?n:t>=e?e:t}},{key:"smoothstep",value:function(t,n,e){return(e=clamp(inverseMix(t,n,e)))*e*(3-2*e)}}]),t}()},3:function(t,n){t.exports=function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}},4:function(t,n){function e(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}t.exports=function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}},56:function(t,n){t.exports="precision mediump float;\nvarying vec2 vTextureCoord;\nuniform lowp vec2 uSize;\nuniform float uTime;\nuniform vec2 uStartPos;\nuniform vec2 uControlPos;\nuniform vec2 uEndPos;\nconst float pi=3.14159265359;\n\nfloat distLine(vec2 p,vec2 a,vec2 b,float w){\n  vec2 pa=p-a;\n  vec2 ba=b-a;\n  float t=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);\n  return length(pa-ba*t)/w;\n}\nfloat ball(vec2 f,float r){\n  return smoothstep(1.,.99,length(f)/r);\n}\nfloat cross(vec2 v0,vec2 v1){\n  return v0.x*v1.y-v0.y*v1.x;\n}\nvec2 getQuadraticCurveTo(vec2 p0,vec2 p1,vec2 p2,float t){\n  return p0*(1.-t)*(1.-t)+p1*2.*(1.-t)*t+p2*t*t;\n}\nvec2 getQuadraticCurveToTangent(vec2 p0,vec2 p1,vec2 p2,float t){\n  return 2.*t*(p0-p1*2.+p2)+2.*(-p0+p1);\n}\n/*float distLine0(vec2 p,vec2 a,vec2 b){\n  vec2 pa=p-a;\n  vec2 ba=b-a;\n  float t=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);\n  return length(pa-ba*t);\n}*/\nvec2 quadraticCurve(vec2 p,vec2 a,vec2 b,vec2 c,float w){\n  float s=.5;\n  float rate=.5;\n  const int N=8;\n  vec2 p0=getQuadraticCurveTo(a,b,c,0.);\n  vec2 p2=getQuadraticCurveTo(a,b,c,1.);\n  vec2 p1=getQuadraticCurveTo(a,b,c,rate);\n  for(int i=0;i<N;i++){\n      vec2 t=getQuadraticCurveToTangent(a,b,c,rate);\n      t=vec2(-t.y,t.x);\n      if(cross(p-p1,t)<0.){\n        rate-=s*.5;\n        p2=p1;\n      }else{\n        rate+=s*.5;\n        p0=p1;\n      }\n    s*=.5;\n    p1=getQuadraticCurveTo(a,b,c,rate);\n  }\n  return vec2(distLine(p,p0,p2,w),rate);\n}\nvoid main()\n{\n  \n  vec4 color=vec4(0.);\n  vec2 uv=vTextureCoord*uSize;\n  \n  vec2 uv0=quadraticCurve(uv,uStartPos,uControlPos,uEndPos,5.);\n  color+=uv0.y;\n  color=mix(color,vec4(1.,0.,0.,1.),smoothstep(1.,0.,uv0.x));\n  \n  vec2 p=getQuadraticCurveTo(uStartPos,uControlPos,uEndPos,fract(uTime*.1));\n  color+=ball(uv-p,5.);\n  \n  vec2 t=getQuadraticCurveToTangent(uStartPos,uControlPos,uEndPos,fract(uTime*.1));\n  t=vec2(-t.y,t.x);\n  color+=smoothstep(1.,0.,distLine(uv,p,p+10.*normalize(t),1.));\n\n\n  // color += vec4(vec3(smoothstep(1.,0.,distLine(uv,uStartPos,uControlPos,50.0))),1.0);\n  // float a0 = smoothstep(1.,0.,length(uv-uStartPos)*0.005);\n  // float a1 = smoothstep(1.,0.,length(uv-uControlPos)*0.005);\n  // float a2 = smoothstep(1.,0.,length(uv-uEndPos)*0.005);\n  // color+=vec4(vec3(max(max(a0,a1),a2)),1.0);\n  \n  gl_FragColor=color;\n}\n\n"},6:function(t,n){t.exports="attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nvarying highp vec2 vTextureCoord;\nuniform float uFlipY;\nvoid main(void){\n  vTextureCoord=aTextureCoord;\n  gl_Position=vec4((2.*aVertexPosition+vec2(-1.,-1.))*vec2(1.,uFlipY),0.,1.);\n}"},91:function(t,n,e){"use strict";e.r(n);var r=e(0),u=e(1),o=e(6),a=e.n(o),i=e(56),f=e.n(i),c=function(t,n,e){var u=Object(r.g)(t,n,e);return{program:u,attribLocations:{vertexPosition:r.b.attribFloat(t,u,"aVertexPosition",2),textureCoord:r.b.attribFloat(t,u,"aTextureCoord",2)},uniformLocations:{flipY:r.j.uniform1f(t,u,"uFlipY"),size:r.j.uniform2fv(t,u,"uSize"),time:r.j.uniform1f(t,u,"uTime"),startPos:r.j.uniform2fv(t,u,"uStartPos"),controlPos:r.j.uniform2fv(t,u,"uControlPos"),endPos:r.j.uniform2fv(t,u,"uEndPos")}}},l=function(t){return Object.assign(Object(r.i)(t,c,a.a,f.a),{draw:function(n){t.drawElements(t.TRIANGLES,n,t.UNSIGNED_BYTE,0)}})};function v(t){var n=[[0,0],[1,0],[1,1],[0,1]].flat(),e=Object(r.a)(t,n,2),u=[[0,0],[1,0],[1,1],[0,1]].flat(),o=Object(r.a)(t,u,2),a=[[0,1,3],[1,2,3]].flat();return{positionBufferData:e,textureCoordinatesBufferData:o,indicesBufferData:Object(r.d)(t,a)}}!function(){var t=document.querySelector("#glcanvas"),n=t.getContext("webgl",{alpha:!1});if(!n)return void alert("無法初始化WebGL。您的瀏覽器或機器可能不支持它。");var e={quadraticCurveShader:l(n)},o={face:v(n),view:v(n)},a=[.5*n.canvas.width,.5*n.canvas.height];t.addEventListener("mousemove",(function(t){u.c.set(a,t.pageX,t.pageY)}));var i=[n.canvas.clientWidth,n.canvas.clientHeight],f={};var c=0;requestAnimationFrame((function t(u){var l=.001*(u-c);c=u,requestAnimationFrame(t),function(t,n,e,u,o){var a=o.now,i=(o.framebufferTextures,o.mPos,o.size),f=e.face,c=n.quadraticCurveShader;c.use(),c.attribSet({vertexPosition:f.positionBufferData.buffer,textureCoord:f.textureCoordinatesBufferData.buffer}),c.uniformSet({size:i,time:.001*a,flipY:-1,startPos:[300,400],controlPos:[400,300],endPos:[500,400]}),Object(r.k)(t),c.draw(f.indicesBufferData.length)}(n,e,o,0,{now:u,delta:l,mPos:a,framebufferTextures:f,size:i})}))}()}});