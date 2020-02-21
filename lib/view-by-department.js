const inquirer = require('inquirer');
const dbCon = require('../app');

exports.viewByDept = () => {
  console.log(dbCon.listDepts());
}