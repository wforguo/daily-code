(window["vue2-app"]=window["vue2-app"]||[]).push([["AmapDrop"],{"02a5":function(t,n,e){"use strict";e("bdc6")},"6e85":function(t,n,e){var r=e("e510"),a=e("e7ef");r({global:!0,forced:parseFloat!=a},{parseFloat:a})},"7bb4":function(t,n,e){"use strict";var r=e("938b"),a=e("2b4e"),i=e("5775"),o=e("d66e"),c=e("871f"),l=e("f3c8"),s=e("8299"),f=e("8199"),u=e("fa7a"),d=e("724e"),v=Array;t.exports=function(t){var n=i(t),e=l(this),h=arguments.length,p=h>1?arguments[1]:void 0,b=void 0!==p;b&&(p=r(p,h>2?arguments[2]:void 0));var y,m,g,M,w,A,x=d(n),_=0;if(!x||this===v&&c(x))for(y=s(n),m=e?new this(y):v(y);y>_;_++)A=b?p(n[_],_):n[_],f(m,_,A);else for(M=u(n,x),w=M.next,m=e?new this:[];!(g=a(w,M)).done;_++)A=b?o(M,p,[g.value,_],!0):g.value,f(m,_,A);return m.length=_,m}},a090:function(t,n,e){"use strict";e("2305");var r=e("e510"),a=e("2b4e"),i=e("a840"),o=e("74da"),c=e("c061"),l=function(){var t=!1,n=/[ac]/;return n.exec=function(){return t=!0,/./.exec.apply(this,arguments)},!0===n.test("abc")&&t}(),s=/./.test;r({target:"RegExp",proto:!0,forced:!l},{test:function(t){var n=o(this),e=c(t),r=n.exec;if(!i(r))return a(s,n,e);var l=a(r,n,e);return null!==l&&(o(l),!0)}})},b708:function(t,n,e){var r=e("e510"),a=e("30d5");r({target:"Array",stat:!0},{isArray:a})},bdc6:function(t,n,e){},d66e:function(t,n,e){var r=e("74da"),a=e("700f");t.exports=function(t,n,e,i){try{return i?n(r(e)[0],e[1]):n(e)}catch(o){a(t,"throw",o)}}},e64a:function(t,n,e){"use strict";e.r(n);var r=function(){var t=this;t._self._c;return t._m(0)},a=[function(){var t=this,n=t._self._c;return n("div",{attrs:{id:"map"}},[n("div",{attrs:{id:"container"}}),n("div",{attrs:{id:"loading"}},[t._v("加载中...")])])}],i=e("8fa8");e("b708");function o(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}function c(t){if(Array.isArray(t))return o(t)}e("f14b"),e("f49f"),e("5fda"),e("3102"),e("20b3"),e("59dc"),e("f4a8");function l(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}e("1688"),e("1b5b"),e("2305"),e("a090");function s(t,n){if(t){if("string"===typeof t)return o(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?o(t,n):void 0}}e("9349"),e("f87a");function f(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function u(t){return c(t)||l(t)||s(t)||f()}e("6e85"),e("faea"),e("1ef9"),e("01e5"),e("5445");var d=null,v={name:"AmapDrop",title:"高德地图下钻",data:function(){},mounted:function(){var t=this;this.$nextTick((function(){t.init()}))},destroyed:function(){d=null},methods:{init:function(){d=new AMap.Map("container",{resizeEnable:!1,center:[106.889724,35.086912],zoom:4});var t=document.getElementById("loading"),n=[],e=[],r=["#f04864","#facc14","#2fc25b","#1890ff","#8543e0"];function a(){e.length>0&&d.remove(e),n.length>0&&d.remove(n),n=[],e=[]}function o(t,n){return Math.floor(Math.random()*(n-t))+t}function c(t){try{for(var n=t.length,e=0,r=0,a=0,i=0;i<t.length;i++)if(""!=t[i]){var c=t[i],l=void 0,s=void 0,f=void 0,u=void 0,d=void 0;s=parseFloat(c[0])*Math.PI/180,l=parseFloat(c[1])*Math.PI/180,f=Math.cos(l)*Math.cos(s),u=Math.cos(l)*Math.sin(s),d=Math.sin(l),e+=f,r+=u,a+=d}e/=n,r/=n,a/=n;var v=Math.atan2(r,e),h=Math.atan2(a,Math.sqrt(e*e+r*r)),p=.01*o(2,12),b=.01*o(3,12);return[180*v/Math.PI+p,180*h/Math.PI+b]}catch(y){console.warn("获取中心坐标失败"),console.log(y)}}var l={},s=function(t,e){var r=new AMap.Polygon({strokeWeight:2,path:t,fillOpacity:.4,clickable:!1,fillColor:e,strokeColor:e,lineJoin:"round"});n.push(r)},f=function(t){var n=t.name,r=void 0===n?"":n,a=t.count,i=void 0===a?0:a,c=t.center,l=void 0===c?[]:c,s=t.color,f=void 0===s?"#111":s,u=new AMap.Marker({content:"<div class='area-map-marker' style='color: ".concat(f,"'>\n                      <div class='area-map-marker__title' style='font-weight: bold;'>").concat(r,"</div>\n                      <div class='area-map-marker__count'>").concat(i||o(100,1e4),"</div>\n                      <div class='area-map-marker__title'>").concat(t.children?"我可以下钻":"","</div>\n                    </div>"),anchor:"center",draggable:!1,cursor:"pointer",position:l,extData:t,zIndex:1e3});e.push(u),t.children&&u.on("mousedown",(function(t){v(t)})),u.setMap(d)},v=function(t){var n=t.target.De.extData,e=n.level,r=n.id;p(r,e+1)},h=function(n){var e=n.id,r=n.level;return console.log(e,r),new Promise((function(n,a){if(!(r>4))return 3===r&&2!=e?(t.style.visibility="hidden",!1):void fetch("../data/areaList-".concat(r,".json")).then((function(t){return t.json()})).then((function(t){n(t)}))["catch"]((function(n){a(n),t.style.visibility="hidden"}));t.style.visibility="hidden"}))},p=function(e){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;t.style.visibility="visible",h({id:e,level:o}).then((function(e){a(),e.map((function(t,n){var e=[];if(t.areaIdList.map((function(t){if(l[t]){var a=JSON.parse(JSON.stringify(l[t]));a.map((function(t){e=[].concat(u(e),u(t)),s(JSON.parse(JSON.stringify(t)),r[n%5])}))}})),e.length>0){var a=c(e);f(Object(i["a"])(Object(i["a"])({},t),{},{center:a,color:r[n%5]}))}})),t.style.visibility="hidden",d.add(n),d.setFitView(n)}),(function(){t.style.visibility="hidden"}))},b=function(){return t.style.visibility="visible",new Promise((function(n,e){fetch("../data/areaPath.json").then((function(t){return t.json()})).then((function(t){l=t,p(),n(t)}))["catch"]((function(n){e(n),t.style.visibility="hidden"}))}))};b()}}},h=v,p=(e("02a5"),e("0abc")),b=Object(p["a"])(h,r,a,!1,null,null,null);n["default"]=b.exports},e7ef:function(t,n,e){var r=e("dcf5"),a=e("2178"),i=e("d501"),o=e("c061"),c=e("0c89").trim,l=e("51a5"),s=i("".charAt),f=r.parseFloat,u=r.Symbol,d=u&&u.iterator,v=1/f(l+"-0")!==-1/0||d&&!a((function(){f(Object(d))}));t.exports=v?function(t){var n=c(o(t)),e=f(n);return 0===e&&"-"==s(n,0)?-0:e}:f},f4a8:function(t,n,e){var r=e("e510"),a=e("7bb4"),i=e("48b9"),o=!i((function(t){Array.from(t)}));r({target:"Array",stat:!0,forced:o},{from:a})}}]);