precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform sampler2D uLineWidthSampler;
uniform lowp vec2 uSize;

void main()
{
  const float pi=3.14159;
  vec4 gaussCol=vec4(0.,0.,0.,0.);
  float sum=0.;
  const int lineWidth=5;
  bool b=false;
  
  gaussCol+=texture2D(uSampler,vTextureCoord);
  sum+=texture2D(uLineWidthSampler,vTextureCoord).r;
  for(int l=0;l<8;l++)
  {
    float angle=2.*pi*float(l)/8.;
    vec2 pos=vec2(cos(angle),sin(angle));
    for(int k=1;k<=lineWidth;k++)
    {
      float r=float(k);
      vec2 coord=vTextureCoord+r*pos/uSize;
      vec4 texCol0=texture2D(uLineWidthSampler,coord);
      if(texCol0.r>0.){
        float rr=float(lineWidth)*texCol0.r;
        if(r<rr){
          vec4 texCol1=texture2D(uSampler,coord);
          float rate=r/rr;
          gaussCol+=vec4(texCol1.rgb,rate);
          sum+=texCol0.r*smoothstep(1.,0.,rate);
        }
      }
    }
  }
  
  /*for(int j=-lineWidth;j<=lineWidth;j++)
  {
    for(int i=-lineWidth;i<=lineWidth;i++)
    {
      vec2 pos=vec2(i,j);
      vec2 coord=vTextureCoord+pos/uSize;
      vec4 texCol0=texture2D(uLineWidthSampler,coord);
      
      if(texCol0.r>0.){
        float r=length(pos);
        float rr=float(lineWidth)*texCol0.r;
        
        if(r<rr){
          vec4 texCol1=texture2D(uSampler,coord);
          float rate=r/rr;
          gaussCol+=vec4(texCol1.rgb,rate);
          sum+=texCol0.r*smoothstep(1.,0.,rate);
        }
      }
    }
  }*/
  /*if(b||sum>1.){
    sum=1.;
  }*/
  gaussCol.rgb/=gaussCol.w;
  
  gl_FragColor=vec4(gaussCol.rgb*sum,1.);
  
}