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
function addMessage(message){
    //list.push(message)
    const myMessage = new Model(message)
    myMessage.save()
}

async function getMessages(){
    //return list
    const messages = await Model.find()
    return messages
}

module.exports= {
    add: addMessage,
    list:getMessages,
}