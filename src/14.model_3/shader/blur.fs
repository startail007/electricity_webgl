precision highp float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform lowp vec2 uSize;
uniform vec2 uDir;
uniform float uWidth;
const float pi=3.14159265359;
void main()
{
  vec4 colorSum=vec4(0.);
  const int N=50;
  float count = 0.;
  for(int k=0;k<=N;k++){
    float _k = float(k);
    if(_k>uWidth)break;
    float val=cos((_k/min(uWidth,float(N)))*pi*0.5);
    vec2 offset = _k*uDir/uSize;
    colorSum+=val*texture2D(uSampler,vTextureCoord-offset);
    colorSum+=val*texture2D(uSampler,vTextureCoord+offset);
    count+=val*2.;
  }
  colorSum/=count;
  gl_FragColor=colorSum;
}
