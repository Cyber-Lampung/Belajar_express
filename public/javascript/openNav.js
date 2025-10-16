const openNav = () => {
  const checkbox = document.getElementById("arrowClose");
  const elementNav = document.getElementById("NavbarAsideIcon");
  const iconArrow = document.getElementById("iconCloseOpen");
  console.log(iconArrow);

  checkbox.addEventListener("click", () => {
    if (checkbox.checked) {
      elementNav.classList.remove("left-[-75px]");
      iconArrow.style.transform = "rotate(30deg)";
      elementNav.style.transition = "all 1s ease";
    } else {
      elementNav.classList.add("left-[-75px]");
    }
  });
};

openNav();
