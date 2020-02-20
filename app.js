const inquirer = require("inquirer");
const dbController = require('./db/db.controller');

const startApp = () => {
  inquirer
  .prompt({
    type: 'list',
    message: 'What would you like to do?',
    choices: [
      'View All Employees',
      'View All Employees by Department',
      'View All Employees by Manager',
      'Add Employee',
      'Remove Employee',
      'Update Employee',
      'View All Roles',
      'Exit'
    ],
    name: 'action'
  }).then((response) => {
    switch (response.action){
      case 'View All Employees':
        dbController.viewAllEmployees();
        startApp();
        break;
      case 'View All Employees by Department':
        dbController.viewAllByDept();
        break;
      case 'View All Employees by Manager':
        dbController.viewAllByMang();
        break;
      case 'Add Employee':
        dbController.addEmployee();
        break;
      case 'Remove Employee':
        dbController.removeEmployee();
        break;
      case 'Update Employee':
        dbController.updateEmployee();
        break;
      case 'View All Roles':
        dbController.viewAllRoles();
        break;
      default:
        dbController.exitApp();
        break;
    }
  });
};

startApp();