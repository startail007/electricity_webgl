precision mediump float;
varying vec2 vTextureCoord;
uniform lowp vec2 uSize;
uniform lowp float uDepth;
uniform int uType;
uniform vec3 uGrid;
uniform vec3 uPos;
uniform vec3 uLoop;
uniform sampler2D uSampler;
const float pi=3.14159265359;
const int OCTAVE_NUM=3;

vec3 random3(vec3 p,vec3 loop){
  if(loop.x!=0.){
    p.x=mod(p.x,loop.x);
  }
  if(loop.y!=0.){
    p.y=mod(p.y,loop.y);
  }
  if(loop.z!=0.){
    p.z=mod(p.z,loop.z);
  }
  vec3 f=vec3(
    dot(p,vec3(127.1,311.7,69.5)),
    dot(p,vec3(269.5,183.3,132.7)),
    dot(p,vec3(247.3,108.5,96.5))
  );
  return-1.+2.*fract(sin(f)*43758.5453123);
}
float noise_perlin(vec3 p,vec3 loop){
  vec3 i=floor(p);
  vec3 s=fract(p);
  float a=dot(random3(i,loop),s);
  float b=dot(random3(i+vec3(1,0,0),loop),s-vec3(1,0,0));
  float c=dot(random3(i+vec3(0,1,0),loop),s-vec3(0,1,0));
  float d=dot(random3(i+vec3(0,0,1),loop),s-vec3(0,0,1));
  float e=dot(random3(i+vec3(1,1,0),loop),s-vec3(1,1,0));
  float f=dot(random3(i+vec3(1,0,1),loop),s-vec3(1,0,1));
  float g=dot(random3(i+vec3(0,1,1),loop),s-vec3(0,1,1));
  float h=dot(random3(i+vec3(1,1,1),loop),s-vec3(1,1,1));
  vec3 u=smoothstep(0.,1.,s);
  //vec3 u=s*s*(3.-2.*s);
  return mix(mix(mix(a,b,u.x),mix(c,e,u.x),u.y),mix(mix(d,f,u.x),mix(g,h,u.x),u.y),u.z);
}
float fbm_noise_perlin(vec3 p,vec3 loop){
  float f=0.;
  float a=.5;
  for(int i=0;i<OCTAVE_NUM;i++){
    f+=a*noise_perlin(p,loop);
    p*=2.;
    a/=2.;
  }
  return f;
}
float fbm_abs_noise_perlin(vec3 p,vec3 loop){
  float f=0.;
  float a=.5;
  for(int i=0;i<OCTAVE_NUM;i++){
    f+=a*abs(noise_perlin(p,loop));
    p*=2.;
    a/=2.;
  }
  return f;
}

vec2 random2(vec2 p){
  vec2 f=vec2(
    dot(p,vec2(127.1,311.7)),
    dot(p,vec2(269.5,183.3))
  );
  /*return-1.+2.*fract(sin(f)*43758.5453123);*/
  return texture2D(uSampler,fract(f)).rg*2.-1.;
}
float noise_worley(vec2 p){
  vec2 i=floor(p);
  vec2 f=fract(p);
  float F1=1.;
  for(int j=-1;j<=1;j++){
    for(int k=-1;k<=1;k++){
      vec2 neighbor=vec2(float(j),float(k));
      vec2 point=random2(i+neighbor)*.5+.5;
      float d=length(point+neighbor-f);
      F1=min(F1,d);
    }
  }
  F1=F1*F1*(3.-2.*F1);
  return F1;
}
float aaa(vec2 p){
  return noise_worley(p);
  //return texture2D(uSampler,fract(p)).b;
}
float fbm_aaa(vec2 p){
  float f=0.;
  float a=.5;
  for(int i=0;i<2;i++){
    f+=a*aaa(p);
    p*=2.;
    a/=2.;
  }
  return f;
}
void main()
{
  vec3 uv=(vec3(vTextureCoord,0.)+uPos)*uGrid;
  //float f=fbm_abs_noise_perlin(vec3(uv))*.5+.5;
  //float f=fbm_abs_noise_perlin(uv*.1,uLoop)*.5+.5;
  //float f=noise_perlin(uv,uLoop)*.5+.5;
  float f=noise_worley(vTextureCoord*20.);
  gl_FragColor=vec4(vec3(f),1.);
  //gl_FragColor=vec4(vec3(1.5*f,1.5*f*f*f,f*f*f*f*f*f),1.);
  
}

