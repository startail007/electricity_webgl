precision mediump float;
varying vec2 vTextureCoord;
uniform lowp vec2 uSize;
uniform float uTime;
const float pi=3.14159265359;
void main()
{
  vec2 coord=vTextureCoord*uSize;
  float a=sin(uTime*.003+(coord.x/200.)*2.*pi+.5*pi+sin(uTime*.012+pi*coord.x/50.)*.25+exp(sin(uTime*.012+pi*coord.x/50.))*.25+sin(pi*coord.y/100.)*1.6);
  a=pow(exp(2.*a)/exp(2.),.75);
  gl_FragColor=vec4(vec3(a),1.);
}

