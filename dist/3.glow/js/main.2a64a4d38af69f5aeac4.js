!function(r){var e={};function t(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return r[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=r,t.c=e,t.d=function(r,e,n){t.o(r,e)||Object.defineProperty(r,e,{enumerable:!0,get:n})},t.r=function(r){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(r,"__esModule",{value:!0})},t.t=function(r,e){if(1&e&&(r=t(r)),8&e)return r;if(4&e&&"object"==typeof r&&r&&r.__esModule)return r;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var o in r)t.d(n,o,function(e){return r[e]}.bind(null,o));return n},t.n=function(r){var e=r&&r.__esModule?function(){return r.default}:function(){return r};return t.d(e,"a",e),e},t.o=function(r,e){return Object.prototype.hasOwnProperty.call(r,e)},t.p="",t(t.s=56)}({0:function(r,e,t){"use strict";t.d(e,"h",(function(){return m})),t.d(e,"f",(function(){return n})),t.d(e,"c",(function(){return s})),t.d(e,"a",(function(){return i})),t.d(e,"d",(function(){return a})),t.d(e,"g",(function(){return f})),t.d(e,"b",(function(){return d})),t.d(e,"i",(function(){return v})),t.d(e,"e",(function(){return b})),t.d(e,"j",(function(){return p}));var n=function(r,e,t){var n=o(r,r.VERTEX_SHADER,e),i=o(r,r.FRAGMENT_SHADER,t),a=r.createProgram();return r.attachShader(a,n),r.attachShader(a,i),r.linkProgram(a),r.getProgramParameter(a,r.LINK_STATUS)?a:(alert("無法初始化著色器程序: "+r.getProgramInfoLog(a)),null)},o=function(r,e,t){var n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),r.getShaderParameter(n,r.COMPILE_STATUS)?n:(alert("編譯著色器時發生錯誤: "+r.getShaderInfoLog(n)),r.deleteShader(n),null)},i=function(r,e,t){var n,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:Float32Array,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:r.STATIC_DRAW,a=r.createBuffer(),u=0,f={buffer:a,get data(){return n},get length(){return n.length},set:function(e){n=new o(e),u=100*Math.ceil(n.length/t/100),r.bindBuffer(r.ARRAY_BUFFER,a),r.bufferData(r.ARRAY_BUFFER,u*t*4,i),r.bufferSubData(r.ARRAY_BUFFER,0,n)},add:function(e){var f=n.length,l=100*Math.floor(n.length/t/100);l>=u&&(u=l+100,r.bindBuffer(r.ARRAY_BUFFER,a),r.bufferData(r.ARRAY_BUFFER,u*t*4,i),r.bufferSubData(r.ARRAY_BUFFER,0,n));var c=new o(f+t);c.set(n),n=c,this.item(f/t,e)},item:function(e,i){var u=new o(i);n.set(u,e*t),r.bindBuffer(r.ARRAY_BUFFER,a),r.bufferSubData(r.ARRAY_BUFFER,e*t*4,u)},getItem:function(r){return Array.from(n.slice(r*t,(r+1)*t))}};return f.set(e),f},a=function(r,e){var t,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Uint8Array,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:r.STATIC_DRAW,i=r.createBuffer(),a=0,u=3,f={buffer:i,get data(){return t},get length(){return t.length},set:function(e){t=new n(e),a=100*Math.ceil(t.length/u/100),r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,i),r.bufferData(r.ELEMENT_ARRAY_BUFFER,a*u*4,o),r.bufferSubData(r.ELEMENT_ARRAY_BUFFER,0,t)},add:function(e){var f=t.length,l=100*Math.floor(t.length/u/100);l>=a&&(a=l+100,r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,i),r.bufferData(r.ELEMENT_ARRAY_BUFFER,a*u*4,o),r.bufferSubData(r.ELEMENT_ARRAY_BUFFER,0,t));var c=new n(f+u);c.set(t),t=c,this.item(f/u,e)},item:function(e,o){var a=new n(o);t.set(a,e*u),r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,i),r.bufferSubData(r.ELEMENT_ARRAY_BUFFER,e*u*4,a)},getItem:function(r){return Array.from(t.slice(r*u,(r+1)*u))}};return f.set(e),f},u=function(r){var e=r.createTexture();return r.bindTexture(r.TEXTURE_2D,e),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.LINEAR),e},f=function(r,e){var t=u(r),n=new Image;return n.onload=function(){t.width=n.width,t.height=n.height,r.bindTexture(r.TEXTURE_2D,t),r.texImage2D(r.TEXTURE_2D,0,r.RGBA,r.RGBA,r.UNSIGNED_BYTE,n)},n.src=e,t},l=function(r,e,t,n){r.bindFramebuffer(r.FRAMEBUFFER,e),void 0!==t&&void 0!==n&&r.viewport(0,0,t,n)},c=function(r,e){var t=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];e?t?l(r,e.framebuffer,e.width,e.height):l(r,e.framebuffer):t?l(r,null,r.canvas.width,r.canvas.height):l(r,null)},s=function(r,e,t){var n={width:e||r.canvas.clientWidth,height:t||r.canvas.clientHeight},o=u(r);n.texture=o,r.texImage2D(r.TEXTURE_2D,0,r.RGBA,n.width,n.height,0,r.RGBA,r.UNSIGNED_BYTE,null);var i=r.createFramebuffer();return n.framebuffer=i,r.bindFramebuffer(r.FRAMEBUFFER,i),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,o,0),r.bindFramebuffer(r.FRAMEBUFFER,null),n},d={attribFloat:function(r,e,t,n){var o=r.getAttribLocation(e,t);return r.enableVertexAttribArray(o),function(e){r.bindBuffer(r.ARRAY_BUFFER,e),r.vertexAttribPointer(o,n,r.FLOAT,!1,0,0)}}},v={uniform1f:function(r,e,t){var n=r.getUniformLocation(e,t);return function(e){r.uniform1f(n,e)}},uniform2fv:function(r,e,t){var n=r.getUniformLocation(e,t);return function(e){r.uniform2fv(n,e)}},uniform3fv:function(r,e,t){var n=r.getUniformLocation(e,t);return function(e){r.uniform3fv(n,e)}},uniformTexture:function(r,e,t,n){var o=r.getUniformLocation(e,t);return function(e){r.activeTexture(r.TEXTURE0+n),r.bindTexture(r.TEXTURE_2D,e),r.uniform1i(o,n)}},uniform1i:function(r,e,t){var n=r.getUniformLocation(e,t);return function(e){r.uniform1i(n,e)}},uniformMatrix4fv:function(r,e,t){var n=r.getUniformLocation(e,t);return function(e){r.uniformMatrix4fv(n,!1,e)}}},m=function(r,e,t,n,o){var i=e(r,t,n);return{programInfo:i,use:function(){r.useProgram(i.program)},attribSet:function(r){for(var e in r)i.attribLocations[e]&&i.attribLocations[e](r[e])},uniformSet:function(r){for(var e in r)i.uniformLocations[e]&&i.uniformLocations[e](r[e])},elementSet:function(e){r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e)}}},b=function(r){return[[r[0],r[1]],[r[2],r[1]],[r[2],r[3]],[r[0],r[3]]].flat()},h=function(r){r.clearColor(0,0,0,1),r.clear(r.COLOR_BUFFER_BIT)},p=function(r,e){var t=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],n=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];c(r,e,n),t&&h(r)}},1:function(r,e,t){"use strict";t.d(e,"a",(function(){return f})),t.d(e,"b",(function(){return l}));var n=t(3),o=t.n(n),i=t(4),a=t.n(i),u=t(2),f=function(){function r(){o()(this,r)}return a()(r,null,[{key:"normalize",value:function(e){return r.length(e)?r.scale(e,1/r.length(e)):e}},{key:"rotate",value:function(r,e){var t=Math.cos(e),n=Math.sin(e);return[r[0]*t-r[1]*n,r[1]*t+r[0]*n]}},{key:"dot",value:function(r,e){return r[0]*e[0]+r[1]*e[1]}},{key:"cross",value:function(r,e){return r[0]*e[1]-r[1]*e[0]}},{key:"add",value:function(r,e){return[r[0]+e[0],r[1]+e[1]]}},{key:"sub",value:function(r,e){return[r[0]-e[0],r[1]-e[1]]}},{key:"projection",value:function(e,t){var n=r.dot(e,t)/r.dot(t,t);return[t[0]*n,t[1]*n]}},{key:"length",value:function(e){return Math.sqrt(r.dot(e,e))}},{key:"mul",value:function(r,e){return[r[0]*e[0],r[1]*e[1]]}},{key:"div",value:function(r,e){return[r[0]/e[0],r[1]/e[1]]}},{key:"scale",value:function(r,e){return[r[0]*e,r[1]*e]}},{key:"collisionCalc",value:function(e,t,n,o){return r.scale(r.add(r.scale(e,n-o),r.scale(t,2*o)),1/(n+o))}},{key:"getAngle",value:function(r){return Math.atan2(r[1],r[0])}},{key:"floor",value:function(r){return[Math.floor(r[0]),Math.floor(r[1])]}},{key:"fract",value:function(r){return[u.a.fract(r[0]),u.a.fract(r[1])]}},{key:"sin",value:function(r){return[Math.sin(r[0]),Math.sin(r[1])]}},{key:"cos",value:function(r){return[Math.cos(r[0]),Math.cos(r[1])]}},{key:"distance",value:function(e,t){return r.length(r.sub(t,e))}},{key:"mix",value:function(r,e,t){return[u.a.mix(r[0],e[0],t),u.a.mix(r[1],e[1],t)]}},{key:"abs",value:function(r){return[Math.abs(r[0]),Math.abs(r[1])]}},{key:"getLine",value:function(e,t){return{pos:e,dir:r.sub(t,e)}}}]),r}(),l=function(){function r(){o()(this,r)}return a()(r,null,[{key:"set",value:function(r,e,t){return r[0]=e,r[1]=t,r}},{key:"normalize",value:function(e){var t=f.length(e);return t&&r.scale(e,1/t),e}},{key:"add",value:function(r,e){return r[0]+=e[0],r[1]+=e[1],r}},{key:"sub",value:function(r,e){return r[0]-=e[0],r[1]-=e[1],r}},{key:"scale",value:function(r,e){return r[0]*=e,r[1]*=e,r}},{key:"rotate",value:function(r,e){var t=Math.cos(e),n=Math.sin(e),o=[r[0]*t-r[1]*n,r[1]*t+r[0]*n];return r[0]=o[0],r[1]=o[1],r}}]),r}()},10:function(r,e){r.exports="precision mediump float;\r\nvarying vec2 vTextureCoord;\r\nuniform sampler2D uSampler;\r\nuniform lowp vec2 uSize;\r\nuniform vec2 uDir;\r\nuniform float uWidth;\r\nuniform float uPower;\r\nconst float pi=3.14159265359;\r\nvoid main()\r\n{\r\n  vec4 color=texture2D(uSampler,vTextureCoord);\r\n  const int N=10;\r\n  float ii=max(uWidth,float(N))/float(N);\r\n  for(int i=1;i<=N;i++){\r\n    if(uWidth<float(N)&&float(i)>uWidth){\r\n      break;\r\n    }\r\n    float val=cos((float(i)/float(N))*pi);\r\n    float rate=pow(exp(2.*val)/exp(2.),.75);\r\n    color+=rate*texture2D(uSampler,vTextureCoord+float(i)*ii*uDir/uSize);\r\n    color+=rate*texture2D(uSampler,vTextureCoord-float(i)*ii*uDir/uSize);\r\n  }\r\n  //color.rgb/=color.a;\r\n  gl_FragColor=uPower*color;\r\n}\r\n"},11:function(r,e,t){"use strict";var n=t(0),o=t(5),i=t.n(o),a=t(12),u=t.n(a),f=function(r,e,t){var o=Object(n.f)(r,e,t);return{program:o,attribLocations:{vertexPosition:n.b.attribFloat(r,o,"aVertexPosition",2),textureCoord:n.b.attribFloat(r,o,"aTextureCoord",2)},uniformLocations:{flipY:n.i.uniform1f(r,o,"uFlipY"),samplerA:n.i.uniformTexture(r,o,"uSamplerA",0),samplerB:n.i.uniformTexture(r,o,"uSamplerB",1)}}};e.a=function(r){return Object.assign(Object(n.h)(r,f,i.a,u.a),{draw:function(e){r.drawElements(r.TRIANGLES,e,r.UNSIGNED_BYTE,0)}})}},12:function(r,e){r.exports="precision mediump float;\r\nvarying vec2 vTextureCoord;\r\nuniform sampler2D uSamplerA;\r\nuniform sampler2D uSamplerB;\r\nvoid main()\r\n{\r\n  gl_FragColor=texture2D(uSamplerA,vTextureCoord)+texture2D(uSamplerB,vTextureCoord);\r\n}\r\n"},18:function(r,e,t){"use strict";var n=t(0),o=t(5),i=t.n(o),a=t(19),u=t.n(a),f=function(r,e,t){var o=Object(n.f)(r,e,t);return{program:o,attribLocations:{vertexPosition:n.b.attribFloat(r,o,"aVertexPosition",2),textureCoord:n.b.attribFloat(r,o,"aTextureCoord",2)},uniformLocations:{flipY:n.i.uniform1f(r,o,"uFlipY"),sampler:n.i.uniformTexture(r,o,"uSampler",0),lineWidthSampler:n.i.uniformTexture(r,o,"uLineWidthSampler",1),size:n.i.uniform2fv(r,o,"uSize")}}};e.a=function(r){return Object.assign(Object(n.h)(r,f,i.a,u.a),{draw:function(e){r.drawElements(r.TRIANGLES,e,r.UNSIGNED_BYTE,0)}})}},19:function(r,e){r.exports="precision mediump float;\r\nvarying vec2 vTextureCoord;\r\nuniform sampler2D uSampler;\r\nuniform sampler2D uLineWidthSampler;\r\nuniform lowp vec2 uSize;\r\nconst float pi=3.14159265359;\r\nvoid main()\r\n{\r\n  vec4 gaussCol=vec4(0.,0.,0.,0.);\r\n  float sum=0.;\r\n  const int lineWidth=5;\r\n  bool b=false;\r\n  \r\n  gaussCol+=texture2D(uSampler,vTextureCoord);\r\n  sum+=texture2D(uLineWidthSampler,vTextureCoord).r;\r\n  for(int l=0;l<8;l++)\r\n  {\r\n    float angle=2.*pi*float(l)/8.;\r\n    vec2 pos=vec2(cos(angle),sin(angle));\r\n    for(int k=1;k<=lineWidth;k++)\r\n    {\r\n      float r=float(k);\r\n      vec2 coord=vTextureCoord+r*pos/uSize;\r\n      vec4 texCol0=texture2D(uLineWidthSampler,coord);\r\n      if(texCol0.r>0.){\r\n        float rr=float(lineWidth)*texCol0.r;\r\n        if(r<rr){\r\n          vec4 texCol1=texture2D(uSampler,coord);\r\n          float rate=r/rr;\r\n          gaussCol+=vec4(texCol1.rgb*rate,rate);\r\n          sum+=texCol0.r*smoothstep(1.,0.,rate);\r\n        }\r\n      }\r\n    }\r\n  }\r\n  \r\n  /*for(int j=-lineWidth;j<=lineWidth;j++)\r\n  {\r\n    for(int i=-lineWidth;i<=lineWidth;i++)\r\n    {\r\n      vec2 pos=vec2(i,j);\r\n      vec2 coord=vTextureCoord+pos/uSize;\r\n      vec4 texCol0=texture2D(uLineWidthSampler,coord);\r\n      \r\n      if(texCol0.r>0.){\r\n        float r=length(pos);\r\n        float rr=float(lineWidth)*texCol0.r;\r\n        \r\n        if(r<rr){\r\n          vec4 texCol1=texture2D(uSampler,coord);\r\n          float rate=r/rr;\r\n          gaussCol+=vec4(texCol1.rgb,rate);\r\n          sum+=texCol0.r*smoothstep(1.,0.,rate);\r\n        }\r\n      }\r\n    }\r\n  }*/\r\n  /*if(b||sum>1.){\r\n    sum=1.;\r\n  }*/\r\n  gaussCol.rgb/=gaussCol.w;\r\n  \r\n  gl_FragColor=vec4(gaussCol.rgb*sum,sum);\r\n  \r\n}"},2:function(r,e,t){"use strict";t.d(e,"a",(function(){return u}));var n=t(3),o=t.n(n),i=t(4),a=t.n(i),u=function(){function r(){o()(this,r)}return a()(r,null,[{key:"mix",value:function(r,e,t){return r*(1-t)+e*t}},{key:"fract",value:function(r){return(r%=1)<0?r+1:r}}]),r}()},20:function(r,e,t){"use strict";var n=t(0),o=t(21),i=t.n(o),a=t(22),u=t.n(a),f=function(r,e,t){var o=Object(n.f)(r,e,t);return{program:o,attribLocations:{vertexPosition:n.b.attribFloat(r,o,"aVertexPosition",2),vertexColor:n.b.attribFloat(r,o,"aVertexColor",4)},uniformLocations:{flipY:n.i.uniform1f(r,o,"uFlipY"),size:n.i.uniform2fv(r,o,"uSize")}}};e.a=function(r){return Object.assign(Object(n.h)(r,f,i.a,u.a),{draw:function(e,t){r.drawArrays(e,0,t)}})}},21:function(r,e){r.exports="attribute vec2 aVertexPosition;\r\nattribute vec4 aVertexColor;\r\nuniform float uFlipY;\r\nuniform vec2 uSize;\r\nvarying lowp vec4 vColor;\r\nvoid main(void){\r\n  vColor=aVertexColor;\r\n  gl_Position=vec4((2.*aVertexPosition/uSize+vec2(-1.,-1.))*vec2(1.,uFlipY),0.,1.);\r\n  //gl_PointSize=10.;\r\n}"},22:function(r,e){r.exports="precision mediump float;\r\nvarying lowp vec4 vColor;\r\n\r\nvoid main(void){\r\n  gl_FragColor=vColor;\r\n}"},3:function(r,e){r.exports=function(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}},4:function(r,e){function t(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}r.exports=function(r,e,n){return e&&t(r.prototype,e),n&&t(r,n),r}},5:function(r,e){r.exports="attribute vec2 aVertexPosition;\r\nattribute vec2 aTextureCoord;\r\nvarying highp vec2 vTextureCoord;\r\nuniform float uFlipY;\r\nvoid main(void){\r\n  vTextureCoord=aTextureCoord;\r\n  gl_Position=vec4((2.*aVertexPosition+vec2(-1.,-1.))*vec2(1.,uFlipY),0.,1.);\r\n}"},56:function(r,e,t){"use strict";t.r(e);var n=t(0),o=t(1),i=t(18),a=t(9),u=t(11),f=t(20);function l(r){var e=[[0,0],[1,0],[1,1],[0,1]].flat(),t=Object(n.a)(r,e,2),o=[[0,0],[1,0],[1,1],[0,1]].flat(),i=Object(n.a)(r,o,2),a=[[0,1,3],[1,2,3]].flat();return{positionBufferData:t,textureCoordinatesBufferData:i,indicesBufferData:Object(n.d)(r,a)}}function c(r){return{positionBufferData:Object(n.a)(r,[],2),colorBufferData:Object(n.a)(r,[],4),lineWidthBufferData:Object(n.a)(r,[],4)}}!function(){var r=document.querySelector("#glcanvas"),e=r.getContext("webgl",{alpha:!1});if(!e)return void alert("無法初始化WebGL。您的瀏覽器或機器可能不支持它。");var t={blurShader:Object(a.a)(e),lineShader:Object(f.a)(e),lineWidthShader:Object(i.a)(e),addShader:Object(u.a)(e)},s={face:l(e),line:c(e)},d=[0,0];r.addEventListener("mousemove",(function(r){o.b.set(d,r.pageX,r.pageY)}));var v=[e.canvas.clientWidth,e.canvas.clientHeight],m={lineColor:Object(n.c)(e),lineWidth:Object(n.c)(e),line:Object(n.c)(e),blurX:Object(n.c)(e),blurY:Object(n.c)(e)};s.line.positionBufferData.set([[0,0],[150,100],[200,200],[400,200]].flat()),s.line.colorBufferData.set([[1,1,1,1],[1,0,0,1],[0,1,0,1],[0,0,1,1]].flat()),s.line.lineWidthBufferData.set([[1,0,0,0],[.2,0,0,0],[.5,0,0,0],[0,0,0,0]].flat()),r.addEventListener("mousedown",(function(r){o.b.set(d,r.pageX,r.pageY),s.line.positionBufferData.add(d),s.line.colorBufferData.add([Math.random(),Math.random(),Math.random(),1]),s.line.lineWidthBufferData.add([.2+.8*Math.random(),0,0,1]),console.log(s.line.positionBufferData.length/2)}));var b=0;requestAnimationFrame((function r(o){var i=.001*(o-b);b=o,requestAnimationFrame(r),function(r,e,t,o,i,a,u,f){var l=o.line,c=l.positionBufferData.getItem(0);c[0]+=50*r,c[0]%=100,l.positionBufferData.item(0,c);var s=l.positionBufferData.getItem(2);s[1]+=50*r,s[1]%=100,l.positionBufferData.item(2,s);var d=t.lineShader;d.use(),d.uniformSet({size:a,flipY:1}),d.attribSet({vertexPosition:l.positionBufferData.buffer}),d.attribSet({vertexColor:l.colorBufferData.buffer}),Object(n.j)(e,f.lineColor),d.draw(e.LINE_STRIP,l.positionBufferData.data.length/2),d.attribSet({vertexColor:l.lineWidthBufferData.buffer}),Object(n.j)(e,f.lineWidth),d.draw(e.LINE_STRIP,l.positionBufferData.data.length/2);var v=o.face,m=t.lineWidthShader;m.use(),m.attribSet({vertexPosition:v.positionBufferData.buffer,textureCoord:v.textureCoordinatesBufferData.buffer}),m.uniformSet({size:a,flipY:1,sampler:f.lineColor.texture,lineWidthSampler:f.lineWidth.texture}),Object(n.j)(e,f.line),m.draw(v.indicesBufferData.length);var b=o.face,h=t.blurShader;h.use(),h.attribSet({vertexPosition:b.positionBufferData.buffer,textureCoord:b.textureCoordinatesBufferData.buffer}),h.uniformSet({size:a,flipY:1,sampler:f.line.texture,width:10,power:.125,dir:[1,0]}),Object(n.j)(e,f.blurX),h.draw(b.indicesBufferData.length),h.uniformSet({sampler:f.blurX.texture,dir:[0,1]}),Object(n.j)(e,f.blurY),h.draw(b.indicesBufferData.length);var p=o.face,g=t.addShader;g.use(),g.attribSet({vertexPosition:p.positionBufferData.buffer,textureCoord:p.textureCoordinatesBufferData.buffer}),g.uniformSet({flipY:-1,samplerA:f.line.texture,samplerB:f.blurY.texture}),Object(n.j)(e),g.draw(p.indicesBufferData.length)}(i,e,t,s,0,v,0,m)}))}()},9:function(r,e,t){"use strict";var n=t(0),o=t(5),i=t.n(o),a=t(10),u=t.n(a),f=function(r,e,t){var o=Object(n.f)(r,e,t);return{program:o,attribLocations:{vertexPosition:n.b.attribFloat(r,o,"aVertexPosition",2),textureCoord:n.b.attribFloat(r,o,"aTextureCoord",2)},uniformLocations:{flipY:n.i.uniform1f(r,o,"uFlipY"),sampler:n.i.uniformTexture(r,o,"uSampler",0),size:n.i.uniform2fv(r,o,"uSize"),dir:n.i.uniform2fv(r,o,"uDir"),width:n.i.uniform1f(r,o,"uWidth"),power:n.i.uniform1f(r,o,"uPower")}}};e.a=function(r){return Object.assign(Object(n.h)(r,f,i.a,u.a),{draw:function(e){r.drawElements(r.TRIANGLES,e,r.UNSIGNED_BYTE,0)}})}}});