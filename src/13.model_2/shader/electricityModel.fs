precision highp float;
precision highp sampler2D;
varying vec2 vTextureCoord;
varying vec2 vSize;
varying vec2 vDir;
varying vec2 vRadius;
varying vec2 vThickness;

uniform sampler2D uNoiseSampler;
uniform sampler2D uGradientColorSampler;
uniform sampler2D uThicknessScaleSampler;
uniform float uGradientColorRate;
uniform float uThicknessScaleRate;
uniform float uTime;
uniform vec2 uDensity;
uniform vec2 uFixed;
uniform float uPower;
uniform vec2 uBorderPower;

uniform bool uSub;

uniform bool uFlow;
uniform float uFlowRate;

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
float drawLight(float d,float power){
  float f=1.;
  float a=1.;
  const int N=3;
  float maxF=pow(2.,float(N));
  for(int i=0;i<N;i++){
    a*=.5;
    float colorRate=smoothstep(1.,0.,2.*a*d);
    float rate=pow(colorRate,a*maxF);
    f=mix(a,f,rate);
  }
  f*=power*smoothstep(1.,0.,d/maxF);
  return f;
}
vec4 distLightPoint(vec2 p,vec2 a,float w,float power,sampler2D gradientColorSampler,float gradientColorRate){
  float d=length(p-a)/w;
  float f=drawLight(d,power);
  return vec4(f*texture2D(gradientColorSampler,vec2(f,gradientColorRate)));
}
vec4 distLightLine(vec2 p,vec2 a,vec2 b,float w,float power,sampler2D gradientColorSampler,float gradientColorRate){
  float d=distLine(p,a,b,w);
  float f=drawLight(d,power);
  return vec4(f*texture2D(gradientColorSampler,vec2(f,gradientColorRate)));
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
float toRate(float x){
  //sigmoid
  return 1.0/(1.0+exp(1.0*(-x*4.0+7.0)))+1.0/(1.0+exp(-2.0*(-x*4.0+17.0)))-1.0;
}
void main(void){
  vec4 color=vec4(0.);
  
  vec2 aspectRatio=vec2(vSize.x/vSize.y,1.);
  vec2 coord=vTextureCoord*aspectRatio;
  vec2 startPos=(vec2(0.,.5)*aspectRatio+vec2(.5,0.));
  vec2 endPos=(vec2(1.,.5)*aspectRatio-vec2(.5,0.));
  float startR=vThickness.x/vSize.y;
  float endR=vThickness.y/vSize.y;
  float power=pow(uPower,.5);
  
  vec3 noise=getNoise(uNoiseSampler,gl_FragCoord.xy*.003,uTime,uDensity.x*.5,uDensity.y*.5);
  
  float gradualVal=smoothstep(startPos.x,endPos.x,coord.x);
  vec4 thicknessScale=texture2D(uThicknessScaleSampler,vec2(gradualVal,uThicknessScaleRate));
  {
    //主電流
    vec2 move=getMove(gradualVal,vDir,vRadius.x,vRadius.y,uFixed.x,uFixed.y,noise)/vSize.y;
    coord+=move;


    {
        // vec2 coord=vTextureCoord*aspectRatio;
        //光球
      color+=distLightPoint(coord,startPos,startR,1.,uGradientColorSampler,uGradientColorRate)*uBorderPower.x*0.5;
      color+=distLightPoint(coord,endPos,endR,1.,uGradientColorSampler,uGradientColorRate)*uBorderPower.y*0.5;
    }
    
    float r=mix(startR,endR,gradualVal)*power;
    
    //r*=(1.-1.*sin(gradualVal*pi));
    r*=thicknessScale.r;
    color+=distLightLine(coord,startPos,endPos,r,power,uGradientColorSampler,uGradientColorRate);
  }
  {
    //子電流
    if(uSub){
      for(int i=0;i<2;i++){
        vec3 noise0=getNoise(uNoiseSampler,gl_FragCoord.xy*.001,uTime*.75+float(i+1)*noise.z,max(uDensity.x*.5,.3),max(uDensity.y*.5,.3));
        float startPosRate=cos(noise0.x)*.5+.5;
        float endPosRate=sin(noise0.y)*.5+.5;
        vec2 startPos0=mix(startPos,endPos,startPosRate);
        vec2 endPos0=mix(startPos,endPos,endPosRate);
        float gradualVal0=smoothstep(startPos0.x,endPos0.x,coord.x);
        vec2 move0=1.2*sin(gradualVal0*pi)*getMove(gradualVal0,vDir,vRadius.x*.5+vThickness.x,vRadius.y*.5+vThickness.y,1.,1.,noise0)/vSize.y;
        float r0=mix(mix(startR,endR,startPosRate),mix(startR,endR,endPosRate),gradualVal0)*.5*power;
        r0*=1.-.5*sin(gradualVal0*pi);
        color+=min(thicknessScale.r+.2,1.)*distLightLine(coord+move0,startPos0,endPos0,r0,power,uGradientColorSampler,uGradientColorRate);
      }
    }
  }
  {
    //流動
    if(uFlow){
      float rate=mix(5.,0.,uFlowRate);
      float gradualVal00=toRate(gradualVal+rate);
      color*=gradualVal00;
    }
    
  }
  
  //color=texture2D(uGradientColorSampler,vTextureCoord);
  
  if(uWireframe){
    vec2 lineWidth=5./vSize;
    if(vTextureCoord.x<lineWidth.x||vTextureCoord.x>1.-lineWidth.x||vTextureCoord.y<lineWidth.y||vTextureCoord.y>1.-lineWidth.y){
      //color+=.5*vec4(1.,0.,0.,1.);
      color=vec4(1.,0.,0.,1.);
    }
  }
  //color+=distLightLine(coord,mix(startPos,endPos,.5),mix(startPos,endPos,.5)+vec2(0.,.2),.01,1.5);
  
  gl_FragColor=color;
  //gl_FragColor=vec4(0.0,1.0,0.0,1.0);
}