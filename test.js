var argon2 = require('./argon2-web.js');

var salt = "This Is My Salt";
var pass = "This Is My Password";
var lowers = 1;
var uppers = 1;
var numerics = 1;
var specials = 1;
var len = 16;
var key = 1;

argon2().then((instance) => {
    var secret = instance.ccall("secret", "number", ["number", "number"], [key, len]);
    console.log(secret);
    salt = salt.concat(secret.toString());
    console.log(salt);
});

argon2().then((instance) => {
    var hash = instance.ccall(
        "argon_hash", "string", 
        ["string", "string", "number", "number", "number", "number", "number"],
        [salt, pass, len, lowers, uppers, numerics, specials]
    );
    console.log(hash);
});