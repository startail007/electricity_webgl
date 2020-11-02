precision mediump float;
varying highp vec2 vTextureCoord;
uniform sampler2D uSampler;
varying vec2 vertPos;
uniform lowp vec2 uMouse;
uniform lowp vec2 uSize;
uniform float uFilter[9];

void main(void){
  vec2 pos=vertPos*uSize;
  vec2 distVec=pos-uMouse;
  float distance=length(distVec);
  if(distance>160.){
    gl_FragColor=texture2D(uSampler,vTextureCoord);
  }else if(distance>159.){
    gl_FragColor=vec4(1.,0.,0.,1.);
  }else{
    vec2 offsBlur=vec2(1.,1.)/uSize;
    vec4 colorSum=vec4(0.);
    for(int j=-1;j<=1;j++){
      for(int i=-1;i<=1;i++){
        colorSum+=texture2D(uSampler,vTextureCoord+offsBlur*vec2(i,j))*uFilter[(j+1)*3+(i+1)];
      }
    }
    gl_FragColor=vec4(colorSum.rgb,1.);
  }
}

/*precision mediump float;
varying highp vec2 vTextureCoord;
uniform sampler2D uSampler;
varying vec2 vertPos;
uniform vec2 uMouse;
uniform vec2 uSize;
uniform float uFilter[9];
uniform float uFilterWeight;

float CalcGauss(float x,float sigma)
{
  float coeff=1./(2.*3.14157*sigma);
  float expon=-(x*x)/(2.*sigma);
  return(coeff*exp(expon));
}

void main()
{
  vec4 texCol=texture2D(uSampler,vTextureCoord);
  vec4 gaussCol=vec4(texCol.rgb,1.);
  vec2 step=1./uSize;
  const int u_width=2;
  float u_sigma=1.;
  for(int j=-u_width;j<=u_width;j++)
  {
    for(int i=-u_width;i<=u_width;i++)
    {
      vec2 actStep=vec2(float(i)*step.x,float(j)*step.y);
      float weight=CalcGauss(float(i)/float(u_width),u_sigma);
      texCol=texture2D(uSampler,vTextureCoord+actStep);
      gaussCol+=vec4(texCol.rgb*weight,weight);
      texCol=texture2D(uSampler,vTextureCoord-actStep);
      gaussCol+=vec4(texCol.rgb*weight,weight);
    }
  }
  gaussCol.rgb/=gaussCol.w;
  gl_FragColor=vec4(gaussCol.rgb,1.);
}*/