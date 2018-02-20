var mysql = require("mysql");
var express = require("express");
var bodyparser = require("body-parser");
var cors = require("cors");


var app = express();
app.use(cors()); // for cross browser access

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.text());
app.use(bodyparser.json({ type: "application/json" }));

app.use(express.static(__dirname + "/public"));


//connecting to mysql DB 

// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "4321",
//   database: "contacts_db"
// });
connection.connect(function(err) {
  if (err) throw err;
  console.log("You are now connected...");
});


app.get("/contacts", function(req, res) {
  console.log(req);
  connection.query("select * from contacts", function(error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});
app.get("/contacts/:id", function(req, res) {
  connection.query("select * from contacts where id=?",[req.params.id], function(error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    }
  );
});

app.post("/contacts", function(req, res) {
  var postData = req.body;
  connection.query("INSERT INTO contacts SET ?", postData, function(error,results,fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});


app.put("/contacts", function(req, res) {
  connection.query(
    "UPDATE `contacts` SET `first_name`=?,`last_name`=?,`email`=?,`tel_number`=? where `id`=?",
    [
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      req.body.tel_number,
      req.body.id
    ],
    function(error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    }
  );
});

app.delete("/contacts", function(req, res) {
  console.log(req.body);
  connection.query(
    "DELETE FROM `contacts` WHERE `id`=?",
    [req.body.id],
    function(error, results, fields) {
      if (error) throw error;
      res.end("Record has been deleted!");
    }
  );
});
const port = 8300;
app.listen(port, () => {
  console.log("server started running at port" + port);
});