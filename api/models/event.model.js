import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    organizedBy: {
      type: Schema.Types.ObjectId,
      ref: "Organisation",
    },
    eventDate: {
      type: Date,
      required: true,
    },
    eventTime: {
      type: String,
      required: true,
    },
    eventVenue: {
      type: String,
      required: true,
      trim: true,
    },
    volunteer: [{
      type: Schema.Types.ObjectId,
      ref: "User",
    }],
    participants: [{
      type: Schema.Types.ObjectId,
      ref: "User",
    }],
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
