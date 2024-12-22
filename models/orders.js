import mongoose from 'mongoose';
import { Schema } from "mongoose";

const BillingSchema = new Schema({
  table: { type: String, required: true },
  name: { type: String},
  phone:{type:String},
  items: [
    {
      itemname: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true }
  
},{timestamps:true});

module.exports =mongoose.models.Billing ||  mongoose.model('Billing', BillingSchema);