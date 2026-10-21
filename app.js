/* ---------- data ---------- */
const P=[
{id:1,n:'Custom T-Shirt',t:'tshirt',p:999,c:'T-Shirts',txt:'YOUR\nDESIGN\nHERE'},
{id:2,n:'Custom Mug',t:'mug',p:499,c:'Mugs',txt:'Best\nMom\nEver'},
{id:3,n:'Water Bottle',t:'bottle',p:799,c:'Bottles',txt:'Stay\nHydrated'},
{id:4,n:'Hoodie',t:'hoodie',p:1499,c:'Hoodies',col:'#111827',txt:'Stay\nCool'},
{id:5,n:'Phone Case',t:'phone',p:699,c:'Phone Cases'},
{id:6,n:'Canvas Bag',t:'tote',p:599,c:'Canvas Bags',txt:'Your\nDesign\nHere'},
{id:7,n:'Travel Mug',t:'tumbler',p:899,c:'Bottles',col:'#1f2937',txt:'Coffee\nTime'},
{id:8,n:'Cap',t:'cap',p:799,c:'Other',col:'#111827',txt:'YOUR\nLOGO'}];
const CATS=['All Products','T-Shirts','Mugs','Bottles','Hoodies','Phone Cases','Canvas Bags','Other'];
const COLS=['#ffffff','#cfe3cf','#e8262b','#e5e7eb','#f59e0b','#111111','#1a63e0','#22a55a','#ec4899'];
let cart=[];try{cart=JSON.parse(localStorage.getItem('mh_cart')||'[]')}catch(e){}
let cz={pid:1,side:'Front',color:'#ffffff',size:'M',text:'',font:'Poppins',tcol:'#111111',img:null,tab:'Upload Image'};
let shopCat='All Products',shopSort='Default';
const $=s=>document.querySelector(s);
const save=()=>{try{localStorage.setItem('mh_cart',JSON.stringify(cart))}catch(e){};$('#badge').textContent=cart.reduce((a,b)=>a+b.q,0)};
function toast(m){const d=document.createElement('div');d.className='toast';d.textContent=m;document.body.appendChild(d);setTimeout(()=>d.remove(),1800)}

/* ---------- product art (inline SVG) ---------- */
function art(t,col,txt,img){
 col=col||'#fff';const dk=['#111827','#111111','#1f2937'].includes(col);const ink=dk?'#fff':'#111';
 const lines=(txt||'').split('\n');
 const tx=(y0)=>img?`<image href="${img}" x="32" y="${y0-6}" width="36" height="30" preserveAspectRatio="xMidYMid meet"/>`:lines.map((l,i)=>`<text x="50" y="${y0+i*9}" text-anchor="middle" font-size="${l.length>7?6:8}" font-weight="800" fill="${ink}" font-family="Poppins">${l}</text>`).join('');
 const S='stroke="#cbd5e1" stroke-width="1"';
 const b={
 tshirt:`<path d="M30 14 8 28l9 15 10-5v50h46V38l10 5 9-15-22-14q-20 12-40 0z" fill="${col}" ${S}/>${tx(48)}`,
 hoodie:`<path d="M30 16 6 34l8 40 13-3v19h46V71l13 3 8-40-24-18q-20 12-40 0z" fill="${col}" ${S}/><path d="M38 14q12 20 24 0" fill="none" stroke="#6b7280" stroke-width="1.5"/>${tx(50)}`,
 mug:`<rect x="22" y="26" width="46" height="50" rx="6" fill="${col}" ${S}/><path d="M68 36h8q8 0 8 10t-8 10h-8" fill="none" stroke="#cbd5e1" stroke-width="5"/>${tx(46)}`,
 bottle:`<rect x="40" y="8" width="20" height="9" rx="3" fill="#374151"/><rect x="33" y="17" width="34" height="74" rx="10" fill="${col}" ${S}/>${tx(46)}`,
 tumbler:`<rect x="30" y="12" width="40" height="8" rx="3" fill="#374151"/><path d="M31 20h38l-4 68H35z" fill="${col}"/>${tx(46)}`,
 phone:`<rect x="30" y="8" width="40" height="84" rx="9" fill="url(#pg)" stroke="#1f2937" stroke-width="2"/><circle cx="40" cy="18" r="4" fill="#111"/><defs><linearGradient id="pg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e3a5f"/><stop offset=".55" stop-color="#f97316"/><stop offset="1" stop-color="#7c2d12"/></linearGradient></defs>`,
 tote:`<path d="M34 40q0-24 16-24t16 24" fill="none" stroke="#a8916b" stroke-width="3"/><rect x="22" y="38" width="56" height="54" fill="${col==='#fff'||col==='#ffffff'?'#f3e8d3':col}" ${S}/>${tx(58)}`,
 cap:`<path d="M18 62q0-34 32-34t32 34z" fill="${col}"/><path d="M60 62h34q-2 8-22 8H55z" fill="${dk?'#0b1220':'#cbd5e1'}"/>${tx(52)}`};
 return `<svg viewBox="0 0 100 100" class="w-full h-full" role="img" aria-label="${t}">${b[t]}</svg>`}

