const verifyTokenheader = (req, res, next, token) => {
  if (!token) {
    return false;
  } else {
    return true;
  }
};

module.exports = verifyTokenheader;
