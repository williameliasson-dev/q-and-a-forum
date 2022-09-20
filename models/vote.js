import { Schema, model, models } from "mongoose";

const voteSchema = new Schema(
  {
    qid: { type: "String", required: true },
    type: { type: "String", required: true },
    userEmail: { type: "String", required: true },
  },
  {
    timestamps: true,
  }
);

const Vote = models.Vote || model("Vote", voteSchema);

export default Vote;
