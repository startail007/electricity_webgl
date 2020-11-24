attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform float uLength;
uniform float ulineWidth;
uniform float uStartRadius;
uniform float uEndRadius;

varying vec2 vTextureCoord;
varying vec2 vPos;
varying vec2 vSize;
varying vec2 vDir;
varying float vlineWidth;
varying float vStartRadius;
varying float vEndRadius;

void main(void){
  vStartRadius=uStartRadius;
  vEndRadius=uEndRadius;
  vlineWidth=ulineWidth;
  vSize=vec2(uLength,0.)+ulineWidth*2.+ulineWidth*2.*8.+max(uStartRadius,uEndRadius);
  vTextureCoord=aTextureCoord;
  vec4 pos=uModelViewMatrix*vec4(aVertexPosition*vSize*.5,0.,1.);
  vPos=pos.xy;
  vDir=(uModelViewMatrix*vec4(vec2(1.,0.),0.,1.)-uModelViewMatrix*vec4(vec2(0.,0.),0.,1.)).xy;
  gl_Position=uProjectionMatrix*pos;
}