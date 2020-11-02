varying lowp vec4 vColor;
varying highp vec2 vTextureCoord;
uniform sampler2D uSampler;
varying highp vec2 vertPos;
uniform lowp vec2 uMouse;
uniform lowp vec2 uSize;

void main(void){
  highp vec2 pos=vertPos*uSize;
  highp vec2 distVec=pos-uMouse;
  highp float distance=length(distVec);
  highp vec3 rgb=vColor.rgb*texture2D(uSampler,vTextureCoord).rgb;
  //gl_FragColor=vColor;
  if(distance<100.){
    highp float a=pow(1.-distance/100.,2.)*(sin(distance/3.)+1.)*.5;
    gl_FragColor=vec4(rgb*(.1+.9*a),1.);
  }else{
    gl_FragColor=vec4(rgb*.1,1.);
  }
}