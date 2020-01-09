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

      const filePath = `${chatDir}/room_${chatId}_2.log`;
      // * open log file in read/write mode
      const fd = fs.openSync(filePath, 'w+');
      
      // * get the content of the log file
      const rawData = fs.readFileSync(fd);
      // console.log('0001', rawData.length);
      let data = {
        messages: [],
      };
      if (rawData.length > 0) {
        data = JSON.parse(rawData);
      }

      // * add the new message to the log file content
      data.messages.push(payload);
      // * write the new data object to the log file
      fs.writeFileSync(fd, JSON.stringify(data));
      // * close the file descriptor
      fs.closeSync(fd);

      return res.status(200).send();
    } catch (error) {
      console.error(error);
      return res.status(500).send();
    }
  },


};