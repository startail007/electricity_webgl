precision mediump float;
varying vec2 vTextureCoord;
uniform lowp vec2 uSize;
uniform sampler2D uNormalSampler;
uniform sampler2D uSampler;
uniform float uRefractiveIndex;
uniform float uDistance;

void main()
{
  vec4 texCol=texture2D(uNormalSampler,vTextureCoord);
  vec2 pos=(2.*texCol.rg-vec2(1.));
  pos.x*=-1.;
  vec3 refract=refract(vec3(0.,0.,1.),normalize(vec3(pos,-1.)),uRefractiveIndex);
  refract*=(texCol.b*200.+uDistance)/refract.z;
  vec4 texCol00=texture2D(uSampler,vTextureCoord+refract.xy/uSize);
  gl_FragColor=texCol00;
}
