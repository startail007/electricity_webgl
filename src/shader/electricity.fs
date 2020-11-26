precision mediump float;
varying vec2 vTextureCoord;
uniform lowp vec2 uSize;
uniform float uTime;

uniform float uLineWidth;

uniform vec2 uStartPos;
uniform vec2 uEndPos;
uniform float uOffset;

uniform bool uBranchBool;
uniform vec2 uBranchStartPos;
uniform vec2 uBranchEndPos;
uniform float uBranchOffset;
uniform bool uStartFixed;
uniform bool uEndFixed;
//uniform sampler2D uSampler;

const float pi=3.14159265359;
const int OCTAVE_NUM=5;

float distLine(vec2 p,vec2 a,vec2 b,float w){
  vec2 pa=p-a;
  vec2 ba=b-a;
  float t=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);
  return length(pa-ba*t)/w;
}
float gradual(vec2 p,vec2 a,vec2 b){
  vec2 pa=p-a;
  vec2 ba=b-a;
  return clamp(dot(pa,ba)/dot(ba,ba),0.,1.);
}
vec3 random3(vec3 p){
  vec3 f=vec3(
    dot(p,vec3(1.271,3.117,.695)),
    dot(p,vec3(2.695,1.833,1.327)),
    dot(p,vec3(2.473,1.085,.965))
  );
  return-1.+2.*fract(sin(f)*437.585453123);
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
    dot(p,vec2(1.271,3.117)),
    dot(p,vec2(2.695,1.833))
  );
  return-1.+2.*fract(sin(f)*437.585453123);
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

float fbm_noise_perlin(vec2 p,vec2 loop){
  float f=0.;
  float a=.5;
  for(int i=0;i<OCTAVE_NUM;i++)
  {
    f+=a*noise_perlin(p,loop);
    p*=2.;
    a/=2.;
  }
  return f;
}
vec4 drawLight(float d){
  float highColorRate=smoothstep(1.,0.,d);
  float baseColorRate=smoothstep(1.,0.,d/4.);
  float glowColorRate=smoothstep(1.,0.,d/8.);
  float endColorRate=smoothstep(1.,0.,d/16.);
  vec4 highColor=vec4(1.,1.,1.,1.);
  vec4 baseColor=vec4(.35,.98,.98,1.);
  vec4 glowColor=vec4(.28,.73,.78,1.);
  vec4 endColor=vec4(.2,.25,.91,1.);
  vec4 color=mix(.5*baseColor,highColor,highColorRate)*endColorRate;
  color=mix(.25*glowColor,color,baseColorRate)*endColorRate;
  color=mix(.125*endColor,color,glowColorRate)*endColorRate;
  return color;
}
vec4 distLightLine(vec2 p,vec2 a,vec2 b,float w){
  float d=distLine(p,a,b,w);
  return drawLight(d);
}
vec2 swingFun(vec2 uv,vec2 startPos,vec2 endPos,float power,float offset,float time){
  vec2 v=endPos-startPos;
  v=normalize(v);
  vec2 uv0=uv*clamp(500./max(power,10.),1.75,10.);
  float a=0.;
  if(power>100.){
    a=fbm_noise_perlin(vec3(uv0,time));
  }else{
    a=abs(noise_perlin(vec3(uv0,time*2.)))-.5;
  }
  v=vec2(-v.y,v.x);
  vec2 move=a*vec2(cos(a*2.*pi),sin(a*2.*pi))+offset*v;
  return move*.3*power/length(uSize);
  
}
vec4 elBall(vec2 uv,vec2 pos,float r,float time){
  /*vec2 v=uv-pos;
  float len00=length(v);
  float a00=.5*atan(v.x,v.y)/pi+.5;
  float a=noise_perlin(vec2(a00*10.,len00*.2+time),vec2(10.,100.));
  vec2 move=30.*a*normalize(vec2(cos(a*2.*pi),sin(a*2.*pi))+v*.2);
  return.5*drawLight(length(v+move)/r);*/
  
  /*float a=fbm_abs_noise_perlin(vec3(uv*0.05,time));
  vec2 move=10.*a*vec2(cos(a*2.*pi),sin(a*2.*pi));
  float len = length(uv-pos+move);
  return drawLight(len)+0.5*drawLight(a*len/min(r*4.,1.))*clamp(1.-len/200.,0.,1.);*/
  float len = length(uv-pos);
  if(len<25.){
    float a=abs(noise_perlin(vec3(uv*0.1,time)));
    return 0.15*drawLight(a*len/min(r*4.,1.))*pow(clamp(1.-len/25.,0.,1.),3.);
  }else{
    return vec4(0.);
  }
}

