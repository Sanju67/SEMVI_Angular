function generateMail(){
    
const sgMail = require('@sendgrid/mail');
const { response } = require('express');
const API_KEY="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";

sgMail.setApiKey(API_KEY);

function getMail(){
    return "sanjugour67@gmail.com" ;
}

const message = {
    to: getMail(),
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

generateMail() ;

function myfunction(){
    console.log("Hello Javascript")
}