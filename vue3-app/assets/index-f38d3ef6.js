var k=Object.defineProperty;var S=(t,e,n)=>e in t?k(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var y=(t,e,n)=>(S(t,typeof e!="symbol"?e+"":e,n),n);import{a as axios,d as defineStore,b as defineComponent,r as ref,o as onBeforeRouteUpdate,c as onBeforeRouteLeave,e as createBlock,w as withCtx,f as resolveComponent,g as openBlock,h as createCommentVNode,i as createVNode,j as createTextVNode,t as toDisplayString,k as createBaseVNode,u as useRouter,l as createElementBlock,F as Fragment,m as renderList,n as unref,p as onBeforeMount,q as nextTick,s as onMounted,v as onBeforeUpdate,x as onUpdated,y as onRenderTracked,z as onRenderTriggered,A as onErrorCaptured,S as Suspense,E as ElMessage,B as reactive,C as normalizeClass,D as isRef,G as pushScopeId,H as popScopeId,I as createRouter,J as createWebHistory,K as createApp,L as createPinia,M as installer,N as A,O as o,P as registerMicroApps,Q as start}from"./vendor-d35d7d21.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function n(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(s){if(s.ep)return;s.ep=!0;const a=n(s);fetch(s.href,a)}})();const log$1={};function typeColor(t="default"){let e="";switch(t){case"default":e="#515a6e";break;case"primary":e="#409eff";break;case"success":e="#67c23a";break;case"warning":e="#e6a23c";break;case"info":e="#909399";break;case"danger":e="#f56c6c";break}return e}log$1.capsule=function(t,e,n="primary"){console.log(`%c ${t} %c ${e} %c`,"background:#35495E; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;",`background:${typeColor(n)}; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff;`,"background:transparent")};log$1.colorful=function(t){console.log(`%c${t.map(e=>JSON.stringify(e.text||"")).join("%c")}`,...t.map(e=>`color: ${typeColor(e.type)};`))};log$1.default=function(t){log$1.colorful([{text:t}])};log$1.primary=function(t){log$1.colorful([{text:t,type:"primary"}])};log$1.success=function(t){log$1.colorful([{text:t,type:"success"}])};log$1.warning=function(t){log$1.colorful([{text:t,type:"warning"}])};log$1.info=function(t){log$1.colorful([{text:t,type:"info"}])};log$1.danger=function(t){log$1.colorful([{text:t,type:"danger"}])};class Request{constructor(e){y(this,"instance");y(this,"abortControllerMap");this.instance=axios.create(e),this.abortControllerMap=new Map,this.setInterceptors(this.instance)}request(e){return this.instance(e)}setInterceptors(e){e.interceptors.request.use(n=>{const r=n.url||"",s=new AbortController;n.signal=s.signal,this.abortControllerMap.set(r,s);const a=localStorage.getItem("token");return n&&n.headers&&a&&(n.headers={...n.headers,token:a}),n}),e.interceptors.response.use(n=>{const r=n.config.url||"";return this.abortControllerMap.delete(r),axios.isCancel(n)?(console.log("Request canceled",n),Promise.reject(n)):n.status===200?Promise.resolve(n.data):(log$1.danger(n),Promise.reject(n))})}cancelAllRequest(){for(const[,e]of this.abortControllerMap)e.abort();this.abortControllerMap.clear()}cancelRequest(e){var r;const n=Array.isArray(e)?e:[e];for(const s of n)(r=this.abortControllerMap.get(s))==null||r.abort(),this.abortControllerMap.delete(s)}}const instance=new Request,request=t=>instance.request(t),cancelRequest=t=>instance.cancelRequest(t),user={login:t=>request({method:"post",url:"/api/user/login",data:t})},api={user},useUserStore=defineStore({id:"user",state:()=>({name:"",isAdmin:!1,signature:""}),actions:{logout(){this.$patch({name:"",isAdmin:!1})},async login(t,e){const n=await api.user.login({user:t,password:e}),r={name:t,...n.data};console.log("login-success",r),this.$patch(r)}}}),useMenuStore=defineStore({id:"menu",state:()=>({list:[]}),actions:{updateMenu(t){this.$patch({list:[...this.list,...t]})}}}),_hoisted_1$b=createBaseVNode("span",null,"vue2微应用",-1),_hoisted_2$3=createBaseVNode("div",{id:"vue2App"},null,-1),_sfc_main$j=defineComponent({__name:"App",setup(t){ref(!1);const e=useMenuStore(),n=useRouter();onBeforeRouteUpdate(s=>{console.log({...n},s)}),onBeforeRouteLeave(s=>{console.log({...n},s)});const r=s=>{console.log(s),n.push({name:s})};return(s,a)=>{const c=resolveComponent("el-menu-item"),d=resolveComponent("el-menu"),w=resolveComponent("el-aside"),m=resolveComponent("el-breadcrumb-item"),f=resolveComponent("el-breadcrumb"),v=resolveComponent("el-header"),i=resolveComponent("router-view"),g=resolveComponent("el-card"),x=resolveComponent("el-main"),b=resolveComponent("el-footer"),C=resolveComponent("el-container");return openBlock(),createBlock(C,{style:{height:"100vh",overflow:"hidden"}},{default:withCtx(()=>[createCommentVNode("",!0),createVNode(C,null,{default:withCtx(()=>[createVNode(v,{style:{"background-color":"#f6f9fe",display:"flex","align-items":"center"}},{default:withCtx(()=>[createVNode(f,{"separator-class":"el-icon-arrow-right"},{default:withCtx(()=>[createVNode(m,null,{default:withCtx(()=>{var _,u;return[createTextVNode(toDisplayString((u=(_=s.$route)==null?void 0:_.meta)==null?void 0:u.title),1)]}),_:1})]),_:1})]),_:1}),createVNode(x,{style:{background:"#f2f3f5"}},{default:withCtx(()=>[createVNode(g,{style:{width:"100%",height:"100%","box-sizing":"border-box",display:"flex","flex-direction":"column"},shadow:"never","body-style":"flex: 1;width: 100%; height: 100%;"},{default:withCtx(()=>[createVNode(i),_hoisted_2$3]),_:1})]),_:1}),createVNode(b,{style:{display:"none","background-color":"#f6f9fe","align-items":"center","justify-content":"center"}},{default:withCtx(()=>[createTextVNode(" © 2022 ")]),_:1})]),_:1})]),_:1})}}}),main="",scriptRel="modulepreload",assetsURL=function(t){return"/daily-code/vue3-app/"+t},seen={},__vitePreload=function(e,n,r){if(!n||n.length===0)return e();const s=document.getElementsByTagName("link");return Promise.all(n.map(a=>{if(a=assetsURL(a),a in seen)return;seen[a]=!0;const c=a.endsWith(".css"),d=c?'[rel="stylesheet"]':"";if(!!r)for(let f=s.length-1;f>=0;f--){const v=s[f];if(v.href===a&&(!c||v.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${a}"]${d}`))return;const m=document.createElement("link");if(m.rel=c?"stylesheet":scriptRel,c||(m.as="script",m.crossOrigin=""),m.href=a,document.head.appendChild(m),c)return new Promise((f,v)=>{m.addEventListener("load",f),m.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${a}`)))})})).then(()=>e())},_hoisted_1$a={class:"page algorithm"},__default__$9={name:"AlgorithmView",title:"算法",inheritAttrs:!1,customOptions:{}},_sfc_main$i=defineComponent({...__default__$9,setup(t){return onBeforeMount(()=>{}),(e,n)=>(openBlock(),createElementBlock("div",_hoisted_1$a,"算法"))}}),__vite_glob_0_0=Object.freeze(Object.defineProperty({__proto__:null,default:_sfc_main$i},Symbol.toStringTag,{value:"Module"})),_sfc_main$h=defineComponent({__name:"FactoryPatterns",props:{title:String},setup(__props){console.log("工厂模式");const code=`
// 构造函数和创建者分离
function Jquery (selector) {
  this.selector = document.querySelectorAll(selector)
}
// new操作单独封装
window.$ = function (selector) {
  return new Jquery(selector)
}
var p = $('div')
console.log(p)
    `;return nextTick(()=>{eval(code)}),(t,e)=>{const n=resolveComponent("highlightjs"),r=resolveComponent("el-card");return openBlock(),createBlock(r,null,{header:withCtx(()=>[createTextVNode(toDisplayString(__props.title),1)]),default:withCtx(()=>[createVNode(n,{language:"JavaScript",lineNumbers:"",autodetect:!1,code})]),_:1})}}}),_sfc_main$g=defineComponent({__name:"SinglePatterns",props:{title:String},setup(__props){const code=`
class SingleObject {
    showMessage() {
      console.log('showMessage', this)
    }
}
SingleObject.getInstance = (function () {
   let instance = null
    return function () {
      if (!instance) {
        instance =  new SingleObject()
      }
      return instance
    }
})()

console.log(SingleObject.getInstance() === SingleObject.getInstance())
    `;return nextTick(()=>{eval(code)}),(t,e)=>{const n=resolveComponent("highlightjs"),r=resolveComponent("el-card");return openBlock(),createBlock(r,null,{header:withCtx(()=>[createTextVNode(toDisplayString(__props.title),1)]),default:withCtx(()=>[createVNode(n,{language:"JavaScript",autodetect:!1,code})]),_:1})}}}),_sfc_main$f=defineComponent({__name:"AdaptPatterns",props:{title:String},setup(__props){const code=`
class SpecialRequest {
    request() {
      return 'old'
    }
}

class Request {
  constructor() {
    // 封装旧接口
    this.adptor = new SpecialRequest()
  }
  request () {
    let type = this.adptor.request()
    console.log(type)
  }
}
new Request().request()
    `;return nextTick(()=>{eval(code)}),(t,e)=>{const n=resolveComponent("highlightjs"),r=resolveComponent("el-card");return openBlock(),createBlock(r,null,{header:withCtx(()=>[createTextVNode(toDisplayString(__props.title),1)]),default:withCtx(()=>[createVNode(n,{language:"JavaScript",lineNumbers:"",autodetect:!1,code})]),_:1})}}}),_sfc_main$e=defineComponent({__name:"DecoratorPatterns",props:{title:String},setup(__props){const code=`
class Circle {
    constructor() {
        this.border = 'none'
    }
    draw() {
        console.log('draw Circle', this)
    }
}

class Client {
    constructor(circle) {
        this.circle = circle
    }
    // 添加新功能
    draw() {
        this.circle.draw()
        this.setBorder(this.circle)
        this.circle.draw()
    }
    setBorder(circle) {
        circle.border = '1px'
        console.log('setBorder', circle)
    }
}
new Client(new Circle()).draw()
    `;return nextTick(()=>{eval(code)}),(t,e)=>{const n=resolveComponent("el-alert"),r=resolveComponent("highlightjs"),s=resolveComponent("el-card");return openBlock(),createBlock(s,null,{header:withCtx(()=>[createTextVNode(toDisplayString(__props.title),1)]),default:withCtx(()=>[createVNode(n,null,{default:withCtx(()=>[createTextVNode("AOP 面向切片编程")]),_:1}),createVNode(r,{language:"JavaScript",lineNumbers:"",autodetect:!1,code})]),_:1})}}}),_sfc_main$d=defineComponent({__name:"ProxyPatterns",props:{title:String},setup(__props){const code=`
class ReadImg {
  constructor(fileName) {
    this.fileName = fileName
    this.loadImg()
  }
  show() {
    console.log('show image', this.fileName)
  }
  loadImg() {
    console.log('load image', this.fileName)

  }
}
class ProxyImg {
  constructor(fileName) {
    this.img = new ReadImg(fileName)
  }
  show() {
    this.img.show()
  }
}

new ProxyImg('www.png').show()
    `;return nextTick(()=>{eval(code)}),(t,e)=>{const n=resolveComponent("highlightjs"),r=resolveComponent("el-card");return openBlock(),createBlock(r,null,{header:withCtx(()=>[createTextVNode(toDisplayString(__props.title),1)]),default:withCtx(()=>[createVNode(n,{language:"JavaScript",lineNumbers:"",autodetect:!1,code})]),_:1})}}}),_sfc_main$c=defineComponent({__name:"IteratorPatterns",props:{title:String},setup(__props){console.log("设计模式");const code=`

// 迭代器模式
class Iterator {
    constructor(container) {
        this.list = container.list
        this.index = 0
    }
    hasNext() {
        return this.index < this.list.length
    }
    next() {
        if (this.hasNext()) {
            return this.list[this.index++]
        }
        return null
    }
}

class Container {
    constructor(list) {
        this.list = list
    }
    getGetIterator() {
        return new Iterator(this)
    }
}

const arr = [100, 99, 3]
const list = new Container(arr)
const generate = list.getGetIterator()
console.log(generate.next())
console.log(generate.next())
console.log(generate.next())
console.log(generate.next())

// ES6 iterator
const iterator = arr[Symbol.iterator]()
// 有数据返回 {value: 100, done: false}
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
// 没有数据返回 {value: undefined, done: true}
console.log(iterator.next())

// for of 语法
function each(data) {
    // iterator 实现
    const iterator = data[Symbol.iterator]()
    let item = { done: false }
    while (!item.done) {
        item = iterator.next()
        if (!item.done) {
            console.log(item.value)
        }
    }
    // for of 实现
    for (const item of data) {
        console.log(item)
    }
}

each(arr)

    `;return nextTick(()=>{eval(code)}),(t,e)=>{const n=resolveComponent("highlightjs"),r=resolveComponent("el-card");return openBlock(),createBlock(r,null,{header:withCtx(()=>[createTextVNode(toDisplayString(__props.title),1)]),default:withCtx(()=>[createVNode(n,{language:"JavaScript",autodetect:!1,code})]),_:1})}}}),_hoisted_1$9={class:"page page-scroll-y design-patterns"},__default__$8={name:"DesignPatterns",title:"设计模式",inheritAttrs:!1,customOptions:{}},_sfc_main$b=defineComponent({...__default__$8,setup(t){return(e,n)=>{const r=resolveComponent("el-link"),s=resolveComponent("el-descriptions-item"),a=resolveComponent("el-descriptions"),c=resolveComponent("el-collapse-item"),d=resolveComponent("el-alert"),w=resolveComponent("el-collapse");return openBlock(),createElementBlock("div",_hoisted_1$9,[createVNode(r,{href:"//forguo.cn",target:"_blank",type:"primary"},{default:withCtx(()=>[createTextVNode("设计模式")]),_:1}),createVNode(w,null,{default:withCtx(()=>[createVNode(c,{title:"面向对象"},{default:withCtx(()=>[createVNode(a,{title:"",column:1},{default:withCtx(()=>[createVNode(s,{label:"面向对象的概念"}),createVNode(s,{label:"面向对象的三要素"}),createVNode(s,{label:"面向对象的意义"},{default:withCtx(()=>[createTextVNode(" 数据结构化 比如浏览器的渲染，最终是解析成了DOM树，cssom，最后才去渲染 ")]),_:1}),createVNode(s,{label:"jQuery中的应用"})]),_:1})]),_:1}),createVNode(c,{title:"5大设计原则"},{default:withCtx(()=>[createVNode(a,{title:"",column:1},{default:withCtx(()=>[createVNode(s,{label:"S"},{default:withCtx(()=>[createTextVNode("单一职责原则")]),_:1}),createVNode(s,{label:"O"},{default:withCtx(()=>[createTextVNode("开放封闭原则（开放扩展，封闭修改）")]),_:1}),createVNode(s,{label:"L"},{default:withCtx(()=>[createTextVNode("李氏置换原则")]),_:1}),createVNode(s,{label:"I"},{default:withCtx(()=>[createTextVNode("接口独立原则")]),_:1}),createVNode(s,{label:"D"},{default:withCtx(()=>[createTextVNode("依赖导致原则")]),_:1})]),_:1})]),_:1}),createVNode(c,{title:"23种设计模式"},{default:withCtx(()=>[createVNode(unref(_sfc_main$h),{title:"工厂模式"}),createVNode(unref(_sfc_main$g),{title:"单列模式"}),createVNode(unref(_sfc_main$f),{title:"适配器模式"}),createVNode(unref(_sfc_main$e),{title:"装饰器模式"}),createVNode(unref(_sfc_main$d),{title:"代理模式"}),createVNode(unref(_sfc_main$c),{title:"迭代器模式"}),createVNode(d,{type:"success",closable:!1,style:{"margin-bottom":"12px"}},{default:withCtx(()=>[createTextVNode("订阅、发布模式")]),_:1}),createVNode(d,{type:"success",closable:!1,style:{"margin-bottom":"12px"}},{default:withCtx(()=>[createTextVNode("原型模式")]),_:1}),createVNode(d,{type:"success",closable:!1,style:{"margin-bottom":"12px"}},{default:withCtx(()=>[createTextVNode("状态模式")]),_:1}),createVNode(d,{type:"success",closable:!1,style:{"margin-bottom":"12px"}},{default:withCtx(()=>[createTextVNode("享元模式")]),_:1}),createVNode(d,{type:"success",closable:!1,style:{"margin-bottom":"12px"}},{default:withCtx(()=>[createTextVNode("策略模式")]),_:1}),createVNode(d,{type:"success",closable:!1,style:{"margin-bottom":"12px"}},{default:withCtx(()=>[createTextVNode("策略模式")]),_:1})]),_:1})]),_:1})])}}}),index_vue_vue_type_style_index_0_lang="",__vite_glob_0_1=Object.freeze(Object.defineProperty({__proto__:null,default:_sfc_main$b},Symbol.toStringTag,{value:"Module"}));var __defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(t,e,n,r)=>{for(var s=r>1?void 0:r?__getOwnPropDesc(e,n):e,a=t.length-1,c;a>=0;a--)(c=t[a])&&(s=(r?c(e,n,s):c(s))||s);return r&&s&&__defProp(e,n,s),s};const log=function(t="log"){return function(e,n,r){const s=r.value;return r.value=async function(){console.log(`log ${t} ${n} start`),await s.apply(this,arguments),console.log(`log ${t} ${n} end`)},r}},rawCode$1=async()=>{const t=function(){return console.log("asyncF1",Date.now()),new Promise(s=>{setTimeout(()=>{console.log("resolve 1"),s("async 1")},1e3)})},e=function(){return console.log("asyncF2",Date.now()),new Promise(s=>{setTimeout(()=>{console.log("resolve 2"),s("async 2")},1e3)})};await async function(){try{const[s,a]=await Promise.all([t(),e()]);console.log(s,a)}catch(s){console.log(s)}}();class r{constructor(a){y(this,"name");this.name=a}getName(){console.log("getName",Date.now())}}__decorateClass([log("get")],r.prototype,"getName",1),new r("test").getName()},_hoisted_1$8={class:"page es6"},__default__$7={name:"ES6View",title:"ES6",inheritAttrs:!1,customOptions:{}},_sfc_main$a=defineComponent({...__default__$7,setup(t){return onBeforeMount(async()=>{rawCode$1()}),(e,n)=>(openBlock(),createElementBlock("div",_hoisted_1$8,"es6"))}}),__vite_glob_0_2=Object.freeze(Object.defineProperty({__proto__:null,default:_sfc_main$a},Symbol.toStringTag,{value:"Module"})),_sfc_main$9=defineComponent({__name:"Timer",props:{msg:null},emits:["count-down"],setup(t){ref(3);const e=ref("00:00:00"),n=()=>{const r=new Date,s=r.getHours()<10?`0${r.getHours()}`:r.getHours(),a=r.getMinutes()<10?`0${r.getMinutes()}`:r.getMinutes(),c=r.getSeconds()<10?`0${r.getSeconds()}`:r.getSeconds();e.value=`${s}:${a}:${c}`,window.requestAnimationFrame(n)};return onMounted(()=>{n()}),(r,s)=>{const a=resolveComponent("el-alert"),c=resolveComponent("el-card");return openBlock(),createBlock(c,null,{default:withCtx(()=>[createVNode(a,{class:"we-timer",closable:!1},{default:withCtx(()=>[createTextVNode("现在是："+toDisplayString(e.value),1)]),_:1})]),_:1})}}}),Timer_vue_vue_type_style_index_0_scoped_c6424004_lang="",_export_sfc=(t,e)=>{const n=t.__vccOpts||t;for(const[r,s]of e)n[r]=s;return n},Timer=_export_sfc(_sfc_main$9,[["__scopeId","data-v-c6424004"]]),_sfc_main$8=defineComponent({name:"AsyncShow",async setup(){return{res:(await request({url:"https://api.forguo.cn/common/wechat/sdk",params:{url:window.location.href}})).data}}});function _sfc_render$1(t,e,n,r,s,a){const c=resolveComponent("el-card");return openBlock(),createBlock(c,{shadow:"hover"},{header:withCtx(()=>[createTextVNode("我是异步组件")]),default:withCtx(()=>[createBaseVNode("div",null,toDisplayString(t.res.data),1)]),_:1})}const AsyncShow=_export_sfc(_sfc_main$8,[["render",_sfc_render$1]]),_hoisted_1$7={class:"home"},__default__$6={name:"HomeView",title:"首页"},_sfc_main$7=defineComponent({...__default__$6,setup(t){return console.log("1-开始创建组件-----setup()"),onBeforeMount(()=>{console.log("2-组件挂载到页面之前执行-----onBeforeMount()")}),onMounted(()=>{console.log("3-组件挂载到页面之后执行-----onMounted()")}),onBeforeUpdate(()=>{console.log("4-组件更新之前-----onBeforeUpdate()")}),onUpdated(()=>{console.log("5-组件更新之后-----onUpdated()")}),onRenderTracked(e=>{console.log("状态跟踪组件----------->"),console.log(e)}),onRenderTriggered(e=>{console.log("状态触发组件--------------->"),console.log(e)}),onErrorCaptured(e=>{console.log("/*******************/"),console.log(e),console.log("/*******************/")}),(e,n)=>{const r=resolveComponent("el-divider");return openBlock(),createElementBlock("div",_hoisted_1$7,[createVNode(unref(Timer),{title:1,type:"success"}),createVNode(r),(openBlock(),createBlock(Suspense,null,{default:withCtx(()=>[createVNode(AsyncShow)]),fallback:withCtx(()=>[createTextVNode("加载中...")]),_:1}))])}}}),__vite_glob_0_3=Object.freeze(Object.defineProperty({__proto__:null,default:_sfc_main$7},Symbol.toStringTag,{value:"Module"})),_hoisted_1$6={class:"page js-base"},__default__$5={name:"JsBaseView",title:"JS基础",inheritAttrs:!1,customOptions:{}},_sfc_main$6=defineComponent({...__default__$5,setup(t){return onBeforeMount(()=>{}),(e,n)=>(openBlock(),createElementBlock("div",_hoisted_1$6,"JS基础"))}}),__vite_glob_0_4=Object.freeze(Object.defineProperty({__proto__:null,default:_sfc_main$6},Symbol.toStringTag,{value:"Module"})),_hoisted_1$5={class:"page web-api"},__default__$4={name:"WebApiView",title:"WebApi",inheritAttrs:!1,customOptions:{}},_sfc_main$5=defineComponent({...__default__$4,setup(t){return onBeforeMount(()=>{}),(e,n)=>(openBlock(),createElementBlock("div",_hoisted_1$5,"Web Api"))}}),__vite_glob_0_5=Object.freeze(Object.defineProperty({__proto__:null,default:_sfc_main$5},Symbol.toStringTag,{value:"Module"})),_sfc_main$4=defineComponent({components:{},title:"状态",setup(){const t=useUserStore();return{user:t,handleAddCart:async()=>{console.log(t),await t.login("admin","root"),console.log("handleAddCart --->"),ElMessage.success("Login Success~")}}}}),_hoisted_1$4={class:"page pinia"},_hoisted_2$2=createBaseVNode("hr",null,null,-1);function _sfc_render(t,e,n,r,s,a){const c=resolveComponent("el-button");return openBlock(),createElementBlock("div",_hoisted_1$4,[createBaseVNode("p",null,"name: "+toDisplayString(t.user.name),1),createBaseVNode("p",null,"signature: "+toDisplayString(t.user.signature||""),1),createBaseVNode("p",null,toDisplayString(JSON.stringify(t.user)),1),createVNode(c,{onClick:t.handleAddCart},{default:withCtx(()=>[createTextVNode("登录")]),_:1},8,["onClick"]),_hoisted_2$2])}const index$1=_export_sfc(_sfc_main$4,[["render",_sfc_render]]),__vite_glob_0_6=Object.freeze(Object.defineProperty({__proto__:null,default:index$1},Symbol.toStringTag,{value:"Module"})),_hoisted_1$3={class:"page race"},__default__$3={name:"HomeView",title:"竞态问题"},_sfc_main$3=defineComponent({...__default__$3,setup(t){const e=ref("");let n=reactive({data:[]});const r=async a=>{try{cancelRequest("/api/search");const c=await request({method:"post",url:"/api/search",data:{keyword:a}});n.data=c.data}catch(c){axios.isCancel(c)?console.log("Request canceled",c):console.log("request",c)}},s=()=>{const c=axios.CancelToken.source();axios.get("/search",{cancelToken:c.token}).catch(function(d){axios.isCancel(d)?console.log("Request canceled",d.message):console.log("request",d)}),axios.post("/search",{name:"new name"},{cancelToken:c.token}),c.cancel("Operation canceled by the user.")};return onBeforeMount(()=>{r()}),(a,c)=>{const d=resolveComponent("el-link"),w=resolveComponent("el-divider"),m=resolveComponent("el-input"),f=resolveComponent("el-table-column"),v=resolveComponent("el-table"),i=resolveComponent("el-button"),g=resolveComponent("el-card");return openBlock(),createElementBlock("div",_hoisted_1$3,[createVNode(g,null,{default:withCtx(()=>[createVNode(d,{target:"_blank",href:"https://mp.weixin.qq.com/s/smOJHGkPegvs5ENv7PTbmw"},{default:withCtx(()=>[createTextVNode("竞态问题")]),_:1}),createTextVNode("   "),createVNode(d,{target:"_blank",href:"https://juejin.cn/post/7071518211392405541#heading-13"},{default:withCtx(()=>[createTextVNode("axios封装")]),_:1}),createVNode(w),createVNode(m,{modelValue:e.value,"onUpdate:modelValue":c[0]||(c[0]=x=>e.value=x),onInput:r,clearable:"",placeholder:"请输入搜索内容"},null,8,["modelValue"]),createVNode(w),createVNode(v,{data:unref(n).data,"empty-text":"暂无数据"},{default:withCtx(()=>[createVNode(f,{prop:"name",label:"姓名"}),createVNode(f,{prop:"age",label:"年龄"}),createVNode(f,{prop:"city",label:"城市"})]),_:1},8,["data"]),createVNode(i,{onClick:s},{default:withCtx(()=>[createTextVNode("取消请求")]),_:1})]),_:1})])}}}),__vite_glob_0_7=Object.freeze(Object.defineProperty({__proto__:null,default:_sfc_main$3},Symbol.toStringTag,{value:"Module"})),_withScopeId=t=>(pushScopeId("data-v-0c24da10"),t=t(),popScopeId(),t),_hoisted_1$2=_withScopeId(()=>createBaseVNode("video",{id:"local",class:"talking-video",autoplay:"",playsinline:"",muted:""},null,-1)),_hoisted_2$1=[_hoisted_1$2],_hoisted_3=_withScopeId(()=>createBaseVNode("div",{class:"talking-device"},[createBaseVNode("video",{id:"remote",class:"talking-video",autoplay:"",playsinline:""})],-1)),_hoisted_4=["innerHTML"],_hoisted_5={class:"talking-tool"},__default__$2={name:"TalkingView",title:"Rtc通信"},_sfc_main$2=defineComponent({...__default__$2,setup(t){const e=new RTCPeerConnection;let n=ref(""),r=ref(""),s=ref("");const a=ref('Using text interpolation: <span style="color: red">This should be red.</span><script>console.log("alert(1)")<\/script>Using v-html directive: This should be red.'),c=async()=>{const _=document.getElementById("local"),u=document.getElementById("remote"),p=await navigator.mediaDevices.getUserMedia({video:!0,audio:!0});_.srcObject=p,p.getTracks().forEach(l=>{console.log(l),e.addTrack(l,p)}),e.ontrack=l=>{u.srcObject=l.streams[0]};let h=e.createDataChannel("myDataChannel");h.onopen=l=>{ElMessage.success("文件通道已打开"),console.log("🚀🚀🚀 / event",l)},h.onclose=l=>{ElMessage.warning("文件通道已关闭")},h.onerror=l=>{ElMessage.error("文件通道发生错误")},h.onmessage=l=>{console.log("🚀🚀🚀 / event",l)},e.createOffer({offerToReceiveVideo:!0,offerToReceiveAudio:!0}).then(l=>(console.log(l),e.setLocalDescription(l).then(()=>l))).then(l=>new Promise((N,$)=>{d("http://127.0.0.1",window.btoa(l.sdp)).then(V=>{N(V)},function(V){$(V)})})).then(l=>e.setRemoteDescription(new RTCSessionDescription({type:"answer",sdp:window.atob(l)}))).then(()=>{}).catch(l=>{throw l}),h.send("Hello world!")},d=(_,u)=>new Promise((p,h)=>{let l=new XMLHttpRequest;l.onreadystatechange=()=>{if(l.readyState===4&&l.status>=200&&l.status<300){let N=l.responseText;l.onreadystatechange=new Function,l=null,p(N)}},l.open("POST",_.replace("webrtc","http"),!0),l.send(u)}),w=async()=>{const _=await e.createOffer();await e.setLocalDescription(_),e.onicecandidate=async u=>{u.candidate&&(n.value=JSON.stringify(e.localDescription))}},m=async()=>{const _=JSON.parse(n.value);e.onicecandidate=async p=>{p.candidate&&(r.value=JSON.stringify(e.localDescription))},await e.setRemoteDescription(_);const u=await e.createAnswer();await e.setLocalDescription(u)},f=async()=>{const _=JSON.parse(r.value);e.currentRemoteDescription||e.setRemoteDescription(_)};let v=[],i=null;const g=async()=>{try{const _=await navigator.mediaDevices.getDisplayMedia({video:!0,audio:!0});x(_)}catch(_){console.log(_)}},x=_=>{const u=MediaRecorder.isTypeSupported("video/webm; codecs=vp9")?"video/webm; codecs=vp9":"video/webm";i=new MediaRecorder(_,{mimeType:u}),i.ondataavailable=function(p){v.push(p.data)},i.onstop=function(){let p=new Blob(v,{type:"video/mp4"}),h=window.URL.createObjectURL(p),l=document.createElement("video");l.src=h,l.controls=!0,document.body.appendChild(l)},i.start()},b=()=>{i.stop(),setTimeout(()=>{C()},500)},C=()=>{const _=new Blob(v,{type:"video/mp4"}),u=URL.createObjectURL(_),p=document.createElement("a");p.href=u,p.style.display="none",p.download=`record.${Date.now()}.mp4`,p.click(),ElMessage.success("下载成功")};return(_,u)=>{const p=resolveComponent("el-input"),h=resolveComponent("el-button");return openBlock(),createElementBlock("div",{class:normalizeClass(["page",["talking",{loading:unref(s)}]])},[createBaseVNode("div",{class:normalizeClass(["talking-inner",{loading:unref(s)}])},[createBaseVNode("div",{class:normalizeClass(["talking-device",unref(s)])},_hoisted_2$1,2),_hoisted_3,createBaseVNode("div",null,[createVNode(p,{modelValue:unref(n),"onUpdate:modelValue":u[0]||(u[0]=l=>isRef(n)?n.value=l:n=l),placeholder:"offer"},null,8,["modelValue"]),createVNode(p,{modelValue:unref(r),"onUpdate:modelValue":u[1]||(u[1]=l=>isRef(r)?r.value=l:r=l),placeholder:"answer"},null,8,["modelValue"]),createBaseVNode("div",{innerHTML:a.value},null,8,_hoisted_4)])],2),createBaseVNode("div",_hoisted_5,[createVNode(h,{onClick:c,type:"primary"},{default:withCtx(()=>[createTextVNode("1、发起通话")]),_:1}),createVNode(h,{onClick:w,type:"primary"},{default:withCtx(()=>[createTextVNode("2、创建 offer")]),_:1}),createVNode(h,{onClick:m,type:"primary"},{default:withCtx(()=>[createTextVNode("3、创建 answer")]),_:1}),createVNode(h,{onClick:f,type:"primary"},{default:withCtx(()=>[createTextVNode("4、添加 answer")]),_:1}),createVNode(h,{onClick:g},{default:withCtx(()=>[createTextVNode("开始录屏")]),_:1}),createVNode(h,{onClick:b},{default:withCtx(()=>[createTextVNode("结束录屏并下载")]),_:1})])],2)}}}),index_vue_vue_type_style_index_0_scoped_0c24da10_lang="",index=_export_sfc(_sfc_main$2,[["__scopeId","data-v-0c24da10"]]),__vite_glob_0_8=Object.freeze(Object.defineProperty({__proto__:null,default:index},Symbol.toStringTag,{value:"Module"})),rawCode=()=>{function t(){console.log("hello")}t();class e{constructor(g){y(this,"name");this.name=g}}const n=new e("www");console.log(n.name);class r{constructor(g){this.name=g}}const s=new r("http");console.log(s.name);class a{constructor(g){this.name=g}}class c extends a{constructor(g,x){super(g),this.age=x}}console.log(new c("罗翔",18));class d{constructor(g,x){y(this,"_name");this._age=x,this._name=g}get age(){return this._age}set age(g){this._age=g}say(){return"I am "+this._age+"years old"}static sayLove(){return"I Love you"}}const w=new d("www",18);w.age=20,console.log(w.age);let m;(i=>{i[i.success=200]="success",i[i.error=201]="error",i[i.auth=401]="auth"})(m||(m={})),console.log(201),console.log(m[200]);let f;f=1,f="2";function v(i){return i}f.length},_hoisted_1$1={class:"page"},__default__$1={name:"TsView",title:"Ts",inheritAttrs:!1,customOptions:{}},_sfc_main$1=defineComponent({...__default__$1,setup(t){return onBeforeMount(()=>{rawCode()}),(e,n)=>(openBlock(),createElementBlock("div",_hoisted_1$1,"typescript"))}}),__vite_glob_0_9=Object.freeze(Object.defineProperty({__proto__:null,default:_sfc_main$1},Symbol.toStringTag,{value:"Module"})),_hoisted_1={class:"page wei-design"},_hoisted_2=createBaseVNode("h2",null,"组件库",-1),__default__={name:"WeiDesignView",title:"组件库",inheritAttrs:!1,customOptions:{}},_sfc_main=defineComponent({...__default__,setup(t){const e=()=>{console.log("success")};return(n,r)=>{const s=resolveComponent("el-divider"),a=resolveComponent("we-button");return openBlock(),createElementBlock("div",_hoisted_1,[_hoisted_2,createVNode(s),createVNode(a,{onClick:e},{default:withCtx(()=>[createTextVNode("Default")]),_:1})])}}}),__vite_glob_0_10=Object.freeze(Object.defineProperty({__proto__:null,default:_sfc_main},Symbol.toStringTag,{value:"Module"})),routes=[{path:"/",name:"Home",title:"首页",component:()=>__vitePreload(()=>Promise.resolve().then(()=>__vite_glob_0_3),void 0),meta:{name:"Home",title:"首页"}}],views=Object.assign({"/src/views/Algorithm/index.vue":__vite_glob_0_0,"/src/views/DesignPatterns/index.vue":__vite_glob_0_1,"/src/views/ES6/index.vue":__vite_glob_0_2,"/src/views/Home/index.vue":__vite_glob_0_3,"/src/views/JsBase/index.vue":__vite_glob_0_4,"/src/views/JsWebApi/index.vue":__vite_glob_0_5,"/src/views/Pinia/index.vue":__vite_glob_0_6,"/src/views/Race/index.vue":__vite_glob_0_7,"/src/views/Talking/index.vue":__vite_glob_0_8,"/src/views/TypeScript/index.vue":__vite_glob_0_9,"/src/views/WeiDesign/index.vue":__vite_glob_0_10});for(const t in views){const e=views[t],r=(t.match(/..\/views\/(\w+)/)||[])[1],s=e.default;if(r&&r!=="Home"&&!s.hidden){const c=s.title||r;routes.push({path:r==="Home"?"/":`/${r}`,name:r,title:c,component:s,meta:{name:r,title:c}})}}const router=createRouter({history:createWebHistory("/daily-code/vue3-app"),routes:[...routes]}),menus=routes.map(t=>(delete t.component,{...t}));log$1.capsule("Environment","production","primary");log$1.capsule("Version","1.0.0","primary");log$1.capsule("BuildTime","2023-08-06 18:19:06","primary");const app=createApp(_sfc_main$j);app.use(createPinia()).use(router).use(installer).use(A).use(o).mount("#app");const menu=useMenuStore();menu.updateMenu(menus);registerMicroApps([{name:"vue2-app",entry:"//wforguo.github.io/daily-code/vue2-app/",container:"#vue2App",activeRule:"/vue2-app",props:{menus}}]);start();
//# sourceMappingURL=index-f38d3ef6.js.map
