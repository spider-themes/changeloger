(()=>{"use strict";var e,n={366:()=>{const e=window.wp.blocks,n=window.wp.element,t=window.wp.i18n,a=window.lodash,o=window.wp.components,r=window.wp.blockEditor,l=window.wp.primitives,i=(0,n.createElement)(l.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,n.createElement)(l.Path,{d:"M18 11.2h-5.2V6h-1.6v5.2H6v1.6h5.2V18h1.6v-5.2H18z"})),c=(window.React,window.wp.data);class s{constructor(e){this.changelog=e,this.datePattern=/(\d{2} \w+ \d{4}|\d{4}-\d{2}-\d{2}|\d{1,2} \w+ \d{4})/,this.versionPattern=/[\d.]+|v[\d.]+/}parseSection(e){const n=e.split("\n");if(!(n.length>1))return!1;const t=n[0],a=this.datePattern.exec(t),o=this.versionPattern.exec(t);return!(!a||!o)&&{date:a[0],version:o[0],changes:this.parseChanges(n.slice(1))}}parseChanges(e){const n=[];return e.forEach((e=>{const t=e.indexOf(":");if(-1!==t){let a=e.substring(0,t).trim();a=a.replace(/^[*->=]+/,"").trim();const o=e.substring(t+1).trim();n.push({category:a,change:o})}})),n}parse(){const e=this.changelog.replace(/\n\s*(?=\n.*:)/g,"").split(/\n\s*\n/);let n=[];return e.forEach((e=>{const t=this.parseSection(e);t&&n.push(t)})),n}getVersion(e){const n=this.parse();for(let t of n)if(t.version===e)return t;return null}normalizeVersion(e){let n=e.split(".");for(;"0"===n[n.length-1];)n.pop();return n.join(".")}getParentVersion(e){const n=e.split(".");return n.length<=1?null:(n.pop(),n.join("."))}getVersions(){const e=this.parse(),n=[],t={},a=new Set;e.forEach((e=>{const a=this.normalizeVersion(e.version);t[a]={...e,children:[]},n.push(t[a])}));for(let n of e){const e=this.getParentVersion(this.normalizeVersion(n.version));e&&t[e]&&e!==this.normalizeVersion(n.version)&&(t[e].children.includes(n)||a.has(n.version)||(t[e].children.push(n),a.add(n.version)))}return n.filter((e=>!a.has(e.version)))}}const g=function(e){return(()=>{const n=[];return e.changelog.forEach((e=>{const t=[];e.changes.forEach((e=>{n.includes(e.category)||t.includes(e.category)||t.push(e.category)})),n.push(...t)})),n})().map(((t,r)=>{const l=(0,a.get)(e.value,t.toLowerCase(),"");return(0,n.createElement)(o.BaseControl,{key:r,label:t.concat(" Color")},(0,n.createElement)(o.ColorPalette,{value:l,colors:e.colors,onChange:n=>e.onChange({...e.value,[t.toLowerCase()]:n})}))}))},m=function(e){const{attributes:a,setAttributes:l}=e,{perPage:i,changelog:m,enableVersions:h,paginationType:p,enablePagination:u,versionsPosition:v,paginationBgColor:d,customLogTypeColors:C,paginationTextColor:E,paginationActiveBgColor:b,paginationActiveTextColor:w}=a,_=[{label:(0,t.__)("Left","changeloger"),value:"left"},{label:(0,t.__)("Right","changeloger"),value:"right"}],{defaultColors:x}=(0,c.useSelect)((e=>({defaultColors:e("core/block-editor")?.getSettings()?.__experimentalFeatures?.color?.palette?.default}))),f=new s(m).parse();return(0,n.createElement)(r.InspectorControls,null,(0,n.createElement)(o.PanelBody,{title:(0,t.__)("General","changeloger")},(0,n.createElement)(o.ToggleControl,{label:(0,t.__)("Enable Pagination","changeloger"),checked:u,onChange:()=>l({enablePagination:!u})}),(0,n.createElement)(o.ToggleControl,{label:(0,t.__)("Enable Versions","changeloger"),checked:h,onChange:()=>l({enableVersions:!h})}),h&&(0,n.createElement)(o.__experimentalToggleGroupControl,{isBlock:!0,value:v,label:(0,t.__)("Versions Position","changeloger")},_.map((e=>(0,n.createElement)(o.__experimentalToggleGroupControlOption,{value:e.value,label:e.label,onClick:()=>l({versionsPosition:e.value})})))),u&&(0,n.createElement)(n.Fragment,null,(0,n.createElement)(o.SelectControl,{label:(0,t.__)("Pagination Type","changeloger"),value:p,options:[{label:"Load More",value:"load-more"},{label:"Numbered",value:"numbered"}],onChange:e=>l({paginationType:e}),__nextHasNoMarginBottom:!0}),(0,n.createElement)(o.TextControl,{label:(0,t.__)("Per Page","changeloger"),value:i.toString(),type:"number",onChange:e=>l({perPage:Number(e)})}))),(0,n.createElement)(o.PanelBody,{title:(0,t.__)("Colors","changeloger"),initialOpen:!1},(0,n.createElement)(g,{changelog:f,colors:x,value:C,onChange:e=>{l({customLogTypeColors:e})}}),u&&(0,n.createElement)(n.Fragment,null,(0,n.createElement)(o.BaseControl,{label:(0,t.__)("Pagination Text Color","changeloger")},(0,n.createElement)(o.ColorPalette,{colors:x,value:E,onChange:e=>l({paginationTextColor:e})})),(0,n.createElement)(o.BaseControl,{label:(0,t.__)("Pagination Bg Color","changeloger")},(0,n.createElement)(o.ColorPalette,{colors:x,value:d,onChange:e=>l({paginationBgColor:e})})),"numbered"===p&&(0,n.createElement)(n.Fragment,null,(0,n.createElement)(o.BaseControl,{label:(0,t.__)("Pagination Active Text Color","changeloger")},(0,n.createElement)(o.ColorPalette,{colors:x,value:w,onChange:e=>l({paginationActiveTextColor:e})})),(0,n.createElement)(o.BaseControl,{label:(0,t.__)("Pagination Active Bg Color","changeloger")},(0,n.createElement)(o.ColorPalette,{colors:x,value:b,onChange:e=>l({paginationActiveBgColor:e})}))))))},h=(0,n.createElement)(l.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,n.createElement)(l.Path,{d:"M4 9v1.5h16V9H4zm12 5.5h4V13h-4v1.5zm-6 0h4V13h-4v1.5zm-6 0h4V13H4v1.5z"})),p=function(e){const{attributes:a,setAttributes:r}=e,{changelog:l,showPlaceholder:i,showTextArea:c}=a;return(0,n.createElement)(n.Fragment,null,i&&(0,n.createElement)(o.Placeholder,{icon:h,className:"changelogger-placeholder",label:(0,t.__)("Changeloger","changeloger"),instructions:(0,t.__)("Paste your changelog here, or upload changelog from a text file.","changeloger")},(0,n.createElement)(o.FormFileUpload,{variant:"secondary",accept:"text/plain",onChange:e=>(e=>{const n=new FileReader;n.onload=e=>{const n=e.target.result;r({changelog:n,showPlaceholder:!1})},n.readAsText(e.target.files[0])})(e)},(0,t.__)("Upload","changeloger")),(0,n.createElement)(o.Button,{variant:"primary",onClick:()=>r({showPlaceholder:!1,showTextArea:!0})},(0,t.__)("Paste","changeloger"))),!i&&c&&(0,n.createElement)(n.Fragment,null,(0,n.createElement)(o.TextareaControl,{label:(0,t.__)("Paste your changelog Here","changeloger"),rows:20,value:l,onChange:e=>r({changelog:e})}),(0,n.createElement)(o.Button,{className:"placeholder-cancel-button",variant:"secondary",onClick:()=>r({showPlaceholder:!0})},(0,t.__)("Cancel","changeloger")),(0,n.createElement)(o.Button,{variant:"primary",onClick:()=>r({showTextArea:!1})},(0,t.__)("Save","changeloger"))))},u=function(e){const{attributes:a,setAttributes:l}=e;return(0,n.createElement)(r.BlockControls,null,(0,n.createElement)(o.ToolbarGroup,null,(0,n.createElement)(o.ToolbarButton,{onClick:()=>l({showTextArea:!0})},(0,t.__)("Edit",""))))},v=function(e){const[r,l]=(0,n.useState)(!1),{action:i,currentLinks:c,customLinks:s,setAttributes:g,version:m}=e;return!(0,a.isEmpty)(i)&&(0,n.createElement)("div",{className:"changeloger-link-item"},(0,n.createElement)("a",{className:"changeloger-custom-link",href:"#",onClick:e=>(e=>{e.preventDefault(),l(!0)})(e)},!(0,a.isEmpty)(i.icon)&&(0,n.createElement)("span",{className:"changeloger-custom-link-icon",style:{WebkitMaskImage:`url(${i.icon})`}}),i.name),r&&(0,n.createElement)(o.Modal,{title:"Customise Link",onRequestClose:()=>l(!1),shouldCloseOnClickOutside:!1},(0,n.createElement)(o.TextControl,{label:(0,t.__)("Text","changeloger"),value:i?.name,onChange:n=>g({customLinks:{...s,[m]:c.map(((t,a)=>a!==e.index?t:{...t,name:n}))}})}),(0,n.createElement)(o.TextControl,{label:(0,t.__)("Link","changeloger"),value:i?.link,onChange:n=>g({customLinks:{...s,[m]:c.map(((t,a)=>a!==e.index?t:{...t,link:n}))}})}),(0,n.createElement)(o.FormFileUpload,{variant:"secondary",accept:"application/svg",onChange:n=>(n=>{const t=new FileReader;t.onload=n=>{const t=n.target.result;let a="data:image/svg+xml;base64,"+window.btoa(t);g({customLinks:{...s,[m]:c.map(((n,t)=>t!==e.index?n:{...n,icon:a}))}}),l(!1)},t.readAsText(n.target.files[0])})(n)},(0,t.__)("Upload SVG","changeloger")),(0,n.createElement)("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"20px"}},(0,n.createElement)(o.Button,{style:{marginRight:"10px"},isDestructive:!0,onClick:()=>{g({customLinks:{...s,[m]:c.filter(((n,t)=>t!==e.index))}}),l(!1)}},(0,t.__)("Delete","changeloger")),(0,n.createElement)(o.Button,{variant:"primary",onClick:()=>l(!1)},(0,t.__)("Save","changeloger")))))},d=function e(t){var a;return(0,n.createElement)("ul",{className:null!==(a=!t?.isChild)&&void 0!==a&&a?"changeloger-version-list-wrapper":""},t.versions.map((t=>{const a=t?.children?.length>0;return(0,n.createElement)("li",null,"Version ",t.version,a?(0,n.createElement)(e,{isChild:!0,versions:t?.children}):null)})))},C=JSON.parse('{"u2":"block/changeloger"}');(0,e.registerBlockType)(C.u2,{edit:function(e){const{attributes:l,setAttributes:c}=e,{changelog:g,customLinks:h,newTagColor:C,versionName:E,showTextArea:b,fixedTagColor:w,paginationType:_,enableVersions:x,updateTagColor:f,tweakedTagColor:k,showPlaceholder:T,enablePagination:P,versionsPosition:y,paginationBgColor:N,improvementTagColor:B,paginationTextColor:V,customLogTypeColors:A,paginationLoadMoreText:L,paginationActiveBgColor:O,paginationActiveTextColor:S}=l,F=(0,r.useBlockProps)({className:"changeloger-container",style:{"--changeloger-pagination-text-color":V,"--changeloger-pagination-bg-color":N,"--changeloger-pagination-active-text-color":S,"--changeloger-pagination-active-bg-color":O,"--changeloger-improvement-tag-bg-color":B,"--changeloger-new-tag-bg-color":C,"--changeloger-update-tag-bg-color":f,"--changeloger-fixed-tag-bg-color":w,"--changeloger-tweaked-tag-bg-color":k}}),z=new s(g),M=z.parse(),R=z.getVersions(),G=x&&"left"===y,j=x&&"right"===y;return(0,n.createElement)("div",{...F},!T&&!b&&(0,n.createElement)(n.Fragment,null,(0,n.createElement)("div",{className:"changelog-wrapper"},G&&(0,n.createElement)("div",{className:"changeloger-version-list-container changeloger-version-list-position-left"},(0,n.createElement)("h6",{className:"version-title"},"Versions"),(0,n.createElement)(d,{versions:R})),(0,n.createElement)("div",{className:"changeloger-info-inner-wrapper"},(0,n.createElement)("div",{className:"changeloger-items"},M.map(((e,l)=>{const{date:s,version:g,changes:m}=e,p=(0,a.get)(h,g,[]);return(0,n.createElement)("div",{className:"changelog-info-item"},(0,n.createElement)("div",{className:"date"},(0,n.createElement)("span",null,s),(0,n.createElement)(r.RichText,{tagName:"span",className:"changeloger-version-name",placeholder:(0,t.__)("Version Name","changeloger"),value:E[g],onChange:e=>c({versionName:{...E,[g]:e}})})),(0,n.createElement)("div",{className:"version"},(0,n.createElement)("span",{className:"version-tag"},g),(0,n.createElement)("span",{className:"line"})),(0,n.createElement)("div",{className:"content"},m.map((e=>{const t=e.category.toLowerCase(),o=(0,a.has)(A,t);return(0,n.createElement)("p",null,(0,n.createElement)("span",{style:o?{backgroundColor:(0,a.get)(A,t)}:{},className:`tag ${t.replace(" ","-")}`},e.category),e.change)})),(0,n.createElement)("div",{className:"changeloger-link-wrapper"},p.map(((e,t)=>(0,n.createElement)(v,{action:e,index:t,customLinks:h,currentLinks:p,setAttributes:c,version:g}))),(0,n.createElement)(o.Button,{isSmall:!0,isPressed:!0,icon:i,onClick:()=>c({customLinks:{...h,[g]:[...p,{name:"Link",link:"#",icon:""}]}})}))))})))),j&&(0,n.createElement)("div",{className:"changeloger-version-list-container changeloger-version-list-position-right"},(0,n.createElement)("h6",{className:"version-title"},"Versions"),(0,n.createElement)(d,{versions:R}))),P&&(0,n.createElement)("div",{className:"changeloger-pagination-wrapper"},"load-more"===_&&(0,n.createElement)("div",{class:"wp-block-button"},(0,n.createElement)(r.RichText,{tagName:"a",style:{color:V,backgroundColor:N},className:"changeloger-pagination-button wp-block-button__link wp-element-button",value:L,onChange:e=>c({paginationLoadMoreText:e})})),"numbered"===_&&(0,n.createElement)("div",{className:"changeloger-pagination-inner-wrapper"},(0,n.createElement)("span",{className:"changeloger-prev-button page-numbers"},"« Previous"),(0,n.createElement)("span",{className:"page-numbers current"},"1"),(0,n.createElement)("span",{className:"page-numbers"},"2"),(0,n.createElement)("span",{className:"page-numbers"},"3"),(0,n.createElement)("span",{className:"changeloger-next-button page-numbers"},"Next »")))),(0,n.createElement)(m,{...e}),(0,n.createElement)(p,{...e}),(0,n.createElement)(u,{...e}))},save:function(e){const{improvementTagColor:n,newTagColor:t,updateTagColor:a,fixedTagColor:o,tweakedTagColor:l,paginationTextColor:i,paginationBgColor:c,paginationActiveTextColor:g,paginationActiveBgColor:m}=e.attributes,h=r.useBlockProps.save({className:"changeloger-container",style:{"--changeloger-pagination-text-color":i,"--changeloger-pagination-bg-color":c,"--changeloger-pagination-active-text-color":g,"--changeloger-pagination-active-bg-color":m,"--changeloger-improvement-tag-bg-color":n,"--changeloger-new-tag-bg-color":t,"--changeloger-update-tag-bg-color":a,"--changeloger-fixed-tag-bg-color":o,"--changeloger-tweaked-tag-bg-color":l}}),p=new s(e.attributes.changelog),u=p.parse();return JSON.stringify({changelog:u,props:h,version:p.getVersions(),paginationStyles:{color:i,"background-color":c}})}})}},t={};function a(e){var o=t[e];if(void 0!==o)return o.exports;var r=t[e]={exports:{}};return n[e](r,r.exports,a),r.exports}a.m=n,e=[],a.O=(n,t,o,r)=>{if(!t){var l=1/0;for(g=0;g<e.length;g++){t=e[g][0],o=e[g][1],r=e[g][2];for(var i=!0,c=0;c<t.length;c++)(!1&r||l>=r)&&Object.keys(a.O).every((e=>a.O[e](t[c])))?t.splice(c--,1):(i=!1,r<l&&(l=r));if(i){e.splice(g--,1);var s=o();void 0!==s&&(n=s)}}return n}r=r||0;for(var g=e.length;g>0&&e[g-1][2]>r;g--)e[g]=e[g-1];e[g]=[t,o,r]},a.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e={826:0,431:0};a.O.j=n=>0===e[n];var n=(n,t)=>{var o,r,l=t[0],i=t[1],c=t[2],s=0;if(l.some((n=>0!==e[n]))){for(o in i)a.o(i,o)&&(a.m[o]=i[o]);if(c)var g=c(a)}for(n&&n(t);s<l.length;s++)r=l[s],a.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return a.O(g)},t=self.webpackChunkchangeloger=self.webpackChunkchangeloger||[];t.forEach(n.bind(null,0)),t.push=n.bind(null,t.push.bind(t))})();var o=a.O(void 0,[431],(()=>a(366)));o=a.O(o)})();