import{r as t,R as r}from"./vendor.6b110da5.js";function n(t,r){return function(t){if(Array.isArray(t))return t}(t)||function(t,r){var n=t&&("undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"]);if(null==n)return;var e,i,a=[],o=!0,u=!1;try{for(n=n.call(t);!(o=(e=n.next()).done)&&(a.push(e.value),!r||a.length!==r);o=!0);}catch(c){u=!0,i=c}finally{try{o||null==n.return||n.return()}finally{if(u)throw i}}return a}(t,r)||function(t,r){if(!t)return;if("string"==typeof t)return e(t,r);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return e(t,r)}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function e(t,r){(null==r||r>t.length)&&(r=t.length);for(var n=0,e=new Array(r);n<r;n++)e[n]=t[n];return e}function i(r){var e="undefined"==typeof window,i=n(t.exports.useState((function(){return!e&&window.matchMedia(r).matches})),2),a=i[0],o=i[1];return t.exports.useLayoutEffect((function(){if(!e){var t=window.matchMedia(r),n=function(t){return o(t.matches)};return t.addListener(n),function(){return t.removeListener(n)}}}),[r]),a}function a(t,r){return function(t){if(Array.isArray(t))return t}(t)||function(t,r){var n=t&&("undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"]);if(null==n)return;var e,i,a=[],o=!0,u=!1;try{for(n=n.call(t);!(o=(e=n.next()).done)&&(a.push(e.value),!r||a.length!==r);o=!0);}catch(c){u=!0,i=c}finally{try{o||null==n.return||n.return()}finally{if(u)throw i}}return a}(t,r)||function(t,r){if(!t)return;if("string"==typeof t)return o(t,r);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return o(t,r)}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(t,r){(null==r||r>t.length)&&(r=t.length);for(var n=0,e=new Array(r);n<r;n++)e[n]=t[n];return e}var u={xs:{maxWidth:575,matchMedia:"(max-width: 575px)"},sm:{minWidth:576,maxWidth:767,matchMedia:"(min-width: 576px) and (max-width: 767px)"},md:{minWidth:768,maxWidth:991,matchMedia:"(min-width: 768px) and (max-width: 991px)"},lg:{minWidth:992,maxWidth:1199,matchMedia:"(min-width: 992px) and (max-width: 1199px)"},xl:{minWidth:1200,maxWidth:1599,matchMedia:"(min-width: 1200px) and (max-width: 1599px)"},xxl:{minWidth:1600,matchMedia:"(min-width: 1600px)"}},c=function(){var r,n=i(u.md.matchMedia),e=i(u.lg.matchMedia),o=i(u.xxl.matchMedia),c=i(u.xl.matchMedia),d=i(u.sm.matchMedia),f=i(u.xs.matchMedia),m=a(t.exports.useState((r="md","undefined"==typeof window?r:r=Object.keys(u).find((function(t){var r=u[t].matchMedia;return!!window.matchMedia(r).matches})))),2),l=m[0],h=m[1];return t.exports.useEffect((function(){h(o?"xxl":c?"xl":e?"lg":n?"md":d?"sm":f?"xs":"md")}),[n,e,o,c,d,f]),l};function d(t){var n=r.createContext(null);return{Provider:function(e){var i=t(e.initialState);return r.createElement(n.Provider,{value:i},e.children)},useContainer:function(){var t=r.useContext(n);if(null===t)throw new Error("Component must be wrapped with <Container.Provider>");return t}}}function f(t){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var m=function(t){return JSON.stringify(t,(r=new WeakSet,function(t,n){if("object"===f(n)&&null!==n){if(r.has(n))return;r.add(n)}return n}));var r};export{d as c,m as s,c as u};
