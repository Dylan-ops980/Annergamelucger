const games=[
["Minecraft","Adventure · Survival","Adventure","https://ethlan.fr/img/jeux/121.jpg"],
["Fortnite","Battle Royale · Multiplayer","Multiplayer","https://mobygames.com/images/covers/l/1085367-fortnite-battle-royale-playstation-4-front-cover.jpg"],
["Rocket League","Sports · Racing","Racing","https://mobygames.com/images/covers/l/441545-rocket-league-xbox-one-front-cover.jpg"],
["Among Us","Social Deduction · Party","Multiplayer","https://playpack.store/cdn/shop/files/Amoung-us-5.png?v=1767965809"],
["Counter-Strike 2","FPS · Competitive","Action","https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg"],
["Dota 2","MOBA · Strategy","Action","https://cdn.cloudflare.steamstatic.com/steam/apps/570/header.jpg"],
["PUBG: Battlegrounds","Battle Royale · FPS","Action","https://cdn.cloudflare.steamstatic.com/steam/apps/578080/header.jpg"],
["Apex Legends","FPS · Battle Royale","Action","https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/header.jpg"],
["Hades","Roguelike · Action","Indie","https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/header.jpg"],
["Terraria","Sandbox · Adventure","Adventure","https://cdn.cloudflare.steamstatic.com/steam/apps/105600/header.jpg"],
["Stardew Valley","Farming · Indie","Indie","https://cdn.cloudflare.steamstatic.com/steam/apps/413150/header.jpg"],
["Cyberpunk 2077","RPG · Open World","Action","https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg"],
["ELDEN RING","RPG · Soulslike","Adventure","https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg"],
["Hollow Knight","Metroidvania · Indie","Indie","https://cdn.cloudflare.steamstatic.com/steam/apps/367520/header.jpg"],
["Fall Guys","Party · Multiplayer","Multiplayer","https://cdn.cloudflare.steamstatic.com/steam/apps/1097150/header.jpg"],
["Dead by Daylight","Horror · Multiplayer","Multiplayer","https://cdn.cloudflare.steamstatic.com/steam/apps/381210/header.jpg"],
["The Forest","Survival · Horror","Adventure","https://cdn.cloudflare.steamstatic.com/steam/apps/242760/header.jpg"],
["Left 4 Dead 2","Co-op · FPS","Action","https://cdn.cloudflare.steamstatic.com/steam/apps/550/header.jpg"],
["Portal 2","Puzzle · Co-op","Indie","https://cdn.cloudflare.steamstatic.com/steam/apps/620/header.jpg"],
["Garry's Mod","Sandbox · Multiplayer","Multiplayer","https://cdn.cloudflare.steamstatic.com/steam/apps/4000/header.jpg"]
];

const grid=document.getElementById("gameGrid"), input=document.getElementById("searchInput");
let active="All";
function render(){
 const q=input.value.toLowerCase();
 grid.innerHTML="";
 games.filter(g=>(active==="All"||g[2]===active)&&g[0].toLowerCase().includes(q)).forEach((g,i)=>{
   const c=document.createElement("article"); c.className="card";
   c.innerHTML=`<img src="${g[3]}" alt="${g[0]} cover" loading="lazy"><div class="card-info"><div class="card-top"><span>SLOT ${String(i+1).padStart(2,"0")}</span><span>● ONLINE</span></div><h3>${g[0]}</h3><p>${g[1]}</p></div><div class="play">▶</div>`;
   c.onclick=()=>openModal(g); grid.appendChild(c);
 });
}
document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");active=b.dataset.filter;render()});
input.oninput=render;
document.querySelector(".mini-play").onclick=()=>openModal(games[0]);
function openModal(g){document.getElementById("modalImg").src=g[3];document.getElementById("modalTitle").textContent=g[0];document.getElementById("modalMeta").textContent=g[1]+"  ·  ANNER LIBRARY";document.getElementById("modal").classList.add("open");document.getElementById("modal").setAttribute("aria-hidden","false")}
document.querySelectorAll("[data-close]").forEach(x=>x.onclick=()=>{document.getElementById("modal").classList.remove("open")});
document.addEventListener("keydown",e=>{if(e.key==="Escape")document.getElementById("modal").classList.remove("open")});
document.getElementById("searchBtn").onclick=()=>{document.getElementById("searchInput").focus();document.getElementById("games").scrollIntoView({behavior:"smooth"})};
document.getElementById("soundBtn").onclick=e=>{e.currentTarget.classList.toggle("on");e.currentTarget.textContent=e.currentTarget.classList.contains("on")?"♪":"♫"};
document.getElementById("launch").onclick=()=>alert("Connect this button to your game's URL or executable in script.js.");

const canvas=document.getElementById("snow-canvas"),scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(70,innerWidth/innerHeight,.1,180);
camera.position.z=36;
const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(innerWidth,innerHeight);
const count=Math.min(4200,Math.floor(innerWidth*innerHeight/240)),pos=new Float32Array(count*3),vel=new Float32Array(count),drift=new Float32Array(count);
for(let i=0;i<count;i++){let j=i*3;pos[j]=(Math.random()-.5)*100;pos[j+1]=(Math.random()-.5)*100;pos[j+2]=(Math.random()-.5)*75;vel[i]=.018+Math.random()*.055;drift[i]=(.5+Math.random())*.012}
const geo=new THREE.BufferGeometry();geo.setAttribute("position",new THREE.BufferAttribute(pos,3));
const mat=new THREE.PointsMaterial({color:0xf0fff7,size:.075,transparent:true,opacity:.82,depthWrite:false,blending:THREE.AdditiveBlending});
const points=new THREE.Points(geo,mat);scene.add(points);let t=0;
function loop(){requestAnimationFrame(loop);t+=.006;for(let i=0;i<count;i++){let j=i*3;pos[j+1]-=vel[i];pos[j]+=Math.sin(t*1.8+i*.07)*drift[i];pos[j+2]+=Math.cos(t+i)*.002;if(pos[j+1]<-50){pos[j+1]=50;pos[j]=(Math.random()-.5)*100}}geo.attributes.position.needsUpdate=true;points.rotation.y=Math.sin(t*.13)*.025;renderer.render(scene,camera)}loop();
addEventListener("resize",()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});
render();
