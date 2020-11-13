precision mediump float;
varying vec2 vTextureCoord;
uniform lowp vec2 uSize;
uniform lowp float uDepth;
uniform int uType;
uniform vec3 uGrid;
uniform vec3 uPos;
const float pi=3.14159265359;
const int OCTAVE_NUM=3;

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
  vec3 u=smoothstep(0.,1.,s);
  //vec3 u=s*s*(3.-2.*s);
  return mix(mix(mix(a,b,u.x),mix(c,e,u.x),u.y),mix(mix(d,f,u.x),mix(g,h,u.x),u.y),u.z);
}
float fbm_noise_perlin(vec3 p){
  float f=0.;
  float a=.5;
  for(int i=0;i<5;i++){
    f+=a*noise_perlin(p);
    p=2.*p;
    a/=2.;
  }
  return f;
}
float fbm_abs_noise_perlin(vec3 p){
  float f=0.;
  float a=.5;
  for(int i=0;i<5;i++){
    f+=a*abs(noise_perlin(p));
    p=2.*p;
    a/=2.;
  }
  return f;
}
void main()
{
  vec3 uv=(vec3(vTextureCoord,0.)+uPos)*uGrid;
  float f=fbm_abs_noise_perlin(vec3(uv))*.5+.5;
  //gl_FragColor=vec4(vec3(f),1.);
  gl_FragColor=vec4(vec3(1.5*f,1.5*f*f*f,f*f*f*f*f*f),1.);
}

