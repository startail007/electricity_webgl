attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uProjectionMatrix;
varying highp vec2 vTextureCoord;
uniform float uFlipY;
void main(void){
  vTextureCoord=(aTextureCoord-vec2(0.5,0.5))*vec2(1.0,uFlipY)+vec2(0.5,0.5);
  // gl_Position=uProjectionMatrix*vec4((2.*aVertexPosition+vec2(-1.,-1.))*vec2(1.,uFlipY),0.,1.);
  gl_Position=uProjectionMatrix*vec4(aVertexPosition,0.,1.);
}