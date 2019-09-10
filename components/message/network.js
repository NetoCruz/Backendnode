const express = require('express')
const multer = require('multer')
const router = express.Router()
const response = require('../../network/response')
const controller = require('./controller')

const upload = multer({
    dest:'uploads/',
})

router.get('/',(req,res)=>{
    const filterMessages = req.query.user || null
    controller.getMessages(filterMessages)
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

router.patch('/:id',upload.single('file'), (req,res)=>{
    console.log(req.params.id)
    
    controller.updateMessage(req.body.chat,req.params.id,req.body.message)
        .then((data)=>{
            response.success(req,res,data,200)
        })
        .catch(e=>{
            response.error(req,res,'Error Interno',500,e)
        })

    
})

router.delete('/:id',(req,res)=>{
   controller.deleteMessage(req.params.id)
    .then(()=>{
        response.success(req,res,`Mensaje ${req.params.id} eliminado`,200)
    }) 
    .catch(e =>{
        response.error(req,res,'Error Interno',500,e)
    })
})



module.exports=router