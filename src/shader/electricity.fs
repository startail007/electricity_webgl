precision mediump float;
varying vec2 vTextureCoord;
uniform lowp vec2 uSize;
uniform float uTime;
uniform vec2 uStartPos;
uniform vec2 uEndPos;

const float pi=3.14159265359;
const int OCTAVE_NUM=5;

/*struct LineEquation{float a;float b;float c;};
float cross(vec2 v0,vec2 v1){
  return v0.x*v1.y-v0.y*v1.x;
}
LineEquation getLineEquation(vec2 p0,vec2 p1){
  vec2 vector=p1-p0;
  return LineEquation(vector.y,-vector.x,cross(vector,p0));
}
float pointToLineEquationDistance(LineEquation lineEquation,vec2 p){
  return abs(lineEquation.a*p.x+lineEquation.b*p.y+lineEquation.c)/sqrt(lineEquation.a*lineEquation.a+lineEquation.b*lineEquation.b);
}*/
float distLine(vec2 p,vec2 a,vec2 b,float w){
  vec2 pa=p-a;
  vec2 ba=b-a;
  float t=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);
  return length(pa-ba*t)/w;
}
float gradual(vec2 p,vec2 a,vec2 b){
  vec2 pa=p-a;
  vec2 ba=b-a;
  return clamp(dot(pa,normalize(ba))/length(ba),0.,1.);
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
float fbm_abs_noise_perlin(vec3 p){
  float f=0.;
  float a=1.;
  for(int i=0;i<OCTAVE_NUM;i++)
  {
    f+=a*abs(noise_perlin(p));
    p=2.*p;
    a/=2.;
  }
  return f;
}

vec2 random2(vec2 p,vec2 loop){
  if(loop.x!=0.){
    p.x=mod(p.x,loop.x);
  }
  if(loop.y!=0.){
    p.y=mod(p.y,loop.y);
  }
  vec2 f=vec2(
    dot(p,vec2(127.1,311.7)),
    dot(p,vec2(269.5,183.3))
  );
  return-1.+2.*fract(sin(f)*43758.5453123);
}

float noise_perlin(vec2 p,vec2 loop){
  vec2 i=floor(p);
  vec2 f=fract(p);
  float a=dot(random2(i,loop),f);
  float b=dot(random2(i+vec2(1.,0.),loop),f-vec2(1.,0.));
  float c=dot(random2(i+vec2(0.,1.),loop),f-vec2(0.,1.));
  float d=dot(random2(i+vec2(1.,1.),loop),f-vec2(1.,1.));
  //vec2 u=smoothstep(0.,1.,f);
  vec2 u=f*f*(3.-2.*f);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
void main()
{
  
  vec4 color=vec4(0.);
  float len=distance(uStartPos,uEndPos);
  
  //vec2 uvCoord=vTextureCoord;
  vec2 rate=vec2(uSize.x/uSize.y,1.);
  vec2 coord=vTextureCoord*uSize;
  {
    float gradualVal=gradual(coord,uStartPos,uEndPos);
    //color+=vec4(vec3(gradualVal),1.);
    float free=sin(gradualVal*pi);
    free=1.-pow(1.-free,2.);
    //color+=vec4(vec3(free),1.);
    vec2 uv001=vTextureCoord;
    if(free!=0.){
      vec2 uv002=uv001*rate*clamp(500./max(len,10.),.75,10.);
      float a=fbm_noise_perlin(vec3(uv002,uTime*.003));
      float r=fbm_noise_perlin(vec3(uv002,uTime*.003));
      vec2 move=r*vec2(cos(a*2.*pi),sin(a*2.*pi));
      float power=.3*len/length(uSize);
      uv001+=free*power*move;
    }
    //color+=vec4(uv001,0.,1.);
    
    float r=clamp(pow(.5*length(uSize)/len,2.),2.,4.);
    uv001*=uSize;
    float gradualVal0=gradual(uv001,uStartPos,uEndPos);
    r*=mix((.5+.5*(1.-sin(gradualVal0*pi))),3.,clamp(10./len,0.,1.));
    //gl_FragColor=vec4(vec3(sin(gradualVal0*pi)),1.);
    float highColorRate=smoothstep(1.,0.,distLine(uv001,uStartPos,uEndPos,r));
    float baseColorRate=smoothstep(1.,0.,distLine(uv001,uStartPos,uEndPos,r*4.));
    float glowColorRate=smoothstep(1.,0.,distLine(uv001,uStartPos,uEndPos,r*16.));
    vec4 highColor=vec4(1.,1.,1.,1.);
    vec4 baseColor=vec4(.5,1.,1.,0.);
    vec4 glowColor=vec4(.25,1.,1.,1.);
    color+=highColorRate*highColor+.5*pow(baseColorRate,2.)*baseColor+.25*pow(glowColorRate,4.)*glowColor;
  }
  {
    vec2 uv=coord-uStartPos;
    float len=length(uv);
    
    /*float a=noise_perlin(vec2(floor(80.*(.5*atan(uv.y,uv.x)/pi+.5)),len/20.-uTime*.005),vec2(80.,0.));
    float b=noise_perlin(vec2((40.*(.5*atan(uv.y,uv.x)/pi+.5)),len/20.-uTime*.005),vec2(40.,0.));
    
    float baseColorRate=smoothstep(1.,0.,len/100.);
    color+=vec4(3.*b*a*baseColorRate);*/
    
    float a=smoothstep(.05,0.,abs(noise_perlin(vec2((20.*(.5*atan(uv.y,uv.x)/pi+.5)),len/20.-uTime*.005),vec2(20.,0.))));
    float baseColorRate=smoothstep(1.,0.,len/100.);
    color+=vec4(a*pow(baseColorRate,2.)*vec4(.5,1.,1.,0.));
  }
  gl_FragColor=color;
  
}

