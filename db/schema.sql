DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;

USE employee_DB;

-- Create Tables for Department, Role, Employee
CREATE Table department (
    id INT NOT NULL AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE Table roles (
    id INT NOT NULL AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL (10, 0) NOT NULL,
    department_id INT,
    PRIMARY KEY(id)
);

CREATE Table employee (
    id INT NOT NULL AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY(id)

);