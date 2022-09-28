-- Drop employee_db database if exist
DROP DATABASE IF EXISTS employee_db;
-- Create employee_db database
CREATE DATABASE employee_db;

USE employee_db;

-- Create department table in employee_db database
CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, -- create primary key with auto index value
name VARCHAR(30) NOT NULL
);

-- Create role table in employee_db database
CREATE TABLE role (
 id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
 title VARCHAR(30) NOT NULL,
 salary DECIMAL NOT NULL,
 department_id INT,
 FOREIGN KEY (department_id)
 REFERENCES department(id)
 ON DELETE SET NULL
);

-- Create employee table in employee_db database
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id) -- set refrence of role table
  REFERENCES role(id)
  ON DELETE SET NULL,

  FOREIGN KEY (manager_id) -- set refrence of employee table
  REFERENCES employee(id)
  ON DELETE SET NULL
);
