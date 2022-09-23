import { Schema, model, models } from "mongoose";

const commentSchema = new Schema(
  {
    qid: { type: "String", required: true },
    content: { type: "String", required: true },
    solution: { type: "Boolean", default: false, required: true },
    userName: { type: "String", required: true },
    userEmail: { type: "String", required: true },
    userImg: { type: "String", required: true },
  },
  {
    timestamps: true,
  }
);

const Comment = models.Comment || model("Comment", commentSchema);

export default Comment;
