import{r as h,a as v,j as y}from"./index-e967e772.js";function j(){const[t,u]=h.useState(4),[o,p]=h.useState(Array(t).fill(null).map(()=>Array(t).fill(0))),[i,m]=h.useState(Array(t).fill(null).map(()=>Array(t).fill("down")));function c(){let e=Array(t*t).fill(0);e=e.map((l,r)=>r%(t*t/2)+1);debugger;let a=0;for(let l=e.length-1;l>0;l--)a=d(l),w(e,l,a);p(S(e)),m(Array(t).fill(null).map(()=>Array(t).fill("down")))}function A(e,a){const l=[...i],r=[];if(i.map((s,f)=>s.map((n,g)=>{n==="up"&&r.push([f,g])})),r.length!==2){if(r.length===0&&i[e][a]==="down"&&(l[e][a]="up"),r.length===1){const s=r[0][0],f=r[0][1];if(e===s&&a===f)return;l[e][a]="up",l[s][f]="up",o[e][a]===o[s][f]?setTimeout(()=>{const n=[...i];n[e][a]="empty",n[s][f]="empty",m(n)},1e3):setTimeout(()=>{const n=[...i];n[e][a]="down",n[s][f]="down",m(n)},1e3)}m(l)}}return h.useEffect(()=>c,[]),v("div",{children:[o.map((e,a)=>y("div",{className:"horizontal",children:e.map((l,r)=>y("div",{className:`square-${i[a][r]}`,onClick:s=>A(a,r),children:y("div",{children:l})},r))},a)),y("button",{onClick:c,children:"New Game"})]})}function S(t){let u=Math.sqrt(t.length);return Array(u).fill(null).map(()=>Array(u).fill(0)).map((p,i)=>p.map((m,c)=>t[u*i+c]))}function w(t,u,o){let p=t[u];t[u]=t[o],t[o]=p}function d(t){return Math.floor(Math.random()*t)}export{j as default};
