var express =require('express');
var app =express();
var morgan = require('morgan');
var user = require('./routes/user');
var bodyParser = require('body-parser');

// var myLogger=function(req,res,next){
//     console.log(req.url);
//     next();
// };
// app.use(myLogger);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/',express.static('public'));

app.get('/',function(req,res){
    res.send('Hello world');
});

app.use('/user',user);

app.listen(3000, function(){
    console.log('Example App is listening on port 3000')
});
