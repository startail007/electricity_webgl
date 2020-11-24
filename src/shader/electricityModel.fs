precision mediump float;
varying vec2 vTextureCoord;
varying vec2 vPos;
varying vec2 vSize;
varying vec2 vDir;
varying float vlineWidth;
varying float vStartRadius;
varying float vEndRadius;

uniform sampler2D uSampler;
uniform vec2 uMouse;
uniform float uTime;
uniform float uStartDensity;
uniform float uEndDensity;
uniform float uStartFixed;
uniform float uEndFixed;

const float pi=3.14159265359;
const int OCTAVE_NUM=5;

float gradual(vec2 p,vec2 a,vec2 b){
  vec2 pa=p-a;
  vec2 ba=b-a;
  return clamp(dot(pa,ba)/dot(ba,ba),0.,1.);
}
float distLine(vec2 p,vec2 a,vec2 b,float w){
  vec2 pa=p-a;
  vec2 ba=b-a;
  float t=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);
  return length(pa-ba*t)/w;
}
vec4 drawLight(float d){
  float highColorRate=smoothstep(1.,0.,d);
  float baseColorRate=smoothstep(1.,0.,d/2.);
  float glowColorRate=smoothstep(1.,0.,d/4.);
  float endColorRate=smoothstep(1.,0.,d/8.);
  vec4 highColor=vec4(1.,1.,1.,1.);
  vec4 baseColor=vec4(.35,.98,.98,1.);
  vec4 glowColor=vec4(.28,.73,.78,1.);
  vec4 endColor=vec4(.2,.25,.91,1.);
  vec4 color=mix(.5*baseColor,highColor,pow(highColorRate,2.))*endColorRate;
  color=mix(.25*glowColor,color,pow(baseColorRate,1.))*endColorRate;
  color=mix(.125*endColor,color,pow(glowColorRate,.5))*endColorRate;
  return color;
}
vec4 distLightLine(vec2 p,vec2 a,vec2 b,float w){
  float d=distLine(p,a,b,w);
  return drawLight(d);
}
vec3 random3(vec3 p){
  vec3 f=vec3(
    dot(p,vec3(127.1,311.7,69.5)),
    dot(p,vec3(269.5,183.3,132.7)),
    dot(p,vec3(247.3,108.5,96.5))
  );
  return-1.+2.*fract(sin(f)*43758.5453123);
}
float noise_perlin(vec3 p){
  vec3 i=floor(p);
  vec3 s=fract(p);
  float a=dot(random3(i),s);
  float b=dot(random3(i+vec3(1,0,0)),s-vec3(1,0,0));
  float c=dot(random3(i+vec3(0,1,0)),s-vec3(0,1,0));
  float d=dot(random3(i+vec3(0,0,1)),s-vec3(0,0,1));
  float e=dot(random3(i+vec3(1,1,0)),s-vec3(1,1,0));
  float f=dot(random3(i+vec3(1,0,1)),s-vec3(1,0,1));
  float g=dot(random3(i+vec3(0,1,1)),s-vec3(0,1,1));
  float h=dot(random3(i+vec3(1,1,1)),s-vec3(1,1,1));
  //vec3 u=smoothstep(0.,1.,s);
  vec3 u=s*s*(3.-2.*s);
  return mix(mix(mix(a,b,u.x),mix(c,e,u.x),u.y),mix(mix(d,f,u.x),mix(g,h,u.x),u.y),u.z);
}
float fbm_noise_perlin(vec3 p){
  float f=0.;
  float a=1.;
  for(int i=0;i<OCTAVE_NUM;i++)
  {
    f+=a*noise_perlin(p);
    p=2.*p;
    a/=2.;
  }
  return f;
}
mat2 rotCoord(float a){
  float sin_factor=sin(a);
  float cos_factor=cos(a);
  mat2 rot=mat2(cos_factor,sin_factor,-sin_factor,cos_factor);
  return rot;
}
void main(void){
  vec4 color=vec4(0.);
  
  //color+=texture2D(uSampler,vTextureCoord);
  
  //float len=smoothstep(1.,0.,length(vPos-uMouse)/100.);
  //color+=vec4(vec3(len),1.);
  
  vec2 aspectRatio=vec2(vSize.x/vSize.y,1.);
  vec2 lineWidth=1./vSize;
  if(vTextureCoord.x<lineWidth.x||vTextureCoord.x>1.-lineWidth.x||vTextureCoord.y<lineWidth.y||vTextureCoord.y>1.-lineWidth.y){
    color+=.5*vec4(1.,0.,0.,1.);
  }
  vec2 coord=vTextureCoord*aspectRatio;
  vec2 startPos=vec2(0.,.5)*aspectRatio+vec2(aspectRatio.y*.5,0.);
  vec2 endPos=vec2(1.,.5)*aspectRatio-vec2(aspectRatio.y*.5,0.);
  
  //float r=(.25+.75*gradual01)*aspectRatio.y*.5/4.;
  float r=vlineWidth/vSize.y;
  float a=atan(vDir.y,vDir.x);
  float gradual01=gradual(coord,startPos,endPos);
  float swing=sin(gradual01*pi);
  swing=1.-pow(1.-swing,2.);
  float pp=noise_perlin(vec3(vPos*.01,uTime*3.));
  float f0=fbm_noise_perlin(vec3(vPos*uStartDensity,uTime*3.))*2.*pi;
  float f1=fbm_noise_perlin(vec3(vPos*uEndDensity,uTime*3.))*2.*pi;
  vec2 move0=vStartRadius*mix(1.-uStartFixed,1.,swing)*vec2(cos(f0),sin(f0))*rotCoord(a-f0)/vSize.y;
  vec2 move1=vEndRadius*mix(1.-uEndFixed,1.,swing)*vec2(cos(f1),sin(f1))*rotCoord(a-f1)/vSize.y;
  coord+=abs(pp)*mix(move0,move1,gradual01);
  //float len=smoothstep(1.,0.,length(mix(vec2(0.-.25,.5)*aspectRatio,vec2(1.+.25,.5)*aspectRatio,fract(uTime*.5))-coord)/2.);
  color+=distLightLine(coord,startPos,endPos,r);
  gl_FragColor=color;
}