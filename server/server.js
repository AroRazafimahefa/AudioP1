const express = require("express")
let app = express()
let bodyParser = require("body-parser")
let cors = require('cors')
const port = require("./Config/Envi").PORT 
const fileUpload = require("express-fileupload")
app.use(bodyParser.json())

.use(fileUpload({createParentPath:true}))
.use(bodyParser.urlencoded({extended: true}))
.use(cors())
// initiation au base de donner
require("./src/dataBase/Sequelize").initDB()

// defintion de notre routes
require("./routes/getAudio.routes").getAudio(app)
require("./routes/postAudio.routes").postAudio(app)
app.listen(port , _=>console.log("server start at : " + port))
