const express =  require('express');
const app = express();
const {bodyParser} = require( 'body-parser')
const userRouter = require("./api/user.router");
require('./config/database');
require('./models/Definitions');
app.use(express.json())
app.use("/api", userRouter);

app.get('/',(req,res) => {
      res.json({
            "res" : 200
      });
})


app.listen(3001,()=>{
      console.log("server is running")
});