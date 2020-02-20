const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootroot",
  database: "employees_db"
});

connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
//   console.log("connected to database as id " + connection.threadId)
});

module.exports = {
  viewAllEmployees: async () => {
    const promise = new Promise((res) => {
      connection.query('SELECT * FROM employees;', (err, data) => {
        if (err) throw err;
        res(data);
        });
    });
    const result = await promise;
    console.log(result);
  },
  viewAllByDept: () => {
    console.log("View All Employees by Department");
  },
  viewAllByMang: () => {
    console.log("View All Employees by Manager");
  },
  addEmployee: () => {
    console.log("Add Employee");
  },
  removeEmployee: () => {
    console.log("Remove Employee");
  },
  updateEmployee: () => {
    console.log("Update Employee");
  },
  viewAllRoles: () => {
    console.log("View All Roles");
  },
  exitApp: () => {
    console.log("Goodbye");
    connection.end();
  }
};