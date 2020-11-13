precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSamplerA;
uniform sampler2D uSamplerB;
void main()
{
  gl_FragColor=texture2D(uSamplerA,vTextureCoord)+texture2D(uSamplerB,vTextureCoord);
}
