const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const Items = ["Gym","Eat", "Code", "Sleep"];
const workItems = [];

app.get("/", function(req,res){
    const day = date.getDate();
    res.render("list", {ListTitle: day, showItem: Items});
});


app.post("/", function(req,res){
    const Item = req.body.newItem;
    if(req.body.list === "work"){
        workItems.push(Item);
        res.redirect("/work");
    }else{
        Items.push(Item);
        res.redirect("/"); 
    }
});

app.get("/work", function(req,res){
    res.render("list", {ListTitle: "work", showItem: workItems});
});



app.listen(3000, ()=>console.log("Server Running on port:3000"));