/* ---------- pages ---------- */
const pCard=(p)=>`<div class="card rounded-lg p-2.5 text-xs"><div class="thumb rounded-md aspect-square p-3 mb-2">${art(p.t,p.col,p.txt)}</div><div class="font-medium">${p.n}</div><div class="text-brand font-semibold text-[11px] mb-2">Rs. ${p.p.toLocaleString()}</div><button class="btn w-full !text-xs" onclick="startCz(${p.id})">Customize</button></div>`;
function home(){const cats=[['T-Shirts',1],['Mugs',2],['Bottles',3],['Hoodies',4],['Phone Cases',5],['And More',6]];
return `
<section class="relative overflow-hidden rounded-xl card grid md:grid-cols-2 items-center">
 <div class="p-8 md:p-12"><p class="text-brand font-medium text-lg">Your Ideas</p><h1 class="text-3xl md:text-5xl font-bold leading-tight">Custom Printed<br><span class="text-brand">Just the Way You Want</span></h1>
 <p class="mut text-sm mt-4 max-w-sm">Personalize your favorite products with photos, text or designs. T-shirts, mugs, bottles and more – all in one place!</p>
 <div class="flex gap-3 mt-6"><a href="#customize" class="btn">Start Customizing →</a><a href="#shop" class="btn2">Shop Now</a></div>
 <div class="flex flex-wrap gap-5 mt-8 text-xs mut"><span>🖨 High Quality Print</span><span>🚚 Fast Delivery</span><span>🔒 Secure Payment</span></div></div>
 <div class="bg-gradient-to-br from-amber-100 to-sky-100 dark:from-slate-800 dark:to-slate-700 h-72 md:h-full min-h-[320px] flex items-end justify-center gap-2 p-6">
  <div class="w-40 h-52">${art('tshirt','#fff','GOOD\nVIBES\nONLY')}</div><div class="w-28 h-32">${art('mug','#fff','Create\nYour Own\nDesign')}</div><div class="w-24 h-44">${art('bottle','#fff','Adventure\nAwaits')}</div></div>
</section>
<h2 class="font-semibold text-lg mt-10 mb-3">Popular Categories</h2>
<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">${cats.map(([n,i])=>{const p=P[i-1];return `<a href="#shop" onclick="shopCat='${n==='And More'?'All Products':n}'" class="block text-xs"><div class="card thumb rounded-lg aspect-square p-3">${art(p.t,p.col,p.txt)}</div><div class="font-semibold mt-2 text-sm">${n}</div><div class="text-brand text-[11px]">${n==='And More'?'Explore All':'Customize Now'} →</div></a>`}).join('')}</div>
<section class="mt-8 rounded-xl bg-gradient-to-r from-[#0f3a8a] to-[#1a63e0] text-white p-6 md:p-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-center">
 <span class="font-semibold">Make It Personal</span>•<span class="font-semibold">Make It Special</span>•<span class="font-semibold">Make It Yours</span><p class="w-full text-xs text-blue-100">Custom prints for every moment – gifts, events, business or just for you!</p></section>
<div class="flex justify-between items-center mt-10 mb-3"><h2 class="font-semibold text-lg">Featured Products</h2><a href="#shop" class="text-brand text-xs">View All →</a></div>
<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">${P.slice(0,6).map(pCard).join('')}</div>
<section class="mt-10 rounded-xl bg-gradient-to-r from-[#0f2a56] to-[#17479b] text-white p-6 md:p-8 grid md:grid-cols-[1fr_auto] gap-6 items-center">
 <div><h3 class="font-semibold mb-4">Why Choose Mug House?</h3><div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs">${[['🖨','Premium Quality Prints'],['🎨','Easy Online Customization'],['📦','Wide Range of Products'],['💰','Affordable Prices']].map(([i,t])=>`<div><div class="text-3xl mb-1">${i}</div>${t}</div>`).join('')}</div></div>
 <div class="text-center md:text-left"><p class="text-xl font-semibold">Turn Your Ideas Into Beautiful Prints!</p><a href="#customize" class="btn2 !text-white !border-white inline-block mt-3 !text-xs">Start Now →</a></div></section>`}

