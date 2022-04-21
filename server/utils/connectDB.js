const mongoose = require("mongoose");

const connectDB = async (URI) => {
    await mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    console.log(`Connected to MongoDB 🌿 with URI: ${URI}`)
}

module.exports = connectDB;