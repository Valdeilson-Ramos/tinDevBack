const express = require('express');
const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');

const routes = express.Router();

routes.get('/devs', DevController.index); //visualiza devs
routes.post('/devs', DevController.store); //adiciona um novo dev
routes.post('/devs/:devId/likes', LikeController.store); //rota para dá like
routes.post('/devs/:devId/dislikes', DislikeController.store); //rota para dá dislike

module.exports = routes;
 