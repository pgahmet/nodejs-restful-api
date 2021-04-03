exports.customResponse = (res, code = 200, msg = null, data = null) => {
  const resData = {
    // statusCode: code,
    code: code === 200 ? 0 : code,
    msg,
  };
  if (data) {
    resData.records = data;
  }
  return res.status(code).json(resData);
};

exports.errorResponse = (res, code = 500, msg = null, error = null) => {
  const resData = {
    // statusCode: code,
    code: code === 200 ? 0 : code,
    msg,
  };
  if (error) {
    resData.error = error;
  }
  return res.status(code).json(resData);
};
