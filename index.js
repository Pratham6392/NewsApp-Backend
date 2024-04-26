import express from "express";
import {getClient } from "./utills/Client.js";
import fileupload from "express-fileupload";

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileupload());


getClient().then(()=>{
    console.log("connected to database");
})


//import routes
import ApiRoutes from "./Routes/api.js";

app.use("/api",ApiRoutes);


const port = 3000; 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});