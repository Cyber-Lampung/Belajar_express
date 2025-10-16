const menu = document.getElementById("menu");
const checkbox = document.getElementById("checkbox");
const closeMenu = document.getElementById("closeMenu");

const HalamanNavbar = document.getElementById("listMenu");
menu.addEventListener("click", () => {
  HalamanNavbar.classList.remove("left-[-390px]");
  HalamanNavbar.classList.add("left-0");
  HalamanNavbar.style.transition = "all 1s ease";

  closeMenu.addEventListener("click", () => {
    HalamanNavbar.classList.remove("left-0");
    HalamanNavbar.classList.add("left-[-390px]");
  });
});
