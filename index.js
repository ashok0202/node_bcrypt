const express = require("express");
const pool = require("./db"); 
const bcrypt = require("bcrypt");

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/users/", async (request, response) => {
    try {
        const { id, name, salary, role, password } = request.body;

        // Check if user exists
        const selectUserQuery = `SELECT * FROM employee WHERE name = $1`;
        const dbResult = await pool.query(selectUserQuery, [name]);

        if (dbResult.rows.length > 0) {
            return response.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user
        const createUserQuery = `
            INSERT INTO employee (id, name, salary, role, password)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id
        `;
        const dbResponse = await pool.query(createUserQuery, [id, name, salary, role, hashedPassword]);
        response.json({ message: `User created successfully! User ID: ${dbResponse.rows[0].id}` });

    } catch (error) {
        console.error("Error during user creation:", error);
        response.status(500).json({ message: "Internal Server Error" });
    }
});




app.post("/login", async (request, response) => {
    try {
        const { name, password } = request.body;

        console.log(name, password);

        const selectUserQuery = `SELECT * FROM employee WHERE name = $1`;
        const dbResult = await pool.query(selectUserQuery, [name]);

        const dbUser = dbResult.rows[0];

        if (!dbUser) {
            return response.status(400).json({ message: "Invalid User" });
        }

        const isPasswordMatched = await bcrypt.compare(password, dbUser.password);

        if (isPasswordMatched) {
            response.json({ message: "Login Success!" });
        } else {
            response.status(400).json({ message: "Invalid Password" });
        }
    } catch (error) {
        console.error("Login Error:", error);
        response.status(500).json({ message: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

module.exports = app;
