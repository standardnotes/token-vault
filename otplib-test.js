const otplib = require('otplib');

const secret = 'PBDS6TSGLFYXAOBQHBHXQRDBORNEKZCD';

const token = otplib.authenticator.generate(secret);

console.log(token)
