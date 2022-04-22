import mongoose from "mongoose";

const connectDB = async (URI) => {
    await mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    console.log(`Connected to MongoDB 🌿 with URI: ${URI}`)
}

export default connectDB;