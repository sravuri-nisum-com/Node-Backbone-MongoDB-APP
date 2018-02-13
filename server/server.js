var express = require('express');
var bodyparser = require('body-parser');
var cors = require('cors');
// var csv = require('csv'); 
//mongodb library in node js  
var mongoose = require("mongoose");

var cors = require("cors");

// var csvtojson = require('csvtojson'); 
//defineng express to use its methods/apis 



// This is for csv files accessing 
// var obj = csv();

// var MyData = []; //array to store details 


// function MyCSV(Fname, Lname, email,age) {
//     this.First_Name = Fname;
//     this.Last_Name = Lname;
//     this.Email = email;
//     this.Age=age;
// }; 

// obj.from.path('./contactsInfo.csv').to.array(function (data) {
//     for (var index = 0; index < data.length; index++) {
//         MyData.push(new MyCSV(data[index][0], data[index][1], data[index][2],data[index][3],data[index][4]));
//     }
//     console.log(MyData);
// });

//replacing CSV file with data base MongoDB

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/contactsList-1", {
//   useMongoClient: true
});
mongoose.connection.on('connected',()=>{
    console.log('connected to database mongodb @27017');
});
mongoose.connection.on('error',(err)=>{
    if(err){
        console.log('error in database connection:'+err);
    }
});

//creting mongoDB schema
var Schema = mongoose.Schema;

var ContactSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String
});

mongoose.model("Contact", ContactSchema);

var Contact = mongoose.model("Contact");



var app = express();
app.use(cors()); // for cross browser access

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.text());
app.use(bodyparser.json({ type: "application/json" })); 

app.use(express.static(__dirname + "/public"));


app.get('/', (req, res) => {
  res.send("please enter end point  '/contacts' to view  contacts")

});
app.get("/api/contacts", function(req, res) {
  Contact.find(function(err, docs) {
    // docs.forEach(function(item) {
    // 	console.log("Received a GET request for _id: " + item._id);
    // })
    res.send(docs);
  });
});


app.post("/api/contacts", function(req, res) {
  console.log("Received a POST request:");
  //   for (var key in req.body) {
  //     console.log(key + ": " + req.body[key]);//JUST FOR CHECKING
  //   }
  var contact = new Contact(req.body);
  contact.save(function(err, doc) {
    res.send(doc);
  });
});

app.delete("/api/contacts/:id", function(req, res) {
  //   console.log("Received a DELETE request for _id: " + req.params.id);
  Contact.remove({ _id: req.params.id }, function(err, doc) {
    res.send({ _id: req.params.id });
  });
});

app.put("/api/contacts/:id", function(req, res) {
  //   console.log("Received an UPDATE request for _id: " + req.params.id);
  Contact.update({ _id: req.params.id }, req.body, function(err) {
    res.send({ _id: req.params.id });
  });
});



// app.get('/contacts', (req, res) => {
//     res.writeHead(200, { 'content-type': 'application/json' });
//     res.end(JSON.stringify(MyData));

// });
const port = 6300;
app.listen(port, () => {
    console.log('server started running at port' + port);

});


