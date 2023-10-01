const Article = require("../models/Articles");
const User = require("../models/User");

const articlesData = [
  {
    title: "Título Primer Artículo",
    content: "Contenido del primer artículo.",
    image: "articulo1.jpg",
  },
  {
    title: "Título Segundo Artículo",
    content: "Contenido del segundo artículo.",
    image: "articulo1.jpg",
  },
  {
    title: "Título Tercer Artículo",
    content: "Contenido del tercer artículo.",
    image: "articulo1.jpg",
  },
  {
    title: "Título Cuarto Artículo",
    content: "Contenido del cuarto artículo.",
    image: "articulo1.jpg",
  },
  {
    title: "Título Quinto Artículo",
    content: "Contenido del quinto artículo.",
    image: "articulo1.jpg",
  },
];

const seedArticles = async () => {
  try {
    console.log("Ejecutando seeder de artículos...");

    const user = await User.findOne({ username: "User" }); // Buscar al usuario por su username

    if (!user) {
      console.error("Usuario no encontrado");
      return;
    }

    const articles = articlesData.map((article) => ({
      ...article,
      user: user._id, // Asignar el ID del usuario correspondiente
    }));

    await Article.create(articles);

    console.log("Artículos creados con éxito");
  } catch (error) {
    console.error("Error al crear artículos:", error);
  }
};

module.exports = seedArticles;
