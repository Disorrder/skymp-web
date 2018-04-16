const availableChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

String.randomize = function(len) {
    var str = "";
    for (let i = 0; i < len; i++) {
        str += availableChars.charAt(Math.floor(Math.random() * availableChars.length));
    }
    return str;
};
