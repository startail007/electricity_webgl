precision mediump float;
varying vec2 vTextureCoord;
uniform lowp vec2 uSize;
uniform float uTime;
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
float random(vec2 p){
  float f=dot(p,vec2(127.1,311.7));
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
  float s=sin(d*N+a)/d*.5+.5;
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

float gradual(vec2 p,vec2 a,vec2 b){
  vec2 pa=p-a;
  vec2 ba=b-a;
  return clamp(dot(pa,ba)/dot(ba,ba),0.,1.);
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
float cross(vec2 v0,vec2 v1){
  return v0.x*v1.y-v0.y*v1.x;
}
float lineToLineRate(vec2 uv,vec2 p0,vec2 p1,vec2 p2,vec2 p3){
  vec2 v01=p1-p0;
  vec2 v23=p3-p2;
  vec2 v02=p2-p0;
  float a=cross(v23-v01,v01);
  float b=cross(uv,v23-v01)+cross(v23-v01,p0)+cross(v02,v01);
  float c=cross(uv,v02)+cross(v02,p0);
  return(-b+sqrt(b*b-4.*a*c))/(2.*a);
}
vec2 fourCornerCoord(vec2 uv,vec2 p0,vec2 p1,vec2 p2,vec2 p3,bool crop){
  vec2 v01=p1-p0;
  vec2 v23=p3-p2;
  vec2 v02=p2-p0;
  vec2 v13=p3-p1;
  vec2 v0123=v23-v01;
  
  if(crop){
    if(cross(uv-p0,v01)<0.){
      return vec2(0.);
    }
    if(cross(uv-p2,v23)>0.){
      return vec2(0.);
    }
    if(cross(uv-p0,v02)>0.){
      return vec2(0.);
    }
    if(cross(uv-p1,v13)<0.){
      return vec2(0.);
    }
  }
  
  vec2 a=vec2(0.);
  if(v0123.x==0.&&v0123.y==0.){
    a.x+=(uv.x-p0.x)/v02.x;
    a.y+=(uv.y-p0.y)/v01.y;
  }else if(v0123.x==0.){
    float x=lineToLineRate(uv,p1,p3,p0,p2);
    a.x+=x;
    vec2 p02=mix(p0,p2,x);
    vec2 p13=mix(p1,p3,x);
    a.y+=(uv.y-p02.y)/(p13.y-p02.y);
  }else if(v0123.y==0.){
    float y=lineToLineRate(uv,p0,p1,p2,p3);
    a.y+=y;
    vec2 p01=mix(p0,p1,y);
    vec2 p23=mix(p2,p3,y);
    a.x+=(uv.x-p01.x)/(p23.x-p01.x);
  }else{
    a.x+=lineToLineRate(uv,p1,p3,p0,p2);
    a.y+=lineToLineRate(uv,p0,p1,p2,p3);
  }
  return a;
}
vec4 wave(vec2 uv,float t){
  vec2 f=fract(uv);
  vec2 i=floor(uv);
  f=(f-.5);
  vec2 mainPos=ballPos(vec2(0.,0.),i,t);
  
  vec2 rightPos=ballPos(vec2(1.,0.),i,t);
  vec2 leftPos=ballPos(vec2(-1.,0.),i,t);
  vec2 bottomPos=ballPos(vec2(0.,1.),i,t);
  vec2 topPos=ballPos(vec2(0.,-1.),i,t);
  
  vec2 rightBottomPos=ballPos(vec2(1.,1.),i,t);
  vec2 leftBottomPos=ballPos(vec2(-1.,1.),i,t);
  vec2 rightTopPos=ballPos(vec2(1.,-1.),i,t);
  vec2 leftTopPos=ballPos(vec2(-1.,-1.),i,t);
  
  vec4 c=vec4(0.);
  //c+=vec4(f,0.,1.);
  
  c+=smoothstep(1.,0.,distLine(f,mainPos,rightPos,.05));
  c+=smoothstep(1.,0.,distLine(f,mainPos,leftPos,.05));
  c+=smoothstep(1.,0.,distLine(f,mainPos,bottomPos,.05));
  c+=smoothstep(1.,0.,distLine(f,mainPos,topPos,.05));
  
  c+=ball((f-mainPos),.1);
  c+=ball((f-rightPos),.1);
  c+=ball((f-leftPos),.1);
  c+=ball((f-bottomPos),.1);
  c+=ball((f-topPos),.1);
  vec2 uv0=vec2(0.);
  uv0=fourCornerCoord(f,mainPos,bottomPos,rightPos,rightBottomPos,true);
  c+=vec4(uv0,0.,1.);
  uv0=fourCornerCoord(f,leftPos,leftBottomPos,mainPos,bottomPos,true);
  c+=vec4(uv0,0.,1.);
  uv0=fourCornerCoord(f,topPos,mainPos,rightTopPos,rightPos,true);
  c+=vec4(uv0,0.,1.);
  uv0=fourCornerCoord(f,leftTopPos,leftPos,topPos,mainPos,true);
  c+=vec4(uv0,0.,1.);
  
  return c;
}

void main()
{
  
  vec2 aspectRatio=vec2(uSize.x/uSize.y,1.);
  if(vTextureCoord.x<.5){
    if(vTextureCoord.y<.5){
      //六邊形
      vec4 color=vec4(0.);
      vec2 uv=vTextureCoord;
      uv=uv*2.;
      uv=fract(uv);
      vec2 uvA=uv;
      
      uv-=.5;
      uv*=aspectRatio;
      
      uv*=5.;
      vec2 g=hexagon(uv);
      if(uvA.x<.5){
        color+=vec4(vec3(g,0.),1.);
      }
      vec2 i=uv-g;
      float angle=atan(g.y,g.x);
      g*=rotCoord(.2*(i.x+i.y)*pi-uTime);
      float f=distHexagon(g);
      f=sin(f*40.+angle+.2*(i.x+i.y)*pi-uTime)*.5+.5;
      f=step(f,length(g));
      if(uvA.x>=.5){
        color+=vec4(vec3(f*.5),1.);
      }
      gl_FragColor=color;
    }else{
      //波浪
      vec4 color=vec4(0.);
      vec2 uv=vTextureCoord;
      uv=uv*2.-vec2(0.,1.);
      uv=fract(uv);
      vec2 uvA=uv;
      
      uv-=.5;
      uv*=aspectRatio;
      
      vec2 grid=vec2(10.,10.);
      uv*=grid;
      color+=wave(uv,pi*uTime);
      
      /*float d0=length(uv);
      vec2 uv1=uv-vec2(.25,0.);
      float d1=length(uv1);
      float a0=.5*atan(uv.x,uv.y)/pi+.5;
      float a1=.5*atan(uv1.x,uv1.y)/pi+.5;
      vec2 rate=vec2(20.,20.);
      float a=a0-a1;
      float d=min(d0/d1,d1/d0);
      vec2 uv0=vec2(a,d)*rate;
      vec2 f=fract(uv0);
      color+=vec4(f,0.,1.);*/
      
      //vec2 gv=fract(uv);
      //float gridLineWidth=1.;
      //vec2 gridWidth=gridLineWidth*grid/uSize;
      //if(gv.x<gridWidth.x||gv.x>1.-gridWidth.x||gv.y<gridWidth.y||gv.y>1.-gridWidth.y){color=vec4(vec3(1.,0.,0.),1.);}
      gl_FragColor=color;
    }
  }else{
    if(vTextureCoord.y<.5){
      //漩渦
      vec4 color=vec4(0.);
      vec2 uv=vTextureCoord;
      uv=uv*2.-vec2(1.,0.);
      uv=fract(uv);
      vec2 uvA=uv;
      
      uv-=.5;
      uv*=aspectRatio;
      float d=length(uv);
      float a=.5*atan(uv.x,uv.y)/pi+.5;
      vec2 uv0=vec2(fract(a+d*5.),d);
      if(uvA.x<.5){
        color+=vec4(uv0,0.,1.);
      }
      
      vec2 mainPos=vec2(.5,sin(uTime*.5)*.5+.5);
      color+=ball((uv0-mainPos),.1);
      
      if(uvA.x>=.5){
        color+=vec4(vec3(noise_perlin(uv0*vec2(10.,50.)+vec2(0.,uTime*3.),vec2(0.,0.))*.5+.5),1.);
      }
      gl_FragColor=color;
    }else{
      //圓形座標
      vec4 color=vec4(0.);
      vec2 uv=vTextureCoord;
      uv=uv*2.-vec2(1.,1.);
      uv=fract(uv);
      vec2 uvA=uv;
      
      uv-=.5;
      uv*=aspectRatio;
      
      float d=length(uv);
      float a=.5*atan(uv.x,uv.y)/pi+.5;
      vec2 rate=vec2(20.,10.);
      vec2 uv0=vec2(a,d-uTime*.5)*rate;
      
      vec2 f=fract(uv0);
      vec2 i=floor(uv0);
      float rand0=random(i*10.+vec2(1.,1.));
      float rand1=random(i*20.+vec2(1.,1.));
      
      float a0=i.x/rate.x+.5/rate.x;
      f-=.5;
      if(uvA.x<.5){
        color+=vec4(f,0.,1.);
      }
      float r=.1;
      //f+=vec2((.5-r0)*rand0,(.5-r0)*rand1);
      f+=vec2((.5-r)*rand0,(.5-.25)*rand1);
      f*=vec2(2.*d*pi,1.)/vec2(rate.x/rate.y,1.);
      //f*=rotCoord(a0*2.*pi+pi);//座標轉回來
      
      float rand=random(i*5.);
      //float ballVal=smoothstep(0.,.2,1.-length(f)/r0);
      //float ff=max(1.-r,0.)*(1.-step(rand*.5+.5,.1))*ballVal;
      float val=smoothstep(1.,0.,distLine(f,vec2(0.,-.25),vec2(0.,.25),.05));
      float ff=max(1.-d,0.)*(1.-step(rand*.5+.5,.75))*val;
      if(uvA.x>=.5){
        color+=vec4(vec3(ff),1.);
      }
      gl_FragColor=color;
    }
  }
}

