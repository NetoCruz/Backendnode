//const list =[]
const db = require('mongoose')
const Model = require('./model')
const { config } = require('../../config')
const PASSWORD = encodeURIComponent(config.dbPassword)
// mongodb+srv://admin:PASSWORD@cluster0-mlw4v.mongodb.net/test?retryWrites=true&w=majority
db.Promise = global.Promise
db.connect(`mongodb+srv://admin:${PASSWORD}@cluster0-mlw4v.mongodb.net/telegram?retryWrites=true&w=majority`,{
    useNewUrlParser:true
})
console.log('Db conectada con éxito')
function addMessage(message) {
  const myMessage = new Model(message);
  myMessage.save();
}

async function getMessages(filterChat) {
  return new Promise((resolve, reject) => {
      let filter = {};
      if (filterChat !== null) {
          filter = { chat: filterChat };
      }
      Model.find(filter)
          .populate('user')
          .exec((error, populated) => {
              if (error) {
                  reject(error);
                  return false;
              }

              resolve(populated);
          });
  })
}

function removeMessage(id) {
  return Model.deleteOne({
      _id: id
  });
}

async function updateText(id, message) {
  const foundMessage = await Model.findOne({
      _id: id
  });

  foundMessage.message = message;

  const newMessage = await foundMessage.save();
  return newMessage;
}

module.exports = {
  add: addMessage,
  list: getMessages,
  updateText: updateText,
  remove: removeMessage,
}