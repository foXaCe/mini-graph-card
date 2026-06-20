const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new WeakMap;let r=class{constructor(t,e,n){if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=n.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n.set(i,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const n=1===t.length?t[0]:e.reduce((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1],t[0]);return new r(n,t,i)},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:s,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:d,getPrototypeOf:u}=Object,p=globalThis,f=p.trustedTypes,m=f?f.emptyScript:"",g=p.reactiveElementPolyfillSupport,_=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!s(t,e),b={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(t,i,e);void 0!==n&&l(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){const{get:n,set:r}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:n,set(e){const o=n?.call(this);r?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...h(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,n)=>{if(e)i.adoptedStyleSheets=n.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of n){const n=document.createElement("style"),r=t.litNonce;void 0!==r&&n.setAttribute("nonce",r),n.textContent=e.cssText,i.appendChild(n)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(void 0!==n&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(n):this.setAttribute(n,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,n=i._$Eh.get(t);if(void 0!==n&&this._$Em!==n){const t=i.getPropertyOptions(n),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=n;const o=r.fromAttribute(e,t.type);this[n]=o??this._$Ej?.get(n)??o,this._$Em=null}}requestUpdate(t,e,i,n=!1,r){if(void 0!==t){const o=this.constructor;if(!1===n&&(r=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??y)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:n,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===n&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,n=this[e];!0!==t||this._$AL.has(e)||void 0===n||this.C(e,void 0,i,n)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[_("elementProperties")]=new Map,w[_("finalized")]=new Map,g?.({ReactiveElement:w}),(p.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,$=t=>t,k=x.trustedTypes,S=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+E,N=`<${C}>`,I=document,M=()=>I.createComment(""),P=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,T="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,j=/>/g,z=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),U=/'/g,L=/"/g,B=/^(?:script|style|textarea|title)$/i,H=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),F=H(1),q=H(2),G=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),Y=new WeakMap,V=I.createTreeWalker(I,129);function Q(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,n=[];let r,o=2===e?"<svg>":3===e?"<math>":"",a=R;for(let e=0;e<i;e++){const i=t[e];let s,l,c=-1,h=0;for(;h<i.length&&(a.lastIndex=h,l=a.exec(i),null!==l);)h=a.lastIndex,a===R?"!--"===l[1]?a=D:void 0!==l[1]?a=j:void 0!==l[2]?(B.test(l[2])&&(r=RegExp("</"+l[2],"g")),a=z):void 0!==l[3]&&(a=z):a===z?">"===l[0]?(a=r??R,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,s=l[1],a=void 0===l[3]?z:'"'===l[3]?L:U):a===L||a===U?a=z:a===D||a===j?a=R:(a=z,r=void 0);const d=a===z&&t[e+1].startsWith("/>")?" ":"";o+=a===R?i+N:c>=0?(n.push(s),i.slice(0,c)+A+i.slice(c)+E+d):i+E+(-2===c?e:d)}return[Q(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),n]};class K{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let r=0,o=0;const a=t.length-1,s=this.parts,[l,c]=J(t,e);if(this.el=K.createElement(l,i),V.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(n=V.nextNode())&&s.length<a;){if(1===n.nodeType){if(n.hasAttributes())for(const t of n.getAttributeNames())if(t.endsWith(A)){const e=c[o++],i=n.getAttribute(t).split(E),a=/([.?@])?(.*)/.exec(e);s.push({type:1,index:r,name:a[2],strings:i,ctor:"."===a[1]?it:"?"===a[1]?nt:"@"===a[1]?rt:et}),n.removeAttribute(t)}else t.startsWith(E)&&(s.push({type:6,index:r}),n.removeAttribute(t));if(B.test(n.tagName)){const t=n.textContent.split(E),e=t.length-1;if(e>0){n.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],M()),V.nextNode(),s.push({type:2,index:++r});n.append(t[e],M())}}}else if(8===n.nodeType)if(n.data===C)s.push({type:2,index:r});else{let t=-1;for(;-1!==(t=n.data.indexOf(E,t+1));)s.push({type:7,index:r}),t+=E.length-1}r++}}static createElement(t,e){const i=I.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,n){if(e===G)return e;let r=void 0!==n?i._$Co?.[n]:i._$Cl;const o=P(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,i,n)),void 0!==n?(i._$Co??=[])[n]=r:i._$Cl=r),void 0!==r&&(e=X(t,r._$AS(t,e.values),r,n)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,n=(t?.creationScope??I).importNode(e,!0);V.currentNode=n;let r=V.nextNode(),o=0,a=0,s=i[0];for(;void 0!==s;){if(o===s.index){let e;2===s.type?e=new tt(r,r.nextSibling,this,t):1===s.type?e=new s.ctor(r,s.name,s.strings,this,t):6===s.type&&(e=new ot(r,this,t)),this._$AV.push(e),s=i[++a]}o!==s?.index&&(r=V.nextNode(),o++)}return V.currentNode=I,n}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,n){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),P(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==G&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&P(this._$AH)?this._$AA.nextSibling.data=t:this.T(I.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(Q(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(e);else{const t=new Z(n,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Y.get(t.strings);return void 0===e&&Y.set(t.strings,e=new K(t)),e}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const r of t)n===e.length?e.push(i=new tt(this.O(M()),this.O(M()),this,this.options)):i=e[n],i._$AI(r),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=$(t).nextSibling;$(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,n,r){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,n){const r=this.strings;let o=!1;if(void 0===r)t=X(this,t,e,0),o=!P(t)||t!==this._$AH&&t!==G,o&&(this._$AH=t);else{const n=t;let a,s;for(t=r[0],a=0;a<r.length-1;a++)s=X(this,n[i+a],e,a),s===G&&(s=this._$AH[a]),o||=!P(s)||s!==this._$AH[a],s===W?t=W:t!==W&&(t+=(s??"")+r[a+1]),this._$AH[a]=s}o&&!n&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class nt extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class rt extends et{constructor(t,e,i,n,r){super(t,e,i,n,r),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??W)===G)return;const i=this._$AH,n=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==W&&(i===W||n);n&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const at=x.litHtmlPolyfillSupport;at?.(K,tt),(x.litHtmlVersions??=[]).push("3.3.3");const st=globalThis;class lt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const n=i?.renderBefore??e;let r=n._$litPart$;if(void 0===r){const t=i?.renderBefore??null;n._$litPart$=r=new tt(e.insertBefore(M(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return G}}lt._$litElement$=!0,lt.finalized=!0,st.litElementHydrateSupport?.({LitElement:lt});const ct=st.litElementPolyfillSupport;ct?.({LitElement:lt}),(st.litElementVersions??=[]).push("4.2.2");var ht="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function dt(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function ut(t){throw new Error('Could not dynamically require "'+t+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var pt,ft,mt={exports:{}},gt=(pt||(pt=1,mt.exports=function t(e,i,n){function r(a,s){if(!i[a]){if(!e[a]){if(!s&&ut)return ut(a);if(o)return o(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var c=i[a]={exports:{}};e[a][0].call(c.exports,function(t){return r(e[a][1][t]||t)},c,c.exports,t,e,i,n)}return i[a].exports}for(var o=ut,a=0;a<n.length;a++)r(n[a]);return r}({1:[function(t,e,i){(function(t){var i,n,r=t.MutationObserver||t.WebKitMutationObserver;if(r){var o=0,a=new r(h),s=t.document.createTextNode("");a.observe(s,{characterData:!0}),i=function(){s.data=o=++o%2}}else if(t.setImmediate||void 0===t.MessageChannel)i="document"in t&&"onreadystatechange"in t.document.createElement("script")?function(){var e=t.document.createElement("script");e.onreadystatechange=function(){h(),e.onreadystatechange=null,e.parentNode.removeChild(e),e=null},t.document.documentElement.appendChild(e)}:function(){setTimeout(h,0)};else{var l=new t.MessageChannel;l.port1.onmessage=h,i=function(){l.port2.postMessage(0)}}var c=[];function h(){var t,e;n=!0;for(var i=c.length;i;){for(e=c,c=[],t=-1;++t<i;)e[t]();i=c.length}n=!1}e.exports=function(t){1!==c.push(t)||n||i()}}).call(this,void 0!==ht?ht:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],2:[function(t,e,i){var n=t(1);function r(){}var o={},a=["REJECTED"],s=["FULFILLED"],l=["PENDING"];function c(t){if("function"!=typeof t)throw new TypeError("resolver must be a function");this.state=l,this.queue=[],this.outcome=void 0,t!==r&&p(this,t)}function h(t,e,i){this.promise=t,"function"==typeof e&&(this.onFulfilled=e,this.callFulfilled=this.otherCallFulfilled),"function"==typeof i&&(this.onRejected=i,this.callRejected=this.otherCallRejected)}function d(t,e,i){n(function(){var n;try{n=e(i)}catch(e){return o.reject(t,e)}n===t?o.reject(t,new TypeError("Cannot resolve promise with itself")):o.resolve(t,n)})}function u(t){var e=t&&t.then;if(t&&("object"==typeof t||"function"==typeof t)&&"function"==typeof e)return function(){e.apply(t,arguments)}}function p(t,e){var i=!1;function n(e){i||(i=!0,o.reject(t,e))}function r(e){i||(i=!0,o.resolve(t,e))}var a=f(function(){e(r,n)});"error"===a.status&&n(a.value)}function f(t,e){var i={};try{i.value=t(e),i.status="success"}catch(t){i.status="error",i.value=t}return i}e.exports=c,c.prototype.catch=function(t){return this.then(null,t)},c.prototype.then=function(t,e){if("function"!=typeof t&&this.state===s||"function"!=typeof e&&this.state===a)return this;var i=new this.constructor(r);return this.state!==l?d(i,this.state===s?t:e,this.outcome):this.queue.push(new h(i,t,e)),i},h.prototype.callFulfilled=function(t){o.resolve(this.promise,t)},h.prototype.otherCallFulfilled=function(t){d(this.promise,this.onFulfilled,t)},h.prototype.callRejected=function(t){o.reject(this.promise,t)},h.prototype.otherCallRejected=function(t){d(this.promise,this.onRejected,t)},o.resolve=function(t,e){var i=f(u,e);if("error"===i.status)return o.reject(t,i.value);var n=i.value;if(n)p(t,n);else{t.state=s,t.outcome=e;for(var r=-1,a=t.queue.length;++r<a;)t.queue[r].callFulfilled(e)}return t},o.reject=function(t,e){t.state=a,t.outcome=e;for(var i=-1,n=t.queue.length;++i<n;)t.queue[i].callRejected(e);return t},c.resolve=function(t){return t instanceof this?t:o.resolve(new this(r),t)},c.reject=function(t){var e=new this(r);return o.reject(e,t)},c.all=function(t){var e=this;if("[object Array]"!==Object.prototype.toString.call(t))return this.reject(new TypeError("must be an array"));var i=t.length,n=!1;if(!i)return this.resolve([]);for(var a=new Array(i),s=0,l=-1,c=new this(r);++l<i;)h(t[l],l);return c;function h(t,r){e.resolve(t).then(function(t){a[r]=t,++s!==i||n||(n=!0,o.resolve(c,a))},function(t){n||(n=!0,o.reject(c,t))})}},c.race=function(t){var e=this;if("[object Array]"!==Object.prototype.toString.call(t))return this.reject(new TypeError("must be an array"));var i=t.length,n=!1;if(!i)return this.resolve([]);for(var a=-1,s=new this(r);++a<i;)l(t[a]);return s;function l(t){e.resolve(t).then(function(t){n||(n=!0,o.resolve(s,t))},function(t){n||(n=!0,o.reject(s,t))})}}},{1:1}],3:[function(t,e,i){(function(e){"function"!=typeof e.Promise&&(e.Promise=t(2))}).call(this,void 0!==ht?ht:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{2:2}],4:[function(t,e,i){var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};var r=function(){try{if("undefined"!=typeof indexedDB)return indexedDB;if("undefined"!=typeof webkitIndexedDB)return webkitIndexedDB;if("undefined"!=typeof mozIndexedDB)return mozIndexedDB;if("undefined"!=typeof OIndexedDB)return OIndexedDB;if("undefined"!=typeof msIndexedDB)return msIndexedDB}catch(t){return}}();function o(t,e){t=t||[],e=e||{};try{return new Blob(t,e)}catch(r){if("TypeError"!==r.name)throw r;for(var i=new("undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof MSBlobBuilder?MSBlobBuilder:"undefined"!=typeof MozBlobBuilder?MozBlobBuilder:WebKitBlobBuilder),n=0;n<t.length;n+=1)i.append(t[n]);return i.getBlob(e.type)}}"undefined"==typeof Promise&&t(3);var a=Promise;function s(t,e){e&&t.then(function(t){e(null,t)},function(t){e(t)})}function l(t,e,i){"function"==typeof e&&t.then(e),"function"==typeof i&&t.catch(i)}function c(t){return"string"!=typeof t&&(console.warn(t+" used as a key, but it is not a string."),t=String(t)),t}function h(){if(arguments.length&&"function"==typeof arguments[arguments.length-1])return arguments[arguments.length-1]}var d="local-forage-detect-blob-support",u=void 0,p={},f=Object.prototype.toString,m="readonly",g="readwrite";function _(t){for(var e=t.length,i=new ArrayBuffer(e),n=new Uint8Array(i),r=0;r<e;r++)n[r]=t.charCodeAt(r);return i}function v(t){return"boolean"==typeof u?a.resolve(u):function(t){return new a(function(e){var i=t.transaction(d,g),n=o([""]);i.objectStore(d).put(n,"key"),i.onabort=function(t){t.preventDefault(),t.stopPropagation(),e(!1)},i.oncomplete=function(){var t=navigator.userAgent.match(/Chrome\/(\d+)/),i=navigator.userAgent.match(/Edge\//);e(i||!t||parseInt(t[1],10)>=43)}}).catch(function(){return!1})}(t).then(function(t){return u=t})}function y(t){var e=p[t.name],i={};i.promise=new a(function(t,e){i.resolve=t,i.reject=e}),e.deferredOperations.push(i),e.dbReady?e.dbReady=e.dbReady.then(function(){return i.promise}):e.dbReady=i.promise}function b(t){var e=p[t.name].deferredOperations.pop();if(e)return e.resolve(),e.promise}function w(t,e){var i=p[t.name].deferredOperations.pop();if(i)return i.reject(e),i.promise}function x(t,e){return new a(function(i,n){if(p[t.name]=p[t.name]||{forages:[],db:null,dbReady:null,deferredOperations:[]},t.db){if(!e)return i(t.db);y(t),t.db.close()}var o=[t.name];e&&o.push(t.version);var a=r.open.apply(r,o);e&&(a.onupgradeneeded=function(e){var i=a.result;try{i.createObjectStore(t.storeName),e.oldVersion<=1&&i.createObjectStore(d)}catch(i){if("ConstraintError"!==i.name)throw i;console.warn('The database "'+t.name+'" has been upgraded from version '+e.oldVersion+" to version "+e.newVersion+', but the storage "'+t.storeName+'" already exists.')}}),a.onerror=function(t){t.preventDefault(),n(a.error)},a.onsuccess=function(){var e=a.result;e.onversionchange=function(t){t.target.close()},i(e),b(t)}})}function $(t){return x(t,!1)}function k(t){return x(t,!0)}function S(t,e){if(!t.db)return!0;var i=!t.db.objectStoreNames.contains(t.storeName),n=t.version<t.db.version,r=t.version>t.db.version;if(n&&(t.version!==e&&console.warn('The database "'+t.name+"\" can't be downgraded from version "+t.db.version+" to version "+t.version+"."),t.version=t.db.version),r||i){if(i){var o=t.db.version+1;o>t.version&&(t.version=o)}return!0}return!1}function A(t){return o([_(atob(t.data))],{type:t.type})}function E(t){return t&&t.__local_forage_encoded_blob}function C(t){var e=this,i=e._initReady().then(function(){var t=p[e._dbInfo.name];if(t&&t.dbReady)return t.dbReady});return l(i,t,t),i}function N(t,e,i,n){void 0===n&&(n=1);try{var r=t.db.transaction(t.storeName,e);i(null,r)}catch(r){if(n>0&&(!t.db||"InvalidStateError"===r.name||"NotFoundError"===r.name))return a.resolve().then(function(){if(!t.db||"NotFoundError"===r.name&&!t.db.objectStoreNames.contains(t.storeName)&&t.version<=t.db.version)return t.db&&(t.version=t.db.version+1),k(t)}).then(function(){return function(t){y(t);for(var e=p[t.name],i=e.forages,n=0;n<i.length;n++){var r=i[n];r._dbInfo.db&&(r._dbInfo.db.close(),r._dbInfo.db=null)}return t.db=null,$(t).then(function(e){return t.db=e,S(t)?k(t):e}).then(function(n){t.db=e.db=n;for(var r=0;r<i.length;r++)i[r]._dbInfo.db=n}).catch(function(e){throw w(t,e),e})}(t).then(function(){N(t,e,i,n-1)})}).catch(i);i(r)}}var I={_driver:"asyncStorage",_initStorage:function(t){var e=this,i={db:null};if(t)for(var n in t)i[n]=t[n];var r=p[i.name];r||(r={forages:[],db:null,dbReady:null,deferredOperations:[]},p[i.name]=r),r.forages.push(e),e._initReady||(e._initReady=e.ready,e.ready=C);var o=[];function s(){return a.resolve()}for(var l=0;l<r.forages.length;l++){var c=r.forages[l];c!==e&&o.push(c._initReady().catch(s))}var h=r.forages.slice(0);return a.all(o).then(function(){return i.db=r.db,$(i)}).then(function(t){return i.db=t,S(i,e._defaultConfig.version)?k(i):t}).then(function(t){i.db=r.db=t,e._dbInfo=i;for(var n=0;n<h.length;n++){var o=h[n];o!==e&&(o._dbInfo.db=i.db,o._dbInfo.version=i.version)}})},_support:function(){try{if(!r||!r.open)return!1;var t="undefined"!=typeof openDatabase&&/(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent)&&!/BlackBerry/.test(navigator.platform),e="function"==typeof fetch&&-1!==fetch.toString().indexOf("[native code");return(!t||e)&&"undefined"!=typeof indexedDB&&"undefined"!=typeof IDBKeyRange}catch(t){return!1}}(),iterate:function(t,e){var i=this,n=new a(function(e,n){i.ready().then(function(){N(i._dbInfo,m,function(r,o){if(r)return n(r);try{var a=o.objectStore(i._dbInfo.storeName).openCursor(),s=1;a.onsuccess=function(){var i=a.result;if(i){var n=i.value;E(n)&&(n=A(n));var r=t(n,i.key,s++);void 0!==r?e(r):i.continue()}else e()},a.onerror=function(){n(a.error)}}catch(t){n(t)}})}).catch(n)});return s(n,e),n},getItem:function(t,e){var i=this;t=c(t);var n=new a(function(e,n){i.ready().then(function(){N(i._dbInfo,m,function(r,o){if(r)return n(r);try{var a=o.objectStore(i._dbInfo.storeName).get(t);a.onsuccess=function(){var t=a.result;void 0===t&&(t=null),E(t)&&(t=A(t)),e(t)},a.onerror=function(){n(a.error)}}catch(t){n(t)}})}).catch(n)});return s(n,e),n},setItem:function(t,e,i){var n=this;t=c(t);var r=new a(function(i,r){var o;n.ready().then(function(){return o=n._dbInfo,"[object Blob]"===f.call(e)?v(o.db).then(function(t){return t?e:(i=e,new a(function(t,e){var n=new FileReader;n.onerror=e,n.onloadend=function(e){var n=btoa(e.target.result||"");t({__local_forage_encoded_blob:!0,data:n,type:i.type})},n.readAsBinaryString(i)}));var i}):e}).then(function(e){N(n._dbInfo,g,function(o,a){if(o)return r(o);try{var s=a.objectStore(n._dbInfo.storeName);null===e&&(e=void 0);var l=s.put(e,t);a.oncomplete=function(){void 0===e&&(e=null),i(e)},a.onabort=a.onerror=function(){var t=l.error?l.error:l.transaction.error;r(t)}}catch(t){r(t)}})}).catch(r)});return s(r,i),r},removeItem:function(t,e){var i=this;t=c(t);var n=new a(function(e,n){i.ready().then(function(){N(i._dbInfo,g,function(r,o){if(r)return n(r);try{var a=o.objectStore(i._dbInfo.storeName).delete(t);o.oncomplete=function(){e()},o.onerror=function(){n(a.error)},o.onabort=function(){var t=a.error?a.error:a.transaction.error;n(t)}}catch(t){n(t)}})}).catch(n)});return s(n,e),n},clear:function(t){var e=this,i=new a(function(t,i){e.ready().then(function(){N(e._dbInfo,g,function(n,r){if(n)return i(n);try{var o=r.objectStore(e._dbInfo.storeName).clear();r.oncomplete=function(){t()},r.onabort=r.onerror=function(){var t=o.error?o.error:o.transaction.error;i(t)}}catch(t){i(t)}})}).catch(i)});return s(i,t),i},length:function(t){var e=this,i=new a(function(t,i){e.ready().then(function(){N(e._dbInfo,m,function(n,r){if(n)return i(n);try{var o=r.objectStore(e._dbInfo.storeName).count();o.onsuccess=function(){t(o.result)},o.onerror=function(){i(o.error)}}catch(t){i(t)}})}).catch(i)});return s(i,t),i},key:function(t,e){var i=this,n=new a(function(e,n){t<0?e(null):i.ready().then(function(){N(i._dbInfo,m,function(r,o){if(r)return n(r);try{var a=o.objectStore(i._dbInfo.storeName),s=!1,l=a.openKeyCursor();l.onsuccess=function(){var i=l.result;i?0===t||s?e(i.key):(s=!0,i.advance(t)):e(null)},l.onerror=function(){n(l.error)}}catch(t){n(t)}})}).catch(n)});return s(n,e),n},keys:function(t){var e=this,i=new a(function(t,i){e.ready().then(function(){N(e._dbInfo,m,function(n,r){if(n)return i(n);try{var o=r.objectStore(e._dbInfo.storeName).openKeyCursor(),a=[];o.onsuccess=function(){var e=o.result;e?(a.push(e.key),e.continue()):t(a)},o.onerror=function(){i(o.error)}}catch(t){i(t)}})}).catch(i)});return s(i,t),i},dropInstance:function(t,e){e=h.apply(this,arguments);var i,n=this.config();if((t="function"!=typeof t&&t||{}).name||(t.name=t.name||n.name,t.storeName=t.storeName||n.storeName),t.name){var o=t.name===n.name&&this._dbInfo.db?a.resolve(this._dbInfo.db):$(t).then(function(e){var i=p[t.name],n=i.forages;i.db=e;for(var r=0;r<n.length;r++)n[r]._dbInfo.db=e;return e});i=t.storeName?o.then(function(e){if(e.objectStoreNames.contains(t.storeName)){var i=e.version+1;y(t);var n=p[t.name],o=n.forages;e.close();for(var s=0;s<o.length;s++){var l=o[s];l._dbInfo.db=null,l._dbInfo.version=i}var c=new a(function(e,n){var o=r.open(t.name,i);o.onerror=function(t){o.result.close(),n(t)},o.onupgradeneeded=function(){o.result.deleteObjectStore(t.storeName)},o.onsuccess=function(){var t=o.result;t.close(),e(t)}});return c.then(function(t){n.db=t;for(var e=0;e<o.length;e++){var i=o[e];i._dbInfo.db=t,b(i._dbInfo)}}).catch(function(e){throw(w(t,e)||a.resolve()).catch(function(){}),e})}}):o.then(function(e){y(t);var i=p[t.name],n=i.forages;e.close();for(var o=0;o<n.length;o++)n[o]._dbInfo.db=null;var s=new a(function(e,i){var n=r.deleteDatabase(t.name);n.onerror=function(){var t=n.result;t&&t.close(),i(n.error)},n.onblocked=function(){console.warn('dropInstance blocked for database "'+t.name+'" until all open connections are closed')},n.onsuccess=function(){var t=n.result;t&&t.close(),e(t)}});return s.then(function(t){i.db=t;for(var e=0;e<n.length;e++)b(n[e]._dbInfo)}).catch(function(e){throw(w(t,e)||a.resolve()).catch(function(){}),e})})}else i=a.reject("Invalid arguments");return s(i,e),i}};var M="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",P=/^~~local_forage_type~([^~]+)~/,O="__lfsc__:",T="arbf",R="blob",D="si08",j="ui08",z="uic8",U="si16",L="si32",B="ur16",H="ui32",F="fl32",q="fl64",G=Object.prototype.toString;function W(t){var e,i,n,r,o,a=.75*t.length,s=t.length,l=0;"="===t[t.length-1]&&(a--,"="===t[t.length-2]&&a--);var c=new ArrayBuffer(a),h=new Uint8Array(c);for(e=0;e<s;e+=4)i=M.indexOf(t[e]),n=M.indexOf(t[e+1]),r=M.indexOf(t[e+2]),o=M.indexOf(t[e+3]),h[l++]=i<<2|n>>4,h[l++]=(15&n)<<4|r>>2,h[l++]=(3&r)<<6|63&o;return c}function Y(t){var e,i=new Uint8Array(t),n="";for(e=0;e<i.length;e+=3)n+=M[i[e]>>2],n+=M[(3&i[e])<<4|i[e+1]>>4],n+=M[(15&i[e+1])<<2|i[e+2]>>6],n+=M[63&i[e+2]];return i.length%3==2?n=n.substring(0,n.length-1)+"=":i.length%3==1&&(n=n.substring(0,n.length-2)+"=="),n}var V={serialize:function(t,e){var i="";if(t&&(i=G.call(t)),t&&("[object ArrayBuffer]"===i||t.buffer&&"[object ArrayBuffer]"===G.call(t.buffer))){var n,r=O;t instanceof ArrayBuffer?(n=t,r+=T):(n=t.buffer,"[object Int8Array]"===i?r+=D:"[object Uint8Array]"===i?r+=j:"[object Uint8ClampedArray]"===i?r+=z:"[object Int16Array]"===i?r+=U:"[object Uint16Array]"===i?r+=B:"[object Int32Array]"===i?r+=L:"[object Uint32Array]"===i?r+=H:"[object Float32Array]"===i?r+=F:"[object Float64Array]"===i?r+=q:e(new Error("Failed to get type for BinaryArray"))),e(r+Y(n))}else if("[object Blob]"===i){var o=new FileReader;o.onload=function(){var i="~~local_forage_type~"+t.type+"~"+Y(this.result);e(O+R+i)},o.readAsArrayBuffer(t)}else try{e(JSON.stringify(t))}catch(i){console.error("Couldn't convert value into a JSON string: ",t),e(null,i)}},deserialize:function(t){if(t.substring(0,9)!==O)return JSON.parse(t);var e,i=t.substring(13),n=t.substring(9,13);if(n===R&&P.test(i)){var r=i.match(P);e=r[1],i=i.substring(r[0].length)}var a=W(i);switch(n){case T:return a;case R:return o([a],{type:e});case D:return new Int8Array(a);case j:return new Uint8Array(a);case z:return new Uint8ClampedArray(a);case U:return new Int16Array(a);case B:return new Uint16Array(a);case L:return new Int32Array(a);case H:return new Uint32Array(a);case F:return new Float32Array(a);case q:return new Float64Array(a);default:throw new Error("Unkown type: "+n)}},stringToBuffer:W,bufferToString:Y};function Q(t,e,i,n){t.executeSql("CREATE TABLE IF NOT EXISTS "+e.storeName+" (id INTEGER PRIMARY KEY, key unique, value)",[],i,n)}function J(t,e,i,n,r,o){t.executeSql(i,n,r,function(t,a){a.code===a.SYNTAX_ERR?t.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?",[e.storeName],function(t,s){s.rows.length?o(t,a):Q(t,e,function(){t.executeSql(i,n,r,o)},o)},o):o(t,a)},o)}function K(t,e,i,n){var r=this;t=c(t);var o=new a(function(o,a){r.ready().then(function(){void 0===e&&(e=null);var s=e,l=r._dbInfo;l.serializer.serialize(e,function(e,c){c?a(c):l.db.transaction(function(i){J(i,l,"INSERT OR REPLACE INTO "+l.storeName+" (key, value) VALUES (?, ?)",[t,e],function(){o(s)},function(t,e){a(e)})},function(e){if(e.code===e.QUOTA_ERR){if(n>0)return void o(K.apply(r,[t,s,i,n-1]));a(e)}})})}).catch(a)});return s(o,i),o}var X={_driver:"webSQLStorage",_initStorage:function(t){var e=this,i={db:null};if(t)for(var n in t)i[n]="string"!=typeof t[n]?t[n].toString():t[n];var r=new a(function(t,n){try{i.db=openDatabase(i.name,String(i.version),i.description,i.size)}catch(t){return n(t)}i.db.transaction(function(r){Q(r,i,function(){e._dbInfo=i,t()},function(t,e){n(e)})},n)});return i.serializer=V,r},_support:"function"==typeof openDatabase,iterate:function(t,e){var i=this,n=new a(function(e,n){i.ready().then(function(){var r=i._dbInfo;r.db.transaction(function(i){J(i,r,"SELECT * FROM "+r.storeName,[],function(i,n){for(var o=n.rows,a=o.length,s=0;s<a;s++){var l=o.item(s),c=l.value;if(c&&(c=r.serializer.deserialize(c)),void 0!==(c=t(c,l.key,s+1)))return void e(c)}e()},function(t,e){n(e)})})}).catch(n)});return s(n,e),n},getItem:function(t,e){var i=this;t=c(t);var n=new a(function(e,n){i.ready().then(function(){var r=i._dbInfo;r.db.transaction(function(i){J(i,r,"SELECT * FROM "+r.storeName+" WHERE key = ? LIMIT 1",[t],function(t,i){var n=i.rows.length?i.rows.item(0).value:null;n&&(n=r.serializer.deserialize(n)),e(n)},function(t,e){n(e)})})}).catch(n)});return s(n,e),n},setItem:function(t,e,i){return K.apply(this,[t,e,i,1])},removeItem:function(t,e){var i=this;t=c(t);var n=new a(function(e,n){i.ready().then(function(){var r=i._dbInfo;r.db.transaction(function(i){J(i,r,"DELETE FROM "+r.storeName+" WHERE key = ?",[t],function(){e()},function(t,e){n(e)})})}).catch(n)});return s(n,e),n},clear:function(t){var e=this,i=new a(function(t,i){e.ready().then(function(){var n=e._dbInfo;n.db.transaction(function(e){J(e,n,"DELETE FROM "+n.storeName,[],function(){t()},function(t,e){i(e)})})}).catch(i)});return s(i,t),i},length:function(t){var e=this,i=new a(function(t,i){e.ready().then(function(){var n=e._dbInfo;n.db.transaction(function(e){J(e,n,"SELECT COUNT(key) as c FROM "+n.storeName,[],function(e,i){var n=i.rows.item(0).c;t(n)},function(t,e){i(e)})})}).catch(i)});return s(i,t),i},key:function(t,e){var i=this,n=new a(function(e,n){i.ready().then(function(){var r=i._dbInfo;r.db.transaction(function(i){J(i,r,"SELECT key FROM "+r.storeName+" WHERE id = ? LIMIT 1",[t+1],function(t,i){var n=i.rows.length?i.rows.item(0).key:null;e(n)},function(t,e){n(e)})})}).catch(n)});return s(n,e),n},keys:function(t){var e=this,i=new a(function(t,i){e.ready().then(function(){var n=e._dbInfo;n.db.transaction(function(e){J(e,n,"SELECT key FROM "+n.storeName,[],function(e,i){for(var n=[],r=0;r<i.rows.length;r++)n.push(i.rows.item(r).key);t(n)},function(t,e){i(e)})})}).catch(i)});return s(i,t),i},dropInstance:function(t,e){e=h.apply(this,arguments);var i=this.config();(t="function"!=typeof t&&t||{}).name||(t.name=t.name||i.name,t.storeName=t.storeName||i.storeName);var n,r=this;return n=t.name?new a(function(e){var n;n=t.name===i.name?r._dbInfo.db:openDatabase(t.name,"","",0),t.storeName?e({db:n,storeNames:[t.storeName]}):e(function(t){return new a(function(e,i){t.transaction(function(n){n.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'",[],function(i,n){for(var r=[],o=0;o<n.rows.length;o++)r.push(n.rows.item(o).name);e({db:t,storeNames:r})},function(t,e){i(e)})},function(t){i(t)})})}(n))}).then(function(t){return new a(function(e,i){t.db.transaction(function(n){function r(t){return new a(function(e,i){n.executeSql("DROP TABLE IF EXISTS "+t,[],function(){e()},function(t,e){i(e)})})}for(var o=[],s=0,l=t.storeNames.length;s<l;s++)o.push(r(t.storeNames[s]));a.all(o).then(function(){e()}).catch(function(t){i(t)})},function(t){i(t)})})}):a.reject("Invalid arguments"),s(n,e),n}};function Z(t,e){var i=t.name+"/";return t.storeName!==e.storeName&&(i+=t.storeName+"/"),i}function tt(){return!function(){var t="_localforage_support_test";try{return localStorage.setItem(t,!0),localStorage.removeItem(t),!1}catch(t){return!0}}()||localStorage.length>0}var et={_driver:"localStorageWrapper",_initStorage:function(t){var e={};if(t)for(var i in t)e[i]=t[i];return e.keyPrefix=Z(t,this._defaultConfig),tt()?(this._dbInfo=e,e.serializer=V,a.resolve()):a.reject()},_support:function(){try{return"undefined"!=typeof localStorage&&"setItem"in localStorage&&!!localStorage.setItem}catch(t){return!1}}(),iterate:function(t,e){var i=this,n=i.ready().then(function(){for(var e=i._dbInfo,n=e.keyPrefix,r=n.length,o=localStorage.length,a=1,s=0;s<o;s++){var l=localStorage.key(s);if(0===l.indexOf(n)){var c=localStorage.getItem(l);if(c&&(c=e.serializer.deserialize(c)),void 0!==(c=t(c,l.substring(r),a++)))return c}}});return s(n,e),n},getItem:function(t,e){var i=this;t=c(t);var n=i.ready().then(function(){var e=i._dbInfo,n=localStorage.getItem(e.keyPrefix+t);return n&&(n=e.serializer.deserialize(n)),n});return s(n,e),n},setItem:function(t,e,i){var n=this;t=c(t);var r=n.ready().then(function(){void 0===e&&(e=null);var i=e;return new a(function(r,o){var a=n._dbInfo;a.serializer.serialize(e,function(e,n){if(n)o(n);else try{localStorage.setItem(a.keyPrefix+t,e),r(i)}catch(t){"QuotaExceededError"!==t.name&&"NS_ERROR_DOM_QUOTA_REACHED"!==t.name||o(t),o(t)}})})});return s(r,i),r},removeItem:function(t,e){var i=this;t=c(t);var n=i.ready().then(function(){var e=i._dbInfo;localStorage.removeItem(e.keyPrefix+t)});return s(n,e),n},clear:function(t){var e=this,i=e.ready().then(function(){for(var t=e._dbInfo.keyPrefix,i=localStorage.length-1;i>=0;i--){var n=localStorage.key(i);0===n.indexOf(t)&&localStorage.removeItem(n)}});return s(i,t),i},length:function(t){var e=this.keys().then(function(t){return t.length});return s(e,t),e},key:function(t,e){var i=this,n=i.ready().then(function(){var e,n=i._dbInfo;try{e=localStorage.key(t)}catch(t){e=null}return e&&(e=e.substring(n.keyPrefix.length)),e});return s(n,e),n},keys:function(t){var e=this,i=e.ready().then(function(){for(var t=e._dbInfo,i=localStorage.length,n=[],r=0;r<i;r++){var o=localStorage.key(r);0===o.indexOf(t.keyPrefix)&&n.push(o.substring(t.keyPrefix.length))}return n});return s(i,t),i},dropInstance:function(t,e){if(e=h.apply(this,arguments),!(t="function"!=typeof t&&t||{}).name){var i=this.config();t.name=t.name||i.name,t.storeName=t.storeName||i.storeName}var n,r=this;return n=t.name?new a(function(e){t.storeName?e(Z(t,r._defaultConfig)):e(t.name+"/")}).then(function(t){for(var e=localStorage.length-1;e>=0;e--){var i=localStorage.key(e);0===i.indexOf(t)&&localStorage.removeItem(i)}}):a.reject("Invalid arguments"),s(n,e),n}},it=function(t,e){return t===e||"number"==typeof t&&"number"==typeof e&&isNaN(t)&&isNaN(e)},nt=function(t,e){for(var i=t.length,n=0;n<i;){if(it(t[n],e))return!0;n++}return!1},rt=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},ot={},at={},st={INDEXEDDB:I,WEBSQL:X,LOCALSTORAGE:et},lt=[st.INDEXEDDB._driver,st.WEBSQL._driver,st.LOCALSTORAGE._driver],ct=["dropInstance"],ht=["clear","getItem","iterate","key","keys","length","removeItem","setItem"].concat(ct),dt={description:"",driver:lt.slice(),name:"localforage",size:4980736,storeName:"keyvaluepairs",version:1};function ut(t,e){t[e]=function(){var i=arguments;return t.ready().then(function(){return t[e].apply(t,i)})}}function pt(){for(var t=1;t<arguments.length;t++){var e=arguments[t];if(e)for(var i in e)e.hasOwnProperty(i)&&(rt(e[i])?arguments[0][i]=e[i].slice():arguments[0][i]=e[i])}return arguments[0]}var ft=function(){function t(e){for(var i in function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),st)if(st.hasOwnProperty(i)){var n=st[i],r=n._driver;this[i]=r,ot[r]||this.defineDriver(n)}this._defaultConfig=pt({},dt),this._config=pt({},this._defaultConfig,e),this._driverSet=null,this._initDriver=null,this._ready=!1,this._dbInfo=null,this._wrapLibraryMethodsWithReady(),this.setDriver(this._config.driver).catch(function(){})}return t.prototype.config=function(t){if("object"===(void 0===t?"undefined":n(t))){if(this._ready)return new Error("Can't call config() after localforage has been used.");for(var e in t){if("storeName"===e&&(t[e]=t[e].replace(/\W/g,"_")),"version"===e&&"number"!=typeof t[e])return new Error("Database version must be a number.");this._config[e]=t[e]}return!("driver"in t)||!t.driver||this.setDriver(this._config.driver)}return"string"==typeof t?this._config[t]:this._config},t.prototype.defineDriver=function(t,e,i){var n=new a(function(e,i){try{var n=t._driver,r=new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");if(!t._driver)return void i(r);for(var o=ht.concat("_initStorage"),l=0,c=o.length;l<c;l++){var h=o[l];if((!nt(ct,h)||t[h])&&"function"!=typeof t[h])return void i(r)}!function(){for(var e=function(t){return function(){var e=new Error("Method "+t+" is not implemented by the current driver"),i=a.reject(e);return s(i,arguments[arguments.length-1]),i}},i=0,n=ct.length;i<n;i++){var r=ct[i];t[r]||(t[r]=e(r))}}();var d=function(i){ot[n]&&console.info("Redefining LocalForage driver: "+n),ot[n]=t,at[n]=i,e()};"_support"in t?t._support&&"function"==typeof t._support?t._support().then(d,i):d(!!t._support):d(!0)}catch(t){i(t)}});return l(n,e,i),n},t.prototype.driver=function(){return this._driver||null},t.prototype.getDriver=function(t,e,i){var n=ot[t]?a.resolve(ot[t]):a.reject(new Error("Driver not found."));return l(n,e,i),n},t.prototype.getSerializer=function(t){var e=a.resolve(V);return l(e,t),e},t.prototype.ready=function(t){var e=this,i=e._driverSet.then(function(){return null===e._ready&&(e._ready=e._initDriver()),e._ready});return l(i,t,t),i},t.prototype.setDriver=function(t,e,i){var n=this;rt(t)||(t=[t]);var r=this._getSupportedDrivers(t);function o(){n._config.driver=n.driver()}function s(t){return n._extend(t),o(),n._ready=n._initStorage(n._config),n._ready}var c=null!==this._driverSet?this._driverSet.catch(function(){return a.resolve()}):a.resolve();return this._driverSet=c.then(function(){var t=r[0];return n._dbInfo=null,n._ready=null,n.getDriver(t).then(function(t){n._driver=t._driver,o(),n._wrapLibraryMethodsWithReady(),n._initDriver=function(t){return function(){var e=0;return function i(){for(;e<t.length;){var r=t[e];return e++,n._dbInfo=null,n._ready=null,n.getDriver(r).then(s).catch(i)}o();var l=new Error("No available storage method found.");return n._driverSet=a.reject(l),n._driverSet}()}}(r)})}).catch(function(){o();var t=new Error("No available storage method found.");return n._driverSet=a.reject(t),n._driverSet}),l(this._driverSet,e,i),this._driverSet},t.prototype.supports=function(t){return!!at[t]},t.prototype._extend=function(t){pt(this,t)},t.prototype._getSupportedDrivers=function(t){for(var e=[],i=0,n=t.length;i<n;i++){var r=t[i];this.supports(r)&&e.push(r)}return e},t.prototype._wrapLibraryMethodsWithReady=function(){for(var t=0,e=ht.length;t<e;t++)ut(this,ht[t])},t.prototype.createInstance=function(e){return new t(e)},t}(),mt=new ft;e.exports=mt},{3:3}]},{},[4])(4)),mt.exports),_t=dt(gt),vt={exports:{}},yt=(ft||(ft=1,vt.exports=function(){var t=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];function e(t,e){var i=t[0],n=t[1],r=t[2],o=t[3];n=((n+=((r=((r+=((o=((o+=((i=((i+=(n&r|~n&o)+e[0]-680876936|0)<<7|i>>>25)+n|0)&n|~i&r)+e[1]-389564586|0)<<12|o>>>20)+i|0)&i|~o&n)+e[2]+606105819|0)<<17|r>>>15)+o|0)&o|~r&i)+e[3]-1044525330|0)<<22|n>>>10)+r|0,n=((n+=((r=((r+=((o=((o+=((i=((i+=(n&r|~n&o)+e[4]-176418897|0)<<7|i>>>25)+n|0)&n|~i&r)+e[5]+1200080426|0)<<12|o>>>20)+i|0)&i|~o&n)+e[6]-1473231341|0)<<17|r>>>15)+o|0)&o|~r&i)+e[7]-45705983|0)<<22|n>>>10)+r|0,n=((n+=((r=((r+=((o=((o+=((i=((i+=(n&r|~n&o)+e[8]+1770035416|0)<<7|i>>>25)+n|0)&n|~i&r)+e[9]-1958414417|0)<<12|o>>>20)+i|0)&i|~o&n)+e[10]-42063|0)<<17|r>>>15)+o|0)&o|~r&i)+e[11]-1990404162|0)<<22|n>>>10)+r|0,n=((n+=((r=((r+=((o=((o+=((i=((i+=(n&r|~n&o)+e[12]+1804603682|0)<<7|i>>>25)+n|0)&n|~i&r)+e[13]-40341101|0)<<12|o>>>20)+i|0)&i|~o&n)+e[14]-1502002290|0)<<17|r>>>15)+o|0)&o|~r&i)+e[15]+1236535329|0)<<22|n>>>10)+r|0,n=((n+=((r=((r+=((o=((o+=((i=((i+=(n&o|r&~o)+e[1]-165796510|0)<<5|i>>>27)+n|0)&r|n&~r)+e[6]-1069501632|0)<<9|o>>>23)+i|0)&n|i&~n)+e[11]+643717713|0)<<14|r>>>18)+o|0)&i|o&~i)+e[0]-373897302|0)<<20|n>>>12)+r|0,n=((n+=((r=((r+=((o=((o+=((i=((i+=(n&o|r&~o)+e[5]-701558691|0)<<5|i>>>27)+n|0)&r|n&~r)+e[10]+38016083|0)<<9|o>>>23)+i|0)&n|i&~n)+e[15]-660478335|0)<<14|r>>>18)+o|0)&i|o&~i)+e[4]-405537848|0)<<20|n>>>12)+r|0,n=((n+=((r=((r+=((o=((o+=((i=((i+=(n&o|r&~o)+e[9]+568446438|0)<<5|i>>>27)+n|0)&r|n&~r)+e[14]-1019803690|0)<<9|o>>>23)+i|0)&n|i&~n)+e[3]-187363961|0)<<14|r>>>18)+o|0)&i|o&~i)+e[8]+1163531501|0)<<20|n>>>12)+r|0,n=((n+=((r=((r+=((o=((o+=((i=((i+=(n&o|r&~o)+e[13]-1444681467|0)<<5|i>>>27)+n|0)&r|n&~r)+e[2]-51403784|0)<<9|o>>>23)+i|0)&n|i&~n)+e[7]+1735328473|0)<<14|r>>>18)+o|0)&i|o&~i)+e[12]-1926607734|0)<<20|n>>>12)+r|0,n=((n+=((r=((r+=((o=((o+=((i=((i+=(n^r^o)+e[5]-378558|0)<<4|i>>>28)+n|0)^n^r)+e[8]-2022574463|0)<<11|o>>>21)+i|0)^i^n)+e[11]+1839030562|0)<<16|r>>>16)+o|0)^o^i)+e[14]-35309556|0)<<23|n>>>9)+r|0,n=((n+=((r=((r+=((o=((o+=((i=((i+=(n^r^o)+e[1]-1530992060|0)<<4|i>>>28)+n|0)^n^r)+e[4]+1272893353|0)<<11|o>>>21)+i|0)^i^n)+e[7]-155497632|0)<<16|r>>>16)+o|0)^o^i)+e[10]-1094730640|0)<<23|n>>>9)+r|0,n=((n+=((r=((r+=((o=((o+=((i=((i+=(n^r^o)+e[13]+681279174|0)<<4|i>>>28)+n|0)^n^r)+e[0]-358537222|0)<<11|o>>>21)+i|0)^i^n)+e[3]-722521979|0)<<16|r>>>16)+o|0)^o^i)+e[6]+76029189|0)<<23|n>>>9)+r|0,n=((n+=((r=((r+=((o=((o+=((i=((i+=(n^r^o)+e[9]-640364487|0)<<4|i>>>28)+n|0)^n^r)+e[12]-421815835|0)<<11|o>>>21)+i|0)^i^n)+e[15]+530742520|0)<<16|r>>>16)+o|0)^o^i)+e[2]-995338651|0)<<23|n>>>9)+r|0,n=((n+=((o=((o+=(n^((i=((i+=(r^(n|~o))+e[0]-198630844|0)<<6|i>>>26)+n|0)|~r))+e[7]+1126891415|0)<<10|o>>>22)+i|0)^((r=((r+=(i^(o|~n))+e[14]-1416354905|0)<<15|r>>>17)+o|0)|~i))+e[5]-57434055|0)<<21|n>>>11)+r|0,n=((n+=((o=((o+=(n^((i=((i+=(r^(n|~o))+e[12]+1700485571|0)<<6|i>>>26)+n|0)|~r))+e[3]-1894986606|0)<<10|o>>>22)+i|0)^((r=((r+=(i^(o|~n))+e[10]-1051523|0)<<15|r>>>17)+o|0)|~i))+e[1]-2054922799|0)<<21|n>>>11)+r|0,n=((n+=((o=((o+=(n^((i=((i+=(r^(n|~o))+e[8]+1873313359|0)<<6|i>>>26)+n|0)|~r))+e[15]-30611744|0)<<10|o>>>22)+i|0)^((r=((r+=(i^(o|~n))+e[6]-1560198380|0)<<15|r>>>17)+o|0)|~i))+e[13]+1309151649|0)<<21|n>>>11)+r|0,n=((n+=((o=((o+=(n^((i=((i+=(r^(n|~o))+e[4]-145523070|0)<<6|i>>>26)+n|0)|~r))+e[11]-1120210379|0)<<10|o>>>22)+i|0)^((r=((r+=(i^(o|~n))+e[2]+718787259|0)<<15|r>>>17)+o|0)|~i))+e[9]-343485551|0)<<21|n>>>11)+r|0,t[0]=i+t[0]|0,t[1]=n+t[1]|0,t[2]=r+t[2]|0,t[3]=o+t[3]|0}function i(t){var e,i=[];for(e=0;e<64;e+=4)i[e>>2]=t.charCodeAt(e)+(t.charCodeAt(e+1)<<8)+(t.charCodeAt(e+2)<<16)+(t.charCodeAt(e+3)<<24);return i}function n(t){var e,i=[];for(e=0;e<64;e+=4)i[e>>2]=t[e]+(t[e+1]<<8)+(t[e+2]<<16)+(t[e+3]<<24);return i}function r(t){var n,r,o,a,s,l,c=t.length,h=[1732584193,-271733879,-1732584194,271733878];for(n=64;n<=c;n+=64)e(h,i(t.substring(n-64,n)));for(r=(t=t.substring(n-64)).length,o=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],n=0;n<r;n+=1)o[n>>2]|=t.charCodeAt(n)<<(n%4<<3);if(o[n>>2]|=128<<(n%4<<3),n>55)for(e(h,o),n=0;n<16;n+=1)o[n]=0;return a=(a=8*c).toString(16).match(/(.*?)(.{0,8})$/),s=parseInt(a[2],16),l=parseInt(a[1],16)||0,o[14]=s,o[15]=l,e(h,o),h}function o(e){var i,n="";for(i=0;i<4;i+=1)n+=t[e>>8*i+4&15]+t[e>>8*i&15];return n}function a(t){var e;for(e=0;e<t.length;e+=1)t[e]=o(t[e]);return t.join("")}function s(t){return/[\u0080-\uFFFF]/.test(t)&&(t=unescape(encodeURIComponent(t))),t}function l(t){var e,i=[],n=t.length;for(e=0;e<n-1;e+=2)i.push(parseInt(t.substr(e,2),16));return String.fromCharCode.apply(String,i)}function c(){this.reset()}return a(r("hello")),"undefined"==typeof ArrayBuffer||ArrayBuffer.prototype.slice||function(){function t(t,e){return(t=0|t||0)<0?Math.max(t+e,0):Math.min(t,e)}ArrayBuffer.prototype.slice=function(e,i){var n,r,o,a,s=this.byteLength,l=t(e,s),c=s;return void 0!==i&&(c=t(i,s)),l>c?new ArrayBuffer(0):(n=c-l,r=new ArrayBuffer(n),o=new Uint8Array(r),a=new Uint8Array(this,l,n),o.set(a),r)}}(),c.prototype.append=function(t){return this.appendBinary(s(t)),this},c.prototype.appendBinary=function(t){this._buff+=t,this._length+=t.length;var n,r=this._buff.length;for(n=64;n<=r;n+=64)e(this._hash,i(this._buff.substring(n-64,n)));return this._buff=this._buff.substring(n-64),this},c.prototype.end=function(t){var e,i,n=this._buff,r=n.length,o=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(e=0;e<r;e+=1)o[e>>2]|=n.charCodeAt(e)<<(e%4<<3);return this._finish(o,r),i=a(this._hash),t&&(i=l(i)),this.reset(),i},c.prototype.reset=function(){return this._buff="",this._length=0,this._hash=[1732584193,-271733879,-1732584194,271733878],this},c.prototype.getState=function(){return{buff:this._buff,length:this._length,hash:this._hash.slice()}},c.prototype.setState=function(t){return this._buff=t.buff,this._length=t.length,this._hash=t.hash,this},c.prototype.destroy=function(){delete this._hash,delete this._buff,delete this._length},c.prototype._finish=function(t,i){var n,r,o,a=i;if(t[a>>2]|=128<<(a%4<<3),a>55)for(e(this._hash,t),a=0;a<16;a+=1)t[a]=0;n=(n=8*this._length).toString(16).match(/(.*?)(.{0,8})$/),r=parseInt(n[2],16),o=parseInt(n[1],16)||0,t[14]=r,t[15]=o,e(this._hash,t)},c.hash=function(t,e){return c.hashBinary(s(t),e)},c.hashBinary=function(t,e){var i=a(r(t));return e?l(i):i},c.ArrayBuffer=function(){this.reset()},c.ArrayBuffer.prototype.append=function(t){var i,r,o,a,s=(r=this._buff.buffer,o=t,(a=new Uint8Array(r.byteLength+o.byteLength)).set(new Uint8Array(r)),a.set(new Uint8Array(o),r.byteLength),a),l=s.length;for(this._length+=t.byteLength,i=64;i<=l;i+=64)e(this._hash,n(s.subarray(i-64,i)));return this._buff=i-64<l?new Uint8Array(s.buffer.slice(i-64)):new Uint8Array(0),this},c.ArrayBuffer.prototype.end=function(t){var e,i,n=this._buff,r=n.length,o=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(e=0;e<r;e+=1)o[e>>2]|=n[e]<<(e%4<<3);return this._finish(o,r),i=a(this._hash),t&&(i=l(i)),this.reset(),i},c.ArrayBuffer.prototype.reset=function(){return this._buff=new Uint8Array(0),this._length=0,this._hash=[1732584193,-271733879,-1732584194,271733878],this},c.ArrayBuffer.prototype.getState=function(){var t,e=c.prototype.getState.call(this);return e.buff=(t=e.buff,String.fromCharCode.apply(null,new Uint8Array(t))),e},c.ArrayBuffer.prototype.setState=function(t){return t.buff=function(t,e){var i,n=t.length,r=new ArrayBuffer(n),o=new Uint8Array(r);for(i=0;i<n;i+=1)o[i]=t.charCodeAt(i);return e?o:r}(t.buff,!0),c.prototype.setState.call(this,t)},c.ArrayBuffer.prototype.destroy=c.prototype.destroy,c.ArrayBuffer.prototype._finish=c.prototype._finish,c.ArrayBuffer.hash=function(t,i){var r=a(function(t){var i,r,o,a,s,l,c=t.length,h=[1732584193,-271733879,-1732584194,271733878];for(i=64;i<=c;i+=64)e(h,n(t.subarray(i-64,i)));for(r=(t=i-64<c?t.subarray(i-64):new Uint8Array(0)).length,o=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],i=0;i<r;i+=1)o[i>>2]|=t[i]<<(i%4<<3);if(o[i>>2]|=128<<(i%4<<3),i>55)for(e(h,o),i=0;i<16;i+=1)o[i]=0;return a=(a=8*c).toString(16).match(/(.*?)(.{0,8})$/),s=parseInt(a[2],16),l=parseInt(a[1],16)||0,o[14]=s,o[15]=l,e(h,o),h}(new Uint8Array(t)));return i?l(r):r},c}()),vt.exports),bt=dt(yt);function wt(t,e,i){t.prototype=e.prototype=i,i.constructor=t}function xt(t,e){var i=Object.create(t.prototype);for(var n in e)i[n]=e[n];return i}function $t(){}var kt=.7,St=1/kt,At="\\s*([+-]?\\d+)\\s*",Et="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",Ct="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",Nt=/^#([0-9a-f]{3,8})$/,It=new RegExp(`^rgb\\(${At},${At},${At}\\)$`),Mt=new RegExp(`^rgb\\(${Ct},${Ct},${Ct}\\)$`),Pt=new RegExp(`^rgba\\(${At},${At},${At},${Et}\\)$`),Ot=new RegExp(`^rgba\\(${Ct},${Ct},${Ct},${Et}\\)$`),Tt=new RegExp(`^hsl\\(${Et},${Ct},${Ct}\\)$`),Rt=new RegExp(`^hsla\\(${Et},${Ct},${Ct},${Et}\\)$`),Dt={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};function jt(){return this.rgb().formatHex()}function zt(){return this.rgb().formatRgb()}function Ut(t){var e,i;return t=(t+"").trim().toLowerCase(),(e=Nt.exec(t))?(i=e[1].length,e=parseInt(e[1],16),6===i?Lt(e):3===i?new Ft(e>>8&15|e>>4&240,e>>4&15|240&e,(15&e)<<4|15&e,1):8===i?Bt(e>>24&255,e>>16&255,e>>8&255,(255&e)/255):4===i?Bt(e>>12&15|e>>8&240,e>>8&15|e>>4&240,e>>4&15|240&e,((15&e)<<4|15&e)/255):null):(e=It.exec(t))?new Ft(e[1],e[2],e[3],1):(e=Mt.exec(t))?new Ft(255*e[1]/100,255*e[2]/100,255*e[3]/100,1):(e=Pt.exec(t))?Bt(e[1],e[2],e[3],e[4]):(e=Ot.exec(t))?Bt(255*e[1]/100,255*e[2]/100,255*e[3]/100,e[4]):(e=Tt.exec(t))?Qt(e[1],e[2]/100,e[3]/100,1):(e=Rt.exec(t))?Qt(e[1],e[2]/100,e[3]/100,e[4]):Dt.hasOwnProperty(t)?Lt(Dt[t]):"transparent"===t?new Ft(NaN,NaN,NaN,0):null}function Lt(t){return new Ft(t>>16&255,t>>8&255,255&t,1)}function Bt(t,e,i,n){return n<=0&&(t=e=i=NaN),new Ft(t,e,i,n)}function Ht(t,e,i,n){return 1===arguments.length?function(t){return t instanceof $t||(t=Ut(t)),t?new Ft((t=t.rgb()).r,t.g,t.b,t.opacity):new Ft}(t):new Ft(t,e,i,n??1)}function Ft(t,e,i,n){this.r=+t,this.g=+e,this.b=+i,this.opacity=+n}function qt(){return`#${Vt(this.r)}${Vt(this.g)}${Vt(this.b)}`}function Gt(){const t=Wt(this.opacity);return`${1===t?"rgb(":"rgba("}${Yt(this.r)}, ${Yt(this.g)}, ${Yt(this.b)}${1===t?")":`, ${t})`}`}function Wt(t){return isNaN(t)?1:Math.max(0,Math.min(1,t))}function Yt(t){return Math.max(0,Math.min(255,Math.round(t)||0))}function Vt(t){return((t=Yt(t))<16?"0":"")+t.toString(16)}function Qt(t,e,i,n){return n<=0?t=e=i=NaN:i<=0||i>=1?t=e=NaN:e<=0&&(t=NaN),new Kt(t,e,i,n)}function Jt(t){if(t instanceof Kt)return new Kt(t.h,t.s,t.l,t.opacity);if(t instanceof $t||(t=Ut(t)),!t)return new Kt;if(t instanceof Kt)return t;var e=(t=t.rgb()).r/255,i=t.g/255,n=t.b/255,r=Math.min(e,i,n),o=Math.max(e,i,n),a=NaN,s=o-r,l=(o+r)/2;return s?(a=e===o?(i-n)/s+6*(i<n):i===o?(n-e)/s+2:(e-i)/s+4,s/=l<.5?o+r:2-o-r,a*=60):s=l>0&&l<1?0:a,new Kt(a,s,l,t.opacity)}function Kt(t,e,i,n){this.h=+t,this.s=+e,this.l=+i,this.opacity=+n}function Xt(t){return(t=(t||0)%360)<0?t+360:t}function Zt(t){return Math.max(0,Math.min(1,t||0))}function te(t,e,i){return 255*(t<60?e+(i-e)*t/60:t<180?i:t<240?e+(i-e)*(240-t)/60:e)}wt($t,Ut,{copy(t){return Object.assign(new this.constructor,this,t)},displayable(){return this.rgb().displayable()},hex:jt,formatHex:jt,formatHex8:function(){return this.rgb().formatHex8()},formatHsl:function(){return Jt(this).formatHsl()},formatRgb:zt,toString:zt}),wt(Ft,Ht,xt($t,{brighter(t){return t=null==t?St:Math.pow(St,t),new Ft(this.r*t,this.g*t,this.b*t,this.opacity)},darker(t){return t=null==t?kt:Math.pow(kt,t),new Ft(this.r*t,this.g*t,this.b*t,this.opacity)},rgb(){return this},clamp(){return new Ft(Yt(this.r),Yt(this.g),Yt(this.b),Wt(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:qt,formatHex:qt,formatHex8:function(){return`#${Vt(this.r)}${Vt(this.g)}${Vt(this.b)}${Vt(255*(isNaN(this.opacity)?1:this.opacity))}`},formatRgb:Gt,toString:Gt})),wt(Kt,function(t,e,i,n){return 1===arguments.length?Jt(t):new Kt(t,e,i,n??1)},xt($t,{brighter(t){return t=null==t?St:Math.pow(St,t),new Kt(this.h,this.s,this.l*t,this.opacity)},darker(t){return t=null==t?kt:Math.pow(kt,t),new Kt(this.h,this.s,this.l*t,this.opacity)},rgb(){var t=this.h%360+360*(this.h<0),e=isNaN(t)||isNaN(this.s)?0:this.s,i=this.l,n=i+(i<.5?i:1-i)*e,r=2*i-n;return new Ft(te(t>=240?t-240:t+120,r,n),te(t,r,n),te(t<120?t+240:t-120,r,n),this.opacity)},clamp(){return new Kt(Xt(this.h),Zt(this.s),Zt(this.l),Wt(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const t=Wt(this.opacity);return`${1===t?"hsl(":"hsla("}${Xt(this.h)}, ${100*Zt(this.s)}%, ${100*Zt(this.l)}%${1===t?")":`, ${t})`}`}}));var ee=t=>()=>t;function ie(t,e){var i=e-t;return i?function(t,e){return function(i){return t+i*e}}(t,i):ee(isNaN(t)?e:t)}var ne=function t(e){var i=function(t){return 1===(t=+t)?ie:function(e,i){return i-e?function(t,e,i){return t=Math.pow(t,i),e=Math.pow(e,i)-t,i=1/i,function(n){return Math.pow(t+n*e,i)}}(e,i,t):ee(isNaN(e)?i:e)}}(e);function n(t,e){var n=i((t=Ht(t)).r,(e=Ht(e)).r),r=i(t.g,e.g),o=i(t.b,e.b),a=ie(t.opacity,e.opacity);return function(e){return t.r=n(e),t.g=r(e),t.b=o(e),t.opacity=a(e),t+""}}return n.gamma=t,n}(1);const re="https://github.com/foXaCe/mini-graph-card/blob/main/README.md",oe=["var(--accent-color)","#3498db","#e74c3c","#9b59b6","#f1c40f","#2ecc71","#1abc9c","#34495e","#e67e22","#7f8c8d","#27ae60","#2980b9","#8e44ad"],ae=["entity","line","length","fill","points","tooltip","abs","config"],se={name:!0,icon:!0,state:!0,graph:"line",labels:"hover",labels_secondary:"hover",extrema:!1,legend:!0,fill:!0,points:"hover"},le=36e5;class ce{constructor(t,e,i,n=24,r=1,o="avg",a="interval",s=!0,l=!1){const c={avg:this._average,median:this._median,max:this._maximum,min:this._minimum,first:this._first,last:this._last,sum:this._sum,delta:this._delta,diff:this._diff};this._history=void 0,this.coords=[],this.width=t-2*i[0],this.height=e,this.margin=i,this._max=0,this._min=0,this.points=r,this.hours=n,this.aggregateFuncName=o,this._calcPoint=c[o]||this._average,this._smoothing=s,this._logarithmic=l,this._groupBy=a,this._endTime=0}get max(){return this._max}set max(t){this._max=t}get min(){return this._min}set min(t){this._min=t}set history(t){this._history=t}update(t){if(t&&(this._history=t),!this._history)return;this._updateEndTime();const e=this._history.reduce((t,e)=>this._reducer(t,e),[]),i=Math.ceil(this.hours*this.points);e.length=i,this.coords=this._calcPoints(e),this.min=Math.min(...this.coords.map(t=>Number(t[2]))),this.max=Math.max(...this.coords.map(t=>Number(t[2])))}_reducer(t,e){const i=(this._endTime.getTime()-new Date(e.last_changed).getTime())/le*this.points-this.hours*this.points;if(i<0){const n=Math.floor(Math.abs(i));t[n]||(t[n]=[]),t[n].push(e)}else t[0]=[e];return t}_calcPoints(t){let e=this.width/(this.hours*this.points-1);e=Number.isFinite(e)?e:this.width;const i=[];let n,r=t.filter(Boolean)[0];for(let o=0;o<t.length;o+=1)n=e*o+this.margin[0],t[o]?(r=t[o],i.push([n,0,this._calcPoint(r)])):i.push([n,0,this._lastValue(r)]);return i}_calcY(t){const e=this._logarithmic?Math.log10(Math.max(1,this.max)):this.max,i=this._logarithmic?Math.log10(Math.max(1,this.min)):this.min,n=(e-i)/this.height||1;return t.map(t=>{const e=this._logarithmic?Math.log10(Math.max(1,t[2])):t[2],r=this.height-(e-i)/n;return[t[0],r,t[2]]})}getPoints(){let{coords:t}=this;if(1===t.length&&(t[1]=[this.width+this.margin[0],0,t[0][2]]),t=this._calcY(this.coords),this._smoothing){let e=t[0];return t.shift(),t.map((t,i)=>{const n=this._midPoint(e[0],e[1],t[0],t[1]),r=(e[2]+t[2])/2;return e=t,[n[0],n[1],r,i+1]})}return t.map((t,e)=>[t[0],t[1],t[2],e])}getPath(){let t,e,{coords:i}=this;1===i.length&&(i[1]=[this.width+this.margin[0],0,i[0][2]]),i=this._calcY(this.coords);let n="",r=i[0];return n+=`M${r[0]},${r[1]}`,i.forEach(i=>{t=i,e=this._smoothing?this._midPoint(r[0],r[1],t[0],t[1]):t,n+=` ${e[0]},${e[1]}`,n+=` Q ${t[0]},${t[1]}`,r=t}),n+=` ${t[0]},${t[1]}`,n}computeGradient(t,e){const i=e?Math.log10(Math.max(1,this._max))-Math.log10(Math.max(1,this._min)):this._max-this._min;return t.map((t,n,r)=>{let o,a;if(t.value>this._max&&r[n+1]){const e=(this._max-r[n+1].value)/(t.value-r[n+1].value);o=ne(r[n+1].color,t.color)(e)}else if(t.value<this._min&&r[n-1]){const e=(r[n-1].value-this._min)/(r[n-1].value-t.value);o=ne(r[n-1].color,t.color)(e)}return a=i<=0?0:e?(Math.log10(Math.max(1,this._max))-Math.log10(Math.max(1,t.value)))*(100/i):(this._max-t.value)*(100/i),{color:o||t.color,offset:a}})}getFill(t){const{height:e}=this;let i=t;return i+=` L ${this.coords[this.coords.length-1][0]}, ${e}`,i+=` L ${this.coords[0][0]}, ${e} z`,i}getBars(t,e,i=4){const n=this._calcY(this.coords),r=(this.width-i)/Math.ceil(this.hours*this.points)/e;return n.map((n,o)=>({x:r*o*e+r*t+i,y:n[1],height:this.height-n[1],width:r-i,value:n[2]}))}_midPoint(t,e,i,n){return[(t-i)/2+i,(e-n)/2+n]}_average(t){return t.reduce((t,e)=>t+parseFloat(e.state),0)/t.length}_median(t){const e=[...t].sort((t,e)=>parseFloat(t.state)-parseFloat(e.state)),i=Math.floor((e.length-1)/2);return e.length%2==1?parseFloat(e[i].state):(parseFloat(e[i].state)+parseFloat(e[i+1].state))/2}_maximum(t){return Math.max(...t.map(t=>Number(t.state)))}_minimum(t){return Math.min(...t.map(t=>Number(t.state)))}_first(t){return parseFloat(t[0].state)}_last(t){return parseFloat(t[t.length-1].state)}_sum(t){return t.reduce((t,e)=>t+parseFloat(e.state),0)}_delta(t){return this._maximum(t)-this._minimum(t)}_diff(t){return this._last(t)-this._first(t)}_lastValue(t){return!t||["delta","diff"].includes(this.aggregateFuncName)?0:parseFloat(t[t.length-1].state)||0}_updateEndTime(){switch(this._endTime=new Date,this._groupBy){case"month":this._endTime.setMonth(this._endTime.getMonth()+1),this._endTime.setDate(1);break;case"date":this._endTime.setDate(this._endTime.getDate()+1),this._endTime.setHours(0,0,0,0);break;case"hour":this._endTime.setHours(this._endTime.getHours()+1),this._endTime.setMinutes(0,0,0)}}}const he=o`
  :host {
    /* ── Premium design tokens ──────────────────────────────────────────────
       Everything derives from the active Home Assistant theme via color-mix in
       oklab, so the card stays coherent in light, dark and exotic themes — no
       hard-coded colours. Users can still override the --mcg-* hooks. */

    /* Radius — Apple-like, rounder than stock Material */
    --p-radius-sm: 10px;
    --p-radius-md: 14px;
    --p-radius-lg: 18px;
    --p-radius-pill: 9999px;

    /* Typography — system stack (SF Pro / Roboto spirit), no web fonts */
    --p-font: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text',
      'Segoe UI', Roboto, system-ui, sans-serif;

    /* Foreground / surface, derived from HA */
    --p-fg-1: var(--primary-text-color);
    --p-accent: var(--primary-color);
    --p-surface: var(--ha-card-background, var(--card-background-color, #fff));
    --p-divider: color-mix(in oklab, var(--p-fg-1) 12%, transparent);

    /* Multi-layer shadows (Apple-style, never a single hard shadow), tinted by
       the foreground so they read correctly on any background */
    --p-elev-1:
      0 1px 2px color-mix(in oklab, var(--p-fg-1) 7%, transparent),
      0 1px 3px color-mix(in oklab, var(--p-fg-1) 5%, transparent);
    --p-elev-2:
      0 2px 6px color-mix(in oklab, var(--p-fg-1) 9%, transparent),
      0 10px 28px color-mix(in oklab, var(--p-fg-1) 12%, transparent);
    --p-elev-pill:
      0 1px 2px color-mix(in oklab, var(--p-fg-1) 8%, transparent),
      0 2px 6px color-mix(in oklab, var(--p-fg-1) 6%, transparent);
    --p-elev-pressed: inset 0 1px 2px color-mix(in oklab, var(--p-fg-1) 12%, transparent);

    /* Motion — spring physics, never linear/ease */
    --p-ease: cubic-bezier(0.32, 0.72, 0, 1);
    --p-motion-fast: 150ms var(--p-ease);
    --p-motion-normal: 240ms var(--p-ease);

    /* Liquid Glass */
    --p-blur-glass: saturate(180%) blur(16px);
    --p-glass-bg: color-mix(in oklab, var(--p-surface) 72%, transparent);
    --p-glass-border: color-mix(in oklab, var(--p-fg-1) 10%, transparent);

    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
    container-type: inline-size;
    font-family: var(--p-font);
  }
  ha-card {
    flex-direction: column;
    flex: 1;
    padding: 0;
    position: relative;
    overflow: hidden;
    border-radius: var(--ha-card-border-radius, var(--p-radius-lg));
    box-shadow: var(--ha-card-box-shadow, var(--p-elev-1));
    border: 1px solid var(--p-divider);
    transition:
      box-shadow var(--p-motion-normal),
      transform var(--p-motion-normal);
    display: flex;
    height: auto; /* let HA grid define height */
    min-height: 0;
    box-sizing: border-box;
    gap: 0;
    isolation: isolate;
  }
  ha-card > div {
    padding: 0 16px;
    margin: 0;
  }
  ha-card > div:first-child {
    padding-top: 16px;
  }
  ha-card > div:not(:has(.graph)) {
    padding-bottom: 16px;
  }
  ha-card > div:has(.graph) {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;
    padding: 0 16px;
    margin: 0;
    height: 100%;
  }
  ha-card .graph {
    padding: 0;
    margin: 0;
    order: 10;
  }
  ha-card[points] .line--points,
  ha-card[labels] .graph__labels.--primary {
    opacity: 0;
    transition: opacity var(--p-motion-normal);
    animation: none;
  }
  ha-card[labels-secondary] .graph__labels.--secondary {
    opacity: 0;
    transition: opacity var(--p-motion-normal);
    animation: none;
  }
  ha-card[points]:hover .line--points,
  ha-card:hover .graph__labels.--primary,
  ha-card:hover .graph__labels.--secondary {
      opacity: 1;
  }
  ha-card[fill] path {
    stroke-linecap: initial;
    stroke-linejoin: initial;
  }
  ha-card .graph__legend {
    order: -1;
    padding: 0 16px 8px 16px;
  }
  ha-card[group] {
    padding: 0;
  }
  ha-card[group] > div {
    padding-left: 0;
    padding-right: 0;
  }
  ha-card[group] .graph__legend {
    padding-left: 0;
    padding-right: 0;
  }
  ha-card[hover] {
    cursor: pointer;
  }
  ha-card[hover]:hover {
    box-shadow: var(--p-elev-2);
    transform: translateY(-2px);
  }
  ha-card[hover]:active {
    transform: translateY(0) scale(0.997);
    box-shadow: var(--p-elev-1);
    transition-duration: 90ms;
  }
  ha-card:focus-visible {
    outline: 2px solid var(--p-accent);
    outline-offset: 2px;
  }
  ha-spinner {
    margin: 4px auto;
  }
  .flex {
    display: flex;
    display: -webkit-flex;
    min-width: 0;
  }
  .header {
    justify-content: space-between;
    flex-shrink: 0;
  }
  .header[loc="center"] {
    justify-content: space-around;
  }
  .header[loc="left"] {
    align-self: flex-start;
  }
  .header[loc="right"] {
    align-self: flex-end;
  }
  .name {
    align-items: center;
    min-width: 0;
    letter-spacing: var(--mcg-title-letter-spacing, -0.01em);
  }
  .name > span {
    font-size: 1.2em;
    font-weight: var(--mcg-title-font-weight, 500);
    max-height: 1.4em;
    min-height: 1.4em;
    opacity: .65;
    text-wrap: pretty;
  }
  .icon {
    color: var(--state-icon-color, var(--p-accent));
    display: inline-block;
    flex: 0 0 1.7em;
    text-align: center;
  }
  .icon > ha-icon {
    height: 1.7em;
    width: 1.7em;
  }
  .icon[loc="left"] {
    order: -1;
    margin-right: .6em;
    margin-left: 0;
  }
  .icon[loc="state"] {
    align-self: center;
  }
  .states {
    align-items: flex-start;
    font-weight: 300;
    justify-content: space-between;
    flex-wrap: nowrap;
    flex-shrink: 0;
  }
  .states .icon {
    align-self: center;
    margin-left: 0;
  }
  .states[loc="center"] {
    justify-content: space-evenly;
  }
  .states[loc="right"] > .state {
    margin-left: auto;
    order: 2;
  }
  .states[loc="center"] .states--secondary,
  .states[loc="right"] .states--secondary {
    margin-left: 0;
  }
  .states[loc="center"] .states--secondary {
    align-items: center;
  }
  .states[loc="right"] .states--secondary {
    align-items: flex-start;
  }
  .states[loc="center"] .state__time {
    left: 50%;
    transform: translateX(-50%);
  }
  .states > .icon > ha-icon {
    height: 2em !important;
    width: 2em !important;
  }
  .states--secondary {
    display: flex;
    flex-flow: column;
    flex-wrap: wrap;
    align-items: flex-end;
    margin-left: 1rem;
    min-width: 0;
    margin-left: 1.4em;
  }
  .states--secondary:empty {
    display: none;
  }
  .state {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    max-width: 100%;
    min-width: 0;
  }
  .state > svg {
    align-self: center;
    border-radius: 100%;
  }
  .state--small {
    font-size: .6em;
    margin-bottom: .6rem;
    flex-wrap: nowrap;
  }
  .state--small > svg {
    position: absolute;
    left: -1.6em;
    align-self: center;
    height: 1em;
    width: 1em;
    border-radius: 100%;
    margin-right: 1em;
  }
  .state--small:last-child {
    margin-bottom: 0;
  }
  .states--secondary > :only-child {
    font-size: 1em;
    margin-bottom: 0;
  }
  .states--secondary > :only-child svg {
    display: none;
  }
  .state__value {
    display: inline-block;
    font-size: 2.4em;
    margin-right: .25rem;
    line-height: 1.2em;
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
    font-feature-settings: "tnum";
    transition: color var(--p-motion-normal);
  }
  .state__uom {
    flex: 1;
    align-self: flex-end;
    display: inline-block;
    font-size: 1.4em;
    font-weight: 400;
    line-height: 1.6em;
    margin-top: .1em;
    opacity: .6;
    vertical-align: bottom;
  }
  .state--small .state__uom {
    flex: 1;
  }
  .state__time {
    font-size: .95rem;
    font-weight: 500;
    bottom: -1.1rem;
    left: 0;
    opacity: .75;
    position: absolute;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
    animation: fade 0.3s var(--p-ease);
    transition: opacity var(--p-motion-fast);
  }
  .states[loc="right"] .state__time {
    left: initial;
    right: 0;
  }
  .graph {
    align-self: stretch;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex: 1;
    margin: 0;
    width: 100%;
    min-height: 0;
    overflow: hidden;
    height: 100%;
    position: relative;
  }
  .graph__container {
    display: flex;
    flex-direction: row;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }
  .graph__container__svg {
    cursor: default;
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;
    /* relative so the child svg absolute positioning doesn't leak */
    position: relative;
  }
  .graph__container__svg > svg {
    overflow: visible;
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    /* Ensure no extra baseline space from inline SVG rendering */
    vertical-align: top;
  }
  path {
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .fill[anim="false"] {
    animation: reveal .25s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
  }
  .fill[anim="false"][type="fade"] {
    animation: reveal-2 .25s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
  }
  .line--points[anim="false"],
  .line[anim="false"] {
    animation: pop .25s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
  }
  .line--points[inactive],
  .line--rect[inactive],
  .fill--rect[inactive] {
    opacity: 0 !important;
    animation: none !important;
    transition: all .15s !important;
  }
  .line--points[tooltip] .line--point[inactive] {
    opacity: 0;
  }
  .line--point {
    cursor: pointer;
    fill: var(--primary-background-color, white);
    stroke-width: inherit;
    transition:
      transform var(--p-motion-fast),
      filter var(--p-motion-fast),
      fill var(--p-motion-fast);
  }
  .line--point:hover {
    fill: var(--mcg-hover, inherit) !important;
    transform: scale(1.15);
    filter: drop-shadow(0 2px 4px color-mix(in oklab, var(--p-fg-1) 20%, transparent));
  }
  .bars {
    animation: pop .25s cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  .bars[anim] {
    animation: bars .5s cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  .bar {
    transition:
      transform var(--p-motion-fast),
      opacity var(--p-motion-fast),
      filter var(--p-motion-fast);
  }
  .bar:hover {
    opacity: 0.85;
    cursor: pointer;
    filter: brightness(1.08) drop-shadow(0 2px 4px color-mix(in oklab, var(--p-fg-1) 16%, transparent));
    transform: translateY(-1px);
  }
  ha-card[gradient] .line--point:hover {
    fill: var(--primary-text-color, white);
  }
  path,
  .line--points,
  .fill {
    opacity: 0;
  }
  .line--points[anim="true"][init] {
    animation: pop .5s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
  }
  .fill[anim="true"][init] {
    animation: reveal .5s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
  }
  .fill[anim="true"][init][type="fade"] {
    animation: reveal-2 .5s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
  }
  .line[anim="true"][init] {
    animation: dash 1s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
  }
  .graph__labels.--secondary {
    right: 0;
    margin-right: 0px;
    align-items: flex-end;
  }
  .graph__labels {
    align-items: flex-start;
    flex-direction: column;
    font-size: calc(.15em + 8.5px);
    font-weight: 500;
    justify-content: space-between;
    margin-right: 10px;
    padding: .6em;
    position: absolute;
    pointer-events: none;
    top: 0; bottom: 0;
    opacity: .85;
    font-variant-numeric: tabular-nums;
  }
  .graph__labels > span {
    cursor: pointer;
    color: var(--p-fg-1);
    background: var(--p-glass-bg);
    border-radius: var(--p-radius-pill);
    padding: .3em .8em;
    box-shadow: var(--p-elev-pill);
    border: 1px solid var(--p-glass-border);
    backdrop-filter: var(--p-blur-glass);
    -webkit-backdrop-filter: var(--p-blur-glass);
    transition:
      transform var(--p-motion-fast),
      box-shadow var(--p-motion-fast),
      background var(--p-motion-fast);
  }
  .graph__labels > span:hover {
    box-shadow: var(--p-elev-2);
    transform: translateY(-1px);
    background: color-mix(in oklab, var(--p-surface) 88%, transparent);
  }
  @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
    .graph__labels > span {
      background: color-mix(in oklab, var(--p-surface) 92%, var(--p-fg-1));
    }
  }
  .graph__legend {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    padding: 16px 0 0 0;
    margin: 0;
    flex-wrap: wrap;
    flex-shrink: 0;
  }
  .graph__legend__item {
    cursor: pointer;
    display: flex;
    min-width: 0;
    margin: .4em;
    align-items: center;
    padding: 0.3em 0.6em;
    border-radius: var(--p-radius-sm);
    transition:
      transform var(--p-motion-fast),
      box-shadow var(--p-motion-fast),
      background var(--p-motion-fast);
  }
  .graph__legend__item:hover {
    background: color-mix(in oklab, var(--p-fg-1) 6%, transparent);
    transform: translateY(-1px);
    box-shadow: var(--p-elev-1);
  }
  .graph__legend__item:active {
    transform: scale(0.96);
    box-shadow: var(--p-elev-pressed);
    transition-duration: 80ms;
  }
  .graph__legend__item:focus-visible {
    outline: 2px solid var(--p-accent);
    outline-offset: 2px;
  }
  .graph__legend__item span {
    opacity: .75;
    margin-left: .4em;
  }
  .graph__legend__item svg {
    border-radius: 100%;
    min-width: 10px;
  }
  .info {
    justify-content: space-between;
    align-items: middle;
    flex-shrink: 0;
  }
  .info__item {
    display: flex;
    flex-flow: column;
    text-align: center;
  }
  .info__item:last-child {
    align-items: flex-end;
    text-align: right;
  }
  .info__item:first-child {
    align-items: flex-start;
    text-align: left;
  }
  .info__item__type {
    text-transform: capitalize;
    font-weight: 500;
    opacity: .9;
  }
  .info__item__time,
  .info__item__value {
    opacity: .75;
    font-variant-numeric: tabular-nums;
  }
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Opt-out of the premium layer (appearance: minimal): flat surfaces, no glass
     blur, no hover lift — for users who prefer a quieter card. */
  :host([data-appearance="minimal"]) .graph__labels > span {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    background: color-mix(in oklab, var(--p-surface) 92%, var(--p-fg-1));
  }
  :host([data-appearance="minimal"]) ha-card[hover]:hover {
    transform: none;
    box-shadow: var(--ha-card-box-shadow, var(--p-elev-1));
  }

  /* Honour the user's reduced-motion preference: collapse spring durations and
     stop decorative animations. */
  @media (prefers-reduced-motion: reduce) {
    :host {
      --p-motion-fast: 1ms var(--p-ease);
      --p-motion-normal: 1ms var(--p-ease);
    }
    ha-card,
    ha-card[hover]:hover,
    .line--point,
    .bar,
    .graph__legend__item,
    .graph__labels > span {
      transition-duration: 1ms;
    }
    .fill,
    .line,
    .line--points,
    .bars,
    .state__time {
      animation: none !important;
      opacity: 1;
    }
  }

  @keyframes fade {
    0% {
      opacity: 0;
      transform: translateY(4px);
    }
    100% {
      opacity: 0.75;
      transform: translateY(0);
    }
  }
  @keyframes reveal {
    0% { opacity: 0; }
    100% { opacity: .15; }
  }
  @keyframes reveal-2 {
    0% { opacity: 0; }
    100% { opacity: .4; }
  }
  @keyframes pop {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  @keyframes bars {
    0% { opacity: 0; }
    50% { opacity: 0; }
    100% { opacity: 1; }
  }
  @keyframes dash {
    0% {
      opacity: 0;
    }
    25% {
      opacity: 1;
    }
    100% {
      opacity: 1;
      stroke-dashoffset: 0;
    }
  }`;let de=String.fromCharCode;const ue=(t,e)=>t.reduce((t,i)=>t+Number(i[e]),0)/t.length,pe=(t,e)=>t.reduce((t,i)=>Number(i[e])>Number(t[e])?i:t,t[0]),fe=(t,e,i="en-US")=>t.toLocaleString(i,{hour:"numeric",minute:"numeric",...e}),me=t=>3600*t*1e3,ge=t=>((t,e,i)=>{if(null==t)return"";let n,r,o,a={},s={},l="",c="",h="",d=2,u=3,p=2,f=[],m=0,g=0;for(o=0;o<t.length;o+=1)if(l=t.charAt(o),Object.prototype.hasOwnProperty.call(a,l)||(a[l]=u++,s[l]=!0),c=h+l,Object.prototype.hasOwnProperty.call(a,c))h=c;else{if(Object.prototype.hasOwnProperty.call(s,h)){if(h.charCodeAt(0)<256){for(n=0;n<p;n++)m<<=1,g==e-1?(g=0,f.push(i(m)),m=0):g++;for(r=h.charCodeAt(0),n=0;n<8;n++)m=m<<1|1&r,g==e-1?(g=0,f.push(i(m)),m=0):g++,r>>=1}else{for(r=1,n=0;n<p;n++)m=m<<1|r,g==e-1?(g=0,f.push(i(m)),m=0):g++,r=0;for(r=h.charCodeAt(0),n=0;n<16;n++)m=m<<1|1&r,g==e-1?(g=0,f.push(i(m)),m=0):g++,r>>=1}d--,0==d&&(d=Math.pow(2,p),p++),delete s[h]}else for(r=a[h],n=0;n<p;n++)m=m<<1|1&r,g==e-1?(g=0,f.push(i(m)),m=0):g++,r>>=1;d--,0==d&&(d=Math.pow(2,p),p++),a[c]=u++,h=String(l)}if(""!==h){if(Object.prototype.hasOwnProperty.call(s,h)){if(h.charCodeAt(0)<256){for(n=0;n<p;n++)m<<=1,g==e-1?(g=0,f.push(i(m)),m=0):g++;for(r=h.charCodeAt(0),n=0;n<8;n++)m=m<<1|1&r,g==e-1?(g=0,f.push(i(m)),m=0):g++,r>>=1}else{for(r=1,n=0;n<p;n++)m=m<<1|r,g==e-1?(g=0,f.push(i(m)),m=0):g++,r=0;for(r=h.charCodeAt(0),n=0;n<16;n++)m=m<<1|1&r,g==e-1?(g=0,f.push(i(m)),m=0):g++,r>>=1}d--,0==d&&(d=Math.pow(2,p),p++),delete s[h]}else for(r=a[h],n=0;n<p;n++)m=m<<1|1&r,g==e-1?(g=0,f.push(i(m)),m=0):g++,r>>=1;d--,0==d&&(d=Math.pow(2,p),p++)}for(r=2,n=0;n<p;n++)m=m<<1|1&r,g==e-1?(g=0,f.push(i(m)),m=0):g++,r>>=1;for(;;){if(m<<=1,g==e-1){f.push(i(m));break}g++}return f.join("")})(JSON.stringify(t),16,function(t){return de(t)}),_e=t=>{return"string"==typeof t?JSON.parse(null==(e=t)?"":""==e?null:((t,e,i)=>{let n,r,o,a,s,l,c,h=[],d=4,u=4,p=3,f="",m=[],g={val:i(0),position:e,index:1};for(n=0;n<3;n+=1)h[n]=n;for(o=0,s=Math.pow(2,2),l=1;l!=s;)a=g.val&g.position,g.position>>=1,0==g.position&&(g.position=e,g.val=i(g.index++)),o|=(a>0?1:0)*l,l<<=1;switch(o){case 0:for(o=0,s=Math.pow(2,8),l=1;l!=s;)a=g.val&g.position,g.position>>=1,0==g.position&&(g.position=e,g.val=i(g.index++)),o|=(a>0?1:0)*l,l<<=1;c=de(o);break;case 1:for(o=0,s=Math.pow(2,16),l=1;l!=s;)a=g.val&g.position,g.position>>=1,0==g.position&&(g.position=e,g.val=i(g.index++)),o|=(a>0?1:0)*l,l<<=1;c=de(o);break;case 2:return""}for(h[3]=c,r=c,m.push(c);;){if(g.index>t)return"";for(o=0,s=Math.pow(2,p),l=1;l!=s;)a=g.val&g.position,g.position>>=1,0==g.position&&(g.position=e,g.val=i(g.index++)),o|=(a>0?1:0)*l,l<<=1;switch(c=o){case 0:for(o=0,s=Math.pow(2,8),l=1;l!=s;)a=g.val&g.position,g.position>>=1,0==g.position&&(g.position=e,g.val=i(g.index++)),o|=(a>0?1:0)*l,l<<=1;h[u++]=de(o),c=u-1,d--;break;case 1:for(o=0,s=Math.pow(2,16),l=1;l!=s;)a=g.val&g.position,g.position>>=1,0==g.position&&(g.position=e,g.val=i(g.index++)),o|=(a>0?1:0)*l,l<<=1;h[u++]=de(o),c=u-1,d--;break;case 2:return m.join("")}if(0==d&&(d=Math.pow(2,p),p++),h[c])f=h[c];else{if(c!==u)return null;f=r+r.charAt(0)}m.push(f),h[u++]=r+f.charAt(0),d--,r=f,0==d&&(d=Math.pow(2,p),p++)}})(e.length,32768,function(t){return e.charCodeAt(t)})):t;var e},ve=t=>{console.warn("mini-graph-card: ",t)},ye=(t,e)=>{for(let i=e,n=t.length;i<n;i+=1)if(null!=t[i].value)return i;throw new Error('Error in threshold interpolation: could not find right-nearest valued stop. Do the first and last thresholds have a set "value"?')},be={en:{editor:{messages:{loading_home_assistant:"Loading Home Assistant...",please_wait_while_the_editor_loads:"Please wait while the editor loads.",editor_error:"Editor Error",an_error_occurred_while_rendering_the_editor:"An error occurred while rendering the editor:"},headers:{mini_graph_card_configuration:"Mini Graph Card Configuration",complete_configuration_for_all_options:"Complete configuration for all options"},sections:{entities:"Entities",add_configure_and_manage_all_your_entities:"Add, configure and manage all your entities",display_options:"Display Options",name_icon_and_visual_appearance_settings:"Name, icon, and visual appearance settings",graph_settings:"Graph Settings",graph_type_colors_and_visual_properties:"Graph type, colors, and visual properties",data_time:"Data & Time",data_aggregation_and_time_configuration:"Data aggregation and time configuration",scale_bounds:"Scale & Bounds",y_axis_bounds_and_scaling_options:"Y-axis bounds and scaling options",colors_thresholds:"Colors & Thresholds",color_configuration_and_dynamic_thresholds:"Color configuration and dynamic thresholds",advanced_options:"Advanced Options",advanced_options_and_performance_settings:"Advanced options and performance settings"},labels:{appearance:"Appearance",primary_entity_will_be_converted_to_entities_list:"Primary Entity (will be converted to entities list)",card_name:"Card Name",icon:"Icon",icon_image_url:"Icon Image URL",unit:"Unit",font_size:"Font Size (%)",header_font_size_px:"Header Font Size (px)",header_alignment:"Header Alignment",icon_alignment:"Icon Alignment",state_alignment:"State Alignment",decimal_places:"Decimal Places",height_px:"Height (px)",line_width:"Line Width",line_colors_comma_separated:"Line Colors (comma-separated)",bar_spacing:"Bar Spacing",enable_animation:"Enable Animation",smooth_lines:"Smooth Lines",logarithmic_scale:"Logarithmic Scale",hours_to_show:"Hours to Show",points_per_hour:"Points per Hour",aggregate_function:"Aggregate Function",group_by:"Group By",update_interval_seconds:"Update Interval (seconds)",primary_y_axis:"Primary Y-Axis",lower_bound_use_n_for_soft:"Lower Bound (use ~N for soft)",upper_bound_use_n_for_soft:"Upper Bound (use ~N for soft)",minimum_range:"Minimum Range",threshold_transition:"Threshold Transition",color_thresholds:"Color Thresholds",cache_data:"Cache Data",compress_data:"Compress Data",group_entities:"Group Entities",time_format_24h:"24-Hour Time Format"},buttons:{hide:"Hide",configure:"Configure",remove_entity:"Remove Entity",add_entity:"Add Entity",add_threshold:"Add Threshold",remove:"Remove"},placeholders:{card_title:"Card title",value:"Value",unit_example:"°C, kW, etc.",lower_bound_example:"0 or ~0",upper_bound_example:"100 or ~100"},options:{premium:"Premium",minimal:"Minimal",default:"Default",left:"Left",right:"Right",center:"Center",with_state:"With State",median:"Median",minimum:"Minimum",maximum:"Maximum",first:"First",last:"Last",sum:"Sum",delta:"Delta",difference:"Difference",interval:"Interval",date:"Date",hour:"Hour",smooth:"Smooth",hard:"Hard",primary:"Primary",secondary:"Secondary",average:"Average"},visibility:{visibility_options:"Visibility Options",name:"Name",state:"State",graph:"Graph",fill:"Fill",points:"Points",legend:"Legend",extrema:"Extrema",average:"Average",labels:"Labels",secondary_labels:"Secondary Labels"},tap_action:{tap_action:"Tap Action",action_type:"Action Type",more_info:"More Info",navigate:"Navigate",call_service:"Call Service",open_url:"Open URL",no_action:"No Action",navigation_path:"Navigation Path",url:"URL",service:"Service"},entity:{custom_name:"Custom Name",custom_color:"Custom Color",attribute_instead_of_state:"Attribute (instead of state)",y_axis:"Y-Axis",show_state:"Show State",show_in_graph:"Show in Graph",show_line:"Show Line",show_fill:"Show Fill",show_points:"Show Points",show_in_legend:"Show in Legend",smoothing:"Smoothing",fixed_value:"Fixed Value"}},card:{error:{entity_not_available:"Entity not available:",invalid_config:"Invalid configuration.",no_entities:'Please define at least one entity via the "entities" option.'},a11y:{loading:"Loading"},labels:{current:"Current"},display_type:{min:"min",avg:"avg",max:"max"},picker:{name:"Mini Graph Card",description:"The Mini Graph card is a minimalistic and customizable graph card"}}},fr:{editor:{messages:{loading_home_assistant:"Chargement de Home Assistant...",please_wait_while_the_editor_loads:"Veuillez patienter pendant le chargement de l'éditeur.",editor_error:"Erreur de l'éditeur",an_error_occurred_while_rendering_the_editor:"Une erreur s'est produite lors du rendu de l'éditeur :"},headers:{mini_graph_card_configuration:"Configuration Mini Graph Card",complete_configuration_for_all_options:"Configuration complète pour toutes les options"},sections:{entities:"Entités",add_configure_and_manage_all_your_entities:"Ajoutez, configurez et gérez toutes vos entités",display_options:"Options d'affichage",name_icon_and_visual_appearance_settings:"Nom, icône et paramètres d'apparence visuelle",graph_settings:"Paramètres du graphique",graph_type_colors_and_visual_properties:"Type de graphique, couleurs et propriétés visuelles",data_time:"Données et période",data_aggregation_and_time_configuration:"Agrégation des données et configuration temporelle",scale_bounds:"Échelle et limites",y_axis_bounds_and_scaling_options:"Limites de l'axe Y et options d'échelle",colors_thresholds:"Couleurs et seuils",color_configuration_and_dynamic_thresholds:"Configuration des couleurs et seuils dynamiques",advanced_options:"Options avancées",advanced_options_and_performance_settings:"Options avancées et paramètres de performance"},labels:{appearance:"Apparence",primary_entity_will_be_converted_to_entities_list:"Entité principale (sera convertie en liste d'entités)",card_name:"Nom de la carte",icon:"Icône",icon_image_url:"URL de l'image d'icône",unit:"Unité",font_size:"Taille de police (%)",header_font_size_px:"Taille de police de l'en-tête (px)",header_alignment:"Alignement de l'en-tête",icon_alignment:"Alignement de l'icône",state_alignment:"Alignement de l'état",decimal_places:"Nombre de décimales",height_px:"Hauteur (px)",line_width:"Épaisseur de ligne",line_colors_comma_separated:"Couleurs de ligne (séparées par des virgules)",bar_spacing:"Espacement des barres",enable_animation:"Activer l'animation",smooth_lines:"Lignes lissées",logarithmic_scale:"Échelle logarithmique",hours_to_show:"Heures à afficher",points_per_hour:"Points par heure",aggregate_function:"Fonction d'agrégation",group_by:"Grouper par",update_interval_seconds:"Intervalle de mise à jour (secondes)",primary_y_axis:"Axe Y principal",lower_bound_use_n_for_soft:"Limite inférieure (utiliser ~N pour souple)",upper_bound_use_n_for_soft:"Limite supérieure (utiliser ~N pour souple)",minimum_range:"Plage minimale",threshold_transition:"Transition des seuils",color_thresholds:"Seuils de couleur",cache_data:"Mettre en cache les données",compress_data:"Compresser les données",group_entities:"Grouper les entités",time_format_24h:"Format 24 heures"},buttons:{hide:"Masquer",configure:"Configurer",remove_entity:"Supprimer l'entité",add_entity:"Ajouter une entité",add_threshold:"Ajouter un seuil",remove:"Supprimer"},placeholders:{card_title:"Titre de la carte",value:"Valeur",unit_example:"°C, kW, etc.",lower_bound_example:"0 ou ~0",upper_bound_example:"100 ou ~100"},options:{premium:"Premium",minimal:"Minimal",default:"Par défaut",left:"Gauche",right:"Droite",center:"Centre",with_state:"Avec l'état",median:"Médiane",minimum:"Minimum",maximum:"Maximum",first:"Premier",last:"Dernier",sum:"Somme",delta:"Delta",difference:"Différence",interval:"Intervalle",date:"Date",hour:"Heure",smooth:"Progressive",hard:"Nette",primary:"Principal",secondary:"Secondaire",average:"Moyenne"},visibility:{visibility_options:"Options de visibilité",name:"Nom",state:"État",graph:"Graphique",fill:"Remplissage",points:"Points",legend:"Légende",extrema:"Extrema",average:"Moyenne",labels:"Étiquettes",secondary_labels:"Étiquettes secondaires"},tap_action:{tap_action:"Action lors de l'appui",action_type:"Type d'action",more_info:"Plus d'infos",navigate:"Naviguer",call_service:"Appeler un service",open_url:"Ouvrir une URL",no_action:"Aucune action",navigation_path:"Chemin de navigation",url:"URL",service:"Service"},entity:{custom_name:"Nom personnalisé",custom_color:"Couleur personnalisée",attribute_instead_of_state:"Attribut (au lieu de l'état)",y_axis:"Axe Y",show_state:"Afficher l'état",show_in_graph:"Afficher dans le graphique",show_line:"Afficher la ligne",show_fill:"Afficher le remplissage",show_points:"Afficher les points",show_in_legend:"Afficher dans la légende",smoothing:"Lissage",fixed_value:"Valeur fixe"}},card:{error:{entity_not_available:"Entité non disponible :",invalid_config:"Configuration invalide.",no_entities:"Veuillez définir au moins une entité via l’option « entities »."},a11y:{loading:"Chargement"},labels:{current:"Actuel"},display_type:{min:"min",avg:"moy",max:"max"},picker:{name:"Mini Graph Card",description:"La carte Mini Graph est une carte de graphique minimaliste et personnalisable"}}}},we="en";function xe(t,e){return e.split(".").reduce((t,e)=>t&&"string"!=typeof t&&void 0!==t[e]?t[e]:void 0,t)}function $e(t,e,i){const n=function(t){let e=we;t&&t.locale&&t.locale.language?e=t.locale.language:t&&t.language?e=t.language:"undefined"!=typeof navigator&&navigator.language&&(e=navigator.language);const i=String(e).toLowerCase().split("-")[0];return be[i]?i:we}(e);let r=xe(be[n],t);return void 0===r&&(r=xe(be[we],t)),void 0===r||"string"!=typeof r?t:r}var ke,Se;!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(ke||(ke={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(Se||(Se={}));var Ae=function(t,e,i,n){n=n||{},i=i??{};var r=new Event(e,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return r.detail=i,t.dispatchEvent(r),r},Ee={alert:"mdi:alert",automation:"mdi:playlist-play",calendar:"mdi:calendar",camera:"mdi:video",climate:"mdi:thermostat",configurator:"mdi:settings",conversation:"mdi:text-to-speech",device_tracker:"mdi:account",fan:"mdi:fan",group:"mdi:google-circles-communities",history_graph:"mdi:chart-line",homeassistant:"mdi:home-assistant",homekit:"mdi:home-automation",image_processing:"mdi:image-filter-frames",input_boolean:"mdi:drawing",input_datetime:"mdi:calendar-clock",input_number:"mdi:ray-vertex",input_select:"mdi:format-list-bulleted",input_text:"mdi:textbox",light:"mdi:lightbulb",mailbox:"mdi:mailbox",notify:"mdi:comment-alert",person:"mdi:account",plant:"mdi:flower",proximity:"mdi:apple-safari",remote:"mdi:remote",scene:"mdi:google-pages",script:"mdi:file-document",sensor:"mdi:eye",simple_alarm:"mdi:bell",sun:"mdi:white-balance-sunny",switch:"mdi:flash",timer:"mdi:timer",updater:"mdi:cloud-upload",vacuum:"mdi:robot-vacuum",water_heater:"mdi:thermometer",weblink:"mdi:open-in-new"};function Ce(t,e){if(t in Ee)return Ee[t];switch(t){case"alarm_control_panel":switch(e){case"armed_home":return"mdi:bell-plus";case"armed_night":return"mdi:bell-sleep";case"disarmed":return"mdi:bell-outline";case"triggered":return"mdi:bell-ring";default:return"mdi:bell"}case"binary_sensor":return e&&"off"===e?"mdi:radiobox-blank":"mdi:checkbox-marked-circle";case"cover":return"closed"===e?"mdi:window-closed":"mdi:window-open";case"lock":return e&&"unlocked"===e?"mdi:lock-open":"mdi:lock";case"media_player":return e&&"off"!==e&&"idle"!==e?"mdi:cast-connected":"mdi:cast";case"zwave":switch(e){case"dead":return"mdi:emoticon-dead";case"sleeping":return"mdi:sleep";case"initializing":return"mdi:timer-sand";default:return"mdi:z-wave"}default:return console.warn("Unable to find icon for domain "+t+" ("+e+")"),"mdi:bookmark"}}var Ne={humidity:"mdi:water-percent",illuminance:"mdi:brightness-5",temperature:"mdi:thermometer",pressure:"mdi:gauge",power:"mdi:flash",signal_strength:"mdi:wifi"},Ie={binary_sensor:function(t,e){var i="off"===t;switch(null==e?void 0:e.attributes.device_class){case"battery":return i?"mdi:battery":"mdi:battery-outline";case"battery_charging":return i?"mdi:battery":"mdi:battery-charging";case"cold":return i?"mdi:thermometer":"mdi:snowflake";case"connectivity":return i?"mdi:server-network-off":"mdi:server-network";case"door":return i?"mdi:door-closed":"mdi:door-open";case"garage_door":return i?"mdi:garage":"mdi:garage-open";case"power":case"plug":return i?"mdi:power-plug-off":"mdi:power-plug";case"gas":case"problem":case"safety":case"tamper":return i?"mdi:check-circle":"mdi:alert-circle";case"smoke":return i?"mdi:check-circle":"mdi:smoke";case"heat":return i?"mdi:thermometer":"mdi:fire";case"light":return i?"mdi:brightness-5":"mdi:brightness-7";case"lock":return i?"mdi:lock":"mdi:lock-open";case"moisture":return i?"mdi:water-off":"mdi:water";case"motion":return i?"mdi:walk":"mdi:run";case"occupancy":case"presence":return i?"mdi:home-outline":"mdi:home";case"opening":return i?"mdi:square":"mdi:square-outline";case"running":return i?"mdi:stop":"mdi:play";case"sound":return i?"mdi:music-note-off":"mdi:music-note";case"update":return i?"mdi:package":"mdi:package-up";case"vibration":return i?"mdi:crop-portrait":"mdi:vibrate";case"window":return i?"mdi:window-closed":"mdi:window-open";default:return i?"mdi:radiobox-blank":"mdi:checkbox-marked-circle"}},cover:function(t){var e="closed"!==t.state;switch(t.attributes.device_class){case"garage":return e?"mdi:garage-open":"mdi:garage";case"door":return e?"mdi:door-open":"mdi:door-closed";case"shutter":return e?"mdi:window-shutter-open":"mdi:window-shutter";case"blind":return e?"mdi:blinds-open":"mdi:blinds";case"window":return e?"mdi:window-open":"mdi:window-closed";default:return Ce("cover",t.state)}},sensor:function(t){var e=t.attributes.device_class;if(e&&e in Ne)return Ne[e];if("battery"===e){var i=Number(t.state);if(isNaN(i))return"mdi:battery-unknown";var n=10*Math.round(i/10);return n>=100?"mdi:battery":n<=0?"mdi:battery-alert":"hass:battery-"+n}var r=t.attributes.unit_of_measurement;return"°C"===r||"°F"===r?"mdi:thermometer":Ce("sensor")},input_datetime:function(t){return t.attributes.has_date?t.attributes.has_time?Ce("input_datetime"):"mdi:calendar":"mdi:clock"}};function Me(t,e,i){return!Number.isNaN(Number(t))&&Intl?new Intl.NumberFormat(e,{minimumFractionDigits:i}).format(Number(t)):t.toString()}function Pe(t,e,i,n){if(!(t in Math))throw new Error(`The type "${t}" is not present on the Math object`);return void 0===i?Math[t](...e.map(e=>e[t]))||n:"string"!=typeof i||"~"!==i[0]?i:Math[t](Number(i.substring(1)),...e.map(e=>e[t]))}function Oe(t,e,i,n,r){let o=[Pe("min",t,e,n[0]),Pe("max",t,i,n[1])];if(r){const t=Math.abs(o[0]-o[1]),n=parseFloat(r)-t;if(n>0){const t=[void 0!==e&&"~"!==e[0]||void 0===i?0:1,void 0!==i&&"~"!==i[0]||void 0===e?0:1],r=t[0]+t[1];o=r>0?[o[0]-n*t[0]/r,o[1]+n*t[1]/r]:[o[0]-n/2,o[1]+n/2]}}return o}function Te(t,e,i){return`${e}_${t}${i?"":"_raw"}`}function Re(t){const{height:e}=t.config;return q`
    <svg width='100%' height='100%' viewBox='0 0 500 ${e}' preserveAspectRatio='none'
      @click=${t=>t.stopPropagation()}>
      <g>
        <defs>
          ${function(t,e){if(!e)return;const i=e.map((e,i)=>{if(e)return q`
      <linearGradient id=${`grad-${t.id}-${i}`} gradientTransform="rotate(90)">
        ${e.map(t=>q`
          <stop stop-color=${t.color} offset=${`${t.offset}%`} />
        `)}
      </linearGradient>`});return q`${i}`}(t,t.gradient)}
        </defs>
        ${t.fill.map((e,i)=>function(t,e,i){if(!e)return;const n=t.length[i]||!1===t.config.entities[i].show_line;return q`
    <defs>
      <linearGradient id=${`fill-grad-${t.id}-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop stop-color='white' offset='0%' stop-opacity='1'/>
        <stop stop-color='white' offset='100%' stop-opacity='.15'/>
      </linearGradient>
      <mask id=${`fill-grad-mask-${t.id}-${i}`}>
        <rect width="100%" height="100%" fill=${`url(#fill-grad-${t.id}-${i})`} />
      </mask>
    </defs>
    <mask id=${`fill-${t.id}-${i}`}>
      <path class='fill'
        type=${t.config.show.fill}
        .id=${i} anim=${t.config.animate} ?init=${n}
        style="animation-delay: ${t.config.animate?.5*i+"s":"0s"}"
        fill='white'
        mask=""
        d=${t.fill[i]}
      />
    </mask>`}(t,e,i))}
        ${t.fill.map((e,i)=>function(t,e,i){if(!e)return;const n=t.gradient[i]?`url(#grad-${t.id}-${i})`:t.computeColor(t.entity[i].state,i);return q`
    <rect class='fill--rect'
      ?inactive=${void 0!==t.tooltip.entity&&t.tooltip.entity!==i}
      id=${`fill-rect-${t.id}-${i}`}
      fill=${n} height="100%" width="100%"
      mask=${`url(#fill-${t.id}-${i})`}
    />`}(t,e,i))}
        ${t.line.map((e,i)=>function(t,e,i){if(!e)return;const n=q`
    <path
      class='line'
      .id=${i}
      anim=${t.config.animate} ?init=${t.length[i]}
      style="animation-delay: ${t.config.animate?.5*i+"s":"0s"}"
      fill='none'
      stroke-dasharray=${t.length[i]||"none"} stroke-dashoffset=${t.length[i]||"none"}
      stroke=${"white"}
      stroke-width=${t.config.line_width}
      d=${t.line[i]}
    />`;return q`
    <mask id=${`line-${t.id}-${i}`}>
      ${n}
    </mask>
  `}(t,e,i))}
        ${t.line.map((e,i)=>function(t,e,i){if(!e)return;const n=t.gradient[i]?`url(#grad-${t.id}-${i})`:t.computeColor(t.entity[i].state,i);return q`
    <rect class='line--rect'
      ?inactive=${void 0!==t.tooltip.entity&&t.tooltip.entity!==i}
      id=${`rect-${t.id}-${i}`}
      fill=${n} height="100%" width="100%"
      mask=${`url(#line-${t.id}-${i})`}
    />`}(t,e,i))}
        ${t.bar.map((e,i)=>function(t,e,i){if(!e)return;const n=e.map((e,n)=>{const r=t.config.animate?q`
        <animate attributeName='y' from=${t.config.height} to=${e.y} dur='1s' fill='remove'
          calcMode='spline' keyTimes='0; 1' keySplines='0.215 0.61 0.355 1'>
        </animate>`:"",o=t.computeColor(e.value,i);return q`
      <rect class='bar' x=${e.x} y=${e.y}
        height=${e.height} width=${e.width} fill=${o}
        @mouseover=${()=>t.setTooltip(i,n,e.value)}
        @mouseout=${()=>{t.tooltip={}}}>
        ${r}
      </rect>`});return q`<g class='bars' ?anim=${t.config.animate}>${n}</g>`}(t,e,i))}
      </g>
      ${t.points.map((e,i)=>function(t,e,i){if(!e)return;const n=t.computeColor(t.entity[i].state,i);return q`
    <g class='line--points'
      ?tooltip=${t.tooltip.entity===i}
      ?inactive=${void 0!==t.tooltip.entity&&t.tooltip.entity!==i}
      ?init=${t.length[i]}
      anim=${t.config.animate&&"hover"!==t.config.show.points}
      style="animation-delay: ${t.config.animate?.5*i+.5+"s":"0s"}"
      fill=${n}
      stroke=${n}
      stroke-width=${t.config.line_width/2}>
      ${e.map(e=>function(t,e,i){const n=t.gradient[i]?t.computeColor(e[2],i):"inherit";return q`
    <circle
      class='line--point'
      ?inactive=${t.tooltip.index!==e[3]}
      style=${`--mcg-hover: ${n};`}
      stroke=${n}
      fill=${n}
      cx=${e[0]} cy=${e[1]} r=${t.config.line_width}
      @mouseover=${()=>t.setTooltip(i,e[3],e[2])}
      @mouseout=${()=>{t.tooltip={}}}
      data-entity-index=${i}
      data-point-value=${e[2]}
    />
  `}(t,e,i))}
    </g>`}(t,e,i))}
    </svg>`}const De="0.23.0";_t.config({name:"mini-graph-card",version:1,storeName:"entity_history_cache",description:"Mini graph card uses caching for the entity history"}),_t.iterate((t,e)=>{const i=e.endsWith("-raw")?t:_e(t),n=new Date;n.setHours(n.getHours()-i.hours_to_show),(t.version!==De||new Date(i.last_fetched)<n)&&_t.removeItem(e)}).catch(t=>{console.warn("Purging has errored: ",t)}),console.info(`%c MINI-GRAPH-CARD %c ${De} `,"color: white; background: coral; font-weight: 700;","color: coral; background: white; font-weight: 700;");var je=o`
      :host {
        display: block;
        font-family: var(--paper-font-body1_-_font-family);
      }

      /* Native HA controls — make them fill the form layout and breathe. */
      ha-textfield,
      ha-select {
        width: 100%;
        display: block;
      }
      ha-formfield {
        display: flex;
        align-items: center;
        min-height: 40px;
        --mdc-typography-body2-font-size: 0.95em;
      }
      .form-group ha-formfield {
        padding: 4px 0;
      }
      .threshold-row ha-textfield {
        flex: 1;
      }

      .loading, .error {
        text-align: center;
        padding: 40px 20px;
        color: var(--primary-text-color);
      }

      .error {
        color: var(--error-color);
      }

      .error pre {
        text-align: left;
        background: var(--secondary-background-color);
        padding: 10px;
        border-radius: 4px;
        overflow: auto;
        font-size: 12px;
      }

      .card-config {
        padding: 20px;
        max-width: 800px;
        margin: 0 auto;
      }

      .header {
        text-align: center;
        margin-bottom: 30px;
        padding-bottom: 20px;
        border-bottom: 1px solid var(--divider-color);
      }

      .header h2 {
        color: var(--primary-text-color);
        margin: 0 0 10px 0;
        font-size: 1.5em;
      }

      .header p {
        color: var(--secondary-text-color);
        margin: 0;
      }

      .debug-info {
        margin-top: 10px;
        opacity: 0.7;
      }

      .section {
        margin-bottom: 20px;
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        background: var(--card-background-color);
        overflow: hidden;
      }

      .section-header {
        display: flex;
        align-items: center;
        padding: 16px 20px;
        cursor: pointer;
        background: var(--primary-color);
        color: var(--text-primary-color);
        transition: background-color 0.2s ease;
      }

      .section-header:hover {
        opacity: 0.9;
      }

      .section-header.expanded {
        border-bottom: 1px solid var(--divider-color);
      }

      .section-info {
        flex: 1;
      }

      .section-title {
        font-weight: 500;
        font-size: 1.1em;
        margin-bottom: 2px;
      }

      .section-description {
        font-size: 0.9em;
        opacity: 0.8;
      }

      .section-toggle {
        font-size: 1.2em;
        font-weight: bold;
      }

      .section-content {
        padding: 20px;
      }

      .form-group {
        margin-bottom: 16px;
        min-width: 0; /* Prevents overflow in grid */
      }

      .form-group label {
        display: block;
        margin-bottom: 6px;
        font-weight: 500;
        color: var(--primary-text-color);
        font-size: 0.9em;
      }

      .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-bottom: 16px;
      }

      input[type="text"],
      input[type="number"],
      input[type="color"],
      select {
        width: 100%;
        padding: 10px 14px;
        border: 1px solid var(--divider-color);
        border-radius: 6px;
        background: var(--card-background-color);
        color: var(--primary-text-color);
        font-size: 14px;
        box-sizing: border-box;
        transition: border-color 0.2s ease;
      }

      input[type="text"]:focus,
      input[type="number"]:focus,
      select:focus {
        outline: none;
        border-color: var(--accent-color);
        box-shadow: 0 0 0 2px rgba(var(--accent-color-rgb, 3, 169, 244), 0.1);
      }

      input[type="color"] {
        padding: 4px;
        height: 40px;
        cursor: pointer;
      }

      button {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s ease;
      }

      .btn-add {
        background: var(--primary-color);
        color: var(--text-primary-color);
      }

      .btn-remove {
        background: var(--error-color);
        color: white;
      }

      .btn-add:hover,
      .btn-remove:hover {
        opacity: 0.9;
        transform: translateY(-1px);
      }

      .checkbox-label {
        display: flex !important;
        align-items: center;
        gap: 8px;
        cursor: pointer;
      }

      .checkbox-label input[type="checkbox"] {
        width: auto;
      }

      .show-options,
      .thresholds-section,
      .tap-action-section {
        margin-top: 24px;
        padding-top: 20px;
        border-top: 1px solid var(--divider-color);
      }

      .show-options h4,
      .thresholds-section h4,
      .tap-action-section h4 {
        margin: 0 0 16px 0;
        color: var(--primary-text-color);
        font-size: 1em;
      }

      .checkbox-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 12px;
      }

      .checkbox-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px;
        background: var(--secondary-background-color);
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s ease;
      }

      .checkbox-item:hover {
        background: var(--divider-color);
      }

      .checkbox-item input[type="checkbox"] {
        margin: 0;
        width: auto;
      }

      .entity-row,
      .threshold-row {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 12px;
        padding: 14px;
        background: var(--secondary-background-color);
        border-radius: 6px;
        border: 1px solid var(--divider-color);
      }

      .entity-row > *:first-child,
      .threshold-row > *:first-child {
        flex: 1;
      }

      .thresholds-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }

      .entities-info {
        color: var(--secondary-text-color);
        font-size: 0.9em;
        margin-bottom: 20px;
        padding: 16px;
        background: var(--secondary-background-color);
        border-radius: 4px;
        border-left: 4px solid var(--primary-color);
      }

      .entity-config {
        margin-bottom: 16px;
        border: 1px solid var(--divider-color);
        border-radius: 6px;
        overflow: hidden;
      }

      .entity-config-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        background: var(--secondary-background-color);
        border-bottom: 1px solid var(--divider-color);
      }

      .entity-config-header button {
        flex-shrink: 0;
        min-width: 80px;
      }

      .entity-info {
        display: flex;
        align-items: center;
        flex: 1;
        min-width: 0;
        margin-right: 16px;
      }

      .entity-icon {
        color: var(--state-icon-color, var(--state-icon-unavailable-color, #bdbdbd));
        width: 24px;
        height: 24px;
        margin-right: 12px;
        flex-shrink: 0;
      }

      .entity-details {
        flex: 1;
        min-width: 0;
        overflow: hidden;
      }

      .entity-friendly-name {
        font-weight: 500;
        color: var(--primary-text-color);
        font-size: 0.95em;
        word-wrap: break-word;
        line-height: 1.3;
      }

      .entity-id {
        color: var(--secondary-text-color);
        font-size: 0.8em;
        word-wrap: break-word;
        margin-top: 2px;
        line-height: 1.2;
      }

      .entities-section {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .entity-management-row {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 16px;
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        background: var(--card-background-color);
      }

      .entity-top-section {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        align-items: center;
      }

      .entity-picker-section {
        min-width: 0;
      }

      .entity-info-section {
        min-width: 0;
      }

      .entity-display {
        display: flex;
        align-items: center;
        min-width: 0;
      }

      .entity-display .entity-icon {
        margin-right: 12px;
        flex-shrink: 0;
      }

      .entity-display .entity-details {
        flex: 1;
        min-width: 0;
      }

      .entity-actions {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
        flex-wrap: wrap;
      }

      .btn-configure {
        background: var(--primary-color);
        color: var(--text-primary-color);
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        min-width: 80px;
      }

      .btn-configure:hover {
        opacity: 0.9;
      }

      .btn-remove {
        background: var(--error-color);
        color: white;
        border: none;
        padding: 8px 12px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .btn-remove:hover {
        opacity: 0.9;
        transform: translateY(-1px);
      }

      .entity-config-expanded {
        margin-top: 12px;
        padding: 16px;
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        background: var(--secondary-background-color);
      }


      .entity-config-content {
        padding: 16px;
      }

      .entity-switches {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 8px;
        margin-top: 16px;
      }

      ha-entity-picker,
      ha-icon-picker {
        width: 100%;
      }

      @media (max-width: 768px) {
        .form-row {
          gap: 16px;
        }
      }

      @media (max-width: 600px) {
        .card-config {
          padding: 16px;
        }

        .form-row {
          grid-template-columns: 1fr;
          gap: 12px;
        }

        .checkbox-grid {
          grid-template-columns: 1fr;
        }

        .entity-switches {
          grid-template-columns: 1fr;
        }

        .entity-row,
        .threshold-row {
          flex-direction: column;
          align-items: stretch;
        }

        .entity-row > *,
        .threshold-row > * {
          flex: none;
        }
      }
    `;const ze={sensor:"mdi:gauge",binary_sensor:"mdi:radiobox-blank",switch:"mdi:toggle-switch",light:"mdi:lightbulb",climate:"mdi:thermostat",cover:"mdi:window-shutter",fan:"mdi:fan",lock:"mdi:lock",camera:"mdi:camera",media_player:"mdi:cast",device_tracker:"mdi:account",sun:"mdi:white-balance-sunny",weather:"mdi:weather-partly-cloudy"};function Ue(t){const e=t.split(".")[0];return ze[e]||"mdi:help-circle"}let Le=null;const Be=t=>$e(t,Le);class He extends lt{static get properties(){return{hass:{attribute:!1},_config:{state:!0},_expandedSections:{state:!0},_expandedEntities:{state:!0}}}constructor(){super(),this._expandedSections={required:!0,display:!1,graph:!1,data:!1,bounds:!1,colors:!1,advanced:!1,entities:!1},this._expandedEntities=[]}setConfig(t){this._config={...t},this._config.entities&&(this._config.entities=this._config.entities.map(t=>"string"==typeof t?{entity:t}:{...t})),this.requestUpdate()}get _line_color(){return Array.isArray(this._config&&this._config.line_color)?this._config.line_color.join(", "):this._config&&this._config.line_color||""}get _animate(){return!this._config||!1!==this._config.animate}get _smoothing(){return!this._config||!1!==this._config.smoothing}get _cache(){return!this._config||!1!==this._config.cache}get _compress(){return!this._config||!1!==this._config.compress}get _lower_bound(){return this._config&&void 0!==this._config.lower_bound?this._config.lower_bound:""}get _upper_bound(){return this._config&&void 0!==this._config.upper_bound?this._config.upper_bound:""}get _decimals(){return this._config&&void 0!==this._config.decimals?this._config.decimals:""}_field(t,e,i,n="text"){return F`
      <div class="form-group">
        <label>${t}:</label>
        <ha-textfield
          type=${n}
          .value=${null==e?"":String(e)}
          @change=${t=>this._valueChanged(t,i)}
        ></ha-textfield>
      </div>
    `}_select(t,e,i,n){return F`
      <div class="form-group">
        <label>${t}:</label>
        <ha-select
          .value=${e}
          .naturalMenuWidth=${!0}
          .fixedMenuPosition=${!0}
          @selected=${t=>this._valueChanged(t,i)}
          @closed=${t=>t.stopPropagation()}
        >
          ${n.map(t=>F`<ha-list-item value=${t.value}>${t.label}</ha-list-item>`)}
        </ha-select>
      </div>
    `}_toggle(t,e,i){return F`
      <ha-formfield label=${t}>
        <ha-switch .checked=${e} @change=${t=>this._valueChanged(t,i)}></ha-switch>
      </ha-formfield>
    `}render(){if(Le=this.hass,!this.hass)return F`
        <div class="loading">
          <h3>${Be("editor.messages.loading_home_assistant")}</h3>
          <p>${Be("editor.messages.please_wait_while_the_editor_loads")}</p>
        </div>
      `;try{return F`
        <div class="card-config">
          <div class="header">
            <h2>${Be("editor.headers.mini_graph_card_configuration")}</h2>
            <p>${Be("editor.headers.complete_configuration_for_all_options")}</p>
          </div>

          ${this.renderSection("entities",`🏠 ${Be("editor.sections.entities")}`,Be("editor.sections.add_configure_and_manage_all_your_entities"),this.renderEntitiesSection())}
          ${this.renderSection("display",`🎨 ${Be("editor.sections.display_options")}`,Be("editor.sections.name_icon_and_visual_appearance_settings"),this.renderDisplaySection())}
          ${this.renderSection("graph",`📊 ${Be("editor.sections.graph_settings")}`,Be("editor.sections.graph_type_colors_and_visual_properties"),this.renderGraphSection())}
          ${this.renderSection("data",`⏱️ ${Be("editor.sections.data_time")}`,Be("editor.sections.data_aggregation_and_time_configuration"),this.renderDataSection())}
          ${this.renderSection("bounds",`📏 ${Be("editor.sections.scale_bounds")}`,Be("editor.sections.y_axis_bounds_and_scaling_options"),this.renderBoundsSection())}
          ${this.renderSection("colors",`🎨 ${Be("editor.sections.colors_thresholds")}`,Be("editor.sections.color_configuration_and_dynamic_thresholds"),this.renderColorsSection())}
          ${this.renderSection("advanced",`⚙️ ${Be("editor.sections.advanced_options")}`,Be("editor.sections.advanced_options_and_performance_settings"),this.renderAdvancedSection())}
        </div>
      `}catch(t){return F`
        <div class="error">
          <h3>${Be("editor.messages.editor_error")}</h3>
          <p>${Be("editor.messages.an_error_occurred_while_rendering_the_editor")}: ${t.message}</p>
          <pre>${t.stack}</pre>
        </div>
      `}}renderEntitiesSection(){return F`
      ${0===this._entities.length?F`
        <div class="form-group">
          <label>${Be("editor.labels.primary_entity_will_be_converted_to_entities_list")}:</label>
          ${this.renderEntityPicker(this._entity,t=>this._primaryEntityChanged(t))}
        </div>
      `:""}

      <div class="entities-section">
        ${this._entities.map((t,e)=>F`
          <div class="entity-management-row">
            <div class="entity-top-section">
              <div class="entity-picker-section">
                ${this.renderEntityPicker("string"==typeof t?t:t.entity,t=>this._entityListChanged(t,e))}
              </div>
              <div class="entity-info-section">
                ${(()=>{const e="string"==typeof t?t:t.entity,i=this.getEntityInfo(e);return F`
                    <div class="entity-display">
                      <ha-icon .icon="${i.icon}" class="entity-icon"></ha-icon>
                      <div class="entity-details">
                        <div class="entity-friendly-name">${i.friendlyName}</div>
                        <div class="entity-id">${i.entityId}</div>
                      </div>
                    </div>
                  `})()}
              </div>
            </div>
            <div class="entity-actions">
              <button class="btn-configure" @click="${()=>this._toggleEntityConfig(e)}">
                ${this._isEntityConfigExpanded(e)?Be("editor.buttons.hide"):Be("editor.buttons.configure")}
              </button>
              <button class="btn-remove" @click="${()=>this._removeEntity(e)}" title="${Be("editor.buttons.remove_entity")}">×</button>
            </div>
          </div>
          ${this._isEntityConfigExpanded(e)?F`
            <div class="entity-config-expanded">
              ${this.renderEntityConfig(t,e)}
            </div>
          `:""}
        `)}
        <button class="btn-add" @click="${this._addEntity}">${Be("editor.buttons.add_entity")}</button>
      </div>
    `}renderDisplaySection(){return F`
      <div class="form-row">
        ${this._field(Be("editor.labels.card_name"),this._name,"name")}
        <div class="form-group">
          <label>${Be("editor.labels.icon")}:</label>
          ${this.renderIconPicker(this._icon,t=>this._valueChanged(t,"icon"))}
        </div>
      </div>

      <div class="form-row">
        ${this._field(Be("editor.labels.icon_image_url"),this._icon_image,"icon_image")}
        ${this._field(Be("editor.labels.unit"),this._unit,"unit")}
      </div>

      <div class="form-row">
        ${this._field(Be("editor.labels.font_size"),this._font_size,"font_size","number")}
        ${this._field(Be("editor.labels.header_font_size_px"),this._font_size_header,"font_size_header","number")}
      </div>

      <div class="form-row">
        ${this._select(Be("editor.labels.header_alignment"),this._align_header,"align_header",[{value:"default",label:Be("editor.options.default")},{value:"left",label:Be("editor.options.left")},{value:"right",label:Be("editor.options.right")},{value:"center",label:Be("editor.options.center")}])}
        ${this._select(Be("editor.labels.icon_alignment"),this._align_icon,"align_icon",[{value:"left",label:Be("editor.options.left")},{value:"right",label:Be("editor.options.right")},{value:"center",label:Be("editor.options.center")},{value:"state",label:Be("editor.options.with_state")}])}
      </div>

      <div class="form-row">
        ${this._select(Be("editor.labels.state_alignment"),this._align_state,"align_state",[{value:"left",label:Be("editor.options.left")},{value:"right",label:Be("editor.options.right")},{value:"center",label:Be("editor.options.center")}])}
        ${this._field(Be("editor.labels.decimal_places"),this._decimals,"decimals","number")}
      </div>

      <div class="show-options">
        <h4>${Be("editor.visibility.visibility_options")}</h4>
        <div class="checkbox-grid">
          ${[{key:"name",label:Be("editor.visibility.name")},{key:"icon",label:Be("editor.labels.icon")},{key:"state",label:Be("editor.visibility.state")},{key:"graph",label:Be("editor.visibility.graph")},{key:"fill",label:Be("editor.visibility.fill")},{key:"points",label:Be("editor.visibility.points")},{key:"legend",label:Be("editor.visibility.legend")},{key:"extrema",label:Be("editor.visibility.extrema")},{key:"average",label:Be("editor.visibility.average")},{key:"labels",label:Be("editor.visibility.labels")},{key:"labels_secondary",label:Be("editor.visibility.secondary_labels")}].map(t=>F`
            <div class="checkbox-item">
              <ha-formfield label=${t.label}>
                <ha-switch
                  .checked=${!1!==this._show[t.key]}
                  @change=${e=>this._showChanged(e,t.key)}
                ></ha-switch>
              </ha-formfield>
            </div>
          `)}
        </div>
      </div>
    `}renderGraphSection(){return F`
      <div class="form-row">
        ${this._field(Be("editor.labels.height_px"),this._height,"height","number")}
        ${this._field(Be("editor.labels.line_width"),this._line_width,"line_width","number")}
      </div>

      <div class="form-row">
        ${this._field(Be("editor.labels.line_colors_comma_separated"),this._line_color,"line_color")}
        ${this._field(Be("editor.labels.bar_spacing"),this._bar_spacing,"bar_spacing","number")}
      </div>

      <div class="form-row">
        <div class="form-group">${this._toggle(Be("editor.labels.enable_animation"),this._animate,"animate")}</div>
        <div class="form-group">${this._toggle(Be("editor.labels.smooth_lines"),this._smoothing,"smoothing")}</div>
      </div>

      <div class="form-row">
        <div class="form-group">${this._toggle(Be("editor.labels.logarithmic_scale"),this._logarithmic,"logarithmic")}</div>
      </div>
    `}renderDataSection(){return F`
      <div class="form-row">
        ${this._field(Be("editor.labels.hours_to_show"),this._hours_to_show,"hours_to_show","number")}
        ${this._field(Be("editor.labels.points_per_hour"),this._points_per_hour,"points_per_hour","number")}
      </div>

      <div class="form-row">
        ${this._select(Be("editor.labels.aggregate_function"),this._aggregate_func,"aggregate_func",[{value:"avg",label:Be("editor.options.average")},{value:"median",label:Be("editor.options.median")},{value:"min",label:Be("editor.options.minimum")},{value:"max",label:Be("editor.options.maximum")},{value:"first",label:Be("editor.options.first")},{value:"last",label:Be("editor.options.last")},{value:"sum",label:Be("editor.options.sum")},{value:"delta",label:Be("editor.options.delta")},{value:"diff",label:Be("editor.options.difference")}])}
        ${this._select(Be("editor.labels.group_by"),this._group_by,"group_by",[{value:"interval",label:Be("editor.options.interval")},{value:"date",label:Be("editor.options.date")},{value:"hour",label:Be("editor.options.hour")}])}
      </div>

      <div class="form-row">
        ${this._field(Be("editor.labels.update_interval_seconds"),this._update_interval,"update_interval","number")}
        <div class="form-group">${this._toggle(Be("editor.labels.time_format_24h"),this._hour24,"hour24")}</div>
      </div>
    `}renderBoundsSection(){return F`
      <h4>${Be("editor.labels.primary_y_axis")}</h4>
      <div class="form-row">
        ${this._field(Be("editor.labels.lower_bound_use_n_for_soft"),this._lower_bound,"lower_bound")}
        ${this._field(Be("editor.labels.upper_bound_use_n_for_soft"),this._upper_bound,"upper_bound")}
      </div>
      ${this._field(Be("editor.labels.minimum_range"),this._min_bound_range,"min_bound_range","number")}
    `}renderColorsSection(){return F`
      ${this._select(Be("editor.labels.threshold_transition"),this._color_thresholds_transition,"color_thresholds_transition",[{value:"smooth",label:Be("editor.options.smooth")},{value:"hard",label:Be("editor.options.hard")}])}

      <div class="thresholds-section">
        <div class="thresholds-header">
          <h4>${Be("editor.labels.color_thresholds")}</h4>
          <button class="btn-add" @click="${this._addThreshold}">${Be("editor.buttons.add_threshold")}</button>
        </div>

        ${this._color_thresholds.map((t,e)=>F`
          <div class="threshold-row">
            <ha-textfield
              type="number"
              .value=${void 0===t.value?"":String(t.value)}
              @change=${t=>this._thresholdChanged(t,e,"value")}
              placeholder="${Be("editor.placeholders.value")}"
            ></ha-textfield>
            <input
              type="color"
              .value="${t.color}"
              @input="${t=>this._thresholdChanged(t,e,"color")}"
            />
            <button class="btn-remove" @click="${()=>this._removeThreshold(e)}">${Be("editor.buttons.remove")}</button>
          </div>
        `)}
      </div>
    `}renderAdvancedSection(){return F`
      <div class="form-row">
        <div class="form-group">${this._toggle(Be("editor.labels.cache_data"),this._cache,"cache")}</div>
        <div class="form-group">${this._toggle(Be("editor.labels.compress_data"),this._compress,"compress")}</div>
      </div>

      <div class="form-group">${this._toggle(Be("editor.labels.group_entities"),this._group,"group")}</div>

      ${this._select(Be("editor.labels.appearance"),this._appearance,"appearance",[{value:"premium",label:Be("editor.options.premium")},{value:"minimal",label:Be("editor.options.minimal")}])}

      <div class="tap-action-section">
        <h4>${Be("editor.tap_action.tap_action")}</h4>
        <div class="form-row">
          <div class="form-group">
            <label>${Be("editor.tap_action.action_type")}:</label>
            <ha-select
              .value=${this._tap_action.action}
              .naturalMenuWidth=${!0}
              .fixedMenuPosition=${!0}
              @selected=${t=>this._tapActionChanged(t,"action")}
              @closed=${t=>t.stopPropagation()}
            >
              <ha-list-item value="more-info">${Be("editor.tap_action.more_info")}</ha-list-item>
              <ha-list-item value="navigate">${Be("editor.tap_action.navigate")}</ha-list-item>
              <ha-list-item value="call-service">${Be("editor.tap_action.call_service")}</ha-list-item>
              <ha-list-item value="url">${Be("editor.tap_action.open_url")}</ha-list-item>
              <ha-list-item value="none">${Be("editor.tap_action.no_action")}</ha-list-item>
            </ha-select>
          </div>

          ${"navigate"===this._tap_action.action?F`
            <div class="form-group">
              <label>${Be("editor.tap_action.navigation_path")}:</label>
              <ha-textfield
                .value=${this._tap_action.navigation_path||""}
                @change=${t=>this._tapActionChanged(t,"navigation_path")}
                placeholder="/lovelace/dashboard"
              ></ha-textfield>
            </div>
          `:""}

          ${"url"===this._tap_action.action?F`
            <div class="form-group">
              <label>${Be("editor.tap_action.url")}:</label>
              <ha-textfield
                .value=${this._tap_action.url||""}
                @change=${t=>this._tapActionChanged(t,"url")}
                placeholder="https://example.com"
              ></ha-textfield>
            </div>
          `:""}

          ${"call-service"===this._tap_action.action?F`
            <div class="form-group">
              <label>${Be("editor.tap_action.service")}:</label>
              <ha-textfield
                .value=${this._tap_action.service||""}
                @change=${t=>this._tapActionChanged(t,"service")}
                placeholder="light.toggle"
              ></ha-textfield>
            </div>
          `:""}
        </div>
      </div>
    `}renderSection(t,e,i,n){const r=this._expandedSections[t];return F`
      <div class="section">
        <div class="section-header ${r?"expanded":""}" @click="${()=>this._toggleSection(t)}">
          <div class="section-info">
            <div class="section-title">${e}</div>
            <div class="section-description">${i}</div>
          </div>
          <div class="section-toggle">${r?"▼":"▶"}</div>
        </div>
        ${r?F`<div class="section-content">${n}</div>`:""}
      </div>
    `}renderEntityPicker(t,e){try{if(this.hass&&customElements.get("ha-entity-picker"))return F`
          <ha-entity-picker
            .hass="${this.hass}"
            .value="${t}"
            @value-changed="${e}"
            allow-custom-entity
          ></ha-entity-picker>
        `}catch{}return F`
      <ha-textfield
        .value="${t}"
        @change="${e}"
        placeholder="sensor.temperature"
      ></ha-textfield>
    `}renderIconPicker(t,e){try{if(this.hass&&customElements.get("ha-icon-picker"))return F`
          <ha-icon-picker
            .hass="${this.hass}"
            .value="${t}"
            @value-changed="${e}"
          ></ha-icon-picker>
        `}catch{}return F`
      <ha-textfield
        .value="${t}"
        @change="${e}"
        placeholder="mdi:thermometer"
      ></ha-textfield>
    `}renderEntityConfig(t,e){const i="string"==typeof t?{}:t;return F`
      <div class="entity-config-content">
        <div class="form-row">
          <div class="form-group">
            <label>${Be("editor.entity.custom_name")}:</label>
            <ha-textfield
              .value="${i.name||""}"
              @change="${t=>this._entityConfigChanged(t,e,"name")}"
            ></ha-textfield>
          </div>

          <div class="form-group">
            <label>${Be("editor.entity.custom_color")}:</label>
            <input
              type="color"
              .value="${i.color||"#ff0000"}"
              @input="${t=>this._entityConfigChanged(t,e,"color")}"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>${Be("editor.entity.attribute_instead_of_state")}:</label>
            <ha-textfield
              .value="${i.attribute||""}"
              @change="${t=>this._entityConfigChanged(t,e,"attribute")}"
              placeholder="temperature"
            ></ha-textfield>
          </div>

          <div class="form-group">
            <label>${Be("editor.entity.y_axis")}:</label>
            <ha-select
              .value="${i.y_axis||"primary"}"
              .naturalMenuWidth=${!0}
              .fixedMenuPosition=${!0}
              @selected="${t=>this._entityConfigChanged(t,e,"y_axis")}"
              @closed="${t=>t.stopPropagation()}"
            >
              <ha-list-item value="primary">${Be("editor.options.primary")}</ha-list-item>
              <ha-list-item value="secondary">${Be("editor.options.secondary")}</ha-list-item>
            </ha-select>
          </div>
        </div>

        <div class="entity-switches">
          ${[{key:"show_state",label:"editor.entity.show_state"},{key:"show_graph",label:"editor.entity.show_in_graph"},{key:"show_line",label:"editor.entity.show_line"},{key:"show_fill",label:"editor.entity.show_fill"},{key:"show_points",label:"editor.entity.show_points"},{key:"show_legend",label:"editor.entity.show_in_legend"},{key:"smoothing",label:"editor.entity.smoothing"},{key:"fixed_value",label:"editor.entity.fixed_value"}].map(t=>F`
            <div class="checkbox-item">
              <ha-formfield label=${Be(t.label)}>
                <ha-switch
                  .checked=${!1!==i[t.key]}
                  @change=${i=>this._entityConfigChanged(i,e,t.key)}
                ></ha-switch>
              </ha-formfield>
            </div>
          `)}
        </div>
      </div>
    `}getEntityInfo(t){return function(t,e){const i=e.split(".")[0]||"unknown";if(!t||!t.states)return{entityId:e,friendlyName:e,icon:"mdi:help-circle",domain:i};const n=t.states[e];return n?{entityId:e,friendlyName:n.attributes.friendly_name||e,icon:n.attributes.icon||Ue(e),domain:i,state:n.state}:{entityId:e,friendlyName:e,icon:"mdi:help-circle-outline",domain:i}}(this.hass,t)}_readValue(t){const e=t.target;if(!e)return;if("ha-switch"===e.localName||"checkbox"===e.type)return e.checked;const i=t.detail;return i&&void 0!==i.value?i.value:"number"===e.type?""===e.value?void 0:Number(e.value):e.value}_toggleSection(t){this._expandedSections={...this._expandedSections,[t]:!this._expandedSections[t]},this.requestUpdate()}_primaryEntityChanged(t){const e=this._readValue(t);e&&!this._entities.length&&(this._config={...this._config,entities:[e]},delete this._config.entity,Ae(this,"config-changed",{config:this._config}))}_addEntity(){const t=[...this._entities,""];this._config={...this._config,entities:t},Ae(this,"config-changed",{config:this._config})}_removeEntity(t){const e=[...this._entities];e.splice(t,1),this._config={...this._config,entities:e},Ae(this,"config-changed",{config:this._config})}_entityListChanged(t,e){const i=this._readValue(t);if(!i)return;const n=[...this._entities];n[e]=i,this._config={...this._config,entities:n},Ae(this,"config-changed",{config:this._config})}_valueChanged(t,e){if(!this._config||!this.hass)return;let i=this._readValue(t);"line_color"===e&&"string"==typeof i&&i.includes(",")&&(i=i.split(",").map(t=>t.trim())),JSON.stringify(this._config[e])!==JSON.stringify(i)&&(this._config={...this._config,[e]:i},Ae(this,"config-changed",{config:this._config}))}_showChanged(t,e){if(!this._config||!this.hass)return;const i=t.target.checked;this._config={...this._config,show:{...this._show,[e]:i}},Ae(this,"config-changed",{config:this._config})}_addThreshold(){const t=[...this._color_thresholds,{value:0,color:"#ff0000"}];this._config={...this._config,color_thresholds:t},Ae(this,"config-changed",{config:this._config})}_removeThreshold(t){const e=[...this._color_thresholds];e.splice(t,1),this._config={...this._config,color_thresholds:e},Ae(this,"config-changed",{config:this._config})}_thresholdChanged(t,e,i){const n=[...this._color_thresholds];let r=t.target.value;"value"===i&&(r=Number(r)),n[e]={...n[e],[i]:r},this._config={...this._config,color_thresholds:n},Ae(this,"config-changed",{config:this._config})}_tapActionChanged(t,e){const i=t.target.value,n={...this._tap_action,[e]:i};this._config={...this._config,tap_action:n},Ae(this,"config-changed",{config:this._config})}_toggleEntityConfig(t){this._expandedEntities=this._expandedEntities||[];const e=this._expandedEntities.includes(t);this._expandedEntities=e?this._expandedEntities.filter(e=>e!==t):[...this._expandedEntities,t],this.requestUpdate()}_isEntityConfigExpanded(t){return this._expandedEntities&&this._expandedEntities.includes(t)}_entityConfigChanged(t,e,i){const n=[...this._entities],r="string"==typeof n[e]?{entity:n[e]}:{...n[e]};r[i]=this._readValue(t),n[e]=r,this._config={...this._config,entities:n},Ae(this,"config-changed",{config:this._config})}static get styles(){return je}}Object.entries({entity:"",entities:[],name:"",icon:"",icon_image:"",unit:"",height:100,line_width:5,bar_spacing:4,hours_to_show:24,points_per_hour:.5,aggregate_func:"avg",group_by:"interval",update_interval:"",hour24:!1,min_bound_range:"",logarithmic:!1,color_thresholds:[],color_thresholds_transition:"smooth",font_size:100,font_size_header:14,align_header:"default",align_icon:"right",align_state:"left",group:!1,appearance:"premium",show:{},tap_action:{action:"more-info"}}).forEach(([t,e])=>{Object.defineProperty(He.prototype,`_${t}`,{get(){return this._config&&this._config[t]||e}})}),customElements.define("mini-graph-card-editor",He),customElements.define("mini-graph-card",class extends lt{constructor(){super(),this.id=Math.random().toString(36).substring(2,11),this.config={},this.bound=[0,0],this.boundSecondary=[0,0],this.length=[],this.entity=[],this.line=[],this.bar=[],this.abs=[],this.fill=[],this.points=[],this.gradient=[],this.tooltip={},this.updateQueue=[],this.updating=!1,this.stateChanged=!1,this.initial=!0,this._md5Config=void 0}static get styles(){return he}set hass(t){this._hass=t;let e=!1;const i=[];this.config.entities.forEach((n,r)=>{this.config.entities[r].index=r;const o=t&&t.states[n.entity];o&&this.entity[r]!==o&&(this.entity[r]=o,i.push(`${o.entity_id}-${r}`),e=!0)}),e&&(this.stateChanged=!0,this.entity=[...this.entity],this.config.update_interval||this.updating?this.updateQueue=[...i,...this.updateQueue]:setTimeout(()=>{this.updateQueue=[...i,...this.updateQueue],this.updateData()},this.initial?0:1e3))}get hass(){return this._hass}static get properties(){return{id:{state:!0},_hass:{state:!0},config:{state:!0},entity:{state:!0},Graph:{state:!0},line:{state:!0},length:{state:!0},bound:{state:!0},boundSecondary:{state:!0},abs:{state:!0},tooltip:{state:!0},updateQueue:{state:!0},color:{state:!0}}}setConfig(t){if(!t)throw new Error($e("card.error.invalid_config",this._hass));if(!Array.isArray(t.entities)||0===t.entities.length)throw new Error($e("card.error.no_entities",this._hass));this.config=(t=>{if(!Array.isArray(t.entities))throw new Error(`Please provide the "entities" option as a list.\n See ${re}`);if(t.line_color_above||t.line_color_below)throw new Error(`"line_color_above/line_color_below" was removed, please use "color_thresholds".\n See ${re}`);const e={animate:!1,hour24:!1,font_size:14,font_size_header:14,height:100,hours_to_show:24,points_per_hour:.5,aggregate_func:"avg",group_by:"interval",line_color:[...oe],color_thresholds:[],color_thresholds_transition:"smooth",line_width:5,bar_spacing:4,compress:!0,smoothing:!0,state_map:[],cache:!0,value_factor:0,tap_action:{action:"more-info"},...JSON.parse(JSON.stringify(t)),show:{...se,...t.show}};e.entities.forEach((t,i)=>{"string"==typeof t&&(e.entities[i]={entity:t})}),e.state_map.forEach((t,i)=>{"string"==typeof t&&(e.state_map[i]={value:t,label:t}),e.state_map[i].label=e.state_map[i].label||e.state_map[i].value}),"string"==typeof t.line_color&&(e.line_color=[t.line_color,...oe]),e.font_size=t.font_size/100*14||14,e.color_thresholds=((t,e)=>{const i=(t=>{if(!t||!t.length)return t;const e=t=>"string"==typeof t?void 0:t.value;if(null==e(t[0])||null==e(t[t.length-1]))throw new Error(`The first and last thresholds must have a set "value".\n See ${re}`);let i=0,n=null;return t.map((r,o)=>{if(null!=e(r))return i=o,{...r};null==n?n=ye(t,o):o>n&&(i=n,n=ye(t,o));const a=e(t[i]),s=(e(t[n])-a)/(n-i);return{color:"string"==typeof r?r:r.color,value:s*o+a}})})(t);if(i.sort((t,e)=>e.value-t.value),"smooth"===e)return i;{const t=[].concat(...i.map((t,e)=>[t,{value:t.value-1e-4,color:i[e+1]?i[e+1].color:t.color}]));return t}})(e.color_thresholds,e.color_thresholds_transition);const i=e.hours_to_show>24?{day:"numeric",weekday:"short"}:{},n=e.hour24?{hourCycle:"h23"}:{hour12:!0};switch(e.format={...n,...i},e.group_by){case"date":e.points_per_hour=1/24;break;case"hour":e.points_per_hour=1}if("bar"===e.show.graph){const t=e.entities.length;e.hours_to_show*e.points_per_hour*t>96&&(e.points_per_hour=96/(e.hours_to_show*t),ve(`Not enough space, adjusting points_per_hour to ${e.points_per_hour}`))}return e})(t),this._md5Config=bt.hash(JSON.stringify(this.config));const e=!((t,e)=>t.length===e.length&&t.every((t,i)=>t===e[i]))(this.config.entities||[],t.entities);this.Graph&&!e||(this._hass&&(this.hass=this._hass),this.Graph=this.config.entities.map(t=>new ce(500,this.config.height,[this.config.show.fill?0:this.config.line_width,this.config.line_width],this.config.hours_to_show,this.config.points_per_hour,t.aggregate_func||this.config.aggregate_func,this.config.group_by,((...t)=>t.find(t=>void 0!==t))(t.smoothing,this.config.smoothing,!t.entity.startsWith("binary_sensor.")),this.config.logarithmic)))}connectedCallback(){super.connectedCallback(),this.config.update_interval&&(window.requestAnimationFrame(()=>{this.updateOnInterval()}),this.interval=setInterval(()=>this.updateOnInterval(),1e3*this.config.update_interval))}disconnectedCallback(){this.interval&&clearInterval(this.interval),super.disconnectedCallback()}shouldUpdate(t){if(ae.some(e=>t.has(e))){const t=void 0!==this.tooltip.value?this.tooltip.value:void 0!==this.entity[0]?this.getEntityState(0):void 0;return this.color=this.computeColor(t??0,this.tooltip.entity||0),!0}return!1}firstUpdated(){this.initial=!1}updated(t){this.config.animate&&t.has("line")&&(this.length.length<this.entity.length?(this.shadowRoot.querySelectorAll("svg path.line").forEach(t=>{this.length[Number(t.id)]=t.getTotalLength()}),this.length=[...this.length]):this.length=Array(this.entity.length).fill("none"))}render(){const{config:t}=this;if(!t||!this.entity||!this._hass)return W;if(this.dataset.appearance=t.appearance??"premium",this.config.entities.some((t,e)=>void 0===this.entity[e]))return this.renderWarnings();const e="none"!==t.tap_action.action,i=t.tap_action.entity||this.entity[0];return F`
      <ha-card
        class="flex"
        ?group=${t.group}
        ?fill=${t.show.graph&&t.show.fill}
        ?points=${"hover"===t.show.points}
        ?labels=${"hover"===t.show.labels}
        ?labels-secondary=${"hover"===t.show.labels_secondary}
        ?gradient=${t.color_thresholds.length>0}
        ?hover=${e}
        role=${e?"button":W}
        tabindex=${e?"0":W}
        aria-label=${t.name||this.computeName(0)}
        style="font-size: ${t.font_size}px;"
        @click=${t=>this.handlePopup(t,i)}
        @keydown=${t=>this._handleKeydown(t,i)}
      >
        ${this.renderHeader()} ${this.renderStates()} ${this.renderGraph()} ${this.renderInfo()}
      </ha-card>
    `}renderWarnings(){return F`
      <hui-warning>
        <div>mini-graph-card</div>
        ${this.config.entities.map((t,e)=>this.entity[e]?F``:F`
          <div>
            ${$e("card.error.entity_not_available",this._hass)} ${this.config.entities[e].entity}
          </div>
        `)}
      </hui-warning>
    `}renderHeader(){const{show:t,align_icon:e,align_header:i,font_size_header:n}=this.config;return t.name||t.icon&&"state"!==e?F`
          <div class="header flex" loc=${i} style="font-size: ${n}px;">
            ${this.renderName()} ${"state"!==e?this.renderIcon():""}
          </div>
        `:""}renderIcon(){if(void 0!==this.config.icon_image)return F`
        <div class="icon">
          <img src="${this.config.icon_image}" height="25"/>
        </div>
      `;const{icon:t,icon_adaptive_color:e}=this.config.show;return t?F`
      <div class="icon" loc=${this.config.align_icon}
        style=${e?`color: ${this.color};`:""}>
        <ha-icon .icon=${this.computeIcon(this.entity[0])}></ha-icon>
      </div>
    `:""}renderName(){if(!this.config.show.name)return;const t=void 0!==this.tooltip.entity?this.computeName(this.tooltip.entity):this.config.name||this.computeName(0),e=this.config.show.name_adaptive_color?`opacity: 1; color: ${this.color};`:"";return F`
      <div class="name flex">
        <span class="ellipsis" style=${e}>${t}</span>
      </div>
    `}renderStates(){if(this.config.show.state)return F`
        <div class="states flex" loc=${this.config.align_state}>
          ${this.renderState(0)}
          <div class="states--secondary">${this.config.entities.map((t,e)=>e>0&&this.renderState(e)||"")}</div>
          ${"state"===this.config.align_icon?this.renderIcon():""}
        </div>
      `}getObjectAttr(t,e){return e.split(".").reduce((t,e)=>t&&t[e],t)}getEntityState(t){const e=this.config.entities[t];return"last"===this.config.show.state?this.points[t][this.points[t].length-1][2]:e.attribute?this.getObjectAttr(this.entity[t].attributes,e.attribute):this.entity[t].state}renderState(t){const e=0===t;if(e||this.config.entities[t].show_state){const i=this.getEntityState(t),{entity:n,value:r}=this.tooltip,o=e&&void 0!==n,a=o?r:i,s=o?n:t,l=this.config.entities[s];return F`
        <div
          class="state ${e?"":"state--small"}"
          @click=${e=>this.handlePopup(e,this.entity[t])}
          style=${l.state_adaptive_color?`color: ${this.computeColor(a,s)}`:""}>
          ${l.show_indicator?this.renderIndicator(a,s):""}
          <span class="state__value ellipsis">
            ${this.computeState(a)}
          </span>
          <span class="state__uom ellipsis">
            ${this.computeUom(s)}
          </span>
          ${e&&this.renderStateTime()||""}
        </div>
      `}}renderStateTime(){if(void 0!==this.tooltip.value)return F`
      <div class="state__time">
        ${this.tooltip.label?F`
          <span class="tooltip--label">${this.tooltip.label}</span>
        `:F`
          <span>${this.tooltip.time[0]}</span> -
          <span>${this.tooltip.time[1]}</span>
        `}
      </div>
    `}renderGraph(){const t=this.entity[0]&&!this.Graph.some((t,e)=>void 0===t._history&&!1!==this.config.entities[e].show_graph)||!1===this.config.show.loading_indicator;return this.config.show.graph?F`
      <div class="graph">
        ${t?F`
            <div class="graph__container">
              ${this.renderLabels()}
              ${this.renderLabelsSecondary()}
              <div class="graph__container__svg" aria-hidden="true">
                ${Re(this)}
              </div>
            </div>
            ${this.renderLegend()}
        `:F`<ha-spinner aria-label="${$e("card.a11y.loading",this._hass)}" size="small"></ha-spinner>`}
      </div>`:""}computeLegend(t){let e=this.computeName(t);const i=this.getEntityState(t),{show_legend_state:n=!1}=this.config.entities[t];if(n){if(e+=` (${this.computeState(i)}`,!["unavailable"].includes(String(i))){const i=this.computeUom(t);["%",""].includes(i)||(e+=" "),e+=`${i}`}e+=")"}return e}renderLegend(){if(this.visibleLegends.length<=1||!this.config.show.legend)return;const t="none"!==this.config.tap_action.action;return F`
      <div class="graph__legend" role="list">
        ${this.visibleLegends.map(e=>{const i=this.computeLegend(e.index);return F`
            <div class="graph__legend__item"
              role=${t?"button":"listitem"}
              tabindex=${t?"0":W}
              aria-label=${i}
              @click=${t=>this.handlePopup(t,this.entity[e.index])}
              @keydown=${t=>this._handleKeydown(t,this.entity[e.index])}
              @mouseenter=${()=>this.setTooltip(e.index,-1,this.getEntityState(e.index),$e("card.labels.current",this._hass))}
              @mouseleave=${()=>{this.tooltip={}}}>
              ${this.renderIndicator(this.getEntityState(e.index),e.index)}
              <span class="ellipsis">${i}</span>
            </div>
          `})}
      </div>
    `}renderIndicator(t,e){return q`
      <svg width='10' height='10'>
        <rect width='10' height='10' fill=${this.computeColor(t,e)} />
      </svg>
    `}setTooltip(t,e,i,n=null){const{group_by:r,points_per_hour:o,hours_to_show:a,format:s}=this.config,l=me(1/o),c=Math.ceil(a*o)-1-e,h="interval"!==r?6e4:0,d=this.getEndDate();d.setMilliseconds(d.getMilliseconds()-h-l*c);const u=fe(d,s,this._hass.language);d.setMilliseconds(d.getMilliseconds()+h-l);const p=fe(d,s,this._hass.language);this.tooltip={value:i,count:c,entity:t,time:[p,u],index:e,label:n}}renderLabels(){if(this.config.show.labels&&0!==this.primaryYaxisSeries.length)return F`
      <div class="graph__labels --primary flex">
        <span class="label--max">${this.computeState(this.bound[1])}</span>
        <span class="label--min">${this.computeState(this.bound[0])}</span>
      </div>
    `}renderLabelsSecondary(){if(this.config.show.labels_secondary&&0!==this.secondaryYaxisSeries.length)return F`
      <div class="graph__labels --secondary flex">
        <span class="label--max">${this.computeState(this.boundSecondary[1])}</span>
        <span class="label--min">${this.computeState(this.boundSecondary[0])}</span>
      </div>
    `}renderInfo(){return this.abs.length>0?F`
      <div class="info flex">
        ${this.abs.map(t=>F`
          <div class="info__item">
            <span class="info__item__type">${$e(`card.display_type.${t.type}`,this._hass)}</span>
            <span class="info__item__value">
              ${this.computeState(t.state)} ${this.computeUom(0)}
            </span>
            <span class="info__item__time">
              ${"avg"!==t.type?fe(new Date(t.last_changed),this.config.format,this._hass.language):""}
            </span>
          </div>
        `)}
      </div>
    `:F``}handlePopup(t,e){t.stopPropagation();const i="string"==typeof e?e:e.entity_id;((t,e,i,n,r)=>{switch(n.action){case"more-info":t.dispatchEvent(new CustomEvent("hass-more-info",{composed:!0,detail:{entityId:r}}));break;case"navigate":if(!n.navigation_path)return;window.history.pushState(null,"",n.navigation_path),window.dispatchEvent(new CustomEvent("location-changed",{composed:!0,detail:{replace:!1}}));break;case"call-service":{if(!n.service)return;const[t,i]=n.service.split(".",2),r={...n.service_data};e.callService(t,i,r);break}case"url":if(!n.url)return;window.location.href=n.url;break;case"fire-dom-event":t.dispatchEvent(new CustomEvent("ll-custom",{composed:!0,bubbles:!0,detail:n}))}})(this,this._hass,this.config,this.config.tap_action,i)}_handleKeydown(t,e){"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this.handlePopup(t,e))}get visibleEntities(){return this.config.entities.filter(t=>!1!==t.show_graph)}get primaryYaxisEntities(){return this.visibleEntities.filter(t=>void 0===t.y_axis||"primary"===t.y_axis)}get secondaryYaxisEntities(){return this.visibleEntities.filter(t=>"secondary"===t.y_axis)}get visibleLegends(){return this.visibleEntities.filter(t=>!1!==t.show_legend)}get primaryYaxisSeries(){return this.primaryYaxisEntities.map(t=>this.Graph[t.index])}get secondaryYaxisSeries(){return this.secondaryYaxisEntities.map(t=>this.Graph[t.index])}computeColor(t,e){return function(t,e,i){const{color_thresholds:n,line_color:r}=t,o=Number(e)||0;let a;if(n.length>0){const{color:t}=n.find(t=>t.value<o)||n.slice(-1)[0];a=t;const e=n.findIndex(t=>t.value<o),i=n[e],r=n[e-1];if(r){const t=(r.value-o)/(r.value-i.value);a=ne(r.color,i.color)(t)}else a=e?n[n.length-1].color:n[0].color}return t.entities[i].color||a||r[i]||r[0]}(this.config,t,e)}computeName(t){return function(t,e,i){return t.entities[i].name||e.attributes.friendly_name||e.entity_id}(this.config,this.entity[t],t)}computeIcon(t){return e=this.config,i=t,e.icon||i.attributes.icon||function(t){if(!t)return"mdi:bookmark";if(t.attributes.icon)return t.attributes.icon;var e=function(t){return t.substr(0,t.indexOf("."))}(t.entity_id);return e in Ie?Ie[e](t):Ce(e,t.state)}(i)||"hass:thermometer";var e,i}computeUom(t){return function(t,e,i){return void 0!==t.entities[i].unit?t.entities[i].unit:void 0!==t.unit?t.unit:t.entities[i].attribute?"":e.attributes.unit_of_measurement||""}(this.config,this.entity[t],t)}computeState(t){return function(t,e,i){if(t.state_map.length>0){const i=Number.isInteger(e)?t.state_map[e]:t.state_map.find(t=>t.value===e);if(i)return i.label;"string"==typeof e&&Number.isNaN(parseFloat(e))&&ve(`value [${e}] not found in state_map`)}let n;n="string"==typeof e?parseFloat(e.replace(/,/g,".")):Number(e);const r=t.decimals,o=10**t.value_factor;if(void 0===r||Number.isNaN(r)||Number.isNaN(n))return Me(Math.round(n*o*100)/100,i);const a=10**r;return Me((Math.round(n*o*a)/a).toFixed(r),i,r)}(this.config,t,this._hass.language)}updateOnInterval(){this.stateChanged&&!this.updating&&(this.stateChanged=!1,this.updateData())}async updateData(){const{config:t}=this;this.updating=!0;const e=this.getEndDate(),i=new Date(e);i.setMilliseconds(i.getMilliseconds()-me(t.hours_to_show));try{const t=this.entity.map((t,n)=>this.updateEntity(t,n,i,e));await Promise.all(t)}catch(t){ve(t)}if(t.show.graph&&this.entity.forEach((t,e)=>{t&&this.Graph[e].update()}),this.updateBounds(),t.show.graph){let e=0;this.entity.forEach((i,n)=>{if(!i||0===this.Graph[n].coords.length)return;const r="secondary"===t.entities[n].y_axis?this.boundSecondary:this.bound;if([this.Graph[n].min,this.Graph[n].max]=[r[0],r[1]],"bar"===t.show.graph){const i=this.visibleEntities.length;this.bar[n]=this.Graph[n].getBars(e,i,t.bar_spacing),e+=1}else{const e=this.Graph[n].getPath();!1!==t.entities[n].show_line&&(this.line[n]=e),t.show.fill&&!1!==t.entities[n].show_fill&&(this.fill[n]=this.Graph[n].getFill(e)),t.show.points&&!1!==t.entities[n].show_points&&(this.points[n]=this.Graph[n].getPoints()),t.color_thresholds.length>0&&!t.entities[n].color&&(this.gradient[n]=this.Graph[n].computeGradient(t.color_thresholds,this.config.logarithmic))}}),this.line=[...this.line]}this.updating=!1,this.setNextUpdate()}updateBounds(){const{config:t}=this;this.bound=Oe(this.primaryYaxisSeries,t.lower_bound,t.upper_bound,this.bound,t.min_bound_range),this.boundSecondary=Oe(this.secondaryYaxisSeries,t.lower_bound_secondary,t.upper_bound_secondary,this.boundSecondary,t.min_bound_range_secondary)}async updateEntity(t,e,i,n){if(!t||!this.updateQueue.includes(`${t.entity_id}-${e}`)||!1===this.config.entities[e].show_graph)return;this.updateQueue=this.updateQueue.filter(i=>i!==`${t.entity_id}-${e}`);let r=[],o=i,a=!1,s=null;if(this.config.cache&&(s=await async function(t,e,i,n=_t){const r=await n.getItem(Te(t,e,i));return r?i?_e(r):r:null}(this._md5Config,`${t.entity_id}_${e}`,this.config.compress),s&&s.hours_to_show===this.config.hours_to_show&&(r=s.data)),r.length>0){let t=r.findIndex(t=>new Date(t.last_changed)>i);-1!==t?(t>0&&(t-=1,r[t].last_changed=i),r=r.slice(t,r.length),a=!0):r=[];const e=new Date(s.last_fetched);e>o&&(o=new Date(e.getTime()-1))}let l=await async function(t,e,i,n,r,o){let a="history/period";return i&&(a+=`/${i.toISOString()}`),a+=`?filter_entity_id=${e}`,n&&(a+=`&end_time=${n.toISOString()}`),r&&(a+="&skip_initial_state"),o||(a+="&minimal_response&no_attributes"),o&&(a+="&significant_changes_only=0"),t.callApi("GET",a)}(this._hass,t.entity_id,o,n,!this.config.entities[e].attribute&&a,!!this.config.entities[e].attribute);if(l[0]&&l[0].length>0&&(this.config.entities[e].attribute&&a&&l[0].shift(),(this.config.state_map.length>0||this.config.entities[e].attribute)&&l[0].forEach(t=>{this.config.entities[e].attribute&&(t.state=this.getObjectAttr(t.attributes,this.config.entities[e].attribute),delete t.attributes),this.config.state_map.length>0&&this._convertState(t)}),l=l[0].filter(t=>!Number.isNaN(parseFloat(t.state))),l=l.map(t=>({last_changed:this.config.entities[e].attribute?t.last_updated:t.last_changed,state:t.state})),r=[...r,...l],this.config.cache&&async function(t,e,i,n,r=_t){return n?r.setItem(Te(t,e,!0),ge(i)):r.setItem(Te(t,e,!1),i)}(this._md5Config,`${t.entity_id}_${e}`,{hours_to_show:this.config.hours_to_show,last_fetched:new Date,data:r,version:De},this.config.compress).catch(t=>{ve(t),_t.clear()})),0!==r.length)if(this.entity[0]&&t.entity_id===this.entity[0].entity_id&&this.updateExtrema(r),!0===this.config.entities[e].fixed_value){const t=r[r.length-1];this.Graph[e].history=[t,t]}else this.Graph[e].history=r}updateExtrema(t){const{extrema:e,average:i}=this.config.show;var n,r;this.abs=[...e?[{type:"min",...(n=t,r="state",n.reduce((t,e)=>Number(e[r])<Number(t[r])?e:t,n[0]))}]:[],...i?[{type:"avg",state:ue(t,"state")}]:[],...e?[{type:"max",...pe(t,"state")}]:[]]}_convertState(t){const e=this.config.state_map.findIndex(e=>e.value===t.state);-1!==e&&(t.state=e)}getEndDate(){const t=new Date;switch(this.config.group_by){case"date":t.setDate(t.getDate()+1),t.setHours(0,0,0);break;case"hour":t.setHours(t.getHours()+1),t.setMinutes(0,0)}return t}setNextUpdate(){if(!this.config.update_interval){const t=1/this.config.points_per_hour;clearInterval(this.interval),this.interval=setInterval(()=>{this.updating||this.updateData()},t*le)}}getGridOptions(){return{columns:12,rows:Math.max(2,this.calculateCardSize()),min_columns:6,min_rows:1}}getCardSize(){try{const t=this.shadowRoot&&this.shadowRoot.querySelector("ha-card");if(t&&t.getBoundingClientRect){const e=Math.ceil(t.getBoundingClientRect().height/50);if(Number.isFinite(e)&&e>0)return e}}catch{}return this.config.card_size||this.calculateCardSize()}calculateCardSize(){let t=1;return(this.config.show.name||this.config.show.icon)&&(t+=1),this.config.show.state&&(t+=1),this.config.show.graph&&(t+=Math.ceil(this.config.height/50)),this.config.show.legend&&this.visibleLegends.length>1&&(t+=1),this.abs&&this.abs.length>0&&(t+=1),t}static getConfigElement(){return document.createElement("mini-graph-card-editor")}static getStubConfig(t){return{entities:[(t?Object.keys(t.states).find(e=>qe(t,e)):void 0)||"sensor.example"]}}});const Fe=["counter","input_number","number"],qe=(t,e)=>{const i=e.split(".")[0];if(Fe.includes(i))return!0;if("sensor"!==i)return!1;const n=t.states[e];return!(!n||!n.attributes.unit_of_measurement&&!n.attributes.state_class)};window.customCards=window.customCards||[],window.customCards.push({type:"mini-graph-card",name:$e("card.picker.name"),preview:!0,description:$e("card.picker.description"),documentationURL:"https://github.com/foXaCe/mini-graph-card",getEntitySuggestion:(t,e)=>qe(t,e)?{config:{type:"custom:mini-graph-card",entities:[{entity:e}]}}:null});
