const express = require("express")
const mongoose  = require("mongoose")
const router = require("./routes/index")
const path = require('path')

const app = express()

const port = process.env.PORT || 8000
require('dotenv').config();

app.use(express.json())
app.use("/api",router)

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:32777",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.static(path.join(__dirname, 'client/build')))
app.get('*', (req, res) => {
    return res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'))
})

app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})
