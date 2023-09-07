import { ObjectId, Schema, model, Document } from "mongoose";

interface secimAnketDoc extends Document {
  _id: ObjectId;

  discordId: string;

  aday: "erdogan" | "kilicdaroglu";
}

const guildUserSchema = new Schema({
  discordId: { type: String, required: true },

  aday: { type: String, required: true },
});

const anketModel = model<secimAnketDoc>("anket", guildUserSchema);

export { anketModel };
