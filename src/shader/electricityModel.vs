attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform float uLength;
uniform float uStartlineWidth;
uniform float uEndlineWidth;
uniform float uStartRadius;
uniform float uEndRadius;
uniform float uOffset;

varying vec2 vTextureCoord;
varying vec2 vPos;
varying vec2 vSize;
varying vec2 vDir;
varying float vStartRadius;
varying float vEndRadius;
varying float vStartlineWidth;
varying float vEndlineWidth;
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
  
  vStartRadius=uStartRadius;
  vEndRadius=uEndRadius;
  vOffset=uOffset;
  
  vStartlineWidth=uStartlineWidth;
  vEndlineWidth=uEndlineWidth;
  vSize=vec2(uLength,0.)+max(vStartlineWidth,vEndlineWidth)*2.*(1.+8.)+abs(vOffset)*2.*vec2(1.,1.)+max(uStartRadius,uEndRadius)*.5;
  vTextureCoord=aTextureCoord;
  
  /*vec2 aspectRatio=vec2(vSize.x/vSize.y,1.);
  vec2 coord=vTextureCoord*aspectRatio;
  float gradualVal=(coord.x-.5)/(aspectRatio.x-1.);
  float swing=sin(gradualVal*pi);
  vec4 pos=uModelViewMatrix*vec4(aVertexPosition*rotCoord(.05*(gradualVal-.5)*pi)*vSize*.5+vec2(0.,60.)*swing,0.,1.);*/
  
  /*float start=.5;
  float end=(vSize.x/vSize.y)-.5;
  float rate=(vTextureCoord.x*(vSize.x/vSize.y)-start)/(end-start);
  
  vec2 offset=getQuadraticCurveTo(vec2(0.,0.),vec2(uLength*.5,uOffset*2.),vec2(uLength,0.),rate);
  vec2 tangent=getQuadraticCurveToTangent(vec2(0.,0.),vec2(uLength*.5,uOffset*2.),vec2(uLength,0.),rate);
  float a=atan(tangent.x,-tangent.y);
  mat4 rotation=mat4(
    vec4(1.,0.,0.,0.),
    vec4(cos(a),sin(a),0.,0.),
    vec4(-sin(a),cos(a),0.,0.),
    vec4(0.,0.,0.,1.)
  );
  vec4 pos=uModelViewMatrix*rotation*vec4(aVertexPosition*vSize*.5,0.,1.);
  pos+=uModelViewMatrix*vec4(offset*vec2(0.,1.),0.,0.);*/
  
  vec4 pos=uModelViewMatrix*vec4(aVertexPosition*vSize*.5,0.,1.);
  
  vPos=pos.xy;
  vDir=(uModelViewMatrix*vec4(vec2(1.,0.),0.,1.)-uModelViewMatrix*vec4(vec2(0.,0.),0.,1.)).xy;
  
  gl_Position=uProjectionMatrix*pos;
}
