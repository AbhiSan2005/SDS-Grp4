import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    link: {
      type: String,
      trim: true
    },
    githubLink: {
        type: String,
        trim: true,
    },
    image: {
      type: String,
      trim: true
    },
    members: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member"
    }],
    technologies: {
      type: [String],
      required: true,
    },
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    },
    isVisible: {
      type: Boolean,
      default: true
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
