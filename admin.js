let products = JSON.parse(localStorage.getItem("products")) || [];

function addProduct(){

 let name = document.getElementById("name").value;
 let price = document.getElementById("price").value;
 let image = document.getElementById("image").value;

 let newProduct = {
  id: Date.now(),
  name,
  price,
  image
 };

 products.push(newProduct);

 localStorage.setItem("products", JSON.stringify(products));

 alert("Product Added ✅");
}