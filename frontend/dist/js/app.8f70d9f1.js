(function(e){function t(t){for(var n,i,a=t[0],s=t[1],l=t[2],u=0,m=[];u<a.length;u++)i=a[u],Object.prototype.hasOwnProperty.call(c,i)&&c[i]&&m.push(c[i][0]),c[i]=0;for(n in s)Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n]);d&&d(t);while(m.length)m.shift()();return r.push.apply(r,l||[]),o()}function o(){for(var e,t=0;t<r.length;t++){for(var o=r[t],n=!0,a=1;a<o.length;a++){var s=o[a];0!==c[s]&&(n=!1)}n&&(r.splice(t--,1),e=i(i.s=o[0]))}return e}var n={},c={app:0},r=[];function i(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,i),o.l=!0,o.exports}i.m=e,i.c=n,i.d=function(e,t,o){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(i.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(o,n,function(t){return e[t]}.bind(null,n));return o},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],s=a.push.bind(a);a.push=t,a=a.slice();for(var l=0;l<a.length;l++)t(a[l]);var d=s;r.push([0,"chunk-vendors"]),o()})({0:function(e,t,o){e.exports=o("56d7")},"08c2":function(e,t,o){"use strict";o("5387")},1720:function(e,t,o){},"18b1":function(e,t,o){},"21fe":function(e,t,o){},2656:function(e,t,o){},"26b4":function(e,t,o){},3578:function(e,t,o){},"3c6f":function(e,t,o){e.exports=o.p+"img/video-icon.d2d411ce.png"},5387:function(e,t,o){},"56d7":function(e,t,o){"use strict";o.r(t);o("e260"),o("e6cf"),o("cca6"),o("a79d");var n=o("7a23"),c=o("65d1"),r=o.n(c),i=o("6549"),a=o.n(i),s=o("a84a"),l=o.n(s),d=o("0f66"),u=o.n(d),m=o("299a"),p=o.n(m),h=o("8d04"),f=o.n(h),b=o("5486"),O=o.n(b),v=o("a7ca"),j=o.n(v),g=o("eb0a"),w=o.n(g),I=o("f6a3"),k=o.n(I),y=o("6de2"),V=o.n(y),N=o("6060"),C=o.n(N),S=o("8459"),T=o.n(S),B=o("25a0"),U=o("bc3a"),E=o.n(U),x=o("2106"),A=o.n(x),D=(o("4160"),o("d3b7"),o("07ac"),o("3ca3"),o("159b"),o("ddb0"),o("5502")),L=o("84a2"),_=o.n(L),$=(o("99af"),o("d4ec")),P=o("bee2"),R=o("ade3"),F=function(){function e(){if(Object($["a"])(this,e),this.instance)return this.instance;this.instance=this}return Object(P["a"])(e,null,[{key:"login",value:function(e,t){var o={email:e,password:t},n="".concat("https://gnize.nl/backend","/auth/login/");return E.a.post(n,o)}},{key:"verify",value:function(){var e="".concat("https://gnize.nl/backend","/auth/verify/");return E.a.post(e)}},{key:"delete",value:function(e){var t={path:decodeURI(e.path),action:"delete"},o="image"===e.type?"image":"movie",n="".concat("https://gnize.nl/backend","/media/").concat(o,"/");return E.a.post(n,t)}}]),e}();Object(R["a"])(F,"instance",void 0);var H=Object(D["a"])({state:{version:1,user:null,token:"",status:"",storeLoaded:!1,currentItem:null,showFileOperations:!1,showVideos:!0,showPictures:!0,itemsToDelete:{},nefItemsToDelete:{}},mutations:{AUTH_REQUEST:function(e){var t=e;t.status="loading"},AUTH_SUCCESS:function(e,t){var o=e;o.status="success",o.token=t},AUTH_ERROR:function(e){var t=e;t.status="error",t.token=""},AUTH_LOGOUT:function(e){var t=e;t.status="",t.token=null,t.user=null},SET_TOKEN:function(e,t){var o=e;o.token=t},SET_USER:function(e,t){var o=e;o.user=t},setStoreLoaded:function(e,t){var o=e;o.storeLoaded=t},resetState:function(e,t){this.replaceState(Object.assign(e,t))},setCurrentItem:function(e,t){e.currentItem=t},setShowFileOperations:function(e,t){e.showFileOperations=t},addItemToDelete:function(e,t){var o=t.path;e.itemsToDelete[o]=t},removeItemToDelete:function(e,t){var o=t.path;delete e.itemsToDelete[o]},clearItemsToDelete:function(e){e.itemsToDelete={}},addNefItemToDelete:function(e,t){var o=t.path;e.nefItemsToDelete[o]=t},removeNefItemToDelete:function(e,t){var o=t.path;delete e.nefItemsToDelete[o]},clearNefItemsToDelete:function(e){e.nefItemsToDelete={}},setShowVideos:function(e,t){e.showVideos=t},setShowPictures:function(e,t){e.showPictures=t}},actions:{initialiseStore:function(e){return new Promise((function(t){if(e.getters.storeLoaded&&t(),localStorage.getItem("store")){var o=JSON.parse(localStorage.getItem("store"));o.version===e.state.version&&(e.commit("resetState",o),e.state.token&&(E.a.defaults.headers.common.Authorization="".concat(e.state.token),e.dispatch("AUTH_VERIFY")))}e.commit("setStoreLoaded",!0),t()}))},AUTH_VERIFY:function(e){var t=e.commit;return new Promise((function(e,o){F.verify().then((function(){e()}),(function(e){401===e.response.status&&(t("AUTH_ERROR",e),t("SET_TOKEN",null),t("SET_USER",null)),o(e)}))}))},AUTH_REQUEST:function(e,t){var o=e.dispatch,n=e.commit,c=t.email,r=t.password;return new Promise((function(e,t){n("AUTH_REQUEST"),F.login(c,r).then((function(e){n("SET_TOKEN",e.data.user.token),n("SET_USER",e.data.user),E.a.defaults.headers.common.Authorization="".concat(e.data.user.token),o("AUTH_VERIFY")}),(function(e){401===e.response.status&&(n("AUTH_ERROR",e),n("SET_TOKEN",null),n("SET_USER",null)),t(e)}))}))},AUTH_LOGOUT:function(e){var t=e.commit;return new Promise((function(e){t("AUTH_LOGOUT"),t("SET_TOKEN",null),t("SET_USER",null),delete E.a.defaults.headers.common.Authorization,e()}))},REMOVE_ITEMS:function(e){var t=e.commit,o=e.getters,n=_()(F.delete,5e3);return new Promise((function(e,c){var r=Object.values(o.getItemsToDelete),i=[];r.forEach((function(e){i.push(n(e).then((function(){t("removeItemToDelete",e)})))})),Promise.all(i).then((function(){e()})).catch((function(e){c(e)}))}))}},getters:{isLoggedIn:function(e){return!!e.user},isAdmin:function(e){return e.user&&"admin"===e.user.access},authStatus:function(e){return e.status},storeLoaded:function(e){return e.storeLoaded},isAuthenticated:function(e){return!!e.token},email:function(e){return e.user?e.user.email:null},userId:function(e){return e.user?e.user.email:null},user:function(e){return e.user?e.user:null},role:function(e){return e.user?e.user.access:null},currentItem:function(e){return e.currentItem},showFileOperations:function(e){return e.showFileOperations},getItemsToDelete:function(e){return e.itemsToDelete},getNefItemsToDelete:function(e){return e.nefItemsToDelete},getShowVideos:function(e){return e.showVideos},getShowPictures:function(e){return e.showPictures}}});H.subscribe((function(e,t){var o={version:t.version,user:t.user,token:t.token,status:t.status,showFileOperations:t.showFileOperations,showVideos:t.showVideos,showPictures:t.showPictures,itemsToDelete:t.itemsToDelete,nefItemsToDelete:t.nefItemsToDelete};localStorage.setItem("store",JSON.stringify(o))}));var q=H,z=(o("4de4"),o("caad"),o("a15b"),o("d81d"),o("fb6a"),o("45fc"),o("ac1f"),o("2532"),o("1276"),o("6c02")),M=Object(n["withScopeId"])("data-v-1facd59a");Object(n["pushScopeId"])("data-v-1facd59a");var K=Object(n["createTextVNode"])("Menu"),G={key:0,class:"p-mt-4"},J={class:"p-mt-4"};Object(n["popScopeId"])();var Q=M((function(e,t,o,c,r,i){var a=Object(n["resolveComponent"])("FolderNavigator"),s=Object(n["resolveComponent"])("Button"),l=Object(n["resolveComponent"])("Card"),d=Object(n["resolveComponent"])("Sidebar");return Object(n["openBlock"])(),Object(n["createBlock"])("div",null,[Object(n["createVNode"])(a,{path:i.fixedPath,itemId:o.itemId},null,8,["path","itemId"]),Object(n["createVNode"])(d,{visible:r.sideBarVisible,"onUpdate:visible":t[3]||(t[3]=function(e){return r.sideBarVisible=e}),position:"right"},{default:M((function(){return[Object(n["createVNode"])(l,null,{title:M((function(){return[K]})),content:M((function(){return[e.role.includes("admin")?(Object(n["openBlock"])(),Object(n["createBlock"])("div",G,[Object(n["createVNode"])(s,{label:"Admin",icon:"pi pi-cog",iconPos:"left",onClick:t[1]||(t[1]=function(e){return i.go("admin")})})])):Object(n["createCommentVNode"])("",!0),Object(n["createVNode"])("div",J,[Object(n["createVNode"])(s,{label:"Logout",icon:"pi pi-times",iconPos:"left",onClick:t[2]||(t[2]=function(e){return i.go("logout")})})])]})),_:1})]})),_:1},8,["visible"]),Object(n["createVNode"])(s,{icon:"pi pi-cog",class:"p-button-rounded p-button-info p-button-text settings-button",onClick:t[4]||(t[4]=function(e){return r.sideBarVisible=!0})})])})),Y=o("5530"),W=(o("b0c0"),Object(n["withScopeId"])("data-v-5e7bfd6c"));Object(n["pushScopeId"])("data-v-5e7bfd6c");var X={class:"wrapper"},Z={key:1,class:"listing"},ee={key:0,class:"filter"},te={class:"filteritem"},oe=Object(n["createVNode"])("label",null,"Toon Foto's",-1),ne={class:"filteritem"},ce=Object(n["createVNode"])("label",null,"Toon Filmpjes",-1);Object(n["popScopeId"])();var re=W((function(e,t,o,c,r,i){var a=Object(n["resolveComponent"])("Breadcrumb"),s=Object(n["resolveComponent"])("ProgressSpinner"),l=Object(n["resolveComponent"])("Chip"),d=Object(n["resolveComponent"])("router-link"),u=Object(n["resolveComponent"])("InputSwitch"),m=Object(n["resolveComponent"])("Gallery");return Object(n["openBlock"])(),Object(n["createBlock"])("div",X,[Object(n["createVNode"])(a,{home:r.home,model:i.breadcrumItems},null,8,["home","model"]),r.loading?(Object(n["openBlock"])(),Object(n["createBlock"])(s,{key:0})):Object(n["createCommentVNode"])("",!0),r.listing?(Object(n["openBlock"])(),Object(n["createBlock"])("div",Z,[Object(n["createVNode"])("ul",null,[(Object(n["openBlock"])(!0),Object(n["createBlock"])(n["Fragment"],null,Object(n["renderList"])(r.listing.folders,(function(e){return Object(n["openBlock"])(),Object(n["createBlock"])("li",{key:e.id},[Object(n["createVNode"])(d,{to:{name:"Main",params:{path:i.getPath(e.id)}}},{default:W((function(){return[Object(n["createVNode"])(l,{label:e.name},null,8,["label"])]})),_:2},1032,["to"])])})),128))]),r.listing.media&&r.listing.media.length>0?(Object(n["openBlock"])(),Object(n["createBlock"])("div",ee,[Object(n["createVNode"])("div",te,[oe,Object(n["createVNode"])(u,{modelValue:i.showPictures,"onUpdate:modelValue":t[1]||(t[1]=function(e){return i.showPictures=e})},null,8,["modelValue"])]),Object(n["createVNode"])("div",ne,[ce,Object(n["createVNode"])(u,{modelValue:i.showVideos,"onUpdate:modelValue":t[2]||(t[2]=function(e){return i.showVideos=e})},null,8,["modelValue"])])])):Object(n["createCommentVNode"])("",!0),Object(n["createVNode"])(m,{media:i.media,itemId:o.itemId},null,8,["media","itemId"])])):Object(n["createCommentVNode"])("",!0)])})),ie=Object(n["withScopeId"])("data-v-282a8fdc");Object(n["pushScopeId"])("data-v-282a8fdc");var ae={class:"wrapper"},se={class:"gallery"},le={class:"image-wrapper"};Object(n["popScopeId"])();var de=ie((function(e,t,o,c,r,i){var a=Object(n["resolveComponent"])("DeleteItem"),s=Object(n["resolveComponent"])("NefItem"),l=Object(n["resolveComponent"])("Overlay"),d=Object(n["resolveComponent"])("ScrollTop"),u=Object(n["resolveDirective"])("loaded-if-complete");return Object(n["openBlock"])(),Object(n["createBlock"])("div",ae,[Object(n["createVNode"])("ul",se,[(Object(n["openBlock"])(!0),Object(n["createBlock"])(n["Fragment"],null,Object(n["renderList"])(o.media,(function(e,t){return Object(n["openBlock"])(),Object(n["createBlock"])("li",{ref:e.id,class:"gallery-panel",key:e.path},[o.itemId?Object(n["createCommentVNode"])("",!0):(Object(n["openBlock"])(),Object(n["createBlock"])(n["Transition"],{key:0,name:"fade",appear:""},{default:ie((function(){return[Object(n["withDirectives"])(Object(n["createVNode"])("div",le,[Object(n["withDirectives"])(Object(n["createVNode"])("img",{onClick:function(e){return i.showInOverlay(t)},src:e.thumb,onLoad:function(t){return r.loadedImages[e.id]=!0}},null,40,["onClick","src","onLoad"]),[[u,r.loadedImages[e.id]]]),"video"===e.type&&e.hasThumb?(Object(n["openBlock"])(),Object(n["createBlock"])("i",{key:0,onClick:function(e){return i.showInOverlay(t)},class:"indicator pi pi-chevron-circle-right"},null,8,["onClick"])):Object(n["createCommentVNode"])("",!0),Object(n["createVNode"])(a,{item:e,keyHandler:!1},null,8,["item"]),Object(n["createVNode"])(s,{item:e,keyHandler:!1},null,8,["item"])],512),[[n["vShow"],r.loadedImages[e.id]]])]})),_:2},1024))],512)})),128))]),r.showOverlay?(Object(n["openBlock"])(),Object(n["createBlock"])(l,{key:0,item:e.currentItem,onClose:t[1]||(t[1]=function(e){return i.closeOverlay()}),onPrevious:t[2]||(t[2]=function(e){return i.showPrevious()}),onNext:t[3]||(t[3]=function(e){return i.showNext()})},null,8,["item"])):Object(n["createCommentVNode"])("",!0),r.showOverlay?Object(n["createCommentVNode"])("",!0):(Object(n["openBlock"])(),Object(n["createBlock"])(d,{key:1,threshold:400}))])})),ue=Object(n["withScopeId"])("data-v-1a7a2f38");Object(n["pushScopeId"])("data-v-1a7a2f38");var me={key:1,ref:"video",controls:"",autoplay:""},pe=Object(n["createTextVNode"])(" Your browser does not support the video tag. "),he=Object(n["createVNode"])("i",{class:"pi pi-arrow-circle-left",style:{"font-size":"3em"}},null,-1),fe=Object(n["createVNode"])("i",{class:"pi pi-arrow-circle-right",style:{"font-size":"3em"}},null,-1);Object(n["popScopeId"])();var be=ue((function(e,t,o,c,r,i){var a=Object(n["resolveComponent"])("DeleteItem"),s=Object(n["resolveComponent"])("NefItem");return o.item?(Object(n["openBlock"])(),Object(n["createBlock"])("div",{key:0,ref:"lightbox",class:"lightbox",onClick:t[3]||(t[3]=Object(n["withModifiers"])((function(e){return i.closeLightbox()}),["self"])),tabindex:"0"},["image"===o.item.type?(Object(n["openBlock"])(),Object(n["createBlock"])("img",{key:0,src:o.item.src},null,8,["src"])):Object(n["createCommentVNode"])("",!0),"video"===o.item.type?(Object(n["openBlock"])(),Object(n["createBlock"])("video",me,[(Object(n["openBlock"])(!0),Object(n["createBlock"])(n["Fragment"],null,Object(n["renderList"])(o.item.sources,(function(e,t){return Object(n["openBlock"])(),Object(n["createBlock"])("source",{src:e.src,type:e.type,key:"".concat(o.item.id,"-").concat(t)},null,8,["src","type"])})),128)),pe],512)):Object(n["createCommentVNode"])("",!0),Object(n["createVNode"])("div",{class:"arrow",id:"left-arrow",onClick:t[1]||(t[1]=function(){return i.previous&&i.previous.apply(i,arguments)})},[he]),Object(n["createVNode"])("div",{class:"arrow",id:"right-arrow",onClick:t[2]||(t[2]=function(){return i.next&&i.next.apply(i,arguments)})},[fe]),Object(n["createVNode"])(a,{item:o.item,keyHandler:!0},null,8,["item"]),Object(n["createVNode"])(s,{item:o.item,keyHandler:!0},null,8,["item"])],512)):Object(n["createCommentVNode"])("",!0)})),Oe=o("3835"),ve=Object(n["withScopeId"])("data-v-542254d4");Object(n["pushScopeId"])("data-v-542254d4");var je={key:0,class:"delete-item"};Object(n["popScopeId"])();var ge=ve((function(e,t,o,c,r,i){var a=Object(n["resolveComponent"])("ToggleButton");return o.item&&e.isAdmin&&e.showFileOperations?(Object(n["openBlock"])(),Object(n["createBlock"])("div",je,[Object(n["createVNode"])(a,{modelValue:i.deleteItem,"onUpdate:modelValue":t[1]||(t[1]=function(e){return i.deleteItem=e}),onIcon:"pi pi-trash",offIcon:"pi pi-trash"},null,8,["modelValue"])])):Object(n["createCommentVNode"])("",!0)})),we={name:"DeleteItem",props:{item:{required:!0},keyHandler:{required:!0,type:Boolean}},data:function(){return{}},computed:Object(Y["a"])(Object(Y["a"])({},Object(D["b"])(["getItemsToDelete","showFileOperations","isAdmin"])),{},{deleteItem:{get:function(){return this.item.path in this.getItemsToDelete},set:function(e){e?this.$store.commit("addItemToDelete",this.item):this.$store.commit("removeItemToDelete",this.item)}}}),methods:{handleKeydown:function(e){68===e.keyCode&&(this.deleteItem=!this.deleteItem)}},watch:{},mounted:function(){this.keyHandler&&document.addEventListener("keydown",this.handleKeydown)},unmounted:function(){this.keyHandler&&document.removeEventListener("keydown",this.handleKeydown)}};o("afe0");we.render=ge,we.__scopeId="data-v-542254d4";var Ie=we,ke=Object(n["withScopeId"])("data-v-a471c4ee");Object(n["pushScopeId"])("data-v-a471c4ee");var ye={key:0,class:"nef-item"};Object(n["popScopeId"])();var Ve=ke((function(e,t,o,c,r,i){var a=Object(n["resolveComponent"])("ToggleButton");return o.item&&e.isAdmin&&o.item.nef&&e.showFileOperations?(Object(n["openBlock"])(),Object(n["createBlock"])("div",ye,[Object(n["createVNode"])(a,{modelValue:i.deleteItem,"onUpdate:modelValue":t[1]||(t[1]=function(e){return i.deleteItem=e}),onIcon:"pi pi-eye",offIcon:"pi pi-eye-slash"},null,8,["modelValue"])])):Object(n["createCommentVNode"])("",!0)})),Ne={name:"NefItem",props:{item:{required:!0},keyHandler:{required:!0,type:Boolean}},data:function(){return{}},computed:Object(Y["a"])(Object(Y["a"])({},Object(D["b"])(["getNefItemsToDelete","showFileOperations","isAdmin"])),{},{deleteItem:{get:function(){return!(this.item.path in this.getNefItemsToDelete)},set:function(e){e?this.$store.commit("removeNefItemToDelete",this.item):this.$store.commit("addNefItemToDelete",this.item)}}}),methods:{handleKeydown:function(e){78===e.keyCode&&(this.deleteItem=!this.deleteItem)}},watch:{},mounted:function(){this.keyHandler&&document.addEventListener("keydown",this.handleKeydown)},unmounted:function(){this.keyHandler&&document.removeEventListener("keydown",this.handleKeydown)}};o("f785");Ne.render=Ve,Ne.__scopeId="data-v-a471c4ee";var Ce=Ne,Se={name:"Overlay",components:{DeleteItem:Ie,NefItem:Ce},emits:["close","previous","next"],props:{item:{required:!0}},data:function(){return{startTouch:null}},methods:{closeLightbox:function(){this.$emit("close")},previous:function(){this.$emit("previous")},next:function(){this.$emit("next")},handleKeydown:function(e){37===e.keyCode&&this.previous(),39===e.keyCode&&this.next(),27===e.keyCode&&this.closeLightbox()},fixRoute:function(){var e=this.item.folderUri,t="/".concat(e,"/!").concat(encodeURIComponent(this.item.id));window.history.pushState(window.history.state,"",t)},handleTouchStart:function(e){1===e.touches.length?this.startTouch=e.touches.item(0).clientX:3===e.touches.length&&(this.startTouch=null,this.$emit("close"))},handleTouchEnd:function(e){var t=100;if(this.startTouch){var o=e.changedTouches.item(0).clientX;o>this.startTouch+t&&this.$emit("previous"),o<this.startTouch-t&&this.$emit("next")}}},watch:{item:function(){this.fixRoute();var e=this.$refs.video;e&&e.load();var t=this.item.src,o="image/jpeg";if("video"===this.item.type){var n=this.item.sources,c=Object(Oe["a"])(n,1),r=c[0];t=r.src,o="video/mp4"}console.log("src: ".concat(t)),console.log("type: ".concat(o));var i=window.cast.framework.CastContext.getInstance().getCurrentSession(),a=new window.chrome.cast.media.MediaInfo(t,o),s=new window.chrome.cast.media.LoadRequest(a,{credentials:"LALALALA"});s.credentials="MOIIIEEEE",i.loadMedia(s).then((function(){console.log("Load succeed")}),(function(e){console.log("Error code: ".concat(e))}))}},mounted:function(){document.addEventListener("keydown",this.handleKeydown),document.body.classList.add("modal-open"),this.fixRoute();var e=this.$refs.lightbox;e.addEventListener("touchstart",this.handleTouchStart),e.addEventListener("touchend",this.handleTouchEnd)},unmounted:function(){document.removeEventListener("keydown",this.handleKeydown);var e=this.$refs.lightbox;e&&(e.removeEventListener("touchstart",this.handleSwipe),e.removeEventListener("touchend",this.handleTouchEnd)),document.body.classList.remove("modal-open")}};o("96d4");Se.render=be,Se.__scopeId="data-v-1a7a2f38";var Te=Se,Be={name:"Gallery",components:{Overlay:Te,DeleteItem:Ie,NefItem:Ce},props:{media:{required:!0,type:Array},itemId:{required:!1,type:String}},data:function(){return{showOverlay:!1,currentIndex:0,lastItemSelected:null,loadedImages:{}}},computed:Object(Y["a"])({},Object(D["b"])(["currentItem","getItemsToDelete"])),watch:{media:function(e){var t=this;e.forEach((function(e){"image"===e.type&&(t.loadedImages[e.id]=!1)}))},currentItem:function(e){if(e)this.showOverlay=!0,this.lastItemSelected=e;else if(this.showOverlay=!1,this.lastItemSelected){var t=this.$refs[this.lastItemSelected.id];t&&window.setTimeout((function(){t.scrollIntoView()}),1)}}},methods:{loadImage:function(e){console.log("loaded: loadImage"),this.loadedImages[e.id]=!0},showPrevious:function(){this.currentIndex=0===this.currentIndex?this.media.length-1:this.currentIndex-1,this.$store.commit("setCurrentItem",this.media[this.currentIndex])},showNext:function(){this.currentIndex=this.currentIndex===this.media.length-1?0:this.currentIndex+1,this.$store.commit("setCurrentItem",this.media[this.currentIndex])},showInOverlay:function(e){this.currentIndex=e,this.$store.commit("setCurrentItem",this.media[this.currentIndex])},closeOverlay:function(){this.$router.go(-1)}},mounted:function(){this.currentIndex=0}};o("e26e");Be.render=de,Be.__scopeId="data-v-282a8fdc";var Ue=Be,Ee=o("3c6f"),xe={name:"FolderNavigator",props:{path:{required:!0,type:Array},itemId:{required:!1,type:String}},data:function(){return{home:{icon:"pi pi-home",to:"/"},listing:{},loading:!0,error:!1}},components:{Gallery:Ue},methods:{getPath:function(e){var t=this.path.map((function(e){var t=decodeURIComponent(decodeURIComponent(e));return t}));return t.push(decodeURIComponent(e)),t},getListing:function(){var e=this;this.loading=!0;var t=encodeURIComponent(this.path.join("/"));return this.$http.get("".concat("https://gnize.nl/backend","/folder/list/?path=").concat(t)).then((function(t){e.listing=t.data,e.loading=!1,e.error=!1}),(function(t){e.error=!0,e.loading=!1,e.$toast.add({severity:"warn",summary:"Error loading listing",detail:t.message})}))}},computed:Object(Y["a"])(Object(Y["a"])({},Object(D["b"])(["currentItem","getShowPictures","getShowVideos"])),{},{showVideos:{get:function(){return this.getShowVideos},set:function(e){this.$store.commit("setShowVideos",e),e||this.getShowPictures||(this.showPictures=!0)}},showPictures:{get:function(){return this.getShowPictures},set:function(e){this.$store.commit("setShowPictures",e),e||this.getShowVideos||(this.showVideos=!0)}},breadcrumItems:function(){var e=[],t=this.path.map((function(t){var o=decodeURIComponent(decodeURIComponent(t));return e.push(encodeURIComponent(o)),{label:decodeURIComponent(t),to:"/".concat(e.join("/"))}}));return t},media:function(){var e=this,t=[],o=this.path.map((function(e){var t=decodeURIComponent(decodeURIComponent(e));return encodeURIComponent(t)}));return this.listing.media&&(t=this.listing.media.filter((function(t){return!("image"!==t.type||!e.showPictures)||!("movie"!==t.type||!e.showVideos)})).map((function(t){var n=o.join("/"),c=null;return"movie"===t.type&&(c={type:"video",id:t.id,encodedId:encodeURIComponent(t.id),folderPath:e.path,folderUri:n,path:"".concat(n,"/").concat(encodeURIComponent(t.id)),sources:[{src:"".concat("https://gnize.nl/backend","/media/movie/?path=").concat(n,"/").concat(encodeURIComponent(t.id),"&movie_type=").concat(t.ext),type:"video/".concat(t.ext)}],hasThumb:t.thumb,thumb:t.thumb?"".concat("https://gnize.nl/backend","/media/movie/?path=").concat(n,"/").concat(encodeURIComponent(t.thumb),"&thumb=true"):Ee,caption:t.name,width:800,height:600,autoplay:!0}),"image"===t.type&&(c={id:t.id,folderPath:e.path,folderUri:n,path:"".concat(n,"/").concat(encodeURIComponent(t.id)),type:"image",nef:t.nef,src:"".concat("https://gnize.nl/backend","/media/image/?path=").concat(n,"/").concat(encodeURIComponent(t.id),"&size=web"),thumb:"".concat("https://gnize.nl/backend","/media/image/?path=").concat(n,"/").concat(encodeURIComponent(t.id),"&size=thumbnail"),caption:t.name}),c}))),t}}),created:function(){var e=this;if(this.itemId){var t=decodeURIComponent(this.itemId);this.getListing().then((function(){e.media.forEach((function(o){decodeURIComponent(o.id)===t&&e.$store.commit("setCurrentItem",o)}))}))}},mounted:function(){this.getListing()},watch:{path:function(){this.listing=[],this.getListing()}}};o("ee89");xe.render=re,xe.__scopeId="data-v-5e7bfd6c";var Ae=xe,De={name:"Main",components:{FolderNavigator:Ae},props:{path:{required:!1,type:[Array,String]},itemId:{required:!1,type:String}},data:function(){return{sideBarVisible:!1}},methods:{go:function(e){switch(this.sideBarVisible=!1,e){case"admin":this.$router.push({name:"Admin"});break;case"logout":this.$router.push({name:"Login"});break;default:break}}},computed:Object(Y["a"])(Object(Y["a"])({},Object(D["b"])(["role"])),{},{fixedPath:function(){return this.path||[]}}),watch:{}};o("a92c");De.render=Q,De.__scopeId="data-v-1facd59a";var Le=De,_e=Object(n["withScopeId"])("data-v-1271f68a");Object(n["pushScopeId"])("data-v-1271f68a");var $e=Object(n["createTextVNode"])("Admin"),Pe={key:0,class:"p-mt-5"},Re={key:0},Fe=Object(n["createVNode"])("h2",null,"Te verwijderen bestanden",-1),He={class:"p-d-flex p-flex-wrap"},qe={key:1,class:"p-mt-5"},ze={key:0},Me=Object(n["createVNode"])("h2",null,"Te verwijderen NEF bestanden",-1),Ke={class:"p-d-flex p-flex-wrap"};Object(n["popScopeId"])();var Ge=_e((function(e,t,o,c,r,i){var a=Object(n["resolveComponent"])("Breadcrumb"),s=Object(n["resolveComponent"])("ToggleButton"),l=Object(n["resolveComponent"])("Button"),d=Object(n["resolveComponent"])("DeleteItem"),u=Object(n["resolveComponent"])("NefItem"),m=Object(n["resolveComponent"])("Card");return Object(n["openBlock"])(),Object(n["createBlock"])("div",null,[Object(n["createVNode"])(a,{home:r.home,model:r.breadcrumbs},null,8,["home","model"]),Object(n["createVNode"])(m,null,{title:_e((function(){return[$e]})),content:_e((function(){return[Object(n["createVNode"])(s,{modelValue:i.showFileOperations,"onUpdate:modelValue":t[1]||(t[1]=function(e){return i.showFileOperations=e}),onLabel:"Toon bestandsoperaties",offLabel:"Geen bestandsoperaties",onIcon:"pi pi-check",offIcon:"pi pi-times"},null,8,["modelValue"]),i.hasItemsToDelete()?(Object(n["openBlock"])(),Object(n["createBlock"])("div",Pe,[Object(n["createVNode"])(l,{label:"Verwijder geselecteerde items",class:"p-button-danger p-mr-1",onClick:i.removeSelected},null,8,["onClick"]),Object(n["createVNode"])(l,{label:"Maak selectie leeg",class:"p-button-warning",onClick:i.clearSelection},null,8,["onClick"]),i.hasItemsToDelete()?(Object(n["openBlock"])(),Object(n["createBlock"])("div",Re,[Fe,(Object(n["openBlock"])(!0),Object(n["createBlock"])(n["Fragment"],null,Object(n["renderList"])(i.getItemsByFolder,(function(o,c){return Object(n["openBlock"])(),Object(n["createBlock"])("div",{key:c},[Object(n["createVNode"])("h3",null,Object(n["toDisplayString"])(o[0].folderPath.join("/")),1),Object(n["createVNode"])("ul",He,[(Object(n["openBlock"])(!0),Object(n["createBlock"])(n["Fragment"],null,Object(n["renderList"])(o,(function(o){return Object(n["openBlock"])(),Object(n["createBlock"])("li",{class:"img-wrapper p-col-6 p-md-4 p-lg-2",key:o.src},[Object(n["createVNode"])("img",{class:"img-preview",onClick:t[2]||(t[2]=function(t){return e.showInOverlay(e.index)}),src:o.thumb},null,8,["src"]),Object(n["createVNode"])(d,{item:o,keyHandler:!1},null,8,["item"])])})),128))])])})),128))])):Object(n["createCommentVNode"])("",!0)])):Object(n["createCommentVNode"])("",!0),i.hasNefItemsToDelete()?(Object(n["openBlock"])(),Object(n["createBlock"])("div",qe,[Object(n["createVNode"])(l,{label:"Verwijder geselecteerde NEF items",class:"p-button-danger p-mr-1",onClick:i.removeSelectedNef},null,8,["onClick"]),Object(n["createVNode"])(l,{label:"Maak selectie leeg",class:"p-button-warning",onClick:i.clearNefSelection},null,8,["onClick"]),i.hasNefItemsToDelete()?(Object(n["openBlock"])(),Object(n["createBlock"])("div",ze,[Me,(Object(n["openBlock"])(!0),Object(n["createBlock"])(n["Fragment"],null,Object(n["renderList"])(i.getNefItemsByFolder,(function(o,c){return Object(n["openBlock"])(),Object(n["createBlock"])("div",{key:c},[Object(n["createVNode"])("h3",null,Object(n["toDisplayString"])(o[0].folderPath.join("/")),1),Object(n["createVNode"])("ul",Ke,[(Object(n["openBlock"])(!0),Object(n["createBlock"])(n["Fragment"],null,Object(n["renderList"])(o,(function(o){return Object(n["openBlock"])(),Object(n["createBlock"])("li",{class:"img-wrapper p-col-6 p-md-4 p-lg-2",key:o.src},[Object(n["createVNode"])("img",{class:"img-preview",onClick:t[3]||(t[3]=function(t){return e.showInOverlay(e.index)}),src:o.thumb},null,8,["src"]),Object(n["createVNode"])(u,{item:o,keyHandler:!1},null,8,["item"])])})),128))])])})),128))])):Object(n["createCommentVNode"])("",!0)])):Object(n["createCommentVNode"])("",!0)]})),_:1})])})),Je=(o("b64b"),{name:"Admin",data:function(){return{home:{icon:"pi pi-home",to:"/"},breadcrumbs:[]}},components:{DeleteItem:Ie,NefItem:Ce},watch:{},methods:{hasItemsToDelete:function(){return Object.keys(this.getItemsToDelete).length>0},hasNefItemsToDelete:function(){return Object.keys(this.getNefItemsToDelete).length>0},clearSelection:function(){this.$store.commit("clearItemsToDelete")},clearNefSelection:function(){this.$store.commit("clearNefItemsToDelete")},removeSelectedNef:function(){alert("todo")},removeSelected:function(){var e=this;this.$store.dispatch("REMOVE_ITEMS").then((function(){e.$toast.add({severity:"info",summary:"Bestanden verwijderd",detail:"Bestanden zijn verwijderd"})}),(function(t){e.$toast.add({severity:"warn",summary:"Fout bij verwijderen bestanden",detail:t.message})}))}},computed:Object(Y["a"])(Object(Y["a"])({},Object(D["b"])(["getItemsToDelete","getNefItemsToDelete"])),{},{getItemsByFolder:function(){var e={},t=Object.values(this.getItemsToDelete);return t.forEach((function(t){var o=e[t.folderUri]||[];o.push(t),e[t.folderUri]=o})),e},getNefItemsByFolder:function(){var e={},t=Object.values(this.getNefItemsToDelete);return t.forEach((function(t){var o=e[t.folderUri]||[];o.push(t),e[t.folderUri]=o})),e},showFileOperations:{get:function(){return this.$store.getters.showFileOperations},set:function(e){this.$store.commit("setShowFileOperations",e)}}})});o("08c2");Je.render=Ge,Je.__scopeId="data-v-1271f68a";var Qe=Je;function Ye(e,t,o,c,r,i){var a=Object(n["resolveComponent"])("Breadcrumb"),s=Object(n["resolveComponent"])("LoginComponent");return Object(n["openBlock"])(),Object(n["createBlock"])("div",null,[e.isAuthenticated?(Object(n["openBlock"])(),Object(n["createBlock"])(a,{key:0,home:r.home,model:r.breadcrumbs},null,8,["home","model"])):Object(n["createCommentVNode"])("",!0),Object(n["createVNode"])(s)])}var We=Object(n["withScopeId"])("data-v-eb65223a");Object(n["pushScopeId"])("data-v-eb65223a");var Xe=Object(n["createTextVNode"])("Al ingelogd"),Ze={class:"p-mb-2"},et=Object(n["createTextVNode"])("Login"),tt=Object(n["createTextVNode"])(" Je moet inloggen om de inhoud van deze website te kunnen zien "),ot={class:"p-fluid"},nt={class:"p-formgroup-inline"},ct={class:"p-field"},rt=Object(n["createVNode"])("label",{for:"email",class:"p-sr-only"},"E mail",-1),it={key:0,class:"p-error"},at={key:1,class:"p-error"},st={class:"p-field"},lt=Object(n["createVNode"])("label",{for:"password",class:"p-sr-only"},"Wachtwoord",-1),dt={key:0,class:"p-error"};Object(n["popScopeId"])();var ut=We((function(e,t,o,c,r,i){var a=Object(n["resolveComponent"])("Button"),s=Object(n["resolveComponent"])("Card"),l=Object(n["resolveComponent"])("InputText"),d=Object(n["resolveComponent"])("ProgressSpinner");return Object(n["openBlock"])(),Object(n["createBlock"])("div",null,[e.isAuthenticated?(Object(n["openBlock"])(),Object(n["createBlock"])(s,{key:0},{title:We((function(){return[Xe]})),content:We((function(){return[Object(n["createVNode"])("div",Ze,"Je bent al ingelogd als "+Object(n["toDisplayString"])(e.userId),1),Object(n["createVNode"])("div",null,[Object(n["createVNode"])(a,{onClick:i.logout,label:"Log uit"},null,8,["onClick"])])]})),_:1})):Object(n["createCommentVNode"])("",!0),e.isAuthenticated?Object(n["createCommentVNode"])("",!0):(Object(n["openBlock"])(),Object(n["createBlock"])(s,{key:1},{title:We((function(){return[et]})),subtitle:We((function(){return[tt]})),content:We((function(){return[Object(n["createVNode"])("div",ot,[Object(n["createVNode"])("form",{novalidate:"",onSubmit:t[3]||(t[3]=Object(n["withModifiers"])((function(){return i.formSubmit&&i.formSubmit.apply(i,arguments)}),["prevent"]))},[Object(n["createVNode"])("div",nt,[Object(n["createVNode"])("div",ct,[rt,Object(n["createVNode"])(l,{id:"email",placeholder:"E mail",disabled:e.sending,autocomplete:"email",modelValue:e.form.email,"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.form.email=t}),class:{"p-invalid":i.isFieldValid("email")}},null,8,["disabled","modelValue","class"]),e.$v.form.email.required.$invalid?(Object(n["openBlock"])(),Object(n["createBlock"])("span",it,"E-mail is vereist")):e.$v.form.email.email.$invalid?(Object(n["openBlock"])(),Object(n["createBlock"])("span",at,"Onjuist e-mail formaat")):Object(n["createCommentVNode"])("",!0)]),Object(n["createVNode"])("div",st,[lt,Object(n["createVNode"])(l,{id:"password",placeholder:"Wachtwoord",type:"password",disabled:e.sending,autocomplete:"password",modelValue:e.form.password,"onUpdate:modelValue":t[2]||(t[2]=function(t){return e.form.password=t}),class:{"p-invalid":i.isFieldValid("password")}},null,8,["disabled","modelValue","class"]),e.$v.form.email.required.$invalid?(Object(n["openBlock"])(),Object(n["createBlock"])("span",dt,"Wachtwoord is vereist")):Object(n["createCommentVNode"])("",!0)]),e.sending?(Object(n["openBlock"])(),Object(n["createBlock"])(d,{key:0})):Object(n["createCommentVNode"])("",!0),Object(n["createVNode"])(a,{disabled:e.sending,type:"submit",label:"Login",icon:"pi pi-angle-right",iconPos:"right"},null,8,["disabled"])])],32)])]})),_:1}))])})),mt=o("b5ae"),pt={name:"LoginComponent",data:function(){return{form:{email:null,password:null},sending:!1,errors:[],showSnackbar:!1,snackbarMsg:"",loginFailed:!1}},validations:{form:{email:{required:mt["required"],email:mt["email"]},password:{required:mt["required"]}}},computed:Object(Y["a"])(Object(Y["a"])({},Object(D["c"])(["user"])),Object(D["b"])(["userId","isAuthenticated"])),methods:{logout:function(){this.$store.dispatch("AUTH_LOGOUT")},isFieldValid:function(e){var t=this.$v.form[e];return!(t.$invalid&&t.$dirty||!0===this.loginFailed)},clearForm:function(){this.$v.$reset(),this.form.email=null,this.form.password=null},formSubmit:function(){this.$v.$touch(),this.$v.$invalid||this.loginUser()},loginUser:function(){var e=this,t={email:this.form.email,password:this.form.password};this.$store.dispatch("AUTH_REQUEST",t).then((function(){e.$toast.add({severity:"info",summary:"Logged in",detail:"Logged in as ".concat(e.userId)}),e.loginFailed=!1}),(function(){e.$toast.add({severity:"warn",summary:"Login failed",detail:"Cannot login with this email / password combination"}),e.loginFailed=!0}))}}};pt.render=ut,pt.__scopeId="data-v-eb65223a";var ht=pt,ft={name:"Home",props:{nextUrl:{required:!1,type:String}},data:function(){return{home:{icon:"pi pi-home",to:"/"},breadcrumbs:[]}},components:{LoginComponent:ht},computed:Object(Y["a"])({},Object(D["b"])(["isAuthenticated"])),watch:{isAuthenticated:function(e){if(e){var t=this.nextUrl||"/";this.$router.push(t)}}}};ft.render=Ye;var bt=ft;window.popStateDetected=!1,window.addEventListener("popstate",(function(){window.popStateDetected=!0}));var Ot=[{path:"/:path*/!:itemId?",name:"MainDetail",props:!0,component:Le,meta:{requiresAuth:!0}},{path:"/:path*",name:"Main",props:!0,component:Le,meta:{requiresAuth:!0}},{path:"/@login/:nextUrl?",name:"Login",props:!0,component:bt,meta:{requiresAuth:!1}},{path:"/@admin",name:"Admin",props:!1,component:Qe,meta:{requiresAuth:!0,requiresAccess:"admin"}}],vt=Object(z["a"])({history:Object(z["b"])(),routes:Ot});vt.beforeEach((function(e,t,o){var n=window.popStateDetected;window.popStateDetected=!1;var c=q.getters.currentItem;if(n&&c&&c.folderPath&&q.commit("setCurrentItem",null),n){if(c&&c.folderPath)return o({path:"/".concat(c.folderUri),replace:!0}),void window.history.replaceState(window.history.state,"","/".concat(c.folderUri));var r="".concat(t.fullPath.split("/").slice(0,-1).join("/"));return""===r&&(r="/"),void o({path:r,replace:!0})}var i=e.matched.filter((function(e){return e.meta.requiresAccess})).map((function(e){return e.meta.requiresAccess})),a=i.length||e.matched.some((function(e){return e.meta.requiresAuth}));a||i.length?q.dispatch("initialiseStore").then((function(){var t=q.getters.role,n=!i.length||i.includes(t),c=q.getters.isLoggedIn;c&&n?o():o({name:"Login",params:{nextUrl:e.fullPath},replace:!0})})):o()}));var jt=vt,gt={id:"gnize-pictures"},wt={ref:"cast-button"};function It(e,t,o,c,r,i){var a=Object(n["resolveComponent"])("Toast"),s=Object(n["resolveComponent"])("router-view");return Object(n["openBlock"])(),Object(n["createBlock"])("div",gt,[Object(n["createVNode"])(a),Object(n["createVNode"])("div",wt,null,512),Object(n["createVNode"])(s)])}var kt={name:"App",data:function(){return{rootPath:"/"}},components:{},computed:Object(Y["a"])({},Object(D["b"])(["isLoggedIn"])),mounted:function(){var e=document.createElement("script");e.setAttribute("src","https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"),document.head.appendChild(e)},created:function(){var e=this;window.__onGCastApiAvailable=function(t){t&&e.initializeCastApi()},this.$http.interceptors.response.use(void 0,(function(t){return new Promise((function(){throw 401===t.response.status&&t.config&&!t.config.__isRetryRequest&&e.$store.dispatch("AUTH_LOGOUT"),t}))}))},methods:{initializeCastApi:function(){var e=window.cast.framework.CastContext.getInstance().setOptions({receiverApplicationId:"5C98AA53",autoJoinPolicy:window.chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED}),t=document.createElement("google-cast-launcher");this.$refs["cast-button"].appendChild(t),console.log(e)},greet:function(){this.$toast.add({severity:"info",summary:"Hello",detail:this.text})}}};o("ae5c");kt.render=It;var yt=kt,Vt=(o("7a3c"),o("e1ae"),o("4121"),o("bddf"),o("9483"));Object(Vt["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var Nt=Object(n["createApp"])(yt);Nt.use(A.a,E.a),Nt.use(q),Nt.use(jt),Nt.use(r.a),Nt.use(T.a),Nt.use(B["a"]),Nt.component("Toast",C.a),Nt.component("InputText",l.a),Nt.component("Button",a.a),Nt.component("Breadcrumb",u.a),Nt.component("InputSwitch",p.a),Nt.component("ProgressSpinner",f.a),Nt.component("Chip",O.a),Nt.component("Card",j.a),Nt.component("ToggleButton",w.a),Nt.component("ScrollTop",k.a),Nt.component("Sidebar",V.a),Nt.directive("loaded-if-complete",{beforeUpdate:function(e,t){e.complete&&(t.value=!0)}}),Nt.mount("#app"),q.dispatch("initialiseStore")},5989:function(e,t,o){},"96d4":function(e,t,o){"use strict";o("21fe")},a92c:function(e,t,o){"use strict";o("26b4")},ae5c:function(e,t,o){"use strict";o("2656")},afe0:function(e,t,o){"use strict";o("3578")},e26e:function(e,t,o){"use strict";o("5989")},ee89:function(e,t,o){"use strict";o("18b1")},f785:function(e,t,o){"use strict";o("1720")}});
//# sourceMappingURL=app.8f70d9f1.js.map