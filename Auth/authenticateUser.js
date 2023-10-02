const jwt = require("jsonwebtoken");

function authenticateUser(req, res, next) {
  const token = req.header("Authorization"); // Asumiendo que el token se envía en el encabezado "Authorization"

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded; // Agregar el usuario decodificado al objeto de solicitud
    next(); // Continuar con la siguiente función en la ruta
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
}

module.exports = authenticateUser;
