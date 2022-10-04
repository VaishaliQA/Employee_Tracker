// Import and require mysql2
const connection = require("../config/connection");
const promptUser = require("../index");
// call once somewhere in the beginning of the app
const cTable = require("console.table");
const inquirer = require("inquirer");

// function to show all employees
function showAllEmployess() {
  const sql = `SELECT employee.id AS id, 
    employee.first_name AS firstname, 
    employee.last_name AS lastname, 
    role.title AS title, 
    department.name AS department,
    role.salary AS salary, 
    CONCAT (manager.first_name, " ", manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id`;

  connection.query(sql, (err, results) => {
    if (err) throw err;
    console.log("\n");
    console.table(results);
    promptUser();
  });
}

// function to view employee by department
function showEmployeebyDepartment() {
  const sql = `SELECT employee.first_name AS firstname, employee.last_name AS lastname, department.name AS department
                 FROM employee LEFT JOIN role ON employee.role_id = role.id 
                 LEFT JOIN department ON role.department_id = department.id ORDER BY department`;

  connection.query(sql, (err, results) => {
    if (err) throw err;
    console.log("\n");
    console.table(results);
    promptUser();
  });
}

function showEmployeebyManager()
{
  const sql = `SELECT employee.first_name AS firstname, employee.last_name AS lastname,
  role.title AS role, department.name AS department, role.salary AS salary, 
  CONCAT_WS(' ', employee.first_name, employee.last_name) AS manager
  FROM employee 
  LEFT JOIN role ON employee.role_id = role.id 
  LEFT JOIN department ON role.department_id = department.id ORDER BY manager`;
connection.query(sql, (err, results) => {
if (err) throw err;
console.log("\n");
console.table(results);
promptUser();
});
}

// function to add an employee
function insertEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "fistName",
        message: "What is the employee's first name?",
        validate: (addFirst) => {
          if (addFirst) {
            return true;
          } else {
            console.log("Please enter a first name");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
        validate: (addLast) => {
          if (addLast) {
            return true;
          } else {
            console.log("Please enter a last name");
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      const params = [answer.fistName, answer.lastName];

      // grab roles from roles table
      const roleSql = `SELECT role.id, role.title FROM role`;

      connection.query(roleSql, (err, data) => {
        if (err) throw err;

        const roles = data.map(({ id, title }) => ({ name: title, value: id }));

        inquirer
          .prompt([
            {
              type: "list",
              name: "role",
              message: "What is the employee's role?",
              choices: roles,
            },
          ])
          .then((roleChoice) => {
            const role = roleChoice.role;
            params.push(role);

            const managerSql = `SELECT * FROM employee`;

            connection.query(managerSql, (err, data) => {
              if (err) throw err;

              const managers = data.map(({ id, first_name, last_name }) => ({
                name: first_name + " " + last_name,
                value: id,
              }));

              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "manager",
                    message: "Who is the employee's manager?",
                    choices: managers,
                  },
                ])
                .then((managerChoice) => {
                  const manager = managerChoice.manager;
                  params.push(manager);

                  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES (?, ?, ?, ?)`;

                  connection.query(sql, params, (err, result) => {
                    if (err) throw err;
                    console.log("Employee has been added!");

                    showAllEmployess();
                  });
                });
            });
          });
      });
    });
}

// function to update an employee
function editEmployee() {
  // get employees from employee table
  const employeeSql = `SELECT * FROM employee`;

  connection.query(employeeSql, (err, data) => {
    if (err) throw err;

    const employees = data.map(({ id, first_name, last_name }) => ({
      name: first_name + " " + last_name,
      value: id,
    }));

    inquirer
      .prompt([
        {
          type: "list",
          name: "name",
          message: "Which employee would you like to update?",
          choices: employees,
        },
      ])
      .then((empChoice) => {
        const employee = empChoice.name;
        const params = [];
        params.push(employee);

        const roleSql = `SELECT * FROM role`;

        connection.query(roleSql, (err, data) => {
          if (err) throw err;

          const roles = data.map(({ id, title }) => ({
            name: title,
            value: id,
          }));

          inquirer
            .prompt([
              {
                type: "list",
                name: "role",
                message: "What is the employee's new role?",
                choices: roles,
              },
            ])
            .then((roleChoice) => {
              const role = roleChoice.role;
              params.push(role);

              let employee = params[0];
              params[0] = role;
              params[1] = employee;

              // console.log(params)

              const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;

              connection.query(sql, params, (err, result) => {
                if (err) throw err;
                console.log("Employee has been updated!");

                showAllEmployess();
              });
            });
        });
      });
  });
}

// function to update an employee manager
function editEmployeebyManager() {
  // get employees from employee table
  const employeeSql = `SELECT * FROM employee`;

  connection.query(employeeSql, (err, data) => {
    if (err) throw err;

    const employees = data.map(({ id, first_name, last_name }) => ({
      name: first_name + " " + last_name,
      value: id,
    }));

    inquirer
      .prompt([
        {
          type: "list",
          name: "name",
          message: "Which employee would you like to update?",
          choices: employees,
        },
      ])
      .then((empChoice) => {
        const employee = empChoice.name;
        const params = [];
        params.push(employee);

        const managerSql = `SELECT * FROM employee`;

        connection.query(managerSql, (err, data) => {
          if (err) throw err;

          const managers = data.map(({ id, first_name, last_name }) => ({
            name: first_name + " " + last_name,
            value: id,
          }));

          inquirer
            .prompt([
              {
                type: "list",
                name: "manager",
                message: "Who is the employee's manager?",
                choices: managers,
              },
            ])
            .then((managerChoice) => {
              const manager = managerChoice.manager;
              params.push(manager);

              let employee = params[0];
              params[0] = manager;
              params[1] = employee;

              const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`;

              connection.query(sql, params, (err, result) => {
                if (err) throw err;
                console.log("Employee has been updated!");

                showAllEmployess();
              });
            });
        });
      });
  });
}

// function to delete employees
function removeEmployee() {
  // get employees from employee table
  const employeeSql = `SELECT * FROM employee`;

  connection.query(employeeSql, (err, data) => {
    if (err) throw err;

    const employees = data.map(({ id, first_name, last_name }) => ({
      name: first_name + " " + last_name,
      value: id,
    }));

    inquirer
      .prompt([
        {
          type: "list",
          name: "name",
          message: "Which employee would you like to delete?",
          choices: employees,
        },
      ])
      .then((empChoice) => {
        const employee = empChoice.name;

        const sql = `DELETE FROM employee WHERE id = ?`;

        connection.query(sql, employee, (err, result) => {
          if (err) throw err;
          console.log("Successfully Deleted!");

          showAllEmployess();
        });
      });
  });
}

module.exports = {
  showAllEmployess,
  showEmployeebyDepartment,
  insertEmployee,
  editEmployee,
  editEmployeebyManager,
  removeEmployee,
  showEmployeebyManager
};
