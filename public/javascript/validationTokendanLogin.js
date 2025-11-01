const form = document.getElementById("formAksesApi");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("emailuser").value;
  const password = document.getElementById("password").value;

  try {
    fetch("http://localhost:3000/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  } catch {
    console.log("tidak berhasil post data");
  }
});
