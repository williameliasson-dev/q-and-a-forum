import { Schema, model, models } from "mongoose";

const commentSchema = new Schema(
  {
    qid: { type: "String", required: true },
    content: { type: "String", required: true },
    userName: { type: "String", required: true },
    userId: { type: "String", required: true },
    userImg: { type: "String", required: true },
  },
  {
    timestamps: true,
  }
);

const Comment = models.Comment || model("Comment", commentSchema);

export default Comment;
