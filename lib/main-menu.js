const inquirer = require('inquirer');
const dbCon = require('../app');
const followUps = require('./follow-ups');

exports.mainMenu = () => {
  inquirer
  .prompt({
    type: 'list',
    message: 'What would you like to do?',
    choices: [
      'View All Employees',
      'View All Roles',
      'View All Departments',
      'View Employees by Department',
      'Add Employee',
      'Add Role',
      'Add Department',
      'Update Employee',
      'Remove Employee',
      'Exit'
    ],
    name: 'action'
  }).then((response) => {
    switch (response.action){
      case 'View All Employees':
        dbCon.readDB('SELECT * FROM employees;');
        break;
      case 'View All Roles':
        dbCon.readDB('SELECT * FROM role;');
        break;
      case 'View All Departments':
        dbCon.readDB('SELECT * FROM department');
        break;
      case 'View Employees by Department':
        dbCon.viewAllRows('department')
        .then(deptRows => parseDepts(deptRows))
        .then(parsedDepts => followUps.emplByDept(parsedDepts))
        .then(whichDept => dbCon.listXByY('department',whichDept));
        break;
      case 'Add Employee':
        dbCon.viewAllRows('department')
        .then(deptRows => parseDepts(deptRows))
        .then(parsedDepts => followUps.newEmpInfo(parsedDepts))
        .then(newEmp => followUps.listRoles(newEmp))
        .then(newEmp => dbCon.createNewEmployee(newEmp));
        break;
      case 'Add Role':
        followUps.makeNew('Role')
        .then(newRole => dbCon.addNew('role',newRole));
        break;
      case 'Add Department':
        followUps.makeNew('Department')
        .then(newDept => dbCon.addNew('department',newDept));
        break;
      case 'Update Employee':
        followUps.listEmployees()
        break;
      case 'Remove Employee':
        console.log(response.action);
        break;
      default:
        console.log('Goodbye');
        dbCon.endConnection();
        break;
    }
  }); 
}

const parseDepts = (obj) => {
  return new Promise((res) => {
    const arr = [];
    for (x in obj) {
      arr.push(obj[x].department);
    }
    res(arr);
  });
}

exports.parseRoles = (obj) => {
  return new Promise((res) => {
    const arr = [];
    for (x in obj) {
      arr.push(obj[x].role);
    }
    res(arr);
  });
}