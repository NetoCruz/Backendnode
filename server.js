const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()


var app = express()
app.use(bodyParser.json())
app.use(router)


router.get('/message',(req,res)=>{
    res.send('Listas de mensajes')
})

router.delete('/message',(req,res)=>{
    console.log(req.query)
    console.log(req.body)
    res.send('Mensaje '+ req.body.text +' añadido correctamente')
})

// app.use('/',(req,res)=>{
//     res.send('Hola')
// })

app.listen(3000)
console.log('La app está escuchando en http://localhost:3000')