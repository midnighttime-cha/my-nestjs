import { createParamDecorator, Logger } from '@nestjs/common';
const CryptoJS = require('crypto-js');

export const User = createParamDecorator((data, req) => {
  const userData = req.args[0].user;
  const bytes = CryptoJS.AES.decrypt(userData.payload, process.env.APP_SECRET);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedData);
});
