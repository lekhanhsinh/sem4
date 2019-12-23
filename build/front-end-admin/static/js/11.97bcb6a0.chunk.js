(window["webpackJsonpfront-end-admin"]=window["webpackJsonpfront-end-admin"]||[]).push([[11],{105:function(e,t,a){"use strict";var n=a(117),r=a(166),i=a(187),c=a(119),l=a(127),o=Object(l.a)((function(e,t){var a=t.headers;return{headers:Object(n.a)({},a)}})),d=Object(c.b)({uri:"http://api.herebedragon.com:4000/graphql",credentials:"include",fetchOptions:{credentials:"include"}}),u=new r.a({cache:new i.a,link:o.concat(d)});t.a=u},124:function(e,t,a){"use strict";var n=a(143),r=a(0),i=a.n(r),c=a(459),l=a(460),o=a(461),d=a(464),u=a(188),s=a(102),m=a(24),p=a(7),f=(a(125),c.a),g=localStorage.getItem("userInfo");t.a=Object(p.g)((function(e){var t=e.history.push,a=Object(r.useState)(g),c=Object(n.a)(a,2),p=c[0],h=c[1];return i.a.createElement(f,{className:"header"},i.a.createElement(l.a,{type:"flex",justify:"space-between"},i.a.createElement(m.b,{to:"/EditableTable",className:"button-blog"},"ADMIN"),p?i.a.createElement(o.a,{span:4,className:"button-block-loggedin"},i.a.createElement(d.a,{size:"large",icon:"user"}),i.a.createElement(u.a,{onClick:function(){localStorage.removeItem("userInfo"),h(""),t("/LoginAdmin")}},i.a.createElement(s.a,{type:"logout"}),"Log out")):i.a.createElement(o.a,{span:4,className:"button-block"},i.a.createElement(u.a,null,i.a.createElement(m.b,{to:"/LoginAdmin"},"Login")))))}))},125:function(e,t,a){},184:function(e,t,a){"use strict";var n=a(109),r=a(104),i=a(105),c=a(462);function l(){var e=Object(n.a)(["\n    mutation DeleteUser($id:String!){\n        deleteUser(id:$id)\n    }\n"]);return l=function(){return e},e}var o=Object(r.a)(l());t.a=function(e){return i.a.mutate({mutation:o,variables:{id:e}}).then((function(e){return e.data.deleteUser})).catch((function(e){c.a.info(e.message)}))}},474:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(156),c=a(117),l=a(134),o=a(135),d=a(144),u=a(136),s=a(145),m=a(157),p=a(244),f=a(467),g=a(468),h=a(463),b=a(188),E=a(455),v=a(102),y=a(465),I=(a(126),a(184)),O=a(24),j=a(109),S=a(104),k=a(105),x=a(462);function A(){var e=Object(j.a)(["\n    query GetImages {\n        getImages{\n            id\n            name\n            description\n            path\n            user{\n              id\n            }\n            createdAt\n            updatedAt\n          }\n    }\n"]);return A=function(){return e},e}var w=Object(S.a)(A()),C=function(){return k.a.query({query:w}).then((function(e){return e.data.getImages})).catch((function(e){x.a.info(e.message)}))};function D(){var e=Object(j.a)(["\n    mutation UpdateImage(\n        $id:String!,\n        $detail:ImageInputType!,\n    ){\n        updateImage(\n            id:$id,\n            detail:$detail,\n        ){\n            \n            id\n            name\n            description\n            path\n            user{\n              id\n            }\n            createdAt\n            updatedAt\n          }\n        \n    }\n"]);return D=function(){return e},e}var M=Object(S.a)(D()),U=function(e,t){return k.a.mutate({mutation:M,variables:{id:e,detail:t}}).then((function(e){return console.log(e.data.updateImage)})).catch((function(e){x.a.info(e.message)}))},N=(p.a.Option,r.a.createContext("")),q=f.a.create()((function(e){var t=e.form,a=(e.index,Object(m.a)(e,["form","index"]));return r.a.createElement(N.Provider,{value:t},r.a.createElement("tr",a))})),L=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(d.a)(this,Object(u.a)(t).call(this,e))).input=void 0,a.form=void 0,a.state={editing:!1},a.toggleEdit=function(){var e=!a.state.editing;a.setState({editing:e},(function(){e&&a.input.focus()}))},a.save=function(e){var t=a.props,n=t.record,r=t.handleSave;a.form.validateFields((function(t,i){t&&t[e.currentTarget.id]||(a.toggleEdit(),r(Object(c.a)({},n,{},i)))}))},a.renderCell=function(e){var t=a.props,n=t.children,i=t.dataIndex,c=t.record,l=t.title,o=a.state.editing;return a.form=e,"Path"==l?r.a.createElement("div",{ref:function(e){return a.input=e}},r.a.createElement("img",{style:{width:"100px",height:"100px"},src:"images/".concat(c.path)})):o?r.a.createElement(f.a.Item,{style:{margin:0}},e.getFieldDecorator(i,{rules:[{required:!0,message:"".concat(l," is required.")}],initialValue:c[i]})(r.a.createElement(g.a,{ref:function(e){return a.input=e},onPressEnter:a.save,onBlur:a.save,placeholder:"enter something"}))):r.a.createElement("div",{className:"editable-cell-value-wrap",style:{paddingRight:24,width:"100%",height:"30px"},onClick:a.toggleEdit},n)},a}return Object(s.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props,t=e.editable,a=(e.dataIndex,e.id,e.title,e.record,e.index,e.handleSave,e.children),n=Object(m.a)(e,["editable","dataIndex","id","title","record","index","handleSave","children"]);return r.a.createElement("td",n,t?r.a.createElement(N.Consumer,null,this.renderCell):a)}}]),t}(r.a.Component),R=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(d.a)(this,Object(u.a)(t).call(this,e))).formRef=void 0,a.saveFormRef=function(e){a.formRef=e},a.columns=[],a.handleDelete=function(e,t){Object(I.a)(t);var n=Object(i.a)(a.state.dataSource);a.setState({dataSource:n.filter((function(t){return t.key!==e}))})},a.handleSave=function(e){var t=Object(i.a)(a.state.dataSource),n=t.findIndex((function(t){return e.key===t.key})),r=t[n];t.splice(n,1,Object(c.a)({},r,{},e));var l={id:e.id,detail:{name:e.name,description:e.description}};U(l.id,l.detail),a.setState({dataSource:t})},a.toggleCollapsed=function(){a.setState({collapsed:!a.state.collapsed})},a.handleClick=function(e){a.setState({current:e.key})},a.columns=[{title:"Id",dataIndex:"id",editable:!1},{title:"Name",dataIndex:"name",editable:!0},{title:"Path",dataIndex:"path",editable:!0},{title:"Description",dataIndex:"description",editable:!0},{title:"User",dataIndex:"user"},{title:"CreatedAt",dataIndex:"createdAt"},{title:"UpdatedAt",dataIndex:"updatedAt"},{title:"Action",dataIndex:"action",render:function(e,t){return a.state.dataSource.length>0?r.a.createElement(r.a.Fragment,null,r.a.createElement(h.a,{style:{},title:"Sure to delete?",onConfirm:function(){return a.handleDelete(t.key,t.id)}},r.a.createElement(b.a,{type:"danger"},"Delete"))):null}}],a.state={current:"5",dataSource:[],count:0,indeterminate:!0,checkAll:!1},a}return Object(s.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;C().then((function(t){var a=[];for(var n in console.log(t),t)a.push({key:parseInt(n,10),id:t[n].id,name:t[n].name,path:t[n].path,description:t[n].description,user:t[n].user.id,createdAt:new Date(t[n].createdAt).toLocaleDateString("en-US"),updatedAt:new Date(t[n].updatedAt).toLocaleDateString("en-US")});e.setState({dataSource:a,count:a.length})}))}},{key:"render",value:function(){var e=this,t=this.state.dataSource,a={body:{row:q,cell:L}},n=this.columns.map((function(t){return t.editable?Object(c.a)({},t,{onCell:function(a){return{record:a,editable:t.editable,dataIndex:t.dataIndex,title:t.title,handleSave:e.handleSave}}}):t}));return r.a.createElement("div",null,r.a.createElement("h1",{style:{textAlign:"center"}},"ImageInfo"),r.a.createElement(E.a,{onClick:this.handleClick,selectedKeys:[this.state.current],mode:"horizontal",style:{textAlign:"center"}},r.a.createElement(E.a.Item,{key:"1"},r.a.createElement(v.a,{type:"user"}),r.a.createElement("span",null,"ManagerUser"),r.a.createElement(O.b,{to:"/ManagerUser"})),r.a.createElement(E.a.Item,{key:"2"},r.a.createElement(v.a,{type:"shopping"}),r.a.createElement("span",null,"ManagerOrder"),r.a.createElement(O.b,{to:"/ManagerOrder"})),r.a.createElement(E.a.Item,{key:"3"},r.a.createElement(v.a,{type:"user-add"}),r.a.createElement("span",null,"RegisterEmployee"),r.a.createElement(O.b,{to:"/RegisterEmployee"})),r.a.createElement(E.a.Item,{key:"4"},r.a.createElement(v.a,{type:"team"}),r.a.createElement("span",null,"ManagerEmployee"),r.a.createElement(O.b,{to:"/ManagerEmployee"})),r.a.createElement(E.a.Item,{key:"5"},r.a.createElement(v.a,{type:"file-image"}),r.a.createElement("span",null,"ManagerImage"),r.a.createElement(O.b,{to:"/ManagerImage"}))),r.a.createElement(y.a,{components:a,rowClassName:function(){return"editable-row"},bordered:!0,dataSource:t,columns:n}))}}]),t}(r.a.Component),$=a(131),F=a(124);t.default=function(){return r.a.createElement($.a,{type:["right","left"]},r.a.createElement(F.a,null),r.a.createElement("div",{key:"0",style:{marginTop:"100px"}},r.a.createElement(R,null)))}}}]);
//# sourceMappingURL=11.97bcb6a0.chunk.js.map