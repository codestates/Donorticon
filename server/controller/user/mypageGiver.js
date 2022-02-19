const jwt_decode = require('jwt-decode');

module.exports = async (req, res) => {
  try {
    const token = req.headers.token;
    const tokenDecoded = jwt_decode(token);
    const { email, name, mobile, img } = tokenDecoded;
    // console.log(tokenDecoded)
    res.status(200).json({ email, name, mobile, img })
  } catch(err) {
    console.log(err);
  }
}