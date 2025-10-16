const validationUser = () => {
  const formLogin = document.getElementById("formLogin");

  formLogin.addEventListener("submit", async (e) => {
    // no auto refresh halaman

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      return alert("email atau password tidak boleh kosong");
    }

    // console.log(email, password); => debuging

    try {
      const res = await fetch("http://localhost:3000/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      console.log(res.json());
    } catch {
      console.log("tidak berhasil mendapatkan response");
    }
  });
};

validationUser();
