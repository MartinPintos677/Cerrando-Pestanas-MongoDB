const { mongoose, Schema } = require("../db");

const commentSchema = new mongoose.Schema({
  name: String,
  comment: String,
  article: { type: Schema.Types.ObjectId, ref: "Articles" },
});

commentSchema.set("toJSON", { virtuals: true });

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
