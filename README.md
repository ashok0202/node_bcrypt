# Employee Login and Registration System

## Overview
This project allows employees to log in using their **username** and **password**. If the username doesn't exist in the database, the employee will be registered with a hashed password using **bcrypt** for security.

## Features
- **User Login**: Employees can log in using their username and password.
- **User Registration**: If the employee doesn't exist, they are registered with a secure password (hashed using bcrypt).
- **Password Security**: The passwords are hashed and compared using bcrypt's `hash()` and `compare()` methods to ensure security.

## Technologies Used
- Node.js
- Express.js
- PostgreSQL (Database)
- bcrypt for password hashing and comparison

## Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** (version 16 or higher)
- **PostgreSQL** (database server)
- **npm** (Node.js package manager)

## Installation Instructions

### 1. Clone the Repository
Clone the repository to your local machine:
```sh
git clone https://github.com/yourusername/employee-login-registration.git
