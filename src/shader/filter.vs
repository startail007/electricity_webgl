attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
varying highp vec2 vTextureCoord;
varying highp vec2 vertPos;
uniform float uFlipY;
void main(void){
  vTextureCoord=aTextureCoord;
  vertPos=aVertexPosition;
  gl_Position=vec4((2.*aVertexPosition+vec2(-1.,-1.))*vec2(1.,uFlipY),0.,1.);
}