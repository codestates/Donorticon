const jwt_decode = require('jwt-decode');

module.exports = async (req, res) => {
    try {
        const token = req.headers.token;
        const tokenDecoded = jwt_decode(token);
        const { email, name, mobile, slogan, description, location } = tokenDecoded;
        // console.log(tokenDecoded)
        const data = { email, name, mobile, slogan, description, location, vulnerable: ["디비작업후올릴예정"], gifticonCategory: ["디비작업후올릴예정"], gallery: ['사진추가예정'] }
        console.log(data);
        res.status(200).json(data);
    } catch(err) {
        console.log(err);
    }
}

