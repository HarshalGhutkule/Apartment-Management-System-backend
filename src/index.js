const express = require("express");
const cors = require("cors");
const connect = require("./configs/db");

const app = express();

app.use(cors());
app.use(express.json())

app.get();

app.listen(process.env.PORT || 3001, '0.0.0.0',async()=>{
    try{
        await connect()
        console.log("Listning on port 8080");
    }
    catch(err){
        console.log(err);
    }
})