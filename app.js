const inquirer = require("inquirer");

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
            'View All Roles'
        ],
        name: 'action'
    }).then((response) => {
        switch (response.action){
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'View All Employees by Department':
                viewAllByDept();
                break;
            case 'View All Employees by Manager':
                viewAllByMang();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Remove Employee':
                removeEmployee();
                break;
            case 'Update Employee':
                updateEmployee();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            default:
                exitApp();
                break;
        }
    });
};

const viewAllEmployees = () => {
    console.log("View All Employees");
};

const viewAllByDept = () => {
    console.log("View All Employees by Department");
};

const viewAllByMang = () => {
    console.log("View All Employees by Manager");
};

const addEmployee = () => {
    console.log("Add Employee");
};

const removeEmployee = () => {
    console.log("Remove Employee");
};

const updateEmployee = () => {
    console.log("Update Employee");
};

const viewAllRoles = () => {
    console.log("View All Roles");
};

const exitApp = () => {
    console.log("Goodbye");
};

startApp();