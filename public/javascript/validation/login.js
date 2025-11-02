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
      const res = await fetch("http://localhost:3000/api/v1/user/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });

      const data = res.json();
      data.then((berhasil) => {
        console.log(berhasil);
      });

      data.catch((error) => {
        console.log(error);
      });

      data.finally((response) => {
        console.log("permintaan selesai", response);
      });
    } catch {
      console.log("tidak berhasil mendapatkan response");
    }
  });
};

validationUser();
