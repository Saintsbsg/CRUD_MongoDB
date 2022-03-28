const mongoose = require("mongoose");


const Usuario = new mongoose.Schema({
    nome: String,
    email: String,
    senha: String
});

module.exports = Usuario;