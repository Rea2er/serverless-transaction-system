(this["webpackJsonpcompany-y"]=this["webpackJsonpcompany-y"]||[]).push([[0],{20:function(e,t,a){e.exports=a(44)},43:function(e,t,a){},44:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(18),c=a.n(l),s=a(2),u=a.n(s),i=a(4),m=a(5),o=a(6),d=a(8),p=a(7),h=function(e){var t=e.item;return r.a.createElement("tr",null,r.a.createElement("td",null,t.partId),r.a.createElement("td",null,t.partName),r.a.createElement("td",null,t.qoh))},b=a(19),E=a(3),f=a.n(E),g=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(m.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={partId:"",partName:"",qoh:"",message:""},e.handleSubmit=function(){var t=Object(i.a)(u.a.mark((function t(a){var n,r,l,c,s;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a.preventDefault(),n=e.state,r=n.partId,l=n.partName,c=n.qoh,"create"!==(s=e.props.usage)||""===r||""===l||""===c){t.next=6;break}return t.next=6,f.a.post("https://us-central1-cloudprojects-279901.cloudfunctions.net/companyy/parts/create",e.state).then((function(t){e.setState({message:t.data})}));case 6:if("update"!==s){t.next=9;break}return t.next=9,f.a.put("https://us-central1-cloudprojects-279901.cloudfunctions.net/companyy/parts/update",e.state).then((function(t){e.setState({message:t.data})}));case 9:e.props.getAllParts();case 10:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.handleChange=function(t){e.setState(Object(b.a)({},t.target.name,t.target.value))},e}return Object(o.a)(a,[{key:"render",value:function(){var e=this.state,t=e.partId,a=e.partName,n=e.qoh,l=e.message,c=this.props.usage;return r.a.createElement("form",{onSubmit:this.handleSubmit,className:"ui form"},r.a.createElement("div",{className:"field"},r.a.createElement("label",null,"Part Id"),r.a.createElement("input",{type:"number",name:"partId",value:t,onChange:this.handleChange})),r.a.createElement("div",{className:"field"},r.a.createElement("label",null,"Part Name"),r.a.createElement("input",{type:"text",name:"partName",value:a,onChange:this.handleChange})),r.a.createElement("div",{className:"field"},r.a.createElement("label",null,"Qoh"),r.a.createElement("input",{type:"number",name:"qoh",value:n,onChange:this.handleChange})),r.a.createElement("input",{className:"ui button",name:"submit",type:"submit",value:"update"===c?"Update":"Create"}),r.a.createElement("br",null),r.a.createElement("div",{className:l.length>15?"red message":"green message"},l))}}]),a}(n.Component),v=(a(43),function(e){var t=e.item;return r.a.createElement("tr",null,r.a.createElement("td",null,t.partId),r.a.createElement("td",null,t.jobName),r.a.createElement("td",null,t.userId),r.a.createElement("td",null,t.qty))}),y=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(m.a)(this,a);for(var n=arguments.length,l=new Array(n),c=0;c<n;c++)l[c]=arguments[c];return(e=t.call.apply(t,[this].concat(l))).state={parts:[],orders:[],search:"",partsTab:!0,ordersTab:!1},e.handleSearch=function(t){if(t.preventDefault(),""===e.state.search)return e.getOrderDetail();e.setState({orders:e.state.orders.filter((function(t){return t.jobName===e.state.search}))})},e.handleChange=function(t){e.setState({search:t.target.value})},e.getAllParts=Object(i.a)(u.a.mark((function t(){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,f.a.get("https://us-central1-cloudprojects-279901.cloudfunctions.net/companyy/parts").then((function(t){e.setState({parts:t.data})}));case 2:case"end":return t.stop()}}),t)}))),e.getOrderDetail=Object(i.a)(u.a.mark((function t(){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,f.a.get("https://us-central1-cloudprojects-279901.cloudfunctions.net/companyy/order").then((function(t){e.setState({orders:t.data})}));case 2:case"end":return t.stop()}}),t)}))),e.renderList=function(){return e.state.parts.map((function(e){return r.a.createElement(h,{key:e.partId,item:e})}))},e.orderDetail=function(){return e.state.orders.map((function(e,t){return r.a.createElement(v,{key:t,item:e})}))},e.changePartsTab=function(){e.setState({partsTab:!0,ordersTab:!1}),e.getAllParts()},e.changeOrdersTab=function(){e.setState({partsTab:!1,ordersTab:!0}),e.getOrderDetail()},e}return Object(o.a)(a,[{key:"componentDidMount",value:function(){this.getAllParts(),this.getOrderDetail()}},{key:"render",value:function(){var e=this,t=this.state,a=t.partsTab,n=t.ordersTab;return r.a.createElement("div",{className:"ui container"},r.a.createElement("h1",{className:"ui header"},"Company Y"),r.a.createElement("div",{className:"ui section divider"}),r.a.createElement("div",{className:"ui grid"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"twelve wide column"},r.a.createElement("div",{className:"ui top attached tabular menu"},r.a.createElement("span",{onClick:this.changePartsTab,className:a?"item active":"item","data-tab":"first"},"Parts"),r.a.createElement("span",{onClick:this.changeOrdersTab,className:n?"item active":"item","data-tab":"second"},"PartsOrders")),r.a.createElement("div",{className:a?"ui bottom attached tab segment active":"ui bottom attached tab segment","data-tab":"first"},r.a.createElement("table",{className:"ui single line table"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Part Id"),r.a.createElement("th",null,"Part Name"),r.a.createElement("th",null,"Quantity On Hand"))),r.a.createElement("tbody",null,this.renderList()))),r.a.createElement("div",{className:n?"ui bottom attached tab segment active":"ui bottom attached tab segment","data-tab":"second"},r.a.createElement("form",{onSubmit:function(t){return e.handleSearch(t)}},r.a.createElement("div",{className:"ui search"},r.a.createElement("div",{className:"ui icon input"},r.a.createElement("input",{className:"prompt searchbar",name:"search",type:"text",value:this.state.search,onChange:function(t){return e.handleChange(t)},placeholder:"Typing job name for searching order"}),r.a.createElement("input",{type:"submit",value:"Search"}),r.a.createElement("i",{className:"search icon"})),r.a.createElement("input",{className:"ui button",type:"button",value:"All Order",onClick:function(){return e.getOrderDetail()}}))),r.a.createElement("table",{className:"ui single line table"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Part Id"),r.a.createElement("th",null,"Job Name"),r.a.createElement("th",null,"User Id"),r.a.createElement("th",null,"Qty"))),r.a.createElement("tbody",null,this.orderDetail())))),r.a.createElement("div",{className:"four wide column"},r.a.createElement(g,{getAllParts:this.getAllParts,usage:"create"}),r.a.createElement("div",{className:"ui section divider"}),r.a.createElement(g,{getAllParts:this.getAllParts,usage:"update"})))))}}]),a}(n.Component);c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(y,null)),document.getElementById("root"))}},[[20,1,2]]]);
//# sourceMappingURL=main.3d9962c0.chunk.js.map