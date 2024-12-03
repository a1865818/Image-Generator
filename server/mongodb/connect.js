import mongoose from "mongoose";
const connectDB = (url) => {
    mongoose.set('strictQuery', true);

    mongoose.connect(url).then(() => {
        console.log("Database connected");
    }).catch((error) => {
        console.log("Error connecting to database", error);
    });
};

export default connectDB;