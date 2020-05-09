!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.lib_json=t():e.lib_json=t()}("undefined"!=typeof self?self:this,(function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var l=t[n]={i:n,l:!1,exports:{}};return e[n].call(l.exports,l,l.exports,r),l.l=!0,l.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)r.d(n,l,function(t){return e[t]}.bind(null,l));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1)}([function(e,t,r){"use strict";t.STRINGIFY_OPTIONS_MINIMAL=function(){return{identifier_quote:'"',always_quote_identifiers:!0,literal_quote:'"'}},t.STRINGIFY_OPTIONS_STANDARD=function(){return{identifier_quote:'"',always_quote_identifiers:!0,literal_quote:'"',eol_char:"\n",tab_char:"    ",space_char:" "}},t.STRINGIFY_OPTIONS_VERYPRETTY=function(){return{identifier_quote:"'",literal_quote:'"',eol_char:"\n",tab_char:"    ",space_char:" ",always_quote_identifiers:!1,liberal_commas:!0,align_values:!0,extroverted_arrays:!0,extroverted_brackets:!0,extroverted_braces:!0}},t.stringify=function(e,t=null){function r(e,t){return"string"==typeof e?e:t}return(t=t||{}).identifier_quote=r(t.identifier_quote,'"'),t.literal_quote=r(t.literal_quote,'"'),t.eol_char=r(t.eol_char,""),t.tab_char=r(t.tab_char,""),t.space_char=r(t.space_char,""),t.always_quote_identifiers=!!t.always_quote_identifiers&&t.always_quote_identifiers,t.liberal_commas=!!t.liberal_commas&&t.liberal_commas,t.align_values=!!t.align_values&&t.align_values,t.extroverted_arrays=!!t.extroverted_arrays&&t.extroverted_arrays,t.extroverted_brackets=!!t.extroverted_brackets&&t.extroverted_brackets,t.extroverted_braces=!!t.extroverted_braces&&t.extroverted_braces,function e(t,r,n,l=null){let a="";if(void 0===t);else if("boolean"==typeof t)a+=t.toString();else if("number"==typeof t)a+=t.toString();else if("bigint"==typeof t)a+=t.toString();else if("string"==typeof t){let e=t.toString();n.literal_quote&&(e=e.replace(n.literal_quote,"\\"+n.literal_quote)),a+=`${n.literal_quote}${e}${n.literal_quote}`}else if("symbol"==typeof t);else if("function"==typeof t);else if("object"==typeof t)if(null===t)a+="null";else if(Array.isArray(t)){a+=n.eol_char,a+=n.tab_char.repeat(r),a+="["+n.space_char,a+=n.eol_char;for(let l=0;l<t.length;l++)a+=n.tab_char.repeat(r+1),a+=e(t[l],r+1,n,"array-element"),(l<t.length-1||n.liberal_commas)&&(a+=","+n.space_char),a+=n.eol_char;a+=n.tab_char.repeat(r),n.eol_char||(a+=n.space_char),a+="]"}else{"field-value"===l&&(a+=n.eol_char,a+=n.tab_char.repeat(r)),a+="{"+n.space_char,a+=n.eol_char;let i=Object.keys(t),o=0;i.map(e=>{e.length>o&&(o=e.length)});for(let l=0;l<i.length;l++){let f=i[l];a+=n.tab_char.repeat(r+1),a+=`${n.identifier_quote}${f}${n.identifier_quote}`,a+=":",n.align_values&&(a+=" ".repeat(o-f.length)),a+=n.space_char,a+=e(t[f],r+1,n,"field-value"),(l<i.length-1||n.liberal_commas)&&(a+=","+n.space_char),a+=n.eol_char}a+=n.tab_char.repeat(r),n.eol_char||(a+=n.space_char),a+="}"}return a}(e,0,t)}},function(e,t,r){"use strict";const n=r(2);t.traverse=n.traverse,t.has_path=function(e,t){return n.traverse(e,e=>{if(e.path===t)return!0})},t.find_name=function(e,t){return n.traverse(e,e=>{if(e.name===t)return e.path})},t.find_value=function(e,t){return n.traverse(e,e=>{if(e.value===t)return e.path})},t.get_value=function(e,t){return n.traverse(e,e=>{if(e.path===t)return e.value})},t.set_value=function(e,t,r){return n.traverse(e,e=>{if(e.path===t)return e.parent[e.name]=r,r})};const l=r(0);t.stringify=l.stringify,t.STRINGIFY_OPTIONS_MINIMAL=l.STRINGIFY_OPTIONS_MINIMAL(),t.STRINGIFY_OPTIONS_STANDARD=l.STRINGIFY_OPTIONS_STANDARD(),t.STRINGIFY_OPTIONS_VERYPRETTY=l.STRINGIFY_OPTIONS_VERYPRETTY();const a=r(3);t.tablify=a.tablify;const i=r(4);t.parse=i.parse,t.tokenize=i.tokenize,t.build_object=i.build_object,t.clone=function(e){let t=l.stringify(e),r=i.tokenize(t),n=i.build_object(r);return n};const o=r(5);t.calculate_transform=o.calculate_transform,t.apply_transform=o.apply_transform},function(e,t,r){"use strict";t.traverse=function(e,t){return function e(t,r,n,l,a,i){let o=t({parent:r,name:n,value:l,path:a,depth:i});if(void 0!==o)return o;if("object"==typeof l){if(null===l)return;if(Array.isArray(l)){for(let r=0;r<l.length;r++)if(o=e(t,l,r,l[r],a+`[${r}]`,i+1),void 0!==o)return o}else{let r=Object.keys(l);for(let n=0;n<r.length;n++){let f=r[n];if(o=e(t,l,f,l[f],a+"."+f,i+1),void 0!==o)return o}}}}(t,null,"$",e,"$",0)}},function(e,t,r){"use strict";const n=r(0);t.tablify=function(e,t={}){return(t=t||{}).literal_quote=t.literal_quote?t.literal_quote:'"',t.eol_char=t.eol_char?t.eol_char:"\n",t.tab_char=t.tab_char?t.tab_char:"    ",t.max_tablify_depth=t.max_tablify_depth?t.max_tablify_depth:2,function e(t,r,l,a=null){let i="",o=n.STRINGIFY_OPTIONS_MINIMAL;if(o.identifier_quote="",o.always_quote_identifiers=!1,o.literal_quote="",o.space_char=" ",r>l.max_tablify_depth)return n.stringify(t,o);if(void 0===t);else if("boolean"==typeof t)i+=t.toString();else if("number"==typeof t)i+=t.toString();else if("bigint"==typeof t)i+=t.toString();else if("string"==typeof t)i+=t.toString();else if("symbol"==typeof t);else if("function"==typeof t);else if("object"==typeof t)if(null===t)i+="null";else if(Array.isArray(t)){if("field-value"===a&&(i+=l.eol_char),0===t.length)return"";if("object"==typeof t[0]&&null!==t[0])if(Array.isArray(t[0]))for(let e=0;e<t.length;e++)i+=l.tab_char.repeat(r),i+=n.stringify(t[e],o),e<t.length-1&&(i+=l.eol_char);else{let e=Object.keys(t[0]),a=e.map(e=>e.length);for(let r=0;r<t.length;r++)for(let l=0;l<e.length;l++){let i=n.stringify(t[r][e[l]],o);a[l]<i.length&&(a[l]=i.length)}i+=l.tab_char.repeat(r);for(let t=0;t<e.length;t++){t>0&&(i+=" | ");let r=e[t];i+=r,i+="".padEnd(a[t]-r.length)}i+=l.eol_char,i+=l.tab_char.repeat(r);for(let t=0;t<e.length;t++)t>0&&(i+="-+-"),i+="-".repeat(a[t]);i+=l.eol_char;for(let f=0;f<t.length;f++){i+=l.tab_char.repeat(r);for(let r=0;r<e.length;r++){r>0&&(i+=" | ");let l=n.stringify(t[f][e[r]],o);i+=l,i+="".padEnd(a[r]-l.length)}f<t.length-1&&(i+=l.eol_char)}}else for(let n=0;n<t.length;n++)i+=l.tab_char.repeat(r),i+=e(t[n],r+1,l,"array-element"),n<t.length-1&&(i+=l.eol_char)}else{"field-value"===a&&(i+=l.eol_char);let n=Object.keys(t),o=0;n.forEach(e=>{e.length>o&&(o=e.length)});for(let a=0;a<n.length;a++){let f=n[a];i+=l.tab_char.repeat(r),i+=`${f}${"".padEnd(o-f.length)} : `,i+=e(t[f],r+1,l,"field-value"),a<f.length-1&&(i+=l.eol_char)}}return i}(e,0,t,null)}},function(e,t,r){"use strict";function n(e){let t=[],r="'\"",n=0;for(;n<e.length;){let l=e.charAt(n);if(" \t\n".includes(l))n++;else if("[]{}:,".includes(l))t.push({token:l,type:"delimiter",at:n}),n++;else if(r.includes(l)){let r=n;n++;let a="";for(;n<e.length;){let t=e.charAt(n);if(t===l){n++;break}"\\"===t&&(n++,t=n<e.length?e.charAt(n):""),a+=t,n++}t.push({token:a,type:"string",at:r})}else{let a=n;n++;let i=l;for(;n<e.length;){let t=e.charAt(n);if(" \t\n".includes(t)||"[]{}:,".includes(t)||r.includes(t))break;i+=t,n++}t.push({token:i,type:"literal",at:a})}}return t}function l(e){for(;e.length;){if("["===e[0].token){e.shift();let t=[];for(;"]"!==e[0].token;)t.push(l(e));return e.shift(),a(e),t}if("{"===e[0].token){e.shift();let t={};for(;"}"!==e[0].token;){let r=e.shift(),n=e.shift();if("literal"!==r.type&&"string"!==r.type)throw new Error(`At position [${r.at}]: Expected literal, found ${r.type} '${r.token}' instead.`,r);if(":"!==n.token)throw new Error(`At position [${n.at}]: Expected ':', found '${n.token}' instead.`,n);t[r.token]=l(e)}return e.shift(),a(e),t}{let t=e[0].token;return"literal"===e[0].type&&("null"===t.toLowerCase()?t=null:"true"===t.toLowerCase()?t=!0:"false"===t.toLowerCase()&&(t=!1),!isNaN(parseFloat(t))&&isFinite(t)&&(t=parseFloat(t))),e.shift(),a(e),t}}}function a(e){e.length&&","===e[0].token&&e.shift()}t.parse=function(e){return l(n(e))},t.tokenize=n,t.build_object=l},function(e,t,r){"use strict";t.calculate_transform=function(e,t){let r={root:"$",entries:[]};return function e(t,r,n,l){if(void 0===t){if(void 0===r)return;return void l.entries.push({path:n,type:"value missing",value:r,explanation:`${typeof t} !== ${typeof r}`})}if(void 0===r)return void l.entries.push({path:n,type:"value extraneous",value:r,explanation:`${typeof t} !== ${typeof r}`});if(typeof t!=typeof r)return void l.entries.push({path:n,type:"type mismatch",value:r,explanation:`${typeof t} !== ${typeof r}`});if("boolean"==typeof t||"number"==typeof t||"bigint"==typeof t||"string"==typeof t||null===t||null===r)return void(t!==r&&l.entries.push({path:n,type:"value mismatch",value:r,explanation:`${t} !== ${r}`}));if("object"==typeof t)if(Array.isArray(t))for(let a=0;a<t.length;a++)e(t[a],r[a],n+`[${a}]`,l);else{let a=Object.keys(t);for(let i=0;i<a.length;i++){let o=a[i];e(t[o],r[o],n+"."+o,l)}}return}(e,t,"$",r),r},t.apply_transform=function(e,t){return null}}])}));