function shop(){let l=P.filter(p=>shopCat==='All Products'||p.c===shopCat);
 if(shopSort==='Price: Low to High')l=[...l].sort((a,b)=>a.p-b.p);if(shopSort==='Price: High to Low')l=[...l].sort((a,b)=>b.p-a.p);
 const cnt=c=>c==='All Products'?P.length:P.filter(p=>p.c===c).length;
 return `<section class="rounded-xl bg-gradient-to-r from-[#0f3a8a] to-[#1a63e0] text-white p-8 mb-6"><h1 class="text-2xl font-bold">Shop Our<br>Custom Products</h1><p class="text-sm text-blue-100 mt-1">Find the perfect product and make it yours.</p></section>
 <div class="grid md:grid-cols-[200px_1fr] gap-6"><aside class="card rounded-lg p-3 h-fit"><h3 class="font-semibold text-sm mb-2">Categories</h3>${CATS.map(c=>`<button onclick="shopCat='${c}';render()" class="w-full text-left text-xs px-2 py-2 rounded ${c===shopCat?'bg-brand/10 text-brand font-semibold':''}">${c} (${cnt(c)})</button>`).join('')}</aside>
 <div><div class="flex items-center gap-2 text-xs mb-3 justify-end">Sort by:<select class="inp !w-auto" onchange="shopSort=this.value;render()">${['Default','Price: Low to High','Price: High to Low'].map(o=>`<option ${o===shopSort?'selected':''}>${o}</option>`).join('')}</select></div>
 <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">${l.map(pCard).join('')||'<p class="mut text-sm col-span-full">No products in this category yet.</p>'}</div></div></div>`}

