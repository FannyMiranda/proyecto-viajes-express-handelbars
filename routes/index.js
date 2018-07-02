const Email = require("../configuration/emailConf");
const Path = require("path");
const HbsEmail = require("nodemailer-express-handlebars");
const Controller = require("../controllers/controller");
const Logincontroller = require("../controllers/loginController");
const RegistroController = require("../controllers/registroController");

var express = require('express');
var router = express.Router();
var userModel = require('../models/users');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'MirandaTravels'
    });
});






router.get('/registro', function (req, res, next) {
    res.render('registro', {
        title: 'Registro'
    });
});


router.get('/*', function (req, res, next) {
    res.render('404.hbs', {
        title: 'Alaaaa!',
        layout: '404'
    });
});

router.get("/email", (req, res, next) => {
    Email.transporter.use("compile", HbsEmail({
        viewEngine: "hbs",
        extName: ".hbs",
        viewPath: Path.join(__dirname, "../views/emails")
    }))

    let message = {
        to: 'fannymirandaalemany@gmail.com',
        subject: 'Email de prueba',
        template: "email",
        context: {
            text: "Enviamos una prueba por handlebars"
        },

        // attachments:[{

        //     filename: "yo.jpeg",
        //     path: __dirname + "/../public/images/yo.jpeg",
        //     cid: "imagen"
        // }]
    };

    Email.transporter.sendMail(message, (error, info) => {
        if (error) {
            res.status(500).send(error, message);
            return
        }
        Email.transporter.close();
        res.status(200).send('Respuesta "%s"' + info.response);
    });

})

module.exports = router;