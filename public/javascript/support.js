const supportHandelPesan = () => {
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const pesan = document.getElementById("pesan");

  const pesanWhatsapp = `hello nama saya ${username} dan email saya ${email} dan saya ingin menyampaikan keluhan saya yaitu ${pesan}`;

  console.log(pesanWhatsapp);
};

const kirim = document.getElementById("kirim");

kirim.addEventListener("submit", () => {
  supportHandelPesan();
});
