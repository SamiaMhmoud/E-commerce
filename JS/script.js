let navbar = document.querySelector("#navbar"),
    bar = document.querySelector(".mobile #bar"),
    close = document.querySelector("#close"),
    mainImg = document.querySelector("#main"),
    cart = document.querySelectorAll(".pro .cart"),
    container = document.querySelector(".container"),
    sproduct = document.querySelector(".sproduct"),
    price = document.querySelector(".sproduct .pro-details h2"),
    productTitle = document.querySelector(".sproduct .pro-details h4"),
    smallImg = document.querySelector(".small-images");
let proPrice,
    proTitle,
    proImg,
    proSize = "XL",
    proNumber = 1,
    productData;
// Check if there is local storage data
if (localStorage.product != undefined) {
    productData = JSON.parse(localStorage.product);
} else productData = [];
// Product Gallery
let allImg = [
    "A1.jpeg",
    "A2.jpeg",
    "A3.jpeg",
    "A4.jpeg",
    "B1.jpeg",
    "B2.jpeg",
    "B3.jpeg",
    "B4.jpeg",
    "C1.jpeg",
    "C2.jpeg",
    "C3.jpeg",
    "C4.jpeg",
    "D1.jpeg",
    "D2.jpeg",
    "D3.jpeg",
    "D4.jpeg",
    "E1.jpeg",
    "E2.jpeg",
    "E3.jpeg",
    "E4.jpeg",
    "F1.jpeg",
    "F2.jpeg",
    "F3.jpeg",
    "F4.jpeg",
    "G1.jpeg",
    "G2.jpeg",
    "G3.jpeg",
    "G4.jpeg",
    "H1.jpeg",
    "H2.jpeg",
    "H3.jpeg",
    "H4.jpeg",
    "I1.jpeg",
    "I2.jpeg",
    "I3.jpeg",
    "I4.jpeg",
    "J1.jpeg",
    "J2.jpeg",
    "J3.jpeg",
    "J4.jpeg",
    "K5.jpeg",
    "K2.jpeg",
    "K3.jpeg",
    "K4.jpeg",
    "L1.jpeg",
    "L2.jpeg",
    "L3.jpeg",
    "L4.jpeg",
    "M1.jpeg",
    "M2.jpeg",
    "M3.jpeg",
    "M4.jpeg",
    "N1.jpeg",
    "N2.jpeg",
    "N3.jpeg",
    "N4.jpeg",
    "O1.jpeg",
    "O2.jpeg",
    "O3.jpeg",
    "O4.jpeg",
    "S1.jpeg",
    "S2.jpeg",
    "S3.jpeg",
    "S4.jpeg",
];
cart.forEach((e) => {
    e.addEventListener('click',(el)=> {
        // Show Sproduct Page
        container.classList.add("hide");
        sproduct.classList.remove("hide");
        // Set the product title
        productTitle.innerHTML = el.target.parentElement.parentElement.querySelector("h5").innerHTML;
        proTitle = productTitle.innerHTML;
        // Set The price of single product
        price.innerHTML = el.target.parentElement.querySelector("h4").innerHTML;
        proPrice = price.innerHTML;
        // Gullery
        smallImg.innerHTML = "";
        mainGulleryImg =
        el.target.parentElement.parentElement.parentElement.querySelector(
            "img"
            ).src;
            mainImg.src = mainGulleryImg; 
            proImg = mainImg.src;
            // Search in all image for the images like main image
            allImg.forEach(img => {
                if(img.charAt(0) === mainGulleryImg.slice(-7,-6)) {
                    let sImg = document.createElement("img");
                    sImg.src = `Img/${img}`;
                    sImg.className = "small-img"
                    smallImg.appendChild(sImg);
                }
            });
        })
    });
    // Show Image that Clicked
    document.addEventListener("click", (e)=> {
        if(e.target.classList.contains("small-img")) {
            mainImg.src = e.target.src;
            proImg = mainImg.src;
        }
    });
    // Set size & number if there is Change
    document.addEventListener("change", (e)=> {
        if (e.target == document.querySelector("select")) {
            if (e.target.value === "Select Size") {
                e.target.value = "XL"; 
            }
            proSize = e.target.value;
        }
        if (e.target == document.querySelector(`input[type="number"]`)) {
            if (e.target.value <= 0) {
                e.target.value = 1; 
            }
            proNumber = e.target.value;
        }
    });
// Stor data at click on Single product button
document.querySelector(".sproduct .sec-button").onclick = ()=> {
  let proObj = {
    proPrice: proPrice,
    proTitle: proTitle,
    proImg: proImg,
    proSize: proSize,
    proNumber: proNumber,
  };
  productData.push(proObj);
  // Set data in local storage
  localStorage.setItem("product", JSON.stringify(productData));
  // Product count in bag icon
  document.querySelectorAll(".pro-count").forEach((e) => {
    e.dataset.count = Number(e.dataset.count) + 1;
  });
}