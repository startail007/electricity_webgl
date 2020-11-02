attribute vec2 aVertexPosition;
attribute vec4 aVertexColor;
attribute vec2 aTextureCoord;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
varying lowp vec4 vColor;
varying highp vec2 vTextureCoord;
varying highp vec2 vertPos;
void main(void){
  vColor=aVertexColor;
  vTextureCoord=aTextureCoord;
  vertPos=aVertexPosition;
  gl_Position=uProjectionMatrix*uModelViewMatrix*vec4((2.*aVertexPosition+vec2(-1.,-1.))*vec2(1.,-1.),0.,1.);
}