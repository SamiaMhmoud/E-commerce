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
  // Update discount
  // if (document.querySelector(".cart-discount").innerHTML !== "$") {
  //   document.querySelector(".cart-discount").innerHTML = totalAfterDiscount(total,cartDiscount);
  // }
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
let titleContent, parContent, btnContent, buyBtnContent, cancelContent;
document.querySelector(".coupon button").addEventListener('click', ()=> {
  if(productTable.innerHTML !== "") {
    if(document.querySelector(".coupon input").value === 'coupon$') {
      // popup for discount
        titleContent = "Congratulation";
        parContent = `You have got <span>${cartDiscount}</span> discount`;
        btnContent = "got it";
        cancelContent = "Cancel";
      cpnPopup();
    }else {
      titleContent = null;
      btnContent = null;
      cancelContent = "OK";
      parContent = "Plese Enter a Correct Coupon";
      cpnPopup();
    }
  }else {
    titleContent = null;
    btnContent = null;
    cancelContent = "OK";
    parContent = "Please Add Your Cart";
    cpnPopup()
  }
});

function cpnPopup() {
  let overlay = document.createElement("div");
  overlay.className = "overlay";
  let couponPopup = document.createElement("div");
  couponPopup.className = "coupon-popup";
  // Check if there title content
  if(titleContent) {
    let title = document.createElement("h3");
    title.innerText = titleContent;
    couponPopup.appendChild(title);
  }
  let par = document.createElement("p");
  par.innerHTML = parContent;
  let cancel = document.createElement("button");
  cancel.className = "coupon-btn cancel";
  cancel.innerText = cancelContent;
  // Append Element
  couponPopup.appendChild(par);
  couponPopup.appendChild(cancel);
  // Check if there is btn Content
  if(btnContent) {
    let btn = document.createElement("button");
    btn.className = "coupon-btn discount-btn";
    btn.innerText = btnContent;
    couponPopup.appendChild(btn);
  }
  // Checkout Products btn
  if (buyBtnContent) {
    let btn = document.createElement("button");
    btn.className = "coupon-btn buy-btn";
    btn.innerText = buyBtnContent;
    couponPopup.appendChild(btn);
  }
  overlay.appendChild(couponPopup);
  document.body.appendChild(overlay);
}

document.addEventListener("click", (e)=> {
  if(e.target.classList.contains("cancel")) {
    e.target.parentElement.parentElement.classList.add("hide");
  }
  if(e.target.classList.contains("discount-btn")) {
      document.querySelector(".cart-discount").innerHTML = totalAfterDiscount(
        total,
        cartDiscount
      );
      e.target.parentElement.parentElement.classList.add("hide");
  }
  if (e.target.classList.contains("checkout")) {
    if(total !== 0) {
      titleContent = null;
      btnContent = null;
      buyBtnContent = "Buy";
      cancelContent = "Cancel";
      parContent = "Your Cart Is Placed";
      cpnPopup();
      document.addEventListener('click', (e)=> {
        if (e.target.classList.contains("buy-btn")) {
          localStorage.product = '[]';
          showProducts();
          getTotal(total);
          e.target.parentElement.parentElement.classList.add("hide");
        }
      })
    }
  }
});

// Count Total After Discount
function totalAfterDiscount(total ,cartDiscount) {
  let afterDiscount = "$ " + (total - (total * cartDiscount.replace("%", "")) / 100);
  return afterDiscount;
}