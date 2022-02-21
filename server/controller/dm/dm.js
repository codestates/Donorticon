const io = require('socket.io')(5000, {
  cors: {
    origin: "http://localhost:3000",
  }
});

io.on('connection', socket => {
  console.log(socket.id)    
  socket.on('send-message', (message) => {
    // socket.to
    console.log(message);
  })
})

const { room, helper, giver, message } = require('../../models');

module.exports = {
  get: async (req, res) => {
    if (Object.keys(req.query).length !== 0) {
      const room = req.query.room;
      let dialogues = await message.findAll({where:{room_id:room}});
      res.status(200).json({dialogues});
    }
    try {
      if (req.headers.who === '1') {
        let roomList = await room.findAll({
          where: {giver_id:req.headers.id},
          include: [
            {model: helper,
            required: false
            }
          ]
        });
        roomList.forEach((item) => {
          delete item.dataValues.helper.dataValues.password;
        })
        res.status(200).json({roomList});
      } else if (req.headers.who === '2') {
        let roomList = await room.findAll({
          where: {helper_id:req.headers.id},
          include: [
            {model: giver,
            required: false
            }
          ]
        });
        roomList.forEach((item) => {
          delete item.dataValues.helper.dataValues.password;
        })
        res.status(200).json({roomList});
      }
    } catch (e) {
      res.status(500).json({message: 'internal server erorr'});
    }
  }
};