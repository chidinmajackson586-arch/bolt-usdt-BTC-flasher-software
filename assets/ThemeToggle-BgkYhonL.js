import{c,r as m,j as t,B as n}from"./index-CiR1mdvT.js";/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r=c("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=c("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);function k(){const[a,s]=m.useState("dark");m.useEffect(()=>{const o=localStorage.getItem("theme")||"dark";s(o),o==="dark"?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")},[]);const d=()=>{const e=a==="dark"?"light":"dark";s(e),localStorage.setItem("theme",e),e==="dark"?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")};return t.jsx(n,{variant:"ghost",size:"icon",onClick:d,className:"text-muted-foreground hover:text-foreground","aria-label":"Toggle theme",children:a==="dark"?t.jsx(h,{className:"w-5 h-5"}):t.jsx(r,{className:"w-5 h-5"})})}export{k as T};
