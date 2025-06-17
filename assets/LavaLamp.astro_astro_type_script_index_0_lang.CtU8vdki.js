window.addEventListener("load",()=>{const m=document.querySelector(".background-canvas");if(!m){console.error("Canvas element not found");return}if(window.location.hostname==="localhost"&&window.navigator.webdriver){m.style.background="radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.03) 0%, transparent 50%)";return}const e=m.getContext("webgl");if(!e){console.error("WebGL not supported");return}if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){m.style.background="radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.03) 0%, transparent 50%)";return}let i=m.width=window.innerWidth,n=m.height=window.innerHeight;function B(){i=m.width=window.innerWidth,n=m.height=window.innerHeight,e.viewport(0,0,i,n),C()}window.addEventListener("resize",B);let v={x:i/2,y:n/2},M=!1;function D(o){v.x=o.clientX,v.y=o.clientY,M=!0}function U(){M=!1}window.addEventListener("mousemove",D),window.addEventListener("mouseleave",U);const x=document.documentElement.getAttribute("data-theme")==="dark"?[[59/255,130/255,246/255],[251/255,146/255,60/255],[239/255,68/255,68/255],[168/255,85/255,247/255],[245/255,101/255,101/255],[251/255,191/255,36/255]]:[[37/255,99/255,235/255],[234/255,88/255,12/255],[220/255,38/255,127/255],[147/255,51/255,234/255],[185/255,28/255,28/255],[217/255,119/255,6/255]];let d=[];function w(o,t){if(t.length===0){const s=o*1.2,u=[{x:s+i*.2,y:s+n*.2},{x:i-s-i*.2,y:s+n*.2},{x:s+i*.2,y:n-s-n*.2},{x:i-s-i*.2,y:n-s-n*.2}];return u[Math.floor(Math.random()*u.length)]}let r={x:i/2,y:n/2},f=0;const c=20,l=i/c,g=n/c;for(let s=0;s<=c;s++)for(let u=0;u<=c;u++){const h=s*l,y=u*g;if(h<o||h>i-o||y<o||y>n-o)continue;let p=1/0;for(const T of t){const G=Math.sqrt((h-T.x)**2+(y-T.y)**2);p=Math.min(p,G)}p>f&&(f=p,r={x:h,y})}const _=Math.min(l,g)*.3;return r.x+=(Math.random()-.5)*_,r.y+=(Math.random()-.5)*_,r.x=Math.max(o,Math.min(i-o,r.x)),r.y=Math.max(o,Math.min(n-o,r.y)),r}function C(){d=[];const o=Math.min(i,n),t=o*.25,r=o*.5,f=Math.min(Math.max(o*.375,t),r);for(let g=0;g<4;g++){const _=.7+Math.random()*.6,s=Math.min(Math.max(f*_,t),r),u=w(s,d),h=Math.random()*2+.5,y=(Math.random()-.5)*h,p=(Math.random()-.5)*h;d.push({x:u.x,y:u.y,radius:s,color:x[g],vx:y,vy:p,interactive:!1})}const c=Math.min(Math.max(f*.8,t),r);let l=w(c,d);d.push({x:l.x,y:l.y,radius:c,color:x[4],vx:0,vy:0,interactive:!0})}C();const I=`
    attribute vec2 a_position;
    varying vec2 v_uv;
    void main(void) {
      v_uv = a_position * 0.5 + 0.5;
      v_uv.y = 1.0 - v_uv.y;
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `,Y=`
precision mediump float;
varying vec2 v_uv;

uniform vec2 u_resolution;
uniform bool u_darkMode;
uniform int u_circleCount;
uniform vec3 u_circlesColor[6];
uniform vec3 u_circlesPosRad[6];
uniform vec2 u_mouse;

void main(void) {
    vec2 st = v_uv * u_resolution;

    // Background colors that match your design system
    vec3 lightBg = vec3(250.0/255.0, 250.0/255.0, 250.0/255.0); // #FAFAFA
    vec3 darkBg = vec3(10.0/255.0, 10.0/255.0, 10.0/255.0);     // #0A0A0A
    vec3 bgColor = u_darkMode ? darkBg : lightBg;

    float fieldSum = 0.0;
    vec3 weightedColorSum = vec3(0.0);

    for (int i = 0; i < 6; i++) {
        if (i >= u_circleCount) { break; }
        vec3 posRad = u_circlesPosRad[i];
        vec2 cPos = vec2(posRad.r, posRad.g);
        float radius = posRad.b;
        float dist = length(st - cPos);
        float sigma = radius * 0.4;
        float val = exp(- (dist * dist) / (2.0 * sigma * sigma));
        fieldSum += val;
        weightedColorSum += u_circlesColor[i] * val;
    }

    vec3 finalCirclesColor = vec3(0.0);
    if (fieldSum > 0.0) {
      finalCirclesColor = weightedColorSum / fieldSum;
    }

    // More subtle blending for better readability - different opacity for light vs dark mode
    float intensityMultiplier = u_darkMode ? 0.2 : 0.35; // Dark mode: subtle, Light mode: more visible
    float intensity = pow(fieldSum, 1.8) * intensityMultiplier;
    vec3 finalColor = mix(bgColor, finalCirclesColor, clamp(intensity, 0.0, 1.0));
    gl_FragColor = vec4(finalColor, 1.0);
}
  `;function A(o,t){const r=e.createShader(o);return r?(e.shaderSource(r,t),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(console.error("Shader compile error:",e.getShaderInfoLog(r)),e.deleteShader(r),null)):(console.error("Failed to create shader"),null)}const b=A(e.VERTEX_SHADER,I),S=A(e.FRAGMENT_SHADER,Y);if(!b||!S){console.error("Failed to create shaders");return}const a=e.createProgram();if(!a){console.error("Failed to create program");return}if(e.attachShader(a,b),e.attachShader(a,S),e.linkProgram(a),!e.getProgramParameter(a,e.LINK_STATUS)){console.error("Program link error:",e.getProgramInfoLog(a));return}e.useProgram(a);const X=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,X);const q=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]);e.bufferData(e.ARRAY_BUFFER,q,e.STATIC_DRAW);const R=e.getAttribLocation(a,"a_position");e.enableVertexAttribArray(R),e.vertexAttribPointer(R,2,e.FLOAT,!1,0,0);const k=e.getUniformLocation(a,"u_resolution"),L=e.getUniformLocation(a,"u_darkMode"),P=e.getUniformLocation(a,"u_circleCount"),H=e.getUniformLocation(a,"u_circlesColor"),O=e.getUniformLocation(a,"u_circlesPosRad"),V=e.getUniformLocation(a,"u_mouse");e.uniform2f(k,i,n);function F(){const o=document.documentElement.getAttribute("data-theme")==="dark";e.uniform1i(L,o?1:0)}F(),window.addEventListener("themeChange",F);function W(){for(let o=0;o<d.length;o++){const t=d[o];t.interactive?(t.x+=(v.x-t.x)*.05,t.y+=(v.y-t.y)*.05):(t.x+=t.vx,t.y+=t.vy,t.x-t.radius>i&&(t.x=-t.radius),t.x+t.radius<0&&(t.x=i+t.radius),t.y-t.radius>n&&(t.y=-t.radius),t.y+t.radius<0&&(t.y=n+t.radius))}}function E(){W(),e.viewport(0,0,i,n),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),e.useProgram(a),e.uniform1i(P,d.length),e.uniform2f(k,i,n),e.uniform2f(V,v.x,v.y);const o=document.documentElement.getAttribute("data-theme")==="dark";e.uniform1i(L,o?1:0);let t=[],r=[];const f=M?d.length:d.length-1;for(let c=0;c<6;c++)if(c<f){const l=d[c];t.push(l.color[0],l.color[1],l.color[2]),r.push(l.x,l.y,l.radius)}else t.push(0,0,0),r.push(0,0,0);e.uniform1i(P,f),e.uniform3fv(H,new Float32Array(t)),e.uniform3fv(O,new Float32Array(r)),e.drawArrays(e.TRIANGLES,0,6),requestAnimationFrame(E)}E()});
