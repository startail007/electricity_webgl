attribute vec2 aVertexPosition;
attribute vec4 aVertexColor;
uniform float uFlipY;
uniform vec2 uSize;
varying lowp vec4 vColor;
void main(void){
  vColor=aVertexColor;
  gl_Position=vec4((2.*aVertexPosition/uSize+vec2(-1.,-1.))*vec2(1.,uFlipY),0.,1.);
  //gl_PointSize=10.;
}