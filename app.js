const firstDate = new Date(2025, 11, 26);
const coupleDate = new Date(2026, 2, 1);
const today = new Date(); today.setHours(0,0,0,0);
function daysSince(date){return Math.max(0,Math.floor((today-date)/86400000));}
document.getElementById("firstDays").textContent = daysSince(firstDate);
document.getElementById("coupleDays").textContent = daysSince(coupleDate);

document.getElementById("startBtn").addEventListener("click",()=>document.getElementById("historia").scrollIntoView({behavior:"smooth"}));

const letterParagraphs = [
"No sé muy bien por dónde empezar, porque a veces siento que ni las palabras más bonitas alcanzarían para explicarte todo lo que significas para mí.",
"Desde que te conocí he cometido miles de errores. He tenido mis tropiezos, mis momentos de distracción y mis maneras equivocadas de hacer las cosas. Pero si hay algo de lo que nunca he tenido dudas, es de ti.",
"Y si para llegar a lo que hoy somos tuve que equivocarme tantas veces, volvería a recorrer ese camino. No porque quisiera repetir nuestros momentos difíciles, sino porque cada paso me llevó a encontrarte, a conocerte y a tener la fortuna de compartir mi vida contigo.",
"Sé que no somos perfectos, que tenemos nuestras diferencias y que todavía nos quedan muchas cosas por aprender. Pero, sinceramente, a mis ojos nos acercamos bastante a esa idea de lo que significa tener algo bonito con alguien. Me encanta que seas tú con quien puedo compartir mis días, mis tonterías, mis pensamientos y hasta las cosas más insignificantes.",
"Admiro muchísimas cosas de ti. Tu belleza, tu mirada, tu cabello, tu sonrisa y esa manera tan tuya de ser. Podría pasarme horas describiéndote y aun así sentiría que me faltan palabras. Pero, por encima de todo, me encanta que seas tú. No quisiera a alguien diferente.",
"También quiero que sepas que no necesito una fecha especial para recordarte lo mucho que te quiero. De hecho, tenía muchas ganas de darte flores, pero por ahora no he tenido la posibilidad de comprártelas. Y no quería que eso fuera un impedimento para tener un detallito contigo. Porque, aunque hoy no pueda entregarte un ramo de flores de verdad, sí puedo regalarte un pequeño lugar hecho con todo mi cariño, lleno de recuerdos, palabras y pedacitos de nosotros.",
"Ojalá pudiera regalarte tantas cosas como las que mereces, pero mientras tanto quiero seguir regalándote mi tiempo, mis abrazos, mis besos, mis ocurrencias y todas las razones posibles para que nunca dudes de lo especial que eres para mí.",
"Gracias por ser mi niña bonita, por compartir tu vida conmigo y por permitirme formar parte de la tuya."
];
document.getElementById("openLetter").addEventListener("click",()=>{
 const letter=document.getElementById("letter");
 letter.classList.toggle("hidden");
 document.getElementById("openLetter").innerHTML=letter.classList.contains("hidden")?'<span class="envelope-heart">♥</span><span class="envelope-text">Toca para abrir</span>':'<span class="envelope-heart">♡</span><span class="envelope-text">La carta está abierta</span>';
 if(!letter.classList.contains("hidden")) {
  document.getElementById("letterText").innerHTML=letterParagraphs.map(p=>`<p>${p}</p>`).join("");
  setTimeout(()=>letter.scrollIntoView({behavior:"smooth",block:"start"}),100);
 }
});
const hearts=document.querySelector(".floating-hearts");
function makeHeart(){const h=document.createElement("span");h.className="float-heart";h.textContent=Math.random()>.5?"♡":"♥";h.style.left=Math.random()*100+"%";h.style.fontSize=(12+Math.random()*20)+"px";h.style.animationDuration=(7+Math.random()*7)+"s";hearts.appendChild(h);setTimeout(()=>h.remove(),15000)}
setInterval(makeHeart,1500);

