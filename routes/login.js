const Express = require('express');
const Router = Express.Router();
const LoginController = require('../controllers/loginController');




Router.get('/',(req, res, next)=>{
 let loginController = new LoginController(req, res, next);
 loginController.index();
});

Router.post('/',(req, res, next)=>{
    let loginController = new LoginController(req, res, next);
    loginController.login();
})

module.exports= Router;
