precision mediump float;
varying vec2 vTextureCoord;
uniform lowp vec2 uSize;
uniform float uTime;
uniform vec2 uStartPos;
uniform vec2 uControlPos;
uniform vec2 uEndPos;
const float pi=3.14159265359;

float distLine(vec2 p,vec2 a,vec2 b,float w){
  vec2 pa=p-a;
  vec2 ba=b-a;
  float t=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);
  return length(pa-ba*t)/w;
}
float ball(vec2 f,float r){
  return smoothstep(1.,.99,length(f)/r);
}
float cross(vec2 v0,vec2 v1){
  return v0.x*v1.y-v0.y*v1.x;
}
vec2 getQuadraticCurveTo(vec2 p0,vec2 p1,vec2 p2,float t){
  return p0*(1.-t)*(1.-t)+p1*2.*(1.-t)*t+p2*t*t;
}
vec2 getQuadraticCurveToTangent(vec2 p0,vec2 p1,vec2 p2,float t){
  return 2.*t*(p0-p1*2.+p2)+2.*(-p0+p1);
}
/*float distLine0(vec2 p,vec2 a,vec2 b){
  vec2 pa=p-a;
  vec2 ba=b-a;
  float t=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);
  return length(pa-ba*t);
}*/
vec2 quadraticCurve(vec2 p,vec2 a,vec2 b,vec2 c,float w){
  float s=.5;
  float rate=.5;
  const int N=8;
  vec2 p0=getQuadraticCurveTo(a,b,c,0.);
  vec2 p2=getQuadraticCurveTo(a,b,c,1.);
  vec2 p1=getQuadraticCurveTo(a,b,c,rate);
  for(int i=0;i<N;i++){
      vec2 t=getQuadraticCurveToTangent(a,b,c,rate);
      t=vec2(-t.y,t.x);
      if(cross(p-p1,t)<0.){
        rate-=s*.5;
        p2=p1;
      }else{
        rate+=s*.5;
        p0=p1;
      }
    s*=.5;
    p1=getQuadraticCurveTo(a,b,c,rate);
  }
  return vec2(distLine(p,p0,p2,w),rate);
}
void main()
{
  
  vec4 color=vec4(0.);
  vec2 uv=vTextureCoord*uSize;
  
  vec2 uv0=quadraticCurve(uv,uStartPos,uControlPos,uEndPos,5.);
  color+=uv0.y;
  color=mix(color,vec4(1.,0.,0.,1.),smoothstep(1.,0.,uv0.x));
  
  vec2 p=getQuadraticCurveTo(uStartPos,uControlPos,uEndPos,fract(uTime*.1));
  color+=ball(uv-p,5.);
  
  vec2 t=getQuadraticCurveToTangent(uStartPos,uControlPos,uEndPos,fract(uTime*.1));
  t=vec2(-t.y,t.x);
  color+=smoothstep(1.,0.,distLine(uv,p,p+10.*normalize(t),1.));


  // color += vec4(vec3(smoothstep(1.,0.,distLine(uv,uStartPos,uControlPos,50.0))),1.0);
  // float a0 = smoothstep(1.,0.,length(uv-uStartPos)*0.005);
  // float a1 = smoothstep(1.,0.,length(uv-uControlPos)*0.005);
  // float a2 = smoothstep(1.,0.,length(uv-uEndPos)*0.005);
  // color+=vec4(vec3(max(max(a0,a1),a2)),1.0);
  
  gl_FragColor=color;
}

