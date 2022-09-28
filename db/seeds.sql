-- Insert multiple rows value in department table
INSERT INTO department (name)
VALUES 
('IT'),
('Finance & Accounting'),
('Sales & Marketing'),
('Legal'),
('Operations');

-- Insert multiple rows value in role table
INSERT INTO role (title, salary, department_id)
VALUES
('Sales Lead', 22000, 3),
('Full Stack Developer', 34000, 1),
('Software Engineer', 320000, 1),
('Project Manager', 130000, 4),
('Finanical Analyst', 29000, 2),
('Marketing Coordindator', 70000, 3), 
('Accountant', 20000, 2), 
('Operations Manager', 88000, 4);

-- Insert multiple rows value in employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Vaishu', 'Shah', 2, null),
('Kevin', 'Jain', 1, 1),
('Komal', 'Brown', 4, null),
('Ashley', 'Lad', 3, 3),
('Tom', 'Moore', 6, null),
('Neha', 'Sanchez', 5, 5),
('Vishav', 'Shah', 7, null),
('Ravi', 'Patel', 8, 7);