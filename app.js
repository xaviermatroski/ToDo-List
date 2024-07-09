require("dotenv").config();

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

const url = process.env.URL;
mongoose.connect(url);

// Item
const itemSchema = {
    name: String,
}

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
    name: "Welcome to your ToDo List",
})

const item2 = new Item({
    name: "Hit the + button to add new task",
})

const item3 = new Item({
    name: "<-- Hit this to delete an item",
})

const default_items = [item1, item2, item3];

// List

const listSchema = {
    name: String,
    items: [itemSchema]
}

const List = mongoose.model("List", listSchema);

// var listOfDos = [];
// var listOfWorks = [];

app.get("/", function(req, res){
    // var today = new Date();

    // var options = {
    //     weekday: "long",
    //     day: "numeric",
    //     month: "long"
    // };

    // var day = today.toLocaleDateString("en-us", options);

    Item.find({}).then(function(data){
        if(data.length == 0){
            Item.insertMany(default_items);
            res.redirect("/");
        }else{
            res.render("list", {
                listTitle: "Home",
                listOfTasks: data
            });
        }
    })

    // res.render("list", {
    //     listTitle: day,
    //     listOfTasks: listOfDos
    // });
})

app.post("/", function(req, res){
    // var task = req.body.task;

    const itemName = req.body.task;
    const listName = req.body.list;

    const tempItem = new Item({
        name: itemName,
    })

    if(listName == "Home"){
        tempItem.save();
        res.redirect("/");
    }else{
        List.find({name: listName}).then(function(data){
            data[0].items.push(tempItem);
            data[0].save();
            res.redirect("/" + listName);
        })
    }
})

app.post("/delete", function(req, res){
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;

    if(listName == "Home"){
        Item.findByIdAndDelete(checkedItemId).exec();
        res.redirect("/");
    }else{
        List.find({name: listName}).then(function(data){
            let arr = data[0].items;
            let i = 0;
            while(arr[i]._id != checkedItemId){
                i++;
            }

            if(i == 0){
                data[0].items.shift();
            }else{
                data[0].items.splice(i, i);
            }
            data[0].save();
            res.redirect("/" + listName);
        })
    }
})

app.get("/:customListName", function(req, res){
    const customListName = req.params.customListName;

    List.find({name: customListName}).then(function(data){
        // console.log(data);
        if(!data[0]){
            const list = new List({
                name: customListName,
                items: default_items
            });
    
            list.save();
            res.redirect("/" + customListName);
        }else{
            res.render("list", {
                listTitle: data[0].name,
                listOfTasks: data[0].items
            })
        }
    });
})

// app.get("/work", function(req, res){
//     var task = req.body.task;
//     res.render("list", {
//         listTitle: "Work",
//         listOfTasks: listOfWorks
//     })

// })

app.listen(process.env.PORT || 3000, function(){
    console.log("Server connected");
})