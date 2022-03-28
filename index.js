const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userService = require("./Services/userService");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/usuarios").then(() =>{
    console.log("Conectado ao bd");
}).then(err =>{
    console.log(err);
});

app.get("/usuarios", async (req, res)=>{
    let users = await userService.findAll();
    if(users != undefined){
        res.status(200).json(users);
    }else{
        res.statusCode(500);
    }
})

app.post("/usuario", async (req, res) =>{
    let {nome, email, senha} = req.body;
    let result = await userService.create(nome, email, senha);
    if(result){
        res.status(200);
        res.send("Ok")
    }

});

app.get("/usuario/:email", async (req, res)=>{
    let user = await userService.findByEmail(req.params.email);
    if(user != undefined){
        res.status(200).json(user);
    }else{
        res.status(404);
    }
});

app.put("/usuario/:id", async (req, res) =>{
    let id = req.params.id;
    let {nome, email} = req.body;
    let user = await userService.update(id, nome, email);

    if(user){
        res.status(200);
        res.send("Ok");
    }else{
        res.status(404);
    }
})


app.listen(8080, ()=>{
    console.log("Servidor rodando!");
});
