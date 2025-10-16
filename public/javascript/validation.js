const validation = () => {
  // membuat get id form Register

  const formRegister = document.getElementById("formRegister");

  formRegister.addEventListener("submit", async (e) => {
    e.preventDefault();

    // mengambil data inputan

    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const id = username.length + 2;

    // console.log(email, username, password); => debuging

    const send = await fetch("http://localhost:3000/userNew", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, email, username, password }),
    });

    const res = await send.json();
    console.log(res.message);
  });
};

validation();
