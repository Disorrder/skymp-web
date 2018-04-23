const pug = require('pug');
const path = require('path');
const cfg = require('../config');
var mailgun = require('mailgun-js')(cfg.mailgun);

var from = `Гонец SkyMP <courier@${cfg.mailgun.domain}>`;

function register(data) {
    var file = path.resolve(__dirname, `./templates/reset-password.pug`);
    var locals = {
        origin: data.origin,
        resetToken: data.resetToken,
    };

    return mailgun.messages().send({
        from,
        to: data.to,
        subject: 'Восстановление пароля',
        html: pug.compileFile(file)(locals),
    });
}

function sendConfirmToken(data) {
    var file = path.resolve(__dirname, `./templates/confirm-email.pug`);
    var locals = {
        origin: data.origin,
        confirmToken: data.confirmToken,
    };

    return mailgun.messages().send({
        from,
        to: data.to,
        subject: 'Подтверждение почты',
        html: pug.compileFile(file)(locals),
    });
}

module.exports = {
    register,
    sendConfirmToken
};
