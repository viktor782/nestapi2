
import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], 
});

export interface Order extends mongoose.Document {
  products: string[]; 
}
