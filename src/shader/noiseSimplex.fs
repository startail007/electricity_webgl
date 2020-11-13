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
vec2 random2(vec2 p){
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

float noise_simplex(vec2 p){
  const float K1=.366025404;// (sqrt(3)-1)/2;
  const float K2=.211324865;// (3-sqrt(3))/6;
  vec2 i=floor(p+(p.x+p.y)*K1);
  vec2 a=p-i+(i.x+i.y)*K2;
  float m=step(a.y,a.x);
  vec2 o=vec2(m,1.-m);
  vec2 b=a-o+K2;
  vec2 c=a-1.+2.*K2;
  vec3 h=max(.5-vec3(dot(a,a),dot(b,b),dot(c,c)),0.);
  vec3 n=h*h*h*h*vec3(dot(a,random2(i+0.)),dot(b,random2(i+o)),dot(c,random2(i+1.)));
  return dot(n,vec3(70.));
}

float fbm_noise_simplex(vec2 p){
  float f=0.;
  float a=.5;
  for(int i=0;i<OCTAVE_NUM;i++)
  {
    f+=a*noise_simplex(p);
    p=2.*p;
    a/=2.;
  }
  return f;
}

float fbm_abs_noise_simplex(vec2 p){
  float f=0.;
  float a=.5;
  for(int i=0;i<OCTAVE_NUM;i++)
  {
    f+=a*abs(noise_simplex(p));
    p=2.*p;
    a/=2.;
  }
  return f;
}

void main()
{
  vec2 uv=(vTextureCoord+uPos)*uGrid;
  if(uType==1){
    float f=noise_simplex(uv)*.5+.5;
    gl_FragColor=vec4(vec3(f),1.);
  }else if(uType==2){
    float f=fbm_noise_simplex(uv)*.5+.5;
    gl_FragColor=vec4(vec3(f),1.);
  }else if(uType==3){
    float f=fbm_abs_noise_simplex(uv)*.5+.5;
    gl_FragColor=vec4(vec3(f),1.);
  }
}

