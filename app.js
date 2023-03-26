const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
var Items = ["WakeUp", "Gym", "Code", "Sleep"];

app.get("/", function(req,res){
    var today = new Date();
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };
    var day = today.toLocaleDateString("en-US", options);  
    res.render("list", {getDate: day, showItem: Items});
});


app.post("/", function(req,res){
    var Item = req.body.newItem;
    Items.push(Item);
    res.redirect("/");
})


app.listen(3000, ()=>console.log("Server Running on port:3000"));