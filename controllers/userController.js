const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  try {
    console.log(req.body.email);

    const user = await User.findOne({
      $or: [{ email: req.body.email }],
    });

    if (user) {
      console.log("Hash almacenado en la base de datos:", user.password);
      const checkPass = await bcrypt.compare(req.body.password, user.password);

      console.log("Resultado de la comparación de contraseñas:", checkPass);

      if (checkPass) {
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
          expiresIn: "10h",
        });
        user._doc.token = token;

        return res.status(201).json(user);
      } else {
        return res.status(401).json({ error: "Invalid password" });
      }
    } else {
      return res.status(401).json({ error: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function logout(req, res) {
  res.clearCookie("token");
  console.log("logged out successfully");
  res.json({ message: "Logged out successfully" });
}

// Listar todos los usuarios.
async function index(req, res) {
  try {
    const users = await User.find();
    return res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

// Mostrar un usuario específico.
async function show(req, res) {
  const username = req.params.username; // Obtén el nombre de usuario desde los parámetros de la URL
  try {
    const user = await User.findOne({ username }); // Busca el usuario por el nombre de usuario
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

// Almacenar un nuevo usuario.
async function store(req, res) {
  const { firstname, lastname, username, email, password } = req.body;
  try {
    const newUser = new User({ firstname, lastname, username, email, password });
    await newUser.save();
    return res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
}

// Actualizar un usuario existente.
async function update(req, res) {
  const usernameParam = req.params.username;
  const { firstname, lastname, newUsername, email, password } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { username: usernameParam },
      {
        // Utilizar 'usernameParam' para buscar el usuario
        firstname,
        lastname,
        username: newUsername,
        email,
        password,
      },
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
}

// Eliminar un usuario.
async function destroy(req, res) {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndRemove(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

// Exportar los métodos del controlador.
module.exports = {
  index,
  show,
  store,
  update,
  destroy,
  login,
  logout,
};