function startCz(id){const p=P.find(x=>x.id===id);cz={...cz,pid:id,color:p.col||'#ffffff',text:'',img:null};location.hash='customize'}
function customize(){const p=P.find(x=>x.id===cz.pid),sides=p.t==='tshirt'||p.t==='hoodie'?['Front','Back','Left Sleeve','Right Sleeve']:['Front'];
 const txt=cz.text||(!cz.img&&!p.txt?'':'');
 return `<h1 class="text-2xl font-bold">Customize Your ${p.n}</h1><p class="mut text-xs mb-4">Upload your design, add text or choose from our templates.</p>
 <div class="card rounded-xl p-4 md:p-6 grid md:grid-cols-[80px_1fr_340px] gap-5">
  <div class="flex md:flex-col gap-2 order-2 md:order-1">${sides.map(s=>`<button onclick="cz.side='${s}';render()" class="card rounded-md p-1 text-[10px] w-16 ${cz.side===s?'!border-brand':''}"><div class="w-full aspect-square">${art(p.t,cz.color)}</div>${s}</button>`).join('')}</div>
  <div class="order-1 md:order-2 thumb rounded-lg relative grid place-items-center min-h-[340px] p-4"><div class="w-72 max-w-full aspect-square relative">${art(p.t,cz.color,'')}
   <div class="absolute inset-0 grid place-items-center"><div class="w-28 h-24 border border-dashed border-brand/60 rounded grid place-items-center text-center text-[10px] text-brand overflow-hidden mt-6">${cz.img?`<img src="${cz.img}" class="max-h-full" alt="Your design">`:''}${cz.text?`<span style="font-family:'${cz.font}';color:${cz.tcol};font-weight:700;font-size:15px;line-height:1.1">${cz.text.replace(/</g,'&lt;')}</span>`:''}${!cz.img&&!cz.text?'⬆<br>Click to upload<br>your image':''}</div></div></div></div>
  <div class="order-3"><div class="flex border-b ln text-xs mb-3">${['Upload Image','Add Text','Templates'].map(t=>`<button onclick="cz.tab='${t}';render()" class="px-3 py-2 ${cz.tab===t?'text-brand border-b-2 border-brand font-semibold':'mut'}">${t}</button>`).join('')}</div>
  ${cz.tab==='Upload Image'?`<label class="btn inline-block cursor-pointer text-xs">Choose Image<input type="file" accept="image/*" class="hidden" onchange="upl(this)"></label><p class="text-[10px] mut mt-1">JPG, PNG, SVG (Max 5MB)</p>`:''}
  ${cz.tab==='Templates'?`<div class="grid grid-cols-3 gap-2 text-[10px]">${['GOOD VIBES ONLY','Stay Cool','Best Mom Ever'].map(t=>`<button class="card rounded p-2 font-bold" onclick="cz.text='${t}';cz.tab='Add Text';render()">${t}</button>`).join('')}</div>`:''}
  ${cz.tab==='Add Text'||cz.tab==='Upload Image'?`<div class="mt-3 text-xs font-medium">Text Settings</div><input class="inp mt-1" placeholder="Enter your text" value="${cz.text.replace(/"/g,'&quot;')}" oninput="cz.text=this.value;livePrev()">
  <div class="grid grid-cols-[70px_1fr] gap-2 items-center mt-2 text-xs">Font Style<select class="inp" onchange="cz.font=this.value;render()">${['Poppins','Georgia','Courier New','Impact'].map(f=>`<option ${f===cz.font?'selected':''}>${f}</option>`).join('')}</select>Text Color<div class="flex gap-1.5">${['#111111','#e8262b','#ec4899','#1a63e0','#22a55a','#f59e0b'].map(c=>`<span class="sw ${c===cz.tcol?'on':''}" style="background:${c}" onclick="cz.tcol='${c}';render()"></span>`).join('')}</div></div>`:''}
  <div class="mt-4 text-xs font-medium">Product Color</div><div class="flex gap-2 mt-1">${COLS.map(c=>`<span class="sw ${c===cz.color?'on':''}" style="background:${c}" onclick="cz.color='${c}';render()"></span>`).join('')}</div>
  <div class="mt-4 text-xs font-medium">Size</div><div class="flex gap-1.5 mt-1">${['S','M','L','XL','XXL'].map(s=>`<span class="sz ${s===cz.size?'on':''}" onclick="cz.size='${s}';render()">${s}</span>`).join('')}</div>
  <div class="flex items-center justify-between mt-6"><span class="text-lg font-bold">Rs. ${p.p}</span><button class="btn flex-1 ml-4" onclick="addCz()">🛒 Add to Cart</button></div></div></div>`}
function livePrev(){const el=document.querySelector('.border-dashed');if(el&&!cz.img)el.innerHTML=cz.text?`<span style="font-family:'${cz.font}';color:${cz.tcol};font-weight:700;font-size:15px;line-height:1.1">${cz.text.replace(/</g,'&lt;')}</span>`:''}
function upl(i){const f=i.files[0];if(!f)return;if(f.size>5e6)return toast('Max 5MB');const r=new FileReader();r.onload=()=>{cz.img=r.result;render()};r.readAsDataURL(f)}
function addCz(){const p=P.find(x=>x.id===cz.pid);const k=p.id+cz.size+cz.color+cz.text;const e=cart.find(c=>c.k===k);e?e.q++:cart.push({k,id:p.id,n:p.n,size:cz.size,p:p.p,q:1,col:cz.color,txt:cz.text});save();toast('Added to cart');}

function cartPg(){const sub=cart.reduce((a,c)=>a+c.p*c.q,0),ship=cart.length?150:0;
 return `<div class="flex justify-between items-center mb-4"><h1 class="text-2xl font-bold">Your Cart</h1><a href="#shop" class="text-brand text-xs">Continue Shopping</a></div>
 ${cart.length?`<div class="card rounded-xl overflow-x-auto"><table class="w-full text-sm min-w-[520px]"><thead class="text-xs mut border-b ln"><tr><th class="text-left p-3">Product</th><th>Price</th><th>Quantity</th><th>Total</th><th></th></tr></thead><tbody>${cart.map((c,i)=>{const p=P.find(x=>x.id===c.id);return `<tr class="border-b ln text-center"><td class="p-3 text-left flex items-center gap-3"><div class="w-12 h-12 thumb rounded p-1">${art(p.t,c.col,p.txt)}</div><div class="text-xs"><div class="font-medium">${c.n}</div><div class="mut">Size: ${c.size}${c.txt?' · “'+c.txt.replace(/</g,'')+'”':''}</div></div></td><td>Rs. ${c.p}</td><td><button class="sz" onclick="qty(${i},-1)">−</button><span class="px-3">${c.q}</span><button class="sz" onclick="qty(${i},1)">+</button></td><td>Rs. ${c.p*c.q}</td><td><button onclick="cart.splice(${i},1);save();render()" aria-label="Remove" class="text-red">🗑</button></td></tr>`}).join('')}</tbody></table></div>
 <div class="flex justify-end mt-4"><div class="card rounded-xl p-4 w-full md:w-72 text-sm space-y-2"><div class="flex justify-between"><span class="mut">Subtotal</span>Rs. ${sub.toLocaleString()}</div><div class="flex justify-between"><span class="mut">Shipping</span>Rs. ${ship}</div><div class="flex justify-between font-bold border-t ln pt-2"><span>Total</span>Rs. ${(sub+ship).toLocaleString()}</div><a href="#checkout" class="btn block text-center">Proceed to Checkout</a></div></div>`:`<div class="card rounded-xl p-10 text-center"><p class="mut mb-4">Your cart is empty. Pick a product and make it yours.</p><a href="#shop" class="btn inline-block">Browse products</a></div>`}`}