void main()
{
  vec4 color=vec4(0.);
  vec2 coord=vTextureCoord*uSize;
  float d=distLine(coord,uStartPos,uEndPos,1.);
  float len=distance(uStartPos,uEndPos);
  float d1=distLine(coord,uBranchStartPos,uBranchEndPos,1.);
  float len1=distance(uBranchStartPos,uBranchEndPos);
  vec2 aspectRatio=vec2(uSize.x/uSize.y,1.);
  if(d<max(len,200.)||(uBranchBool&&d1<max(len1,200.))){
    
    {
      float gradualVal=gradual(coord,uStartPos,uEndPos);
      float swing=sin(gradualVal*pi);
      swing=1.-pow(1.-swing,2.);
      
      float gradualVal1=0.;
      float branchSwing=0.;
      if(uBranchBool){
        gradualVal1=gradual(coord,uBranchStartPos,uBranchEndPos);
        branchSwing=sin(gradualVal1*pi);
        branchSwing=1.-pow(1.-branchSwing,2.);
        if(!uStartFixed&&uEndFixed){
          swing=mix(swing,branchSwing,gradualVal1);
        }else if(uStartFixed&&!uEndFixed){
          swing=mix(swing,branchSwing,1.-gradualVal1);
        }else if(!uStartFixed&&!uEndFixed){
          swing=mix(swing,branchSwing,branchSwing);
        }else{
          swing=mix(swing,branchSwing,1.-branchSwing);
        }
      }
      
      vec2 uv001=vTextureCoord;
      if(swing!=0.){
        uv001+=swing*swingFun(1.2*uv001*aspectRatio,uStartPos,uEndPos,1.2*len,uOffset,uTime*3.);
        if(uBranchBool){
          if(branchSwing!=0.){
            uv001+=gradualVal1*branchSwing*swingFun(1.2*uv001*aspectRatio,uBranchStartPos,uBranchEndPos,1.2*len1,uBranchOffset,uTime*3.);
          }
        }
      }
      
      float r=clamp(pow(.5*length(uSize)/len,2.),uLineWidth,uLineWidth*2.);
      //uv001*=uSize;
      float gradualVal2=gradualVal;
      if(uBranchBool){
        gradualVal2=gradualVal1;
      }
      r*=mix(1.-.5*sin(gradualVal2*pi),3.,clamp(10./len,0.,1.));
      
      if(uBranchBool){
        color+=distLightLine(uv001,uBranchStartPos/uSize,uBranchEndPos/uSize,r/uSize.y);
      }else{
        color+=distLightLine(uv001,uStartPos/uSize,uEndPos/uSize,r/uSize.y);
      }
      
      /*if(uBranchBool){
        if(uStartFixed){
          color+=elBall(coord,uBranchStartPos,1./len1,uTime*3.);
        }
        if(uEndFixed){
          color+=elBall(coord,uBranchEndPos,1./len1,uTime*3.);
        }
      }else{
        if(uStartFixed){
          color+=elBall(coord,uStartPos,1./len,uTime*3.);
        }
        if(uEndFixed){
          color+=elBall(coord,uEndPos,1./len,uTime*3.);
        }
      }*/
    }
    
    /*if(uBranchBool){
      if(uStartFixed){
        color+=elBall(coord,uBranchStartPos,len1*.02,-uTime*3.);
      }
      if(uEndFixed){
        color+=elBall(coord,uBranchEndPos,len1*.02,uTime*3.);
      }
    }else{
      if(uStartFixed){
        color+=elBall(coord,uStartPos,len*.02,-uTime*3.);
      }
      if(uEndFixed){
        color+=elBall(coord,uEndPos,len*.02,uTime*3.);
      }
    }*/
    /*{
      vec2 uv=coord-uEndPos;
      float len=length(uv);
      float noise0=abs(noise_perlin(vec2((20.*(.5*atan(uv.y,uv.x)/pi+.5)),len/20.-uTime*5.),vec2(20.,0.)));
      float noise1=abs(noise_perlin(vec2((20.*(.5*atan(uv.y,uv.x)/pi+.5)),len/20.-uTime*5.+1.),vec2(20.,0.)));
      float a0=smoothstep(.05,0.,noise0);
      float a1=smoothstep(.05,0.,noise1);
      float baseColorRate=smoothstep(1.,0.,len/100.);
      color+=max((a0+a1*baseColorRate)-1.,0.)*pow(baseColorRate,2.)*vec4(.5,1.,1.,0.);
    }*/
    
  }
  
  gl_FragColor=color;
}

