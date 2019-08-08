const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {

    async index(req,res){

        const { user } = req.headers;  //identifica o usuário logado
        const loggedDev = await Dev.findById(user);

        const users = await Dev.find({

            $and: [  //operador para que todas as condições seja satifeita simultaneamente.
                { _id: { $ne: user} }, //o usuário logado não pode listar ele mesmo!
                { _id: { $nin: loggedDev.likes} }, //não pode está dentro da lista que o usuário já deu like 
                { _id: { $nin: loggedDev.dislikes} }, //não pode está dentro da lista que o usuário já deu dislike
            ],
        })
        return res.json(users);
    },

    async store(req, res){
        const { username } = req.body;

        const userExists = await Dev.findOne({ user: username });

        if (userExists){
            return res.json(userExists);
        }

        const response = await axios.get(`https://api.github.com/users/${username}`);

        const { name, bio, avatar_url: avatar } = response.data;

        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        })

        return res.json(dev);
    }
}