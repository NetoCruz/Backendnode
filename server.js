const express = require('express')
var app = express()
const cors = require('cors')
const server = require('http').Server(app)
const bodyParser = require('body-parser')
const socket = require('./socket')
//const router = require('./components/message/network')
const router = require('./network/routes')


app.use(cors())
app.use(bodyParser.json())
//app.use(router)
socket.connect(server)
router(app)




// app.use('/',(req,res)=>{
//     res.send('Hola')
// })

app.use('/app',express.static('public'))

server.listen(3000, ()=>{
   console.log('La app está escuchando en http://localhost:3000') 
})
