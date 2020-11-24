precision mediump float;
varying vec2 vTextureCoord;
uniform lowp vec2 uSize;
uniform float uTime;
uniform vec2 uStartPos;
uniform vec2 uControlPos;
uniform vec2 uEndPos;
uniform float uLineSrcRate;
uniform vec2 uLineTargetPos;

uniform float uLineWidth;
uniform bool uOffsetBool;

const float pi=3.14159265359;
const int OCTAVE_NUM=5;

float distLine(vec2 p,vec2 a,vec2 b,float w){
  vec2 pa=p-a;
  vec2 ba=b-a;
  float t=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);
  return length(pa-ba*t)/w;
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

float cross(vec2 v0,vec2 v1){
  return v0.x*v1.y-v0.y*v1.x;
}
vec2 getQuadraticCurveTo(vec2 p0,vec2 p1,vec2 p2,float t){
  return p0*(1.-t)*(1.-t)+p1*2.*(1.-t)*t+p2*t*t;
}
vec2 getQuadraticCurveToTangent(vec2 p0,vec2 p1,vec2 p2,float t){
  return 2.*t*(p0-p1*2.+p2)+2.*(-p0+p1);
}

float quadraticCurveGradual(vec2 p,vec2 a,vec2 b,vec2 c,float w){
  float s=.5;
  float rate=.5;
  const int N=8;
  vec2 p0=getQuadraticCurveTo(a,b,c,0.);
  vec2 p2=getQuadraticCurveTo(a,b,c,1.);
  vec2 p1=getQuadraticCurveTo(a,b,c,rate);
  for(int i=0;i<N;i++){
    vec2 t=getQuadraticCurveToTangent(a,b,c,rate);
    t=vec2(-t.y,t.x);
    if(cross(p-p1,t)<0.){
      rate-=s*.5;
      p2=p1;
    }else{
      rate+=s*.5;
      p0=p1;
    }
    s*=.5;
    p1=getQuadraticCurveTo(a,b,c,rate);
  }
  return rate;
}
vec2 quadraticCurve(vec2 p,vec2 a,vec2 b,vec2 c,float w){
  float s=.5;
  float rate=.5;
  const int N=8;
  vec2 p0=getQuadraticCurveTo(a,b,c,0.);
  vec2 p2=getQuadraticCurveTo(a,b,c,1.);
  vec2 p1=getQuadraticCurveTo(a,b,c,rate);
  for(int i=0;i<N;i++){
    vec2 t=getQuadraticCurveToTangent(a,b,c,rate);
    t=vec2(-t.y,t.x);
    if(cross(p-p1,t)<0.){
      rate-=s*.5;
      p2=p1;
    }else{
      rate+=s*.5;
      p0=p1;
    }
    s*=.5;
    p1=getQuadraticCurveTo(a,b,c,rate);
  }
  return vec2(distLine(p,p0,p2,w),rate);
}

vec4 distLightLine(vec2 p,vec2 a,vec2 b,vec2 c,float w){
  vec2 quadraticCurveData=quadraticCurve(p,a,b,c,w);
  float d=quadraticCurveData.x;
  
  float highColorRate=smoothstep(1.,0.,d);
  float baseColorRate=smoothstep(1.,0.,d/4.);
  float glowColorRate=smoothstep(1.,0.,d/16.);
  vec4 highColor=vec4(1.,1.,1.,1.);
  vec4 baseColor=vec4(.5,1.,1.,0.);
  vec4 glowColor=vec4(.25,1.,1.,1.);
  return highColorRate*highColor+.5*pow(baseColorRate,2.)*baseColor+.25*pow(glowColorRate,4.)*glowColor;
}
float gradual(vec2 p,vec2 a,vec2 b){
  vec2 pa=p-a;
  vec2 ba=b-a;
  return clamp(dot(pa,ba)/dot(ba,ba),0.,1.);
}
void main()
{
  
  vec2 lineStartPos,lineEndPos,lineControlPos;
  if(uOffsetBool){
    lineStartPos=getQuadraticCurveTo(uStartPos,uControlPos,uEndPos,uLineSrcRate);
    lineEndPos=uLineTargetPos;
    lineControlPos=mix(lineStartPos,lineEndPos,.5)+vec2(0.,0.);
  }
  vec4 color=vec4(0.);
  float len=distance(uStartPos,uEndPos);
  vec2 aspectRatio=vec2(uSize.x/uSize.y,1.);
  vec2 coord=vTextureCoord*uSize;
  {
    //float gradualVal=quadraticCurveGradual(coord,uStartPos,uControlPos,uEndPos,1.);
    float gradualVal=gradual(coord,uStartPos,uEndPos);
    float gradualVal1=0.;
    if(uOffsetBool){
      //gradualVal1=quadraticCurveGradual(coord,lineStartPos,lineControlPos,lineEndPos,1.);
      gradualVal1=gradual(coord,lineStartPos,lineEndPos);
      gradualVal1=pow(gradualVal1,2.);
    }
    
    float swing=sin(gradualVal*pi);
    swing=1.-pow(1.-swing,2.);
    if(uOffsetBool){
      swing=mix(swing,sin((1.-gradualVal1)*.5*pi),gradualVal1);
    }
    vec2 uv001=vTextureCoord;
    if(swing!=0.){
      vec2 uv002=uv001*aspectRatio*clamp(500./max(len,10.),.75,10.);
      if(uOffsetBool){
        float len1=distance(lineStartPos,lineEndPos);
        uv002*=1.+abs(.1*gradualVal1*(len-len1)/len1);
      }
      float a=fbm_noise_perlin(vec3(uv002,uTime*3.));
      vec2 move=a*vec2(cos(a*2.*pi),sin(a*2.*pi));
      float power=.3*len/length(uSize);
      uv001+=swing*power*move;
    }
    
    float r=clamp(pow(.5*length(uSize)/len,2.),uLineWidth,uLineWidth*2.);
    uv001*=uSize;
    float gradualVal0=gradualVal;
    if(uOffsetBool){
      gradualVal0=gradualVal1;
    }
    r*=mix((.5+.5*(1.-sin(gradualVal0*pi))),3.,clamp(10./len,0.,1.));
    
    if(uOffsetBool){
      color+=distLightLine(uv001,lineStartPos,lineControlPos,lineEndPos,r);
    }else{
      color+=distLightLine(uv001,uStartPos,uControlPos,uEndPos,r);
    }
  }
  gl_FragColor=color;
  
}

