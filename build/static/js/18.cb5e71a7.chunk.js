/*! For license information please see 18.cb5e71a7.chunk.js.LICENSE.txt */
(this["webpackJsonphyper-react"]=this["webpackJsonphyper-react"]||[]).push([[18],{127:function(e,t,r){"use strict";var n=r(3),o=r(35),i=r(47),a=r.n(i),c=r(0),u=r(48),l=r(1),s=["bsPrefix","className","noGutters","as"],f=["xxl","xl","lg","md","sm","xs"],p=c.forwardRef((function(e,t){var r=e.bsPrefix,i=e.className,c=e.noGutters,p=e.as,d=void 0===p?"div":p,b=Object(o.a)(e,s),v=Object(u.a)(r,"row"),g="".concat(v,"-cols"),y=[];return f.forEach((function(e){var t,r=b[e];delete b[e],t=null!=r&&"object"===typeof r?r.cols:r;var n="xs"!==e?"-".concat(e):"";null!=t&&y.push("".concat(g).concat(n,"-").concat(t))})),Object(l.jsx)(d,Object(n.a)(Object(n.a)({ref:t},b),{},{className:a.a.apply(void 0,[i,v,c&&"no-gutters"].concat(y))}))}));p.displayName="Row",p.defaultProps={noGutters:!1},t.a=p},136:function(e,t,r){"use strict";var n=r(3),o=r(35),i=r(47),a=r.n(i),c=r(0),u=r(48),l=r(118),s=r(1),f=["bsPrefix","active","children","className","as","linkAs","linkProps","href","title","target"],p=c.forwardRef((function(e,t){var r=e.bsPrefix,i=e.active,c=e.children,p=e.className,d=e.as,b=void 0===d?"li":d,v=e.linkAs,g=void 0===v?l.a:v,y=e.linkProps,m=e.href,h=e.title,O=e.target,j=Object(o.a)(e,f),D=Object(u.a)(r,"breadcrumb-item");return Object(s.jsx)(b,Object(n.a)(Object(n.a)({ref:t},j),{},{className:a()(D,p,{active:i}),"aria-current":i?"page":void 0,children:i?c:Object(s.jsx)(g,Object(n.a)(Object(n.a)({},y),{},{href:m,title:h,target:O,children:c}))}))}));p.displayName="BreadcrumbItem",p.defaultProps={active:!1,linkProps:{}};var d=p,b=["bsPrefix","className","listProps","children","label","as"],v=c.forwardRef((function(e,t){var r=e.bsPrefix,i=e.className,c=e.listProps,l=e.children,f=e.label,p=e.as,d=void 0===p?"nav":p,v=Object(o.a)(e,b),g=Object(u.a)(r,"breadcrumb");return Object(s.jsx)(d,Object(n.a)(Object(n.a)({"aria-label":f,className:i,ref:t},v),{},{children:Object(s.jsx)("ol",Object(n.a)(Object(n.a)({},c),{},{className:a()(g,null==c?void 0:c.className),children:l}))}))}));v.displayName="Breadcrumb",v.defaultProps={label:"breadcrumb",listProps:{}};t.a=Object.assign(v,{Item:d})},421:function(e,t,r){"use strict";r.d(t,"c",(function(){return o})),r.d(t,"a",(function(){return i})),r.d(t,"b",(function(){return a})),r.d(t,"d",(function(){return c})),r.d(t,"e",(function(){return l})),r.d(t,"f",(function(){return s}));var n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])})(e,t)};function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}var i=function(){return(i=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};function a(e,t,r,n){return new(r||(r=Promise))((function(o,i){function a(e){try{u(n.next(e))}catch(t){i(t)}}function c(e){try{u(n.throw(e))}catch(t){i(t)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,c)}u((n=n.apply(e,t||[])).next())}))}function c(e,t){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"===typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(i){return function(c){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,n=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(c){i=[6,c],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}}Object.create;function u(e,t){var r="function"===typeof Symbol&&e[Symbol.iterator];if(!r)return e;var n,o,i=r.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(n=i.next()).done;)a.push(n.value)}catch(c){o={error:c}}finally{try{n&&!n.done&&(r=i.return)&&r.call(i)}finally{if(o)throw o.error}}return a}function l(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(u(arguments[t]));return e}function s(e,t){for(var r=0,n=t.length,o=e.length;r<n;r++,o++)e[o]=t[r];return e}Object.create},657:function(e,t,r){"use strict";var n=r(0),o=r.n(n),i=r(28),a=r.n(i),c=r(421),u=new Map([["avi","video/avi"],["gif","image/gif"],["ico","image/x-icon"],["jpeg","image/jpeg"],["jpg","image/jpeg"],["mkv","video/x-matroska"],["mov","video/quicktime"],["mp4","video/mp4"],["pdf","application/pdf"],["png","image/png"],["zip","application/zip"],["doc","application/msword"],["docx","application/vnd.openxmlformats-officedocument.wordprocessingml.document"]]);function l(e,t){var r=function(e){var t=e.name;if(t&&-1!==t.lastIndexOf(".")&&!e.type){var r=t.split(".").pop().toLowerCase(),n=u.get(r);n&&Object.defineProperty(e,"type",{value:n,writable:!1,configurable:!1,enumerable:!0})}return e}(e);if("string"!==typeof r.path){var n=e.webkitRelativePath;Object.defineProperty(r,"path",{value:"string"===typeof t?t:"string"===typeof n&&n.length>0?n:e.name,writable:!1,configurable:!1,enumerable:!0})}return r}var s=[".DS_Store","Thumbs.db"];function f(e){return(null!==e.target&&e.target.files?b(e.target.files):[]).map((function(e){return l(e)}))}function p(e,t){return Object(c.b)(this,void 0,void 0,(function(){var r;return Object(c.d)(this,(function(n){switch(n.label){case 0:return e.items?(r=b(e.items).filter((function(e){return"file"===e.kind})),"drop"!==t?[2,r]:[4,Promise.all(r.map(v))]):[3,2];case 1:return[2,d(g(n.sent()))];case 2:return[2,d(b(e.files).map((function(e){return l(e)})))]}}))}))}function d(e){return e.filter((function(e){return-1===s.indexOf(e.name)}))}function b(e){for(var t=[],r=0;r<e.length;r++){var n=e[r];t.push(n)}return t}function v(e){if("function"!==typeof e.webkitGetAsEntry)return y(e);var t=e.webkitGetAsEntry();return t&&t.isDirectory?h(t):y(e)}function g(e){return e.reduce((function(e,t){return Object(c.e)(e,Array.isArray(t)?g(t):[t])}),[])}function y(e){var t=e.getAsFile();if(!t)return Promise.reject(e+" is not a File");var r=l(t);return Promise.resolve(r)}function m(e){return Object(c.b)(this,void 0,void 0,(function(){return Object(c.d)(this,(function(t){return[2,e.isDirectory?h(e):O(e)]}))}))}function h(e){var t=e.createReader();return new Promise((function(e,r){var n=[];!function o(){var i=this;t.readEntries((function(t){return Object(c.b)(i,void 0,void 0,(function(){var i,a,u;return Object(c.d)(this,(function(c){switch(c.label){case 0:if(t.length)return[3,5];c.label=1;case 1:return c.trys.push([1,3,,4]),[4,Promise.all(n)];case 2:return i=c.sent(),e(i),[3,4];case 3:return a=c.sent(),r(a),[3,4];case 4:return[3,6];case 5:u=Promise.all(t.map(m)),n.push(u),o(),c.label=6;case 6:return[2]}}))}))}),(function(e){r(e)}))}()}))}function O(e){return Object(c.b)(this,void 0,void 0,(function(){return Object(c.d)(this,(function(t){return[2,new Promise((function(t,r){e.file((function(r){var n=l(r,e.fullPath);t(n)}),(function(e){r(e)}))}))]}))}))}var j=r(696),D=r.n(j);function w(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"===typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,o=!1,i=void 0;try{for(var a,c=e[Symbol.iterator]();!(n=(a=c.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(u){o=!0,i=u}finally{try{n||null==c.return||c.return()}finally{if(o)throw i}}return r}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return x(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return x(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function x(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var F=function(e){e=Array.isArray(e)&&1===e.length?e[0]:e;var t=Array.isArray(e)?"one of ".concat(e.join(", ")):e;return{code:"file-invalid-type",message:"File type must be ".concat(t)}},P=function(e){return{code:"file-too-large",message:"File is larger than ".concat(e," bytes")}},A=function(e){return{code:"file-too-small",message:"File is smaller than ".concat(e," bytes")}},k={code:"too-many-files",message:"Too many files"};function S(e,t){var r="application/x-moz-file"===e.type||D()(e,t);return[r,r?null:F(t)]}function E(e,t,r){if(C(e.size))if(C(t)&&C(r)){if(e.size>r)return[!1,P(r)];if(e.size<t)return[!1,A(t)]}else{if(C(t)&&e.size<t)return[!1,A(t)];if(C(r)&&e.size>r)return[!1,P(r)]}return[!0,null]}function C(e){return void 0!==e&&null!==e}function R(e){var t=e.files,r=e.accept,n=e.minSize,o=e.maxSize,i=e.multiple,a=e.maxFiles;return!(!i&&t.length>1||i&&a>=1&&t.length>a)&&t.every((function(e){var t=w(S(e,r),1)[0],i=w(E(e,n,o),1)[0];return t&&i}))}function z(e){return"function"===typeof e.isPropagationStopped?e.isPropagationStopped():"undefined"!==typeof e.cancelBubble&&e.cancelBubble}function T(e){return e.dataTransfer?Array.prototype.some.call(e.dataTransfer.types,(function(e){return"Files"===e||"application/x-moz-file"===e})):!!e.target&&!!e.target.files}function I(e){e.preventDefault()}function N(e){return-1!==e.indexOf("MSIE")||-1!==e.indexOf("Trident/")}function L(e){return-1!==e.indexOf("Edge/")}function _(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window.navigator.userAgent;return N(e)||L(e)}function B(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return function(e){for(var r=arguments.length,n=new Array(r>1?r-1:0),o=1;o<r;o++)n[o-1]=arguments[o];return t.some((function(t){return!z(e)&&t&&t.apply(void 0,[e].concat(n)),z(e)}))}}function K(e){return function(e){if(Array.isArray(e))return $(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||G(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function M(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"===typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,o=!1,i=void 0;try{for(var a,c=e[Symbol.iterator]();!(n=(a=c.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(u){o=!0,i=u}finally{try{n||null==c.return||c.return()}finally{if(o)throw i}}return r}(e,t)||G(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function G(e,t){if(e){if("string"===typeof e)return $(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?$(e,t):void 0}}function $(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function q(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function J(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?q(Object(r),!0).forEach((function(t){U(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):q(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function U(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function W(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var H=Object(n.forwardRef)((function(e,t){var r=e.children,i=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=J(J({},Q),e),r=t.accept,o=t.disabled,i=t.getFilesFromEvent,a=t.maxSize,c=t.minSize,u=t.multiple,l=t.maxFiles,s=t.onDragEnter,f=t.onDragLeave,p=t.onDragOver,d=t.onDrop,b=t.onDropAccepted,v=t.onDropRejected,g=t.onFileDialogCancel,y=t.preventDropOnDocument,m=t.noClick,h=t.noKeyboard,O=t.noDrag,j=t.noDragEventsBubbling,D=t.validator,w=Object(n.useRef)(null),x=Object(n.useRef)(null),F=M(Object(n.useReducer)(X,V),2),P=F[0],A=F[1],C=P.isFocused,N=P.isFileDialogActive,L=P.draggedFiles,G=Object(n.useCallback)((function(){x.current&&(A({type:"openDialog"}),x.current.value=null,x.current.click())}),[A]),$=function(){N&&setTimeout((function(){x.current&&(x.current.files.length||(A({type:"closeDialog"}),"function"===typeof g&&g()))}),300)};Object(n.useEffect)((function(){return window.addEventListener("focus",$,!1),function(){window.removeEventListener("focus",$,!1)}}),[x,N,g]);var q=Object(n.useCallback)((function(e){w.current&&w.current.isEqualNode(e.target)&&(32!==e.keyCode&&13!==e.keyCode||(e.preventDefault(),G()))}),[w,x]),H=Object(n.useCallback)((function(){A({type:"focus"})}),[]),Y=Object(n.useCallback)((function(){A({type:"blur"})}),[]),Z=Object(n.useCallback)((function(){m||(_()?setTimeout(G,0):G())}),[x,m]),ee=Object(n.useRef)([]),te=function(e){w.current&&w.current.contains(e.target)||(e.preventDefault(),ee.current=[])};Object(n.useEffect)((function(){return y&&(document.addEventListener("dragover",I,!1),document.addEventListener("drop",te,!1)),function(){y&&(document.removeEventListener("dragover",I),document.removeEventListener("drop",te))}}),[w,y]);var re=Object(n.useCallback)((function(e){e.preventDefault(),e.persist(),le(e),ee.current=[].concat(K(ee.current),[e.target]),T(e)&&Promise.resolve(i(e)).then((function(t){z(e)&&!j||(A({draggedFiles:t,isDragActive:!0,type:"setDraggedFiles"}),s&&s(e))}))}),[i,s,j]),ne=Object(n.useCallback)((function(e){e.preventDefault(),e.persist(),le(e);var t=T(e);if(t&&e.dataTransfer)try{e.dataTransfer.dropEffect="copy"}catch(r){}return t&&p&&p(e),!1}),[p,j]),oe=Object(n.useCallback)((function(e){e.preventDefault(),e.persist(),le(e);var t=ee.current.filter((function(e){return w.current&&w.current.contains(e)})),r=t.indexOf(e.target);-1!==r&&t.splice(r,1),ee.current=t,t.length>0||(A({isDragActive:!1,type:"setDraggedFiles",draggedFiles:[]}),T(e)&&f&&f(e))}),[w,f,j]),ie=Object(n.useCallback)((function(e){e.preventDefault(),e.persist(),le(e),ee.current=[],T(e)&&Promise.resolve(i(e)).then((function(t){if(!z(e)||j){var n=[],o=[];t.forEach((function(e){var t=M(S(e,r),2),i=t[0],u=t[1],l=M(E(e,c,a),2),s=l[0],f=l[1],p=D?D(e):null;if(i&&s&&!p)n.push(e);else{var d=[u,f];p&&(d=d.concat(p)),o.push({file:e,errors:d.filter((function(e){return e}))})}})),(!u&&n.length>1||u&&l>=1&&n.length>l)&&(n.forEach((function(e){o.push({file:e,errors:[k]})})),n.splice(0)),A({acceptedFiles:n,fileRejections:o,type:"setFiles"}),d&&d(n,o,e),o.length>0&&v&&v(o,e),n.length>0&&b&&b(n,e)}})),A({type:"reset"})}),[u,r,c,a,l,i,d,b,v,j]),ae=function(e){return o?null:e},ce=function(e){return h?null:ae(e)},ue=function(e){return O?null:ae(e)},le=function(e){j&&e.stopPropagation()},se=Object(n.useMemo)((function(){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.refKey,r=void 0===t?"ref":t,n=e.onKeyDown,i=e.onFocus,a=e.onBlur,c=e.onClick,u=e.onDragEnter,l=e.onDragOver,s=e.onDragLeave,f=e.onDrop,p=W(e,["refKey","onKeyDown","onFocus","onBlur","onClick","onDragEnter","onDragOver","onDragLeave","onDrop"]);return J(J(U({onKeyDown:ce(B(n,q)),onFocus:ce(B(i,H)),onBlur:ce(B(a,Y)),onClick:ae(B(c,Z)),onDragEnter:ue(B(u,re)),onDragOver:ue(B(l,ne)),onDragLeave:ue(B(s,oe)),onDrop:ue(B(f,ie))},r,w),o||h?{}:{tabIndex:0}),p)}}),[w,q,H,Y,Z,re,ne,oe,ie,h,O,o]),fe=Object(n.useCallback)((function(e){e.stopPropagation()}),[]),pe=Object(n.useMemo)((function(){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.refKey,n=void 0===t?"ref":t,o=e.onChange,i=e.onClick,a=W(e,["refKey","onChange","onClick"]);return J(J({},U({accept:r,multiple:u,type:"file",style:{display:"none"},onChange:ae(B(o,ie)),onClick:ae(B(i,fe)),autoComplete:"off",tabIndex:-1},n,x)),a)}}),[x,r,u,ie,o]),de=L.length,be=de>0&&R({files:L,accept:r,minSize:c,maxSize:a,multiple:u,maxFiles:l}),ve=de>0&&!be;return J(J({},P),{},{isDragAccept:be,isDragReject:ve,isFocused:C&&!o,getRootProps:se,getInputProps:pe,rootRef:w,inputRef:x,open:ae(G)})}(W(e,["children"])),a=i.open,c=W(i,["open"]);return Object(n.useImperativeHandle)(t,(function(){return{open:a}}),[a]),o.a.createElement(n.Fragment,null,r(J(J({},c),{},{open:a})))}));H.displayName="Dropzone";var Q={disabled:!1,getFilesFromEvent:function(e){return Object(c.b)(this,void 0,void 0,(function(){return Object(c.d)(this,(function(t){return[2,(r=e,r.dataTransfer&&e.dataTransfer?p(e.dataTransfer,e.type):f(e))];var r}))}))},maxSize:1/0,minSize:0,multiple:!0,maxFiles:0,preventDropOnDocument:!0,noClick:!1,noKeyboard:!1,noDrag:!1,noDragEventsBubbling:!1,validator:null};H.defaultProps=Q,H.propTypes={children:a.a.func,accept:a.a.oneOfType([a.a.string,a.a.arrayOf(a.a.string)]),multiple:a.a.bool,preventDropOnDocument:a.a.bool,noClick:a.a.bool,noKeyboard:a.a.bool,noDrag:a.a.bool,noDragEventsBubbling:a.a.bool,minSize:a.a.number,maxSize:a.a.number,maxFiles:a.a.number,disabled:a.a.bool,getFilesFromEvent:a.a.func,onFileDialogCancel:a.a.func,onDragEnter:a.a.func,onDragLeave:a.a.func,onDragOver:a.a.func,onDrop:a.a.func,onDropAccepted:a.a.func,onDropRejected:a.a.func,validator:a.a.func};t.a=H;var V={isFocused:!1,isFileDialogActive:!1,isDragActive:!1,isDragAccept:!1,isDragReject:!1,draggedFiles:[],acceptedFiles:[],fileRejections:[]};function X(e,t){switch(t.type){case"focus":return J(J({},e),{},{isFocused:!0});case"blur":return J(J({},e),{},{isFocused:!1});case"openDialog":return J(J({},e),{},{isFileDialogActive:!0});case"closeDialog":return J(J({},e),{},{isFileDialogActive:!1});case"setDraggedFiles":var r=t.isDragActive,n=t.draggedFiles;return J(J({},e),{},{draggedFiles:n,isDragActive:r});case"setFiles":return J(J({},e),{},{acceptedFiles:t.acceptedFiles,fileRejections:t.fileRejections});case"reset":return J(J({},e),{},{isFileDialogActive:!1,isDragActive:!1,draggedFiles:[],acceptedFiles:[],fileRejections:[]});default:return e}}},696:function(e,t,r){"use strict";t.__esModule=!0,t.default=function(e,t){if(e&&t){var r=Array.isArray(t)?t:t.split(","),n=e.name||"",o=(e.type||"").toLowerCase(),i=o.replace(/\/.*$/,"");return r.some((function(e){var t=e.trim().toLowerCase();return"."===t.charAt(0)?n.toLowerCase().endsWith(t):t.endsWith("/*")?i===t.replace(/\/.*$/,""):o===t}))}return!0}}}]);
//# sourceMappingURL=18.cb5e71a7.chunk.js.map