function atvImg(){function e(e,t,a,r,n,s){var i=l.scrollTop,o=l.scrollLeft,d=t?e.touches[0].pageX:e.pageX,c=t?e.touches[0].pageY:e.pageY,v=a.getBoundingClientRect(),m=a.clientWidth||a.offsetWidth||a.scrollWidth,f=a.clientHeight||a.offsetHeight||a.scrollHeight,h=320/m,g=.52-(d-v.left-o)/m,u=.52-(c-v.top-i)/f,p=c-v.top-i-f/2,y=d-v.left-o-m/2,C=(g-y)*(.07*h),E=(p-u)*(.1*h),I="rotateX("+E+"deg) rotateY("+C+"deg)",N=Math.atan2(p,y),x=180*N/Math.PI-90;0>x&&(x+=360),-1!=a.firstChild.className.indexOf(" over")&&(I+=" scale3d(1.07,1.07,1.07)"),a.firstChild.style.transform=I,s.style.background="linear-gradient("+x+"deg, rgba(255,255,255,"+(c-v.top-i)/f*.4+") 0%,rgba(255,255,255,0) 80%)",s.style.transform="translateX("+g*n-.1+"px) translateY("+u*n-.1+"px)";for(var b=n,L=0;n>L;L++)r[L].style.transform="translateX("+g*b*(2.5*L/h)+"px) translateY("+u*n*(2.5*L/h)+"px)",b--}function t(e,t){t.firstChild.className+=" over"}function a(e,t,a,r,n){var l=t.firstChild;l.className=l.className.replace(" over",""),l.style.transform="",n.style.cssText="";for(var s=0;r>s;s++)a[s].style.transform=""}var r=document,n=r.documentElement,l=r.getElementsByTagName("body")[0],s=window,i=r.querySelectorAll(".atvImg"),o=i.length,d="ontouchstart"in s||navigator.msMaxTouchPoints;if(!(0>=o))for(var c=0;o>c;c++){var v=i[c],m=v.querySelectorAll(".atvImg-layer"),f=m.length;if(!(0>=f)){for(;v.firstChild;)v.removeChild(v.firstChild);var h=r.createElement("div"),g=r.createElement("div"),u=r.createElement("div"),p=r.createElement("div"),y=[];v.id="atvImg__"+c,h.className="atvImg-container",g.className="atvImg-shine",u.className="atvImg-shadow",p.className="atvImg-layers";for(var C=0;f>C;C++){var E=r.createElement("div"),I=m[C].getAttribute("data-img");E.className="atvImg-rendered-layer",E.setAttribute("data-layer",C),E.style.backgroundImage="url("+I+")",p.appendChild(E),y.push(E)}h.appendChild(u),h.appendChild(p),h.appendChild(g),v.appendChild(h);var N=v.clientWidth||v.offsetWidth||v.scrollWidth;v.style.transform="perspective("+3*N+"px)",d?(s.preventScroll=!1,function(r,n,l,i){v.addEventListener("touchmove",function(t){s.preventScroll&&t.preventDefault(),e(t,!0,r,n,l,i)}),v.addEventListener("touchstart",function(e){s.preventScroll=!0,t(e,r)}),v.addEventListener("touchend",function(e){s.preventScroll=!1,a(e,r,n,l,i)})}(v,y,f,g)):!function(r,n,l,s){v.addEventListener("mousemove",function(t){e(t,!1,r,n,l,s)}),v.addEventListener("mouseenter",function(e){t(e,r)}),v.addEventListener("mouseleave",function(e){a(e,r,n,l,s)})}(v,y,f,g)}}} atvImg();