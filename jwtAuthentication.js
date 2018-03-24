'use strict'
/**
* @name security token for oapp
* @author Yamuna Sardhara
*
* @version 0.0.0
*/
var jwt = require('./securiyProtocol');


var currentFileName = __filename;
var logger = require('../../logger');

function _generateToken(input) {
  return jwt.sign(input);
}

function _encryptToken(token) {
  return jwt.encrypt(token);
}

function _decryptToken(shaString) {
  return jwt.decrypt(shaString);
}

function _verifyToken(token) {
  return jwt.verifySignature(token);
}

function _generateOAppToken(input) {
  return _encryptToken(_generateToken(input));
}

function _decodeOAppToken(token) {
  return _verifyToken(_decryptToken(token));
}

module.exports = {
  generateToken: _generateToken,
  verifyToken: _verifyToken,
  encryptToken: _encryptToken,
  decryptToken: _decryptToken,
  generateOAppToken: _generateOAppToken,
  decodeOAppToken: _decodeOAppToken
}
