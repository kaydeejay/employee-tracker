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

exports.listEmployees = () => {
  return new Promise((res) => {
    
  })
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