function qty(i,d){cart[i].q=Math.max(1,cart[i].q+d);save();render()}

function checkout(){const t=cart.reduce((a,c)=>a+c.p*c.q,0)+(cart.length?150:0);
 return `<h1 class="text-2xl font-bold mb-4">Checkout</h1><div class="flex gap-6 text-xs mb-4"><span class="text-brand font-semibold">● Shipping</span><span class="mut">○ Payment</span><span class="mut">○ Confirmation</span></div>
 <form onsubmit="event.preventDefault();cart=[];save();toast('Order placed! We will call you to confirm.');location.hash='home'" class="card rounded-xl p-5 grid md:grid-cols-2 gap-3 max-w-2xl text-xs">
 <label>Full Name<input required class="inp mt-1" placeholder="Enter your name"></label><label>Phone Number<input required class="inp mt-1" placeholder="Enter phone number"></label>
 <label>Address<input required class="inp mt-1" placeholder="Enter your address"></label><label>City<select class="inp mt-1"><option>Karachi</option><option>Lahore</option><option>Islamabad</option></select></label>
 <div class="md:col-span-2 font-semibold mt-2">Payment Method</div>
 <label class="md:col-span-2 card rounded p-3 flex gap-2"><input type="radio" name="pm" checked>Cash on Delivery</label><label class="md:col-span-2 card rounded p-3 flex gap-2"><input type="radio" name="pm">Online Payment (JazzCash / EasyPaisa)</label>
 <div class="md:col-span-2 flex justify-between items-center font-bold text-sm">Total<span>Rs. ${t.toLocaleString()}</span></div><button class="btn md:col-span-2">Place Order</button></form>`}

function login(){return `<div class="card rounded-xl p-6 max-w-sm mx-auto text-sm"><div class="logo text-3xl text-center mb-4"><span class="text-brand italic">Mug</span><br><span class="text-red">HOUSE</span></div>
 <h1 class="font-bold text-lg text-center">Login to Your Account</h1><p class="mut text-xs text-center mb-4">Welcome back! Please login to continue.</p>
 <form onsubmit="event.preventDefault();toast('Logged in (demo)');location.hash='home'" class="space-y-3 text-xs"><label class="block">Email or Phone<input required class="inp mt-1" placeholder="Enter email or phone"></label><label class="block">Password<input required type="password" class="inp mt-1" placeholder="Enter password"></label><div class="text-right text-brand">Forgot Password?</div><button class="btn w-full">Login</button></form>
 <p class="text-xs text-center mt-4 mut">Don't have an account? <a class="text-brand" href="#login">Register</a></p></div>`}

/* ---------- router ---------- */
const R={home,shop,customize,cart:cartPg,checkout,login};
const NAV=[['home','Home'],['shop','Shop'],['customize','Customize'],['home','About Us'],['home','Contact']];
function render(){const h=(location.hash||'#home').slice(1);const k=R[h]?h:'home';
 const nav=NAV.map(([a,t])=>`<a href="#${a}" class="${a===k&&t!=='About Us'&&t!=='Contact'?'text-brand':''}">${t}</a>`).join('');$('#nav').innerHTML=nav;$('#nav2').innerHTML=nav;
 $('#app').innerHTML=R[k]();save();}
addEventListener('hashchange',()=>{render();scrollTo(0,0)});render();
