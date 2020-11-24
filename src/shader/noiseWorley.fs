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
float noise_worley(vec2 p,vec2 loop){
  vec2 i=floor(p);
  vec2 f=fract(p);
  float F1=1.;
  for(int j=-1;j<=1;j++){
    for(int k=-1;k<=1;k++){
      vec2 neighbor=vec2(float(j),float(k));
      vec2 point=random2(i+neighbor,loop)*.5+.5;
      float d=length(point+neighbor-f);
      F1=min(F1,d);
    }
  }
  F1=F1*F1*(3.-2.*F1);
  return F1;
}
float fbm_noise_worley(vec2 p,vec2 loop){
  float f=0.;
  float a=.5;
  for(int i=0;i<OCTAVE_NUM;i++)
  {
    f+=a*noise_worley(p,loop);
    p*=2.;
    a/=2.;
  }
  return f;
}
float fbm_abs_noise_worley(vec2 p,vec2 loop){
  float f=0.;
  float a=.5;
  for(int i=0;i<OCTAVE_NUM;i++)
  {
    f+=a*abs(noise_worley(p,loop)*2.-1.);
    p*=2.;
    a/=2.;
  }
  f=f*.5+.5;
  return f;
}

void main()
{
  vec2 uv=(vTextureCoord+uPos)*uGrid;
  if(uType==1){
    float f=noise_worley(uv,uLoop);
    gl_FragColor=vec4(vec3(f),1.);
  }else if(uType==2){
    float f=fbm_noise_worley(uv,uLoop);
    gl_FragColor=vec4(vec3(f),1.);
  }else if(uType==3){
    float f=fbm_abs_noise_worley(uv,uLoop);
    gl_FragColor=vec4(vec3(f),1.);
  }
}

