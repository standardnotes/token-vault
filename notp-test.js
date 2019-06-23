var notp = require('notp');

//.... some initial login code, that receives the user details and TOTP / HOTP token

var key = 'PBDS6TSGLFYXAOBQHBHXQRDBORNEKZCD';
// var token = 'user supplied one time use token';

// Check TOTP is correct (HOTP if hotp pass type)
// var login = notp.totp.verify(token, key);

// invalid token if login is null
// if (!login) {
//     return console.log('Token invalid');
// }

var token = notp.totp.gen(key)

console.log('token:', token)
