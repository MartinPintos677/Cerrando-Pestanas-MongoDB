const Article = require("../models/Article");
const Comment = require("../models/Comment");

// Mostrar una lista de recursos.
async function index(req, res) {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

// Mostrar un recurso específico.
async function show(req, res) {
  const commentId = req.params.id;
  try {
    const comment = await Comment.findById(commentId);
    if (comment) {
      res.json(comment);
    } else {
      res.status(404).json({ error: "Comentario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

// Almacenar un nuevo recurso en la base de datos.
async function store(req, res) {
  const { name, comment, articleId } = req.body;
  try {
    const newComment = await Comment.create({ name, comment, ArticleId: articleId });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el comentario" });
  }
}

// Eliminar un recurso específico de la base de datos.
async function destroy(req, res) {
  const commentId = req.params.id;
  try {
    const commentToDelete = await Comment.findByIdAndRemove(commentId);
    if (commentToDelete) {
      res.json({ message: "Comentario eliminado exitosamente" });
    } else {
      res.status(404).json({ error: "Comentario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

// Obtener los comentarios de un artículo específico.
async function getCommentsByArticle(req, res) {
  const articleId = req.params.articleId;
  try {
    const article = await Article.findById(articleId).populate("comments");
    if (article) {
      res.json(article.comments); // Cambia "Comments" a "comments"
    } else {
      res.status(404).json({ error: "Artículo no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los comentarios del artículo" });
  }
}

module.exports = {
  index,
  show,
  store,
  destroy,
  getCommentsByArticle,
};
