// Import and require mysql2
const connection = require("../config/connection");
const promptUser = require("../index");
// call once somewhere in the beginning of the app
const cTable = require("console.table");
const inquirer = require("inquirer");

// function to show all roles
function showAllRoles() {
  const sql = `SELECT role.id AS id, role.title AS title, department.name AS department, role.salary AS salary
    FROM role INNER JOIN department ON role.department_id = department.id`;

  connection.query(sql, (err, results) => {
    if (err) throw err;
    console.log("\n");
    console.table(results);
    promptUser();
  });
}

// function to add a role
function insertRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "role",
        message: "What role do you want to add?",
        validate: (addRole) => {
          if (addRole) {
            return true;
          } else {
            console.log("Please enter a role");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of this role?",
        validate: (addSalary) => {
          if (Number(addSalary)) {
            return true;
          } else {
            console.log("Please enter a salary");
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      const params = [answer.role, answer.salary];

      // grab dept from department table
      const roleSql = `SELECT name, id FROM department`;

      connection.query(roleSql, (err, data) => {
        if (err) throw err;

        const dept = data.map(({ name, id }) => ({ name: name, value: id }));

        inquirer
          .prompt([
            {
              type: "list",
              name: "dept",
              message: "What department is this role in?",
              choices: dept,
            },
          ])
          .then((deptChoice) => {
            const dept = deptChoice.dept;
            params.push(dept);

            const sql = `INSERT INTO role (title, salary, department_id)
                            VALUES (?, ?, ?)`;

            connection.query(sql, params, (err, result) => {
              if (err) throw err;
              console.log("Added" + answer.role + " to roles!");

              showAllRoles();
            });
          });
      });
    });
}

// function to delete role
function removeRole() {
  const roleSql = `SELECT * FROM role`;

  connection.query(roleSql, (err, data) => {
    if (err) throw err;

    const role = data.map(({ title, id }) => ({ name: title, value: id }));

    inquirer
      .prompt([
        {
          type: "list",
          name: "role",
          message: "What role do you want to delete?",
          choices: role,
        },
      ])
      .then((roleChoice) => {
        const role = roleChoice.role;
        const sql = `DELETE FROM role WHERE id = ?`;

        connection.query(sql, role, (err, result) => {
          if (err) throw err;
          console.log("Successfully deleted!");

          showAllRoles();
        });
      });
  });
}

module.exports = { showAllRoles, insertRole, removeRole };
