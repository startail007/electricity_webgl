!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=72)}({0:function(e,t,r){"use strict";r.d(t,"h",(function(){return m})),r.d(t,"f",(function(){return n})),r.d(t,"c",(function(){return s})),r.d(t,"a",(function(){return a})),r.d(t,"d",(function(){return i})),r.d(t,"g",(function(){return f})),r.d(t,"b",(function(){return v})),r.d(t,"i",(function(){return d})),r.d(t,"e",(function(){return b})),r.d(t,"j",(function(){return h}));var n=function(e,t,r){var n=o(e,e.VERTEX_SHADER,t),a=o(e,e.FRAGMENT_SHADER,r),i=e.createProgram();return e.attachShader(i,n),e.attachShader(i,a),e.linkProgram(i),e.getProgramParameter(i,e.LINK_STATUS)?i:(alert("無法初始化著色器程序: "+e.getProgramInfoLog(i)),null)},o=function(e,t,r){var n=e.createShader(t);return e.shaderSource(n,r),e.compileShader(n),e.getShaderParameter(n,e.COMPILE_STATUS)?n:(alert("編譯著色器時發生錯誤: "+e.getShaderInfoLog(n)),e.deleteShader(n),null)},a=function(e,t,r){var n,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:Float32Array,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:e.STATIC_DRAW,i=e.createBuffer(),u=0,f={buffer:i,get data(){return n},get length(){return n.length},set:function(t){n=new o(t),u=100*Math.ceil(n.length/r/100),e.bindBuffer(e.ARRAY_BUFFER,i),e.bufferData(e.ARRAY_BUFFER,u*r*4,a),e.bufferSubData(e.ARRAY_BUFFER,0,n)},add:function(t){var f=n.length,c=100*Math.floor(n.length/r/100);c>=u&&(u=c+100,e.bindBuffer(e.ARRAY_BUFFER,i),e.bufferData(e.ARRAY_BUFFER,u*r*4,a),e.bufferSubData(e.ARRAY_BUFFER,0,n));var l=new o(f+r);l.set(n),n=l,this.item(f/r,t)},item:function(t,a){var u=new o(a);n.set(u,t*r),e.bindBuffer(e.ARRAY_BUFFER,i),e.bufferSubData(e.ARRAY_BUFFER,t*r*4,u)},getItem:function(e){return Array.from(n.slice(e*r,(e+1)*r))}};return f.set(t),f},i=function(e,t){var r,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Uint8Array,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:e.STATIC_DRAW,a=e.createBuffer(),i=0,u=3,f={buffer:a,get data(){return r},get length(){return r.length},set:function(t){r=new n(t),i=100*Math.ceil(r.length/u/100),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,a),e.bufferData(e.ELEMENT_ARRAY_BUFFER,i*u*4,o),e.bufferSubData(e.ELEMENT_ARRAY_BUFFER,0,r)},add:function(t){var f=r.length,c=100*Math.floor(r.length/u/100);c>=i&&(i=c+100,e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,a),e.bufferData(e.ELEMENT_ARRAY_BUFFER,i*u*4,o),e.bufferSubData(e.ELEMENT_ARRAY_BUFFER,0,r));var l=new n(f+u);l.set(r),r=l,this.item(f/u,t)},item:function(t,o){var i=new n(o);r.set(i,t*u),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,a),e.bufferSubData(e.ELEMENT_ARRAY_BUFFER,t*u*4,i)},getItem:function(e){return Array.from(r.slice(e*u,(e+1)*u))}};return f.set(t),f},u=function(e){var t=e.createTexture();return e.bindTexture(e.TEXTURE_2D,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),t},f=function(e,t){var r=u(e),n=new Image;return n.onload=function(){r.width=n.width,r.height=n.height,e.bindTexture(e.TEXTURE_2D,r),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,n),e.bindTexture(e.TEXTURE_2D,null)},n.src=t,r},c=function(e,t,r,n){e.bindFramebuffer(e.FRAMEBUFFER,t),void 0!==r&&void 0!==n&&e.viewport(0,0,r,n)},l=function(e,t){var r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];t?r?c(e,t.framebuffer,t.width,t.height):c(e,t.framebuffer):r?c(e,null,e.canvas.width,e.canvas.height):c(e,null)},s=function(e,t,r){var n={width:t||e.canvas.clientWidth,height:r||e.canvas.clientHeight},o=u(e);n.texture=o,e.texImage2D(e.TEXTURE_2D,0,e.RGBA,n.width,n.height,0,e.RGBA,e.UNSIGNED_BYTE,null);var a=e.createFramebuffer();return n.framebuffer=a,e.bindFramebuffer(e.FRAMEBUFFER,a),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,o,0),e.bindFramebuffer(e.FRAMEBUFFER,null),n},v={attribFloat:function(e,t,r,n){var o=e.getAttribLocation(t,r);return e.enableVertexAttribArray(o),function(t){e.bindBuffer(e.ARRAY_BUFFER,t),e.vertexAttribPointer(o,n,e.FLOAT,!1,0,0)}}},d={uniform1f:function(e,t,r){var n=e.getUniformLocation(t,r);return function(t){e.uniform1f(n,t)}},uniform2fv:function(e,t,r){var n=e.getUniformLocation(t,r);return function(t){e.uniform2fv(n,t)}},uniform3fv:function(e,t,r){var n=e.getUniformLocation(t,r);return function(t){e.uniform3fv(n,t)}},uniformTexture:function(e,t,r,n){var o=e.getUniformLocation(t,r);return function(t){e.activeTexture(e.TEXTURE0+n),e.bindTexture(e.TEXTURE_2D,t),e.uniform1i(o,n)}},uniform1i:function(e,t,r){var n=e.getUniformLocation(t,r);return function(t){e.uniform1i(n,t)}},uniformMatrix4fv:function(e,t,r){var n=e.getUniformLocation(t,r);return function(t){e.uniformMatrix4fv(n,!1,t)}}},m=function(e,t,r,n,o){var a=t(e,r,n);return{programInfo:a,use:function(){e.useProgram(a.program)},attribSet:function(e){for(var t in e)a.attribLocations[t]&&a.attribLocations[t](e[t])},uniformSet:function(e){for(var t in e)a.uniformLocations[t]&&a.uniformLocations[t](e[t])},elementSet:function(t){e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t)}}},b=function(e){return[[e[0],e[1]],[e[2],e[1]],[e[2],e[3]],[e[0],e[3]]].flat()},p=function(e){e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT)},h=function(e,t){var r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],n=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];l(e,t,n),r&&p(e)}},1:function(e,t,r){"use strict";r.d(t,"a",(function(){return f})),r.d(t,"b",(function(){return c}));var n=r(3),o=r.n(n),a=r(4),i=r.n(a),u=r(2),f=function(){function e(){o()(this,e)}return i()(e,null,[{key:"normalize",value:function(t){return e.length(t)?e.scale(t,1/e.length(t)):t}},{key:"rotate",value:function(e,t){var r=Math.cos(t),n=Math.sin(t);return[e[0]*r-e[1]*n,e[1]*r+e[0]*n]}},{key:"dot",value:function(e,t){return e[0]*t[0]+e[1]*t[1]}},{key:"cross",value:function(e,t){return e[0]*t[1]-e[1]*t[0]}},{key:"add",value:function(e,t){return[e[0]+t[0],e[1]+t[1]]}},{key:"sub",value:function(e,t){return[e[0]-t[0],e[1]-t[1]]}},{key:"projection",value:function(t,r){var n=e.dot(t,r)/e.dot(r,r);return[r[0]*n,r[1]*n]}},{key:"length",value:function(t){return Math.sqrt(e.dot(t,t))}},{key:"mul",value:function(e,t){return[e[0]*t[0],e[1]*t[1]]}},{key:"div",value:function(e,t){return[e[0]/t[0],e[1]/t[1]]}},{key:"scale",value:function(e,t){return[e[0]*t,e[1]*t]}},{key:"collisionCalc",value:function(t,r,n,o){return e.scale(e.add(e.scale(t,n-o),e.scale(r,2*o)),1/(n+o))}},{key:"getAngle",value:function(e){return Math.atan2(e[1],e[0])}},{key:"floor",value:function(e){return[Math.floor(e[0]),Math.floor(e[1])]}},{key:"fract",value:function(e){return[u.a.fract(e[0]),u.a.fract(e[1])]}},{key:"sin",value:function(e){return[Math.sin(e[0]),Math.sin(e[1])]}},{key:"cos",value:function(e){return[Math.cos(e[0]),Math.cos(e[1])]}},{key:"distance",value:function(t,r){return e.length(e.sub(r,t))}},{key:"mix",value:function(e,t,r){return[u.a.mix(e[0],t[0],r),u.a.mix(e[1],t[1],r)]}},{key:"abs",value:function(e){return[Math.abs(e[0]),Math.abs(e[1])]}},{key:"getLine",value:function(t,r){return{pos:t,dir:e.sub(r,t)}}}]),e}(),c=function(){function e(){o()(this,e)}return i()(e,null,[{key:"set",value:function(e,t,r){return e[0]=t,e[1]=r,e}},{key:"normalize",value:function(t){var r=f.length(t);return r&&e.scale(t,1/r),t}},{key:"add",value:function(e,t){return e[0]+=t[0],e[1]+=t[1],e}},{key:"sub",value:function(e,t){return e[0]-=t[0],e[1]-=t[1],e}},{key:"scale",value:function(e,t){return e[0]*=t,e[1]*=t,e}},{key:"rotate",value:function(e,t){var r=Math.cos(t),n=Math.sin(t),o=[e[0]*r-e[1]*n,e[1]*r+e[0]*n];return e[0]=o[0],e[1]=o[1],e}}]),e}()},10:function(e,t,r){var n=r(8);e.exports=function(e){if(Array.isArray(e))return n(e)}},11:function(e,t){e.exports=function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}},12:function(e,t,r){var n=r(8);e.exports=function(e,t){if(e){if("string"==typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}}},13:function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},2:function(e,t,r){"use strict";r.d(t,"a",(function(){return u}));var n=r(3),o=r.n(n),a=r(4),i=r.n(a),u=function(){function e(){o()(this,e)}return i()(e,null,[{key:"mix",value:function(e,t,r){return e*(1-r)+t*r}},{key:"fract",value:function(e){return(e%=1)<0?e+1:e}},{key:"inverseMix",value:function(e,t,r){return(r-e)/(t-e)}},{key:"clamp",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;return e<=t?t:e>=r?r:e}},{key:"smoothstep",value:function(e,t,r){return(r=clamp(inverseMix(e,t,r)))*r*(3-2*r)}}]),e}()},25:function(e,t,r){"use strict";var n=r(0),o=r(5),a=r.n(o),i=r(26),u=r.n(i),f=function(e,t,r){var o=Object(n.f)(e,t,r);return{program:o,attribLocations:{vertexPosition:n.b.attribFloat(e,o,"aVertexPosition",2),textureCoord:n.b.attribFloat(e,o,"aTextureCoord",2)},uniformLocations:{flipY:n.i.uniform1f(e,o,"uFlipY"),sampler:n.i.uniformTexture(e,o,"uSampler",0)}}};t.a=function(e){return Object.assign(Object(n.h)(e,f,a.a,u.a),{draw:function(t){e.drawElements(e.TRIANGLES,t,e.UNSIGNED_BYTE,0)}})}},26:function(e,t){e.exports="precision highp float;\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nvoid main()\n{\n  gl_FragColor=texture2D(uSampler,vTextureCoord);\n}\n"},3:function(e,t){e.exports=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},39:function(e,t){e.exports="precision highp float;\nvarying vec2 vTextureCoord;\nuniform lowp vec2 uSize;\nuniform float uTime;\nconst float pi=3.14159265359;\nvoid main()\n{\n  vec2 coord=vTextureCoord*uSize;\n  float a=sin(uTime*.003+(coord.x/200.)*2.*pi+.5*pi+sin(uTime*.012+pi*coord.x/50.)*.25+exp(sin(uTime*.012+pi*coord.x/50.))*.25+sin(pi*coord.y/100.)*1.6);\n  a=pow(exp(2.*a)/exp(2.),.75);\n  gl_FragColor=vec4(vec3(a),1.);\n  \n  /*vec2 uv0=2.*vTextureCoord-1.;\n  float c=0.;\n  c+=abs(1./sin(uv0.y+sin(uv0.x*10.+uTime*.012)))/100.;\n  gl_FragColor+=vec4(vec3(c),1.);*/\n}\n\n"},4:function(e,t){function r(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}e.exports=function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}},40:function(e,t){e.exports="precision highp float;\nvarying vec2 vTextureCoord;\nuniform lowp vec2 uSize;\nuniform sampler2D uSampler;\nuniform float uHeight;\nconst float pi=3.14159265359;\nvoid main()\n{\n  vec2 iResolution=uSize/2.;\n  vec4 texCol=texture2D(uSampler,vTextureCoord);\n  vec2 dir=vec2(0.);\n  const int N=8;\n  float w=0.;\n  for(int i=0;i<N;i++)\n  {\n    float angle=2.*pi*float(i)/float(N);\n    vec2 pos=vec2(cos(angle),sin(angle));\n    dir+=(texCol.r-texture2D(uSampler,vTextureCoord+pos/iResolution).r)*pos;\n    w+=1.;\n  }\n  dir/=w;\n  dir*=vec2(1.,-1.);\n  vec3 normal=normalize(vec3(min(uHeight,200.)*dir,-1));\n  gl_FragColor=vec4(normal.xy*.5+vec2(.5),uHeight*texCol.r/200.,1.);\n  \n}\n"},41:function(e,t){e.exports="precision highp float;\nvarying vec2 vTextureCoord;\nuniform lowp vec2 uSize;\nuniform sampler2D uNormalSampler;\nuniform sampler2D uSampler;\nuniform float uRefractiveIndex;\nuniform float uDistance;\n\nvoid main()\n{\n  vec4 texCol=texture2D(uNormalSampler,vTextureCoord);\n  vec2 pos=(2.*texCol.rg-vec2(1.));\n  pos.x*=-1.;\n  vec3 refract=refract(vec3(0.,0.,1.),normalize(vec3(pos,-1.)),uRefractiveIndex);\n  refract*=(texCol.b*200.+uDistance)/refract.z;\n  vec4 texCol00=texture2D(uSampler,vTextureCoord+refract.xy/uSize);\n  gl_FragColor=texCol00;\n}\n"},5:function(e,t){e.exports="attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nvarying highp vec2 vTextureCoord;\nuniform float uFlipY;\nvoid main(void){\n  vTextureCoord=aTextureCoord;\n  gl_Position=vec4((2.*aVertexPosition+vec2(-1.,-1.))*vec2(1.,uFlipY),0.,1.);\n}"},6:function(e,t,r){var n=r(10),o=r(11),a=r(12),i=r(13);e.exports=function(e){return n(e)||o(e)||a(e)||i()}},72:function(e,t,r){"use strict";r.r(t);var n=r(6),o=r.n(n),a=r(0),i=r(1),u=r(5),f=r.n(u),c=r(39),l=r.n(c),s=function(e,t,r){var n=Object(a.f)(e,t,r);return{program:n,attribLocations:{vertexPosition:a.b.attribFloat(e,n,"aVertexPosition",2),textureCoord:a.b.attribFloat(e,n,"aTextureCoord",2)},uniformLocations:{flipY:a.i.uniform1f(e,n,"uFlipY"),time:a.i.uniform1f(e,n,"uTime"),size:a.i.uniform2fv(e,n,"uSize")}}},v=function(e){return Object.assign(Object(a.h)(e,s,f.a,l.a),{draw:function(t){e.drawElements(e.TRIANGLES,t,e.UNSIGNED_BYTE,0)}})},d=r(40),m=r.n(d),b=function(e,t,r){var n=Object(a.f)(e,t,r);return{program:n,attribLocations:{vertexPosition:a.b.attribFloat(e,n,"aVertexPosition",2),textureCoord:a.b.attribFloat(e,n,"aTextureCoord",2)},uniformLocations:{flipY:a.i.uniform1f(e,n,"uFlipY"),size:a.i.uniform2fv(e,n,"uSize"),sampler:a.i.uniformTexture(e,n,"uSampler",0),height:a.i.uniform1f(e,n,"uHeight")}}},p=function(e){return Object.assign(Object(a.h)(e,b,f.a,m.a),{draw:function(t){e.drawElements(e.TRIANGLES,t,e.UNSIGNED_BYTE,0)}})},h=r(41),g=r.n(h),x=function(e,t,r){var n=Object(a.f)(e,t,r);return{program:n,attribLocations:{vertexPosition:a.b.attribFloat(e,n,"aVertexPosition",2),textureCoord:a.b.attribFloat(e,n,"aTextureCoord",2)},uniformLocations:{flipY:a.i.uniform1f(e,n,"uFlipY"),size:a.i.uniform2fv(e,n,"uSize"),normalSampler:a.i.uniformTexture(e,n,"uNormalSampler",0),sampler:a.i.uniformTexture(e,n,"uSampler",1),refractiveIndex:a.i.uniform1f(e,n,"uRefractiveIndex"),distance:a.i.uniform1f(e,n,"uDistance")}}},E=function(e){return Object.assign(Object(a.h)(e,x,f.a,g.a),{draw:function(t){e.drawElements(e.TRIANGLES,t,e.UNSIGNED_BYTE,0)}})},T=r(25);function R(e){var t=[[0,0],[1,0],[1,1],[0,1]].flat(),r=Object(a.a)(e,t,2),n=[[0,0],[1,0],[1,1],[0,1]].flat(),o=Object(a.a)(e,n,2),i=[[0,1,3],[1,2,3]].flat();return{positionBufferData:r,textureCoordinatesBufferData:o,indicesBufferData:Object(a.d)(e,i)}}!function(){var e=document.querySelector("#glcanvas"),t=e.getContext("webgl",{alpha:!1});if(!t)return void alert("無法初始化WebGL。您的瀏覽器或機器可能不支持它。");var r={waveShader:v(t),normalShader:p(t),refractShader:E(t),viewShader:Object(T.a)(t)},n={face:R(t),view:R(t)},o={image:Object(a.g)(t,"../img/image.7826b8fad510e7131700fc463cce2c7c.jpg")},u=[.5*t.canvas.width,.5*t.canvas.height];e.addEventListener("mousemove",(function(e){i.b.set(u,e.pageX,e.pageY)}));var f=[t.canvas.clientWidth,t.canvas.clientHeight],c={wave:Object(a.c)(t),normal:Object(a.c)(t),refract:Object(a.c)(t)},l=0;requestAnimationFrame((function e(s){var v=.001*(s-l);l=s,requestAnimationFrame(e),function(e,t,r,n,o){var u=o.now,f=o.framebufferTextures,c=o.mPos,l=o.size,s=r.face,v=t.waveShader;v.use(),v.attribSet({vertexPosition:s.positionBufferData.buffer,textureCoord:s.textureCoordinatesBufferData.buffer}),v.uniformSet({size:l,flipY:1,time:u}),Object(a.j)(e,f.wave),v.draw(s.indicesBufferData.length);var d=r.face,m=t.normalShader;m.use(),m.attribSet({vertexPosition:d.positionBufferData.buffer,textureCoord:d.textureCoordinatesBufferData.buffer}),m.uniformSet({size:l,flipY:1,sampler:f.wave.texture,height:20}),Object(a.j)(e,f.normal),m.draw(d.indicesBufferData.length);var b=r.face,p=t.refractShader;p.use(),p.attribSet({vertexPosition:b.positionBufferData.buffer,textureCoord:b.textureCoordinatesBufferData.buffer}),p.uniformSet({size:l,flipY:1,sampler:n.image,normalSampler:f.normal.texture,refractiveIndex:1.33,distance:1e3}),Object(a.j)(e,f.refract),p.draw(b.indicesBufferData.length);var h=i.a.div(c,l),g=r.view,x=t.viewShader;x.use(),x.attribSet({vertexPosition:g.positionBufferData.buffer,textureCoord:g.textureCoordinatesBufferData.buffer}),x.uniformSet({flipY:-1}),Object(a.j)(e);var E=[h[0],0,1,h[1]],T=[[E[0],E[1]],[E[2],E[1]],[E[2],E[3]],[E[0],E[3]]].flat();g.positionBufferData.set(T),g.textureCoordinatesBufferData.set(T),x.uniformSet({sampler:f.wave.texture}),x.draw(g.indicesBufferData.length);var R=[h[0],h[1],1,1],S=[[R[0],R[1]],[R[2],R[1]],[R[2],R[3]],[R[0],R[3]]].flat();g.positionBufferData.set(S),g.textureCoordinatesBufferData.set(S),x.uniformSet({sampler:f.normal.texture}),x.draw(g.indicesBufferData.length);var y=[0,0,h[0],1],A=[[y[0],y[1]],[y[2],y[1]],[y[2],y[3]],[y[0],y[3]]].flat();g.positionBufferData.set(A),g.textureCoordinatesBufferData.set(A),x.uniformSet({sampler:f.refract.texture}),x.draw(g.indicesBufferData.length)}(t,r,n,o,{now:s,delta:v,mPos:u,framebufferTextures:c,size:f})}))}(),function(){var e=document.getElementById("canvas").getContext("2d");e.lineWidth=1;e.strokeStyle="#ff0000",e.beginPath();for(var t=0;t<800;t++){var r=t/400*2*Math.PI+.5*Math.PI,n=[Math.cos(r),Math.sin(r)];i.b.scale(n,40);var a=i.a.add([t,100],n);0===t?e.moveTo.apply(e,o()(a)):e.lineTo.apply(e,o()(a))}e.stroke(),e.strokeStyle="#000000",e.beginPath();for(var u=0;u<800;u++){var f=u/400*2*Math.PI+.5*Math.PI,c=i.a.add([u,100],[0,40*Math.sin(f-.5*Math.cos(f))]);0===u?e.moveTo.apply(e,o()(c)):e.lineTo.apply(e,o()(c))}e.stroke(),e.strokeStyle="#0000ff",e.beginPath(),e.moveTo(0,100),e.lineTo(800,100),e.stroke()}()},8:function(e,t){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}}});