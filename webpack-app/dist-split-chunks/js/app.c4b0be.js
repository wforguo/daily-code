(window.webpackJsonp=window.webpackJsonp||[]).push([["app"],{"./src/app.js":function(o,e,s){"use strict";s.r(e);var n=s("./node_modules/lodash-es/isArray.js"),t=s("axios"),a=s.n(t),i=s("./node_modules/js-cookie/dist/js.cookie.js"),p=s.n(i),c=s("./node_modules/dayjs/dayjs.min.js"),d=s.n(c);let l=function(){this.data=[],this.init()};s.e("async1").then((()=>{}).bind(null,s)).catch(s.oe),l.prototype={init:function(){document.getElementById("app").innerHTML="Webpack App",console.log("app created"),console.log(Object(n.a)(this.data)),a()({url:"https://forguo.cn/api/common/wechat/sdk"}).then(o=>{})}},p.a.set("name","value",{expires:7,path:""}),console.log(d()().format("YYYY-MM-DD HH:mm:ss")),new l},0:function(o,e,s){s("./node_modules/babel-polyfill/lib/index.js"),o.exports=s("./src/app.js")},axios:function(o,e){o.exports=axios}},[[0,"manifest","vendor"]]]);