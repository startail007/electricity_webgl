precision highp float;
precision highp sampler2D;
varying vec2 vTextureCoord;
varying vec2 vSize;
varying vec2 vDir;
varying vec2 vRadius;
varying vec2 vThickness;
varying float vOffset;

uniform sampler2D uNoiseSampler;
uniform sampler2D uGradientColorSampler;
uniform vec2 uMouse;
uniform float uTime;
uniform vec2 uDensity;
uniform vec2 uFixed;
uniform float uPower;

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
vec4 distLightPoint(float d,float power,sampler2D gradientColorSampler){
  float f=drawLight(d,power);
  return vec4(f*texture2D(gradientColorSampler,vec2(f,0.)));
}
vec4 distLightLine(vec2 p,vec2 a,vec2 b,float w,float power,sampler2D gradientColorSampler){
  float d=distLine(p,a,b,w);
  float f=drawLight(d,power);
  return vec4(f*texture2D(gradientColorSampler,vec2(f,0.)));
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
struct Line{
  vec2 startPos;
  vec2 endPos;
  float w;
  float scale;
};
vec4 distLightLine0(vec2 p,Line line,float power,sampler2D gradientColorSampler){
  float gradual0=gradual(p,line.startPos,line.endPos);
  return distLightLine(p,line.startPos,line.endPos,mix(line.w,0.,gradual0),power,gradientColorSampler);
}
void abc(out Line outLine,Line line,float rate,float angle,float scale){
  outLine.w=mix(line.w,0.,rate);
  outLine.scale=scale*line.scale;
  outLine.startPos=mix(line.startPos,line.endPos,rate);
  outLine.endPos=outLine.scale*(line.endPos-line.startPos)*rotCoord(angle)+outLine.startPos;
}
vec4 abc1(vec2 p,float power,sampler2D gradientColorSampler,float rate,out Line srcLine,out Line targetLine,float seed){
  vec4 noise=texture2D(uNoiseSampler,fract(gl_FragCoord.xy*.0001+srcLine.startPos+.05*seed));
  rate+=.25*(noise.x-.5);
  rate=clamp(rate,0.,1.);
  abc(targetLine,srcLine,rate,clamp(2.*(noise.y-.5)*2.*pi,-.5,.5),1.-rate);
  return distLightLine0(p,targetLine,power,gradientColorSampler);
}
vec4 abc0(vec2 p,vec2 a,vec2 b,float w,float power,sampler2D gradientColorSampler){
  vec4 color=vec4(0.);
  vec4 noise0=texture2D(uNoiseSampler,fract(gl_FragCoord.xy*.001));
  float angle=(noise0.x-.5)*2.*pi;
  p+=.25*noise0.y*vec2(cos(angle),sin(angle));
  Line lines[32];
  
  lines[0].startPos=a;
  lines[0].endPos=b;
  lines[0].w=w;
  lines[0].scale=1.;
  
  color+=distLightLine0(p,lines[0],power,gradientColorSampler);
  
  color+=abc1(p,power,gradientColorSampler,.2,lines[0],lines[1],1.);
  color+=abc1(p,power,gradientColorSampler,.4,lines[0],lines[2],2.);
  color+=abc1(p,power,gradientColorSampler,.6,lines[0],lines[3],3.);
  color+=abc1(p,power,gradientColorSampler,.8,lines[0],lines[4],4.);
  
  color+=abc1(p,power,gradientColorSampler,.2,lines[1],lines[5],5.);
  color+=abc1(p,power,gradientColorSampler,.4,lines[1],lines[6],6.);
  color+=abc1(p,power,gradientColorSampler,.6,lines[1],lines[7],7.);
  color+=abc1(p,power,gradientColorSampler,.8,lines[1],lines[8],8.);
  
  color+=abc1(p,power,gradientColorSampler,.2,lines[2],lines[9],9.);
  color+=abc1(p,power,gradientColorSampler,.4,lines[2],lines[10],10.);
  color+=abc1(p,power,gradientColorSampler,.6,lines[2],lines[11],11.);
  color+=abc1(p,power,gradientColorSampler,.8,lines[2],lines[12],12.);
  
  color+=abc1(p,power,gradientColorSampler,.2,lines[3],lines[13],13.);
  color+=abc1(p,power,gradientColorSampler,.4,lines[3],lines[14],14.);
  color+=abc1(p,power,gradientColorSampler,.6,lines[3],lines[15],15.);
  color+=abc1(p,power,gradientColorSampler,.8,lines[3],lines[16],16.);
  
  color+=abc1(p,power,gradientColorSampler,.2,lines[4],lines[17],17.);
  color+=abc1(p,power,gradientColorSampler,.4,lines[4],lines[18],18.);
  color+=abc1(p,power,gradientColorSampler,.6,lines[4],lines[19],19.);
  color+=abc1(p,power,gradientColorSampler,.8,lines[4],lines[20],20.);
  
  return color;
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
  
  {
    //主電流
    float gradualVal=smoothstep(startPos.x,endPos.x,coord.x);
    /*vec2 move=getMove(gradualVal,vDir,vRadius.x,vRadius.y,uFixed.x,uFixed.y,noise)/vSize.y;
    coord+=move;
    vec2 offset=getQuadraticCurveTo(vec2(0.,0.),vec2(.5,vOffset*2.),vec2(1.,0.),gradualVal);
    coord+=offset.y*vec2(0.,-1.)/vSize.y;*/
    
    float r=mix(startR,endR,gradualVal)*power;
    //r*=(1.-.5*sin(gradualVal*pi));
    
    //color+=distLightLine(coord,startPos,endPos,r,power,uGradientColorSampler);
    
    /*float a=.1*pi;
    vec2 startPos0=mix(startPos,endPos,.5);
    vec2 endPos0=.5*(endPos-startPos)*rotCoord(a)+startPos0;
    color+=distLightLine(coord,startPos0,endPos0,r,power,uGradientColorSampler);*/
    
    color+=abc0(coord,startPos,endPos,r,power,uGradientColorSampler);
  }
  
  if(uWireframe){
    vec2 lineWidth=1./vSize;
    if(vTextureCoord.x<lineWidth.x||vTextureCoord.x>1.-lineWidth.x||vTextureCoord.y<lineWidth.y||vTextureCoord.y>1.-lineWidth.y){
      color+=.5*vec4(1.,0.,0.,1.);
    }
  }
  gl_FragColor=color;
}