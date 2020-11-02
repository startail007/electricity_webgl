precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform lowp vec2 uSize;

// 3x3
vec4 blur5(sampler2D image,vec2 uv,vec2 resolution,vec2 direction){
  vec4 color=vec4(0.);
  vec2 off1=vec2(1.3333333333333333)*direction;
  color+=texture2D(image,uv)*.29411764705882354;
  color+=texture2D(image,uv+(off1/resolution))*.35294117647058826;
  color+=texture2D(image,uv-(off1/resolution))*.35294117647058826;
  return color;
}
// 5x5
vec4 blur9(sampler2D image,vec2 uv,vec2 resolution,vec2 direction){
  vec4 color=vec4(0.);
  vec2 off1=vec2(1.3846153846)*direction;
  vec2 off2=vec2(3.2307692308)*direction;
  color+=texture2D(image,uv)*.2270270270;
  color+=texture2D(image,uv+(off1/resolution))*.3162162162;
  color+=texture2D(image,uv-(off1/resolution))*.3162162162;
  color+=texture2D(image,uv+(off2/resolution))*.0702702703;
  color+=texture2D(image,uv-(off2/resolution))*.0702702703;
  return color;
}
// 7x7
vec4 blur13(sampler2D image,vec2 uv,vec2 resolution,vec2 direction){
  vec4 color=vec4(0.);
  vec2 off1=vec2(1.411764705882353)*direction;
  vec2 off2=vec2(3.2941176470588234)*direction;
  vec2 off3=vec2(5.176470588235294)*direction;
  color+=texture2D(image,uv)*.1964825501511404;
  color+=texture2D(image,uv+(off1/resolution))*.2969069646728344;
  color+=texture2D(image,uv-(off1/resolution))*.2969069646728344;
  color+=texture2D(image,uv+(off2/resolution))*.09447039785044732;
  color+=texture2D(image,uv-(off2/resolution))*.09447039785044732;
  color+=texture2D(image,uv+(off3/resolution))*.010381362401148057;
  color+=texture2D(image,uv-(off3/resolution))*.010381362401148057;
  return color;
}

void main()
{
  vec2 iResolution=uSize/2.;
  
  float offset[4];
  offset[1]=0.;offset[2]=1.3846153846;offset[3]=3.2307692308;
  
  float weight[4];
  weight[1]=.2270270270;weight[2]=.3162162162;weight[3]=.0702702703;
  
  vec4 texCol=texture2D(uSampler,vTextureCoord);
  vec4 texCol0;
  // 垂直
  vec4 color=texCol*weight[0];
  for(int i=1;i<=3;i++){
    texCol0=texture2D(uSampler,vTextureCoord+vec2(0.,offset[i])/iResolution);
    color+=texCol0*weight[i];
    texCol0=texture2D(uSampler,vTextureCoord-vec2(0.,offset[i])/iResolution);
    color+=texCol0*weight[i];
  }
  // 水平
  vec4 color2=texCol*weight[0];
  for(int i=1;i<=3;i++){
    texCol0=texture2D(uSampler,vTextureCoord+vec2(offset[i],0.)/iResolution);
    color2+=texCol0*weight[i];
    texCol0=texture2D(uSampler,vTextureCoord-vec2(offset[i],0.)/iResolution);
    color2+=texCol0*weight[i];
  }
  
  gl_FragColor=texCol+mix(color,color2,.5);
  
  /*vec2 iResolution=uSize/2.;
  vec4 texCol=texture2D(uSampler,vTextureCoord+vec2(10.*sin(vTextureCoord.x*10.5*3.14159),10.*sin(vTextureCoord.y*10.5*3.14159))/iResolution);
  gl_FragColor=texCol;*/
  //gl_FragColor = vec4(vec2(10.*sin(vTextureCoord.x*10.5*3.14159),10.*sin(vTextureCoord.y*10.5*3.14159))/iResolution,0.,1.);
}

/*precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform lowp vec2 uSize;

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
  const int u_width=10;
  
  for(int j=-u_width;j<=u_width;j++)
  {
    for(int i=-u_width;i<=u_width;i++)
    {
      float r=length(vec2(i,j));
      if(r<float(u_width)){
        float rate=smoothstep(1.,0.,r/float(u_width));
        vec2 actStep=vec2(i,j)/uSize;
        float weight=CalcGauss(rate,1.);
        vec4 texCol0=texture2D(uSampler,vTextureCoord+actStep);
        float power=exp(-(texCol0.r+texCol0.g+texCol0.b)/3.);
        gaussCol+=vec4(power*texCol0.rgb*weight,weight)*rate;
      }
    }
  }
  gaussCol.rgb/=gaussCol.w;
  gl_FragColor=vec4(texCol.rgb+gaussCol.rgb,1.);
}*/
/*precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec2 uSize;

float CalcGauss(float x,float sigma)
{
  float coeff=1./(2.*3.14157*sigma);
  float expon=-(x*x)/(2.*sigma);
  return(coeff*exp(expon));
}

void main()
{
  vec2 texC=vTextureCoord;
  vec4 texCol=texture2D(uSampler,texC);
  vec4 gaussCol=vec4(texCol.rgb,1.);
  vec2 step=1./uSize;
  const int u_width=10;
  float u_sigma=1.;
  for(int i=1;i<=u_width;++i)
  {
    vec2 actStep=vec2(float(i)*step.x,0.);// this is for the X-axis
    // vec2 actStep = vec2( 0.0, float(i) * step.y );   this would be for the Y-axis
    
    float weight=CalcGauss(float(i)/float(u_width),u_sigma);
    texCol=texture2D(uSampler,texC+actStep);
    gaussCol+=vec4(texCol.rgb*weight,weight);
    texCol=texture2D(uSampler,texC-actStep);
    gaussCol+=vec4(texCol.rgb*weight,weight);
  }
  gaussCol.rgb/=gaussCol.w;
  gl_FragColor=vec4(gaussCol.rgb,1.);
}*/
