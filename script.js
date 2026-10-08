const products=[
{id:1,name:"Mini Candy",cat:"Toffees",price:250,unit:"Box",qtyLabel:"100 pcs",emoji:"🍬"},
{id:2,name:"Cash Candy",cat:"Toffees",price:200,unit:"Box",qtyLabel:"50 pcs",emoji:"🍬"},
{id:3,name:"Eclair",cat:"Toffees",price:240,unit:"Box",qtyLabel:"48 pcs",emoji:"🍬"},
{id:4,name:"Boom Boom",cat:"Bubbles",price:300,unit:"Box",qtyLabel:"60 pcs",emoji:"🫧"},
{id:5,name:"Elaichi Bubble",cat:"Bubbles",price:300,unit:"Box",qtyLabel:"60 pcs",emoji:"🫧"},
{id:6,name:"Fresh Up",cat:"Bubbles",price:300,unit:"Box",qtyLabel:"60 pcs",emoji:"🫧"},
{id:7,name:"Sting",cat:"Bubbles",price:250,unit:"Box",qtyLabel:"50 pcs",emoji:"🫧"},
{id:8,name:"Salva 10",cat:"Nimko",price:240,unit:"Box",qtyLabel:"24 packs",emoji:"🥜"},
{id:9,name:"Salva 20",cat:"Nimko",price:240,unit:"Box",qtyLabel:"12 packs",emoji:"🥜"},
{id:10,name:"Nani Chocolate",cat:"Chocolate",price:1200,unit:"Box",qtyLabel:"24 pcs",emoji:"🍫"},
{id:11,name:"Spark Chocolate",cat:"Chocolate",price:600,unit:"Box",qtyLabel:"30 pcs",emoji:"🍫"},
{id:12,name:"Choco Stick",cat:"Biscuits",price:300,unit:"Box",qtyLabel:"30 pcs",emoji:"🍪"},
{id:13,name:"Strawberry Sticks",cat:"Biscuits",price:300,unit:"Box",qtyLabel:"30 pcs",emoji:"🍪"},
{id:14,name:"Sunflower Seeds",cat:"Snacks",price:120,unit:"Box",qtyLabel:"12 packs",emoji:"🌻"}
];
const WA="923041668739";let cart=JSON.parse(localStorage.getItem("sweetcart")||"[]"),active="All";const money=n=>"Rs. "+n.toLocaleString("en-PK");
function renderFilters(){let cats=["All",...new Set(products.map(p=>p.cat))];document.getElementById("filters").innerHTML=cats.map(c=>'<button class="filter '+(c===active?"active":"")+'" onclick="setCat(\''+c+'\')">'+c+"</button>").join("")}
function renderProducts(){let list=active==="All"?products:products.filter(p=>p.cat===active);document.getElementById("products").innerHTML=list.map(p=>'<article class="product"><div class="pic">'+p.emoji+'</div><div class="info"><span class="tag">'+p.cat+'</span><h3>'+p.name+'</h3><div class="meta">'+p.unit+' • '+p.qtyLabel+' • Retail</div><div class="price-row"><span class="price">'+money(p.price)+'</span><button class="add" onclick="add('+p.id+')">+ Add</button></div></div></article>').join("")}
function setCat(c){active=c;renderFilters();renderProducts();document.getElementById("shop").scrollIntoView({behavior:"smooth"})}
function add(id){let item=cart.find(x=>x.id===id);item?item.qty++:cart.push({id,qty:1});save();openCart()}
function save(){localStorage.setItem("sweetcart",JSON.stringify(cart));renderCart()}
function renderCart(){document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);let box=document.getElementById("cartItems");if(!cart.length){box.innerHTML='<div class="empty">Your cart is empty.<br>Pick something sweet to get started 🍬</div>';document.getElementById("cartTotal").textContent="Rs. 0";return}let total=0;box.innerHTML=cart.map(x=>{let p=products.find(y=>y.id===x.id);total+=p.price*x.qty;return'<div class="cart-item"><div class="cart-emoji">'+p.emoji+'</div><div style="flex:1"><strong>'+p.name+'</strong><small>'+money(p.price)+' / '+p.unit+' • '+p.qtyLabel+'</small><div class="qty"><button onclick="change('+p.id+',-1)">−</button><span>'+x.qty+'</span><button onclick="change('+p.id+',1)">+</button></div></div></div>'}).join("");document.getElementById("cartTotal").textContent=money(total)}
function change(id,d){let x=cart.find(i=>i.id===id);if(!x)return;x.qty+=d;if(x.qty<=0)cart=cart.filter(i=>i.id!==id);save()}
function openCart(){document.getElementById("cartPanel").classList.add("open");document.getElementById("overlay").classList.add("open")}
function closeCart(){document.getElementById("cartPanel").classList.remove("open");document.getElementById("overlay").classList.remove("open")}
function sendWhatsApp(wholesale){if(!cart.length&&!wholesale){alert("Please add products to your cart first.");return}let msg=wholesale?"Hello SweetCart! I want wholesale rates/quantities. Please share available products and rates.":"Hello SweetCart! I want to place an order:\n\n"+cart.map(x=>{let p=products.find(y=>y.id===x.id);return"• "+p.name+" x "+x.qty+" "+p.unit+" = "+money(p.price*x.qty)}).join("\n")+"\n\nEstimated total: "+money(cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0))+"\n\nName:\nPhone:\nDelivery area/address:";window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(msg),"_blank")}
document.getElementById("cartOpen").onclick=openCart;document.getElementById("cartClose").onclick=closeCart;document.getElementById("overlay").onclick=closeCart;document.getElementById("checkout").onclick=()=>sendWhatsApp(false);document.getElementById("wholesaleBtn").onclick=e=>{e.preventDefault();sendWhatsApp(true)};document.querySelectorAll(".cat-grid button").forEach(b=>b.onclick=()=>setCat(b.dataset.cat));renderFilters();renderProducts();renderCart();