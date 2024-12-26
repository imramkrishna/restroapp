import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  date: { type: Date, required: true },
  tableNumber: { type: String, required: true },
  personCount: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  notes: String
}, { timestamps: true });

export default mongoose.models.Reservation || mongoose.model('Reservation', reservationSchema);