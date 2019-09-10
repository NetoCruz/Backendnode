const Model = require('./model');
const db = require('mongoose')

const { config } = require('../../config')
const PASSWORD = encodeURIComponent(config.dbPassword)
// mongodb+srv://admin:PASSWORD@cluster0-mlw4v.mongodb.net/test?retryWrites=true&w=majority
db.Promise = global.Promise
db.connect(`mongodb+srv://admin:${PASSWORD}@cluster0-mlw4v.mongodb.net/telegram?retryWrites=true&w=majority`,{
    useNewUrlParser:true
})
console.log('Db conectada con éxito')

function addChat(chat) {
    const myChat = new Model(chat);
    return myChat.save();
}

function listChats(userId) {
	return new Promise((resolve, reject) => {
		let filter = {};
		if (userId) {
			filter = {
				users: userId,
			}
		}
	    
	    Model.find(filter)
	    	.populate('users')
	    	.exec((err, populated) => {
	    		if (err) {
	    			reject(err);
	    			return false;
	    		}

	    		resolve(populated);
	    	});
	});
}

module.exports = {
    add: addChat,
    list: listChats,
}