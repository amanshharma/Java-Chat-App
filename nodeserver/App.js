var express = require('express');
var app = express();
bodyParser = require('body-parser');
var mysql = require('mysql');


const { createLogger, format, transports } = require('winston');
const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const logDir = 'log';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const filename = path.join(logDir, 'results.log');

const logger = createLogger({
  // change level if in dev environment versus production
  level: env === 'development' ? 'debug' : 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(
        format.colorize(),
        format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`
        )
      )
    }),
    new transports.File({ filename })
  ]
});



app.use(bodyParser.json()); // <--- Here
app.use(bodyParser.urlencoded({extended: true}));








app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/data', (req, res) => {
    //res.render("<html><body><h1>hello</h1></body></html>");
    res.send({"d":"f"});
});

var username = "";
var password = "";
app.post('/login', (req, res) => {
    
    username = req.body.username;
    password = req.body.password;
    logger.info('Login api called...');
    
    
    var sql = 'SELECT * FROM `admin` WHERE `username` = '+con.escape(username) +' and `password` = '+con.escape(password)+'';
    console.log(sql)
    con.query(sql, function (err, result) {
        if (err) throw err;
       // console.log(result[0].role);
        
        if(result.length > 0)  res.send({"loggedin": true, "role": result[0].role});

        else  res.send({"loggedin": false});
      });  
});


var con = mysql.createConnection({
    host: "localhost",
    database: "test",
  });
  //var sql = 'SELECT * FROM `user` WHERE `username` = "amaan" and `password` = "amaan" or "true" = "true"'
  //var username = "aman";
  //var password = "aman";
  //var password = "abc\" or \"1\" = \"1";
  //var sql = 'SELECT * FROM `user` WHERE `username` = "'+username +'" and `password` = "'+password+'"';
  //console.log(sql)
  //var sql = 'SELECT * FROM `user` WHERE `username` = "'+username +'" and `password` = "'+password+'"';
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    logger.info('db connected');
   
  });


var server = app.listen(5000, ()=>{
    logger.info('Server has been started...');
})