!function(t){var n={};function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)e.d(r,o,function(n){return t[n]}.bind(null,o));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=97)}({0:function(t,n,e){"use strict";e.d(n,"g",(function(){return r})),e.d(n,"a",(function(){return u})),e.d(n,"d",(function(){return a})),e.d(n,"h",(function(){return f})),e.d(n,"c",(function(){return v})),e.d(n,"b",(function(){return s})),e.d(n,"j",(function(){return d})),e.d(n,"i",(function(){return m})),e.d(n,"e",(function(){return b})),e.d(n,"f",(function(){return h})),e.d(n,"k",(function(){return E}));var r=function(t,n,e){var r=o(t,t.VERTEX_SHADER,n),u=o(t,t.FRAGMENT_SHADER,e),a=t.createProgram();return t.attachShader(a,r),t.attachShader(a,u),t.linkProgram(a),t.getProgramParameter(a,t.LINK_STATUS)?a:(alert("無法初始化著色器程序: "+t.getProgramInfoLog(a)),null)},o=function(t,n,e){var r=t.createShader(n);return t.shaderSource(r,e),t.compileShader(r),t.getShaderParameter(r,t.COMPILE_STATUS)?r:(alert("編譯著色器時發生錯誤: "+t.getShaderInfoLog(r)),t.deleteShader(r),null)},u=function(t,n,e){var r,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:Float32Array,u=arguments.length>4&&void 0!==arguments[4]?arguments[4]:t.STATIC_DRAW,a=t.createBuffer(),i=0,f={buffer:a,get data(){return r},get length(){return r.length},set:function(n){r=new o(n),i=100*Math.ceil(r.length/e/100),t.bindBuffer(t.ARRAY_BUFFER,a),t.bufferData(t.ARRAY_BUFFER,i*e*4,u),t.bufferSubData(t.ARRAY_BUFFER,0,r)},add:function(n){var f=r.length,c=100*Math.floor(r.length/e/100);c>=i&&(i=c+100,t.bindBuffer(t.ARRAY_BUFFER,a),t.bufferData(t.ARRAY_BUFFER,i*e*4,u),t.bufferSubData(t.ARRAY_BUFFER,0,r));var l=new o(f+e);l.set(r),r=l,this.item(f/e,n)},item:function(n,u){var i=new o(u);r.set(i,n*e),t.bindBuffer(t.ARRAY_BUFFER,a),t.bufferSubData(t.ARRAY_BUFFER,n*e*4,i)},getItem:function(t){return Array.from(r.slice(t*e,(t+1)*e))}};return f.set(n),f},a=function(t,n){var e,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Uint8Array,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:t.STATIC_DRAW,u=t.createBuffer(),a=0,i=3,f={buffer:u,get data(){return e},get length(){return e.length},set:function(n){e=new r(n),a=100*Math.ceil(e.length/i/100),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,u),t.bufferData(t.ELEMENT_ARRAY_BUFFER,a*i*4,o),t.bufferSubData(t.ELEMENT_ARRAY_BUFFER,0,e)},add:function(n){var f=e.length,c=100*Math.floor(e.length/i/100);c>=a&&(a=c+100,t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,u),t.bufferData(t.ELEMENT_ARRAY_BUFFER,a*i*4,o),t.bufferSubData(t.ELEMENT_ARRAY_BUFFER,0,e));var l=new r(f+i);l.set(e),e=l,this.item(f/i,n)},item:function(n,o){var a=new r(o);e.set(a,n*i),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,u),t.bufferSubData(t.ELEMENT_ARRAY_BUFFER,n*i*4,a)},getItem:function(t){return Array.from(e.slice(t*i,(t+1)*i))}};return f.set(n),f},i=function(t){var n=t.createTexture();return t.bindTexture(t.TEXTURE_2D,n),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),n},f=function(t,n){var e=i(t),r=new Image;return r.onload=function(){e.width=r.width,e.height=r.height,t.bindTexture(t.TEXTURE_2D,e),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,r),t.bindTexture(t.TEXTURE_2D,null)},r.src=n,e},c=function(t,n,e,r){t.bindFramebuffer(t.FRAMEBUFFER,n),void 0!==e&&void 0!==r&&t.viewport(0,0,e,r)},l=function(t,n){var e=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];n?e?c(t,n.framebuffer,n.width,n.height):c(t,n.framebuffer):e?c(t,null,t.canvas.width,t.canvas.height):c(t,null)},v=function(t,n,e){var r={width:n||t.canvas.clientWidth,height:e||t.canvas.clientHeight},o=i(t);r.texture=o,t.texImage2D(t.TEXTURE_2D,0,t.RGBA,r.width,r.height,0,t.RGBA,t.UNSIGNED_BYTE,null);var u=t.createFramebuffer();return r.framebuffer=u,t.bindFramebuffer(t.FRAMEBUFFER,u),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,o,0),t.bindFramebuffer(t.FRAMEBUFFER,null),r},s={attribFloat:function(t,n,e,r){var o=t.getAttribLocation(n,e);return t.enableVertexAttribArray(o),function(n){t.bindBuffer(t.ARRAY_BUFFER,n),t.vertexAttribPointer(o,r,t.FLOAT,!1,0,0)}}},d={uniform1f:function(t,n,e){var r=t.getUniformLocation(n,e);return function(n){t.uniform1f(r,n)}},uniform1fv:function(t,n,e){var r=t.getUniformLocation(n,e);return function(n){t.uniform1fv(r,n)}},uniform2fv:function(t,n,e){var r=t.getUniformLocation(n,e);return function(n){t.uniform2fv(r,n)}},uniform3fv:function(t,n,e){var r=t.getUniformLocation(n,e);return function(n){t.uniform3fv(r,n)}},uniformTexture:function(t,n,e,r){var o=t.getUniformLocation(n,e);return function(n){t.activeTexture(t.TEXTURE0+r),t.bindTexture(t.TEXTURE_2D,n),t.uniform1i(o,r)}},uniform1i:function(t,n,e){var r=t.getUniformLocation(n,e);return function(n){t.uniform1i(r,n)}},uniformMatrix4fv:function(t,n,e){var r=t.getUniformLocation(n,e);return function(n){t.uniformMatrix4fv(r,!1,n)}}},m=function(t,n,e,r,o){var u=n(t,e,r);return{programInfo:u,use:function(){t.useProgram(u.program)},attribSet:function(t){for(var n in t)u.attribLocations[n]&&u.attribLocations[n](t[n])},uniformSet:function(t){for(var n in t)u.uniformLocations[n]&&u.uniformLocations[n](t[n])},elementSet:function(n){t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,n)}}},b=function(t){return[[t[0],t[1]],[t[2],t[1]],[t[2],t[3]],[t[0],t[3]]].flat()},h=function(t){return[[t[0],t[1]],[t[0],t[3]],[t[2],t[1]],[t[2],t[3]]].flat()},p=function(t){t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT)},E=function(t,n){var e=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];l(t,n,r),e&&p(t)}},1:function(t,n,e){"use strict";e.d(n,"b",(function(){return l})),e.d(n,"c",(function(){return v})),e.d(n,"a",(function(){return s})),e.d(n,"e",(function(){return p})),e.d(n,"d",(function(){return E}));var r=e(2),o=e.n(r),u=e(4),a=e.n(u),i=e(5),f=e.n(i),c=e(3),l=function(){function t(){a()(this,t)}return f()(t,null,[{key:"zero",value:function(){return[0,0]}},{key:"clone",value:function(t){return o()(t)}},{key:"normalize",value:function(n){var e=t.length(n);return e?t.scale(n,1/e):n}},{key:"rotate",value:function(t,n){var e=Math.cos(n),r=Math.sin(n);return[t[0]*e-t[1]*r,t[1]*e+t[0]*r]}},{key:"dot",value:function(t,n){return t[0]*n[0]+t[1]*n[1]}},{key:"cross",value:function(t,n){return t[0]*n[1]-t[1]*n[0]}},{key:"add",value:function(t,n){return[t[0]+n[0],t[1]+n[1]]}},{key:"sub",value:function(t,n){return[t[0]-n[0],t[1]-n[1]]}},{key:"projection",value:function(n,e){var r=t.dot(n,e)/t.dot(e,e);return[e[0]*r,e[1]*r]}},{key:"length",value:function(n){return Math.sqrt(t.dot(n,n))}},{key:"mul",value:function(t,n){return[t[0]*n[0],t[1]*n[1]]}},{key:"div",value:function(t,n){return[t[0]/n[0],t[1]/n[1]]}},{key:"scale",value:function(t,n){return[t[0]*n,t[1]*n]}},{key:"collisionCalc",value:function(n,e,r,o){return t.scale(t.add(t.scale(n,r-o),t.scale(e,2*o)),1/(r+o))}},{key:"getAngle",value:function(t){return Math.atan2(t[1],t[0])}},{key:"floor",value:function(t){return[Math.floor(t[0]),Math.floor(t[1])]}},{key:"fract",value:function(t){return[c.a.fract(t[0]),c.a.fract(t[1])]}},{key:"sin",value:function(t){return[Math.sin(t[0]),Math.sin(t[1])]}},{key:"cos",value:function(t){return[Math.cos(t[0]),Math.cos(t[1])]}},{key:"distance",value:function(n,e){return t.length(t.sub(e,n))}},{key:"mix",value:function(t,n,e){return[c.a.mix(t[0],n[0],e),c.a.mix(t[1],n[1],e)]}},{key:"abs",value:function(t){return[Math.abs(t[0]),Math.abs(t[1])]}}]),t}(),v=function(){function t(){a()(this,t)}return f()(t,null,[{key:"set",value:function(t,n,e){return t[0]=n,t[1]=e,t}},{key:"normalize",value:function(n){var e=l.length(n);return e&&t.scale(n,1/e),n}},{key:"add",value:function(t,n){return t[0]+=n[0],t[1]+=n[1],t}},{key:"sub",value:function(t,n){return t[0]-=n[0],t[1]-=n[1],t}},{key:"scale",value:function(t,n){return t[0]*=n,t[1]*=n,t}},{key:"rotate",value:function(t,n){var e=Math.cos(n),r=Math.sin(n),o=[t[0]*e-t[1]*r,t[1]*e+t[0]*r];return t[0]=o[0],t[1]=o[1],t}}]),t}(),s=function(){function t(){a()(this,t)}return f()(t,null,[{key:"doLineSegmentsIntersect",value:function(t,n,e,r){function o(t,n,e){var r=(n[1]-t[1])*(e[0]-n[0])-(n[0]-t[0])*(e[1]-n[1]);return 0===r?0:r>0?1:2}function u(t,n,e){return n[0]<=Math.max(t[0],e[0])&&n[0]>=Math.min(t[0],e[0])&&n[1]<=Math.max(t[1],e[1])&&n[1]>=Math.min(t[1],e[1])}var a=o(t,n,e),i=o(t,n,r),f=o(e,r,t),c=o(e,r,n);return a!==i&&f!==c||(!(0!==a||!u(t,e,n))||(!(0!==i||!u(t,r,n))||(!(0!==f||!u(e,t,r))||!(0!==c||!u(e,n,r)))))}},{key:"getLine",value:function(t,n){return{pos:t,dir:l.sub(n,t)}}},{key:"toLineDistance",value:function(t,n,e){var r=arguments.length>3&&void 0!==arguments[3]&&arguments[3],o=l.sub(e,n),u=o[1],a=-o[0],i=-n[0]*o[1]+o[0]*n[1],f=(t[0]*u+t[1]*a+i)/l.length(o);return r?f:Math.abs(f)}}]),t}(),d=function(t,n,e,r){var o=r*r;return[t[0]*(o-2*r+1)+2*n[0]*(1-r)*r+e[0]*o,t[1]*(o-2*r+1)+2*n[1]*(1-r)*r+e[1]*o]},m=function(t,n,e,r){return[2*r*(t[0]-2*n[0]+e[0])+2*(-t[0]+n[0]),2*r*(t[1]-2*n[1]+e[1])+2*(-t[1]+n[1])]},b=function(t,n,e,r,o){var u=o*o,a=o*o*o;return[t[0]*(3*u-a-3*o+1)+n[0]*(3*a-6*u+3*o)+e[0]*(-3*a+3*u)+r[0]*a,t[1]*(3*u-a-3*o+1)+n[1]*(3*a-6*u+3*o)+e[1]*(-3*a+3*u)+r[1]*a]},h=function(t,n,e,r,o){var u=o*o;return[-3*t[0]+3*n[0]+2*o*(3*t[0]-6*n[0]+3*e[0])+3*u*(-t[0]+3*n[0]-3*e[0]+r[0]),-3*t[1]+3*n[1]+2*o*(3*t[1]-6*n[1]+3*e[1])+3*u*(-t[1]+3*n[1]-3*e[1]+r[1])]},p=function(t,n,e,r){for(var o=[],u=[],a=null,i=0;i<r;i++){var f=i/(r-1),c=d(t,n,e,f),v=l.normalize(m(t,n,e,f));o.push({p:c,t:v,n:[-v[1],v[0]]}),a&&u.push(l.distance(c,a)),a=c}var s=u.reduce((function(t,n){return t+n}));return{points:o,section:u,length:s}},E=function(t,n,e,r,o){for(var u=[],a=[],i=null,f=0;f<o;f++){var c=f/(o-1),v=b(t,n,e,r,c),s=l.normalize(h(t,n,e,r,c));u.push({p:v,t:s,n:[-s[1],s[0]]}),i&&a.push(l.distance(v,i)),i=v}var d=a.reduce((function(t,n){return t+n}));return{points:u,section:a,length:d}}},11:function(t,n,e){var r=e(8);t.exports=function(t,n){if(t){if("string"==typeof t)return r(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?r(t,n):void 0}}},12:function(t,n,e){var r=e(8);t.exports=function(t){if(Array.isArray(t))return r(t)}},13:function(t,n){t.exports=function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}},14:function(t,n){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},2:function(t,n,e){var r=e(12),o=e(13),u=e(11),a=e(14);t.exports=function(t){return r(t)||o(t)||u(t)||a()}},3:function(t,n,e){"use strict";e.d(n,"a",(function(){return i}));var r=e(4),o=e.n(r),u=e(5),a=e.n(u),i=function(){function t(){o()(this,t)}return a()(t,null,[{key:"mix",value:function(t,n,e){return t*(1-e)+n*e}},{key:"fract",value:function(t){return(t%=1)<0?t+1:t}},{key:"inverseMix",value:function(t,n,e){return(e-t)/(n-t)}},{key:"clamp",value:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;return t<=n?n:t>=e?e:t}},{key:"smoothstep",value:function(t,n,e){return(e=clamp(inverseMix(t,n,e)))*e*(3-2*e)}}]),t}()},4:function(t,n){t.exports=function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}},5:function(t,n){function e(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}t.exports=function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}},56:function(t,n){t.exports="precision mediump float;\nvarying vec2 vTextureCoord;\nuniform lowp vec2 uSize;\nuniform float uTime;\nuniform vec2 uStartPos;\nuniform vec2 uControlPos;\nuniform vec2 uEndPos;\nconst float pi=3.14159265359;\n\nfloat distLine(vec2 p,vec2 a,vec2 b,float w){\n  vec2 pa=p-a;\n  vec2 ba=b-a;\n  float t=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);\n  return length(pa-ba*t)/w;\n}\nfloat ball(vec2 f,float r){\n  return smoothstep(1.,.99,length(f)/r);\n}\nfloat cross(vec2 v0,vec2 v1){\n  return v0.x*v1.y-v0.y*v1.x;\n}\nvec2 getQuadraticCurveTo(vec2 p0,vec2 p1,vec2 p2,float t){\n  return p0*(1.-t)*(1.-t)+p1*2.*(1.-t)*t+p2*t*t;\n}\nvec2 getQuadraticCurveToTangent(vec2 p0,vec2 p1,vec2 p2,float t){\n  return 2.*t*(p0-p1*2.+p2)+2.*(-p0+p1);\n}\n/*float distLine0(vec2 p,vec2 a,vec2 b){\n  vec2 pa=p-a;\n  vec2 ba=b-a;\n  float t=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);\n  return length(pa-ba*t);\n}*/\nvec2 quadraticCurve(vec2 p,vec2 a,vec2 b,vec2 c,float w){\n  float s=.5;\n  float rate=.5;\n  const int N=8;\n  vec2 p0=getQuadraticCurveTo(a,b,c,0.);\n  vec2 p2=getQuadraticCurveTo(a,b,c,1.);\n  vec2 p1=getQuadraticCurveTo(a,b,c,rate);\n  for(int i=0;i<N;i++){\n      vec2 t=getQuadraticCurveToTangent(a,b,c,rate);\n      t=vec2(-t.y,t.x);\n      if(cross(p-p1,t)<0.){\n        rate-=s*.5;\n        p2=p1;\n      }else{\n        rate+=s*.5;\n        p0=p1;\n      }\n    s*=.5;\n    p1=getQuadraticCurveTo(a,b,c,rate);\n  }\n  return vec2(distLine(p,p0,p2,w),rate);\n}\nvoid main()\n{\n  \n  vec4 color=vec4(0.);\n  vec2 uv=vTextureCoord*uSize;\n  \n  vec2 uv0=quadraticCurve(uv,uStartPos,uControlPos,uEndPos,5.);\n  color+=uv0.y;\n  color=mix(color,vec4(1.,0.,0.,1.),smoothstep(1.,0.,uv0.x));\n  \n  vec2 p=getQuadraticCurveTo(uStartPos,uControlPos,uEndPos,fract(uTime*.1));\n  color+=ball(uv-p,5.);\n  \n  vec2 t=getQuadraticCurveToTangent(uStartPos,uControlPos,uEndPos,fract(uTime*.1));\n  t=vec2(-t.y,t.x);\n  color+=smoothstep(1.,0.,distLine(uv,p,p+10.*normalize(t),1.));\n\n\n  // color += vec4(vec3(smoothstep(1.,0.,distLine(uv,uStartPos,uControlPos,50.0))),1.0);\n  // float a0 = smoothstep(1.,0.,length(uv-uStartPos)*0.005);\n  // float a1 = smoothstep(1.,0.,length(uv-uControlPos)*0.005);\n  // float a2 = smoothstep(1.,0.,length(uv-uEndPos)*0.005);\n  // color+=vec4(vec3(max(max(a0,a1),a2)),1.0);\n  \n  gl_FragColor=color;\n}\n\n"},6:function(t,n){t.exports="attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nvarying highp vec2 vTextureCoord;\nuniform float uFlipY;\nvoid main(void){\n  vTextureCoord=aTextureCoord;\n  gl_Position=vec4((2.*aVertexPosition+vec2(-1.,-1.))*vec2(1.,uFlipY),0.,1.);\n}"},8:function(t,n){t.exports=function(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}},97:function(t,n,e){"use strict";e.r(n);var r=e(0),o=e(1),u=e(6),a=e.n(u),i=e(56),f=e.n(i),c=function(t,n,e){var o=Object(r.g)(t,n,e);return{program:o,attribLocations:{vertexPosition:r.b.attribFloat(t,o,"aVertexPosition",2),textureCoord:r.b.attribFloat(t,o,"aTextureCoord",2)},uniformLocations:{flipY:r.j.uniform1f(t,o,"uFlipY"),size:r.j.uniform2fv(t,o,"uSize"),time:r.j.uniform1f(t,o,"uTime"),startPos:r.j.uniform2fv(t,o,"uStartPos"),controlPos:r.j.uniform2fv(t,o,"uControlPos"),endPos:r.j.uniform2fv(t,o,"uEndPos")}}},l=function(t){return Object.assign(Object(r.i)(t,c,a.a,f.a),{draw:function(n){t.drawElements(t.TRIANGLES,n,t.UNSIGNED_BYTE,0)}})};function v(t){var n=[[0,0],[1,0],[1,1],[0,1]].flat(),e=Object(r.a)(t,n,2),o=[[0,0],[1,0],[1,1],[0,1]].flat(),u=Object(r.a)(t,o,2),a=[[0,1,3],[1,2,3]].flat();return{positionBufferData:e,textureCoordinatesBufferData:u,indicesBufferData:Object(r.d)(t,a)}}!function(){var t=document.querySelector("#glcanvas"),n=t.getContext("webgl",{alpha:!1});if(!n)return void alert("無法初始化WebGL。您的瀏覽器或機器可能不支持它。");var e={quadraticCurveShader:l(n)},u={face:v(n),view:v(n)},a=[.5*n.canvas.width,.5*n.canvas.height];t.addEventListener("mousemove",(function(t){o.c.set(a,t.pageX,t.pageY)}));var i=[n.canvas.clientWidth,n.canvas.clientHeight],f={};var c=0;requestAnimationFrame((function t(o){var l=.001*(o-c);c=o,requestAnimationFrame(t),function(t,n,e,o,u){var a=u.now,i=(u.framebufferTextures,u.mPos,u.size),f=e.face,c=n.quadraticCurveShader;c.use(),c.attribSet({vertexPosition:f.positionBufferData.buffer,textureCoord:f.textureCoordinatesBufferData.buffer}),c.uniformSet({size:i,time:.001*a,flipY:-1,startPos:[300,400],controlPos:[400,300],endPos:[500,400]}),Object(r.k)(t),c.draw(f.indicesBufferData.length)}(n,e,u,0,{now:o,delta:l,mPos:a,framebufferTextures:f,size:i})}))}()}});