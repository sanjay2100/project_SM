const File = require('../Schemas/Files_Schema')
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
const express = require('express')


const File_Route = require('express').Router()

File_Route.use(express.static(path.join(__dirname, "Uploads")))


const Storage = multer.diskStorage({
    destination: (req, file, cb) => {

        cb(null, "./Uploads")

    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const fileFilter = (req, file, cb) => {
    const acceptFileTypes = ['video/mp4', 'video/mkv', 'video/avi', 'image/jpg', 'image/png', 'image/jpeg'];
    if (acceptFileTypes.includes(file.mimetype)) {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}

const ImageFilter = (req, file, cb) => {
    const acceptFileTypes = ['Image/jpg', 'Image/png', 'Image/jpeg'];
    if (acceptFileTypes.includes(file.mimetype)) {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}

const upload = multer({
    storage: Storage,
    fileFilter: fileFilter
})

var multipleUpload = upload.fields([{ name: 'file1' }, { name: 'file2' }])

File_Route.post('/Video', multipleUpload, async (req, res) => {
    const Name = req.body.Name;
    const Email = req.body.Email;
    const Desc = req.body.Desc;
    const File1 = req.files['file1'];
    const File2 = req.files['file2'];
  
    const fileData = new File({
      Name,
      Email,
      Desc,
      Files: [], // Initialize the Files array
    });
  
    if (File1) {
      File1.forEach(element => {
        const file = {
          fieldName: 'file1',
          filename:element.filename,
          originalName: element.originalname,
          mimeType: element.mimetype,
          path: element.path,
        };
        fileData.Files.push(file);
      });
    }
  
    if (File2) {
      File2.forEach(element => {
        const file = {
          fieldName: 'file2',
          filename:element.filename,
          originalName: element.originalname,
          mimeType: element.mimetype,
          path: element.path,
        };
        fileData.Files.push(file);
      });
    }
  
    try {
      await fileData.save();
      res.json("Video uploaded")
    } catch (error) {
      res.json(error);
    }
  });


File_Route.get('/Video', async (req, res) => {
    try {
        const data = await File.find();
        res.json(data)
    }
    catch (error) {
        res.json(error)
    }
})

File_Route.get('/Video/:id', async (req, res) => {
    const id=req.params.id
    try {
        const data = await File.findById(id);
        res.json(data)
    }
    catch (error) {
        res.json(error)
    }
})

File_Route.get('/Video_byEmail/:Email', async (req, res) => {
  const Email=req.params.Email
  try {
      const data = await File.find({"Email":Email});
      res.json(data)
  }
  catch (error) {
      res.json(error)
  }
})

module.exports = File_Route