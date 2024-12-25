import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  tableNum: {
    type: String,
    required: true
  },
  method: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Payment || mongoose.model('Payment', paymentSchema);