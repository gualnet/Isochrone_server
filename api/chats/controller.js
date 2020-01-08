const fs = require('fs');

const openFile = () => {

};

const chatDir = './chatLogs';

module.exports = {

  saveNewMessage: async (req, res, next) => {
    try {
    console.clear();
    console.log('saveNewMessage');
    const { chatId } = req.params;
    const [payload] = req.body;

    payload.user._id = req.user.id;
    console.log('Chat id:', chatId);
    console.log('Message payload', payload);

    const filePath = `${chatDir}/room_${chatId}.log`;

    fs.openSync(filePath, 'a+');
    
    // open, write, close the data to the log file
      const rawData = fs.readFileSync(filePath);
      console.log('0001', rawData.length);
      let data = {};
      if (rawData.length > 0) {
        data = JSON.parse(rawData);
        console.log('0002a', data);
      } else {
        console.log('0002b', data);
      }
      // console.log('0001', rawData)

      return res.status(200).send();
    } catch (error) {
      console.error(error);
      return res.status(500).send();
    }

  },

};