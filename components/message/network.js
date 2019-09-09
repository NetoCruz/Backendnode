const express = require('express')
const router = express.Router()
const response = require('../../network/response')
const controller = require('./controller')


router.get('/',(req,res)=>{
    controller.getMessages()
    .then((messageList)=>{
       response.success(req,res,messageList,200) 
    })
    .catch(e=>{
        response.error(req,res,'Unexpected Error', 500,e)
    })
})

router.post('/',function (req,res){
    //console.log(req.query)
    controller.addMessage(req.body.user,req.body.message)
    .then((fullMessage)=>{
        response.success(req,res,fullMessage,201)
    })
    .catch(e =>{
      response.error(req,res,'Información Inválida',400,'Error en el controlador')  
    })
    
    //console.log(req.body)
    //res.send('Mensaje '+ req.body.text +' añadido correctamente')
    
})

module.exports=router