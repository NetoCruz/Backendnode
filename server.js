const express = require('express')
const router = express.Router()

var app = express()
app.use(router)

router.get('/message',(req,res)=>{
    res.send('Listas de mensajes')
})

router.post('/message',(req,res)=>{
    res.send('Mensaje añadido correctamente')
})

// app.use('/',(req,res)=>{
//     res.send('Hola')
// })

app.listen(3000)
console.log('La app está escuchando en http://localhost:3000')