var http = require("http");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var mysql=require('mysql');
var connection=mysql.createConnection({
host:'localhost',//mysql database host name
user:'root',//mysql database user name
password:'',//mysql database passsword
database:'employee'//mysql database name


});
connection.connect(function (err)
{
if(err) throw errr
console.log("your are now connected");

});
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
// Running Server Details.
var server = app.listen(8082, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at %s:%s Port", host, port)
});
 
 
app.get('/form', function (req, res) {
  var html='';
  html +="<body>";
  html += "<form action='/thank'  method='post' name='form1'>";
  html += "Name:</p><input type= 'text' name='name'>";
  html += "address:</p><input type='text' name='address'>";
  html += "Mobile number:</p><input type='text' name='mobilno'>";
  html += "<input type='submit' value='submit'>";
  html += "<INPUT type='reset'  value='reset'>";
  html += "</form>";
  html += "</body>";
  res.send(html);
});
 
app.post('/thank', urlencodedParser, function (req, res){
  var reply='';
  reply += "Your name is" + req.body.name+"<br>";
  reply += "Your address is" + req.body.address+"<br>";
  reply += "Your mobile number is" + req.body.mobilno+"<br>";
var n=req.body.name;
var c=req.body.address;
var p=req.body.mobileno;


var sql="insert into info(SName,SCity,SPhoneno)values('"+n+"','"+c+"','"+p+"')";
connection.query(sql,function(err)
{
if(err)throw err;
console.log("record is inserted successfully");
});
 res.send(reply);
 });
app.get('/employee',function(req,res){
connection.query("select  * from info where SName='shamilly'",function(error,results)
{
if(error)throw error;
res.end(JSON.stringify(results));
});
});
app.get('/employee/:SCity',function(req,res){
connection.query("select  * from info where SCity=?",function(error,results)
{
if(error)throw error;
res.end(JSON.stringify(results));
});
});