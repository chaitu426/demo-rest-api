import mongoose from 'mongoose';
import config from './config'

const connectDB= async ()=>{

    try {

        await mongoose.connect(config.database_url as string)
            .then(() => {
                console.log("database is connected successfully");
            })
            .catch((error) => {
                console.error("Error connecting to the database:", error);
            });
        
    } catch (error) {
        console.log("Error connecting to the database:",error);
        process.exit(1);
    }
};

export default connectDB;