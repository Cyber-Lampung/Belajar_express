const menu = document.querySelector(".menu");
const navMenuLeft = document.querySelector(".navbarMenu");
const navIconX = document.getElementById("x");

console.log(navMenuLeft);

menu.addEventListener("click", () => {
  navMenuLeft.classList.remove("left-[-300px]");
  // navMenuLeft.classList.add("animationScrollNav");
  menu.classList.add("hidden");
});

navIconX.addEventListener("click", () => {
  navMenuLeft.classList.add("left-[-300px]");
  menu.classList.remove("hidden");
});
