precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform lowp vec2 uSize;
uniform vec2 uDir;
uniform float uWidth;
uniform float uPower;
const float pi=3.14159265359;
void main()
{
  vec4 color=texture2D(uSampler,vTextureCoord);
  const int N=10;
  float ii=max(uWidth,float(N))/float(N);
  for(int i=1;i<=N;i++){
    if(uWidth<float(N)&&float(i)>uWidth){
      break;
    }
    float val=sin(.5*(float(i)/float(N))*2.*pi+.5*pi);
    float rate=pow(exp(2.*val)/exp(2.),.75);
    color+=rate*texture2D(uSampler,vTextureCoord+float(i)*ii*uDir/uSize);
    color+=rate*texture2D(uSampler,vTextureCoord-float(i)*ii*uDir/uSize);
  }
  //color.rgb/=color.a;
  gl_FragColor=uPower*color;
}
