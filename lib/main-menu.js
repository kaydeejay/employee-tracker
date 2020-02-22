const inquirer = require('inquirer');
const dbCon = require('../app');

exports.mainMenu = () => {
  inquirer
  .prompt({
    type: 'list',
    message: 'What would you like to do?',
    choices: [
      'View All Employees',
      'View All Roles',
      'View All Departments',
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
        console.log(response.action);
        dbCon.readDB('SELECT * FROM roles;');
        break;
      case 'View All Departments':
        dbCon.readDB('SELECT * FROM departments');
        break;
      case 'Add Employee':
        console.log(response.action);
        break;
      case 'Add Role':
        console.log(response.action);
        break;
      case 'Add Department':
        console.log(response.action);
        break;
      case 'Update Employee':
        console.log(response.action);
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