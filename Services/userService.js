const mongoose = require("mongoose");
const Usario = require("../Models/Usuario");
const User = mongoose.model("usuarios", Usario);
class userService{
    async create(nome, email, senha){
        let user = new User({
            nome ,
            email ,
            senha
        });

        try {
            await user.save();
            return true;
        } catch (error) {
            console.log(error)
            return false
        }
    };

    async findByEmail(email){
        try {
            let user = await User.findOne({email: email});
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    async findAll(){
        try {
            let users = await User.find();
            return users;
        } catch (error) {
            console.log(error)
        }
    }

    async update(id, nome, email){
        try {
            let user = await User.findOneAndUpdate({_id: id}, {
                nome,
                email
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async delete(id){
            try {
             await  User.findByIdAndDelete({_id: id});
             return true;
            } catch (error) {
                console.log(error);
                return false;
            }

        
    }
}



module.exports = new userService();