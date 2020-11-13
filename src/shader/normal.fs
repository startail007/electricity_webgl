precision mediump float;
varying vec2 vTextureCoord;
uniform lowp vec2 uSize;
uniform sampler2D uSampler;
uniform float uHeight;
const float pi=3.14159265359;
void main()
{
  vec2 iResolution=uSize/2.;
  vec4 texCol=texture2D(uSampler,vTextureCoord);
  vec2 dir=vec2(0.);
  const int N=8;
  float w=0.;
  for(int i=0;i<N;i++)
  {
    float angle=2.*pi*float(i)/float(N);
    vec2 pos=vec2(cos(angle),sin(angle));
    dir+=(texCol.r-texture2D(uSampler,vTextureCoord+pos/iResolution).r)*pos;
    w+=1.;
  }
  dir/=w;
  dir*=vec2(1.,-1.);
  vec3 normal=normalize(vec3(min(uHeight,200.)*dir,-1));
  gl_FragColor=vec4(normal.xy*.5+vec2(.5),uHeight*texCol.r/200.,1.);
  
}
