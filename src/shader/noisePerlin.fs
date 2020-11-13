precision mediump float;
varying vec2 vTextureCoord;
uniform lowp vec2 uSize;
uniform int uType;
uniform vec2 uGrid;
uniform vec2 uPos;
uniform vec2 uLoop;
//const float pi=3.14159265359;
const int OCTAVE_NUM=3;

/*vec3 random3(vec3 p){
  vec3 f=vec3(
    dot(p,vec3(127.1,311.7,69.5)),
    dot(p,vec3(269.5,183.3,132.7)),
    dot(p,vec3(247.3,108.5,96.5))
  );
  return-1.+2.*fract(sin(f)*43758.5453123);
}*/
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
/*float random(vec2 p){
  float f=dot(p,vec2(127.1,311.7));
  return-1.+2.*fract(sin(f)*43758.5453123);
}*/

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
/*float noise_perlin(vec3 p){
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
}*/

float fbm_noise_perlin(vec2 p,vec2 loop){
  float f=0.;
  float a=.5;
  for(int i=0;i<OCTAVE_NUM;i++)
  {
    f+=a*noise_perlin(p,loop);
    p=2.*p;
    a/=2.;
  }
  return f;
}
/*float fbm_noise_perlin(vec3 p)
{
  float f=0.;
  float a=.5;
  for(int i=0;i<5;i++){
    f+=a*noise_perlin(p);
    p=2.*p;
    a/=2.;
  }
  return f;
}*/
float fbm_abs_noise_perlin(vec2 p,vec2 loop){
  float f=0.;
  float a=.5;
  for(int i=0;i<OCTAVE_NUM;i++)
  {
    f+=a*abs(noise_perlin(p,loop));
    p=2.*p;
    a/=2.;
  }
  return f;
}
/*float fbm_abs_noise_perlin(vec3 p)
{
  float f=0.;
  float a=.5;
  for(int i=0;i<5;i++){
    f+=a*abs(noise_perlin(p));
    p=2.*p;
    a/=2.;
  }
  return f;
}*/

/*float domain_wraping(vec2 p)
{
  return fbm_abs_noise_perlin(p+fbm_abs_noise_perlin(p+fbm_abs_noise_perlin(p)));
}*/

void main()
{
  vec2 uv=(vTextureCoord+uPos)*uGrid;
  if(uType==1){
    float f=noise_perlin(uv,uLoop)*.5+.5;
    gl_FragColor=vec4(vec3(f),1.);
    /*vec2 uv0=smoothstep(vec2(.5),vec2(.5),fract(uv));
    float f=abs(uv0.x-uv0.y);
    gl_FragColor=vec4(vec3(f),1.);*/
  }else if(uType==2){
    float f=fbm_noise_perlin(uv,uLoop)*.5+.5;
    gl_FragColor=vec4(vec3(f),1.);
  }else if(uType==3){
    float f=fbm_abs_noise_perlin(uv,uLoop)*.5+.5;
    gl_FragColor=vec4(vec3(f),1.);
  }
}

