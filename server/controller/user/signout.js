module.exports = {
  signout: async (_, res) => {
    try {
      res.status(205).send({ message: 'successfully logged out' });
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: 'server error' });
    }
  },
};
