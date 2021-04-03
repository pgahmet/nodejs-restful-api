module.exports = (req, res, next) => {
  if (req.method !== "POST") {
    return res.status(400).send({
      code: 400,
      msg: "Method not supported! You can use just POST method",
    });
  }
  res.status(404).send({
    code: 404,
    msg: "Not Found!",
  });
};
