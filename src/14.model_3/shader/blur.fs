precision highp float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform lowp vec2 uSize;
const float pi=3.14159265359;
void main()
{
  vec2 dirX=vec2(1.,0.);
  vec2 dirY=vec2(0.,1.);
  float width=20.;
  float power=0.03;
  vec4 color=texture2D(uSampler,vTextureCoord);
  const int N=20;
  float ii=max(width,float(N))/float(N);
  for(int i=1;i<=N;i++){
    if(width<float(N)&&float(i)>width){
      break;
    }
    float val=cos((float(i)/float(N))*pi);
    float rate=pow(exp(2.*val)/exp(2.),.75);
    color+=rate*texture2D(uSampler,vTextureCoord+float(i)*ii*normalize(vec2(-1.,-1.))/uSize);
    color+=rate*texture2D(uSampler,vTextureCoord-float(i)*ii*vec2(0.,-1.)/uSize);
    color+=rate*texture2D(uSampler,vTextureCoord+float(i)*ii*normalize(vec2(1.,-1.))/uSize);
    color+=rate*texture2D(uSampler,vTextureCoord+float(i)*ii*vec2(-1.,0.)/uSize);
    color+=rate*texture2D(uSampler,vTextureCoord-float(i)*ii*vec2(0.,0.)/uSize);
    color+=rate*texture2D(uSampler,vTextureCoord+float(i)*ii*vec2(1.,0.)/uSize);
    color+=rate*texture2D(uSampler,vTextureCoord+float(i)*ii*normalize(vec2(-1.,1.))/uSize);
    color+=rate*texture2D(uSampler,vTextureCoord-float(i)*ii*vec2(0.,1.)/uSize);
    color+=rate*texture2D(uSampler,vTextureCoord+float(i)*ii*normalize(vec2(1.,1.))/uSize);
  }
  gl_FragColor=power*color;
}
