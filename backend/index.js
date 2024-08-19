const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const connectDB = require('./DB/db');
const path = require('path')
const fs = require('fs')
const User = require('./model/user.model');
const adminMiddleware = require('./middlewares/adminMiddleware') 
const signupController = require('./controller/signupController')
const loginController = require('./controller/login Controller')
const adminController = require('./controller/adminController')
const allDataController = require('./controller/allDataController')
const forgetPasswordController = require('./controller/forgetPasswordController')
const verifyOtpController = require('./controller/verifyOtpController')
const updatepassController = require('./controller/updatepassController')
const viewFileController = require('./controller/viewFileController')
const downloadController = require('./controller/downloadController')
const uploadController = require('./controller/uploadController')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname)
  }
})
const upload = multer({storage})




const app = express();


app.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config()

const PORT = process.env.PORT || 3000;


connectDB();


app.use(express.json()); 
app.use(cors()); 


const JWT_SECRET = process.env.KEY


//signup endpoint

app.post('/signup', signupController)

// Login Endpoint
app.post('/login', loginController);

//admin-signup

app.post('/admin-only', adminMiddleware, adminController)

//get user's data  
app.post('/get-users', adminMiddleware, allDataController)

//forget-password
app.post('/forget-password', forgetPasswordController)

//change password
app.post('/update-password', updatepassController)
//match-otp endpoint
app.post('/match-otp', verifyOtpController)

//upload file
 app.post('/upload', upload.single('file'), uploadController )



// Endpoint to list all files
app.post('/files', adminMiddleware, viewFileController)

//download api

app.get('/files/:filename', downloadController )



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});  
