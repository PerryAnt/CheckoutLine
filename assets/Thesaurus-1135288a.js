import{r,a as c,j as e}from"./index-4e515d0e.js";const m=()=>{const[n,a]=r.useState([]),[t,u]=r.useState("");return r.useEffect(()=>{const o=new AbortController;return t&&fetch(t,{signal:o.signal}).then(s=>s.json()).then(s=>a(s)).catch(s=>console.log(s)),()=>o.abort()},[t]),[n,u]};function y(){const[n,a]=r.useState(""),[t,u]=r.useState(""),[o,s]=i(),[l,d]=i();return r.useEffect(()=>{s("https://api.datamuse.com/words?max=10&rel_syn="+t),d("https://api.datamuse.com/words?max=10&rel_ant="+t)},[t]),c("div",{children:[c("p",{children:["This is my solution to the problem from"," ",e("a",{href:"https://www.youtube.com/watch?v=-Rtlnsgbc0k",children:"this"})," youtube video"]}),c("p",{children:["This page uses the"," ",e("a",{href:"https://www.datamuse.com/api/",children:"Datamuse API"}),"."]}),e("p",{}),c("div",{children:[e("input",{onChange:h=>a(h.target.value),value:n}),e("button",{onClick:h=>u(n),children:"Submit"}),e("br",{}),e("br",{}),c("div",{children:[t&&(o.length>0?"Synonyms: "+o.join(", "):"None Found"),e("br",{}),e("br",{}),o.length>0&&"Antonyms: "+(l.length>0?l.join(", "):"None Found")]})]})]})}const i=()=>{const[n,a]=m();return[n.map(t=>t.word),a]};export{y as default};