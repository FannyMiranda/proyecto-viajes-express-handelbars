const Controller = require('./controller');
const UserModel = require('../models/users');
const logger = require('../configuration/winston');
const Email = require('../configuration/emailconf');
const HbsEmail = require('nodemailer-express-handlebars');
const Path = require('path');
const SecureService = require('../service/secureService');


class loginController extends Controller
{
    constructor(req, res ,next)
    {
      super(req, res, next);
      //logger.info("Iniciado Login");
    }


    login()
    {
        let username = this.req.body.username;
        let pass = this.req.body.psw;
        let userModel = new UserModel();
        let secureService=new SecureService();
        userModel.findUser(username,(info)=>{

            if (info.length===0) {
                this.req.flash('info','El usuario no existe');
                this.res.redirect('/login');
            }else {
                let secureService = new SecureService();
                let bool = secureService.comparePass(pass, info[0].password);
                if (bool) {
                    this.index();

                } else {
                    this.req.flash('info','El pass es incorrecto');
                    this.index();
                }
            }

        })

    }


    

    index()
    
    {
        let info= this.req.flash('info');
        if(info =="")
        {
            console.log(" NO Existe info");
            this.res.render('login',{
                title: 'Login',
                layout:'layout2'
        });
        }else{
             console.log("Existe info");

            this.res.render('login',{
                title:'Login',
                layout:'layout2',
                info:info
            });
            info = "";
        }
    }

    recuperarPass(){
        let mail = this.req.body.email;
        let userModel = new UserModel();
        userModel.findMail(mail, (info)=>{
            if(mail==info[0].email){
                console.log(info)
                userModel.envioMail(mail, info);
       /* Email.transporter.use('compile',HbsEmail ({
            viewEngine: 'hbs',
            extName:'.hbs',
            viewPath: Path.join(__dirname,'../views/emails')
            
        }));
        let message= {
            to: info[0].email,
            subject: 'Email de prueba',
            template:'emails',
            context: {
                user: info[0].username,
                pass:info[0].password
            },
    
            attachments: [
                {
                    filename:'Australia.jpg',
                    path:__dirname + '/public/images/Australia.jpeg',
                    cid: 'imagen'
                }
            ]
        };
    Email.transporter.sendMail(message, (error, info)=>{
        if(error) {
            res.send(500, (error,message));
            return
        }
        Email.transporter.close();
        //res.send(200, ('Respuesta "%s"' + info.response));
    });  
            } */
}
     
    })

    }
}

module.exports=loginController;
