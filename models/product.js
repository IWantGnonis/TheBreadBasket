import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Breads', 'Pastries', 'Cakes']
    },
    image: {
        type: String,
        required: true
    }
});

export default mongoose.model('Product', productSchema); 