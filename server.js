const express = require('express')
const bodyParser = require('body-parser')
const response = require('./network/response')
const router = express.Router()


var app = express()
app.use(bodyParser.json())
app.use(router)


router.get('/message',(req,res)=>{
    console.log(req.headers)
    res.header({
        "custom-header":"Nuestro valor personalizado",
    })
    //res.send('Listas de mensajes')
    response.success(req,res,'Lista de mensajes')
})

router.post('/message',(req,res)=>{
    console.log(req.query)
    if(req.query.error == 'ok'){
        response.error(req,res,'Error inesperado',500,'Es solo una simulación de los errores')
    }else{
        response.success(req,res,'Creado correctamente',201)
    }
    //console.log(req.body)
    //res.send('Mensaje '+ req.body.text +' añadido correctamente')
    
})

// app.use('/',(req,res)=>{
//     res.send('Hola')
// })

app.use('/app',express.static('public'))

app.listen(3000)
console.log('La app está escuchando en http://localhost:3000')