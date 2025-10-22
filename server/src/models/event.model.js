import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    agenda: {
      type: String
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    organizer: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true,
      enum: ["Upcoming", "Ongoing", "Completed", "Cancelled"],
      default: "Upcoming",
    },
    imageUrl: { type: String }, // For the main event banner
    gallery: { type: [String] }, // For multiple gallery images
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
