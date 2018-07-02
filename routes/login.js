const Express = require('express');
const Router = Express.Router();
let LoginController = require('../controllers/loginController');

Router.get('/',(req, res, next)=>{
    console.log('he entradp en login');
 let loginController = new LoginController(req, res, next);
 loginController.index();
});

Router.post('/',(req, res, next)=>{
    let loginController = new LoginController(req, res, next);
    loginController.login();
})

Router.post('/email',(req,res, next)=>{
    let loginController = new LoginController(req, res, next);
    loginController.recuperarPass();
    res.redirect('/login');
    
});



module.exports= Router;
