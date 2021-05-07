const express = require('express')
const bodyParser = require('body-parser')
const nodemailer= require('nodemailer')
const cors= require('cors')

const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended:true
}))
app.use(cors())

app.get('/',()=>{
  resizeBy.send('welcome to my forma')
})

app.post('/api/forma',(req,res)=>{
   let data = req.body
   let smtpTransport = nodemailer.createTransport({
     service:'Gmail',
     port:465,
      auth:{
        user:'nikolayzalipykin@gmail.com',
        pass:'salvation27'
      }
   })
   let mailOptions = {
     from:data.email,
     to:'nikolayzalipykin@gmail.com',
     subject:`Сообщение от ${data.name}`,
     html:`
      <h3>
        Information
      </h3>
      <ul>
        <li>Name:${data.name}</li>
        <li>Last Name:${data.lastname}</li>
        <li>Email:${data.email}</li>
      </ul>
      <h3>
        Сообщение
      </h3>
      <p>${data.mes}</p>
     `
   }

   smtpTransport.sendMail(mailOptions,(error,response)=>{
    if(error){
      res.send(error)
    }
    else {
      res.send('Succes')
    }
   })

   smtpTransport.close()
})

const PORT = process.env.PORT||3001

app.listen(PORT,()=>{
  console.log(`Сервер запустился на порту ${PORT}`);
})