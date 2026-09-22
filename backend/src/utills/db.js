import mongoose from "mongoose"

const connectDB=async()=>{
try{
    await mongoose.connect(process.env.MONGODBURL);
    console.log("Mongogodb connected");

    }catch(error){
        console.error('Mongodb connections failed',error);
        process.exit(1); 
    }
}
export default connectDB;