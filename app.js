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
    console.log(response);
    mainMenu.mainMenu();
  });
}

// ======== function graveyard ========

// exports.listDepts = async () => {
//   const deptsArray = await new Promise((res) => {
//     connection.query('SELECT * FROM departments;', async (err,data) => {
//       if (err) throw err;
//       await new Promise((res) => {
//         res(data);
//       }).then((response) => {
//         res(response);
//       });
//     });
//   });
//   console.log(deptsArray);
// }