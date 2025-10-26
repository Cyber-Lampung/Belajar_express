const validationLogin = (e) => {
  const form = document.getElementById("formAksesApi");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailUser = document.getElementById("emailuser").value;
    const password = document.getElementById("password").value;

    const req = fetch("http://localhost:3000/api/v1/user/Login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailUser, password),
    });

    console.log((req) => req.json());
    console.log(req);
  });
};

validationLogin();
