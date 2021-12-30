const nodemailer = require('nodemailer');
const juice = require('juice');
const htmlToText = require('html-to-text')
const util = require('util');
const emailConfig = require('../config/email')



let transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
    user: emailConfig.user, 
    pass: emailConfig.pass, 
    },
});

//Generar HTML

const generarHtml = (archivo, opciones = {}) => {
    const {result} = require("./a.js", opciones);
    return juice(archivo);
}

exports.enviar = async (opciones) => {
    const url = opciones.resetUrl;
    // const html = juice(`<h2>Restablecer Password</h2><p>Hola, has solicitado reestablecer tu password, haz click en el siguiente enlace para reestablecerlo, este enlace es temporal, en caso de vencer vuelve a solicitarlo </p><a href=${url} >Resetea tu password</a><p>Si no puedes acceder a este enlace, visita ${url}</p><div/>`)
    const html = generarHtml(opciones.archivo, opciones)
    const text = htmlToText.fromString(html);
    let opcionesEmail = ({
        from: 'ServIO" <no-reply@servio.com>', 
        to: opciones.usuario.email, 
        subject: opciones.subject, 
        // text,
        html: generarHtml(opciones.archivo, opciones), 
    });
    const enviarEmail = util.promisify( transport.sendMail, transport)
    return enviarEmail.call(transport, opcionesEmail)
    // transport.sendMail(info)
}


