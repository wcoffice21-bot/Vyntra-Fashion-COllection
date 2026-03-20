let saved = localStorage.getItem("products");

let products = saved ? JSON.parse(saved) : [
 {id:1,name:"Product 1",price:500,image:"https://picsum.photos/200"},
 {id:2,name:"Product 2",price:800,image:"https://picsum.photos/201"}
];

let cart = [];

function loadProducts(){
 let grid = document.getElementById("products");
 if(!grid) return;

 let html = "";

 products.forEach(p=>{
  html += `
  <div class="card">
    <img src="${p.image}" onerror="this.src='https://via.placeholder.com/300'">
    <h3>${p.name}</h3>
    <p>₹${p.price}</p>
    <button onclick="addCart(${p.id})">Buy</button>
    <button onclick="deleteProduct(${p.id})">Delete</button>
  </div>
  `;
 });

 grid.innerHTML = html;
}

function addCart(id){
 let p = products.find(x => x.id == id);
 cart.push(p);

 document.getElementById("cart-count").innerText = cart.length;
 alert("Added to cart");
}

function deleteProduct(id){
 products = products.filter(p => p.id != id);

 localStorage.setItem("products", JSON.stringify(products));
 loadProducts();
}

function toggleDark(){
 document.body.classList.toggle("dark");
}

function toggleMenu(){
 document.getElementById("navLinks").classList.toggle("show");
}

window.onload = loadProducts;
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount(){
 document.getElementById("cart-count").innerText = cart.length;
}

window.onload = function(){
 loadProducts();
 updateCartCount();
}