const User = require("../models/User");
const Article = require("../models/Articles");
const formidable = require("formidable");

// Mostrar una lista de recursos.
async function index(req, res) {
  try {
    const articles = await Article.find().populate("user");
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

// Mostrar un recurso específico.
async function show(req, res) {
  const articleId = req.params.id;
  try {
    const article = await Article.findById(articleId).populate("User");
    if (!article) {
      return res.status(404).json({ error: "Artículo no encontrado" });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

// Almacenar un nuevo recurso en la base de datos.
async function store(req, res) {
  try {
    const form = formidable({
      multiples: false,
      uploadDir: __dirname + "/../public/img",
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      const userId = req.user.id;

      const articleCreate = {
        title: fields.title,
        content: fields.content,
        image: files.image.newFilename,
        User: userId,
      };

      const article = await Article.create(articleCreate);
      res.status(201).json(article);
    });
  } catch (error) {
    res.status(500).json({ error: "Solicitud incorrecta" });
  }
}

// Actualizar un recurso específico en la base de datos.
async function update(req, res) {
  try {
    const form = formidable({
      multiples: false,
      uploadDir: __dirname + "/../public/img",
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      const { id } = req.params;
      const userId = req.user.id; // Puedes obtener el usuario actual desde la solicitud

      const articleUpdate = {
        title: fields.title,
        content: fields.content,
        User: userId,
      };

      if (files.image) {
        articleUpdate.image = files.image.newFilename;
      }

      const article = await Article.findByIdAndUpdate(id, articleUpdate, { new: true });
      if (!article) {
        return res.status(404).json({ error: "Artículo no encontrado" });
      }

      res.status(200).json(article);
    });
  } catch (error) {
    res.status(400).json({ error: "Solicitud incorrecta" });
  }
}

// Eliminar un recurso específico de la base de datos.
async function destroy(req, res) {
  const articleId = req.params.id;
  try {
    const article = await Article.findByIdAndRemove(articleId);
    if (!article) {
      return res.status(404).json({ error: "Artículo no encontrado" });
    }
    res.json({ message: "Artículo eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
