(this.webpackJsonptonadmin=this.webpackJsonptonadmin||[]).push([[25],{177:function(e,t,a){"use strict";function c(e,t,a,c,n,s,r){try{var l=e[s](r),o=l.value}catch(i){return void a(i)}l.done?t(o):Promise.resolve(o).then(c,n)}function n(e){return function(){var t=this,a=arguments;return new Promise((function(n,s){var r=e.apply(t,a);function l(e){c(r,n,s,l,o,"next",e)}function o(e){c(r,n,s,l,o,"throw",e)}l(void 0)}))}}a.d(t,"a",(function(){return n}))},181:function(e,t,a){"use strict";a.d(t,"a",(function(){return j}));var c=a(2),n=a(40),s=a(56),r=a.n(s),l=/-(.)/g;var o=a(0),i=a(57),d=a(4),u=["className","bsPrefix","as"],b=function(e){return e[0].toUpperCase()+(t=e,t.replace(l,(function(e,t){return t.toUpperCase()}))).slice(1);var t};function j(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=t.displayName,s=void 0===a?b(e):a,l=t.Component,j=t.defaultProps,f=o.forwardRef((function(t,a){var s=t.className,o=t.bsPrefix,b=t.as,j=void 0===b?l||"div":b,f=Object(n.a)(t,u),O=Object(i.a)(o,e);return Object(d.jsx)(j,Object(c.a)({ref:a,className:r()(s,O)},f))}));return f.defaultProps=j,f.displayName=s,f}},192:function(e,t,a){"use strict";var c=a(2),n=a(0),s=a(56),r=a.n(s),l=a(4);t.a=function(e){return n.forwardRef((function(t,a){return Object(l.jsx)("div",Object(c.a)(Object(c.a)({},t),{},{ref:a,className:r()(t.className,e)}))}))}},219:function(e,t,a){"use strict";var c=a(0),n=c.createContext(null);n.displayName="CardHeaderContext",t.a=n},223:function(e,t,a){"use strict";var c=a(42),n=a(2),s=a(40),r=a(58),l=a(0),o=a.n(l),i=a(291),d=a(56),u=a.n(d),b=a(252),j=a(4),f=["indeterminate"],O=function(e){var t=e.preGlobalFilteredRows,a=e.globalFilter,c=e.setGlobalFilter,n=e.searchBoxClass,s=t.length,l=o.a.useState(a),d=Object(r.a)(l,2),b=d[0],f=d[1],O=Object(i.useAsyncDebounce)((function(e){c(e||void 0)}),200);return Object(j.jsx)("div",{className:u()(n),children:Object(j.jsxs)("span",{className:"d-flex align-items-center",children:["Search :"," ",Object(j.jsx)("input",{value:b||"",onChange:function(e){f(e.target.value),O(e.target.value)},placeholder:"".concat(s," records..."),className:"form-control w-auto ms-1"})]})})},p=Object(l.forwardRef)((function(e,t){var a=e.indeterminate,c=Object(s.a)(e,f),r=Object(l.useRef)(),o=t||r;return Object(l.useEffect)((function(){o.current.indeterminate=a}),[o,a]),Object(j.jsx)(j.Fragment,{children:Object(j.jsxs)("div",{className:"form-check",children:[Object(j.jsx)("input",Object(n.a)({type:"checkbox",className:"form-check-input",ref:o},c)),Object(j.jsx)("label",{htmlFor:"form-check-input",className:"form-check-label"})]})})}));t.a=function(e){var t=e.isSearchable||!1,a=e.isSortable||!1,s=e.pagination||!1,r=e.isSelectable||!1,l=e.isExpandable||!1,o=Object(i.useTable)({columns:e.columns,data:e.data,initialState:{pageSize:e.pageSize||10},autoResetSortBy:!1,autoResetPage:!1},t&&i.useGlobalFilter,a&&i.useSortBy,l&&i.useExpanded,s&&i.usePagination,r&&i.useRowSelect,(function(e){r&&e.visibleColumns.push((function(e){return[{id:"selection",Header:function(e){var t=e.getToggleAllPageRowsSelectedProps;return Object(j.jsx)("div",{children:Object(j.jsx)(p,Object(n.a)({},t()))})},Cell:function(e){var t=e.row;return Object(j.jsx)("div",{children:Object(j.jsx)(p,Object(n.a)({},t.getToggleRowSelectedProps()))})}}].concat(Object(c.a)(e))})),l&&e.visibleColumns.push((function(e){return[{id:"expander",Header:function(e){var t=e.getToggleAllRowsExpandedProps,a=e.isAllRowsExpanded;return Object(j.jsx)("span",Object(n.a)(Object(n.a)({},t()),{},{children:a?"-":"+"}))},Cell:function(e){var t=e.row;return t.canExpand?Object(j.jsx)("span",Object(n.a)(Object(n.a)({},t.getToggleRowExpandedProps({style:{paddingLeft:"".concat(2*t.depth,"rem")}})),{},{children:t.isExpanded?"-":"+"})):null}}].concat(Object(c.a)(e))}))})),d=s?o.page:o.rows;return Object(j.jsxs)(j.Fragment,{children:[t&&Object(j.jsx)(O,{preGlobalFilteredRows:o.preGlobalFilteredRows,globalFilter:o.state.globalFilter,setGlobalFilter:o.setGlobalFilter,searchBoxClass:e.searchBoxClass}),Object(j.jsx)("div",{className:"table-responsive",children:Object(j.jsxs)("table",Object(n.a)(Object(n.a)({},o.getTableProps()),{},{className:u()("table table-centered react-table",e.tableClass),children:[Object(j.jsx)("thead",{className:e.theadClass,children:o.headerGroups.map((function(e){return Object(j.jsx)("tr",Object(n.a)(Object(n.a)({},e.getHeaderGroupProps()),{},{children:e.headers.map((function(e){return Object(j.jsx)("th",Object(n.a)(Object(n.a)({},e.getHeaderProps(e.sort&&e.getSortByToggleProps())),{},{className:u()({sorting_desc:!0===e.isSortedDesc,sorting_asc:!1===e.isSortedDesc,sortable:!0===e.sort}),children:e.render("Header")}))}))}))}))}),Object(j.jsx)("tbody",Object(n.a)(Object(n.a)({},o.getTableBodyProps()),{},{children:(d||[]).map((function(e,t){return o.prepareRow(e),Object(j.jsx)("tr",Object(n.a)(Object(n.a)({},e.getRowProps()),{},{children:e.cells.map((function(e){return Object(j.jsx)("td",Object(n.a)(Object(n.a)({},e.getCellProps()),{},{children:e.render("Cell")}))}))}))}))}))]}))}),s&&Object(j.jsx)(b.a,{tableProps:o,sizePerPageList:e.sizePerPageList})]})}},252:function(e,t,a){"use strict";a(0);var c=a(4);t.a=function(e){var t=e.tableProps,a=e.sizePerPageList;return Object(c.jsx)(c.Fragment,{children:Object(c.jsxs)("div",{className:"d-lg-flex align-items-center text-center pb-1",children:[Object(c.jsx)("label",{className:"me-1",children:"Display :"}),Object(c.jsx)("select",{value:t.state.pageSize,onChange:function(e){t.setPageSize(Number(e.target.value))},className:"form-select d-inline-block w-auto",children:a.map((function(e,t){return Object(c.jsx)("option",{value:e.value,children:e.text},t)}))}),Object(c.jsxs)("span",{className:"mx-3",children:["Page"," ",Object(c.jsxs)("strong",{children:[t.state.pageIndex+1," of ",t.pageOptions.length]})," "]}),Object(c.jsxs)("span",{className:"d-inline-block align-items-center text-sm-start text-center my-sm-0 my-2",children:[Object(c.jsx)("label",{children:"Go to page : "}),t.pageOptions.length>=1?Object(c.jsx)("input",{type:"number",min:1,max:t.pageOptions.length,defaultValue:t.state.pageIndex+1,onChange:function(e){var a=e.target.value?Number(e.target.value)-1:0;t.gotoPage(a)},className:"form-control w-auto ms-1 d-inline-block"}):null]}),Object(c.jsxs)("div",{className:"pagination pagination-rounded d-inline-flex ms-auto",children:[Object(c.jsx)("button",{onClick:function(){return t.gotoPage(0)},className:"page-link",disabled:!t.canPreviousPage,children:"<<"})," ",Object(c.jsx)("button",{onClick:function(){return t.previousPage()},className:"page-link",disabled:!t.canPreviousPage,children:"<"})," ",Object(c.jsx)("button",{onClick:function(){return t.nextPage()},className:"page-link",disabled:!t.canNextPage,children:">"})," ",Object(c.jsx)("button",{onClick:function(){return t.gotoPage(t.pageCount-1)},className:"page-link",disabled:!t.canNextPage,children:">>"})," "]})]})})}},295:function(e,t,a){"use strict";var c=a(2),n=a(40),s=a(56),r=a.n(s),l=a(0),o=a(57),i=a(4),d=["bsPrefix","className","as"],u=["xxl","xl","lg","md","sm","xs"],b=l.forwardRef((function(e,t){var a=e.bsPrefix,s=e.className,l=e.as,b=void 0===l?"div":l,j=Object(n.a)(e,d),f=Object(o.a)(a,"col"),O=[],p=[];return u.forEach((function(e){var t,a,c,n=j[e];if(delete j[e],"object"===typeof n&&null!=n){var s=n.span;t=void 0===s||s,a=n.offset,c=n.order}else t=n;var r="xs"!==e?"-".concat(e):"";t&&O.push(!0===t?"".concat(f).concat(r):"".concat(f).concat(r,"-").concat(t)),null!=c&&p.push("order".concat(r,"-").concat(c)),null!=a&&p.push("offset".concat(r,"-").concat(a))})),O.length||O.push(f),Object(i.jsx)(b,Object(c.a)(Object(c.a)({},j),{},{ref:t,className:r.a.apply(void 0,[s].concat(O,p))}))}));b.displayName="Col",t.a=b},297:function(e,t,a){"use strict";var c=a(2),n=a(40),s=a(56),r=a.n(s),l=a(0),o=a(57),i=a(4),d=["bsPrefix","className","noGutters","as"],u=["xxl","xl","lg","md","sm","xs"],b=l.forwardRef((function(e,t){var a=e.bsPrefix,s=e.className,l=e.noGutters,b=e.as,j=void 0===b?"div":b,f=Object(n.a)(e,d),O=Object(o.a)(a,"row"),p="".concat(O,"-cols"),x=[];return u.forEach((function(e){var t,a=f[e];delete f[e],t=null!=a&&"object"===typeof a?a.cols:a;var c="xs"!==e?"-".concat(e):"";null!=t&&x.push("".concat(p).concat(c,"-").concat(t))})),Object(i.jsx)(j,Object(c.a)(Object(c.a)({ref:t},f),{},{className:r.a.apply(void 0,[s,O,l&&"no-gutters"].concat(x))}))}));b.displayName="Row",b.defaultProps={noGutters:!1},t.a=b},345:function(e,t,a){"use strict";var c=a(2),n=a(40),s=a(56),r=a.n(s),l=a(0),o=a(57),i=a(181),d=a(192),u=a(4),b=["bsPrefix","className","variant","as"],j=l.forwardRef((function(e,t){var a=e.bsPrefix,s=e.className,l=e.variant,i=e.as,d=void 0===i?"img":i,j=Object(n.a)(e,b),f=Object(o.a)(a,"card-img");return Object(u.jsx)(d,Object(c.a)({ref:t,className:r()(l?"".concat(f,"-").concat(l):f,s)},j))}));j.displayName="CardImg";var f=j,O=a(219),p=["bsPrefix","className","as"],x=l.forwardRef((function(e,t){var a=e.bsPrefix,s=e.className,i=e.as,d=void 0===i?"div":i,b=Object(n.a)(e,p),j=Object(o.a)(a,"card-header"),f=Object(l.useMemo)((function(){return{cardHeaderBsPrefix:j}}),[j]);return Object(u.jsx)(O.a.Provider,{value:f,children:Object(u.jsx)(d,Object(c.a)(Object(c.a)({ref:t},b),{},{className:r()(s,j)}))})}));x.displayName="CardHeader";var m=x,g=["bsPrefix","className","bg","text","border","body","children","as"],h=Object(d.a)("h5"),v=Object(d.a)("h6"),N=Object(i.a)("card-body"),P=Object(i.a)("card-title",{Component:h}),w=Object(i.a)("card-subtitle",{Component:v}),y=Object(i.a)("card-link",{Component:"a"}),C=Object(i.a)("card-text",{Component:"p"}),S=Object(i.a)("card-footer"),k=Object(i.a)("card-img-overlay"),R=l.forwardRef((function(e,t){var a=e.bsPrefix,s=e.className,l=e.bg,i=e.text,d=e.border,b=e.body,j=e.children,f=e.as,O=void 0===f?"div":f,p=Object(n.a)(e,g),x=Object(o.a)(a,"card");return Object(u.jsx)(O,Object(c.a)(Object(c.a)({ref:t},p),{},{className:r()(s,x,l&&"bg-".concat(l),i&&"text-".concat(i),d&&"border-".concat(d)),children:b?Object(u.jsx)(N,{children:j}):j}))}));R.displayName="Card",R.defaultProps={body:!1};t.a=Object.assign(R,{Img:f,Title:P,Subtitle:w,Body:N,Link:y,Text:C,Header:m,Footer:S,ImgOverlay:k})},943:function(e,t,a){"use strict";a.r(t);var c=a(5),n=a.n(c),s=a(177),r=a(58),l=a(0),o=a(297),i=a(295),d=a(345),u=a(189),b=a.n(u),j=(a(56),a(223)),f=a(19),O=a(4),p=new f.a,x=[{Header:"Wallet / ADNL",accessor:"adnlAddr",sort:!0,Cell:function(e){var t=e.value,a="https://tonscan.org/address/"+t;return t.length<=48?Object(O.jsx)("a",{target:"_blank",href:a,children:t}):t}},{Header:"Status",accessor:"online",sort:!0,Cell:function(e){switch(e.value){case!0:return Object(O.jsx)("span",{className:"badge badge-success-lighten",children:"ONLINE"});default:return Object(O.jsx)("span",{className:"badge badge-danger-lighten",children:"OFFLINE"})}}},{Header:"Weight",accessor:"weight",sort:!0},{Header:"Efficiency",accessor:"efficiency",sort:!0,Cell:function(e){var t=e.value;switch(!0){case parseFloat(t)>90:return Object(O.jsxs)("span",{className:"text-success",children:[t,"%"]});case parseFloat(t)>50:return Object(O.jsxs)("span",{className:"text-warning",children:[t,"%"]});default:return Object(O.jsxs)("span",{className:"text-danger",children:[t,"%"]})}}}],m=[{text:"5",value:5},{text:"10",value:10},{text:"25",value:25}];t.default=function(){var e=Object(l.useState)([]),t=Object(r.a)(e,2),a=t[0],c=t[1],u=Object(l.useState)(!0),f=Object(r.a)(u,2),g=(f[0],f[1]),h=Object(l.useState)(!1),v=Object(r.a)(h,2),N=(v[0],v[1]),P=Object(l.useState)(!1),w=Object(r.a)(P,2),y=(w[0],w[1],Object(l.useState)(!1)),C=Object(r.a)(y,2),S=(C[0],C[1],Object(l.useState)(0)),k=Object(r.a)(S,2);k[0],k[1];Object(l.useEffect)(Object(s.a)(n.a.mark((function e(){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:R();case 1:case"end":return e.stop()}}),e)}))),[]);var R=function(){var e=Object(s.a)(n.a.mark((function e(){var t,a,s,r;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return g(!0),e.next=3,p.sendJRPC("/","vl");case 3:(t=e.sent)&&!t.error&&t.data&&"empty"!==t.data.result?(a=t.data.result,s=[],r=0,Object.keys(a).forEach((function(e){r+=a[e].weight})),Object.keys(a).forEach((function(e){s.push({adnlAddr:a[e].walletAddr?a[e].walletAddr:a[e].adnlAddr,status:a[e].status,efficiency:a[e].efficiency,weight:(a[e].weight/r*100).toFixed(1)+"%",online:a[e].online})})),c(s)):(c([]),N(!0)),g(!1);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(O.jsx)(O.Fragment,{children:Object(O.jsx)(o.a,{children:Object(O.jsxs)(i.a,{children:[Object(O.jsx)("h4",{className:"header-title mb-3",children:"TON Validators list"}),Object(O.jsx)(d.a,{className:"mt-2",children:Object(O.jsx)(d.a.Body,{children:a.length>0?Object(O.jsx)(j.a,{columns:x,data:a,sizePerPageList:m,isSortable:!0,pagination:!1}):Object(O.jsx)(b.a,{count:7})})})]})})})}}}]);
//# sourceMappingURL=25.575f5be4.chunk.js.map