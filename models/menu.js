import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true
  },
  itemImage: {
    type: String,
    required: false
  },
  itemPrice: {
    type: Number,
    required: true
  }
}, { timestamps: true });

export default mongoose.models.Menu || mongoose.model('Menu', menuSchema);