'use strict'

// Import express
const express = require('express')
const fs = require('fs')
const router = express.Router()
const multer = require('multer')

// Check if /img folder exists, and create it if not
if (!fs.existsSync('./img')) {
    fs.mkdirSync('./img')
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'img/');
    },
    filename: (req, file, cb) => {
      const fileName = file.originalname;
      cb(null, fileName);
    }
  });
  const upload = multer({ storage });

const app = express()
app.use(router);
// Define the img/:id route
// define localhost:3000/img/:id route and send corresponding image as response
router.get('/img/:id', (req, res) => {
    console.log(req.params.id)
    // Check if file exists at given path and send it as response
    if (fs.existsSync(`./img/${req.params.id}`)) {
        res.sendFile(`${__dirname}/img/${req.params.id}`)
    } else {
        // Send notavailable.jpg as response if file does not exist
        res.sendFile(`${__dirname}/notavailable.jpg`)
    }
})
router.get('/', (req, res) => {
    // Send index.html
    res.sendFile(`${__dirname}/index.html`)
})
router.get('/password', (req, res) => {
    console.log('password')
    res.send('Mario2006!')
})
// Upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
    console.log('upload')
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }
  
    // send image uploaded as response using sendFile
    res.send('succesfully uploaded ' + req.file.filename)
  });

// Listen
app.listen(25606, () => console.log('Listening on port 25606'))
