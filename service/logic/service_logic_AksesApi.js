function logicAksesApi(req, res, next) {
  const checkHeader = req.headers;

  const check = checkHeader.host;

  console.log(check);
}

module.exports = logicAksesApi;
