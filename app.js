const mysql = require('mysql');
const mainMenu = require('./lib/main-menu');

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootroot",
  database: "employees_db"
});

connection.connect(async (err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  const response = await new Promise((res) => {
    res("connected to database as id " + connection.threadId);
  });
  console.log(response);
  mainMenu.mainMenu();
});