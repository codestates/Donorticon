const { giver } = require('../../models');

module.exports = {
  get: (res, req) => {
    console.log(res);
    req.status(200).json('giver myapge get');
  },
  post: (res, req) => {
    req.status(200).json('giver myapge post');
  },
};
