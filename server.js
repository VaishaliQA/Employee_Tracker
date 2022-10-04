// Import and require mysql2
const connection = require("./config/connection");
// Import user custom files
const promptUser = require("./index");

const {
  showAllEmployess,
  showEmployeebyDepartment,
  insertEmployee,
  editEmployee,
  editEmployeebyManager,
  removeEmployee,
  showEmployeebyManager
} = require("./helpers/employee");

const {
  showAllDepartment,
  viewDepartmentbyBudget,
  insertDepartment,
  removeDepartment,
} = require("./helpers/department");

const { showAllRoles, insertRole, removeRole } = require("./helpers/role");
// call once somewhere in the beginning of the app
const cTable = require("console.table");
const inquirer = require("inquirer");

// Connect to database
connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});

// function after connection is established and welcome image shows
afterConnection = () => {
  console.log("***********************************");
  console.log("*                                 *");
  console.log("*        EMPLOYEE MANAGER         *");
  console.log("*                                 *");
  console.log("***********************************");
  promptUser();
};

// function to show all employees
showEmployees = () => {
  console.log("Showing all employees...\n");
  showAllEmployess();
};

// function to view employee by department
employeeDepartment = () => {
  console.log("Showing employee by departments...\n");
  showEmployeebyDepartment();
};
// function to view employee manager
employeeManager = () => {
  console.log("Showing employee by departments...\n");
  showEmployeebyManager();
};

// function to add an employee
addEmployee = () => {
  insertEmployee();
};

// function to update an employee
updateEmployee = () => {
  editEmployee();
};

// function to update an employee manager
updateManager = () => {
  editEmployeebyManager();
};

// function to delete employees
deleteEmployee = () => {
  removeEmployee();
};

// function to show all departments
showDepartments = () => {
  console.log("Showing all departments...\n");
  showAllDepartment();
};

// view department budget
viewBudget = () => {
  console.log("Showing budget by department...\n");
  viewDepartmentbyBudget();
};

// function to add a department
addDepartment = () => {
  insertDepartment();
};

// function to delete department
deleteDepartment = () => {
  removeDepartment();
};

// function to show all roles
showRoles = () => {
  console.log("Showing all roles...\n");
  showAllRoles();
};

// function to add a role
addRole = () => {
  insertRole();
};

// function to delete role
deleteRole = () => {
  removeRole();
};

// End connection
quitPrograme = () => {
  connection.end();
};
