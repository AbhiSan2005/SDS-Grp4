const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Event description is required']
  },
  eventDate: {
    type: Date,
    required: [true, 'Event date is required']
  },
  location: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['Upcoming', 'Completed', 'Ongoing'],
    default: 'Upcoming'
  },
  maxParticipants: {
    type: Number,
    min: 0
  },
  registrationDeadline: {
    type: Date
  },
  featuredImage: {
    type: String,
    default: '' //Later
  },
  //Might add something for gallery or something
}, {
  timestamps: true
});

eventSchema.index({ eventDate: 1, status: 1 });

module.exports = mongoose.model('Event', eventSchema);