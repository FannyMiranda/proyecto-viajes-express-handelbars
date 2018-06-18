const Controller = require('./controller');
const UserModel = require('../models/users');


class registroController extends Controller
{
    constructor(req, res ,next)
    {
      super(req, res, next)
    }


    registro()
    {
        let username = this.req.body.username;
        let pass = this.req.body.psw;
        let email = this.req.body.email;

        let userModel = new UserModel();
        userModel.registroUser(username, pass,email,(info)=>{

            console.log(info);

        });
        this.res.redirect('/login');

    }

    index()
    {
     
        this.res.render('registro',
        {title: 'Registro', layout: 'layout2'});
    }
}



module.exports=registroController;
