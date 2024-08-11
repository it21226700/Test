import mongoose from "mongoose";


// Stock ID
// Product Name
// Category
// Quantity Available
// Supplier Information
// Purchase Dates
// Location
// Stock Status
// Image
const stockSchema =mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    supplier: {
        type: String,
        required: true,
    },
    purchaseDate: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

const Stock = mongoose.model("Stock", stockSchema);
export default Stock;
