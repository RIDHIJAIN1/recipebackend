import mongoose from "mongoose";

export const connectdb =()=>{
 mongoose
 .connect(process.env.MONGO_URL,{
    dbName: "backendapi",
 })
  .then((c)=>console.log(`Database Connected with ${c.connection.host}`))
  .catch((e)=>console.log(e))


}
