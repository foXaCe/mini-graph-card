const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new WeakMap;let r=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=n.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&n.set(i,e))}return e}toString(){return this.cssText}};const o=(e,...t)=>{const n=1===e.length?e[0]:t.reduce((t,i,n)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[n+1],e[0]);return new r(n,e,i)},a=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:s,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,p=globalThis,f=p.trustedTypes,m=f?f.emptyScript:"",g=p.reactiveElementPolyfillSupport,_=(e,t)=>e,v={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},y=(e,t)=>!s(e,t),b={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=b){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(e,i,t);void 0!==n&&l(this.prototype,e,n)}}static getPropertyDescriptor(e,t,i){const{get:n,set:r}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:n,set(t){const o=n?.call(this);r?.call(this,t),this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??b}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const e=this.properties,t=[...d(e),...h(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,n)=>{if(t)i.adoptedStyleSheets=n.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of n){const n=document.createElement("style"),r=e.litNonce;void 0!==r&&n.setAttribute("nonce",r),n.textContent=t.cssText,i.appendChild(n)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,i);if(void 0!==n&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(t,i.type);this._$Em=e,null==r?this.removeAttribute(n):this.setAttribute(n,r),this._$Em=null}}_$AK(e,t){const i=this.constructor,n=i._$Eh.get(e);if(void 0!==n&&this._$Em!==n){const e=i.getPropertyOptions(n),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:v;this._$Em=n;const o=r.fromAttribute(t,e.type);this[n]=o??this._$Ej?.get(n)??o,this._$Em=null}}requestUpdate(e,t,i,n=!1,r){if(void 0!==e){const o=this.constructor;if(!1===n&&(r=this[e]),i??=o.getPropertyOptions(e),!((i.hasChanged??y)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:n,wrapped:r},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),!0!==r||void 0!==o)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===n&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,n=this[t];!0!==e||this._$AL.has(t)||void 0===n||this.C(t,void 0,i,n)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[_("elementProperties")]=new Map,w[_("finalized")]=new Map,g?.({ReactiveElement:w}),(p.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,$=e=>e,S=x.trustedTypes,k=S?S.createPolicy("lit-html",{createHTML:e=>e}):void 0,A="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+E,N=`<${C}>`,I=document,M=()=>I.createComment(""),T=e=>null===e||"object"!=typeof e&&"function"!=typeof e,P=Array.isArray,O="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,j=/>/g,R=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,U=/"/g,B=/^(?:script|style|textarea|title)$/i,F=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),H=F(1),G=F(2),q=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),Y=new WeakMap,V=I.createTreeWalker(I,129);function Q(e,t){if(!P(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(t):t}const J=(e,t)=>{const i=e.length-1,n=[];let r,o=2===t?"<svg>":3===t?"<math>":"",a=z;for(let t=0;t<i;t++){const i=e[t];let s,l,c=-1,d=0;for(;d<i.length&&(a.lastIndex=d,l=a.exec(i),null!==l);)d=a.lastIndex,a===z?"!--"===l[1]?a=D:void 0!==l[1]?a=j:void 0!==l[2]?(B.test(l[2])&&(r=RegExp("</"+l[2],"g")),a=R):void 0!==l[3]&&(a=R):a===R?">"===l[0]?(a=r??z,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,s=l[1],a=void 0===l[3]?R:'"'===l[3]?U:L):a===U||a===L?a=R:a===D||a===j?a=z:(a=R,r=void 0);const h=a===R&&e[t+1].startsWith("/>")?" ":"";o+=a===z?i+N:c>=0?(n.push(s),i.slice(0,c)+A+i.slice(c)+E+h):i+E+(-2===c?t:h)}return[Q(e,o+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),n]};class K{constructor({strings:e,_$litType$:t},i){let n;this.parts=[];let r=0,o=0;const a=e.length-1,s=this.parts,[l,c]=J(e,t);if(this.el=K.createElement(l,i),V.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(n=V.nextNode())&&s.length<a;){if(1===n.nodeType){if(n.hasAttributes())for(const e of n.getAttributeNames())if(e.endsWith(A)){const t=c[o++],i=n.getAttribute(e).split(E),a=/([.?@])?(.*)/.exec(t);s.push({type:1,index:r,name:a[2],strings:i,ctor:"."===a[1]?ie:"?"===a[1]?ne:"@"===a[1]?re:te}),n.removeAttribute(e)}else e.startsWith(E)&&(s.push({type:6,index:r}),n.removeAttribute(e));if(B.test(n.tagName)){const e=n.textContent.split(E),t=e.length-1;if(t>0){n.textContent=S?S.emptyScript:"";for(let i=0;i<t;i++)n.append(e[i],M()),V.nextNode(),s.push({type:2,index:++r});n.append(e[t],M())}}}else if(8===n.nodeType)if(n.data===C)s.push({type:2,index:r});else{let e=-1;for(;-1!==(e=n.data.indexOf(E,e+1));)s.push({type:7,index:r}),e+=E.length-1}r++}}static createElement(e,t){const i=I.createElement("template");return i.innerHTML=e,i}}function X(e,t,i=e,n){if(t===q)return t;let r=void 0!==n?i._$Co?.[n]:i._$Cl;const o=T(t)?void 0:t._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(e),r._$AT(e,i,n)),void 0!==n?(i._$Co??=[])[n]=r:i._$Cl=r),void 0!==r&&(t=X(e,r._$AS(e,t.values),r,n)),t}class Z{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,n=(e?.creationScope??I).importNode(t,!0);V.currentNode=n;let r=V.nextNode(),o=0,a=0,s=i[0];for(;void 0!==s;){if(o===s.index){let t;2===s.type?t=new ee(r,r.nextSibling,this,e):1===s.type?t=new s.ctor(r,s.name,s.strings,this,e):6===s.type&&(t=new oe(r,this,e)),this._$AV.push(t),s=i[++a]}o!==s?.index&&(r=V.nextNode(),o++)}return V.currentNode=I,n}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class ee{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,n){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=X(this,e,t),T(e)?e===W||null==e||""===e?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==q&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>P(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&T(this._$AH)?this._$AA.nextSibling.data=e:this.T(I.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,n="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=K.createElement(Q(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(t);else{const e=new Z(n,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=Y.get(e.strings);return void 0===t&&Y.set(e.strings,t=new K(e)),t}k(e){P(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,n=0;for(const r of e)n===t.length?t.push(i=new ee(this.O(M()),this.O(M()),this,this.options)):i=t[n],i._$AI(r),n++;n<t.length&&(this._$AR(i&&i._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=$(e).nextSibling;$(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class te{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,n,r){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(e,t=this,i,n){const r=this.strings;let o=!1;if(void 0===r)e=X(this,e,t,0),o=!T(e)||e!==this._$AH&&e!==q,o&&(this._$AH=e);else{const n=e;let a,s;for(e=r[0],a=0;a<r.length-1;a++)s=X(this,n[i+a],t,a),s===q&&(s=this._$AH[a]),o||=!T(s)||s!==this._$AH[a],s===W?e=W:e!==W&&(e+=(s??"")+r[a+1]),this._$AH[a]=s}o&&!n&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ie extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}}class ne extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}}class re extends te{constructor(e,t,i,n,r){super(e,t,i,n,r),this.type=5}_$AI(e,t=this){if((e=X(this,e,t,0)??W)===q)return;const i=this._$AH,n=e===W&&i!==W||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==W&&(i===W||n);n&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class oe{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){X(this,e)}}const ae=x.litHtmlPolyfillSupport;ae?.(K,ee),(x.litHtmlVersions??=[]).push("3.3.3");const se=globalThis;class le extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const n=i?.renderBefore??t;let r=n._$litPart$;if(void 0===r){const e=i?.renderBefore??null;n._$litPart$=r=new ee(t.insertBefore(M(),e),e,void 0,i??{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}le._$litElement$=!0,le.finalized=!0,se.litElementHydrateSupport?.({LitElement:le});const ce=se.litElementPolyfillSupport;ce?.({LitElement:le}),(se.litElementVersions??=[]).push("4.2.2");var de="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function he(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function ue(e){throw new Error('Could not dynamically require "'+e+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var pe,fe,me={exports:{}},ge=(pe||(pe=1,me.exports=function e(t,i,n){function r(a,s){if(!i[a]){if(!t[a]){if(!s&&ue)return ue(a);if(o)return o(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var c=i[a]={exports:{}};t[a][0].call(c.exports,function(e){return r(t[a][1][e]||e)},c,c.exports,e,t,i,n)}return i[a].exports}for(var o=ue,a=0;a<n.length;a++)r(n[a]);return r}({1:[function(e,t,i){(function(e){var i,n,r=e.MutationObserver||e.WebKitMutationObserver;if(r){var o=0,a=new r(d),s=e.document.createTextNode("");a.observe(s,{characterData:!0}),i=function(){s.data=o=++o%2}}else if(e.setImmediate||void 0===e.MessageChannel)i="document"in e&&"onreadystatechange"in e.document.createElement("script")?function(){var t=e.document.createElement("script");t.onreadystatechange=function(){d(),t.onreadystatechange=null,t.parentNode.removeChild(t),t=null},e.document.documentElement.appendChild(t)}:function(){setTimeout(d,0)};else{var l=new e.MessageChannel;l.port1.onmessage=d,i=function(){l.port2.postMessage(0)}}var c=[];function d(){var e,t;n=!0;for(var i=c.length;i;){for(t=c,c=[],e=-1;++e<i;)t[e]();i=c.length}n=!1}t.exports=function(e){1!==c.push(e)||n||i()}}).call(this,void 0!==de?de:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],2:[function(e,t,i){var n=e(1);function r(){}var o={},a=["REJECTED"],s=["FULFILLED"],l=["PENDING"];function c(e){if("function"!=typeof e)throw new TypeError("resolver must be a function");this.state=l,this.queue=[],this.outcome=void 0,e!==r&&p(this,e)}function d(e,t,i){this.promise=e,"function"==typeof t&&(this.onFulfilled=t,this.callFulfilled=this.otherCallFulfilled),"function"==typeof i&&(this.onRejected=i,this.callRejected=this.otherCallRejected)}function h(e,t,i){n(function(){var n;try{n=t(i)}catch(t){return o.reject(e,t)}n===e?o.reject(e,new TypeError("Cannot resolve promise with itself")):o.resolve(e,n)})}function u(e){var t=e&&e.then;if(e&&("object"==typeof e||"function"==typeof e)&&"function"==typeof t)return function(){t.apply(e,arguments)}}function p(e,t){var i=!1;function n(t){i||(i=!0,o.reject(e,t))}function r(t){i||(i=!0,o.resolve(e,t))}var a=f(function(){t(r,n)});"error"===a.status&&n(a.value)}function f(e,t){var i={};try{i.value=e(t),i.status="success"}catch(e){i.status="error",i.value=e}return i}t.exports=c,c.prototype.catch=function(e){return this.then(null,e)},c.prototype.then=function(e,t){if("function"!=typeof e&&this.state===s||"function"!=typeof t&&this.state===a)return this;var i=new this.constructor(r);return this.state!==l?h(i,this.state===s?e:t,this.outcome):this.queue.push(new d(i,e,t)),i},d.prototype.callFulfilled=function(e){o.resolve(this.promise,e)},d.prototype.otherCallFulfilled=function(e){h(this.promise,this.onFulfilled,e)},d.prototype.callRejected=function(e){o.reject(this.promise,e)},d.prototype.otherCallRejected=function(e){h(this.promise,this.onRejected,e)},o.resolve=function(e,t){var i=f(u,t);if("error"===i.status)return o.reject(e,i.value);var n=i.value;if(n)p(e,n);else{e.state=s,e.outcome=t;for(var r=-1,a=e.queue.length;++r<a;)e.queue[r].callFulfilled(t)}return e},o.reject=function(e,t){e.state=a,e.outcome=t;for(var i=-1,n=e.queue.length;++i<n;)e.queue[i].callRejected(t);return e},c.resolve=function(e){return e instanceof this?e:o.resolve(new this(r),e)},c.reject=function(e){var t=new this(r);return o.reject(t,e)},c.all=function(e){var t=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var i=e.length,n=!1;if(!i)return this.resolve([]);for(var a=new Array(i),s=0,l=-1,c=new this(r);++l<i;)d(e[l],l);return c;function d(e,r){t.resolve(e).then(function(e){a[r]=e,++s!==i||n||(n=!0,o.resolve(c,a))},function(e){n||(n=!0,o.reject(c,e))})}},c.race=function(e){var t=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var i=e.length,n=!1;if(!i)return this.resolve([]);for(var a=-1,s=new this(r);++a<i;)l(e[a]);return s;function l(e){t.resolve(e).then(function(e){n||(n=!0,o.resolve(s,e))},function(e){n||(n=!0,o.reject(s,e))})}}},{1:1}],3:[function(e,t,i){(function(t){"function"!=typeof t.Promise&&(t.Promise=e(2))}).call(this,void 0!==de?de:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{2:2}],4:[function(e,t,i){var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};var r=function(){try{if("undefined"!=typeof indexedDB)return indexedDB;if("undefined"!=typeof webkitIndexedDB)return webkitIndexedDB;if("undefined"!=typeof mozIndexedDB)return mozIndexedDB;if("undefined"!=typeof OIndexedDB)return OIndexedDB;if("undefined"!=typeof msIndexedDB)return msIndexedDB}catch(e){return}}();function o(e,t){e=e||[],t=t||{};try{return new Blob(e,t)}catch(r){if("TypeError"!==r.name)throw r;for(var i=new("undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof MSBlobBuilder?MSBlobBuilder:"undefined"!=typeof MozBlobBuilder?MozBlobBuilder:WebKitBlobBuilder),n=0;n<e.length;n+=1)i.append(e[n]);return i.getBlob(t.type)}}"undefined"==typeof Promise&&e(3);var a=Promise;function s(e,t){t&&e.then(function(e){t(null,e)},function(e){t(e)})}function l(e,t,i){"function"==typeof t&&e.then(t),"function"==typeof i&&e.catch(i)}function c(e){return"string"!=typeof e&&(console.warn(e+" used as a key, but it is not a string."),e=String(e)),e}function d(){if(arguments.length&&"function"==typeof arguments[arguments.length-1])return arguments[arguments.length-1]}var h="local-forage-detect-blob-support",u=void 0,p={},f=Object.prototype.toString,m="readonly",g="readwrite";function _(e){for(var t=e.length,i=new ArrayBuffer(t),n=new Uint8Array(i),r=0;r<t;r++)n[r]=e.charCodeAt(r);return i}function v(e){return"boolean"==typeof u?a.resolve(u):function(e){return new a(function(t){var i=e.transaction(h,g),n=o([""]);i.objectStore(h).put(n,"key"),i.onabort=function(e){e.preventDefault(),e.stopPropagation(),t(!1)},i.oncomplete=function(){var e=navigator.userAgent.match(/Chrome\/(\d+)/),i=navigator.userAgent.match(/Edge\//);t(i||!e||parseInt(e[1],10)>=43)}}).catch(function(){return!1})}(e).then(function(e){return u=e})}function y(e){var t=p[e.name],i={};i.promise=new a(function(e,t){i.resolve=e,i.reject=t}),t.deferredOperations.push(i),t.dbReady?t.dbReady=t.dbReady.then(function(){return i.promise}):t.dbReady=i.promise}function b(e){var t=p[e.name].deferredOperations.pop();if(t)return t.resolve(),t.promise}function w(e,t){var i=p[e.name].deferredOperations.pop();if(i)return i.reject(t),i.promise}function x(e,t){return new a(function(i,n){if(p[e.name]=p[e.name]||{forages:[],db:null,dbReady:null,deferredOperations:[]},e.db){if(!t)return i(e.db);y(e),e.db.close()}var o=[e.name];t&&o.push(e.version);var a=r.open.apply(r,o);t&&(a.onupgradeneeded=function(t){var i=a.result;try{i.createObjectStore(e.storeName),t.oldVersion<=1&&i.createObjectStore(h)}catch(i){if("ConstraintError"!==i.name)throw i;console.warn('The database "'+e.name+'" has been upgraded from version '+t.oldVersion+" to version "+t.newVersion+', but the storage "'+e.storeName+'" already exists.')}}),a.onerror=function(e){e.preventDefault(),n(a.error)},a.onsuccess=function(){var t=a.result;t.onversionchange=function(e){e.target.close()},i(t),b(e)}})}function $(e){return x(e,!1)}function S(e){return x(e,!0)}function k(e,t){if(!e.db)return!0;var i=!e.db.objectStoreNames.contains(e.storeName),n=e.version<e.db.version,r=e.version>e.db.version;if(n&&(e.version!==t&&console.warn('The database "'+e.name+"\" can't be downgraded from version "+e.db.version+" to version "+e.version+"."),e.version=e.db.version),r||i){if(i){var o=e.db.version+1;o>e.version&&(e.version=o)}return!0}return!1}function A(e){return o([_(atob(e.data))],{type:e.type})}function E(e){return e&&e.__local_forage_encoded_blob}function C(e){var t=this,i=t._initReady().then(function(){var e=p[t._dbInfo.name];if(e&&e.dbReady)return e.dbReady});return l(i,e,e),i}function N(e,t,i,n){void 0===n&&(n=1);try{var r=e.db.transaction(e.storeName,t);i(null,r)}catch(r){if(n>0&&(!e.db||"InvalidStateError"===r.name||"NotFoundError"===r.name))return a.resolve().then(function(){if(!e.db||"NotFoundError"===r.name&&!e.db.objectStoreNames.contains(e.storeName)&&e.version<=e.db.version)return e.db&&(e.version=e.db.version+1),S(e)}).then(function(){return function(e){y(e);for(var t=p[e.name],i=t.forages,n=0;n<i.length;n++){var r=i[n];r._dbInfo.db&&(r._dbInfo.db.close(),r._dbInfo.db=null)}return e.db=null,$(e).then(function(t){return e.db=t,k(e)?S(e):t}).then(function(n){e.db=t.db=n;for(var r=0;r<i.length;r++)i[r]._dbInfo.db=n}).catch(function(t){throw w(e,t),t})}(e).then(function(){N(e,t,i,n-1)})}).catch(i);i(r)}}var I={_driver:"asyncStorage",_initStorage:function(e){var t=this,i={db:null};if(e)for(var n in e)i[n]=e[n];var r=p[i.name];r||(r={forages:[],db:null,dbReady:null,deferredOperations:[]},p[i.name]=r),r.forages.push(t),t._initReady||(t._initReady=t.ready,t.ready=C);var o=[];function s(){return a.resolve()}for(var l=0;l<r.forages.length;l++){var c=r.forages[l];c!==t&&o.push(c._initReady().catch(s))}var d=r.forages.slice(0);return a.all(o).then(function(){return i.db=r.db,$(i)}).then(function(e){return i.db=e,k(i,t._defaultConfig.version)?S(i):e}).then(function(e){i.db=r.db=e,t._dbInfo=i;for(var n=0;n<d.length;n++){var o=d[n];o!==t&&(o._dbInfo.db=i.db,o._dbInfo.version=i.version)}})},_support:function(){try{if(!r||!r.open)return!1;var e="undefined"!=typeof openDatabase&&/(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent)&&!/BlackBerry/.test(navigator.platform),t="function"==typeof fetch&&-1!==fetch.toString().indexOf("[native code");return(!e||t)&&"undefined"!=typeof indexedDB&&"undefined"!=typeof IDBKeyRange}catch(e){return!1}}(),iterate:function(e,t){var i=this,n=new a(function(t,n){i.ready().then(function(){N(i._dbInfo,m,function(r,o){if(r)return n(r);try{var a=o.objectStore(i._dbInfo.storeName).openCursor(),s=1;a.onsuccess=function(){var i=a.result;if(i){var n=i.value;E(n)&&(n=A(n));var r=e(n,i.key,s++);void 0!==r?t(r):i.continue()}else t()},a.onerror=function(){n(a.error)}}catch(e){n(e)}})}).catch(n)});return s(n,t),n},getItem:function(e,t){var i=this;e=c(e);var n=new a(function(t,n){i.ready().then(function(){N(i._dbInfo,m,function(r,o){if(r)return n(r);try{var a=o.objectStore(i._dbInfo.storeName).get(e);a.onsuccess=function(){var e=a.result;void 0===e&&(e=null),E(e)&&(e=A(e)),t(e)},a.onerror=function(){n(a.error)}}catch(e){n(e)}})}).catch(n)});return s(n,t),n},setItem:function(e,t,i){var n=this;e=c(e);var r=new a(function(i,r){var o;n.ready().then(function(){return o=n._dbInfo,"[object Blob]"===f.call(t)?v(o.db).then(function(e){return e?t:(i=t,new a(function(e,t){var n=new FileReader;n.onerror=t,n.onloadend=function(t){var n=btoa(t.target.result||"");e({__local_forage_encoded_blob:!0,data:n,type:i.type})},n.readAsBinaryString(i)}));var i}):t}).then(function(t){N(n._dbInfo,g,function(o,a){if(o)return r(o);try{var s=a.objectStore(n._dbInfo.storeName);null===t&&(t=void 0);var l=s.put(t,e);a.oncomplete=function(){void 0===t&&(t=null),i(t)},a.onabort=a.onerror=function(){var e=l.error?l.error:l.transaction.error;r(e)}}catch(e){r(e)}})}).catch(r)});return s(r,i),r},removeItem:function(e,t){var i=this;e=c(e);var n=new a(function(t,n){i.ready().then(function(){N(i._dbInfo,g,function(r,o){if(r)return n(r);try{var a=o.objectStore(i._dbInfo.storeName).delete(e);o.oncomplete=function(){t()},o.onerror=function(){n(a.error)},o.onabort=function(){var e=a.error?a.error:a.transaction.error;n(e)}}catch(e){n(e)}})}).catch(n)});return s(n,t),n},clear:function(e){var t=this,i=new a(function(e,i){t.ready().then(function(){N(t._dbInfo,g,function(n,r){if(n)return i(n);try{var o=r.objectStore(t._dbInfo.storeName).clear();r.oncomplete=function(){e()},r.onabort=r.onerror=function(){var e=o.error?o.error:o.transaction.error;i(e)}}catch(e){i(e)}})}).catch(i)});return s(i,e),i},length:function(e){var t=this,i=new a(function(e,i){t.ready().then(function(){N(t._dbInfo,m,function(n,r){if(n)return i(n);try{var o=r.objectStore(t._dbInfo.storeName).count();o.onsuccess=function(){e(o.result)},o.onerror=function(){i(o.error)}}catch(e){i(e)}})}).catch(i)});return s(i,e),i},key:function(e,t){var i=this,n=new a(function(t,n){e<0?t(null):i.ready().then(function(){N(i._dbInfo,m,function(r,o){if(r)return n(r);try{var a=o.objectStore(i._dbInfo.storeName),s=!1,l=a.openKeyCursor();l.onsuccess=function(){var i=l.result;i?0===e||s?t(i.key):(s=!0,i.advance(e)):t(null)},l.onerror=function(){n(l.error)}}catch(e){n(e)}})}).catch(n)});return s(n,t),n},keys:function(e){var t=this,i=new a(function(e,i){t.ready().then(function(){N(t._dbInfo,m,function(n,r){if(n)return i(n);try{var o=r.objectStore(t._dbInfo.storeName).openKeyCursor(),a=[];o.onsuccess=function(){var t=o.result;t?(a.push(t.key),t.continue()):e(a)},o.onerror=function(){i(o.error)}}catch(e){i(e)}})}).catch(i)});return s(i,e),i},dropInstance:function(e,t){t=d.apply(this,arguments);var i,n=this.config();if((e="function"!=typeof e&&e||{}).name||(e.name=e.name||n.name,e.storeName=e.storeName||n.storeName),e.name){var o=e.name===n.name&&this._dbInfo.db?a.resolve(this._dbInfo.db):$(e).then(function(t){var i=p[e.name],n=i.forages;i.db=t;for(var r=0;r<n.length;r++)n[r]._dbInfo.db=t;return t});i=e.storeName?o.then(function(t){if(t.objectStoreNames.contains(e.storeName)){var i=t.version+1;y(e);var n=p[e.name],o=n.forages;t.close();for(var s=0;s<o.length;s++){var l=o[s];l._dbInfo.db=null,l._dbInfo.version=i}var c=new a(function(t,n){var o=r.open(e.name,i);o.onerror=function(e){o.result.close(),n(e)},o.onupgradeneeded=function(){o.result.deleteObjectStore(e.storeName)},o.onsuccess=function(){var e=o.result;e.close(),t(e)}});return c.then(function(e){n.db=e;for(var t=0;t<o.length;t++){var i=o[t];i._dbInfo.db=e,b(i._dbInfo)}}).catch(function(t){throw(w(e,t)||a.resolve()).catch(function(){}),t})}}):o.then(function(t){y(e);var i=p[e.name],n=i.forages;t.close();for(var o=0;o<n.length;o++)n[o]._dbInfo.db=null;var s=new a(function(t,i){var n=r.deleteDatabase(e.name);n.onerror=function(){var e=n.result;e&&e.close(),i(n.error)},n.onblocked=function(){console.warn('dropInstance blocked for database "'+e.name+'" until all open connections are closed')},n.onsuccess=function(){var e=n.result;e&&e.close(),t(e)}});return s.then(function(e){i.db=e;for(var t=0;t<n.length;t++)b(n[t]._dbInfo)}).catch(function(t){throw(w(e,t)||a.resolve()).catch(function(){}),t})})}else i=a.reject("Invalid arguments");return s(i,t),i}};var M="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",T=/^~~local_forage_type~([^~]+)~/,P="__lfsc__:",O="arbf",z="blob",D="si08",j="ui08",R="uic8",L="si16",U="si32",B="ur16",F="ui32",H="fl32",G="fl64",q=Object.prototype.toString;function W(e){var t,i,n,r,o,a=.75*e.length,s=e.length,l=0;"="===e[e.length-1]&&(a--,"="===e[e.length-2]&&a--);var c=new ArrayBuffer(a),d=new Uint8Array(c);for(t=0;t<s;t+=4)i=M.indexOf(e[t]),n=M.indexOf(e[t+1]),r=M.indexOf(e[t+2]),o=M.indexOf(e[t+3]),d[l++]=i<<2|n>>4,d[l++]=(15&n)<<4|r>>2,d[l++]=(3&r)<<6|63&o;return c}function Y(e){var t,i=new Uint8Array(e),n="";for(t=0;t<i.length;t+=3)n+=M[i[t]>>2],n+=M[(3&i[t])<<4|i[t+1]>>4],n+=M[(15&i[t+1])<<2|i[t+2]>>6],n+=M[63&i[t+2]];return i.length%3==2?n=n.substring(0,n.length-1)+"=":i.length%3==1&&(n=n.substring(0,n.length-2)+"=="),n}var V={serialize:function(e,t){var i="";if(e&&(i=q.call(e)),e&&("[object ArrayBuffer]"===i||e.buffer&&"[object ArrayBuffer]"===q.call(e.buffer))){var n,r=P;e instanceof ArrayBuffer?(n=e,r+=O):(n=e.buffer,"[object Int8Array]"===i?r+=D:"[object Uint8Array]"===i?r+=j:"[object Uint8ClampedArray]"===i?r+=R:"[object Int16Array]"===i?r+=L:"[object Uint16Array]"===i?r+=B:"[object Int32Array]"===i?r+=U:"[object Uint32Array]"===i?r+=F:"[object Float32Array]"===i?r+=H:"[object Float64Array]"===i?r+=G:t(new Error("Failed to get type for BinaryArray"))),t(r+Y(n))}else if("[object Blob]"===i){var o=new FileReader;o.onload=function(){var i="~~local_forage_type~"+e.type+"~"+Y(this.result);t(P+z+i)},o.readAsArrayBuffer(e)}else try{t(JSON.stringify(e))}catch(i){console.error("Couldn't convert value into a JSON string: ",e),t(null,i)}},deserialize:function(e){if(e.substring(0,9)!==P)return JSON.parse(e);var t,i=e.substring(13),n=e.substring(9,13);if(n===z&&T.test(i)){var r=i.match(T);t=r[1],i=i.substring(r[0].length)}var a=W(i);switch(n){case O:return a;case z:return o([a],{type:t});case D:return new Int8Array(a);case j:return new Uint8Array(a);case R:return new Uint8ClampedArray(a);case L:return new Int16Array(a);case B:return new Uint16Array(a);case U:return new Int32Array(a);case F:return new Uint32Array(a);case H:return new Float32Array(a);case G:return new Float64Array(a);default:throw new Error("Unkown type: "+n)}},stringToBuffer:W,bufferToString:Y};function Q(e,t,i,n){e.executeSql("CREATE TABLE IF NOT EXISTS "+t.storeName+" (id INTEGER PRIMARY KEY, key unique, value)",[],i,n)}function J(e,t,i,n,r,o){e.executeSql(i,n,r,function(e,a){a.code===a.SYNTAX_ERR?e.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?",[t.storeName],function(e,s){s.rows.length?o(e,a):Q(e,t,function(){e.executeSql(i,n,r,o)},o)},o):o(e,a)},o)}function K(e,t,i,n){var r=this;e=c(e);var o=new a(function(o,a){r.ready().then(function(){void 0===t&&(t=null);var s=t,l=r._dbInfo;l.serializer.serialize(t,function(t,c){c?a(c):l.db.transaction(function(i){J(i,l,"INSERT OR REPLACE INTO "+l.storeName+" (key, value) VALUES (?, ?)",[e,t],function(){o(s)},function(e,t){a(t)})},function(t){if(t.code===t.QUOTA_ERR){if(n>0)return void o(K.apply(r,[e,s,i,n-1]));a(t)}})})}).catch(a)});return s(o,i),o}var X={_driver:"webSQLStorage",_initStorage:function(e){var t=this,i={db:null};if(e)for(var n in e)i[n]="string"!=typeof e[n]?e[n].toString():e[n];var r=new a(function(e,n){try{i.db=openDatabase(i.name,String(i.version),i.description,i.size)}catch(e){return n(e)}i.db.transaction(function(r){Q(r,i,function(){t._dbInfo=i,e()},function(e,t){n(t)})},n)});return i.serializer=V,r},_support:"function"==typeof openDatabase,iterate:function(e,t){var i=this,n=new a(function(t,n){i.ready().then(function(){var r=i._dbInfo;r.db.transaction(function(i){J(i,r,"SELECT * FROM "+r.storeName,[],function(i,n){for(var o=n.rows,a=o.length,s=0;s<a;s++){var l=o.item(s),c=l.value;if(c&&(c=r.serializer.deserialize(c)),void 0!==(c=e(c,l.key,s+1)))return void t(c)}t()},function(e,t){n(t)})})}).catch(n)});return s(n,t),n},getItem:function(e,t){var i=this;e=c(e);var n=new a(function(t,n){i.ready().then(function(){var r=i._dbInfo;r.db.transaction(function(i){J(i,r,"SELECT * FROM "+r.storeName+" WHERE key = ? LIMIT 1",[e],function(e,i){var n=i.rows.length?i.rows.item(0).value:null;n&&(n=r.serializer.deserialize(n)),t(n)},function(e,t){n(t)})})}).catch(n)});return s(n,t),n},setItem:function(e,t,i){return K.apply(this,[e,t,i,1])},removeItem:function(e,t){var i=this;e=c(e);var n=new a(function(t,n){i.ready().then(function(){var r=i._dbInfo;r.db.transaction(function(i){J(i,r,"DELETE FROM "+r.storeName+" WHERE key = ?",[e],function(){t()},function(e,t){n(t)})})}).catch(n)});return s(n,t),n},clear:function(e){var t=this,i=new a(function(e,i){t.ready().then(function(){var n=t._dbInfo;n.db.transaction(function(t){J(t,n,"DELETE FROM "+n.storeName,[],function(){e()},function(e,t){i(t)})})}).catch(i)});return s(i,e),i},length:function(e){var t=this,i=new a(function(e,i){t.ready().then(function(){var n=t._dbInfo;n.db.transaction(function(t){J(t,n,"SELECT COUNT(key) as c FROM "+n.storeName,[],function(t,i){var n=i.rows.item(0).c;e(n)},function(e,t){i(t)})})}).catch(i)});return s(i,e),i},key:function(e,t){var i=this,n=new a(function(t,n){i.ready().then(function(){var r=i._dbInfo;r.db.transaction(function(i){J(i,r,"SELECT key FROM "+r.storeName+" WHERE id = ? LIMIT 1",[e+1],function(e,i){var n=i.rows.length?i.rows.item(0).key:null;t(n)},function(e,t){n(t)})})}).catch(n)});return s(n,t),n},keys:function(e){var t=this,i=new a(function(e,i){t.ready().then(function(){var n=t._dbInfo;n.db.transaction(function(t){J(t,n,"SELECT key FROM "+n.storeName,[],function(t,i){for(var n=[],r=0;r<i.rows.length;r++)n.push(i.rows.item(r).key);e(n)},function(e,t){i(t)})})}).catch(i)});return s(i,e),i},dropInstance:function(e,t){t=d.apply(this,arguments);var i=this.config();(e="function"!=typeof e&&e||{}).name||(e.name=e.name||i.name,e.storeName=e.storeName||i.storeName);var n,r=this;return n=e.name?new a(function(t){var n;n=e.name===i.name?r._dbInfo.db:openDatabase(e.name,"","",0),e.storeName?t({db:n,storeNames:[e.storeName]}):t(function(e){return new a(function(t,i){e.transaction(function(n){n.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'",[],function(i,n){for(var r=[],o=0;o<n.rows.length;o++)r.push(n.rows.item(o).name);t({db:e,storeNames:r})},function(e,t){i(t)})},function(e){i(e)})})}(n))}).then(function(e){return new a(function(t,i){e.db.transaction(function(n){function r(e){return new a(function(t,i){n.executeSql("DROP TABLE IF EXISTS "+e,[],function(){t()},function(e,t){i(t)})})}for(var o=[],s=0,l=e.storeNames.length;s<l;s++)o.push(r(e.storeNames[s]));a.all(o).then(function(){t()}).catch(function(e){i(e)})},function(e){i(e)})})}):a.reject("Invalid arguments"),s(n,t),n}};function Z(e,t){var i=e.name+"/";return e.storeName!==t.storeName&&(i+=e.storeName+"/"),i}function ee(){return!function(){var e="_localforage_support_test";try{return localStorage.setItem(e,!0),localStorage.removeItem(e),!1}catch(e){return!0}}()||localStorage.length>0}var te={_driver:"localStorageWrapper",_initStorage:function(e){var t={};if(e)for(var i in e)t[i]=e[i];return t.keyPrefix=Z(e,this._defaultConfig),ee()?(this._dbInfo=t,t.serializer=V,a.resolve()):a.reject()},_support:function(){try{return"undefined"!=typeof localStorage&&"setItem"in localStorage&&!!localStorage.setItem}catch(e){return!1}}(),iterate:function(e,t){var i=this,n=i.ready().then(function(){for(var t=i._dbInfo,n=t.keyPrefix,r=n.length,o=localStorage.length,a=1,s=0;s<o;s++){var l=localStorage.key(s);if(0===l.indexOf(n)){var c=localStorage.getItem(l);if(c&&(c=t.serializer.deserialize(c)),void 0!==(c=e(c,l.substring(r),a++)))return c}}});return s(n,t),n},getItem:function(e,t){var i=this;e=c(e);var n=i.ready().then(function(){var t=i._dbInfo,n=localStorage.getItem(t.keyPrefix+e);return n&&(n=t.serializer.deserialize(n)),n});return s(n,t),n},setItem:function(e,t,i){var n=this;e=c(e);var r=n.ready().then(function(){void 0===t&&(t=null);var i=t;return new a(function(r,o){var a=n._dbInfo;a.serializer.serialize(t,function(t,n){if(n)o(n);else try{localStorage.setItem(a.keyPrefix+e,t),r(i)}catch(e){"QuotaExceededError"!==e.name&&"NS_ERROR_DOM_QUOTA_REACHED"!==e.name||o(e),o(e)}})})});return s(r,i),r},removeItem:function(e,t){var i=this;e=c(e);var n=i.ready().then(function(){var t=i._dbInfo;localStorage.removeItem(t.keyPrefix+e)});return s(n,t),n},clear:function(e){var t=this,i=t.ready().then(function(){for(var e=t._dbInfo.keyPrefix,i=localStorage.length-1;i>=0;i--){var n=localStorage.key(i);0===n.indexOf(e)&&localStorage.removeItem(n)}});return s(i,e),i},length:function(e){var t=this.keys().then(function(e){return e.length});return s(t,e),t},key:function(e,t){var i=this,n=i.ready().then(function(){var t,n=i._dbInfo;try{t=localStorage.key(e)}catch(e){t=null}return t&&(t=t.substring(n.keyPrefix.length)),t});return s(n,t),n},keys:function(e){var t=this,i=t.ready().then(function(){for(var e=t._dbInfo,i=localStorage.length,n=[],r=0;r<i;r++){var o=localStorage.key(r);0===o.indexOf(e.keyPrefix)&&n.push(o.substring(e.keyPrefix.length))}return n});return s(i,e),i},dropInstance:function(e,t){if(t=d.apply(this,arguments),!(e="function"!=typeof e&&e||{}).name){var i=this.config();e.name=e.name||i.name,e.storeName=e.storeName||i.storeName}var n,r=this;return n=e.name?new a(function(t){e.storeName?t(Z(e,r._defaultConfig)):t(e.name+"/")}).then(function(e){for(var t=localStorage.length-1;t>=0;t--){var i=localStorage.key(t);0===i.indexOf(e)&&localStorage.removeItem(i)}}):a.reject("Invalid arguments"),s(n,t),n}},ie=function(e,t){return e===t||"number"==typeof e&&"number"==typeof t&&isNaN(e)&&isNaN(t)},ne=function(e,t){for(var i=e.length,n=0;n<i;){if(ie(e[n],t))return!0;n++}return!1},re=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},oe={},ae={},se={INDEXEDDB:I,WEBSQL:X,LOCALSTORAGE:te},le=[se.INDEXEDDB._driver,se.WEBSQL._driver,se.LOCALSTORAGE._driver],ce=["dropInstance"],de=["clear","getItem","iterate","key","keys","length","removeItem","setItem"].concat(ce),he={description:"",driver:le.slice(),name:"localforage",size:4980736,storeName:"keyvaluepairs",version:1};function ue(e,t){e[t]=function(){var i=arguments;return e.ready().then(function(){return e[t].apply(e,i)})}}function pe(){for(var e=1;e<arguments.length;e++){var t=arguments[e];if(t)for(var i in t)t.hasOwnProperty(i)&&(re(t[i])?arguments[0][i]=t[i].slice():arguments[0][i]=t[i])}return arguments[0]}var fe=function(){function e(t){for(var i in function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),se)if(se.hasOwnProperty(i)){var n=se[i],r=n._driver;this[i]=r,oe[r]||this.defineDriver(n)}this._defaultConfig=pe({},he),this._config=pe({},this._defaultConfig,t),this._driverSet=null,this._initDriver=null,this._ready=!1,this._dbInfo=null,this._wrapLibraryMethodsWithReady(),this.setDriver(this._config.driver).catch(function(){})}return e.prototype.config=function(e){if("object"===(void 0===e?"undefined":n(e))){if(this._ready)return new Error("Can't call config() after localforage has been used.");for(var t in e){if("storeName"===t&&(e[t]=e[t].replace(/\W/g,"_")),"version"===t&&"number"!=typeof e[t])return new Error("Database version must be a number.");this._config[t]=e[t]}return!("driver"in e)||!e.driver||this.setDriver(this._config.driver)}return"string"==typeof e?this._config[e]:this._config},e.prototype.defineDriver=function(e,t,i){var n=new a(function(t,i){try{var n=e._driver,r=new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");if(!e._driver)return void i(r);for(var o=de.concat("_initStorage"),l=0,c=o.length;l<c;l++){var d=o[l];if((!ne(ce,d)||e[d])&&"function"!=typeof e[d])return void i(r)}!function(){for(var t=function(e){return function(){var t=new Error("Method "+e+" is not implemented by the current driver"),i=a.reject(t);return s(i,arguments[arguments.length-1]),i}},i=0,n=ce.length;i<n;i++){var r=ce[i];e[r]||(e[r]=t(r))}}();var h=function(i){oe[n]&&console.info("Redefining LocalForage driver: "+n),oe[n]=e,ae[n]=i,t()};"_support"in e?e._support&&"function"==typeof e._support?e._support().then(h,i):h(!!e._support):h(!0)}catch(e){i(e)}});return l(n,t,i),n},e.prototype.driver=function(){return this._driver||null},e.prototype.getDriver=function(e,t,i){var n=oe[e]?a.resolve(oe[e]):a.reject(new Error("Driver not found."));return l(n,t,i),n},e.prototype.getSerializer=function(e){var t=a.resolve(V);return l(t,e),t},e.prototype.ready=function(e){var t=this,i=t._driverSet.then(function(){return null===t._ready&&(t._ready=t._initDriver()),t._ready});return l(i,e,e),i},e.prototype.setDriver=function(e,t,i){var n=this;re(e)||(e=[e]);var r=this._getSupportedDrivers(e);function o(){n._config.driver=n.driver()}function s(e){return n._extend(e),o(),n._ready=n._initStorage(n._config),n._ready}var c=null!==this._driverSet?this._driverSet.catch(function(){return a.resolve()}):a.resolve();return this._driverSet=c.then(function(){var e=r[0];return n._dbInfo=null,n._ready=null,n.getDriver(e).then(function(e){n._driver=e._driver,o(),n._wrapLibraryMethodsWithReady(),n._initDriver=function(e){return function(){var t=0;return function i(){for(;t<e.length;){var r=e[t];return t++,n._dbInfo=null,n._ready=null,n.getDriver(r).then(s).catch(i)}o();var l=new Error("No available storage method found.");return n._driverSet=a.reject(l),n._driverSet}()}}(r)})}).catch(function(){o();var e=new Error("No available storage method found.");return n._driverSet=a.reject(e),n._driverSet}),l(this._driverSet,t,i),this._driverSet},e.prototype.supports=function(e){return!!ae[e]},e.prototype._extend=function(e){pe(this,e)},e.prototype._getSupportedDrivers=function(e){for(var t=[],i=0,n=e.length;i<n;i++){var r=e[i];this.supports(r)&&t.push(r)}return t},e.prototype._wrapLibraryMethodsWithReady=function(){for(var e=0,t=de.length;e<t;e++)ue(this,de[e])},e.prototype.createInstance=function(t){return new e(t)},e}(),me=new fe;t.exports=me},{3:3}]},{},[4])(4)),me.exports),_e=he(ge),ve={exports:{}},ye=(fe||(fe=1,ve.exports=function(){var e=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];function t(e,t){var i=e[0],n=e[1],r=e[2],o=e[3];n=((n+=((r=((r+=((o=((o+=((i=((i+=(n&r|~n&o)+t[0]-680876936|0)<<7|i>>>25)+n|0)&n|~i&r)+t[1]-389564586|0)<<12|o>>>20)+i|0)&i|~o&n)+t[2]+606105819|0)<<17|r>>>15)+o|0)&o|~r&i)+t[3]-1044525330|0)<<22|n>>>10)+r|0,n=((n+=((r=((r+=((o=((o+=((i=((i+=(n&r|~n&o)+t[4]-176418897|0)<<7|i>>>25)+n|0)&n|~i&r)+t[5]+1200080426|0)<<12|o>>>20)+i|0)&i|~o&n)+t[6]-1473231341|0)<<17|r>>>15)+o|0)&o|~r&i)+t[7]-45705983|0)<<22|n>>>10)+r|0,n=((n+=((r=((r+=((o=((o+=((i=((i+=(n&r|~n&o)+t[8]+1770035416|0)<<7|i>>>25)+n|0)&n|~i&r)+t[9]-1958414417|0)<<12|o>>>20)+i|0)&i|~o&n)+t[10]-42063|0)<<17|r>>>15)+o|0)&o|~r&i)+t[11]-1990404162|0)<<22|n>>>10)+r|0,n=((n+=((r=((r+=((o=((o+=((i=((i+=(n&r|~n&o)+t[12]+1804603682|0)<<7|i>>>25)+n|0)&n|~i&r)+t[13]-40341101|0)<<12|o>>>20)+i|0)&i|~o&n)+t[14]-1502002290|0)<<17|r>>>15)+o|0)&o|~r&i)+t[15]+1236535329|0)<<22|n>>>10)+r|0,n=((n+=((r=((r+=((o=((o+=((i=((i+=(n&o|r&~o)+t[1]-165796510|0)<<5|i>>>27)+n|0)&r|n&~r)+t[6]-1069501632|0)<<9|o>>>23)+i|0)&n|i&~n)+t[11]+643717713|0)<<14|r>>>18)+o|0)&i|o&~i)+t[0]-373897302|0)<<20|n>>>12)+r|0,n=((n+=((r=((r+=((o=((o+=((i=((i+=(n&o|r&~o)+t[5]-701558691|0)<<5|i>>>27)+n|0)&r|n&~r)+t[10]+38016083|0)<<9|o>>>23)+i|0)&n|i&~n)+t[15]-660478335|0)<<14|r>>>18)+o|0)&i|o&~i)+t[4]-405537848|0)<<20|n>>>12)+r|0,n=((n+=((r=((r+=((o=((o+=((i=((i+=(n&o|r&~o)+t[9]+568446438|0)<<5|i>>>27)+n|0)&r|n&~r)+t[14]-1019803690|0)<<9|o>>>23)+i|0)&n|i&~n)+t[3]-187363961|0)<<14|r>>>18)+o|0)&i|o&~i)+t[8]+1163531501|0)<<20|n>>>12)+r|0,n=((n+=((r=((r+=((o=((o+=((i=((i+=(n&o|r&~o)+t[13]-1444681467|0)<<5|i>>>27)+n|0)&r|n&~r)+t[2]-51403784|0)<<9|o>>>23)+i|0)&n|i&~n)+t[7]+1735328473|0)<<14|r>>>18)+o|0)&i|o&~i)+t[12]-1926607734|0)<<20|n>>>12)+r|0,n=((n+=((r=((r+=((o=((o+=((i=((i+=(n^r^o)+t[5]-378558|0)<<4|i>>>28)+n|0)^n^r)+t[8]-2022574463|0)<<11|o>>>21)+i|0)^i^n)+t[11]+1839030562|0)<<16|r>>>16)+o|0)^o^i)+t[14]-35309556|0)<<23|n>>>9)+r|0,n=((n+=((r=((r+=((o=((o+=((i=((i+=(n^r^o)+t[1]-1530992060|0)<<4|i>>>28)+n|0)^n^r)+t[4]+1272893353|0)<<11|o>>>21)+i|0)^i^n)+t[7]-155497632|0)<<16|r>>>16)+o|0)^o^i)+t[10]-1094730640|0)<<23|n>>>9)+r|0,n=((n+=((r=((r+=((o=((o+=((i=((i+=(n^r^o)+t[13]+681279174|0)<<4|i>>>28)+n|0)^n^r)+t[0]-358537222|0)<<11|o>>>21)+i|0)^i^n)+t[3]-722521979|0)<<16|r>>>16)+o|0)^o^i)+t[6]+76029189|0)<<23|n>>>9)+r|0,n=((n+=((r=((r+=((o=((o+=((i=((i+=(n^r^o)+t[9]-640364487|0)<<4|i>>>28)+n|0)^n^r)+t[12]-421815835|0)<<11|o>>>21)+i|0)^i^n)+t[15]+530742520|0)<<16|r>>>16)+o|0)^o^i)+t[2]-995338651|0)<<23|n>>>9)+r|0,n=((n+=((o=((o+=(n^((i=((i+=(r^(n|~o))+t[0]-198630844|0)<<6|i>>>26)+n|0)|~r))+t[7]+1126891415|0)<<10|o>>>22)+i|0)^((r=((r+=(i^(o|~n))+t[14]-1416354905|0)<<15|r>>>17)+o|0)|~i))+t[5]-57434055|0)<<21|n>>>11)+r|0,n=((n+=((o=((o+=(n^((i=((i+=(r^(n|~o))+t[12]+1700485571|0)<<6|i>>>26)+n|0)|~r))+t[3]-1894986606|0)<<10|o>>>22)+i|0)^((r=((r+=(i^(o|~n))+t[10]-1051523|0)<<15|r>>>17)+o|0)|~i))+t[1]-2054922799|0)<<21|n>>>11)+r|0,n=((n+=((o=((o+=(n^((i=((i+=(r^(n|~o))+t[8]+1873313359|0)<<6|i>>>26)+n|0)|~r))+t[15]-30611744|0)<<10|o>>>22)+i|0)^((r=((r+=(i^(o|~n))+t[6]-1560198380|0)<<15|r>>>17)+o|0)|~i))+t[13]+1309151649|0)<<21|n>>>11)+r|0,n=((n+=((o=((o+=(n^((i=((i+=(r^(n|~o))+t[4]-145523070|0)<<6|i>>>26)+n|0)|~r))+t[11]-1120210379|0)<<10|o>>>22)+i|0)^((r=((r+=(i^(o|~n))+t[2]+718787259|0)<<15|r>>>17)+o|0)|~i))+t[9]-343485551|0)<<21|n>>>11)+r|0,e[0]=i+e[0]|0,e[1]=n+e[1]|0,e[2]=r+e[2]|0,e[3]=o+e[3]|0}function i(e){var t,i=[];for(t=0;t<64;t+=4)i[t>>2]=e.charCodeAt(t)+(e.charCodeAt(t+1)<<8)+(e.charCodeAt(t+2)<<16)+(e.charCodeAt(t+3)<<24);return i}function n(e){var t,i=[];for(t=0;t<64;t+=4)i[t>>2]=e[t]+(e[t+1]<<8)+(e[t+2]<<16)+(e[t+3]<<24);return i}function r(e){var n,r,o,a,s,l,c=e.length,d=[1732584193,-271733879,-1732584194,271733878];for(n=64;n<=c;n+=64)t(d,i(e.substring(n-64,n)));for(r=(e=e.substring(n-64)).length,o=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],n=0;n<r;n+=1)o[n>>2]|=e.charCodeAt(n)<<(n%4<<3);if(o[n>>2]|=128<<(n%4<<3),n>55)for(t(d,o),n=0;n<16;n+=1)o[n]=0;return a=(a=8*c).toString(16).match(/(.*?)(.{0,8})$/),s=parseInt(a[2],16),l=parseInt(a[1],16)||0,o[14]=s,o[15]=l,t(d,o),d}function o(t){var i,n="";for(i=0;i<4;i+=1)n+=e[t>>8*i+4&15]+e[t>>8*i&15];return n}function a(e){var t;for(t=0;t<e.length;t+=1)e[t]=o(e[t]);return e.join("")}function s(e){return/[\u0080-\uFFFF]/.test(e)&&(e=unescape(encodeURIComponent(e))),e}function l(e){var t,i=[],n=e.length;for(t=0;t<n-1;t+=2)i.push(parseInt(e.substr(t,2),16));return String.fromCharCode.apply(String,i)}function c(){this.reset()}return a(r("hello")),"undefined"==typeof ArrayBuffer||ArrayBuffer.prototype.slice||function(){function e(e,t){return(e=0|e||0)<0?Math.max(e+t,0):Math.min(e,t)}ArrayBuffer.prototype.slice=function(t,i){var n,r,o,a,s=this.byteLength,l=e(t,s),c=s;return void 0!==i&&(c=e(i,s)),l>c?new ArrayBuffer(0):(n=c-l,r=new ArrayBuffer(n),o=new Uint8Array(r),a=new Uint8Array(this,l,n),o.set(a),r)}}(),c.prototype.append=function(e){return this.appendBinary(s(e)),this},c.prototype.appendBinary=function(e){this._buff+=e,this._length+=e.length;var n,r=this._buff.length;for(n=64;n<=r;n+=64)t(this._hash,i(this._buff.substring(n-64,n)));return this._buff=this._buff.substring(n-64),this},c.prototype.end=function(e){var t,i,n=this._buff,r=n.length,o=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(t=0;t<r;t+=1)o[t>>2]|=n.charCodeAt(t)<<(t%4<<3);return this._finish(o,r),i=a(this._hash),e&&(i=l(i)),this.reset(),i},c.prototype.reset=function(){return this._buff="",this._length=0,this._hash=[1732584193,-271733879,-1732584194,271733878],this},c.prototype.getState=function(){return{buff:this._buff,length:this._length,hash:this._hash.slice()}},c.prototype.setState=function(e){return this._buff=e.buff,this._length=e.length,this._hash=e.hash,this},c.prototype.destroy=function(){delete this._hash,delete this._buff,delete this._length},c.prototype._finish=function(e,i){var n,r,o,a=i;if(e[a>>2]|=128<<(a%4<<3),a>55)for(t(this._hash,e),a=0;a<16;a+=1)e[a]=0;n=(n=8*this._length).toString(16).match(/(.*?)(.{0,8})$/),r=parseInt(n[2],16),o=parseInt(n[1],16)||0,e[14]=r,e[15]=o,t(this._hash,e)},c.hash=function(e,t){return c.hashBinary(s(e),t)},c.hashBinary=function(e,t){var i=a(r(e));return t?l(i):i},c.ArrayBuffer=function(){this.reset()},c.ArrayBuffer.prototype.append=function(e){var i,r,o,a,s=(r=this._buff.buffer,o=e,(a=new Uint8Array(r.byteLength+o.byteLength)).set(new Uint8Array(r)),a.set(new Uint8Array(o),r.byteLength),a),l=s.length;for(this._length+=e.byteLength,i=64;i<=l;i+=64)t(this._hash,n(s.subarray(i-64,i)));return this._buff=i-64<l?new Uint8Array(s.buffer.slice(i-64)):new Uint8Array(0),this},c.ArrayBuffer.prototype.end=function(e){var t,i,n=this._buff,r=n.length,o=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(t=0;t<r;t+=1)o[t>>2]|=n[t]<<(t%4<<3);return this._finish(o,r),i=a(this._hash),e&&(i=l(i)),this.reset(),i},c.ArrayBuffer.prototype.reset=function(){return this._buff=new Uint8Array(0),this._length=0,this._hash=[1732584193,-271733879,-1732584194,271733878],this},c.ArrayBuffer.prototype.getState=function(){var e,t=c.prototype.getState.call(this);return t.buff=(e=t.buff,String.fromCharCode.apply(null,new Uint8Array(e))),t},c.ArrayBuffer.prototype.setState=function(e){return e.buff=function(e,t){var i,n=e.length,r=new ArrayBuffer(n),o=new Uint8Array(r);for(i=0;i<n;i+=1)o[i]=e.charCodeAt(i);return t?o:r}(e.buff,!0),c.prototype.setState.call(this,e)},c.ArrayBuffer.prototype.destroy=c.prototype.destroy,c.ArrayBuffer.prototype._finish=c.prototype._finish,c.ArrayBuffer.hash=function(e,i){var r=a(function(e){var i,r,o,a,s,l,c=e.length,d=[1732584193,-271733879,-1732584194,271733878];for(i=64;i<=c;i+=64)t(d,n(e.subarray(i-64,i)));for(r=(e=i-64<c?e.subarray(i-64):new Uint8Array(0)).length,o=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],i=0;i<r;i+=1)o[i>>2]|=e[i]<<(i%4<<3);if(o[i>>2]|=128<<(i%4<<3),i>55)for(t(d,o),i=0;i<16;i+=1)o[i]=0;return a=(a=8*c).toString(16).match(/(.*?)(.{0,8})$/),s=parseInt(a[2],16),l=parseInt(a[1],16)||0,o[14]=s,o[15]=l,t(d,o),d}(new Uint8Array(e)));return i?l(r):r},c}()),ve.exports),be=he(ye);function we(e,t,i){e.prototype=t.prototype=i,i.constructor=e}function xe(e,t){var i=Object.create(e.prototype);for(var n in t)i[n]=t[n];return i}function $e(){}var Se=.7,ke=1/Se,Ae="\\s*([+-]?\\d+)\\s*",Ee="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",Ce="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",Ne=/^#([0-9a-f]{3,8})$/,Ie=new RegExp(`^rgb\\(${Ae},${Ae},${Ae}\\)$`),Me=new RegExp(`^rgb\\(${Ce},${Ce},${Ce}\\)$`),Te=new RegExp(`^rgba\\(${Ae},${Ae},${Ae},${Ee}\\)$`),Pe=new RegExp(`^rgba\\(${Ce},${Ce},${Ce},${Ee}\\)$`),Oe=new RegExp(`^hsl\\(${Ee},${Ce},${Ce}\\)$`),ze=new RegExp(`^hsla\\(${Ee},${Ce},${Ce},${Ee}\\)$`),De={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};function je(){return this.rgb().formatHex()}function Re(){return this.rgb().formatRgb()}function Le(e){var t,i;return e=(e+"").trim().toLowerCase(),(t=Ne.exec(e))?(i=t[1].length,t=parseInt(t[1],16),6===i?Ue(t):3===i?new He(t>>8&15|t>>4&240,t>>4&15|240&t,(15&t)<<4|15&t,1):8===i?Be(t>>24&255,t>>16&255,t>>8&255,(255&t)/255):4===i?Be(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|240&t,((15&t)<<4|15&t)/255):null):(t=Ie.exec(e))?new He(t[1],t[2],t[3],1):(t=Me.exec(e))?new He(255*t[1]/100,255*t[2]/100,255*t[3]/100,1):(t=Te.exec(e))?Be(t[1],t[2],t[3],t[4]):(t=Pe.exec(e))?Be(255*t[1]/100,255*t[2]/100,255*t[3]/100,t[4]):(t=Oe.exec(e))?Qe(t[1],t[2]/100,t[3]/100,1):(t=ze.exec(e))?Qe(t[1],t[2]/100,t[3]/100,t[4]):De.hasOwnProperty(e)?Ue(De[e]):"transparent"===e?new He(NaN,NaN,NaN,0):null}function Ue(e){return new He(e>>16&255,e>>8&255,255&e,1)}function Be(e,t,i,n){return n<=0&&(e=t=i=NaN),new He(e,t,i,n)}function Fe(e,t,i,n){return 1===arguments.length?function(e){return e instanceof $e||(e=Le(e)),e?new He((e=e.rgb()).r,e.g,e.b,e.opacity):new He}(e):new He(e,t,i,n??1)}function He(e,t,i,n){this.r=+e,this.g=+t,this.b=+i,this.opacity=+n}function Ge(){return`#${Ve(this.r)}${Ve(this.g)}${Ve(this.b)}`}function qe(){const e=We(this.opacity);return`${1===e?"rgb(":"rgba("}${Ye(this.r)}, ${Ye(this.g)}, ${Ye(this.b)}${1===e?")":`, ${e})`}`}function We(e){return isNaN(e)?1:Math.max(0,Math.min(1,e))}function Ye(e){return Math.max(0,Math.min(255,Math.round(e)||0))}function Ve(e){return((e=Ye(e))<16?"0":"")+e.toString(16)}function Qe(e,t,i,n){return n<=0?e=t=i=NaN:i<=0||i>=1?e=t=NaN:t<=0&&(e=NaN),new Ke(e,t,i,n)}function Je(e){if(e instanceof Ke)return new Ke(e.h,e.s,e.l,e.opacity);if(e instanceof $e||(e=Le(e)),!e)return new Ke;if(e instanceof Ke)return e;var t=(e=e.rgb()).r/255,i=e.g/255,n=e.b/255,r=Math.min(t,i,n),o=Math.max(t,i,n),a=NaN,s=o-r,l=(o+r)/2;return s?(a=t===o?(i-n)/s+6*(i<n):i===o?(n-t)/s+2:(t-i)/s+4,s/=l<.5?o+r:2-o-r,a*=60):s=l>0&&l<1?0:a,new Ke(a,s,l,e.opacity)}function Ke(e,t,i,n){this.h=+e,this.s=+t,this.l=+i,this.opacity=+n}function Xe(e){return(e=(e||0)%360)<0?e+360:e}function Ze(e){return Math.max(0,Math.min(1,e||0))}function et(e,t,i){return 255*(e<60?t+(i-t)*e/60:e<180?i:e<240?t+(i-t)*(240-e)/60:t)}we($e,Le,{copy(e){return Object.assign(new this.constructor,this,e)},displayable(){return this.rgb().displayable()},hex:je,formatHex:je,formatHex8:function(){return this.rgb().formatHex8()},formatHsl:function(){return Je(this).formatHsl()},formatRgb:Re,toString:Re}),we(He,Fe,xe($e,{brighter(e){return e=null==e?ke:Math.pow(ke,e),new He(this.r*e,this.g*e,this.b*e,this.opacity)},darker(e){return e=null==e?Se:Math.pow(Se,e),new He(this.r*e,this.g*e,this.b*e,this.opacity)},rgb(){return this},clamp(){return new He(Ye(this.r),Ye(this.g),Ye(this.b),We(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:Ge,formatHex:Ge,formatHex8:function(){return`#${Ve(this.r)}${Ve(this.g)}${Ve(this.b)}${Ve(255*(isNaN(this.opacity)?1:this.opacity))}`},formatRgb:qe,toString:qe})),we(Ke,function(e,t,i,n){return 1===arguments.length?Je(e):new Ke(e,t,i,n??1)},xe($e,{brighter(e){return e=null==e?ke:Math.pow(ke,e),new Ke(this.h,this.s,this.l*e,this.opacity)},darker(e){return e=null==e?Se:Math.pow(Se,e),new Ke(this.h,this.s,this.l*e,this.opacity)},rgb(){var e=this.h%360+360*(this.h<0),t=isNaN(e)||isNaN(this.s)?0:this.s,i=this.l,n=i+(i<.5?i:1-i)*t,r=2*i-n;return new He(et(e>=240?e-240:e+120,r,n),et(e,r,n),et(e<120?e+240:e-120,r,n),this.opacity)},clamp(){return new Ke(Xe(this.h),Ze(this.s),Ze(this.l),We(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const e=We(this.opacity);return`${1===e?"hsl(":"hsla("}${Xe(this.h)}, ${100*Ze(this.s)}%, ${100*Ze(this.l)}%${1===e?")":`, ${e})`}`}}));var tt=e=>()=>e;function it(e,t){var i=t-e;return i?function(e,t){return function(i){return e+i*t}}(e,i):tt(isNaN(e)?t:e)}var nt=function e(t){var i=function(e){return 1===(e=+e)?it:function(t,i){return i-t?function(e,t,i){return e=Math.pow(e,i),t=Math.pow(t,i)-e,i=1/i,function(n){return Math.pow(e+n*t,i)}}(t,i,e):tt(isNaN(t)?i:t)}}(t);function n(e,t){var n=i((e=Fe(e)).r,(t=Fe(t)).r),r=i(e.g,t.g),o=i(e.b,t.b),a=it(e.opacity,t.opacity);return function(t){return e.r=n(t),e.g=r(t),e.b=o(t),e.opacity=a(t),e+""}}return n.gamma=e,n}(1);const rt="https://github.com/foXaCe/mini-graph-card/blob/main/README.md",ot=["var(--accent-color)","#3498db","#e74c3c","#9b59b6","#f1c40f","#2ecc71","#1abc9c","#34495e","#e67e22","#7f8c8d","#27ae60","#2980b9","#8e44ad"],at=["entity","line","length","fill","points","tooltip","abs","config"],st={name:!0,icon:!0,state:!0,graph:"line",labels:"hover",labels_secondary:"hover",extrema:!1,legend:!0,fill:!0,points:"hover"},lt=36e5;class ct{constructor(e,t,i,n=24,r=1,o="avg",a="interval",s=!0,l=!1){const c={avg:this._average,median:this._median,max:this._maximum,min:this._minimum,first:this._first,last:this._last,sum:this._sum,delta:this._delta,diff:this._diff};this._history=void 0,this.coords=[],this.width=e-2*i[0],this.height=t,this.margin=i,this._max=0,this._min=0,this.points=r,this.hours=n,this.aggregateFuncName=o,this._calcPoint=c[o]||this._average,this._smoothing=s,this._logarithmic=l,this._groupBy=a,this._endTime=0}get max(){return this._max}set max(e){this._max=e}get min(){return this._min}set min(e){this._min=e}set history(e){this._history=e}update(e){if(e&&(this._history=e),!this._history)return;this._updateEndTime();const t=this._history.reduce((e,t)=>this._reducer(e,t),[]),i=Math.ceil(this.hours*this.points);t.length=i,this.coords=this._calcPoints(t),this.min=Math.min(...this.coords.map(e=>Number(e[2]))),this.max=Math.max(...this.coords.map(e=>Number(e[2])))}_reducer(e,t){const i=(this._endTime.getTime()-new Date(t.last_changed).getTime())/lt*this.points-this.hours*this.points;if(i<0){const n=Math.floor(Math.abs(i));e[n]||(e[n]=[]),e[n].push(t)}else e[0]=[t];return e}_calcPoints(e){let t=this.width/(this.hours*this.points-1);t=Number.isFinite(t)?t:this.width;const i=[];let n,r=e.filter(Boolean)[0];for(let o=0;o<e.length;o+=1)n=t*o+this.margin[0],e[o]?(r=e[o],i.push([n,0,this._calcPoint(r)])):i.push([n,0,this._lastValue(r)]);return i}_calcY(e){const t=this._logarithmic?Math.log10(Math.max(1,this.max)):this.max,i=this._logarithmic?Math.log10(Math.max(1,this.min)):this.min,n=(t-i)/this.height||1;return e.map(e=>{const t=this._logarithmic?Math.log10(Math.max(1,e[2])):e[2],r=this.height-(t-i)/n;return[e[0],r,e[2]]})}getPoints(){let{coords:e}=this;if(1===e.length&&(e[1]=[this.width+this.margin[0],0,e[0][2]]),e=this._calcY(this.coords),this._smoothing){let t=e[0];return e.shift(),e.map((e,i)=>{const n=this._midPoint(t[0],t[1],e[0],e[1]),r=(t[2]+e[2])/2;return t=e,[n[0],n[1],r,i+1]})}return e.map((e,t)=>[e[0],e[1],e[2],t])}getPath(){let e,t,{coords:i}=this;1===i.length&&(i[1]=[this.width+this.margin[0],0,i[0][2]]),i=this._calcY(this.coords);let n="",r=i[0];return n+=`M${r[0]},${r[1]}`,i.forEach(i=>{e=i,t=this._smoothing?this._midPoint(r[0],r[1],e[0],e[1]):e,n+=` ${t[0]},${t[1]}`,n+=` Q ${e[0]},${e[1]}`,r=e}),n+=` ${e[0]},${e[1]}`,n}computeGradient(e,t){const i=t?Math.log10(Math.max(1,this._max))-Math.log10(Math.max(1,this._min)):this._max-this._min;return e.map((e,n,r)=>{let o,a;if(e.value>this._max&&r[n+1]){const t=(this._max-r[n+1].value)/(e.value-r[n+1].value);o=nt(r[n+1].color,e.color)(t)}else if(e.value<this._min&&r[n-1]){const t=(r[n-1].value-this._min)/(r[n-1].value-e.value);o=nt(r[n-1].color,e.color)(t)}return a=i<=0?0:t?(Math.log10(Math.max(1,this._max))-Math.log10(Math.max(1,e.value)))*(100/i):(this._max-e.value)*(100/i),{color:o||e.color,offset:a}})}getFill(e){const{height:t}=this;let i=e;return i+=` L ${this.coords[this.coords.length-1][0]}, ${t}`,i+=` L ${this.coords[0][0]}, ${t} z`,i}getBars(e,t,i=4){const n=this._calcY(this.coords),r=(this.width-i)/Math.ceil(this.hours*this.points)/t;return n.map((n,o)=>({x:r*o*t+r*e+i,y:n[1],height:this.height-n[1],width:r-i,value:n[2]}))}_midPoint(e,t,i,n){return[(e-i)/2+i,(t-n)/2+n]}_average(e){return e.reduce((e,t)=>e+parseFloat(t.state),0)/e.length}_median(e){const t=[...e].sort((e,t)=>parseFloat(e.state)-parseFloat(t.state)),i=Math.floor((t.length-1)/2);return t.length%2==1?parseFloat(t[i].state):(parseFloat(t[i].state)+parseFloat(t[i+1].state))/2}_maximum(e){return Math.max(...e.map(e=>Number(e.state)))}_minimum(e){return Math.min(...e.map(e=>Number(e.state)))}_first(e){return parseFloat(e[0].state)}_last(e){return parseFloat(e[e.length-1].state)}_sum(e){return e.reduce((e,t)=>e+parseFloat(t.state),0)}_delta(e){return this._maximum(e)-this._minimum(e)}_diff(e){return this._last(e)-this._first(e)}_lastValue(e){return!e||["delta","diff"].includes(this.aggregateFuncName)?0:parseFloat(e[e.length-1].state)||0}_updateEndTime(){switch(this._endTime=new Date,this._groupBy){case"month":this._endTime.setMonth(this._endTime.getMonth()+1),this._endTime.setDate(1);break;case"date":this._endTime.setDate(this._endTime.getDate()+1),this._endTime.setHours(0,0,0,0);break;case"hour":this._endTime.setHours(this._endTime.getHours()+1),this._endTime.setMinutes(0,0,0)}}}const dt=o`
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
  /* Visually hidden but exposed to screen readers (graph text alternative). */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
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

  /* Responsive: the card declares container-type on :host, so adapt typography
     and padding to the card's own width (e.g. narrow Sections-view columns).
     Defaults are untouched above these thresholds. */
  @container (max-width: 240px) {
    .state__value { font-size: 2em; }
    .state__uom { font-size: 1.2em; }
    .name > span { font-size: 1.1em; }
    ha-card > div { padding: 0 12px; }
    ha-card > div:first-child { padding-top: 12px; }
  }
  @container (max-width: 160px) {
    .state__value { font-size: 1.6em; }
    .state__uom { font-size: 1em; }
    .graph__legend { display: none; } /* too cramped to be useful */
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
  }`;var ht=(e,t,i,n,r)=>{switch(n.action){case"more-info":e.dispatchEvent(new CustomEvent("hass-more-info",{composed:!0,detail:{entityId:r}}));break;case"navigate":if(!n.navigation_path)return;window.history.pushState(null,"",n.navigation_path),window.dispatchEvent(new CustomEvent("location-changed",{composed:!0,detail:{replace:!1}}));break;case"call-service":{if(!n.service)return;const[e,i]=n.service.split(".",2),r={...n.service_data};t.callService(e,i,r);break}case"url":if(!n.url)return;window.location.href=n.url;break;case"fire-dom-event":e.dispatchEvent(new CustomEvent("ll-custom",{composed:!0,bubbles:!0,detail:n}))}};let ut=String.fromCharCode;const pt=(e,t)=>e.reduce((e,i)=>e+Number(i[t]),0)/e.length,ft=(e,t)=>e.reduce((e,i)=>Number(i[t])>Number(e[t])?i:e,e[0]),mt=(e,t,i="en-US")=>e.toLocaleString(i,{hour:"numeric",minute:"numeric",...t}),gt=e=>3600*e*1e3,_t=e=>((e,t,i)=>{if(null==e)return"";let n,r,o,a={},s={},l="",c="",d="",h=2,u=3,p=2,f=[],m=0,g=0;for(o=0;o<e.length;o+=1)if(l=e.charAt(o),Object.prototype.hasOwnProperty.call(a,l)||(a[l]=u++,s[l]=!0),c=d+l,Object.prototype.hasOwnProperty.call(a,c))d=c;else{if(Object.prototype.hasOwnProperty.call(s,d)){if(d.charCodeAt(0)<256){for(n=0;n<p;n++)m<<=1,g==t-1?(g=0,f.push(i(m)),m=0):g++;for(r=d.charCodeAt(0),n=0;n<8;n++)m=m<<1|1&r,g==t-1?(g=0,f.push(i(m)),m=0):g++,r>>=1}else{for(r=1,n=0;n<p;n++)m=m<<1|r,g==t-1?(g=0,f.push(i(m)),m=0):g++,r=0;for(r=d.charCodeAt(0),n=0;n<16;n++)m=m<<1|1&r,g==t-1?(g=0,f.push(i(m)),m=0):g++,r>>=1}h--,0==h&&(h=Math.pow(2,p),p++),delete s[d]}else for(r=a[d],n=0;n<p;n++)m=m<<1|1&r,g==t-1?(g=0,f.push(i(m)),m=0):g++,r>>=1;h--,0==h&&(h=Math.pow(2,p),p++),a[c]=u++,d=String(l)}if(""!==d){if(Object.prototype.hasOwnProperty.call(s,d)){if(d.charCodeAt(0)<256){for(n=0;n<p;n++)m<<=1,g==t-1?(g=0,f.push(i(m)),m=0):g++;for(r=d.charCodeAt(0),n=0;n<8;n++)m=m<<1|1&r,g==t-1?(g=0,f.push(i(m)),m=0):g++,r>>=1}else{for(r=1,n=0;n<p;n++)m=m<<1|r,g==t-1?(g=0,f.push(i(m)),m=0):g++,r=0;for(r=d.charCodeAt(0),n=0;n<16;n++)m=m<<1|1&r,g==t-1?(g=0,f.push(i(m)),m=0):g++,r>>=1}h--,0==h&&(h=Math.pow(2,p),p++),delete s[d]}else for(r=a[d],n=0;n<p;n++)m=m<<1|1&r,g==t-1?(g=0,f.push(i(m)),m=0):g++,r>>=1;h--,0==h&&(h=Math.pow(2,p),p++)}for(r=2,n=0;n<p;n++)m=m<<1|1&r,g==t-1?(g=0,f.push(i(m)),m=0):g++,r>>=1;for(;;){if(m<<=1,g==t-1){f.push(i(m));break}g++}return f.join("")})(JSON.stringify(e),16,function(e){return ut(e)}),vt=e=>{return"string"==typeof e?JSON.parse(null==(t=e)?"":""==t?null:((e,t,i)=>{let n,r,o,a,s,l,c,d=[],h=4,u=4,p=3,f="",m=[],g={val:i(0),position:t,index:1};for(n=0;n<3;n+=1)d[n]=n;for(o=0,s=Math.pow(2,2),l=1;l!=s;)a=g.val&g.position,g.position>>=1,0==g.position&&(g.position=t,g.val=i(g.index++)),o|=(a>0?1:0)*l,l<<=1;switch(o){case 0:for(o=0,s=Math.pow(2,8),l=1;l!=s;)a=g.val&g.position,g.position>>=1,0==g.position&&(g.position=t,g.val=i(g.index++)),o|=(a>0?1:0)*l,l<<=1;c=ut(o);break;case 1:for(o=0,s=Math.pow(2,16),l=1;l!=s;)a=g.val&g.position,g.position>>=1,0==g.position&&(g.position=t,g.val=i(g.index++)),o|=(a>0?1:0)*l,l<<=1;c=ut(o);break;case 2:return""}for(d[3]=c,r=c,m.push(c);;){if(g.index>e)return"";for(o=0,s=Math.pow(2,p),l=1;l!=s;)a=g.val&g.position,g.position>>=1,0==g.position&&(g.position=t,g.val=i(g.index++)),o|=(a>0?1:0)*l,l<<=1;switch(c=o){case 0:for(o=0,s=Math.pow(2,8),l=1;l!=s;)a=g.val&g.position,g.position>>=1,0==g.position&&(g.position=t,g.val=i(g.index++)),o|=(a>0?1:0)*l,l<<=1;d[u++]=ut(o),c=u-1,h--;break;case 1:for(o=0,s=Math.pow(2,16),l=1;l!=s;)a=g.val&g.position,g.position>>=1,0==g.position&&(g.position=t,g.val=i(g.index++)),o|=(a>0?1:0)*l,l<<=1;d[u++]=ut(o),c=u-1,h--;break;case 2:return m.join("")}if(0==h&&(h=Math.pow(2,p),p++),d[c])f=d[c];else{if(c!==u)return null;f=r+r.charAt(0)}m.push(f),d[u++]=r+f.charAt(0),h--,r=f,0==h&&(h=Math.pow(2,p),p++)}})(t.length,32768,function(e){return t.charCodeAt(e)})):e;var t},yt=e=>{console.warn("mini-graph-card: ",e)},bt={en:{editor:{messages:{loading_home_assistant:"Loading Home Assistant...",please_wait_while_the_editor_loads:"Please wait while the editor loads.",editor_error:"Editor Error",an_error_occurred_while_rendering_the_editor:"An error occurred while rendering the editor:"},headers:{mini_graph_card_configuration:"Mini Graph Card Configuration",complete_configuration_for_all_options:"Complete configuration for all options"},sections:{entities:"Entities",add_configure_and_manage_all_your_entities:"Add, configure and manage all your entities",display_options:"Display Options",name_icon_and_visual_appearance_settings:"Name, icon, and visual appearance settings",graph_settings:"Graph Settings",graph_type_colors_and_visual_properties:"Graph type, colors, and visual properties",data_time:"Data & Time",data_aggregation_and_time_configuration:"Data aggregation and time configuration",scale_bounds:"Scale & Bounds",y_axis_bounds_and_scaling_options:"Y-axis bounds and scaling options",colors_thresholds:"Colors & Thresholds",color_configuration_and_dynamic_thresholds:"Color configuration and dynamic thresholds",advanced_options:"Advanced Options",advanced_options_and_performance_settings:"Advanced options and performance settings"},labels:{appearance:"Appearance",primary_entity_will_be_converted_to_entities_list:"Primary Entity (will be converted to entities list)",card_name:"Card Name",icon:"Icon",icon_image_url:"Icon Image URL",unit:"Unit",font_size:"Font Size (%)",header_font_size_px:"Header Font Size (px)",header_alignment:"Header Alignment",icon_alignment:"Icon Alignment",state_alignment:"State Alignment",decimal_places:"Decimal Places",height_px:"Height (px)",line_width:"Line Width",line_colors_comma_separated:"Line Colors (comma-separated)",bar_spacing:"Bar Spacing",enable_animation:"Enable Animation",smooth_lines:"Smooth Lines",logarithmic_scale:"Logarithmic Scale",hours_to_show:"Hours to Show",points_per_hour:"Points per Hour",aggregate_function:"Aggregate Function",group_by:"Group By",update_interval_seconds:"Update Interval (seconds)",primary_y_axis:"Primary Y-Axis",lower_bound_use_n_for_soft:"Lower Bound (use ~N for soft)",upper_bound_use_n_for_soft:"Upper Bound (use ~N for soft)",minimum_range:"Minimum Range",threshold_transition:"Threshold Transition",color_thresholds:"Color Thresholds",cache_data:"Cache Data",compress_data:"Compress Data",group_entities:"Group Entities",time_format_24h:"24-Hour Time Format"},buttons:{hide:"Hide",configure:"Configure",remove_entity:"Remove Entity",add_entity:"Add Entity",add_threshold:"Add Threshold",remove:"Remove"},placeholders:{card_title:"Card title",value:"Value",unit_example:"°C, kW, etc.",lower_bound_example:"0 or ~0",upper_bound_example:"100 or ~100"},options:{premium:"Premium",minimal:"Minimal",default:"Default",left:"Left",right:"Right",center:"Center",with_state:"With State",median:"Median",minimum:"Minimum",maximum:"Maximum",first:"First",last:"Last",sum:"Sum",delta:"Delta",difference:"Difference",interval:"Interval",date:"Date",hour:"Hour",month:"Month",smooth:"Smooth",hard:"Hard",primary:"Primary",secondary:"Secondary",average:"Average"},visibility:{visibility_options:"Visibility Options",name:"Name",state:"State",graph:"Graph",fill:"Fill",points:"Points",legend:"Legend",extrema:"Extrema",average:"Average",labels:"Labels",secondary_labels:"Secondary Labels"},tap_action:{tap_action:"Tap Action",hold_action:"Hold Action",double_tap_action:"Double Tap Action",action_type:"Action Type",more_info:"More Info",navigate:"Navigate",call_service:"Call Service",open_url:"Open URL",no_action:"No Action",navigation_path:"Navigation Path",url:"URL",service:"Service"},entity:{custom_name:"Custom Name",custom_color:"Custom Color",attribute_instead_of_state:"Attribute (instead of state)",y_axis:"Y-Axis",show_state:"Show State",show_in_graph:"Show in Graph",show_line:"Show Line",show_fill:"Show Fill",show_points:"Show Points",show_in_legend:"Show in Legend",smoothing:"Smoothing",fixed_value:"Fixed Value"}},card:{error:{entity_not_available:"Entity not available:",invalid_config:"Invalid configuration.",no_entities:'Please define at least one entity via the "entities" option.',entities_not_a_list:'Please provide the "entities" option as a list.\n See {url}',line_color_options_removed:'"line_color_above/line_color_below" was removed, please use "color_thresholds".\n See {url}',thresholds_need_value:'The first and last thresholds must have a set "value".\n See {url}'},a11y:{loading:"Loading",graph_summary:"{name}: current {current}, range over {hours}h from {min} to {max}."},labels:{current:"Current"},display_type:{min:"min",avg:"avg",max:"max"},picker:{name:"Mini Graph Card",description:"The Mini Graph card is a minimalistic and customizable graph card"}}},fr:{editor:{messages:{loading_home_assistant:"Chargement de Home Assistant…",please_wait_while_the_editor_loads:"Veuillez patienter pendant le chargement de l’éditeur.",editor_error:"Erreur de l’éditeur",an_error_occurred_while_rendering_the_editor:"Une erreur s’est produite lors du rendu de l’éditeur :"},headers:{mini_graph_card_configuration:"Configuration Mini Graph Card",complete_configuration_for_all_options:"Configuration complète pour toutes les options"},sections:{entities:"Entités",add_configure_and_manage_all_your_entities:"Ajoutez, configurez et gérez toutes vos entités",display_options:"Options d’affichage",name_icon_and_visual_appearance_settings:"Nom, icône et paramètres d’apparence visuelle",graph_settings:"Paramètres du graphique",graph_type_colors_and_visual_properties:"Type de graphique, couleurs et propriétés visuelles",data_time:"Données et période",data_aggregation_and_time_configuration:"Agrégation des données et configuration temporelle",scale_bounds:"Échelle et limites",y_axis_bounds_and_scaling_options:"Limites de l’axe Y et options d’échelle",colors_thresholds:"Couleurs et seuils",color_configuration_and_dynamic_thresholds:"Configuration des couleurs et seuils dynamiques",advanced_options:"Options avancées",advanced_options_and_performance_settings:"Options avancées et paramètres de performance"},labels:{appearance:"Apparence",primary_entity_will_be_converted_to_entities_list:"Entité principale (sera convertie en liste d’entités)",card_name:"Nom de la carte",icon:"Icône",icon_image_url:"URL de l’image d’icône",unit:"Unité",font_size:"Taille de police (%)",header_font_size_px:"Taille de police de l’en-tête (px)",header_alignment:"Alignement de l’en-tête",icon_alignment:"Alignement de l’icône",state_alignment:"Alignement de l’état",decimal_places:"Nombre de décimales",height_px:"Hauteur (px)",line_width:"Épaisseur de ligne",line_colors_comma_separated:"Couleurs de ligne (séparées par des virgules)",bar_spacing:"Espacement des barres",enable_animation:"Activer l’animation",smooth_lines:"Lignes lissées",logarithmic_scale:"Échelle logarithmique",hours_to_show:"Heures à afficher",points_per_hour:"Points par heure",aggregate_function:"Fonction d’agrégation",group_by:"Grouper par",update_interval_seconds:"Intervalle de mise à jour (secondes)",primary_y_axis:"Axe Y principal",lower_bound_use_n_for_soft:"Limite inférieure (utiliser ~N pour souple)",upper_bound_use_n_for_soft:"Limite supérieure (utiliser ~N pour souple)",minimum_range:"Plage minimale",threshold_transition:"Transition des seuils",color_thresholds:"Seuils de couleur",cache_data:"Mettre en cache les données",compress_data:"Compresser les données",group_entities:"Grouper les entités",time_format_24h:"Format 24 heures"},buttons:{hide:"Masquer",configure:"Configurer",remove_entity:"Supprimer l’entité",add_entity:"Ajouter une entité",add_threshold:"Ajouter un seuil",remove:"Supprimer"},placeholders:{card_title:"Titre de la carte",value:"Valeur",unit_example:"°C, kW, etc.",lower_bound_example:"0 ou ~0",upper_bound_example:"100 ou ~100"},options:{premium:"Premium",minimal:"Minimal",default:"Par défaut",left:"Gauche",right:"Droite",center:"Centre",with_state:"Avec l’état",median:"Médiane",minimum:"Minimum",maximum:"Maximum",first:"Premier",last:"Dernier",sum:"Somme",delta:"Delta",difference:"Différence",interval:"Intervalle",date:"Date",hour:"Heure",month:"Mois",smooth:"Progressive",hard:"Nette",primary:"Principal",secondary:"Secondaire",average:"Moyenne"},visibility:{visibility_options:"Options de visibilité",name:"Nom",state:"État",graph:"Graphique",fill:"Remplissage",points:"Points",legend:"Légende",extrema:"Extrema",average:"Moyenne",labels:"Étiquettes",secondary_labels:"Étiquettes secondaires"},tap_action:{tap_action:"Action lors de l’appui",hold_action:"Action lors d’un appui long",double_tap_action:"Action lors d’un double appui",action_type:"Type d’action",more_info:"Plus d’infos",navigate:"Naviguer",call_service:"Appeler un service",open_url:"Ouvrir une URL",no_action:"Aucune action",navigation_path:"Chemin de navigation",url:"URL",service:"Service"},entity:{custom_name:"Nom personnalisé",custom_color:"Couleur personnalisée",attribute_instead_of_state:"Attribut (au lieu de l’état)",y_axis:"Axe Y",show_state:"Afficher l’état",show_in_graph:"Afficher dans le graphique",show_line:"Afficher la ligne",show_fill:"Afficher le remplissage",show_points:"Afficher les points",show_in_legend:"Afficher dans la légende",smoothing:"Lissage",fixed_value:"Valeur fixe"}},card:{error:{entity_not_available:"Entité non disponible :",invalid_config:"Configuration invalide.",no_entities:"Veuillez définir au moins une entité via l’option « entities ».",entities_not_a_list:"Veuillez fournir l’option « entities » sous forme de liste.\n Voir {url}",line_color_options_removed:"« line_color_above/line_color_below » a été supprimé, veuillez utiliser « color_thresholds ».\n Voir {url}",thresholds_need_value:"Les premier et dernier seuils doivent avoir une « value » définie.\n Voir {url}"},a11y:{loading:"Chargement",graph_summary:"{name} : actuel {current}, plage sur {hours} h de {min} à {max}."},labels:{current:"Actuel"},display_type:{min:"min",avg:"moy",max:"max"},picker:{name:"Mini Graph Card",description:"La carte Mini Graph est une carte de graphique minimaliste et personnalisable"}}},es:{editor:{messages:{loading_home_assistant:"Cargando Home Assistant…",please_wait_while_the_editor_loads:"Espere mientras se carga el editor.",editor_error:"Error del editor",an_error_occurred_while_rendering_the_editor:"Se produjo un error al renderizar el editor:"},headers:{mini_graph_card_configuration:"Configuración de Mini Graph Card",complete_configuration_for_all_options:"Configuración completa de todas las opciones"},sections:{entities:"Entidades",add_configure_and_manage_all_your_entities:"Añade, configura y gestiona todas tus entidades",display_options:"Opciones de visualización",name_icon_and_visual_appearance_settings:"Nombre, icono y ajustes de apariencia visual",graph_settings:"Ajustes del gráfico",graph_type_colors_and_visual_properties:"Tipo de gráfico, colores y propiedades visuales",data_time:"Datos y período",data_aggregation_and_time_configuration:"Agregación de datos y configuración temporal",scale_bounds:"Escala y límites",y_axis_bounds_and_scaling_options:"Límites del eje Y y opciones de escala",colors_thresholds:"Colores y umbrales",color_configuration_and_dynamic_thresholds:"Configuración de colores y umbrales dinámicos",advanced_options:"Opciones avanzadas",advanced_options_and_performance_settings:"Opciones avanzadas y ajustes de rendimiento"},labels:{appearance:"Apariencia",primary_entity_will_be_converted_to_entities_list:"Entidad principal (se convertirá en lista de entidades)",card_name:"Nombre de la tarjeta",icon:"Icono",icon_image_url:"URL de la imagen del icono",unit:"Unidad",font_size:"Tamaño de fuente (%)",header_font_size_px:"Tamaño de fuente del encabezado (px)",header_alignment:"Alineación del encabezado",icon_alignment:"Alineación del icono",state_alignment:"Alineación del estado",decimal_places:"Decimales",height_px:"Altura (px)",line_width:"Grosor de línea",line_colors_comma_separated:"Colores de línea (separados por comas)",bar_spacing:"Espaciado de barras",enable_animation:"Activar animación",smooth_lines:"Líneas suavizadas",logarithmic_scale:"Escala logarítmica",hours_to_show:"Horas a mostrar",points_per_hour:"Puntos por hora",aggregate_function:"Función de agregación",group_by:"Agrupar por",update_interval_seconds:"Intervalo de actualización (segundos)",primary_y_axis:"Eje Y principal",lower_bound_use_n_for_soft:"Límite inferior (use ~N para suave)",upper_bound_use_n_for_soft:"Límite superior (use ~N para suave)",minimum_range:"Rango mínimo",threshold_transition:"Transición de umbrales",color_thresholds:"Umbrales de color",cache_data:"Almacenar datos en caché",compress_data:"Comprimir datos",group_entities:"Agrupar entidades",time_format_24h:"Formato de 24 horas"},buttons:{hide:"Ocultar",configure:"Configurar",remove_entity:"Eliminar entidad",add_entity:"Añadir entidad",add_threshold:"Añadir umbral",remove:"Eliminar"},placeholders:{card_title:"Título de la tarjeta",value:"Valor",unit_example:"°C, kW, etc.",lower_bound_example:"0 o ~0",upper_bound_example:"100 o ~100"},options:{premium:"Premium",minimal:"Mínimo",default:"Predeterminado",left:"Izquierda",right:"Derecha",center:"Centro",with_state:"Con el estado",median:"Mediana",minimum:"Mínimo",maximum:"Máximo",first:"Primero",last:"Último",sum:"Suma",delta:"Delta",difference:"Diferencia",interval:"Intervalo",date:"Fecha",hour:"Hora",month:"Mes",smooth:"Progresiva",hard:"Brusca",primary:"Principal",secondary:"Secundario",average:"Media"},visibility:{visibility_options:"Opciones de visibilidad",name:"Nombre",state:"Estado",graph:"Gráfico",fill:"Relleno",points:"Puntos",legend:"Leyenda",extrema:"Extremos",average:"Media",labels:"Etiquetas",secondary_labels:"Etiquetas secundarias"},tap_action:{tap_action:"Acción al tocar",hold_action:"Acción al mantener pulsado",double_tap_action:"Acción al tocar dos veces",action_type:"Tipo de acción",more_info:"Más información",navigate:"Navegar",call_service:"Llamar a un servicio",open_url:"Abrir URL",no_action:"Ninguna acción",navigation_path:"Ruta de navegación",url:"URL",service:"Servicio"},entity:{custom_name:"Nombre personalizado",custom_color:"Color personalizado",attribute_instead_of_state:"Atributo (en lugar del estado)",y_axis:"Eje Y",show_state:"Mostrar el estado",show_in_graph:"Mostrar en el gráfico",show_line:"Mostrar la línea",show_fill:"Mostrar el relleno",show_points:"Mostrar los puntos",show_in_legend:"Mostrar en la leyenda",smoothing:"Suavizado",fixed_value:"Valor fijo"}},card:{error:{entity_not_available:"Entidad no disponible:",invalid_config:"Configuración no válida.",no_entities:"Defina al menos una entidad mediante la opción «entities».",entities_not_a_list:"Proporcione la opción «entities» como una lista.\n Consulte {url}",line_color_options_removed:"«line_color_above/line_color_below» se ha eliminado, use «color_thresholds».\n Consulte {url}",thresholds_need_value:"El primer y el último umbral deben tener un «value» definido.\n Consulte {url}"},a11y:{loading:"Cargando",graph_summary:"{name}: actual {current}, rango en {hours} h de {min} a {max}."},labels:{current:"Actual"},display_type:{min:"mín",avg:"med",max:"máx"},picker:{name:"Mini Graph Card",description:"La tarjeta Mini Graph es una tarjeta de gráfico minimalista y personalizable"}}}},wt="en";function xt(e,t){return t.split(".").reduce((e,t)=>e&&"string"!=typeof e&&void 0!==e[t]?e[t]:void 0,e)}function $t(e,t,i){const n=function(e){let t=wt;e&&e.locale&&e.locale.language?t=e.locale.language:e&&e.language?t=e.language:"undefined"!=typeof navigator&&navigator.language&&(t=navigator.language);const i=String(t).toLowerCase().split("-")[0];return bt[i]?i:wt}(t);let r=xt(bt[n],e);return void 0===r&&(r=xt(bt[wt],e)),void 0===r||"string"!=typeof r?e:(i&&Object.keys(i).forEach(e=>{r=r.split(`{${e}}`).join(String(i[e]))}),r)}const St=(e,t)=>{for(let i=t,n=e.length;i<n;i+=1)if(null!=e[i].value)return i;throw new Error('Error in threshold interpolation: could not find right-nearest valued stop. Do the first and last thresholds have a set "value"?')};var kt,At;!function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(kt||(kt={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(At||(At={}));var Et=function(e,t,i,n){n=n||{},i=i??{};var r=new Event(t,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return r.detail=i,e.dispatchEvent(r),r},Ct={alert:"mdi:alert",automation:"mdi:playlist-play",calendar:"mdi:calendar",camera:"mdi:video",climate:"mdi:thermostat",configurator:"mdi:settings",conversation:"mdi:text-to-speech",device_tracker:"mdi:account",fan:"mdi:fan",group:"mdi:google-circles-communities",history_graph:"mdi:chart-line",homeassistant:"mdi:home-assistant",homekit:"mdi:home-automation",image_processing:"mdi:image-filter-frames",input_boolean:"mdi:drawing",input_datetime:"mdi:calendar-clock",input_number:"mdi:ray-vertex",input_select:"mdi:format-list-bulleted",input_text:"mdi:textbox",light:"mdi:lightbulb",mailbox:"mdi:mailbox",notify:"mdi:comment-alert",person:"mdi:account",plant:"mdi:flower",proximity:"mdi:apple-safari",remote:"mdi:remote",scene:"mdi:google-pages",script:"mdi:file-document",sensor:"mdi:eye",simple_alarm:"mdi:bell",sun:"mdi:white-balance-sunny",switch:"mdi:flash",timer:"mdi:timer",updater:"mdi:cloud-upload",vacuum:"mdi:robot-vacuum",water_heater:"mdi:thermometer",weblink:"mdi:open-in-new"};function Nt(e,t){if(e in Ct)return Ct[e];switch(e){case"alarm_control_panel":switch(t){case"armed_home":return"mdi:bell-plus";case"armed_night":return"mdi:bell-sleep";case"disarmed":return"mdi:bell-outline";case"triggered":return"mdi:bell-ring";default:return"mdi:bell"}case"binary_sensor":return t&&"off"===t?"mdi:radiobox-blank":"mdi:checkbox-marked-circle";case"cover":return"closed"===t?"mdi:window-closed":"mdi:window-open";case"lock":return t&&"unlocked"===t?"mdi:lock-open":"mdi:lock";case"media_player":return t&&"off"!==t&&"idle"!==t?"mdi:cast-connected":"mdi:cast";case"zwave":switch(t){case"dead":return"mdi:emoticon-dead";case"sleeping":return"mdi:sleep";case"initializing":return"mdi:timer-sand";default:return"mdi:z-wave"}default:return console.warn("Unable to find icon for domain "+e+" ("+t+")"),"mdi:bookmark"}}var It={humidity:"mdi:water-percent",illuminance:"mdi:brightness-5",temperature:"mdi:thermometer",pressure:"mdi:gauge",power:"mdi:flash",signal_strength:"mdi:wifi"},Mt={binary_sensor:function(e,t){var i="off"===e;switch(null==t?void 0:t.attributes.device_class){case"battery":return i?"mdi:battery":"mdi:battery-outline";case"battery_charging":return i?"mdi:battery":"mdi:battery-charging";case"cold":return i?"mdi:thermometer":"mdi:snowflake";case"connectivity":return i?"mdi:server-network-off":"mdi:server-network";case"door":return i?"mdi:door-closed":"mdi:door-open";case"garage_door":return i?"mdi:garage":"mdi:garage-open";case"power":case"plug":return i?"mdi:power-plug-off":"mdi:power-plug";case"gas":case"problem":case"safety":case"tamper":return i?"mdi:check-circle":"mdi:alert-circle";case"smoke":return i?"mdi:check-circle":"mdi:smoke";case"heat":return i?"mdi:thermometer":"mdi:fire";case"light":return i?"mdi:brightness-5":"mdi:brightness-7";case"lock":return i?"mdi:lock":"mdi:lock-open";case"moisture":return i?"mdi:water-off":"mdi:water";case"motion":return i?"mdi:walk":"mdi:run";case"occupancy":case"presence":return i?"mdi:home-outline":"mdi:home";case"opening":return i?"mdi:square":"mdi:square-outline";case"running":return i?"mdi:stop":"mdi:play";case"sound":return i?"mdi:music-note-off":"mdi:music-note";case"update":return i?"mdi:package":"mdi:package-up";case"vibration":return i?"mdi:crop-portrait":"mdi:vibrate";case"window":return i?"mdi:window-closed":"mdi:window-open";default:return i?"mdi:radiobox-blank":"mdi:checkbox-marked-circle"}},cover:function(e){var t="closed"!==e.state;switch(e.attributes.device_class){case"garage":return t?"mdi:garage-open":"mdi:garage";case"door":return t?"mdi:door-open":"mdi:door-closed";case"shutter":return t?"mdi:window-shutter-open":"mdi:window-shutter";case"blind":return t?"mdi:blinds-open":"mdi:blinds";case"window":return t?"mdi:window-open":"mdi:window-closed";default:return Nt("cover",e.state)}},sensor:function(e){var t=e.attributes.device_class;if(t&&t in It)return It[t];if("battery"===t){var i=Number(e.state);if(isNaN(i))return"mdi:battery-unknown";var n=10*Math.round(i/10);return n>=100?"mdi:battery":n<=0?"mdi:battery-alert":"hass:battery-"+n}var r=e.attributes.unit_of_measurement;return"°C"===r||"°F"===r?"mdi:thermometer":Nt("sensor")},input_datetime:function(e){return e.attributes.has_date?e.attributes.has_time?Nt("input_datetime"):"mdi:calendar":"mdi:clock"}};function Tt(e,t,i){return!Number.isNaN(Number(e))&&Intl?new Intl.NumberFormat(t,{minimumFractionDigits:i}).format(Number(e)):e.toString()}function Pt(e,t,i,n){if(!(e in Math))throw new Error(`The type "${e}" is not present on the Math object`);return void 0===i?Math[e](...t.map(t=>t[e]))||n:"string"!=typeof i||"~"!==i[0]?i:Math[e](Number(i.substring(1)),...t.map(t=>t[e]))}function Ot(e,t,i,n,r){let o=[Pt("min",e,t,n[0]),Pt("max",e,i,n[1])];if(r){const e=Math.abs(o[0]-o[1]),n=parseFloat(r)-e;if(n>0){const e=[void 0!==t&&"~"!==t[0]||void 0===i?0:1,void 0!==i&&"~"!==i[0]||void 0===t?0:1],r=e[0]+e[1];o=r>0?[o[0]-n*e[0]/r,o[1]+n*e[1]/r]:[o[0]-n/2,o[1]+n/2]}}return o}function zt(e,t,i){return`${t}_${e}${i?"":"_raw"}`}function Dt(e){const{height:t}=e.config;return G`
    <svg width='100%' height='100%' viewBox='0 0 500 ${t}' preserveAspectRatio='none'
      @click=${e=>e.stopPropagation()}>
      <g>
        <defs>
          ${function(e,t){if(!t)return;const i=t.map((t,i)=>{if(t)return G`
      <linearGradient id=${`grad-${e.id}-${i}`} gradientTransform="rotate(90)">
        ${t.map(e=>G`
          <stop stop-color=${e.color} offset=${`${e.offset}%`} />
        `)}
      </linearGradient>`});return G`${i}`}(e,e.gradient)}
        </defs>
        ${e.fill.map((t,i)=>function(e,t,i){if(!t)return;const n=e.length[i]||!1===e.config.entities[i].show_line;return G`
    <defs>
      <linearGradient id=${`fill-grad-${e.id}-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop stop-color='white' offset='0%' stop-opacity='1'/>
        <stop stop-color='white' offset='100%' stop-opacity='.15'/>
      </linearGradient>
      <mask id=${`fill-grad-mask-${e.id}-${i}`}>
        <rect width="100%" height="100%" fill=${`url(#fill-grad-${e.id}-${i})`} />
      </mask>
    </defs>
    <mask id=${`fill-${e.id}-${i}`}>
      <path class='fill'
        type=${e.config.show.fill}
        .id=${i} anim=${e.config.animate} ?init=${n}
        style="animation-delay: ${e.config.animate?.5*i+"s":"0s"}"
        fill='white'
        mask=""
        d=${e.fill[i]}
      />
    </mask>`}(e,t,i))}
        ${e.fill.map((t,i)=>function(e,t,i){if(!t)return;const n=e.gradient[i]?`url(#grad-${e.id}-${i})`:e.computeColor(e.entity[i].state,i);return G`
    <rect class='fill--rect'
      ?inactive=${void 0!==e.tooltip.entity&&e.tooltip.entity!==i}
      id=${`fill-rect-${e.id}-${i}`}
      fill=${n} height="100%" width="100%"
      mask=${`url(#fill-${e.id}-${i})`}
    />`}(e,t,i))}
        ${e.line.map((t,i)=>function(e,t,i){if(!t)return;const n=G`
    <path
      class='line'
      .id=${i}
      anim=${e.config.animate} ?init=${e.length[i]}
      style="animation-delay: ${e.config.animate?.5*i+"s":"0s"}"
      fill='none'
      stroke-dasharray=${e.length[i]||"none"} stroke-dashoffset=${e.length[i]||"none"}
      stroke=${"white"}
      stroke-width=${e.config.line_width}
      d=${e.line[i]}
    />`;return G`
    <mask id=${`line-${e.id}-${i}`}>
      ${n}
    </mask>
  `}(e,t,i))}
        ${e.line.map((t,i)=>function(e,t,i){if(!t)return;const n=e.gradient[i]?`url(#grad-${e.id}-${i})`:e.computeColor(e.entity[i].state,i);return G`
    <rect class='line--rect'
      ?inactive=${void 0!==e.tooltip.entity&&e.tooltip.entity!==i}
      id=${`rect-${e.id}-${i}`}
      fill=${n} height="100%" width="100%"
      mask=${`url(#line-${e.id}-${i})`}
    />`}(e,t,i))}
        ${e.bar.map((t,i)=>function(e,t,i){if(!t)return;const n=t.map((t,n)=>{const r=e.config.animate?G`
        <animate attributeName='y' from=${e.config.height} to=${t.y} dur='1s' fill='remove'
          calcMode='spline' keyTimes='0; 1' keySplines='0.215 0.61 0.355 1'>
        </animate>`:"",o=e.computeColor(t.value,i);return G`
      <rect class='bar' x=${t.x} y=${t.y}
        height=${t.height} width=${t.width} fill=${o}
        @mouseover=${()=>e.setTooltip(i,n,t.value)}
        @mouseout=${()=>{e.tooltip={}}}>
        ${r}
      </rect>`});return G`<g class='bars' ?anim=${e.config.animate}>${n}</g>`}(e,t,i))}
      </g>
      ${e.points.map((t,i)=>function(e,t,i){if(!t)return;const n=e.computeColor(e.entity[i].state,i);return G`
    <g class='line--points'
      ?tooltip=${e.tooltip.entity===i}
      ?inactive=${void 0!==e.tooltip.entity&&e.tooltip.entity!==i}
      ?init=${e.length[i]}
      anim=${e.config.animate&&"hover"!==e.config.show.points}
      style="animation-delay: ${e.config.animate?.5*i+.5+"s":"0s"}"
      fill=${n}
      stroke=${n}
      stroke-width=${e.config.line_width/2}>
      ${t.map(t=>function(e,t,i){const n=e.gradient[i]?e.computeColor(t[2],i):"inherit";return G`
    <circle
      class='line--point'
      ?inactive=${e.tooltip.index!==t[3]}
      style=${`--mcg-hover: ${n};`}
      stroke=${n}
      fill=${n}
      cx=${t[0]} cy=${t[1]} r=${e.config.line_width}
      @mouseover=${()=>e.setTooltip(i,t[3],t[2])}
      @mouseout=${()=>{e.tooltip={}}}
      data-entity-index=${i}
      data-point-value=${t[2]}
    />
  `}(e,t,i))}
    </g>`}(e,t,i))}
    </svg>`}const jt="0.23.0";_e.config({name:"mini-graph-card",version:1,storeName:"entity_history_cache",description:"Mini graph card uses caching for the entity history"}),_e.iterate((e,t)=>{const i=t.endsWith("-raw")?e:vt(e),n=new Date;n.setHours(n.getHours()-i.hours_to_show),(e.version!==jt||new Date(i.last_fetched)<n)&&_e.removeItem(t)}).catch(e=>{console.warn("Purging has errored: ",e)}),console.info(`%c MINI-GRAPH-CARD %c ${jt} `,"color: white; background: coral; font-weight: 700;","color: coral; background: white; font-weight: 700;");var Rt=o`
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
    `;const Lt={sensor:"mdi:gauge",binary_sensor:"mdi:radiobox-blank",switch:"mdi:toggle-switch",light:"mdi:lightbulb",climate:"mdi:thermostat",cover:"mdi:window-shutter",fan:"mdi:fan",lock:"mdi:lock",camera:"mdi:camera",media_player:"mdi:cast",device_tracker:"mdi:account",sun:"mdi:white-balance-sunny",weather:"mdi:weather-partly-cloudy"};function Ut(e){const t=e.split(".")[0];return Lt[t]||"mdi:help-circle"}let Bt=null;const Ft=e=>$t(e,Bt);class Ht extends le{static get properties(){return{hass:{attribute:!1},_config:{state:!0},_expandedSections:{state:!0},_expandedEntities:{state:!0}}}constructor(){super(),this._expandedSections={required:!0,display:!1,graph:!1,data:!1,bounds:!1,colors:!1,advanced:!1,entities:!1},this._expandedEntities=[]}setConfig(e){this._config={...e},this._config.entities&&(this._config.entities=this._config.entities.map(e=>"string"==typeof e?{entity:e}:{...e})),this.requestUpdate()}get _line_color(){return Array.isArray(this._config&&this._config.line_color)?this._config.line_color.join(", "):this._config&&this._config.line_color||""}get _animate(){return!this._config||!1!==this._config.animate}get _smoothing(){return!this._config||!1!==this._config.smoothing}get _cache(){return!this._config||!1!==this._config.cache}get _compress(){return!this._config||!1!==this._config.compress}get _lower_bound(){return this._config&&void 0!==this._config.lower_bound?this._config.lower_bound:""}get _upper_bound(){return this._config&&void 0!==this._config.upper_bound?this._config.upper_bound:""}get _decimals(){return this._config&&void 0!==this._config.decimals?this._config.decimals:""}_field(e,t,i,n="text"){return H`
      <div class="form-group">
        <label>${e}:</label>
        <ha-textfield
          type=${n}
          .value=${null==t?"":String(t)}
          @change=${e=>this._valueChanged(e,i)}
        ></ha-textfield>
      </div>
    `}_select(e,t,i,n){return H`
      <div class="form-group">
        <label>${e}:</label>
        <ha-select
          .value=${t}
          .naturalMenuWidth=${!0}
          .fixedMenuPosition=${!0}
          @selected=${e=>this._selectChanged(e,i,t)}
          @closed=${e=>e.stopPropagation()}
        >
          ${n.map(e=>H`<ha-list-item value=${e.value}>${e.label}</ha-list-item>`)}
        </ha-select>
      </div>
    `}_toggle(e,t,i){return H`
      <ha-formfield label=${e}>
        <ha-switch .checked=${t} @change=${e=>this._valueChanged(e,i)}></ha-switch>
      </ha-formfield>
    `}render(){if(Bt=this.hass,!this.hass)return H`
        <div class="loading">
          <h3>${Ft("editor.messages.loading_home_assistant")}</h3>
          <p>${Ft("editor.messages.please_wait_while_the_editor_loads")}</p>
        </div>
      `;try{return H`
        <div class="card-config">
          <div class="header">
            <h2>${Ft("editor.headers.mini_graph_card_configuration")}</h2>
            <p>${Ft("editor.headers.complete_configuration_for_all_options")}</p>
          </div>

          ${this.renderSection("entities",`🏠 ${Ft("editor.sections.entities")}`,Ft("editor.sections.add_configure_and_manage_all_your_entities"),this.renderEntitiesSection())}
          ${this.renderSection("display",`🎨 ${Ft("editor.sections.display_options")}`,Ft("editor.sections.name_icon_and_visual_appearance_settings"),this.renderDisplaySection())}
          ${this.renderSection("graph",`📊 ${Ft("editor.sections.graph_settings")}`,Ft("editor.sections.graph_type_colors_and_visual_properties"),this.renderGraphSection())}
          ${this.renderSection("data",`⏱️ ${Ft("editor.sections.data_time")}`,Ft("editor.sections.data_aggregation_and_time_configuration"),this.renderDataSection())}
          ${this.renderSection("bounds",`📏 ${Ft("editor.sections.scale_bounds")}`,Ft("editor.sections.y_axis_bounds_and_scaling_options"),this.renderBoundsSection())}
          ${this.renderSection("colors",`🎨 ${Ft("editor.sections.colors_thresholds")}`,Ft("editor.sections.color_configuration_and_dynamic_thresholds"),this.renderColorsSection())}
          ${this.renderSection("advanced",`⚙️ ${Ft("editor.sections.advanced_options")}`,Ft("editor.sections.advanced_options_and_performance_settings"),this.renderAdvancedSection())}
        </div>
      `}catch(e){return H`
        <div class="error">
          <h3>${Ft("editor.messages.editor_error")}</h3>
          <p>${Ft("editor.messages.an_error_occurred_while_rendering_the_editor")}: ${e.message}</p>
          <pre>${e.stack}</pre>
        </div>
      `}}renderEntitiesSection(){return H`
      ${0===this._entities.length?H`
        <div class="form-group">
          <label>${Ft("editor.labels.primary_entity_will_be_converted_to_entities_list")}:</label>
          ${this.renderEntityPicker(this._entity,e=>this._primaryEntityChanged(e))}
        </div>
      `:""}

      <div class="entities-section">
        ${this._entities.map((e,t)=>H`
          <div class="entity-management-row">
            <div class="entity-top-section">
              <div class="entity-picker-section">
                ${this.renderEntityPicker("string"==typeof e?e:e.entity,e=>this._entityListChanged(e,t))}
              </div>
              <div class="entity-info-section">
                ${(()=>{const t="string"==typeof e?e:e.entity,i=this.getEntityInfo(t);return H`
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
              <button class="btn-configure" @click="${()=>this._toggleEntityConfig(t)}">
                ${this._isEntityConfigExpanded(t)?Ft("editor.buttons.hide"):Ft("editor.buttons.configure")}
              </button>
              <button class="btn-remove" @click="${()=>this._removeEntity(t)}" title="${Ft("editor.buttons.remove_entity")}">×</button>
            </div>
          </div>
          ${this._isEntityConfigExpanded(t)?H`
            <div class="entity-config-expanded">
              ${this.renderEntityConfig(e,t)}
            </div>
          `:""}
        `)}
        <button class="btn-add" @click="${this._addEntity}">${Ft("editor.buttons.add_entity")}</button>
      </div>
    `}renderDisplaySection(){return H`
      <div class="form-row">
        ${this._field(Ft("editor.labels.card_name"),this._name,"name")}
        <div class="form-group">
          <label>${Ft("editor.labels.icon")}:</label>
          ${this.renderIconPicker(this._icon,e=>this._valueChanged(e,"icon"))}
        </div>
      </div>

      <div class="form-row">
        ${this._field(Ft("editor.labels.icon_image_url"),this._icon_image,"icon_image")}
        ${this._field(Ft("editor.labels.unit"),this._unit,"unit")}
      </div>

      <div class="form-row">
        ${this._field(Ft("editor.labels.font_size"),this._font_size,"font_size","number")}
        ${this._field(Ft("editor.labels.header_font_size_px"),this._font_size_header,"font_size_header","number")}
      </div>

      <div class="form-row">
        ${this._select(Ft("editor.labels.header_alignment"),this._align_header,"align_header",[{value:"default",label:Ft("editor.options.default")},{value:"left",label:Ft("editor.options.left")},{value:"right",label:Ft("editor.options.right")},{value:"center",label:Ft("editor.options.center")}])}
        ${this._select(Ft("editor.labels.icon_alignment"),this._align_icon,"align_icon",[{value:"left",label:Ft("editor.options.left")},{value:"right",label:Ft("editor.options.right")},{value:"center",label:Ft("editor.options.center")},{value:"state",label:Ft("editor.options.with_state")}])}
      </div>

      <div class="form-row">
        ${this._select(Ft("editor.labels.state_alignment"),this._align_state,"align_state",[{value:"left",label:Ft("editor.options.left")},{value:"right",label:Ft("editor.options.right")},{value:"center",label:Ft("editor.options.center")}])}
        ${this._field(Ft("editor.labels.decimal_places"),this._decimals,"decimals","number")}
      </div>

      <div class="show-options">
        <h4>${Ft("editor.visibility.visibility_options")}</h4>
        <div class="checkbox-grid">
          ${[{key:"name",label:Ft("editor.visibility.name")},{key:"icon",label:Ft("editor.labels.icon")},{key:"state",label:Ft("editor.visibility.state")},{key:"graph",label:Ft("editor.visibility.graph")},{key:"fill",label:Ft("editor.visibility.fill")},{key:"points",label:Ft("editor.visibility.points")},{key:"legend",label:Ft("editor.visibility.legend")},{key:"extrema",label:Ft("editor.visibility.extrema")},{key:"average",label:Ft("editor.visibility.average")},{key:"labels",label:Ft("editor.visibility.labels")},{key:"labels_secondary",label:Ft("editor.visibility.secondary_labels")}].map(e=>H`
            <div class="checkbox-item">
              <ha-formfield label=${e.label}>
                <ha-switch
                  .checked=${!1!==this._show[e.key]}
                  @change=${t=>this._showChanged(t,e.key)}
                ></ha-switch>
              </ha-formfield>
            </div>
          `)}
        </div>
      </div>
    `}renderGraphSection(){return H`
      <div class="form-row">
        ${this._field(Ft("editor.labels.height_px"),this._height,"height","number")}
        ${this._field(Ft("editor.labels.line_width"),this._line_width,"line_width","number")}
      </div>

      <div class="form-row">
        ${this._field(Ft("editor.labels.line_colors_comma_separated"),this._line_color,"line_color")}
        ${this._field(Ft("editor.labels.bar_spacing"),this._bar_spacing,"bar_spacing","number")}
      </div>

      <div class="form-row">
        <div class="form-group">${this._toggle(Ft("editor.labels.enable_animation"),this._animate,"animate")}</div>
        <div class="form-group">${this._toggle(Ft("editor.labels.smooth_lines"),this._smoothing,"smoothing")}</div>
      </div>

      <div class="form-row">
        <div class="form-group">${this._toggle(Ft("editor.labels.logarithmic_scale"),this._logarithmic,"logarithmic")}</div>
      </div>
    `}renderDataSection(){return H`
      <div class="form-row">
        ${this._field(Ft("editor.labels.hours_to_show"),this._hours_to_show,"hours_to_show","number")}
        ${this._field(Ft("editor.labels.points_per_hour"),this._points_per_hour,"points_per_hour","number")}
      </div>

      <div class="form-row">
        ${this._select(Ft("editor.labels.aggregate_function"),this._aggregate_func,"aggregate_func",[{value:"avg",label:Ft("editor.options.average")},{value:"median",label:Ft("editor.options.median")},{value:"min",label:Ft("editor.options.minimum")},{value:"max",label:Ft("editor.options.maximum")},{value:"first",label:Ft("editor.options.first")},{value:"last",label:Ft("editor.options.last")},{value:"sum",label:Ft("editor.options.sum")},{value:"delta",label:Ft("editor.options.delta")},{value:"diff",label:Ft("editor.options.difference")}])}
        ${this._select(Ft("editor.labels.group_by"),this._group_by,"group_by",[{value:"interval",label:Ft("editor.options.interval")},{value:"date",label:Ft("editor.options.date")},{value:"hour",label:Ft("editor.options.hour")},{value:"month",label:Ft("editor.options.month")}])}
      </div>

      <div class="form-row">
        ${this._field(Ft("editor.labels.update_interval_seconds"),this._update_interval,"update_interval","number")}
        <div class="form-group">${this._toggle(Ft("editor.labels.time_format_24h"),this._hour24,"hour24")}</div>
      </div>
    `}renderBoundsSection(){return H`
      <h4>${Ft("editor.labels.primary_y_axis")}</h4>
      <div class="form-row">
        ${this._field(Ft("editor.labels.lower_bound_use_n_for_soft"),this._lower_bound,"lower_bound")}
        ${this._field(Ft("editor.labels.upper_bound_use_n_for_soft"),this._upper_bound,"upper_bound")}
      </div>
      ${this._field(Ft("editor.labels.minimum_range"),this._min_bound_range,"min_bound_range","number")}
    `}renderColorsSection(){return H`
      ${this._select(Ft("editor.labels.threshold_transition"),this._color_thresholds_transition,"color_thresholds_transition",[{value:"smooth",label:Ft("editor.options.smooth")},{value:"hard",label:Ft("editor.options.hard")}])}

      <div class="thresholds-section">
        <div class="thresholds-header">
          <h4>${Ft("editor.labels.color_thresholds")}</h4>
          <button class="btn-add" @click="${this._addThreshold}">${Ft("editor.buttons.add_threshold")}</button>
        </div>

        ${this._color_thresholds.map((e,t)=>H`
          <div class="threshold-row">
            <ha-textfield
              type="number"
              .value=${void 0===e.value?"":String(e.value)}
              @change=${e=>this._thresholdChanged(e,t,"value")}
              placeholder="${Ft("editor.placeholders.value")}"
            ></ha-textfield>
            <input
              type="color"
              .value="${e.color}"
              @input="${e=>this._thresholdChanged(e,t,"color")}"
            />
            <button class="btn-remove" @click="${()=>this._removeThreshold(t)}">${Ft("editor.buttons.remove")}</button>
          </div>
        `)}
      </div>
    `}renderAdvancedSection(){return H`
      <div class="form-row">
        <div class="form-group">${this._toggle(Ft("editor.labels.cache_data"),this._cache,"cache")}</div>
        <div class="form-group">${this._toggle(Ft("editor.labels.compress_data"),this._compress,"compress")}</div>
      </div>

      <div class="form-group">${this._toggle(Ft("editor.labels.group_entities"),this._group,"group")}</div>

      ${this._select(Ft("editor.labels.appearance"),this._appearance,"appearance",[{value:"premium",label:Ft("editor.options.premium")},{value:"minimal",label:Ft("editor.options.minimal")}])}

      ${this.renderActionSection("tap_action","editor.tap_action.tap_action")}
      ${this.renderActionSection("hold_action","editor.tap_action.hold_action")}
      ${this.renderActionSection("double_tap_action","editor.tap_action.double_tap_action")}
    `}renderActionSection(e,t){const i=this._actionFor(e);return H`
      <div class="tap-action-section">
        <h4>${Ft(t)}</h4>
        <div class="form-row">
          <div class="form-group">
            <label>${Ft("editor.tap_action.action_type")}:</label>
            <ha-select
              .value=${i.action}
              .naturalMenuWidth=${!0}
              .fixedMenuPosition=${!0}
              @selected=${t=>this._actionChanged(t,e,"action")}
              @closed=${e=>e.stopPropagation()}
            >
              <ha-list-item value="more-info">${Ft("editor.tap_action.more_info")}</ha-list-item>
              <ha-list-item value="navigate">${Ft("editor.tap_action.navigate")}</ha-list-item>
              <ha-list-item value="call-service">${Ft("editor.tap_action.call_service")}</ha-list-item>
              <ha-list-item value="url">${Ft("editor.tap_action.open_url")}</ha-list-item>
              <ha-list-item value="none">${Ft("editor.tap_action.no_action")}</ha-list-item>
            </ha-select>
          </div>

          ${"navigate"===i.action?H`
            <div class="form-group">
              <label>${Ft("editor.tap_action.navigation_path")}:</label>
              <ha-textfield
                .value=${i.navigation_path||""}
                @change=${t=>this._actionChanged(t,e,"navigation_path")}
                placeholder="/lovelace/dashboard"
              ></ha-textfield>
            </div>
          `:""}

          ${"url"===i.action?H`
            <div class="form-group">
              <label>${Ft("editor.tap_action.url")}:</label>
              <ha-textfield
                .value=${i.url||""}
                @change=${t=>this._actionChanged(t,e,"url")}
                placeholder="https://example.com"
              ></ha-textfield>
            </div>
          `:""}

          ${"call-service"===i.action?H`
            <div class="form-group">
              <label>${Ft("editor.tap_action.service")}:</label>
              <ha-textfield
                .value=${i.service||""}
                @change=${t=>this._actionChanged(t,e,"service")}
                placeholder="light.toggle"
              ></ha-textfield>
            </div>
          `:""}
        </div>
      </div>
    `}renderSection(e,t,i,n){const r=this._expandedSections[e];return H`
      <div class="section">
        <div class="section-header ${r?"expanded":""}" @click="${()=>this._toggleSection(e)}">
          <div class="section-info">
            <div class="section-title">${t}</div>
            <div class="section-description">${i}</div>
          </div>
          <div class="section-toggle">${r?"▼":"▶"}</div>
        </div>
        ${r?H`<div class="section-content">${n}</div>`:""}
      </div>
    `}renderEntityPicker(e,t){try{if(this.hass&&customElements.get("ha-entity-picker"))return H`
          <ha-entity-picker
            .hass="${this.hass}"
            .value="${e}"
            @value-changed="${t}"
            allow-custom-entity
          ></ha-entity-picker>
        `}catch{}return H`
      <ha-textfield
        .value="${e}"
        @change="${t}"
        placeholder="sensor.temperature"
      ></ha-textfield>
    `}renderIconPicker(e,t){try{if(this.hass&&customElements.get("ha-icon-picker"))return H`
          <ha-icon-picker
            .hass="${this.hass}"
            .value="${e}"
            @value-changed="${t}"
          ></ha-icon-picker>
        `}catch{}return H`
      <ha-textfield
        .value="${e}"
        @change="${t}"
        placeholder="mdi:thermometer"
      ></ha-textfield>
    `}renderEntityConfig(e,t){const i="string"==typeof e?{}:e;return H`
      <div class="entity-config-content">
        <div class="form-row">
          <div class="form-group">
            <label>${Ft("editor.entity.custom_name")}:</label>
            <ha-textfield
              .value="${i.name||""}"
              @change="${e=>this._entityConfigChanged(e,t,"name")}"
            ></ha-textfield>
          </div>

          <div class="form-group">
            <label>${Ft("editor.entity.custom_color")}:</label>
            <input
              type="color"
              .value="${i.color||"#ff0000"}"
              @input="${e=>this._entityConfigChanged(e,t,"color")}"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>${Ft("editor.entity.attribute_instead_of_state")}:</label>
            <ha-textfield
              .value="${i.attribute||""}"
              @change="${e=>this._entityConfigChanged(e,t,"attribute")}"
              placeholder="temperature"
            ></ha-textfield>
          </div>

          <div class="form-group">
            <label>${Ft("editor.entity.y_axis")}:</label>
            <ha-select
              .value="${i.y_axis||"primary"}"
              .naturalMenuWidth=${!0}
              .fixedMenuPosition=${!0}
              @selected="${e=>this._entitySelectChanged(e,t,"y_axis",i.y_axis||"primary")}"
              @closed="${e=>e.stopPropagation()}"
            >
              <ha-list-item value="primary">${Ft("editor.options.primary")}</ha-list-item>
              <ha-list-item value="secondary">${Ft("editor.options.secondary")}</ha-list-item>
            </ha-select>
          </div>
        </div>

        <div class="entity-switches">
          ${[{key:"show_state",label:"editor.entity.show_state"},{key:"show_graph",label:"editor.entity.show_in_graph"},{key:"show_line",label:"editor.entity.show_line"},{key:"show_fill",label:"editor.entity.show_fill"},{key:"show_points",label:"editor.entity.show_points"},{key:"show_legend",label:"editor.entity.show_in_legend"},{key:"smoothing",label:"editor.entity.smoothing"},{key:"fixed_value",label:"editor.entity.fixed_value"}].map(e=>H`
            <div class="checkbox-item">
              <ha-formfield label=${Ft(e.label)}>
                <ha-switch
                  .checked=${!1!==i[e.key]}
                  @change=${i=>this._entityConfigChanged(i,t,e.key)}
                ></ha-switch>
              </ha-formfield>
            </div>
          `)}
        </div>
      </div>
    `}getEntityInfo(e){return function(e,t){const i=t.split(".")[0]||"unknown";if(!e||!e.states)return{entityId:t,friendlyName:t,icon:"mdi:help-circle",domain:i};const n=e.states[t];return n?{entityId:t,friendlyName:n.attributes.friendly_name||t,icon:n.attributes.icon||Ut(t),domain:i,state:n.state}:{entityId:t,friendlyName:t,icon:"mdi:help-circle-outline",domain:i}}(this.hass,e)}_readValue(e){const t=e.target;if(!t)return;if("ha-switch"===t.localName||"checkbox"===t.type)return t.checked;const i=e.detail;return i&&void 0!==i.value?i.value:"number"===t.type?""===t.value?void 0:Number(t.value):t.value}_selectChanged(e,t,i){const n=e.target.value;void 0!==n&&n!==i&&this._valueChanged(e,t)}_entitySelectChanged(e,t,i,n){const r=e.target.value;void 0!==r&&r!==n&&this._entityConfigChanged(e,t,i)}_toggleSection(e){this._expandedSections={...this._expandedSections,[e]:!this._expandedSections[e]},this.requestUpdate()}_primaryEntityChanged(e){const t=this._readValue(e);t&&!this._entities.length&&(this._config={...this._config,entities:[t]},delete this._config.entity,Et(this,"config-changed",{config:this._config}))}_addEntity(){const e=[...this._entities,""];this._config={...this._config,entities:e},Et(this,"config-changed",{config:this._config})}_removeEntity(e){const t=[...this._entities];t.splice(e,1),this._config={...this._config,entities:t},Et(this,"config-changed",{config:this._config})}_entityListChanged(e,t){const i=this._readValue(e);if(!i)return;const n=[...this._entities];n[t]=i,this._config={...this._config,entities:n},Et(this,"config-changed",{config:this._config})}_valueChanged(e,t){if(!this._config||!this.hass)return;let i=this._readValue(e);"line_color"===t&&"string"==typeof i&&i.includes(",")&&(i=i.split(",").map(e=>e.trim())),JSON.stringify(this._config[t])!==JSON.stringify(i)&&(this._config={...this._config,[t]:i},Et(this,"config-changed",{config:this._config}))}_showChanged(e,t){if(!this._config||!this.hass)return;const i=e.target.checked;this._config={...this._config,show:{...this._show,[t]:i}},Et(this,"config-changed",{config:this._config})}_addThreshold(){const e=[...this._color_thresholds,{value:0,color:"#ff0000"}];this._config={...this._config,color_thresholds:e},Et(this,"config-changed",{config:this._config})}_removeThreshold(e){const t=[...this._color_thresholds];t.splice(e,1),this._config={...this._config,color_thresholds:t},Et(this,"config-changed",{config:this._config})}_thresholdChanged(e,t,i){const n=[...this._color_thresholds];let r=e.target.value;"value"===i&&(r=Number(r)),n[t]={...n[t],[i]:r},this._config={...this._config,color_thresholds:n},Et(this,"config-changed",{config:this._config})}_actionFor(e){const t="tap_action"===e?{action:"more-info"}:{action:"none"};return(this._config?this._config[e]:void 0)||t}_actionChanged(e,t,i){const n=e.target.value,r=this._actionFor(t);if(n===r[i])return;const o={...r,[i]:n};this._config={...this._config,[t]:o},Et(this,"config-changed",{config:this._config})}_tapActionChanged(e,t){this._actionChanged(e,"tap_action",t)}_toggleEntityConfig(e){this._expandedEntities=this._expandedEntities||[];const t=this._expandedEntities.includes(e);this._expandedEntities=t?this._expandedEntities.filter(t=>t!==e):[...this._expandedEntities,e],this.requestUpdate()}_isEntityConfigExpanded(e){return this._expandedEntities&&this._expandedEntities.includes(e)}_entityConfigChanged(e,t,i){const n=[...this._entities],r="string"==typeof n[t]?{entity:n[t]}:{...n[t]};r[i]=this._readValue(e),n[t]=r,this._config={...this._config,entities:n},Et(this,"config-changed",{config:this._config})}static get styles(){return Rt}}Object.entries({entity:"",entities:[],name:"",icon:"",icon_image:"",unit:"",height:100,line_width:5,bar_spacing:4,hours_to_show:24,points_per_hour:.5,aggregate_func:"avg",group_by:"interval",update_interval:"",hour24:!1,min_bound_range:"",logarithmic:!1,color_thresholds:[],color_thresholds_transition:"smooth",font_size:100,font_size_header:14,align_header:"default",align_icon:"right",align_state:"left",group:!1,appearance:"premium",show:{},tap_action:{action:"more-info"}}).forEach(([e,t])=>{Object.defineProperty(Ht.prototype,`_${e}`,{get(){return this._config&&this._config[e]||t}})}),customElements.define("mini-graph-card-editor",Ht);const Gt=e=>!!e&&"none"!==e.action;customElements.define("mini-graph-card",class extends le{constructor(){super(),this._held=!1,this.id=Math.random().toString(36).substring(2,11),this.config={},this.bound=[0,0],this.boundSecondary=[0,0],this.length=[],this.entity=[],this.line=[],this.bar=[],this.abs=[],this.fill=[],this.points=[],this.gradient=[],this.tooltip={},this.updateQueue=[],this.updating=!1,this.stateChanged=!1,this.initial=!0,this._md5Config=void 0}static get styles(){return dt}set hass(e){this._hass=e;let t=!1;const i=[];this.config.entities.forEach((n,r)=>{this.config.entities[r].index=r;const o=e&&e.states[n.entity];o&&this.entity[r]!==o&&(this.entity[r]=o,i.push(`${o.entity_id}-${r}`),t=!0)}),t&&(this.stateChanged=!0,this.entity=[...this.entity],this.config.update_interval||this.updating?this.updateQueue=[...i,...this.updateQueue]:setTimeout(()=>{this.updateQueue=[...i,...this.updateQueue],this.updateData()},this.initial?0:1e3))}get hass(){return this._hass}static get properties(){return{id:{state:!0},_hass:{state:!0},config:{state:!0},entity:{state:!0},Graph:{state:!0},line:{state:!0},length:{state:!0},bound:{state:!0},boundSecondary:{state:!0},abs:{state:!0},tooltip:{state:!0},updateQueue:{state:!0},color:{state:!0}}}setConfig(e){if(!e)throw new Error($t("card.error.invalid_config",this._hass));if(!Array.isArray(e.entities)||0===e.entities.length)throw new Error($t("card.error.no_entities",this._hass));this.config=(e=>{if(!Array.isArray(e.entities))throw new Error($t("card.error.entities_not_a_list",null,{url:rt}));if(e.line_color_above||e.line_color_below)throw new Error($t("card.error.line_color_options_removed",null,{url:rt}));const t={animate:!1,hour24:!1,font_size:14,font_size_header:14,height:100,hours_to_show:24,points_per_hour:.5,aggregate_func:"avg",group_by:"interval",line_color:[...ot],color_thresholds:[],color_thresholds_transition:"smooth",line_width:5,bar_spacing:4,compress:!0,smoothing:!0,state_map:[],cache:!0,value_factor:0,tap_action:{action:"more-info"},...JSON.parse(JSON.stringify(e)),show:{...st,...e.show}};t.entities.forEach((e,i)=>{"string"==typeof e&&(t.entities[i]={entity:e})}),t.state_map.forEach((e,i)=>{"string"==typeof e&&(t.state_map[i]={value:e,label:e}),t.state_map[i].label=t.state_map[i].label||t.state_map[i].value}),"string"==typeof e.line_color&&(t.line_color=[e.line_color,...ot]),t.font_size=e.font_size/100*14||14,t.color_thresholds=((e,t)=>{const i=(e=>{if(!e||!e.length)return e;const t=e=>"string"==typeof e?void 0:e.value;if(null==t(e[0])||null==t(e[e.length-1]))throw new Error($t("card.error.thresholds_need_value",null,{url:rt}));let i=0,n=null;return e.map((r,o)=>{if(null!=t(r))return i=o,{...r};null==n?n=St(e,o):o>n&&(i=n,n=St(e,o));const a=t(e[i]),s=(t(e[n])-a)/(n-i);return{color:"string"==typeof r?r:r.color,value:s*o+a}})})(e);if(i.sort((e,t)=>t.value-e.value),"smooth"===t)return i;{const e=[].concat(...i.map((e,t)=>[e,{value:e.value-1e-4,color:i[t+1]?i[t+1].color:e.color}]));return e}})(t.color_thresholds,t.color_thresholds_transition);const i=t.hours_to_show>24?{day:"numeric",weekday:"short"}:{},n=t.hour24?{hourCycle:"h23"}:{hour12:!0};switch(t.format={...n,...i},t.group_by){case"month":case"date":t.points_per_hour=1/24;break;case"hour":t.points_per_hour=1}if("bar"===t.show.graph){const e=t.entities.length;t.hours_to_show*t.points_per_hour*e>96&&(t.points_per_hour=96/(t.hours_to_show*e),yt(`Not enough space, adjusting points_per_hour to ${t.points_per_hour}`))}return t})(e),this._md5Config=be.hash(JSON.stringify(this.config));const t=!((e,t)=>e.length===t.length&&e.every((e,i)=>e===t[i]))(this.config.entities||[],e.entities);this.Graph&&!t||(this._hass&&(this.hass=this._hass),this.Graph=this.config.entities.map(e=>new ct(500,this.config.height,[this.config.show.fill?0:this.config.line_width,this.config.line_width],this.config.hours_to_show,this.config.points_per_hour,e.aggregate_func||this.config.aggregate_func,this.config.group_by,((...e)=>e.find(e=>void 0!==e))(e.smoothing,this.config.smoothing,!e.entity.startsWith("binary_sensor.")),this.config.logarithmic)))}connectedCallback(){super.connectedCallback(),this.config.update_interval&&(window.requestAnimationFrame(()=>{this.updateOnInterval()}),this.interval=setInterval(()=>this.updateOnInterval(),1e3*this.config.update_interval))}disconnectedCallback(){this.interval&&clearInterval(this.interval),super.disconnectedCallback()}shouldUpdate(e){if(at.some(t=>e.has(t))){const e=void 0!==this.tooltip.value?this.tooltip.value:void 0!==this.entity[0]?this.getEntityState(0):void 0;return this.color=this.computeColor(e??0,this.tooltip.entity||0),!0}return!1}firstUpdated(){this.initial=!1}updated(e){this.config.animate&&e.has("line")&&(this.length.length<this.entity.length?(this.shadowRoot.querySelectorAll("svg path.line").forEach(e=>{this.length[Number(e.id)]=e.getTotalLength()}),this.length=[...this.length]):this.length=Array(this.entity.length).fill("none"))}render(){const{config:e}=this;if(!e||!this.entity||!this._hass)return W;if(this.dataset.appearance=e.appearance??"premium",this.config.entities.some((e,t)=>void 0===this.entity[t]))return this.renderWarnings();const t=[e.tap_action,e.hold_action,e.double_tap_action].some(e=>!!e&&"none"!==e.action),i=e.tap_action.entity||this.entity[0];return H`
      <ha-card
        class="flex"
        ?group=${e.group}
        ?fill=${e.show.graph&&e.show.fill}
        ?points=${"hover"===e.show.points}
        ?labels=${"hover"===e.show.labels}
        ?labels-secondary=${"hover"===e.show.labels_secondary}
        ?gradient=${e.color_thresholds.length>0}
        ?hover=${t}
        role=${t?"button":W}
        tabindex=${t?"0":W}
        aria-label=${e.name||this.computeName(0)}
        style="font-size: ${e.font_size}px;"
        @click=${e=>this._onCardTap(e,i)}
        @dblclick=${e=>this._onCardDblTap(e,i)}
        @pointerdown=${()=>this._onCardPointerDown(i)}
        @pointerup=${()=>this._onCardPointerUp()}
        @pointercancel=${()=>this._onCardPointerUp()}
        @keydown=${e=>this._handleKeydown(e,i)}
      >
        ${this.renderHeader()} ${this.renderStates()} ${this.renderGraph()} ${this.renderInfo()}
      </ha-card>
    `}renderWarnings(){return H`
      <hui-warning>
        <div>mini-graph-card</div>
        ${this.config.entities.map((e,t)=>this.entity[t]?H``:H`
          <div>
            ${$t("card.error.entity_not_available",this._hass)} ${this.config.entities[t].entity}
          </div>
        `)}
      </hui-warning>
    `}renderHeader(){const{show:e,align_icon:t,align_header:i,font_size_header:n}=this.config;return e.name||e.icon&&"state"!==t?H`
          <div class="header flex" loc=${i} style="font-size: ${n}px;">
            ${this.renderName()} ${"state"!==t?this.renderIcon():""}
          </div>
        `:""}renderIcon(){if(void 0!==this.config.icon_image)return H`
        <div class="icon">
          <img src="${this.config.icon_image}" height="25"/>
        </div>
      `;const{icon:e,icon_adaptive_color:t}=this.config.show;return e?H`
      <div class="icon" loc=${this.config.align_icon}
        style=${t?`color: ${this.color};`:""}>
        <ha-icon .icon=${this.computeIcon(this.entity[0])}></ha-icon>
      </div>
    `:""}renderName(){if(!this.config.show.name)return;const e=void 0!==this.tooltip.entity?this.computeName(this.tooltip.entity):this.config.name||this.computeName(0),t=this.config.show.name_adaptive_color?`opacity: 1; color: ${this.color};`:"";return H`
      <div class="name flex">
        <span class="ellipsis" style=${t}>${e}</span>
      </div>
    `}renderStates(){if(this.config.show.state)return H`
        <div class="states flex" loc=${this.config.align_state}>
          ${this.renderState(0)}
          <div class="states--secondary">${this.config.entities.map((e,t)=>t>0&&this.renderState(t)||"")}</div>
          ${"state"===this.config.align_icon?this.renderIcon():""}
        </div>
      `}getObjectAttr(e,t){return t.split(".").reduce((e,t)=>e&&e[t],e)}getEntityState(e){const t=this.config.entities[e];return"last"===this.config.show.state?this.points[e][this.points[e].length-1][2]:t.attribute?this.getObjectAttr(this.entity[e].attributes,t.attribute):this.entity[e].state}renderState(e){const t=0===e;if(t||this.config.entities[e].show_state){const i=this.getEntityState(e),{entity:n,value:r}=this.tooltip,o=t&&void 0!==n,a=o?r:i,s=o?n:e,l=this.config.entities[s];return H`
        <div
          class="state ${t?"":"state--small"}"
          @click=${t=>this.handlePopup(t,this.entity[e])}
          style=${l.state_adaptive_color?`color: ${this.computeColor(a,s)}`:""}>
          ${l.show_indicator?this.renderIndicator(a,s):""}
          <span class="state__value ellipsis">
            ${this.computeState(a)}
          </span>
          <span class="state__uom ellipsis">
            ${this.computeUom(s)}
          </span>
          ${t&&this.renderStateTime()||""}
        </div>
      `}}renderStateTime(){if(void 0!==this.tooltip.value)return H`
      <div class="state__time">
        ${this.tooltip.label?H`
          <span class="tooltip--label">${this.tooltip.label}</span>
        `:H`
          <span>${this.tooltip.time[0]}</span> -
          <span>${this.tooltip.time[1]}</span>
        `}
      </div>
    `}renderGraph(){const e=this.entity[0]&&!this.Graph.some((e,t)=>void 0===e._history&&!1!==this.config.entities[t].show_graph)||!1===this.config.show.loading_indicator;return this.config.show.graph?H`
      <div class="graph">
        ${e?H`
            <div class="graph__container">
              ${this.renderLabels()}
              ${this.renderLabelsSecondary()}
              <div class="graph__container__svg" aria-hidden="true">
                ${Dt(this)}
              </div>
            </div>
            ${this.renderGraphSummary()}
            ${this.renderLegend()}
        `:H`<ha-spinner aria-label="${$t("card.a11y.loading",this._hass)}" size="small"></ha-spinner>`}
      </div>`:""}renderGraphSummary(){if(!this.bound)return;const e=[];return this.config.entities.forEach((t,i)=>{if(!1===t.show_graph||!this.entity[i])return;const n="secondary"===t.y_axis?this.boundSecondary:this.bound;e.push($t("card.a11y.graph_summary",this._hass,{name:this.computeName(i),current:`${this.computeState(this.entity[i].state)} ${this.computeUom(i)}`.trim(),hours:this.config.hours_to_show,min:this.computeState(n[0]),max:this.computeState(n[1])}))}),0!==e.length?H`<div class="sr-only">${e.join(" ")}</div>`:void 0}computeLegend(e){let t=this.computeName(e);const i=this.getEntityState(e),{show_legend_state:n=!1}=this.config.entities[e];if(n){if(t+=` (${this.computeState(i)}`,!["unavailable"].includes(String(i))){const i=this.computeUom(e);["%",""].includes(i)||(t+=" "),t+=`${i}`}t+=")"}return t}renderLegend(){if(this.visibleLegends.length<=1||!this.config.show.legend)return;const e="none"!==this.config.tap_action.action;return H`
      <div class="graph__legend" role="list">
        ${this.visibleLegends.map(t=>{const i=this.computeLegend(t.index);return H`
            <div class="graph__legend__item"
              role=${e?"button":"listitem"}
              tabindex=${e?"0":W}
              aria-label=${i}
              @click=${e=>this.handlePopup(e,this.entity[t.index])}
              @keydown=${e=>this._handleKeydown(e,this.entity[t.index])}
              @mouseenter=${()=>this.setTooltip(t.index,-1,this.getEntityState(t.index),$t("card.labels.current",this._hass))}
              @mouseleave=${()=>{this.tooltip={}}}>
              ${this.renderIndicator(this.getEntityState(t.index),t.index)}
              <span class="ellipsis">${i}</span>
            </div>
          `})}
      </div>
    `}renderIndicator(e,t){return G`
      <svg width='10' height='10'>
        <rect width='10' height='10' fill=${this.computeColor(e,t)} />
      </svg>
    `}setTooltip(e,t,i,n=null){const{group_by:r,points_per_hour:o,hours_to_show:a,format:s}=this.config,l=gt(1/o),c=Math.ceil(a*o)-1-t,d="interval"!==r?6e4:0,h=this.getEndDate();h.setMilliseconds(h.getMilliseconds()-d-l*c);const u=mt(h,s,this._hass.language);h.setMilliseconds(h.getMilliseconds()+d-l);const p=mt(h,s,this._hass.language);this.tooltip={value:i,count:c,entity:e,time:[p,u],index:t,label:n}}renderLabels(){if(this.config.show.labels&&0!==this.primaryYaxisSeries.length)return H`
      <div class="graph__labels --primary flex">
        <span class="label--max">${this.computeState(this.bound[1])}</span>
        <span class="label--min">${this.computeState(this.bound[0])}</span>
      </div>
    `}renderLabelsSecondary(){if(this.config.show.labels_secondary&&0!==this.secondaryYaxisSeries.length)return H`
      <div class="graph__labels --secondary flex">
        <span class="label--max">${this.computeState(this.boundSecondary[1])}</span>
        <span class="label--min">${this.computeState(this.boundSecondary[0])}</span>
      </div>
    `}renderInfo(){return this.abs.length>0?H`
      <div class="info flex">
        ${this.abs.map(e=>H`
          <div class="info__item">
            <span class="info__item__type">${$t(`card.display_type.${e.type}`,this._hass)}</span>
            <span class="info__item__value">
              ${this.computeState(e.state)} ${this.computeUom(0)}
            </span>
            <span class="info__item__time">
              ${"avg"!==e.type?mt(new Date(e.last_changed),this.config.format,this._hass.language):""}
            </span>
          </div>
        `)}
      </div>
    `:H``}handlePopup(e,t){e.stopPropagation();const i="string"==typeof t?t:t.entity_id;ht(this,this._hass,this.config,this.config.tap_action,i)}_handleKeydown(e,t){"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this.handlePopup(e,t))}_actionConfigFor(e){return"hold"===e?this.config.hold_action:"double_tap"===e?this.config.double_tap_action:this.config.tap_action}_dispatchAction(e,t){const i=this._actionConfigFor(e);if(!i||"none"===i.action)return;const n="string"==typeof t?t:t.entity_id;ht(this,this._hass,this.config,i,n)}_onCardPointerDown(e){this._held=!1,Gt(this.config.hold_action)&&(this._holdTimer=setTimeout(()=>{this._held=!0,this._dispatchAction("hold",e)},500))}_onCardPointerUp(){this._holdTimer&&(clearTimeout(this._holdTimer),this._holdTimer=void 0)}_onCardTap(e,t){if(e.stopPropagation(),this._held)this._held=!1;else if(Gt(this.config.double_tap_action)){if(this._tapTimer)return;this._tapTimer=setTimeout(()=>{this._tapTimer=void 0,this._dispatchAction("tap",t)},250)}else this._dispatchAction("tap",t)}_onCardDblTap(e,t){e.stopPropagation(),this._tapTimer&&(clearTimeout(this._tapTimer),this._tapTimer=void 0),this._dispatchAction("double_tap",t)}get visibleEntities(){return this.config.entities.filter(e=>!1!==e.show_graph)}get primaryYaxisEntities(){return this.visibleEntities.filter(e=>void 0===e.y_axis||"primary"===e.y_axis)}get secondaryYaxisEntities(){return this.visibleEntities.filter(e=>"secondary"===e.y_axis)}get visibleLegends(){return this.visibleEntities.filter(e=>!1!==e.show_legend)}get primaryYaxisSeries(){return this.primaryYaxisEntities.map(e=>this.Graph[e.index])}get secondaryYaxisSeries(){return this.secondaryYaxisEntities.map(e=>this.Graph[e.index])}computeColor(e,t){return function(e,t,i){const{color_thresholds:n,line_color:r}=e,o=Number(t)||0;let a;if(n.length>0){const{color:e}=n.find(e=>e.value<o)||n.slice(-1)[0];a=e;const t=n.findIndex(e=>e.value<o),i=n[t],r=n[t-1];if(r){const e=(r.value-o)/(r.value-i.value);a=nt(r.color,i.color)(e)}else a=t?n[n.length-1].color:n[0].color}return e.entities[i].color||a||r[i]||r[0]}(this.config,e,t)}computeName(e){return function(e,t,i){return e.entities[i].name||t.attributes.friendly_name||t.entity_id}(this.config,this.entity[e],e)}computeIcon(e){return t=this.config,i=e,t.icon||i.attributes.icon||function(e){if(!e)return"mdi:bookmark";if(e.attributes.icon)return e.attributes.icon;var t=function(e){return e.substr(0,e.indexOf("."))}(e.entity_id);return t in Mt?Mt[t](e):Nt(t,e.state)}(i)||"hass:thermometer";var t,i}computeUom(e){return function(e,t,i){return void 0!==e.entities[i].unit?e.entities[i].unit:void 0!==e.unit?e.unit:e.entities[i].attribute?"":t.attributes.unit_of_measurement||""}(this.config,this.entity[e],e)}computeState(e){return function(e,t,i){if(e.state_map.length>0){const i=Number.isInteger(t)?e.state_map[t]:e.state_map.find(e=>e.value===t);if(i)return i.label;"string"==typeof t&&Number.isNaN(parseFloat(t))&&yt(`value [${t}] not found in state_map`)}let n;n="string"==typeof t?parseFloat(t.replace(/,/g,".")):Number(t);const r=e.decimals,o=10**e.value_factor;if(void 0===r||Number.isNaN(r)||Number.isNaN(n))return Tt(Math.round(n*o*100)/100,i);const a=10**r;return Tt((Math.round(n*o*a)/a).toFixed(r),i,r)}(this.config,e,this._hass.language)}updateOnInterval(){this.stateChanged&&!this.updating&&(this.stateChanged=!1,this.updateData())}async updateData(){const{config:e}=this;this.updating=!0;const t=this.getEndDate(),i=new Date(t);i.setMilliseconds(i.getMilliseconds()-gt(e.hours_to_show));try{const e=this.entity.map((e,n)=>this.updateEntity(e,n,i,t));await Promise.all(e)}catch(e){yt(e)}if(e.show.graph&&this.entity.forEach((e,t)=>{e&&this.Graph[t].update()}),this.updateBounds(),e.show.graph){let t=0;this.entity.forEach((i,n)=>{if(!i||0===this.Graph[n].coords.length)return;const r="secondary"===e.entities[n].y_axis?this.boundSecondary:this.bound;if([this.Graph[n].min,this.Graph[n].max]=[r[0],r[1]],"bar"===e.show.graph){const i=this.visibleEntities.length;this.bar[n]=this.Graph[n].getBars(t,i,e.bar_spacing),t+=1}else{const t=this.Graph[n].getPath();!1!==e.entities[n].show_line&&(this.line[n]=t),e.show.fill&&!1!==e.entities[n].show_fill&&(this.fill[n]=this.Graph[n].getFill(t)),e.show.points&&!1!==e.entities[n].show_points&&(this.points[n]=this.Graph[n].getPoints()),e.color_thresholds.length>0&&!e.entities[n].color&&(this.gradient[n]=this.Graph[n].computeGradient(e.color_thresholds,this.config.logarithmic))}}),this.line=[...this.line]}this.updating=!1,this.setNextUpdate()}updateBounds(){const{config:e}=this;this.bound=Ot(this.primaryYaxisSeries,e.lower_bound,e.upper_bound,this.bound,e.min_bound_range),this.boundSecondary=Ot(this.secondaryYaxisSeries,e.lower_bound_secondary,e.upper_bound_secondary,this.boundSecondary,e.min_bound_range_secondary)}async updateEntity(e,t,i,n){if(!e||!this.updateQueue.includes(`${e.entity_id}-${t}`)||!1===this.config.entities[t].show_graph)return;this.updateQueue=this.updateQueue.filter(i=>i!==`${e.entity_id}-${t}`);let r=[],o=i,a=!1,s=null;if(this.config.cache&&(s=await async function(e,t,i,n=_e){const r=await n.getItem(zt(e,t,i));return r?i?vt(r):r:null}(this._md5Config,`${e.entity_id}_${t}`,this.config.compress),s&&s.hours_to_show===this.config.hours_to_show&&(r=s.data)),r.length>0){let e=r.findIndex(e=>new Date(e.last_changed)>i);-1!==e?(e>0&&(e-=1,r[e].last_changed=i),r=r.slice(e,r.length),a=!0):r=[];const t=new Date(s.last_fetched);t>o&&(o=new Date(t.getTime()-1))}const l=await async function(e,t,i,n,r,o){if("function"==typeof e.callWS)try{return await async function(e,t,i,n,r,o){const a={type:"history/history_during_period",start_time:(i??new Date(0)).toISOString(),entity_ids:[t],minimal_response:!o,no_attributes:!o,significant_changes_only:!o};n&&(a.end_time=n.toISOString());const s=await e.callWS(a);let l=s&&s[t]||[];return r&&l.length>0&&(l=l.slice(1)),[l.map(e=>({state:e.s,last_changed:new Date(1e3*(e.lc??e.lu)).toISOString(),last_updated:new Date(1e3*e.lu).toISOString(),...e.a?{attributes:e.a}:{}}))]}(e,t,i,n,r,o)}catch{}return function(e,t,i,n,r,o){let a="history/period";return i&&(a+=`/${i.toISOString()}`),a+=`?filter_entity_id=${t}`,n&&(a+=`&end_time=${n.toISOString()}`),r&&(a+="&skip_initial_state"),o||(a+="&minimal_response&no_attributes"),o&&(a+="&significant_changes_only=0"),e.callApi("GET",a)}(e,t,i,n,r,o)}(this._hass,e.entity_id,o,n,!this.config.entities[t].attribute&&a,!!this.config.entities[t].attribute);if(l[0]&&l[0].length>0){const i=l[0];this.config.entities[t].attribute&&a&&i.shift(),(this.config.state_map.length>0||this.config.entities[t].attribute)&&i.forEach(e=>{this.config.entities[t].attribute&&(e.state=this.getObjectAttr(e.attributes,this.config.entities[t].attribute),delete e.attributes),this.config.state_map.length>0&&this._convertState(e)});const n=i.filter(e=>!Number.isNaN(parseFloat(e.state))).map(e=>({last_changed:this.config.entities[t].attribute?e.last_updated:e.last_changed,state:e.state}));r=[...r,...n],this.config.cache&&async function(e,t,i,n,r=_e){return n?r.setItem(zt(e,t,!0),_t(i)):r.setItem(zt(e,t,!1),i)}(this._md5Config,`${e.entity_id}_${t}`,{hours_to_show:this.config.hours_to_show,last_fetched:new Date,data:r,version:jt},this.config.compress).catch(e=>{yt(e),_e.clear()})}if(0!==r.length)if(this.entity[0]&&e.entity_id===this.entity[0].entity_id&&this.updateExtrema(r),!0===this.config.entities[t].fixed_value){const e=r[r.length-1];this.Graph[t].history=[e,e]}else this.Graph[t].history=r}updateExtrema(e){const{extrema:t,average:i}=this.config.show;var n,r;this.abs=[...t?[{type:"min",...(n=e,r="state",n.reduce((e,t)=>Number(t[r])<Number(e[r])?t:e,n[0]))}]:[],...i?[{type:"avg",state:pt(e,"state")}]:[],...t?[{type:"max",...ft(e,"state")}]:[]]}_convertState(e){const t=this.config.state_map.findIndex(t=>t.value===e.state);-1!==t&&(e.state=t)}getEndDate(){const e=new Date;switch(this.config.group_by){case"date":e.setDate(e.getDate()+1),e.setHours(0,0,0);break;case"hour":e.setHours(e.getHours()+1),e.setMinutes(0,0)}return e}setNextUpdate(){if(!this.config.update_interval){const e=1/this.config.points_per_hour;clearInterval(this.interval),this.interval=setInterval(()=>{this.updating||this.updateData()},e*lt)}}getGridOptions(){return{columns:12,rows:Math.max(2,this.calculateCardSize()),min_columns:6,min_rows:1}}getCardSize(){try{const e=this.shadowRoot&&this.shadowRoot.querySelector("ha-card");if(e&&e.getBoundingClientRect){const t=Math.ceil(e.getBoundingClientRect().height/50);if(Number.isFinite(t)&&t>0)return t}}catch{}return this.config.card_size||this.calculateCardSize()}calculateCardSize(){let e=1;return(this.config.show.name||this.config.show.icon)&&(e+=1),this.config.show.state&&(e+=1),this.config.show.graph&&(e+=Math.ceil(this.config.height/50)),this.config.show.legend&&this.visibleLegends.length>1&&(e+=1),this.abs&&this.abs.length>0&&(e+=1),e}static getConfigElement(){return document.createElement("mini-graph-card-editor")}static getStubConfig(e){return{entities:[(e?Object.keys(e.states).find(t=>Wt(e,t)):void 0)||"sensor.example"]}}});const qt=["counter","input_number","number"],Wt=(e,t)=>{const i=t.split(".")[0];if(qt.includes(i))return!0;if("sensor"!==i)return!1;const n=e.states[t];return!(!n||!n.attributes.unit_of_measurement&&!n.attributes.state_class)};window.customCards=window.customCards||[],window.customCards.push({type:"mini-graph-card",name:$t("card.picker.name"),preview:!0,description:$t("card.picker.description"),documentationURL:"https://github.com/foXaCe/mini-graph-card",getEntitySuggestion:(e,t)=>Wt(e,t)?{config:{type:"custom:mini-graph-card",entities:[{entity:t}]}}:null});
