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

exports.readDB = (str) => {
  connection.query(str, async (err,data) => {
    if (err) throw err;
    const response = await new Promise((res) => {
      res(data);
    });
    console.table(response);
    mainMenu.mainMenu();
  });
}


exports.endConnection = () => {
  connection.end();
}

// ======== function graveyard ========

// exports.viewAllDepts = () => {
//   return new Promise ((res) => {
//     let query = 'SELECT * FROM departments;';
//     connection.query(query, (err,data) => {
//       if (err) throw err;
//       res(data);
//     });
//   }).then((result) => {
//     let departments = [];
//     for (x in result) {
//       departments.push(result[x].department);
//     }
//     console.table(departments);
//     mainMenu.mainMenu();
//   });
// }