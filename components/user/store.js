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

function addUser(user){
   const myUser = new Model(user)
  return myUser.save() 
}

function listUsers(){
    return Model.find()
}


module.exports= {
    add: addUser,
    list:listUsers,
    
}