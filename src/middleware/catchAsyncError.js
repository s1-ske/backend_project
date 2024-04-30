const { respo } = require("../utils/util");

module.exports = (theFunc) => (req, res, next) => {
  Promise.resolve(theFunc(req, res, next)).catch((err) =>
    respo(res, 500, err?.message, err)
   
  );
};