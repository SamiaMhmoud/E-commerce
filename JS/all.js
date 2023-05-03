// Navbar open & close
bar.onclick = () => {
    navbar.classList.add("open");
};
document.querySelector("#close").onclick = () => {
    navbar.classList.remove("open");
};
if (localStorage.product != undefined) {
    products = JSON.parse(localStorage.product);
    // Product count in bag icon
    document.querySelectorAll(".pro-count").forEach((e) => {
        e.dataset.count = products.length;
    });
}
