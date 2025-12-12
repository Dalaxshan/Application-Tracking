import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  resumeUrl: { type: String, required: true },
  coverLetter: String,
  status: { type: String, enum: ['New', 'Reviewed', 'Interview', 'Rejected', 'Offer'], default: 'New' },
  appliedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);