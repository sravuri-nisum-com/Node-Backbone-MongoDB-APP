var mysql=require("mysql"),
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "4321",
  database: "contacts_db"
});
module.exports = connection;