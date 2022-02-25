const { giver } = require('../../models')

module.exports = async (req, res) => {
  // console.log(req.body);
  if ( req.body.name && req.body.email && req.body.password) { 
    let mobile;
    if ( req.body.mobile ) {
      mobile = req.body.mobile;
    } else {
      mobile = null;
    }
    const { email, password } = req.body;
    try {
      const [ userInfo, created ] = await giver.findOrCreate({
        where: { email },
        defaults: { password, mobile, user_type: 1 }
      }); 
      if ( created ) {
        res.status(201).json({ message: `welcome ${req.body.name}! you have sucessfully signed up`, id: userInfo.dataValues.id});
      } else {
        res.status(409).json({ message: 'email already exists' });
      }
    } catch(e) {
      res.status(500).json({ message: 'internal server error' })
    }
  } else {
    res.status(422).json({ message: 'insufficient parameters supplied' });
  }
}


