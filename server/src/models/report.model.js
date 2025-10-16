import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Report title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Report description is required']
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: false
  },
  reportType: {
    type: String,
    enum: ['Project Report', 'Event Report', 'Monthly Report', 'Annual Report', 'Other'],
    default: 'Project Report'
  },
  filePath: {
    type: String,
    required: [true, 'Report file is required']
  },
  fileName: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dateFrom: {
    type: Date
  },
  dateTo: {
    type: Date
  },
  status: {
    type: String,
    enum: ['Draft', 'Published', 'Archived'],
    default: 'Published'
  }
}, {
  timestamps: true
});

reportSchema.index({ title: 'text', description: 'text' });

export default mongoose.model('Report', reportSchema);