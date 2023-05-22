const Youtube = require('../Schemas/Youtube_Schema')
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
const { updateOne } = require('../Schemas/Like_Schema')
const Youtube_Route = require('express').Router()

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
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

const upload = multer({
    storage: Storage,
    fileFilter: fileFilter
})


Youtube_Route.post('/Youtube', upload.single('file1'), async (req, res) => {
    const Name = req.body.Name
    const Desc = req.body.Desc
    const File1 = req.file
    const Link = req.body.Link
    const views = req.body.views

    const fileData = new Youtube({
        Name,
        Link,
        Desc,
        views,
        originalname: File1.originalname,
        filename: File1.filename,
        mimetype: File1.mimetype,
        path: File1.path

    })



    try {
        await fileData.save();
        res.json("Video uploaded")
    } catch (error) {
        res.json(error);
    }

})

Youtube_Route.get('/YoutubeGet', async (req, res) => {
    try {
        const data = await Youtube.find()
        res.json(data)
    }
    catch (error) {
        res.json(error)
    }
})

Youtube_Route.get('/YoutubeGet/:id', async (req, res) => {
    const id = req.params.id
    try {
        const data = await Youtube.findById(id)
        res.json(data)
    }
    catch (error) {
        res.json(error)
    }
})

Youtube_Route.patch('/YoutubeViews/:id', async (req, res) => {
    const id = req.params.id
    const views = parseInt(req.body.views)
    try {
        const data = await Youtube.findByIdAndUpdate(id,{ "views": views })
        res.json("Updated")
    }
    catch (error) {
        res.json(error)
    }
})

module.exports = Youtube_Route


