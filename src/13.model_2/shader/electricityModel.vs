attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uProjectionMatrix;
uniform float uLength;
uniform vec2 uThickness;
uniform vec2 uRadius;
uniform float uExpand;

varying vec2 vTextureCoord;
varying vec2 vSize;
varying vec2 vDir;
varying vec2 vRadius;
varying vec2 vThickness;
varying float vOffset;
const float pi=3.14159265359;
mat2 rotCoord(float a){
  float sin_factor=sin(a);
  float cos_factor=cos(a);
  mat2 rot=mat2(cos_factor,sin_factor,-sin_factor,cos_factor);
  return rot;
}
vec2 getQuadraticCurveTo(vec2 p0,vec2 p1,vec2 p2,float t){
  return p0*(1.-t)*(1.-t)+p1*2.*(1.-t)*t+p2*t*t;
}
vec2 getQuadraticCurveToTangent(vec2 p0,vec2 p1,vec2 p2,float t){
  return 2.*t*(p0-p1*2.+p2)+2.*(-p0+p1);
}
void main(void){
  vRadius=uRadius;
  vThickness=uThickness;
  vSize=vec2(uLength,0.)+vec2(uExpand);
  vTextureCoord=aTextureCoord;
  vDir=vec2(1.0,0.0);
  gl_Position=uProjectionMatrix*vec4(aVertexPosition,0.,1.);
}

