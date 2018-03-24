'use strict'
/**
* @name Encryption and Decryption
* @author Yamuna Sardhara
*
* @version 0.0.0
*/
var jwt = require('jsonwebtoken');
var crypto = require('crypto');
function sign(input, expiryDate) {
  //To set expiration time with token - for future use
  if (expiryDate) {
    //with input you can use input.exp
    tokenOptions.expiresIn = `${Math.round(((new Date(expiryDate)) - (new Date()))/ (1000))}s`;
  }
  var signature = jwt.sign(input, pk, tokenOptions);
  return signature;
}

function generate(input) {
  var encoded = jwt.encode(input, pk, tokenOptions);
  return encoded;
}

function verifySignature(input) {
  var decoded = jwt.verify(input, pub, tokenOptions);
  return decoded;
}

function encrypt(text) {
  var cipher = crypto.createCipher(algorithm, secret);
  var crypted = cipher.update(text,'utf8','hex');
  crypted += cipher.final('hex');
  return crypted;
}

function encryptWithOutSecret(text) {
  var cipher = crypto.createCipher(algorithm,'');
  var crypted = cipher.update(text,'utf8','hex');
  crypted += cipher.final('hex');
  return crypted;
}

function decryptWithOutSecret(encrypted) {
  var decipher = crypto.createDecipher(algorithm, '');
  var dec = decipher.update(encrypted,'hex','utf8');
  dec += decipher.final('utf8');
  return dec;
}

function decrypt(encrypted) {
  var decipher = crypto.createDecipher(algorithm, secret);
  var dec = decipher.update(encrypted,'hex','utf8');
  dec += decipher.final('utf8');
  return dec;
}

module.exports = {
  encrypt: encrypt,
  decrypt: decrypt,
  encryptWithOutSecret: encryptWithOutSecret,
  decryptWithOutSecret: decryptWithOutSecret,
  sign: sign,
  verifySignature: verifySignature,
  generate:generate
};
