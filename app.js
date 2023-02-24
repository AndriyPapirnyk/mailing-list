const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');
let nodemailer = require('nodemailer');
require('dotenv').config();
const PORT = 3000;

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(bodyParser.json())
app.use(express.urlencoded({
    extended:true
}))
app.use(express.static(path.resolve(__dirname, './')));

//////// files
let mails;
app.post('/sendFile', upload.single('fileData'), (req, res) => {
  fs.readFile(req.file.path, (error, data) => {
    if (error) {
      console.log(error)
    }
    mails = data.toString().split('\n').join(',');
    console.log(mails);
  });
});
//////// files

/////// messages
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL,
    pass: process.env.PASSWORD
  }
});

app.post('/send', async (req, res)=>{
    let content = req.body.message;
    console.log(content);
    let mailOptions = {
        from: 'poroshenko@gmail.com',
        to: mails,
        subject: 'Andriys team',
        text: content,
        html: `<div style="width: 320px; padding: 20px; height: 500px; color: #fff; background-color: #333; text-align: center;"><h1>${content}</h1></div>`
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
});
/////// messages


app.listen(PORT, () => console.log(`Server work on port:${PORT}`));