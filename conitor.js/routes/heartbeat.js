var express = require('express');
var mysql = require('mysql')
var router = express.Router();

var dbconn = mysql.createConnection({
	host	: 'localhost',
	user	: 'wiesler',
	password: 'wiesler@3306',
	database: 'wiesler_conitor'
})

// dbconn.connect(function(err){
// 	if(err) {
// 		console.error('error connecting: ' + err.stack);
// 		return ;
// 	}
// 	console.log('connected as id ' + dbconn.threadId);
// })

var sqls = {
	insert: "INSERT INTO `heartbeat`(`cid`, `cname`, `parentid`, `parentname`, `type`, `doccnt_s`, `doccnt_f`, `percent`, `ip`, `time`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
};

var status = {
	success: {
		status: 'success',
	},
	fail: {
		status: 'fail',
		message: ''
	}
};

router.get('/', function(req, res, next) {
	// body...
	// res.send('hello world');
	//res.send(req.ip )//+ '   ' + res.body.cid);
	var locals = {
		content: 'welcome'
	}

	res.render('heartbeat/dashboard', locals);
});

router.post('/', function(req, res, next){
	// res.send(req.ip + '   ' + res.body.cid);
	var values = [
					req.body.cid, 
					req.body.cname,
					req.body.parentid,
					req.body.parentname,
					req.body.type,
					req.body.doccnt_s,
					req.body.doccnt_f,
					req.body.percent,
					req.ip,
					req.body.time
					];

	dbconn.query(sqls.insert, values, function(err){
		if(err){
			console.log('Error'+err.stack);
			status.fail.message = err.stack;
			res.json(status.fail);
		} else {
			res.json(status.success);
		}
	})
})


module.exports = router;