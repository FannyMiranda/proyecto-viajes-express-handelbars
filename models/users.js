let conn = require('../connections/mysqlconnection');
const Email = require('../configuration/emailconf');
const HbsEmail = require('nodemailer-express-handlebars');
const Path = require('path');

class UserModel
{
  getAll(cb){
    if(!conn) return cb("No se ha podido crear la conexión");
    const SQL ="SELECT * FROM users;";
    conn.query(SQL,(error, rows)=>{
      if(error)return cb(error);
      else return cb(rows);
    })
  }

  findUser(username, cb){
    if(!conn) return cb("No se ha podido crear la conexión");
    const SQL ="SELECT * FROM users WHERE username LIKE '%"+username+"%';";
    conn.query(SQL,(error, rows)=>{
      if(error) return cb(error);
      else return cb(rows);
    })
  }

  findMail(mail, cb){
    if(!conn) return cb("No se ha podido crear la conexión");
    const SQL ="SELECT * FROM users WHERE email LIKE '%"+mail+"%';";
    conn.query(SQL,(error, rows)=>{
      if(error) return cb(error);
      else return cb(rows);
    })
  }

  registroUser(username,pass,email,cb){
    if(!conn) return cb("no se ha podido crear la conexión");
    const SQL=`INSERT INTO users (username, password, email) VALUES ('${username}', '${pass}', '${email}');`;
    conn.query(SQL,(error, rows)=>{
  if(error) return cb(error);
  else return cb(rows);

  })

}

envioMail(email, info){
  Email.transporter.use('compile', HbsEmail({
    viewEngine: 'hbs',
    extName:'.hbs',
    viewPath: Path.join(__dirname, '../views/emails')
}))
let message = {
    to: email,
    subject: 'Recuperacion login',
    template:'emails',
    context:{
        user: info[0].username,
        pass:info[0].password
        
        //text:'Usuario: ' + info[0].username + ' Contraseña: '+info[0].password,
        //amigo:'hola'
    },
    /*attachments:[
        {
            filename:'super.jpeg',
            path:__dirname+'/../public/images',
            cid:'imagen'
        }
    ]*/
};
Email.transporter.sendMail(message, (error, info)=>{
if(error) {
    //console.log(error);
    res.status(500).send(error, message);
    return
}
    Email.transporter.close();
    
});
}





}


module.exports = UserModel;
