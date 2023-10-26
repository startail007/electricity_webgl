!function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=95)}([function(t,e,n){"use strict";n.d(e,"g",(function(){return r})),n.d(e,"a",(function(){return o})),n.d(e,"d",(function(){return a})),n.d(e,"h",(function(){return f})),n.d(e,"c",(function(){return s})),n.d(e,"b",(function(){return h})),n.d(e,"j",(function(){return v})),n.d(e,"i",(function(){return d})),n.d(e,"e",(function(){return m})),n.d(e,"f",(function(){return p})),n.d(e,"k",(function(){return b}));var r=function(t,e,n){var r=i(t,t.VERTEX_SHADER,e),o=i(t,t.FRAGMENT_SHADER,n),a=t.createProgram();return t.attachShader(a,r),t.attachShader(a,o),t.linkProgram(a),t.getProgramParameter(a,t.LINK_STATUS)?a:(alert("無法初始化著色器程序: "+t.getProgramInfoLog(a)),null)},i=function(t,e,n){var r=t.createShader(e);return t.shaderSource(r,n),t.compileShader(r),t.getShaderParameter(r,t.COMPILE_STATUS)?r:(alert("編譯著色器時發生錯誤: "+t.getShaderInfoLog(r)),t.deleteShader(r),null)},o=function(t,e,n){var r,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:Float32Array,o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:t.STATIC_DRAW,a=t.createBuffer(),u=0,f={buffer:a,get data(){return r},get length(){return r.length},set:function(e){r=new i(e),u=100*Math.ceil(r.length/n/100),t.bindBuffer(t.ARRAY_BUFFER,a),t.bufferData(t.ARRAY_BUFFER,u*n*4,o),t.bufferSubData(t.ARRAY_BUFFER,0,r)},add:function(e){var f=r.length,l=100*Math.floor(r.length/n/100);l>=u&&(u=l+100,t.bindBuffer(t.ARRAY_BUFFER,a),t.bufferData(t.ARRAY_BUFFER,u*n*4,o),t.bufferSubData(t.ARRAY_BUFFER,0,r));var c=new i(f+n);c.set(r),r=c,this.item(f/n,e)},item:function(e,o){var u=new i(o);r.set(u,e*n),t.bindBuffer(t.ARRAY_BUFFER,a),t.bufferSubData(t.ARRAY_BUFFER,e*n*4,u)},getItem:function(t){return Array.from(r.slice(t*n,(t+1)*n))}};return f.set(e),f},a=function(t,e){var n,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Uint8Array,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:t.STATIC_DRAW,o=t.createBuffer(),a=0,u=3,f={buffer:o,get data(){return n},get length(){return n.length},set:function(e){n=new r(e),a=100*Math.ceil(n.length/u/100),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,o),t.bufferData(t.ELEMENT_ARRAY_BUFFER,a*u*4,i),t.bufferSubData(t.ELEMENT_ARRAY_BUFFER,0,n)},add:function(e){var f=n.length,l=100*Math.floor(n.length/u/100);l>=a&&(a=l+100,t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,o),t.bufferData(t.ELEMENT_ARRAY_BUFFER,a*u*4,i),t.bufferSubData(t.ELEMENT_ARRAY_BUFFER,0,n));var c=new r(f+u);c.set(n),n=c,this.item(f/u,e)},item:function(e,i){var a=new r(i);n.set(a,e*u),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,o),t.bufferSubData(t.ELEMENT_ARRAY_BUFFER,e*u*4,a)},getItem:function(t){return Array.from(n.slice(t*u,(t+1)*u))}};return f.set(e),f},u=function(t){var e=t.createTexture();return t.bindTexture(t.TEXTURE_2D,e),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),e},f=function(t,e){var n=u(t),r=new Image;return r.onload=function(){n.width=r.width,n.height=r.height,t.bindTexture(t.TEXTURE_2D,n),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,r),t.bindTexture(t.TEXTURE_2D,null)},r.src=e,n},l=function(t,e,n,r){t.bindFramebuffer(t.FRAMEBUFFER,e),void 0!==n&&void 0!==r&&t.viewport(0,0,n,r)},c=function(t,e){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];e?n?l(t,e.framebuffer,e.width,e.height):l(t,e.framebuffer):n?l(t,null,t.canvas.width,t.canvas.height):l(t,null)},s=function(t,e,n){var r={width:e||t.canvas.clientWidth,height:n||t.canvas.clientHeight},i=u(t);r.texture=i,t.texImage2D(t.TEXTURE_2D,0,t.RGBA,r.width,r.height,0,t.RGBA,t.UNSIGNED_BYTE,null);var o=t.createFramebuffer();return r.framebuffer=o,t.bindFramebuffer(t.FRAMEBUFFER,o),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,i,0),t.bindFramebuffer(t.FRAMEBUFFER,null),r},h={attribFloat:function(t,e,n,r){var i=t.getAttribLocation(e,n);return t.enableVertexAttribArray(i),function(e){t.bindBuffer(t.ARRAY_BUFFER,e),t.vertexAttribPointer(i,r,t.FLOAT,!1,0,0)}}},v={uniform1f:function(t,e,n){var r=t.getUniformLocation(e,n);return function(e){t.uniform1f(r,e)}},uniform1fv:function(t,e,n){var r=t.getUniformLocation(e,n);return function(e){t.uniform1fv(r,e)}},uniform2fv:function(t,e,n){var r=t.getUniformLocation(e,n);return function(e){t.uniform2fv(r,e)}},uniform3fv:function(t,e,n){var r=t.getUniformLocation(e,n);return function(e){t.uniform3fv(r,e)}},uniformTexture:function(t,e,n,r){var i=t.getUniformLocation(e,n);return function(e){t.activeTexture(t.TEXTURE0+r),t.bindTexture(t.TEXTURE_2D,e),t.uniform1i(i,r)}},uniform1i:function(t,e,n){var r=t.getUniformLocation(e,n);return function(e){t.uniform1i(r,e)}},uniformMatrix4fv:function(t,e,n){var r=t.getUniformLocation(e,n);return function(e){t.uniformMatrix4fv(r,!1,e)}}},d=function(t,e,n,r,i){var o=e(t,n,r);return{programInfo:o,use:function(){t.useProgram(o.program)},attribSet:function(t){for(var e in t)o.attribLocations[e]&&o.attribLocations[e](t[e])},uniformSet:function(t){for(var e in t)o.uniformLocations[e]&&o.uniformLocations[e](t[e])},elementSet:function(e){t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e)}}},m=function(t){return[[t[0],t[1]],[t[2],t[1]],[t[2],t[3]],[t[0],t[3]]].flat()},p=function(t){return[[t[0],t[1]],[t[0],t[3]],[t[2],t[1]],[t[2],t[3]]].flat()},g=function(t){t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT)},b=function(t,e){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];c(t,e,r),n&&g(t)}},function(t,e,n){"use strict";n.d(e,"b",(function(){return f})),n.d(e,"c",(function(){return l})),n.d(e,"a",(function(){return c})),n.d(e,"e",(function(){return m})),n.d(e,"d",(function(){return p}));var r=n(3),i=n.n(r),o=n(4),a=n.n(o),u=n(2),f=function(){function t(){i()(this,t)}return a()(t,null,[{key:"normalize",value:function(e){var n=t.length(e);return n?t.scale(e,1/n):e}},{key:"rotate",value:function(t,e){var n=Math.cos(e),r=Math.sin(e);return[t[0]*n-t[1]*r,t[1]*n+t[0]*r]}},{key:"dot",value:function(t,e){return t[0]*e[0]+t[1]*e[1]}},{key:"cross",value:function(t,e){return t[0]*e[1]-t[1]*e[0]}},{key:"add",value:function(t,e){return[t[0]+e[0],t[1]+e[1]]}},{key:"sub",value:function(t,e){return[t[0]-e[0],t[1]-e[1]]}},{key:"projection",value:function(e,n){var r=t.dot(e,n)/t.dot(n,n);return[n[0]*r,n[1]*r]}},{key:"length",value:function(e){return Math.sqrt(t.dot(e,e))}},{key:"mul",value:function(t,e){return[t[0]*e[0],t[1]*e[1]]}},{key:"div",value:function(t,e){return[t[0]/e[0],t[1]/e[1]]}},{key:"scale",value:function(t,e){return[t[0]*e,t[1]*e]}},{key:"collisionCalc",value:function(e,n,r,i){return t.scale(t.add(t.scale(e,r-i),t.scale(n,2*i)),1/(r+i))}},{key:"getAngle",value:function(t){return Math.atan2(t[1],t[0])}},{key:"floor",value:function(t){return[Math.floor(t[0]),Math.floor(t[1])]}},{key:"fract",value:function(t){return[u.a.fract(t[0]),u.a.fract(t[1])]}},{key:"sin",value:function(t){return[Math.sin(t[0]),Math.sin(t[1])]}},{key:"cos",value:function(t){return[Math.cos(t[0]),Math.cos(t[1])]}},{key:"distance",value:function(e,n){return t.length(t.sub(n,e))}},{key:"mix",value:function(t,e,n){return[u.a.mix(t[0],e[0],n),u.a.mix(t[1],e[1],n)]}},{key:"abs",value:function(t){return[Math.abs(t[0]),Math.abs(t[1])]}}]),t}(),l=function(){function t(){i()(this,t)}return a()(t,null,[{key:"set",value:function(t,e,n){return t[0]=e,t[1]=n,t}},{key:"normalize",value:function(e){var n=f.length(e);return n&&t.scale(e,1/n),e}},{key:"add",value:function(t,e){return t[0]+=e[0],t[1]+=e[1],t}},{key:"sub",value:function(t,e){return t[0]-=e[0],t[1]-=e[1],t}},{key:"scale",value:function(t,e){return t[0]*=e,t[1]*=e,t}},{key:"rotate",value:function(t,e){var n=Math.cos(e),r=Math.sin(e),i=[t[0]*n-t[1]*r,t[1]*n+t[0]*r];return t[0]=i[0],t[1]=i[1],t}}]),t}(),c=function(){function t(){i()(this,t)}return a()(t,null,[{key:"doLineSegmentsIntersect",value:function(t,e,n,r){function i(t,e,n){var r=(e[1]-t[1])*(n[0]-e[0])-(e[0]-t[0])*(n[1]-e[1]);return 0===r?0:r>0?1:2}function o(t,e,n){return e[0]<=Math.max(t[0],n[0])&&e[0]>=Math.min(t[0],n[0])&&e[1]<=Math.max(t[1],n[1])&&e[1]>=Math.min(t[1],n[1])}var a=i(t,e,n),u=i(t,e,r),f=i(n,r,t),l=i(n,r,e);return a!==u&&f!==l||(!(0!==a||!o(t,n,e))||(!(0!==u||!o(t,r,e))||(!(0!==f||!o(n,t,r))||!(0!==l||!o(n,e,r)))))}},{key:"getLine",value:function(t,e){return{pos:t,dir:f.sub(e,t)}}},{key:"toLineDistance",value:function(t,e,n){var r=arguments.length>3&&void 0!==arguments[3]&&arguments[3],i=f.sub(n,e),o=i[1],a=-i[0],u=-e[0]*i[1]+i[0]*e[1],l=(t[0]*o+t[1]*a+u)/f.length(i);return r?l:Math.abs(l)}}]),t}(),s=function(t,e,n,r){var i=r*r;return[t[0]*(i-2*r+1)+2*e[0]*(1-r)*r+n[0]*i,t[1]*(i-2*r+1)+2*e[1]*(1-r)*r+n[1]*i]},h=function(t,e,n,r){return[2*r*(t[0]-2*e[0]+n[0])+2*(-t[0]+e[0]),2*r*(t[1]-2*e[1]+n[1])+2*(-t[1]+e[1])]},v=function(t,e,n,r,i){var o=i*i,a=i*i*i;return[t[0]*(3*o-a-3*i+1)+e[0]*(3*a-6*o+3*i)+n[0]*(-3*a+3*o)+r[0]*a,t[1]*(3*o-a-3*i+1)+e[1]*(3*a-6*o+3*i)+n[1]*(-3*a+3*o)+r[1]*a]},d=function(t,e,n,r,i){var o=i*i;return[-3*t[0]+3*e[0]+2*i*(3*t[0]-6*e[0]+3*n[0])+3*o*(-t[0]+3*e[0]-3*n[0]+r[0]),-3*t[1]+3*e[1]+2*i*(3*t[1]-6*e[1]+3*n[1])+3*o*(-t[1]+3*e[1]-3*n[1]+r[1])]},m=function(t,e,n,r){for(var i=[],o=[],a=null,u=0;u<r;u++){var l=u/(r-1),c=s(t,e,n,l),v=f.normalize(h(t,e,n,l));i.push({p:c,t:v,n:[-v[1],v[0]]}),a&&o.push(f.distance(c,a)),a=c}var d=o.reduce((function(t,e){return t+e}));return{points:i,section:o,length:d}},p=function(t,e,n,r,i){for(var o=[],a=[],u=null,l=0;l<i;l++){var c=l/(i-1),s=v(t,e,n,r,c),h=f.normalize(d(t,e,n,r,c));o.push({p:s,t:h,n:[-h[1],h[0]]}),u&&a.push(f.distance(s,u)),u=s}var m=a.reduce((function(t,e){return t+e}));return{points:o,section:a,length:m}}},function(t,e,n){"use strict";n.d(e,"a",(function(){return u}));var r=n(3),i=n.n(r),o=n(4),a=n.n(o),u=function(){function t(){i()(this,t)}return a()(t,null,[{key:"mix",value:function(t,e,n){return t*(1-n)+e*n}},{key:"fract",value:function(t){return(t%=1)<0?t+1:t}},{key:"inverseMix",value:function(t,e,n){return(n-t)/(e-t)}},{key:"clamp",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;return t<=e?e:t>=n?n:t}},{key:"smoothstep",value:function(t,e,n){return(n=clamp(inverseMix(t,e,n)))*n*(3-2*n)}}]),t}()},function(t,e){t.exports=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},function(t,e){function n(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}t.exports=function(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),t}},function(t,e,n){var r=n(12),i=n(13),o=n(11),a=n(14);t.exports=function(t){return r(t)||i(t)||o(t)||a()}},function(t,e){t.exports="attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nvarying highp vec2 vTextureCoord;\nuniform float uFlipY;\nvoid main(void){\n  vTextureCoord=aTextureCoord;\n  gl_Position=vec4((2.*aVertexPosition+vec2(-1.,-1.))*vec2(1.,uFlipY),0.,1.);\n}"},,,function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"a",(function(){return u}));for(var r=n(2),i=new Array(200),o=0,a=i.length;o<a;o++)i[o]=1-2*Math.random();var u=function(t,e){if(e<=t[0][0])return t[0][1];if(e>=t[t.length-1][0])return t[t.length-1][1];for(var n=0;n<t.length-1;n++)if(e>=t[n][0]&&e<t[n+1][0])return r.a.mix(t[n][1],t[n+1][1],r.a.inverseMix(t[n][0],t[n+1][0],e))}},function(t,e){t.exports=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}},function(t,e,n){var r=n(10);t.exports=function(t,e){if(t){if("string"==typeof t)return r(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(t,e):void 0}}},function(t,e,n){var r=n(10);t.exports=function(t){if(Array.isArray(t))return r(t)}},function(t,e){t.exports=function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}},function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},,function(t,e,n){"use strict";var r=n(0),i=n(6),o=n.n(i),a=n(17),u=n.n(a),f=function(t,e,n){var i=Object(r.g)(t,e,n);return{program:i,attribLocations:{vertexPosition:r.b.attribFloat(t,i,"aVertexPosition",2),textureCoord:r.b.attribFloat(t,i,"aTextureCoord",2)},uniformLocations:{flipY:r.j.uniform1f(t,i,"uFlipY"),sampler:r.j.uniformTexture(t,i,"uSampler",0),size:r.j.uniform2fv(t,i,"uSize"),dir:r.j.uniform2fv(t,i,"uDir"),width:r.j.uniform1f(t,i,"uWidth"),power:r.j.uniform1f(t,i,"uPower")}}};e.a=function(t){return Object.assign(Object(r.i)(t,f,o.a,u.a),{draw:function(e){t.drawElements(t.TRIANGLES,e,t.UNSIGNED_BYTE,0)}})}},function(t,e){t.exports="precision mediump float;\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform lowp vec2 uSize;\nuniform vec2 uDir;\nuniform float uWidth;\nuniform float uPower;\nconst float pi=3.14159265359;\nvoid main()\n{\n  vec4 color=texture2D(uSampler,vTextureCoord);\n  const int N=10;\n  float ii=max(uWidth,float(N))/float(N);\n  for(int i=1;i<=N;i++){\n    if(uWidth<float(N)&&float(i)>uWidth){\n      break;\n    }\n    float val=cos((float(i)/float(N))*pi);\n    float rate=pow(exp(2.*val)/exp(2.),.75);\n    color+=rate*texture2D(uSampler,vTextureCoord+float(i)*ii*uDir/uSize);\n    color+=rate*texture2D(uSampler,vTextureCoord-float(i)*ii*uDir/uSize);\n  }\n  //color.rgb/=color.a;\n  gl_FragColor=uPower*color;\n}\n"},function(t,e,n){"use strict";var r=n(0),i=n(6),o=n.n(i),a=n(19),u=n.n(a),f=function(t,e,n){var i=Object(r.g)(t,e,n);return{program:i,attribLocations:{vertexPosition:r.b.attribFloat(t,i,"aVertexPosition",2),textureCoord:r.b.attribFloat(t,i,"aTextureCoord",2)},uniformLocations:{flipY:r.j.uniform1f(t,i,"uFlipY"),samplerA:r.j.uniformTexture(t,i,"uSamplerA",0),samplerB:r.j.uniformTexture(t,i,"uSamplerB",1)}}};e.a=function(t){return Object.assign(Object(r.i)(t,f,o.a,u.a),{draw:function(e){t.drawElements(t.TRIANGLES,e,t.UNSIGNED_BYTE,0)}})}},function(t,e){t.exports="precision mediump float;\nvarying vec2 vTextureCoord;\nuniform sampler2D uSamplerA;\nuniform sampler2D uSamplerB;\nvoid main()\n{\n  gl_FragColor=texture2D(uSamplerA,vTextureCoord)+texture2D(uSamplerB,vTextureCoord);\n}\n"},,,,,,,,,,,,function(t,e,n){"use strict";n.d(e,"a",(function(){return c}));var r=n(5),i=n.n(r),o=n(3),a=n.n(o),u=n(4),f=n.n(u),l=n(1),c=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[0,0],n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:25,o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:3,u=arguments.length>5&&void 0!==arguments[5]?arguments[5]:.94;a()(this,t),this.options={pos:e,velocity:n,direct:r,lifespan:i,thickness:o,friction:u,gravity:[0,.981],colorStart:[1,0,0,1],colorEnd:[1,1,0,1]},this.init()}return f()(t,[{key:"init",value:function(){this.prevPos=this.options.pos.slice(),this.pos=this.options.pos.slice(),this.velocityPos=[Math.cos(this.options.direct)*this.options.velocity,Math.sin(this.options.direct)*this.options.velocity],this.lifespan=this.options.lifespan,this.maxlife=this.lifespan,this.swing=Math.random()}},{key:"update",value:function(t){l.c.set.apply(l.c,[this.prevPos].concat(i()(this.pos))),l.c.add(this.pos,this.velocityPos);var e=[0,Math.sin(2*this.swing*Math.PI)];l.c.rotate(e,l.b.getAngle(this.velocityPos)),l.c.scale(e,this.lifespan/this.maxlife),l.c.add(this.velocityPos,e),l.c.add(this.velocityPos,this.options.gravity),l.c.scale(this.velocityPos,this.options.friction),this.swing+=.07,this.swing%=1,this.lifespan>0&&(this.lifespan-=t)}},{key:"setColor",value:function(t,e){e&&(this.options.colorStart=e),t&&(this.options.colorEnd=t)}},{key:"positions",get:function(){return[].concat(i()(this.prevPos),i()(this.pos))}},{key:"colors",get:function(){return[].concat(i()(this.options.colorEnd),i()(this.options.colorStart))}},{key:"lineWidths",get:function(){var t=this.lifespan/this.maxlife;return[0,0,0,0].concat([t*Math.min(this.options.thickness/5,1),0,0,0])}}]),t}()},function(t,e,n){"use strict";var r=n(0),i=n(6),o=n.n(i),a=n(33),u=n.n(a),f=function(t,e,n){var i=Object(r.g)(t,e,n);return{program:i,attribLocations:{vertexPosition:r.b.attribFloat(t,i,"aVertexPosition",2),textureCoord:r.b.attribFloat(t,i,"aTextureCoord",2)},uniformLocations:{flipY:r.j.uniform1f(t,i,"uFlipY"),sampler:r.j.uniformTexture(t,i,"uSampler",0),lineWidthSampler:r.j.uniformTexture(t,i,"uLineWidthSampler",1),size:r.j.uniform2fv(t,i,"uSize")}}};e.a=function(t){return Object.assign(Object(r.i)(t,f,o.a,u.a),{draw:function(e){t.drawElements(t.TRIANGLES,e,t.UNSIGNED_BYTE,0)}})}},function(t,e){t.exports="precision mediump float;\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform sampler2D uLineWidthSampler;\nuniform lowp vec2 uSize;\nconst float pi=3.14159265359;\nvoid main()\n{\n  vec4 gaussCol=vec4(0.,0.,0.,0.);\n  float sum=0.;\n  const int lineWidth=5;\n  bool b=false;\n  \n  gaussCol+=texture2D(uSampler,vTextureCoord);\n  sum+=texture2D(uLineWidthSampler,vTextureCoord).r;\n  for(int l=0;l<8;l++)\n  {\n    float angle=2.*pi*float(l)/8.;\n    vec2 pos=vec2(cos(angle),sin(angle));\n    for(int k=1;k<=lineWidth;k++)\n    {\n      float r=float(k);\n      vec2 coord=vTextureCoord+r*pos/uSize;\n      vec4 texCol0=texture2D(uLineWidthSampler,coord);\n      if(texCol0.r>0.){\n        float rr=float(lineWidth)*texCol0.r;\n        if(r<rr){\n          vec4 texCol1=texture2D(uSampler,coord);\n          float rate=r/rr;\n          gaussCol+=vec4(texCol1.rgb*rate,rate);\n          sum+=texCol0.r*smoothstep(1.,0.,rate);\n        }\n      }\n    }\n  }\n  \n  /*for(int j=-lineWidth;j<=lineWidth;j++)\n  {\n    for(int i=-lineWidth;i<=lineWidth;i++)\n    {\n      vec2 pos=vec2(i,j);\n      vec2 coord=vTextureCoord+pos/uSize;\n      vec4 texCol0=texture2D(uLineWidthSampler,coord);\n      \n      if(texCol0.r>0.){\n        float r=length(pos);\n        float rr=float(lineWidth)*texCol0.r;\n        \n        if(r<rr){\n          vec4 texCol1=texture2D(uSampler,coord);\n          float rate=r/rr;\n          gaussCol+=vec4(texCol1.rgb,rate);\n          sum+=texCol0.r*smoothstep(1.,0.,rate);\n        }\n      }\n    }\n  }*/\n  /*if(b||sum>1.){\n    sum=1.;\n  }*/\n  gaussCol.rgb/=gaussCol.w;\n  \n  gl_FragColor=vec4(gaussCol.rgb*sum,sum);\n  \n}"},function(t,e,n){"use strict";var r=n(0),i=n(35),o=n.n(i),a=n(36),u=n.n(a),f=function(t,e,n){var i=Object(r.g)(t,e,n);return{program:i,attribLocations:{vertexPosition:r.b.attribFloat(t,i,"aVertexPosition",2),vertexColor:r.b.attribFloat(t,i,"aVertexColor",4)},uniformLocations:{flipY:r.j.uniform1f(t,i,"uFlipY"),size:r.j.uniform2fv(t,i,"uSize")}}};e.a=function(t){return Object.assign(Object(r.i)(t,f,o.a,u.a),{draw:function(e,n){t.drawArrays(e,0,n)}})}},function(t,e){t.exports="attribute vec2 aVertexPosition;\nattribute vec4 aVertexColor;\nuniform float uFlipY;\nuniform vec2 uSize;\nvarying lowp vec4 vColor;\nvoid main(void){\n  vColor=aVertexColor;\n  gl_Position=vec4((2.*aVertexPosition/uSize+vec2(-1.,-1.))*vec2(1.,uFlipY),0.,1.);\n  //gl_PointSize=10.;\n}"},function(t,e){t.exports="precision mediump float;\nvarying lowp vec4 vColor;\n\nvoid main(void){\n  gl_FragColor=vColor;\n}"},,,,,,function(t,e){function n(e){return t.exports=n=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},n(e)}t.exports=n},function(t,e,n){var r=n(83);t.exports=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&r(t,e)}},function(t,e,n){var r=n(84),i=n(85);t.exports=function(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?i(t):e}},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e){function n(e,r){return t.exports=n=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},n(e,r)}t.exports=n},function(t,e){function n(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?t.exports=n=function(t){return typeof t}:t.exports=n=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(e)}t.exports=n},function(t,e){t.exports=function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}},,,,,,,,,,function(t,e,n){"use strict";n.r(e);var r=n(5),i=n.n(r),o=n(31),a=n(43),u=n.n(a),f=n(44),l=n.n(f),c=n(42),s=n.n(c),h=n(3),v=n.n(h),d=n(4),m=n.n(d),p=n(1),g=n(2),b=n(9);function x(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=s()(t);if(e){var i=s()(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return l()(this,n)}}var S=function(t){u()(n,t);var e=x(n);function n(t,r,i,o,a,u){var f;return v()(this,n),(f=e.call(this,t)).setSegmentAngleParameter(r,i),f.setSegmentPosParameter(o,a,u),f.init(),f}return m()(n,[{key:"setSegmentAngleParameter",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:.1,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:.3;this.angle_swing=t,this.angle_limit=e}},{key:"setSegmentPosParameter",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:2,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:80,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:40;this.data_deform=t,this.data_wave=e,this.data_limit=n}},{key:"init",value:function(){this.initSegmentAngle(this.angle_swing,this.angle_limit,b.b),this.initSegmentPos(),this.segmentShow=this.segmentPos}},{key:"update",value:function(){this.swingSegmentAngle(this.angle_swing,this.angle_limit,b.b),this.initSegmentPos(),this.deformSegmentPos(this.segmentAngle,this.data_deform),this.waveSegmentPos(this.segmentAngle,this.data_wave),this.limitSegmentPos(this.data_limit)}},{key:"flow",value:function(t,e){this.segmentShow=this.setPosToLineData(this.segmentPos,t,e)}},{key:"toString",value:function(){}}]),n}(function(){function t(e){v()(this,t),this.segmentNum=e,this.segmentAngle=this.createSegmentAngle(e),this.segmentPos=this.createSegmentPos(e+1)}return m()(t,[{key:"createSegmentAngle",value:function(t){for(var e=new Array(t),n=0;n<t;n++)e[n]=0;return e}},{key:"initSegmentAngle",value:function(t,e,n){for(var r=this.segmentAngle,i=Math.floor(Math.random()*n.length),o=0,a=0,u=r.length;a<u;a++)o=.2*o+t*n[(a+i)%n.length],r[a]=o;return this.limitSegmentAngle(e),this.balanceSegmentAngle(),this}},{key:"swingSegmentAngle",value:function(t,e,n){for(var r,i=this.segmentAngle,o=Math.floor(Math.random()*n.length),a=i.length-1;a>=0;a--)r=a-1>=0?i[a-1]:t*n[(a+o-1+n.length)%n.length],i[a]=.5*i[a]+.5*r+t*n[(a+o)%n.length];this.limitSegmentAngle(e),this.balanceSegmentAngle()}},{key:"limitSegmentAngle",value:function(t){for(var e=this.segmentAngle,n=0,r=e.length;n<r;n++)e[n]=g.a.clamp(e[n],-t,t)}},{key:"balanceSegmentAngle",value:function(){for(var t=this.segmentAngle,e=t.reduce((function(t,e){return t+e}),0),n=t.length,r=-e/n,i=0;i<n;i++)t[i]+=r}},{key:"createSegmentPos",value:function(t){for(var e=new Array(t+1),n=0;n<=t;n++)e[n]=[0,0];return e}},{key:"initSegmentPos",value:function(){for(var t=this.segmentPos,e=0,n=t.length;e<n;e++)t[e][0]=0,t[e][1]=0;return this}},{key:"deformSegmentPos",value:function(t,e){var n=this.segmentPos;if(0!==e)for(var r=t.length,i=0,o=[0,0],a=0,u=[0,0],f=0,l=0;l<=r;l++)f=e*(1-l/r),l>0&&(i+=t[l-1],o[0]+=Math.cos(i)-1,o[1]+=Math.sin(i)),n[l][0]+=o[0]*f,n[l][1]+=o[1]*f,r+1-l<r&&(a-=t[r+1-l],u[0]-=Math.cos(a)-1,u[1]-=Math.sin(a)),n[r-l][0]+=u[0]*f,n[r-l][1]+=u[1]*f;return this}},{key:"waveSegmentPos",value:function(t,e){var n=this.segmentPos;if(0!==e)for(var r=t.length,i=0,o=0,a=0,u=0;u<=r;u++)a=u/r,a=Math.sin(a*Math.PI)*e*(1-a),u>0&&(i+=Math.sin(.2*t[u-1])/Math.cos(t[u-1])),n[u][1]+=i*a,r+1-u<r&&(o-=Math.sin(.2*t[r+1-u])/Math.cos(t[r+1-u])),n[r-u][1]+=o*a;return this}},{key:"limitSegmentPos",value:function(t){for(var e=this.segmentPos,n=e.length-1,r=-1/0,i=1/0,o=0;o<=n;o++)e[o][1]>r?r=e[o][1]:e[o][1]<i&&(i=e[o][1]);var a=r-i;if(a>t)for(var u=0;u<=n;u++)e[u][1]*=t/a;return this}},{key:"setPosToLineData",value:function(t,e,n){for(var r=new Array(t.length),i=Math.atan2(n[1]-e[1],n[0]-e[0]),o=0,a=t.length;o<a;o++)r[o]=p.b.add(p.b.rotate(t[o],i),p.b.mix(e,n,o/(a-1)));return r}}]),t}()),y=n(0),E=n(32),A=n(16),T=n(18),R=n(34);function _(t){var e=[[0,0],[1,0],[1,1],[0,1]].flat(),n=Object(y.a)(t,e,2),r=[[0,0],[1,0],[1,1],[0,1]].flat(),i=Object(y.a)(t,r,2),o=[[0,1,3],[1,2,3]].flat();return{positionBufferData:n,textureCoordinatesBufferData:i,indicesBufferData:Object(y.d)(t,o)}}function D(t){return{positionBufferData:Object(y.a)(t,[],2),colorBufferData:Object(y.a)(t,[],4),lineWidthBufferData:Object(y.a)(t,[],4)}}!function(){var t=document.querySelector("#glcanvas"),e=t.getContext("webgl",{alpha:!1});if(!e)return void alert("無法初始化WebGL。您的瀏覽器或機器可能不支持它。");var n={lineShader:Object(R.a)(e),lineWidthShader:Object(E.a)(e),blurShader:Object(A.a)(e),addShader:Object(T.a)(e)},r={face:_(e),line:D(e)},a=[0,0];t.addEventListener("mousemove",(function(t){p.c.set(a,t.pageX,t.pageY)}));var u=[e.canvas.clientWidth,e.canvas.clientHeight],f={lineColor:Object(y.c)(e),lineWidth:Object(y.c)(e),line:Object(y.c)(e),blurX:Object(y.c)(e),blurY:Object(y.c)(e)},l=[],c=0,s=[];s.push({data:new S(100,.05,.15),posStart:[200,100],posEnd:[0,0]}),s.push({data:new S(100,.05,.15),posStart:[600,100],posEnd:[0,0]}),s.push({data:new S(100,.05,.15),posStart:[600,500],posEnd:[0,0]}),s.push({data:new S(100,.05,.15),posStart:[200,500],posEnd:[0,0]}),requestAnimationFrame((function t(h){var v=.001*(h-c);c=h,requestAnimationFrame(t),function(t,e,n,r,a){var u=a.delta,f=a.mPos,l=a.framebufferTextures,c=a.electricitys,s=a.particles,h=a.size,v=n.line,d=e.lineShader;d.use(),d.uniformSet({size:h,flipY:1}),d.attribSet({vertexPosition:v.positionBufferData.buffer}),s.forEach((function(t,e,n){t.update(u),t.lifespan<=0&&n.splice(e,1)}));var m=s.flatMap((function(t){return t.positions})),g=s.flatMap((function(t){return t.colors})),b=s.flatMap((function(t){return t.lineWidths}));n.line.positionBufferData.set(m),n.line.colorBufferData.set(g),n.line.lineWidthBufferData.set(b),d.attribSet({vertexColor:v.colorBufferData.buffer}),Object(y.k)(t,l.lineColor),d.draw(t.LINES,v.positionBufferData.data.length/2),d.attribSet({vertexColor:v.lineWidthBufferData.buffer}),Object(y.k)(t,l.lineWidth),d.draw(t.LINES,v.positionBufferData.data.length/2),c.forEach((function(e,r){p.c.set.apply(p.c,[e.posEnd].concat(i()(f)));var a=p.b.distance(e.posStart,e.posEnd);if(a<400){if(Math.random()>.7){var u=new o.a(e.posStart,2+14*Math.random(),2*Math.random()*Math.PI,25+25*Math.random(),2+3*Math.random());u.setColor([.25,1,.75,1],[.05,1,1,1]),s.push(u)}Math.random()>.95&&e.data.init();var c=function(t,e,n,r){t.data_deform=r,t.data_wave=t.data_limit*r,t.update(),t.flow(e,n);var i=t.segmentShow.flat(),o=t.segmentShow.flatMap((function(){return[.25,1,1,1]})),a=t.segmentShow.flatMap((function(t,e,n){return[.3+.2*(1-Math.abs(e-.5*(n.length-1))/(.5*(n.length-1))),0,0,0]}));return{positions:i,colors:o,lineWidths:a}}(e.data,e.posStart,e.posEnd,a/e.data.segmentNum);c.lineWidths.forEach((function(t,e,n){var r=1-Math.pow(Math.min(a/400,1),5);e%4==0&&(n[e]*=.6+.4*r)})),n.line.positionBufferData.set(c.positions),n.line.colorBufferData.set(c.colors),n.line.lineWidthBufferData.set(c.lineWidths)}else n.line.positionBufferData.set([]),n.line.colorBufferData.set([]),n.line.lineWidthBufferData.set([]);d.attribSet({vertexColor:v.colorBufferData.buffer}),Object(y.k)(t,l.lineColor,!1),d.draw(t.LINE_STRIP,v.positionBufferData.data.length/2),d.attribSet({vertexColor:v.lineWidthBufferData.buffer}),Object(y.k)(t,l.lineWidth,!1),d.draw(t.LINE_STRIP,v.positionBufferData.data.length/2)}));var x=n.face,S=e.lineWidthShader;S.use(),S.attribSet({vertexPosition:x.positionBufferData.buffer,textureCoord:x.textureCoordinatesBufferData.buffer}),S.uniformSet({size:h,flipY:1,sampler:l.lineColor.texture,lineWidthSampler:l.lineWidth.texture}),Object(y.k)(t,l.line),S.draw(x.indicesBufferData.length);var E=n.face,A=e.blurShader;A.use(),A.attribSet({vertexPosition:E.positionBufferData.buffer,textureCoord:E.textureCoordinatesBufferData.buffer}),A.uniformSet({size:h,flipY:1,sampler:l.line.texture,width:10,power:.125,dir:[1,0]}),Object(y.k)(t,l.blurX),A.draw(E.indicesBufferData.length),A.uniformSet({sampler:l.blurX.texture,dir:[0,1]}),Object(y.k)(t,l.blurY),A.draw(E.indicesBufferData.length);var T=n.face,R=e.addShader;R.use(),R.attribSet({vertexPosition:T.positionBufferData.buffer,textureCoord:T.textureCoordinatesBufferData.buffer}),R.uniformSet({flipY:-1,samplerA:l.line.texture,samplerB:l.blurY.texture}),Object(y.k)(t),R.draw(T.indicesBufferData.length)}(e,n,r,0,{delta:v,mPos:a,framebufferTextures:f,electricitys:s,particles:l,size:u})}))}()}]);