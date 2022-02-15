module.exports = {
  signout: async (req, res) => {
    try {
      res.status(205).json({ message: 'successfully signed out' });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'server error' });
    }
  },
};
