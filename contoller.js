const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    port: 3306,
    password: process.env.password,
    database: process.env.database
});

exports.application_logic = (req, res) => {
    const { fullname, email, pdf, description, image, location, age } = req.body;
    // Validate text fields
    if (!fullname || !location || !age || !email || !description || !image ) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // Insert into MySQL
    const sql = `
        INSERT INTO application (fullname, email, pdf_link, description, image, location, age)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [fullname, email, pdf, description, image, location, age], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database insert failed" });
        }

        return res.status(201).json({
            message: "Application submitted successfully",
            data: {
                id: result.insertId,
                fullname,
                email,
                pdf,
                description,
                image,
                location,
                age
            }
        });
    });
};
