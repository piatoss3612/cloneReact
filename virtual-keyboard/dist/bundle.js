(()=>{"use strict";new class{#e;#t;#s;#n;#i;#o;#a=!1;#r=!1;constructor(){this.#c(),this.#l()}#c(){this.#e=document.getElementById("container"),this.#t=this.#e.querySelector("#switch"),this.#s=this.#e.querySelector("#font"),this.#n=this.#e.querySelector("#keyboard"),this.#i=this.#e.querySelector("#input-group"),this.#o=this.#i.querySelector("#input")}#l(){this.#t.addEventListener("change",this.#u),this.#s.addEventListener("change",this.#h),document.addEventListener("keydown",this.#d),document.addEventListener("keyup",this.#E),this.#o.addEventListener("input",this.#y),this.#n.addEventListener("mousedown",this.#p),document.addEventListener("mouseup",this.#v)}#u=e=>{document.documentElement.setAttribute("theme",e.target.checked?"dark-mode":"")};#h=e=>{document.body.style.fontFamily=e.target.value};#d=e=>{this.#r||(this.#a=!0,this.#i.classList.toggle("error",/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(e.key)||"Process"===e.key),this.#n.querySelector(`[data-code=${e.code}]`)?.classList.add("active"))};#E=e=>{this.#r||(this.#a=!1,this.#n.querySelector(`[data-code=${e.code}]`)?.classList.remove("active"))};#y=e=>{e.target.value=e.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/,"")};#p=e=>{this.#a||(this.#r=!0,e.target.closest("div.key")?.classList.add("active"))};#v=e=>{if(this.#a)return;this.#r=!1;const t=e.target.closest("div.key"),s=!!t?.classList.contains("active"),n=t?.dataset.val;s&&n&&"Space"!==n&&"Backspace"!==n&&(this.#o.value+=n),s&&"Space"===n&&(this.#o.value+=" "),s&&"Backspace"===n&&(this.#o.value=this.#o.value.slice(0,-1)),this.#n.querySelector(".active")?.classList.remove("active")}}})();
//# sourceMappingURL=bundle.js.map