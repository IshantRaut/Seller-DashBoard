const express = require('express');
const app =  express();
const sequelize=require('./util/database')

const bodyParser=require("body-parser")
app.use(bodyParser.json());

const cors = require('cors')
app.use(cors())

const adminRoutes=require("./routes/admin");

const Items = require('./models/items');
app.use(express.static('./public'));
app.use("/admin",adminRoutes);

app.use((req,res,next)=>{
    res.status(404).send("<h1>Page Not Found</h1>")
})

sequelize.sync()
.then(Items => {
    app.listen(3000);
})
.catch(err=>{
    console.log(err)
})