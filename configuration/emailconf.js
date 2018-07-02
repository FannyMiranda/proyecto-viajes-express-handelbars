const email=require('nodemailer');

let mailer ={};

mailer.transporter = email.createTransport({
    service:'Gmail',
    auth: {
        user:'fannymirandaalemany@gmail.com',
        pass:'miranda40'
    },
},
{
    from:'fannymirandaalemany@gmail.com',
    headers: {
//para correos transaccionales
    }
});



module.exports = mailer;