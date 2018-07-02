const Express = require('express');
const Router = Express.Router();
const RegistroController = require('../controllers/registroController');




Router.get('/',(req, res, next)=>{

 let registroController = new RegistroController(req, res, next);
 registroController.index();
});

Router.post('/',(req, res, next)=>{
    let registroController = new RegistroController(req, res, next);
    registroController.registro();
})

module.exports= Router;
