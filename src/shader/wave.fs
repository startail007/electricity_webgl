precision mediump float;
varying vec2 vTextureCoord;
uniform lowp vec2 uSize;
uniform float uTime;
const float pi=3.14159;
float wave(vec2 c,float uTime,float xF,float yF,float yF0,float o,float r){
  return sin(uTime*.003+pi*xF+sin(uTime*.001+pi*yF+pi*o)*.25+sin(pi*yF0)*r);
}
void main()
{
  vec2 c=vTextureCoord*uSize;
  float rate=1.-abs(wave(c,uTime,c.x*.005,c.y*.004,c.y*.005,c.x*.008,.8));
  gl_FragColor=vec4(vec3(rate),1.);
}
