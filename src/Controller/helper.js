const bcrypt = require('bcryptjs');
const { BCRYPT_SALT_ROUNDS } = require('../libs/constant');

module.exports.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
    password = await bcrypt.hash(password, salt);
    return password;
  };
