//import node modules
const inquirer = require("inquirer");

// inquirer prompt for first action
const promptUser = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choices",
        message: "What would you like to do?",
        choices: [
          "View all employees",
          "View employees by department",
          "Add an employee",
          "Update an employee role",
          "Update an employee manager",
          "Delete an employee",
          "View all roles",
          "Add a role",
          "Delete a role",
          "View all departments",
          "Add a department",
          "View department budgets",
          "Delete a department",
          "Quit",
        ],
      },
    ])
    .then((answers) => {
      const { choices } = answers;

      if (choices === "View all employees") {
        showEmployees();
      }
      if (choices === "View employees by department") {
        employeeDepartment();
      }
      if (choices === "Add an employee") {
        addEmployee();
      }

      if (choices === "Update an employee role") {
        updateEmployee();
      }
      if (choices === "Update an employee manager") {
        updateManager();
      }

      if (choices === "Delete an employee") {
        deleteEmployee();
      }

      if (choices === "View all roles") {
        showRoles();
      }

      if (choices === "Add a role") {
        addRole();
      }

      if (choices === "Delete a role") {
        deleteRole();
      }

      if (choices === "View all departments") {
        showDepartments();
      }
      if (choices === "View department budgets") {
        viewBudget();
      }

      if (choices === "Add a department") {
        addDepartment();
      }
      if (choices === "Delete a department") {
        deleteDepartment();
      }

      if (choices === "Quit") {
        quitPrograme();
      }
    });
};

module.exports = promptUser;
