var Todo = require('./models/todo');
var Type = require('./models/type');

module.exports = function(app){
	
	// Todo =================================================
	app.get('/api/todos', function(req, res){
		// use mongoose to get all todos in the db
		Todo.find(function(err, todos){

			if (err)
				res.send(err);

			res.json(todos);
		});
	});

	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res){
		Todo.create({
			text : req.body.text,
			type : req.body.type, 
			done : false
		}, function(err, todo){
			if (err)
				res.send(err);

			Todo.find(function(err, todos){
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
	});

	// delete a todo
	app.delete('/api/todos/:todo_id', function(req, res){
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo){
			if (err)
				res.send(err);
		
			Todo.find(function(err, todos){
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
	});
	
	// Types ===============================================
	// get all types
	app.get('/api/types', function(req, res){
		Type.find(function(err, types){
			if (err)
				res.send(err);

			res.json(types);
		});
	});

	// create a type
	app.post('/api/types', function(req, res){
		Type.create({
			text : req.body.text,
			parent : req.body.parent 
		}, function(err, type){
			if (err)
				res.send(err);

			Type.find(function(err, types){
				if (err)
					res.send(err)
				res.json(types);
			});
		});
	});

	// delete a type
	app.delete('/api/types/:type_id', function(req, res){
		Type.remove({
			_id : req.params.type_id
		}, function(err, type){
			if (err)
				res.send(err);

			Type.find(function(err, types){
				if (err)
					res.send(err)
				res.json(types);
			});
		});
	});

	// Public ==============================================
	app.get('*', function(req, res){
		res.sendFile('/index.html',  {"root": __dirname + '/public/'});
	});
}

