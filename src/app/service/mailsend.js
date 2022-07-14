const { appendFile } = require('fs');
const express = require("express") ;
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express() ;


app.use(cors({origin : "*"}))
app.use(bodyparser.json());

app.listen(3000 ,() =>{
    console.log("3000 port running...")
})
app.post("/sendmail", (req , res)=>{
    let mailid = req.body
    console.log("request received inside app.js for mail id  : ") ;
    generateMail(mailid.email) ;
})
function generateMail(mail){
const sgMail = require('@sendgrid/mail');
// Always need to key to send mail , generate it from sendgrid  -> setting -> get api key section
const API_KEY="";

sgMail.setApiKey(API_KEY);
console.log("Send mail to " , mail)
const message = {
    to: mail,
    from :{
       name : 'Blood Test Management System',
       email : 'sanju.mitv4a@gmail.com' ,
    },
    subject : 'Hello from BTMS ' ,
    text : 'Reset Password request ' ,
    html: '<h4> Received your request for updating ur password ,  kindly click on bellow link to reset your password  <br> http://localhost:4200/ConfirmPassword </h4>'
};

sgMail.send(message).then(response => 
    console.log("Email sent...." , response)) .catch (error => console.log(error.message))
}
