// Import and require mysql2
const connection = require("../config/connection");
const promptUser = require("../index");
// call once somewhere in the beginning of the app
const cTable = require("console.table");
const inquirer = require("inquirer");

function showAllDepartment() {
  const sql = `SELECT department.id AS id, department.name AS department FROM department`;

  connection.query(sql, (err, results) => {
    if (err) throw err;
    console.log("\n");
    console.table(results);
    promptUser();
  });
}

// function to view department by budget
function viewDepartmentbyBudget() {
  const sql = `SELECT department_id AS id, 
  department.name AS department,
  SUM(salary) AS budget
FROM  role  
JOIN department ON role.department_id = department.id GROUP BY  department_id`;

  connection.query(sql, (err, results) => {
    if (err) throw err;
    console.log("\n");
    console.table(results);
    promptUser();
  });
}

// function to add a department
function insertDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addDept",
        message: "What department do you want to add?",
        validate: (addDept) => {
          if (addDept) {
            return true;
          } else {
            console.log("Please enter a department");
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      const sql = `INSERT INTO department (name)
                VALUES (?)`;
      connection.query(sql, answer.addDept, (err, result) => {
        if (err) throw err;
        console.log("Added " + answer.addDept + " to departments!");

        showAllDepartment();
      });
    });
}

// function to delete department
function removeDepartment() {
  const deptSql = `SELECT * FROM department`;

  connection.query(deptSql, (err, data) => {
    if (err) throw err;

    const dept = data.map(({ name, id }) => ({ name: name, value: id }));

    inquirer
      .prompt([
        {
          type: "list",
          name: "dept",
          message: "What department do you want to delete?",
          choices: dept,
        },
      ])
      .then((deptChoice) => {
        const dept = deptChoice.dept;
        const sql = `DELETE FROM department WHERE id = ?`;

        connection.query(sql, dept, (err, result) => {
          if (err) throw err;
          console.log("Successfully deleted!");

          showAllDepartment();
        });
      });
  });
}

module.exports = {
  showAllDepartment,
  viewDepartmentbyBudget,
  insertDepartment,
  removeDepartment,
};