// La canción se abre en Spotify mediante el enlace oficial.

const secretBtn=document.getElementById("secretBtn");
const secretMessage=document.getElementById("secretMessage");
secretBtn.addEventListener("click",()=>{
 const isHidden=secretMessage.classList.toggle("hidden");
 secretBtn.setAttribute("aria-expanded",String(!isHidden));
 secretBtn.textContent=isHidden?"¿Quieres saber un secreto?":"Un secreto solo para ti ♡";
 if(!isHidden) setTimeout(()=>secretMessage.scrollIntoView({behavior:"smooth",block:"center"}),100);
});

// Animación del sobre
const envelopeButton=document.getElementById("openLetter");
envelopeButton.addEventListener("click",()=>envelopeButton.classList.toggle("opened"));

// Galería: tocar cualquier foto para verla en grande.
const lightbox=document.getElementById("lightbox");
const lightboxImage=document.getElementById("lightboxImage");
const lightboxCaption=document.getElementById("lightboxCaption");
// Fotos de "nosotros" desde fotos.js
document.getElementById("photoGrid").innerHTML=(window.FOTOS||[]).map(f=>`<figure class="memory${f.especial?" special":""}"><img src="${f.src}" alt="${f.alt||""}" loading="lazy"><figcaption>${f.pie||""}</figcaption></figure>`).join("");
document.addEventListener("click",e=>{
 const img=e.target.closest(".polaroid img,.memory img");
 if(!img)return;
 lightboxImage.src=img.src;
 lightboxImage.alt=img.alt;
 lightboxCaption.textContent=img.closest("figure").querySelector("figcaption")?.textContent||"";
 lightbox.classList.remove("hidden");
});
function closeLightbox(){lightbox.classList.add("hidden");lightboxImage.src="";}
document.getElementById("lightboxClose").addEventListener("click",closeLightbox);
lightbox.addEventListener("click",e=>{if(e.target===lightbox)closeLightbox();});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeLightbox();});

// 100 cosas que amo de ti (se leen de cosas.js, que se actualiza desde escribir.html)
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const isoHoy=()=>{const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");};
const fmtFecha=f=>{const[y,m,d]=f.split("-").map(Number);return new Date(y,m-1,d).toLocaleDateString("es-MX",{day:"numeric",month:"long",year:"numeric"});};
function showCosa(i){
 const c=window.COSAS[i];
 document.getElementById("cienCard").innerHTML=`<div class="cien-num">#${i+1}</div><p>${esc(c.texto)}</p><small>${c.fecha===isoHoy()?"Escrita hoy ♡":fmtFecha(c.fecha)}</small>`;
 document.querySelectorAll(".cien-grid button").forEach((b,j)=>b.classList.toggle("sel",j===i));
}
function renderCien(){
 const list=window.COSAS||[],n=list.length;
 document.getElementById("cienCount").textContent=n;
 document.getElementById("cienBar").style.width=n+"%";
 const grid=document.getElementById("cienGrid");
 grid.innerHTML="";
 for(let i=0;i<100;i++){
  const b=document.createElement("button");
  b.textContent=i+1;
  if(i<n){b.className="on";b.addEventListener("click",()=>showCosa(i));}else b.disabled=true;
  grid.appendChild(b);
 }
 if(n){showCosa(n-1);}else document.getElementById("cienCard").innerHTML="<p>Muy pronto empiezo a escribirlas ♡</p>";
 document.getElementById("cienHint").textContent=n>=100?"Ya son las 100... y aun así me faltan ♡":(n&&list[n-1].fecha===isoHoy()?`Ya escribí la de hoy. Mañana viene la #${n+1} ♡`:"La de hoy viene en camino ♡");
}
const cs=document.createElement("script");
cs.src="cosas.js?v="+Date.now();
cs.onload=renderCien;
cs.onerror=()=>{window.COSAS=[];renderCien();};
document.body.appendChild(cs);
