precision mediump float;
varying vec2 vTextureCoord;
uniform lowp vec2 uSize;
uniform float uTime;
uniform int uClass;
uniform int uType;
uniform vec2 uGrid;
uniform vec2 uPos;
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
vec2 random2(vec2 p){
  vec2 f=vec2(
    dot(p,vec2(127.1,311.7)),
    dot(p,vec2(269.5,183.3))
  );
  return-1.+2.*fract(sin(f)*43758.5453123);
}
float random(vec2 p){
  float f=dot(p,vec2(127.1,311.7));
  return-1.+2.*fract(sin(f)*43758.5453123);
}

//gradient
float noise_perlin(vec2 p){
  vec2 i=floor(p);
  vec2 f=fract(p);
  float a=dot(random2(i),f);
  float b=dot(random2(i+vec2(1.,0.)),f-vec2(1.,0.));
  float c=dot(random2(i+vec2(0.,1.)),f-vec2(0.,1.));
  float d=dot(random2(i+vec2(1.,1.)),f-vec2(1.,1.));
  //vec2 u=smoothstep(0.,1.,f);
  vec2 u=f*f*(3.-2.*f);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
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

float noise_value(vec2 p){
  vec2 i=floor(p);
  vec2 f=fract(p);
  vec2 u=f*f*(3.-2.*f);
  float a=random(i+vec2(0.,0.));
  float b=random(i+vec2(1.,0.));
  float c=random(i+vec2(0.,1.));
  float d=random(i+vec2(1.,1.));
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}

float noise_simplex(in vec2 p){
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

//celluar
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

//fractal 分形
/*float noise_fractal(vec2 uv){
  float f=0.;
  const int N=5;
  uv*=8.;
  mat2 m=mat2(1.6,1.2,-1.2,1.6);
  for(int i=1;i<N;i++){
    float val=exp2(float(i));
    f+=noise_perlin(uv)/val;
    uv=m*uv;
  }
  f=.5*f+.5;
  return f;
}*/
float fbm_noise_perlin(vec2 p){
  float f=0.;
  float a=.5;
  for(int i=0;i<OCTAVE_NUM;i++)
  {
    f+=a*noise_perlin(p);
    p=2.*p;
    a/=2.;
  }
  return f;
}
float fbm_noise_perlin(vec3 p)
{
  float f=0.;
  float a=.5;
  for(int i=0;i<5;i++){
    f+=a*noise_perlin(p);
    p=2.*p;
    a/=2.;
  }
  return f;
}
float fbm_noise_worley(vec2 p){
  float f=0.;
  float a=.5;
  for(int i=0;i<OCTAVE_NUM;i++)
  {
    f+=a*noise_worley(p);
    p=2.*p;
    a/=2.;
  }
  return f;
}
float fbm_noise_value(vec2 p){
  float f=0.;
  float a=.5;
  for(int i=0;i<OCTAVE_NUM;i++)
  {
    f+=a*noise_value(p);
    p=2.*p;
    a/=2.;
  }
  return f;
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
//turbulence 湍流
float fbm_abs_noise_perlin(vec2 p){
  float f=0.;
  float a=.5;
  for(int i=0;i<OCTAVE_NUM;i++)
  {
    f+=a*abs(noise_perlin(p));
    p=2.*p;
    a/=2.;
  }
  return f;
}
float fbm_abs_noise_perlin(vec3 p)
{
  float f=0.;
  float a=.5;
  for(int i=0;i<5;i++){
    f+=a*abs(noise_perlin(p));
    p=2.*p;
    a/=2.;
  }
  return f;
}
float fbm_abs_noise_worley(vec2 p){
  float f=0.;
  float a=.5;
  for(int i=0;i<OCTAVE_NUM;i++)
  {
    f+=a*abs(noise_worley(p)*2.-1.);
    p=2.*p;
    a/=2.;
  }
  f=f*.5+.5;
  return f;
}
float fbm_abs_noise_value(vec2 p){
  float f=0.;
  float a=.5;
  for(int i=0;i<OCTAVE_NUM;i++)
  {
    f+=a*abs(noise_value(p));
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

float domain_wraping(vec2 p)
{
  return fbm_abs_noise_perlin(p+fbm_abs_noise_perlin(p+fbm_abs_noise_perlin(p)));
}

void main()
{
  vec2 uv=vTextureCoord*uSize+uPos;
  if(uClass==0){
    vec2 f=smoothstep(vec2(.5),vec2(.5),fract(uv/uGrid));
    gl_FragColor=vec4(vec3(abs(f.x-f.y)),1.);
  }else if(uClass==1){
    if(uType==1){
      float f=noise_perlin(uv/uGrid)*.5+.5;
      gl_FragColor=vec4(vec3(f),1.);
    }else if(uType==2){
      float f=fbm_noise_perlin(uv/uGrid)*.5+.5;
      gl_FragColor=vec4(vec3(f),1.);
    }else if(uType==3){
      float f=fbm_abs_noise_perlin(uv/uGrid)*.5+.5;
      gl_FragColor=vec4(vec3(f),1.);
    }
  }else if(uClass==2){
    if(uType==1){
      float f=noise_worley(uv/uGrid);
      gl_FragColor=vec4(vec3(f),1.);
    }else if(uType==2){
      float f=fbm_noise_worley(uv/uGrid);
      gl_FragColor=vec4(vec3(f),1.);
    }else if(uType==3){
      float f=fbm_abs_noise_worley(uv/uGrid);
      gl_FragColor=vec4(vec3(f),1.);
    }
  }else if(uClass==3){
    if(uType==1){
      float f=noise_value(uv/uGrid)*.5+.5;
      gl_FragColor=vec4(vec3(f),1.);
    }else if(uType==2){
      float f=fbm_noise_value(uv/uGrid)*.5+.5;
      gl_FragColor=vec4(vec3(f),1.);
    }else if(uType==3){
      float f=fbm_abs_noise_value(uv/uGrid)*.5+.5;
      gl_FragColor=vec4(vec3(f),1.);
    }
  }else if(uClass==4){
    if(uType==1){
      float f=noise_simplex(uv/uGrid)*.5+.5;
      gl_FragColor=vec4(vec3(f),1.);
    }else if(uType==2){
      float f=fbm_noise_simplex(uv/uGrid)*.5+.5;
      gl_FragColor=vec4(vec3(f),1.);
    }else if(uType==3){
      float f=fbm_abs_noise_simplex(uv/uGrid)*.5+.5;
      gl_FragColor=vec4(vec3(f),1.);
    }
  }
  
}

