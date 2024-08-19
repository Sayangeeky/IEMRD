const fs = require('fs')
const path = require('path')

const downloadController = (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname,'..', 'uploads', filename);
    
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).json({ message: 'File not found' });
      }
      res.sendFile(filePath);
    });
  }

  module.exports = downloadController