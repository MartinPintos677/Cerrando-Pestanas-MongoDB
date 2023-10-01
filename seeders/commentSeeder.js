const Article = require("../models/Articles");
const Comment = require("../models/Comments");

const commentsData = [
  {
    name: "Fulano",
    comment: "Esto es un comentario 1",
  },
  {
    name: "Fulano",
    comment: "Esto es otro comentario 2",
  },
  {
    name: "Fulano",
    comment: "Esto es un comentario 3",
  },
  {
    name: "Fulano",
    comment: "Esto es otro comentario 4",
  },
  {
    name: "Fulano",
    comment: "Esto es un comentario 5",
  },
  {
    name: "Fulano",
    comment: "Esto es otro comentario 6",
  },
  {
    name: "Fulano",
    comment: "Esto es un comentario 7",
  },
  {
    name: "Fulano",
    comment: "Esto es otro comentario 8",
  },
  {
    name: "Fulano",
    comment: "Esto es un comentario 9",
  },
  {
    name: "Fulano",
    comment: "Esto es otro comentario 10",
  },
];

const seedComments = async () => {
  try {
    console.log("Ejecutando seeder de comentarios...");

    const articles = await Article.find(); // Obtén todos los artículos

    for (let i = 0; i < articles.length; i++) {
      const article = articles[i];
      console.log(article);

      // Crear comentarios para el artículo actual
      const commentsForArticle = commentsData.map((commentData) => ({
        ...commentData,
        article: article._id, // Asigna el ID del artículo al comentario
      }));

      await Comment.create(commentsForArticle);
    }

    console.log("Comentarios creados con éxito");
  } catch (error) {
    console.error("Error al crear comentarios:", error);
  }
};

module.exports = seedComments;
