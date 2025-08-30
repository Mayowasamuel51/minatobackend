const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    port: 3306,
    password: process.env.password,
    database: process.env.database
});

exports.application_logic = (req, res) => {
    const { fullname, email, description, location, age } = req.body;
//    const { fullname, email, description, location, age } = req.body;
    const pdf = null;
    const image = null;
    // Validate text fields
    if (!fullname || !location || !age || !email || !description) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Step 1: Check if email exists
    const checkEmailQuery = `SELECT email FROM application WHERE email = ?`;

    db.query(checkEmailQuery, [email], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ success: false, message: "Database query failed" });
        }

        if (results.length > 0) {
            // Email already exists
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        // Step 2: Insert new record
        const insertQuery = `
            INSERT INTO application (fullname, email, pdf_link, description, image, location, age)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(insertQuery, [fullname, email, pdf, description, image, location, age], (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, message: "Database insert failed" });
            }

            return res.status(201).json({
                success: true,
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
    });
};
