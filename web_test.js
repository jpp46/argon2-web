// This is what my index.html look like
/*
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Simple template</title>
    <script src="./argon2-web.js"></script>
  </head>
  <body>
    <script src="./web_test.js"></script>
  </body>
</html>
*/

function makePass(salt, pass, len = 16, key = 1, lowers = 1, uppers = 1, numerics = 1, specials = 1)
{
    argon2().then((instance) => {
        const secret = instance.ccall('secret', 'number', [ 'number', 'number' ], [ key, len ]);
        const slt_sct = salt.concat(secret.toString());
        const hash = instance.ccall('argon_hash', 'string',
                                    [ 'string', 'string', 'number', 'number', 'number', 'number', 'number' ],
                                    [ slt_sct, pass, len, lowers, uppers, numerics, specials ]);
        console.log(hash);
        return hash;
    });
};

// I would like to run it like this but get error --- ReferenceError: Module is
// not defined

/*
secret = Module.cwrap("secret", "number", [ "number", "number" ]);
argon_hash =
    Module.cwrap("argon_hash", "string", [ "string", "string", "number", "number", "number", "number", "number" ]);

function makePass(salt, pass, len = 16, key = 1, lowers = 1, uppers = 1, numerics = 1, specials = 1)
{
    var slt_sct = salt.concat(secret(key, len).toString());
    var hash = argon_hash(slt_sct, pass, len, lowers, uppers, numerics, specials);
    return hash;
}
*/

var pass = makePass('The Salt', 'The Password');
console.log(pass) // This runs before line 10 is makePass asynchrounous ???
document.body.innerHTML = '<h1>The Password is ' + pass + '</h1>' // pass here is undefined still ???