import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  text: { type: String },
  price: { type: Number, required: true },
  imgUrl: { type: String },
  stock: { type: Number, default: 0 },
  category: { type: String }
}, { timestamps: true });

export default mongoose.model('Product', productSchema); 