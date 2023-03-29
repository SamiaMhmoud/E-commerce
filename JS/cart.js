let total = 0;
let cartDiscount = '40%';
let products;
let productTable = document.querySelector(".pro-cart table tbody");
let cartTotal = document.querySelector(".cart-total");
// Show products 
function showProducts(){
  if (localStorage.product != undefined) {
    products = JSON.parse(localStorage.product);
      let table = "";
      total =0;
      for (let i = 0; i < products.length; i++) {
          table += `
                    <tr>
                        <td><i class="far fa-times-circle" onclick="deleteData(${i})" ></i></td>
                        <td><img src=${products[i].proImg} alt=""></td>
                        <td>${products[i].proTitle}</td>
                        <td>${products[i].proPrice}</td>
                        <td>${products[i].proNumber}</td>
                        <td>${products[i].proSize}</td>
                        <td>$ ${
                          Number(products[i].proPrice.replace("$", "")) *
                          products[i].proNumber
                        }</td>
                    </tr>
                    `;
          total +=
            Number(products[i].proPrice.replace("$", "")) *
            products[i].proNumber;
          // getTotal(total);
      }
      productTable.innerHTML = table;
  } else products = [];
}
showProducts();
// Delete Products
function deleteData(i) {
  total =0;
  products.splice(i, 1);
  localStorage.product = JSON.stringify(products);
  // Update Products
  showProducts();
  // Update total
  getTotal(total);
}
function getTotal(total) {
  document.querySelector(".cart-subtotal").innerHTML = "$ " + total;
  cartTotal.innerHTML = "$ " + total;
  // Update discount
  if (document.querySelector(".cart-discount").innerHTML != "$") {
    document.querySelector(".cart-discount").innerHTML = totalAfterDiscount(
      total,
      cartDiscount
    );
  }
}
getTotal(total);
// Check Coupon
document.querySelector(".coupon button").addEventListener('click', ()=> {
  blurEffect('add');
  if(productTable.innerHTML !== "") {
    if(document.querySelector(".coupon input").value === 'coupon$') {
      // popup for discount
        document.querySelector(".discount-popup").classList.remove("hide");
    }else {
      cpnPopup("Plese Enter a Correct Coupon","OK");
    }
  }else {
    cpnPopup("Please Add Your Cart", "OK");
  }
});
// Blur Effect 
function blurEffect(option){
  document.querySelectorAll(".blur").forEach((e) => {
    if(option == 'add') {
      e.classList.add("blur-effect");
    }else {
      e.classList.remove("blur-effect");
    }
  });
}

function cpnPopup(parContent, cancelContent) {
  let overlay = document.createElement("div");
  overlay.className = "overlay";
  let couponPopup = document.createElement("div");
  couponPopup.className = "coupon-popup";
  let par = document.createElement("p");
  par.innerHTML = parContent;
  let cancel = document.createElement("button");
  cancel.className = "coupon-btn cancel";
  cancel.innerText = cancelContent;
  // Append Element
  couponPopup.appendChild(par);
  couponPopup.appendChild(cancel);
  overlay.appendChild(couponPopup);
  document.body.appendChild(overlay);
}

document.addEventListener("click", (e)=> {
  if(e.target.classList.contains("cancel")) {
    blurEffect('remove');
    e.target.parentElement.parentElement.classList.add("hide");
    document.querySelector("#coupon-inp").value = "";
  }
  if (e.target.classList.contains("btn-discount")) { 
    if(document.querySelector("#discount-email").value) {
      blurEffect('remove');
      document.querySelector(".cart-discount").innerHTML = totalAfterDiscount(
        total,
        cartDiscount
      );
      e.target.parentElement.parentElement.classList.add("hide");
      document.querySelector("#coupon-inp").value = "";
    }
  }
  if (e.target.classList.contains("checkout")) {
    blurEffect('add');
    if(total !== 0) {
      cpnPopup("Your Cart Is Placed","OK");
      localStorage.product = '[]';
      // Update Products
      showProducts();
      // update total
      getTotal(total);
      e.target.parentElement.parentElement.classList.add("hide");
    }
  }
});

// Count Total After Discount
function totalAfterDiscount(total ,cartDiscount) {
  let afterDiscount = "$ " + (total - (total * cartDiscount.replace("%", "")) / 100);
  return afterDiscount;
}