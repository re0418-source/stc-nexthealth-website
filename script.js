const toggle=document.getElementById('toggle');const nav=document.getElementById('nav');toggle.addEventListener('click',()=>{const isOpen=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(isOpen));});nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));

(function(){
const track=document.getElementById('collection-track');
if(!track)return;
const cards=Array.from(track.querySelectorAll('.collection'));
const prev=document.querySelector('.collection-prev');
const next=document.querySelector('.collection-next');
const position=document.getElementById('collection-position');
function visibleCount(){const w=track.clientWidth;const cw=cards[0]?.getBoundingClientRect().width||w;return Math.max(1,Math.min(cards.length,Math.round((w+18)/(cw+18))))}
function currentIndex(){const left=track.scrollLeft;let closest=0,dist=Infinity;cards.forEach((c,i)=>{const d=Math.abs(c.offsetLeft-cards[0].offsetLeft-left);if(d<dist){dist=d;closest=i}});return closest}
function update(){const count=visibleCount(),idx=currentIndex();prev.disabled=idx===0;next.disabled=idx+count>=cards.length;position.textContent=String(idx+1).padStart(2,'0')+' — '+String(Math.min(cards.length,idx+count)).padStart(2,'0')+' / '+String(cards.length).padStart(2,'0')}
function move(direction){const count=visibleCount();const idx=Math.max(0,Math.min(cards.length-count,currentIndex()+direction));track.scrollTo({left:cards[idx].offsetLeft-cards[0].offsetLeft,behavior:'smooth'});}
prev.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));track.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);update();
})();
