var express = require('express')
var app = express()

var recnt = 0

app.get('/', function(req, res){
    res.send('Hello world')
    recnt++
    console.log(recnt)
})

var server = app.listen(3000, function(){
    var host = server.address().address
    var port = server.address().port

    console.log('Example app listenint at http://%s:%s', host, port)
})
