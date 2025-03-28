import mongoose from 'mongoose';

export const conectDb = async ( ) => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_DB)
        console.log("MongoDB connected: " + conn.connection.host)
    } catch (error) {
        console.log("Error connecting to the database", error);
    }
}