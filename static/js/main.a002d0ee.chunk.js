(this["webpackJsonpcards-nya"]=this["webpackJsonpcards-nya"]||[]).push([[0],{26:function(e,t,n){},27:function(e,t,n){},28:function(e,t,n){},30:function(e,t,n){},31:function(e,t,n){},32:function(e,t,n){},33:function(e,t,n){},34:function(e,t,n){},35:function(e,t,n){},36:function(e,t,n){},37:function(e,t,n){},38:function(e,t,n){},47:function(e,t,n){},49:function(e,t,n){"use strict";n.r(t);var c,a=n(0),s=n.n(a),o=n(14),r=n.n(o),i=(n(26),n(27),n(10)),j=n(3),l=(n(28),n(1)),u=function(){return Object(l.jsx)("div",{children:Object(l.jsx)("h1",{children:"Login"})})},b=(n(30),function(){return Object(l.jsx)("div",{})}),h=(n(31),function(){return Object(l.jsx)("div",{children:Object(l.jsx)("h1",{children:"New Password"})})}),d=function(){return Object(l.jsx)("div",{children:Object(l.jsx)("h1",{children:"Registration"})})},O=function(){return Object(l.jsx)("div",{children:Object(l.jsx)("h1",{children:"PageNotFound"})})},p=(n(32),function(){return Object(l.jsx)("div",{children:Object(l.jsx)("h1",{children:"Profile"})})}),x=n(12),m=n(7),_=n(6),v=(n(33),function(e){var t=e.red,n=e.className,c=Object(_.a)(e,["red","className"]),a="".concat(t?"superButton__red":"superButton__default"," ").concat(n);return Object(l.jsx)("button",Object(m.a)({className:a},c))}),N=(n(34),function(e){e.type;var t=e.onChange,n=e.onChangeChecked,c=e.className,a=(e.spanClassName,e.children),s=Object(_.a)(e,["type","onChange","onChangeChecked","className","spanClassName","children"]),o="checkbox".concat(" ",c||"");return Object(l.jsxs)("label",{className:"container",children:[Object(l.jsx)("input",Object(m.a)({type:"checkbox",onChange:function(e){n&&n(e.currentTarget.checked),t&&t(e)},className:o},s)),Object(l.jsx)("span",{className:"checkmark",children:"\xa0"}),a&&Object(l.jsx)("span",{className:"spanClassName",children:a})]})}),f=(n(35),function(e){var t=e.type,n=void 0===t?"text":t,c=e.onChange,a=e.onChangeText,s=e.onKeyPress,o=e.onEnter,r=e.error,i=e.className,j=e.spanClassName,u=Object(_.a)(e,["type","onChange","onChangeText","onKeyPress","onEnter","error","className","spanClassName"]),b="superInput__error".concat(" ",j||""),h="superInput".concat(" ",i||""," ").concat(r?"superInput__errorInput":"");return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("input",Object(m.a)({type:n,onChange:function(e){c&&c(e),a&&a(e.currentTarget.value)},onKeyPress:function(e){s&&s(e),"Enter"===e.key&&o&&o()},className:h},u)),r&&Object(l.jsx)("span",{className:b,children:r})]})}),g=(n(36),function(e){e.autoFocus;var t=e.onBlur,n=e.onEnter,c=e.spanProps,s=Object(_.a)(e,["autoFocus","onBlur","onEnter","spanProps"]),o=Object(a.useState)(!1),r=Object(x.a)(o,2),i=r[0],j=r[1],u=c||{},b=u.children,h=u.onDoubleClick,d=u.className,O=Object(_.a)(u,["children","onDoubleClick","className"]),p="".concat(i?"":"isEditable"," ").concat(d);return Object(l.jsx)(l.Fragment,{children:i?Object(l.jsx)(f,Object(m.a)({autoFocus:!0,onBlur:function(e){j(!1),t&&t(e)},onEnter:function(){j(!1),n&&n()}},s)):Object(l.jsx)("span",Object(m.a)(Object(m.a)({onDoubleClick:function(e){j(!0),h&&h(e)},className:p},O),{},{children:b||s.value}))})}),C=function(e){e.type;var t=e.name,n=e.options,c=e.value,a=e.onChange,s=e.onChangeOption,o=(Object(_.a)(e,["type","name","options","value","onChange","onChangeOption"]),function(e){a&&a(e),s&&s(e.currentTarget.value)}),r=n?n.map((function(e,n){return Object(l.jsxs)("label",{children:[Object(l.jsx)("input",{type:"radio",name:t,value:e,onChange:o,checked:c===e}),e]},t+"-"+n)})):[];return Object(l.jsx)(l.Fragment,{children:r})},S=(n(37),function(e){var t=e.options,n=e.onChange,c=e.onChangeOption,a=Object(_.a)(e,["options","onChange","onChangeOption"]);return Object(l.jsx)("select",Object(m.a)(Object(m.a)({onChange:function(e){n&&n(e),c&&c(e.currentTarget.value)}},a),{},{className:"select",children:t?t.map((function(e,t){return e?Object(l.jsx)("option",{value:e,className:"select__option",children:e},"".concat(t)):""})):""}))}),E=(n(38),function(){var e=["x","y","z"],t=Object(a.useState)(""),n=Object(x.a)(t,2),c=n[0],s=n[1],o=Object(a.useState)(!1),r=Object(x.a)(o,2),i=r[0],j=r[1],u=Object(a.useState)(e[1]),b=Object(x.a)(u,2),h=b[0],d=b[1];return Object(l.jsxs)("div",{className:"test",children:[Object(l.jsxs)("div",{className:"test__components",children:[Object(l.jsx)("div",{className:"test__components__title",children:"Button:"}),Object(l.jsx)(v,{onClick:function(){return alert("Input value is: ".concat(c,"\nCheckbox checked: ").concat(i,"\nSelected radio/option: ").concat(h))},children:" SuperButton"})]}),Object(l.jsxs)("div",{className:"test__components",children:[Object(l.jsx)("div",{className:"test__components__title",children:"CheckBox"}),Object(l.jsx)(N,{checked:i,onChangeChecked:j})]}),Object(l.jsxs)("div",{className:"test__components",children:[Object(l.jsx)("div",{className:"test__components__title",children:"EdiTableSpan"}),Object(l.jsx)(g,{value:c,onChangeText:s,spanProps:{children:c?void 0:"Enter text..."}})]}),Object(l.jsxs)("div",{className:"test__components",children:[Object(l.jsx)("div",{className:"test__components__title",children:"SuperSelect"}),Object(l.jsx)(S,{options:e,value:h,onChangeOption:d})]}),Object(l.jsxs)("div",{className:"test__components",children:[Object(l.jsx)("div",{className:"test__components__title",children:"SuperRadio"}),Object(l.jsx)("div",{children:Object(l.jsx)(C,{name:"radio",options:e,value:h,onChangeOption:d})})]})]})});!function(e){e.TEST="/test",e.PROFILE="/profile",e.LOGIN="/login",e.REGISTRATION="/registration",e.RESET_PASSWORD="/resetpass",e.NEW_PASS="/newpass"}(c||(c={}));var T=function(){return Object(l.jsxs)(j.d,{children:[Object(l.jsx)(j.b,{exact:!0,path:"/",render:function(){return Object(l.jsx)(j.a,{to:c.TEST})}}),Object(l.jsx)(j.b,{path:c.TEST,component:E}),Object(l.jsx)(j.b,{path:c.PROFILE,component:p}),Object(l.jsx)(j.b,{path:c.LOGIN,component:u}),Object(l.jsx)(j.b,{path:c.REGISTRATION,component:d}),Object(l.jsx)(j.b,{path:c.RESET_PASSWORD,component:b}),Object(l.jsx)(j.b,{path:c.NEW_PASS,component:h}),Object(l.jsx)(j.b,{component:O})]})},k=(n(47),function(){return Object(l.jsxs)("header",{className:"header",children:[Object(l.jsx)(i.b,{to:c.TEST,activeClassName:"header__button_active",className:"header__button",children:"Home"}),Object(l.jsx)(i.b,{to:c.PROFILE,activeClassName:"header__button_active",className:"header__button",children:"Profile"}),Object(l.jsx)(i.b,{to:c.LOGIN,activeClassName:"header__button_active",className:"header__button",children:"Login"}),Object(l.jsx)(i.b,{to:c.REGISTRATION,activeClassName:"header__button_active",className:"header__button",children:"Sing Up"})]})});var I=function(){return Object(l.jsx)("div",{className:"App",children:Object(l.jsxs)(i.a,{children:[Object(l.jsx)(k,{}),Object(l.jsx)(T,{})]})})},P=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,50)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,s=t.getLCP,o=t.getTTFB;n(e),c(e),a(e),s(e),o(e)}))},y=n(21),R=n(18),F={},B=Object(R.a)({profile:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:F,t=arguments.length>1?arguments[1]:void 0;return t.type,e}}),L=Object(R.b)(B),A=L;window.store=L,r.a.render(Object(l.jsx)(s.a.StrictMode,{children:Object(l.jsx)(y.a,{store:A,children:Object(l.jsx)(I,{})})}),document.getElementById("root")),P()}},[[49,1,2]]]);
//# sourceMappingURL=main.a002d0ee.chunk.js.map