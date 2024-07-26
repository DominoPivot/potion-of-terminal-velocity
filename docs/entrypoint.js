function s(e,n){let t=document.querySelector(e);if(!t)throw Error(`No match for selector: ${e}`);if(!(t instanceof n))throw Error(`Expected ${n.name} but found ${t.constructor.name} for selector: ${e}`);return t}function u(e,n){let t=Array.from(document.querySelectorAll(e));if(!t.length)throw Error(`No match for selector: ${e}`);let o=t.find(r=>!(r instanceof n));if(o)throw Error(`Expected ${n.name} but found ${o.constructor.name} for selector: ${e}`);return t}function d({promptElement:e,inputElement:n,outputElement:t,onUserInput:o}){let r,l=e.textContent??"";function h(a){let m=document.createElement("kbd");m.textContent=a,r=document.createElement("samp"),r.append(l,m,`
`),t.appendChild(r)}function g(a,m="log"){if(a===""){r=void 0;return}a.endsWith(`
`)||(a+=`
`);let i=document.createElement("span");i.className=m,i.textContent=a,r??(r=document.createElement("samp")),r.appendChild(i),t.appendChild(r),r=void 0}return n.addEventListener("keydown",function(m){if(m.key==="Enter"){let i=this.value;this.value="",h(i),o(i),this.scrollIntoView({behavior:"instant"})}},{passive:!0}),Object.freeze({log:g,set prompt(a){e.textContent=l=a},get prompt(){return l}})}function p(){function e(n,t){if(t=t.trim().replace(/\s+/g," "),t===""){n.log("");return}for(let o of f){let r=t.match(o.pattern);if(r){o.run(n,...r);return}}n.log("Unknown command.","error")}return Object.freeze({runCommand:e})}var f=[{name:"look around",pattern:/^look around$/i,run(e){e.log("There isn't much to see yet.")}},{name:"add ITEM",pattern:/^(add|put|drop)(.*)/i,run(e,n,t,o){e.log(`You ${t} ${o.trim()} in the cauldron. For flavor.`)}},{name:"borrow ITEM",pattern:/^(borrow|fetch|grab|pick(?:up)?|retrieve|steal|take|yoink)(.*)/i,run(e,n,t,o){o=o.trim()||"something",!0?e.log(`You ${t==="yoink"?"pretend you're Homer Simpsons and yoink":t} some ${o} from the chest.`):e.log(`You can't find any ${o} in the chest.`)}},{name:"help",pattern:/^help\b/i,run(e){e.log(`
      b u t    n o b o d y    c a m e.

`);let n=document.querySelector(".command-input");n.disabled=!0,setTimeout(()=>{e.log(["...fine, printing list of available commands.",...f.map(t=>"    "+t.name)].join(`
`)),n.disabled=!1,n.scrollIntoView(),n.focus()},3e3)}},{name:"make me a sandwich",pattern:/^(sudo )?make me a sandwich$/i,run(e,n,t){t?(e.log("Poof, you're a sandwich."),e.prompt="\u{1F96A} "):e.log("no.")}},{name:"bash",pattern:/^bash\b|sh\b/i,run(e){e.prompt=e.prompt==="\u{1F96A} "?"sandwich@chasm:~$ ":"alchemist@chasm:~$ "}},{name:"fortune",pattern:/^fortune\b/i,run(e){e.log(`Q: How many pirates does it take to change a lightbulb?
A: No more than 5, but they'll leave you 2 weeks in the dark first.`)}}];var c=document.documentElement.classList;s(".settings [name=reduced-motion]",HTMLInputElement).addEventListener("change",function(n){this.checked?c.add("reduced-motion"):c.remove("reduced-motion")},{passive:!0});u(".settings [name=color-scheme]",HTMLInputElement).forEach(e=>e.addEventListener("change",E,{passive:!0}));function E(){Array.from(c).filter(e=>e.startsWith("theme-")).forEach(e=>c.remove(e)),c.add(`theme-${this.value}`)}var y=d({inputElement:s(".command-input",HTMLInputElement),outputElement:s(".output-log",HTMLElement),promptElement:s(".command-prompt",HTMLElement),onUserInput(e){T.runCommand(y,e)}}),T=p();export{c as rootClassList};
//# sourceMappingURL=entrypoint.js.map