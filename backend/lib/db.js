import mongoose from 'mongoose';



const dbconnect = async () => {
  try {
    console.log(process.env.DB_URL)
    await mongoose.connect(process.env.DB_URL);
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1); 
  }
};
export default dbconnect;
