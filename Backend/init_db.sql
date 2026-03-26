-- backend/init_db.sql
CREATE DATABASE IF NOT EXISTS hr_intelligence;
USE hr_intelligence;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role ENUM('hr_manager', 'employee', 'admin') DEFAULT 'employee',
    is_active BOOLEAN DEFAULT TRUE,
    employee_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    INDEX idx_email (email),
    INDEX idx_role (role)
);

-- Employees table (for employee profiles)
CREATE TABLE IF NOT EXISTS employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    position VARCHAR(100),
    department VARCHAR(100),
    hire_date DATE,
    age INT,
    seniority_years DECIMAL(3,1),
    performance_score DECIMAL(3,2) DEFAULT 75.00,
    workload_percentage INT DEFAULT 50,
    turnover_risk ENUM('low', 'medium', 'high') DEFAULT 'low',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_department (department)
);

-- Insert demo HR Manager
INSERT INTO users (email, password_hash, full_name, role) VALUES 
('manager@rh.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYvQMqRqZ3K', 'Jean Dupont', 'hr_manager');

-- Insert demo employee
INSERT INTO employees (first_name, last_name, email, position, department, hire_date) VALUES
('Sophie', 'Martin', 'sophie.martin@company.com', 'Développeuse Senior', 'IT', '2022-01-15');

INSERT INTO users (email, password_hash, full_name, role, employee_id) VALUES 
('sophie.martin@company.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYvQMqRqZ3K', 'Sophie Martin', 'employee', 1);

-- Note: password for demo accounts is "password123"