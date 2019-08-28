const fs = require('fs');

const checkExists = (...files) => {
  let exists = false;
  files.forEach(item => {
    if (fs.existsSync(item)) {
      exists = true;
      return true;
    }
  });

  return exists;
};

module.exports = {
  checkExists,
};
