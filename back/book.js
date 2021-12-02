const { model, Schema } = require("mongoose");
// Book schema
module.exports = model("Book", new Schema({
    title: {
        type: String,
    },
    pages: {
        type: Number,
    },
    price: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
    
    }
}))
