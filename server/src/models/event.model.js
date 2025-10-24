import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required.'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  agenda: String,
  startDate: {
    type: Date,
    required: [true, 'Start date is required.']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required.'],
  },
  location: String,
  organizer: String,
  status: {
    type: String,
    enum: {
      values: ['Upcoming', 'Ongoing', 'Past', 'Cancelled'],
      message: '{VALUE} is not a supported status.'
    },
    default: 'Upcoming'
  },
  imageUrl: String,
  gallery: [String],
}, {
  timestamps: true
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
