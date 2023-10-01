const { mongoose, Schema } = require("../db");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

articleSchema.set("toJSON", { virtuals: true });

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
