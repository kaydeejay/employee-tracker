const inquirer = require('inquirer');

exports.mainMenu = () => {
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
        testVar = "this is a test variable";
        console.log(response.action);
        break;
      case 'View All Employees by Department':
        console.log(response.action);
        break;
      case 'View All Employees by Manager':
        console.log(response.action);
        break;
      case 'Add Employee':
        console.log(response.action);
        break;
      case 'Remove Employee':
        console.log(response.action);
        break;
      case 'Update Employee':
        console.log(response.action);
        break;
      case 'View All Roles':
        console.log(response.action);
        break;
      default:
        console.log(response.action);
        break;
    }
  }); 
}