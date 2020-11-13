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
float eddy(vec2 uv,float N){
  float d=length(uv);
  float a=atan(uv.y,uv.x);
  float s=abs(sin(d*N+a))/d;
  return s;
}

float ring(vec2 f){
  float d0=smoothstep(1.,.99,length(f)/.5);
  float d1=smoothstep(1.,.99,length(f)/.49);
  return abs(d0-d1);
}
float distLine(vec2 p,vec2 a,vec2 b,float w){
  vec2 pa=p-a;
  vec2 ba=b-a;
  float t=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);
  return length(pa-ba*t)/w;
}
mat2 rotCoord(float a){
  float sin_factor=sin(a);
  float cos_factor=cos(a);
  mat2 rot=mat2(cos_factor,sin_factor,-sin_factor,cos_factor);
  return rot;
}
vec2 rotPos(vec2 f,float a){
  return f*rotCoord(a);
}
vec2 ballPos(vec2 f,vec2 i,float t){
  i+=f;
  return f+rotPos(vec2(.5,0.),t+.2*(i.x+i.y)*pi);
}
float ball(vec2 f,float r){
  return smoothstep(1.,.99,length(f)/r);
}
float wave(vec2 uv,float t){
  vec2 f=fract(uv);
  vec2 i=floor(uv);
  f=(f-.5);
  vec2 mainPos=ballPos(vec2(0.,0.),i,t);
  vec2 rightPos=ballPos(vec2(1.,0.),i,t);
  vec2 leftPos=ballPos(-vec2(1.,0.),i,t);
  vec2 bottomPos=ballPos(vec2(0.,1.),i,t);
  vec2 topPos=ballPos(-vec2(0.,1.),i,t);
  float c=0.;
  c+=smoothstep(1.,0.,distLine(f,mainPos,rightPos,.05));
  c+=smoothstep(1.,0.,distLine(f,mainPos,leftPos,.05));
  c+=smoothstep(1.,0.,distLine(f,mainPos,bottomPos,.05));
  c+=smoothstep(1.,0.,distLine(f,mainPos,topPos,.05));
  
  c+=ball((f-mainPos),.05);
  c+=ball((f-rightPos),.05);
  c+=ball((f-leftPos),.05);
  c+=ball((f-bottomPos),.05);
  c+=ball((f-topPos),.05);
  return c;
}
float gradual(vec2 p,vec2 a,vec2 b){
  vec2 pa=p-a;
  vec2 ba=b-a;
  return clamp(dot(pa,normalize(ba))/length(ba),0.,1.);
}
float distHexagon(vec2 uv){
  uv=abs(uv);
  float c=dot(uv,normalize(vec2(1.,1.7320508)));
  c=max(c,uv.x);
  return c;
}
vec2 hexagon(vec2 uv){
  float sqrt3=1.7320508;
  vec2 r=vec2(1.,sqrt3);
  vec2 h=r*.5;
  vec2 a=mod(uv,r)-h;
  vec2 b=mod(uv-h,r)-h;
  vec2 g;
  if(length(a)<length(b)){
    g=a;
  }else{
    g=b;
  }
  return g;
}
void main()
{
  
  vec2 aspectRatio=vec2(uSize.x/uSize.y,1.);
  if(vTextureCoord.x<.5){
    if(vTextureCoord.y<.5){
      //六邊形
      vec4 color=vec4(0.);
      vec2 uv=(vTextureCoord-.5);
      uv=uv*2.-vec2(.5,-.5);
      uv*=aspectRatio;
      uv*=5.;
      vec2 g=hexagon(uv);
      color+=vec4(vec3(g,0.),1.);
      vec2 i=uv-g;
      float angle=atan(g.y,g.x);
      g*=rotCoord(.2*(i.x+i.y)*pi-uPos.z*20.);
      float f=distHexagon(g);
      f=sin(f*40.+angle+.2*(i.x+i.y)*pi-uPos.z*20.)*.5+.5;
      f=step(f,length(g));
      color+=vec4(vec3(f),1.);
      gl_FragColor=color;
    }else{
      //波浪
      vec4 color=vec4(0.);
      vec2 grid=vec2(10.,10.);
      vec2 uv=vTextureCoord;
      uv=uv*2.-vec2(.5,-.5);
      uv*=aspectRatio;
      uv*=grid;
      vec2 gv=fract(uv);
      
      color+=vec4(vec3(wave(uv,pi*uPos.z*20.)),1.);
      
      float gridLineWidth=1.;
      vec2 gridWidth=gridLineWidth*grid/uSize;
      //if(gv.x<gridWidth.x||gv.x>1.-gridWidth.x||gv.y<gridWidth.y||gv.y>1.-gridWidth.y){color=vec4(vec3(1.,0.,0.),1.);}
      gl_FragColor=color;
    }
  }else{
    if(vTextureCoord.y<.5){
      //漩渦
      vec2 uv=(vTextureCoord-.5);
      uv=uv*2.-vec2(.5,-.5);
      uv*=aspectRatio;
      gl_FragColor=vec4(vec3(eddy(uv,10.)),1.);
    }else{
      vec4 color=vec4(0.);
      
      vec2 uv=(vTextureCoord-.5);
      uv=uv*2.-vec2(.5,.5);
      uv*=aspectRatio;
      
      float r=length(uv);
      float a=.5*atan(uv.y,uv.x)/pi+.5;
      vec2 rate=vec2(10.,5.);
      vec2 uv0=vec2(a,r)*rate;
      
      vec2 f=fract(uv0);
      color+=vec4(vec3(ball((f-vec2(.5,.5))*vec2(2.*r*pi,1.)/vec2(rate.x/rate.y,1.),.05)),1.);
      color+=vec4(f,0.,1.);
      gl_FragColor=color;
    }
  }
}

