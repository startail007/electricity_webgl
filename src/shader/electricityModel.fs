precision mediump float;
varying vec2 vTextureCoord;
varying vec2 vPos;
varying vec2 vSize;
varying vec2 vDir;
varying float vStartRadius;
varying float vEndRadius;
varying float vStartlineWidth;
varying float vEndlineWidth;
varying float vOffset;

uniform sampler2D uSampler;
uniform vec2 uMouse;
uniform float uTime;
uniform float uStartDensity;
uniform float uEndDensity;
uniform float uStartFixed;
uniform float uEndFixed;
uniform bool uWireframe;

const float pi=3.14159265359;

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
  vec4 highColor=vec4(.69,.92,.86,1);
  vec4 baseColor=vec4(.38,.85,.77,1);
  vec4 glowColor=vec4(.21,.63,.67,1);
  vec4 endColor=vec4(.2,.25,.91,1.);
  vec4 color=mix(.5*baseColor,highColor,pow(highColorRate,4.))*endColorRate;
  color=mix(.25*glowColor,color,pow(baseColorRate,2.))*endColorRate;
  color=mix(.125*endColor,color,pow(glowColorRate,1.))*endColorRate;
  return color;
}
vec4 distLightLine(vec2 p,vec2 a,vec2 b,float w){
  float d=distLine(p,a,b,w);
  return drawLight(d);
}
mat2 rotCoord(float a){
  float sin_factor=sin(a);
  float cos_factor=cos(a);
  mat2 rot=mat2(cos_factor,sin_factor,-sin_factor,cos_factor);
  return rot;
}
vec3 getNoise(sampler2D sampler,vec2 uv,float time,float startDensity,float endDensity){
  float ff=abs(texture2D(sampler,fract((uv+vec2(-time,-time)))*.001).r*2.-1.);
  
  vec2 uv0x=fract((uv+vec2(-time,0.))*startDensity);
  vec2 uv1x=fract((uv+vec2(-time,0.))*endDensity);
  vec2 uv0y=fract((uv+vec2(0.,-time))*startDensity);
  vec2 uv1y=fract((uv+vec2(0.,-time))*endDensity);
  
  float f0=(.5*(texture2D(sampler,uv0x).r+texture2D(sampler,uv0y).g)*2.-1.)*2.*pi;
  float f1=(.5*(texture2D(sampler,uv1x).r+texture2D(sampler,uv1y).g)*2.-1.)*2.*pi;
  return vec3(f0,f1,ff);
}

vec2 getMove(float gradualVal,vec2 dir,float startRadius,float endRadius,float startFixed,float endFixed,vec3 noise){
  float swing=sin(gradualVal*pi);
  swing=1.-pow(1.-swing,2.);
  float a=atan(dir.y,dir.x);
  vec2 move0=startRadius*mix(1.-startFixed,1.,swing)*vec2(cos(noise.x),sin(noise.x))*rotCoord(a);
  vec2 move1=endRadius*mix(1.-endFixed,1.,swing)*vec2(cos(noise.y),sin(noise.y))*rotCoord(a);
  return noise.z*mix(move0,move1,gradualVal);
}
vec2 getQuadraticCurveTo(vec2 p0,vec2 p1,vec2 p2,float t){
  return p0*(1.-t)*(1.-t)+p1*2.*(1.-t)*t+p2*t*t;
}
vec2 getQuadraticCurveToTangent(vec2 p0,vec2 p1,vec2 p2,float t){
  return 2.*t*(p0-p1*2.+p2)+2.*(-p0+p1);
}
void main(void){
  vec4 color=vec4(0.);
  
  //float len=smoothstep(1.,0.,length(vPos-uMouse)/10.);
  //color+=vec4(vec3(len),1.);
  
  if(uWireframe){
    vec2 lineWidth=1./vSize;
    if(vTextureCoord.x<lineWidth.x||vTextureCoord.x>1.-lineWidth.x||vTextureCoord.y<lineWidth.y||vTextureCoord.y>1.-lineWidth.y){
      color+=.5*vec4(1.,0.,0.,1.);
    }
  }
  vec2 aspectRatio=vec2(vSize.x/vSize.y,1.);
  vec2 coord=vTextureCoord*aspectRatio;
  vec2 startPos=(vec2(0.,.5)*aspectRatio+vec2(.5,0.));
  vec2 endPos=(vec2(1.,.5)*aspectRatio-vec2(.5,0.));
  vec3 noise=getNoise(uSampler,vPos*.003,uTime,uStartDensity*.5,uEndDensity*.5);
  //float gradualVal=gradual(coord,startPos,endPos);
  float gradualVal=(coord.x-.5)/(aspectRatio.x-1.);
  gradualVal=clamp(gradualVal,0.,1.);
  
  vec2 move=getMove(gradualVal,vDir,vStartRadius,vEndRadius,uStartFixed,uEndFixed,noise)/vSize.y;
  coord+=move;
  {
    float rr=vStartlineWidth/vSize.y;
    float d=length(coord-startPos)/rr;
    color+=drawLight(d);
  }
  {
    float rr=vStartlineWidth/vSize.y;
    float d=length(coord-endPos)/rr;
    color+=drawLight(d);
  }
  vec2 offset=getQuadraticCurveTo(vec2(0.,0.),vec2(.5,vOffset*2.),vec2(1.,0.),gradualVal);
  coord+=offset.y*vec2(0.,-1.)/vSize.y;
  
  float startR=vStartlineWidth/vSize.y;
  float endR=vEndlineWidth/vSize.y;
  float r=mix(startR,endR,gradualVal);
  
  color+=distLightLine(coord,startPos,endPos,r*(1.-.5*sin(gradualVal*pi)));
  
  for(int i=0;i<2;i++){
    vec3 noise0=getNoise(uSampler,vPos*.001,uTime*.75+float(i+1)*noise.z,max(uStartDensity*.5,.3),max(uEndDensity*.5,.3));
    float startPosRate=cos(noise0.r)*.5+.5;
    float endPosRate=sin(noise0.g)*.5+.5;
    vec2 startPos0=mix(startPos,endPos,startPosRate);
    vec2 endPos0=mix(startPos,endPos,endPosRate);
    //float gradualVal0=gradual(coord,startPos0,endPos0);
    float gradualVal0=clamp((coord.x-startPos0.x)/(endPos0.x-startPos0.x),0.,1.);
    vec2 move0=sin(gradualVal0*pi)*getMove(gradualVal0,vDir,vStartRadius*1.+vStartlineWidth,vEndRadius*1.+vEndlineWidth,.7,.7,noise0)/vSize.y;
    float r0=mix(mix(startR,endR,startPosRate),mix(startR,endR,endPosRate),gradualVal0)*.5;
    r0*=1.-.5*sin(gradualVal0*pi);
    color+=distLightLine(coord+move0,startPos0,endPos0,r0);
  }
  
  //color+=distLightLine(coord,mix(startPos,endPos,.5),mix(startPos,endPos,.5)+vec2(0.,.2),.01,1.5);
  gl_FragColor=color;
}