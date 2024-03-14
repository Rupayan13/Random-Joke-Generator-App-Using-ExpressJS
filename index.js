import express from "express";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app=express();
const port=3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res)=>{
    res.render(__dirname+"/view/index.ejs");
});

app.post("/", async (req, res)=>{
    try {
        const response = await axios.get("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit");
        const result = response.data;
        res.render(__dirname+"/view/index.ejs", { content: result });
      } catch (error) {
        res.status(404).send(error.message);
      }
});

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});