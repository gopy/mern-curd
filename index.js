var express = require('express');
var app = express();
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 


/*var rout = require('./include/router.js');
app.use('/', rout);
app.use('/home', rout);*/

app.set('view engine', 'pug');
app.set('views','./views');
 
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/my_db');

var personSchema = mongoose.Schema({
   name: String,
   age: Number,
   nationality: String
});
var Person = mongoose.model("Person", personSchema);


app.get('/', function(req, res){
   res.send("Hello world!");
});

app.get('/person', function(req, res){
   res.render('person');
});

app.post('/person', function(req, res){
   var personInfo = req.body; //Get the parsed information
   
   console.log(req.body);
  // res.send("POST");
 
 if(!personInfo.name || !personInfo.age || !personInfo.nationality){
      res.render('show_message', {
         message: "Sorry, you provided worng info", type: "error"});
   } else {
      var newPerson = new Person({
         name: personInfo.name,
         age: personInfo.age,
         nationality: personInfo.nationality
      });
		
      newPerson.save(function(err, Person){
         if(err)
            res.render('show_message', {message: "Database error", type: "error"});
         else
            res.render('show_message', {
               message: "New person added", type: "success", person: personInfo});
      });
   }
});

app.get('/people', function(req, res){
   Person.find(function(err, response){
      res.json(response);
   });
});

app.get('/peoplelist', function(req, res){
   Person.find(function(err, response){
      res.json(response);
   });
});

app.get('/peoplefind/:id', function(req, res){
   Person.findById(req.params.id, function(err, response){
	   res.json(response);
	});
});

app.put('/people/:id', function(req, res){
	console.log(req.body);	
   Person.findByIdAndUpdate(req.params.id, req.body, function(err, response){
      if(err) res.json({message: "Error in updating person with id " + req.params.id});
      res.json(response);
   });
});

app.delete('/people/:id', function(req, res){
   Person.findByIdAndRemove(req.params.id, function(err, response){
      if(err) res.json({message: "Error in deleting record id " + req.params.id});
      else res.json({message: "Person with id " + req.params.id + " removed."});
   });
});


//curl -X PUT --data "name=Karan&age=21&nationality=Indian" http://localhost:4000/people/5abdda7d72651d14f4ee367e
//curl -X POST --data "name=James&age=20&nationality=American" http://localhost:4000/person
//curl -X DELETE http://localhost:4000/people/5abdd76f64b1d80a58b48a57

//curl -X POST --data "name=Gopi&age=31&nationality=American" http://localhost:4000/person
//curl -X POST --data "name=Hari&age=4&nationality=American" http://localhost:4000/person
//curl -X POST --data "name=Ram&age=1&nationality=American" http://localhost:4000/person
//curl -X POST --data "name=Singam&age=1&nationality=Australia" http://localhost:4000/person



app.listen(4000);