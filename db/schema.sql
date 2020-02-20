DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    title VARCHAR(50),
    department VARCHAR(50),
    salary INT,
    manager VARCHAR(50),
    PRIMARY KEY (id)
);

INSERT INTO employees
    (firstName, lastName, title, department, salary, manager)
VALUES
    ('Kevin', 'Devine-Jones', 'Lead Engineer', 'Engineering', 160000, NULL),
    ('Kristin', 'Devine-Jones', 'Legal Team Lead', 'Legal', 165000, NULL),
    ('Taylor', 'Brauer', 'Accountant', 'Finance', 80000, 'Kristin Devine-Jones');