const express=require('express');
const app=express();
var gulp = require('gulp');
var mongojs=require('mongojs');
var db=mongojs('contactlist',['contactlist']);
var bodyParser=require('body-parser');
var middleware = require('swagger-express-middleware');
var acl = require('acl');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
var securityProtocols = require('./lib/jwtAuthentication');

//jwt authentication for generate authentication token
app.post('/contactlist', function(req,res) {
    console.log(req.body);
    db.contactlist.insert(req.body, function(err,doc){
			var token = securityProtocols.generateOAppToken({appId: appId, userId: userId});
        res.status(200).json(token);
    });
});
app.post('/contactlist', function(req,res) {
    console.log(req.body);
    db.contactlist.insert(req.body, function(err,doc){
			var json = securityProtocols.decodeOAppToken(token);
        res.status(200).json(json);
    });
});
app.get('/contactlist',function(req,res){
	console.log("i received a get request");
    db.contactlist.find(function(err,docs){
    console.log(docs);
    res.json(docs);
});
});

app.post('/contactlist', function(req,res) {
    console.log(req.body);
    db.contactlist.insert(req.body, function(err,doc){
     res.json(doc);
    });
});

app.delete('/contactlist/:id', function(req,res){
    var id=req.params.id;
    console.log(id);

    db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err,doc){
        res.json(doc);
    })
});
app.get('/contactlist/:id', function(req,res){
    var id=req.params.id;
    console.log(id);

    db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err,doc){
        res.json(doc);
    })
});
app.put('/contactlist/:id', function(req,res){
    var id=req.params.id;
    console.log(req.body.name);
    db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, contact: req.body.contact}},
    new: true}, function(err,doc){
        res.json(doc);

});
});

console.log('May node be with you');


middleware('PetStore.yaml', app, function(err, middleware) {
    app.use(middleware.metadata());
    app.use(middleware.parseRequest());
    app.use(middleware.validateRequest());

    // An HTML page to help you produce a validation error
    app.use(function(req, res, next) {
        res.send(
            'Click this button to see a validation error:' +
            '<form action="/pets/Fido" method="post">' +
            '<button type="submit">POST</button>' +
            '</form>'
        );
    });

    // Error handler to display the validation error as HTML
    app.use(function(err, req, res, next) {
        res.status(err.status);
        res.send(
            '<h1>' + err.status + ' Error</h1>' +
            '<pre>' + err.message + '</pre>'
        );
    });
		function requireRole (role) {
    return function (req, res, next) {
        if (req.session.user && req.session.user.role === role) {
            next();
        } else {
            res.send(403);
        }
    }
}

app.get("/contactlist", foo.index);
app.get("/contactlist/:id", requireRole("user"), foo.show);
app.post("/contactlist", requireRole("admin"), foo.create);
app.all("/contactlist/:id", requireRole("admin"));
app.all("/contactlist/:id/", requireRole("user"));

//security using acl
// Or Using the mongodb backend
acl = new acl(new acl.mongodbBackend(dbInstance, prefix));
// guest is allowed to view blogs
acl.allow('guest', 'blogs', 'view')
// allow function accepts arrays as any parameter
acl.allow('member', 'blogs', ['edit', 'view', 'delete'])
acl.allow([
    {
        roles:['guest', 'member'],
        allows:[
            {resources:'blogs', permissions:'get'},
            {resources:['forums', 'news'], permissions:['get', 'put', 'delete']}
        ]
    },
    {
        roles:['gold', 'silver'],
        allows:[
            {resources:'cash', permissions:['sell', 'exchange']},
            {resources:['account', 'deposit'], permissions:['put', 'delete']}
        ]
    }
])
app.put('/contactlist/:id', acl.middleware(), function(req, res, next){
	//configuration and calculations on req
  //res.json(computed object);
}

		app.listen(3002,function(){
			console.log('listening on 3002')
		});
});
