const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/ToDoListDB", {useNewUrlParser: true});
const itemsSchema = {
    name: String
};
const Item = mongoose.model("Item", itemsSchema);

app.get('/', function(req,res){
    Item.find().then(function(FoundItems){
        if(FoundItems.length === 0){
            const item1 = new Item({
                name: "Eat"
            });
            const item2 = new Item({
                name: "Code"
            });
            const item3 = new Item({
                name: "Sleep"
            });  
            const defaultItems = [item1, item2, item3];
            Item.insertMany(defaultItems).then(function () {
                    console.log("Successfully saved defult items to DB");
                  })
                  .catch(function (err) {
                    console.log(err);
                  });
            res.redirect('/');
        }
        else{
            res.render("index", {heading: "ToDo List Items", item: FoundItems});
        }
    });
})
app.post("/", function(req,res){
    const itemName = req.body.newItem;
    const item = new Item({
        name: itemName
    }).save();
    res.redirect('/');
})

app.post('/delete', function(req,res){
    console.log(req.body.deleteItem)
    const checkedItem = req.body.deleteItem;
    Item.findByIdAndRemove(checkedItem)
    .exec();
    res.redirect('/');
});

app.listen(3000, ()=>console.log("Server started on port:3000"));
