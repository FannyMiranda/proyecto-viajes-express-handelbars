const Express = require('express');
const Router = Express.Router();
const IdentificationService = require ('../service/IndentificationService');
const SecureService=require('../service/secureService');

Router.get('/hash/:hash',(req,res,next)=>{
    console.log("Entra en regeneration ->"+req.params.hash);
    res.send(200);

});
//esto debe de ir en un controlador
Router.get('/encrypt/:pass',(req,res,next)=>{
    let SecureService= new SecureService();
    let pass= req.params.pass;
    let encryptpass=secureService.encryptPas(pass);
    console.log("pass : "+ pass+ "pass encrypt : "
    +encryptpass +
    secureService.comparePass(pass,encryptpass)
);


res.send(200);
});

Router.get('/uid',(req,res,next)=>{
let identificationService = new IdentificationService
console.log("Entra en UID ->"+identificationService.getUUIDD(1,3));

})

module.exports = Router;