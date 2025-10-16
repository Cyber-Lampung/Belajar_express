function visibilityPassword() {
  // list element
  const checkbox = document.getElementById("checkbox");

  // inputan password yang akan divisibility
  const inputPassword = document.getElementById("password");

  checkbox.addEventListener("click", () => {
    const eye = document.getElementById("eye");
    const eyeSlash = document.getElementById("eyeSlash");

    if (checkbox.checked) {
      eye.classList.add("hidden");
      eyeSlash.classList.remove("hidden");
      inputPassword.type = "text";
    } else {
      eye.classList.remove("hidden");
      eyeSlash.classList.add("hidden");
      inputPassword.type = "password";
    }
  });
}

visibilityPassword();
