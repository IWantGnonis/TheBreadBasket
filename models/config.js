import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Create Schema
const Loginschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Collection part
const collection = mongoose.model("users", Loginschema);

const configSchema = new mongoose.Schema({
    // your schema definition
});

export default mongoose.model('Config', configSchema);