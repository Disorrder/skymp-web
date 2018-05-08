const pug = require('pug');
const path = require('path');
const cfg = require('../config');
var mailgun = require('mailgun-js')(cfg.mailgun);

var from = `Гонец SkyMP <courier@${cfg.mailgun.domain}>`;

function resetPassword(data) {
    var file = path.resolve(__dirname, `./templates/reset-password.pug`);
    var locals = {
        url: `${data.origin}/reset?token=${data.resetToken}`
    };

    return mailgun.messages().send({
        from,
        to: data.to,
        subject: 'Восстановление пароля',
        html: pug.compileFile(file)(locals),
    });
}

function confirmEmail(data) {
    var file = path.resolve(__dirname, `./templates/confirm-email.pug`);
    var locals = {
        url: `${data.origin}/auth/confirm?token=${data.confirmToken}`
    };

    return mailgun.messages().send({
        from,
        to: data.to,
        subject: 'Подтверждение почты',
        html: pug.compileFile(file)(locals),
    });
}

module.exports = {
    resetPassword,
    confirmEmail,
};
