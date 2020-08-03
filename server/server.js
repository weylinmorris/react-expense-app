const express = require('express')
const path = require('path')
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public') 

app.use(express.static(publicDirectoryPath))

app.get('*', (req, res) => {
    res.sendFile(path.join(publicDirectoryPath, 'index.html'))
}) 

app.listen(3000, () => {
    console.log('App is running')
})