precision highp float;
varying vec2 vTextureCoord;
uniform sampler2D uGlowSampler;
uniform sampler2D uSampler;
uniform lowp vec2 uSize;
uniform float uTime;
const float pi=3.14159265359;
const int OCTAVE_NUM=3;
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
float fbm_abs_noise_perlin(vec2 p,vec2 loop){
  float f=0.;
  float a=.5;
  for(int i=0;i<OCTAVE_NUM;i++)
  {
    f+=a*abs(noise_perlin(p,loop));
    p*=2.;
    a/=2.;
  }
  return f;
}
void main()
{
  vec4 diff = vec4(0.0);
  const int n = 5;
  for(int i=-n;i<=n;i++){
    vec4 centerColor = texture2D(uSampler, vTextureCoord+vec2(float(i),0.) / uSize);
    vec4 leftColor = texture2D(uSampler, vTextureCoord+vec2(float(i),0.) / uSize-vec2(1.,0.) / uSize);
    float rate = abs((1.-abs(float(i)/float(n))));
    diff+=abs(centerColor-leftColor)*pow(rate,1.5);
  }
  for(int i=-n;i<=n;i++){
    vec4 centerColor = texture2D(uSampler, vTextureCoord+vec2(0.,float(i)) / uSize);
    vec4 topColor = texture2D(uSampler, vTextureCoord+vec2(0.,float(i)) / uSize-vec2(0.,1.) / uSize);
    float rate = abs((1.-abs(float(i)/float(n))));
    diff+=abs(centerColor-topColor)*pow(rate,1.5);
  }
  float power = (cos(uTime*pi)+1.)*0.5;
  float f=fbm_noise_perlin(vTextureCoord*20.+vec2(0.,-20.*fract(uTime*0.01)),vec2(20.,20.))*.5+.5;
  float f1=fbm_abs_noise_perlin(vTextureCoord*10.,vec2(10.,10.))*.5+.5;
  vec4 glowColor = texture2D(uGlowSampler,vTextureCoord);
  vec4 color = texture2D(uSampler,vTextureCoord);
  vec4 outColor = 0.5*(cos(f*40.+uTime*0.1)+1.)*vec4(diff.rgb,1.)*vec4(0.4,0.7,1.,1.);
  float f0 =pow((glowColor.r + glowColor.g + glowColor.b)/3.,0.5);
  vec4 _glowColor = glowColor*((1.-f0)*vec4(0.3,0.8,0.9,1.)+f0*vec4(0.8,0.8,1.,1.));
  //gl_FragColor = color+outColor+_glowColor;
  //gl_FragColor = vec4(vec3(f2),1.);
  vec4 c = texture2D(uSampler, vTextureCoord);
  vec4 t = texture2D(uSampler, vTextureCoord-vec2(0.,1.) / uSize);
  vec4 diff0 = c-t;
  float a = (diff0.r + diff0.g + diff0.b)/3.;
  float f2=fbm_noise_perlin(vTextureCoord*30.+vec2(0.,-30.*fract(uTime*0.05)*(0.5+_glowColor.r*0.5)),vec2(30.,30.))*.5+.5;
  gl_FragColor = color+outColor+_glowColor*f2*3.;
  //gl_FragColor = 2.*outColor;
}
