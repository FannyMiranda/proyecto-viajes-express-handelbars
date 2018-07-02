const Controller = require('./controller');
const UserModel = require('../models/users');
const SecureService = require('../service/secureService');
const IdentificationService = require('../service/IndentificationService');
const emailService=require('../service/emailService');

class registroController extends Controller
{
    constructor(req, res ,next)
    {
      super(req, res, next)
    }


    registro()
    {
        let username = this.req.body.username;
        let pass1 = this.req.body.psw;
        let email = this.req.body.email;

        let secureService = new SecureService();
        let pass = secureService.encryptPass(pass1);
        let userModel = new UserModel();
        const promise = new Promise((resolve, reject)=>{
            var error='Usuario mail repetido';
            var respuesta='Usuario registrado correctamente';

            userModel.findUser(username, (info)=>{
                if(info.length!==0){
                    reject('usuario o mail repetido');
                } else{
                    userModel.findMail(email, (info2)=>{
                        if(info2.length!==0){
                            reject('usuario o mail repetido');
                        } else{
                            resolve('registro usuario')
                        }
                    })
                }
            })
           

        
        }).then((respuesta)=>{
            console.log(respuesta);
            userModel.registroUser(username, pass,email,(info)=>{

                console.log(info);
    
            });
        }).catch((error)=>{
            console.log(error);
        });
        
        this.res.redirect('/login');

    }

    


    index()
    {
     
        this.res.render('registro',
        {title: 'Registro', layout: 'login'});
    }
}



module.exports=registroController;
