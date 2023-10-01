const userRoutes = require("./userRoutes");
const articleRoutes = require("./articleRoutes");
const commentRoutes = require("./commentRoutes");

//const publicRoutes = require("./articleRoutes");
// const privateRoutes = require("./privateRoutes");

module.exports = (app) => {
  app.use("/", userRoutes);
  app.use("/", articleRoutes);
  app.use("/", commentRoutes);

  //app.use("/", publicRoutes);
};
