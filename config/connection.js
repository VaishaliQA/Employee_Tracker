// Import and require mysql2
const mysql = require('mysql2');

// Connect to database
const connection = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'root',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

  module.exports = connection;