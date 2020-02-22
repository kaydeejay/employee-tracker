const mysql = require('mysql');
const mainMenu = require('./lib/main-menu');
const followUps = require('./lib/follow-ups')

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

// ======== READ functions ========

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

exports.viewAllRows = (str) => {
  return new Promise ((res) => {
    let query = `SELECT * FROM ${str};`;
    connection.query(query, (err,data) => {
      if (err) throw err;
      res(data);
    });
  });
}

exports.listXByY = (str1,str2) => {
  connection.query(
    `SELECT * FROM employees WHERE ${str1} = "${str2}";`,
    (err,data) => {
      if (err) throw err;
      console.table(data);
      mainMenu.mainMenu();
  });
}

exports.getAttrbts = (num) => {
  return new Promise((res) => {
    connection.query(
      `SELECT * FROM employees WHERE id = ${num};`,
      (err,data) => {
        if (err) throw err;
        res(data[0]);
      }
    );
  });
}

// ======== CREATE functions ========

exports.createNewEmployee = (obj) => {
  console.log(obj);
  connection.query('INSERT INTO employees SET ?', 
  {
      firstName: obj.firstName,
      lastName: obj.lastName,
      title: obj.role,
      department: obj.dept,
      salary: obj.salary,
      manager: obj.manager,
  }, (err) => {
    if (err) throw err;
    console.log('Employee Successfully Added');
    mainMenu.mainMenu();
  });
}

exports.addNew = (str1, str2) => {
  connection.query(`INSERT INTO ${str1} SET ${str1} = "${str2}"`,
  (err) => {
    if (err) throw err;
    console.log('Successfully Added');
    mainMenu.mainMenu();
  });
}

// ======== UPDATE functions ========

exports.updateEmp = (obj) => {
  return new Promise((res) => {
    connection.query(
      `UPDATE employees SET ${obj.updateAttr} = "${obj.updatedVal}" WHERE id = ${obj.id}`,
      (err) => {
        if (err) throw err;
        console.log('Successfully Updated');
        mainMenu.mainMenu();
      });
  });
}

// ======== DELETE functions ========

exports.deleteEmployee = (id) => {
  connection.query(
    `DELETE FROM employees WHERE id = ${id}`,
    (err) => {
      if (err) throw err;
      console.log('Successfully Deleted');
      mainMenu.mainMenu();
    }
  );
}

// ======== END function ========

exports.endConnection = () => {
  connection.end();
}

  // ======== function graveyard ========