const routingAdmin = (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);
};

module.exports = routingAdmin;
