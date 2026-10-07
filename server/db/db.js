const mongoose=require("mongoose");
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); // Workaround for Node.js SRV DNS bug

const connectToDB=async()=>{
   try {
    await mongoose.connect(process.env.MONGO_URL , {});
    console.log("Connected to DB");
   } catch (error) {
    console.log(`Failed to Connect to Database due to  ${error.message}`);
    process.exit(1);
   }
}
module.exports=connectToDB