module.exports = (err, req, res, next) => {
  if (!err) return next();
  res.status(500).send({
    code: 500,
    msg: err.message,
  });
};
