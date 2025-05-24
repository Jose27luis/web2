const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  //esperamos
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({ mensaje: "token no proporcionado" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ mensaje: "token invalido" });

    req.user = user; //[el id, rol] se guarda
    next();
  });
};
const soloAdmin = (req, res, next) => {
  if (req.user.rol !== "admin") {
    return res
      .status(403)
      .json({ mensaje: "acceso solo para administradores" });
  }
  next();
};
module.exports = { verificarToken, soloAdmin };
