(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{1118:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return n(4581)}])},1210:function(e,t){"use strict";function n(e,t,n,r){return!1}Object.defineProperty(t,"__esModule",{value:!0}),t.getDomainLocale=n,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},8418:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(4941).Z;n(5753).default,Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n(2648).Z,a=n(7273).Z,u=o(n(7294)),l=n(6273),c=n(2725),i=n(3462),f=n(1018),s=n(7190),d=n(1210),p=n(8684),v={};function h(e,t,n,r){if(e&&l.isLocalURL(t)){Promise.resolve(e.prefetch(t,n,r)).catch(function(e){});var o=r&&void 0!==r.locale?r.locale:e&&e.locale;v[t+"%"+n+(o?"%"+o:"")]=!0}}var y=u.default.forwardRef(function(e,t){var n,o,y=e.href,b=e.as,j=e.children,x=e.prefetch,_=e.passHref,g=e.replace,m=e.shallow,C=e.scroll,O=e.locale,M=e.onClick,L=e.onMouseEnter,P=e.onTouchStart,E=e.legacyBehavior,R=void 0===E?!0!==Boolean(!1):E,w=a(e,["href","as","children","prefetch","passHref","replace","shallow","scroll","locale","onClick","onMouseEnter","onTouchStart","legacyBehavior"]);n=j,R&&("string"==typeof n||"number"==typeof n)&&(n=u.default.createElement("a",null,n));var k=!1!==x,T=u.default.useContext(i.RouterContext),S=u.default.useContext(f.AppRouterContext);S&&(T=S);var N=u.default.useMemo(function(){var e=r(l.resolveHref(T,y,!0),2),t=e[0],n=e[1];return{href:t,as:b?l.resolveHref(T,b):n||t}},[T,y,b]),I=N.href,A=N.as,B=u.default.useRef(I),D=u.default.useRef(A);R&&(o=u.default.Children.only(n));var U=R?o&&"object"==typeof o&&o.ref:t,H=r(s.useIntersection({rootMargin:"200px"}),3),Z=H[0],K=H[1],G=H[2],X=u.default.useCallback(function(e){(D.current!==A||B.current!==I)&&(G(),D.current=A,B.current=I),Z(e),U&&("function"==typeof U?U(e):"object"==typeof U&&(U.current=e))},[A,U,I,G,Z]);u.default.useEffect(function(){var e=K&&k&&l.isLocalURL(I),t=void 0!==O?O:T&&T.locale,n=v[I+"%"+A+(t?"%"+t:"")];e&&!n&&h(T,I,A,{locale:t})},[A,I,K,O,k,T]);var q={ref:X,onClick:function(e){R||"function"!=typeof M||M(e),R&&o.props&&"function"==typeof o.props.onClick&&o.props.onClick(e),e.defaultPrevented||function(e,t,n,r,o,a,c,i,f,s){if("A"!==e.currentTarget.nodeName.toUpperCase()||(!(p=(d=e).currentTarget.target)||"_self"===p)&&!d.metaKey&&!d.ctrlKey&&!d.shiftKey&&!d.altKey&&(!d.nativeEvent||2!==d.nativeEvent.which)&&l.isLocalURL(n)){e.preventDefault();var d,p,v=function(){"beforePopState"in t?t[o?"replace":"push"](n,r,{shallow:a,locale:i,scroll:c}):t[o?"replace":"push"](n,{forceOptimisticNavigation:!s})};f?u.default.startTransition(v):v()}}(e,T,I,A,g,m,C,O,Boolean(S),k)},onMouseEnter:function(e){R||"function"!=typeof L||L(e),R&&o.props&&"function"==typeof o.props.onMouseEnter&&o.props.onMouseEnter(e),!(!k&&S)&&l.isLocalURL(I)&&h(T,I,A,{priority:!0})},onTouchStart:function(e){R||"function"!=typeof P||P(e),R&&o.props&&"function"==typeof o.props.onTouchStart&&o.props.onTouchStart(e),!(!k&&S)&&l.isLocalURL(I)&&h(T,I,A,{priority:!0})}};if(!R||_||"a"===o.type&&!("href"in o.props)){var z=void 0!==O?O:T&&T.locale,F=T&&T.isLocaleDomain&&d.getDomainLocale(A,z,T.locales,T.domainLocales);q.href=F||p.addBasePath(c.addLocale(A,z,T&&T.defaultLocale))}return R?u.default.cloneElement(o,q):u.default.createElement("a",Object.assign({},w,q),n)});t.default=y,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},7190:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(4941).Z;Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(e){var t=e.rootRef,n=e.rootMargin,i=e.disabled||!u,f=r(o.useState(!1),2),s=f[0],d=f[1],p=r(o.useState(null),2),v=p[0],h=p[1];return o.useEffect(function(){if(u){if(!i&&!s&&v&&v.tagName){var e,r,o,f,p,h,y;return r=function(e){return e&&d(e)},p=(f=function(e){var t,n={root:e.root||null,margin:e.rootMargin||""},r=c.find(function(e){return e.root===n.root&&e.margin===n.margin});if(r&&(t=l.get(r)))return t;var o=new Map;return t={id:n,observer:new IntersectionObserver(function(e){e.forEach(function(e){var t=o.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)})},e),elements:o},c.push(n),l.set(n,t),t}(o={root:null==t?void 0:t.current,rootMargin:n})).id,h=f.observer,(y=f.elements).set(v,r),h.observe(v),function(){if(y.delete(v),h.unobserve(v),0===y.size){h.disconnect(),l.delete(p);var e=c.findIndex(function(e){return e.root===p.root&&e.margin===p.margin});e>-1&&c.splice(e,1)}}}}else if(!s){var b=a.requestIdleCallback(function(){return d(!0)});return function(){return a.cancelIdleCallback(b)}}},[v,i,n,t,s]),[h,s,o.useCallback(function(){d(!1)},[])]};var o=n(7294),a=n(9311),u="function"==typeof IntersectionObserver,l=new Map,c=[];("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1018:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.TemplateContext=t.GlobalLayoutRouterContext=t.LayoutRouterContext=t.AppRouterContext=void 0;var r=(0,n(2648).Z)(n(7294)),o=r.default.createContext(null);t.AppRouterContext=o;var a=r.default.createContext(null);t.LayoutRouterContext=a;var u=r.default.createContext(null);t.GlobalLayoutRouterContext=u;var l=r.default.createContext(null);t.TemplateContext=l},4581:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.r(t),n.d(t,{default:function(){return v}});var o=n(5893);n(906);var a=n(1664),u=n.n(a);function l(){return(0,o.jsx)(u(),{href:"/",children:(0,o.jsx)("a",{children:"車両管理システム"})})}var c=n(241),i=n.n(c);function f(){return(0,o.jsx)("nav",{className:i().list,children:(0,o.jsxs)("ul",{children:[(0,o.jsx)("li",{children:(0,o.jsx)(u(),{href:"/",children:(0,o.jsx)("a",{children:"Home"})})}),(0,o.jsx)("li",{children:(0,o.jsx)(u(),{href:"/cars",children:(0,o.jsx)("a",{children:"CARS"})})}),(0,o.jsx)("li",{children:(0,o.jsx)(u(),{href:"/blog",children:(0,o.jsx)("a",{children:"Blog"})})})]})})}function s(){return(0,o.jsxs)("header",{children:[(0,o.jsx)(l,{}),(0,o.jsx)(f,{})]})}function d(){return(0,o.jsx)("footer",{})}function p(e){var t=e.children;return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(s,{}),(0,o.jsx)("main",{children:t}),(0,o.jsx)(d,{})]})}var v=function(e){var t=e.Component,n=e.pageProps;return(0,o.jsx)(p,{children:(0,o.jsx)(t,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),o.forEach(function(t){r(e,t,n[t])})}return e}({},n))})}},241:function(e){e.exports={list:"nav_list__D__MA"}},906:function(){},1664:function(e,t,n){e.exports=n(8418)}},function(e){var t=function(t){return e(e.s=t)};e.O(0,[774,179],function(){return t(1118),t(387)}),_N_E=e.O()}]);