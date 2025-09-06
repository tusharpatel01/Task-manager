import { app } from "./app.js";
import connectDB from "./DB/indexdb.js";
import dotenv from "dotenv"
dotenv.config({
    path:"./env"
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server started at http://localhost:${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed:", err);
  });

  app.get("/",(req,res)=>{
    res.send("Hello World");
})
