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
}
vec2 random2(vec2 p){
  vec2 f=vec2(
    dot(p,vec2(127.1,311.7)),
    dot(p,vec2(269.5,183.3))
  );
  return-1.+2.*fract(sin(f)*43758.5453123);
}*/
float random(vec2 p,vec2 loop){
  if(loop.x!=0.){
    p.x=mod(p.x,loop.x);
  }
  if(loop.y!=0.){
    p.y=mod(p.y,loop.y);
  }
  float f=dot(p,vec2(127.1,311.7));
  return-1.+2.*fract(sin(f)*43758.5453123);
}

float noise_value(vec2 p,vec2 loop){
  vec2 i=floor(p);
  vec2 f=fract(p);
  vec2 u=f*f*(3.-2.*f);
  float a=random(i+vec2(0.,0.),loop);
  float b=random(i+vec2(1.,0.),loop);
  float c=random(i+vec2(0.,1.),loop);
  float d=random(i+vec2(1.,1.),loop);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm_noise_value(vec2 p,vec2 loop){
  float f=0.;
  float a=.5;
  for(int i=0;i<OCTAVE_NUM;i++)
  {
    f+=a*noise_value(p,loop);
    p=2.*p;
    a/=2.;
  }
  return f;
}
float fbm_abs_noise_value(vec2 p,vec2 loop){
  float f=0.;
  float a=.5;
  for(int i=0;i<OCTAVE_NUM;i++)
  {
    f+=a*abs(noise_value(p,loop));
    p=2.*p;
    a/=2.;
  }
  return f;
}
void main()
{
  vec2 uv=(vTextureCoord+uPos)*uGrid;
  if(uType==1){
    float f=noise_value(uv,uLoop)*.5+.5;
    gl_FragColor=vec4(vec3(f),1.);
  }else if(uType==2){
    float f=fbm_noise_value(uv,uLoop)*.5+.5;
    gl_FragColor=vec4(vec3(f),1.);
  }else if(uType==3){
    float f=fbm_abs_noise_value(uv,uLoop)*.5+.5;
    gl_FragColor=vec4(vec3(f),1.);
  }
}

