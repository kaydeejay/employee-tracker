const inquirer = require('inquirer');
const dbCon = require('../app');
const mainMenu = require('./main-menu');

exports.emplByDept = (array) => {
  return new Promise((res) => {
    inquirer
    .prompt({
      type:'list',
      message: 'Which Department?',
      choices: array,
      name: 'dept'
    }).then(response => {
      res(response.dept)
    });
  });
}

exports.newEmpInfo = (array) => {
  return new Promise((res) => {
    inquirer
    .prompt([
      {
        type: 'input',
        message: 'Employee First Name?',
        name: 'firstName'
      },
      {
        type: 'input',
        message: 'Employee Last Name?',
        name: 'lastName'
      },
      {
        type: 'list',
        message: 'Department?',
        choices: array,
        name: 'dept'
      },
      {
        type: 'input',
        message: 'Salary?',
        name: 'salary'
      },
      {
        type: 'input',
        message: 'Who\'s their Manager?',
        name: 'manager'
      }
    ]).then(response => res(response));
  });
}

exports.listRoles = (obj) => {
  return new Promise((res) => {
    dbCon.viewAllRows('role')
    .then(rolesRows => mainMenu.parseRoles(rolesRows))
    .then(parsedRoles => res(parsedRoles));
  }).then(parsedRoles => assignRole(obj,parsedRoles));
}

exports.makeNew = (str) => {
  return new Promise((res) => {
    inquirer
    .prompt({
      type: 'input',
      message: `Enter New ${str}`,
      name: 'newRole'
    }).then(result => res(result.newRole));
  })
}

exports.chooseEmployee = () => {
  return new Promise((res) => {
    dbCon.viewAllRows('employees')
    .then(employeeRows => mainMenu.parseEmps(employeeRows))
    .then(parsedEmps => selectEmployee(parsedEmps))
    .then(chosenEmp => res(chosenEmp));
  })
}

exports.getEmpId = (str) => {
  // console.log(str)
  return new Promise((res) => {
    const arrayified = str.split(' ');
    let id = parseInt(arrayified[arrayified.length - 1]); 
    // console.log(id);
    res(id);
  });
}

exports.chooseKey = (arr) => {
  // console.log(arr);
  return new Promise((res) => {
    inquirer
    .prompt({
      type: 'list',
      message: 'Update which detail?',
      choices: arr.filter(el => el !== arr[0] && el!== arr[1]),
      name: 'updateMe'
    }).then((response) => {
      switch(response.updateMe){
        case 'firstName':
        case 'lastName':
        case 'salary':
        case 'manager':
          inquirer
          .prompt({
            type: 'input',
            message: `Enter New ${response.updateMe}`,
            name: 'updatedVal'
          }).then(updatedVal => {
            updatedVal.id = arr[0];
            updatedVal.updateAttr = response.updateMe;
            res(updatedVal)
          });
          break;
        case 'title':
          dbCon.viewAllRows('role')
          .then(rows => mainMenu.parseRoles(rows))
          .then(parsedRows => {
            inquirer
            .prompt({
              type: 'list',
              message: `Choose New ${response.updateMe}`,
              choices: parsedRows,
              name: 'updatedVal'
            }).then(updatedVal => {
              updatedVal.id = arr[0];
              updatedVal.updateAttr = response.updateMe;
              res(updatedVal);
            });
          });
          break;
        case 'department':
          dbCon.viewAllRows('department')
          .then(rows => mainMenu.parseDepts(rows))
          .then(parsedRows => {
            inquirer
            .prompt({
              type: 'list',
              message: `Choose New ${response.updateMe}`,
              choices: parsedRows,
              name: 'updatedVal'
            }).then(updatedVal => {
              updatedVal.id = arr[0];
              updatedVal.updateAttr = response.updateMe;
              res(updatedVal);
            });
          });
      }
    });
  });
}

const selectEmployee = (arr) => {
  return new Promise((res) => {
    inquirer
    .prompt({
      type: 'list',
      message: 'Which Employee?',
      choices: arr,
      name: 'empToUpdate'
    }).then(result => res(result.empToUpdate));
  });
}

const assignRole = (obj,arr) => {
  return new Promise((res) => {
    inquirer
    .prompt({
      type: 'list',
      message: 'Assign Role:',
      choices: arr,
      name: 'role'
    }).then(response => {
      obj.role = response.role;
      res(obj);
    });
  })
}