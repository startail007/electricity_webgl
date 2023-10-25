precision highp float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
void main()
{
  vec4 color = texture2D(uSampler,vTextureCoord);
  // if(vTextureCoord.x<=0.1 || vTextureCoord.y<=0.1){
  //   color = vec4(1.0,0.0,0.0,1.0);
  // }
  gl_FragColor=color;
}
