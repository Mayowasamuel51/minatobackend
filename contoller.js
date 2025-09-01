const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    port: 3306,
    password: process.env.password,
    database: process.env.database
});

// Insert application logic
exports.application_logic = (req, res) => {
    const { fullname, email, description, location, age } = req.body;
    const pdf = null;
    const image = null;

    // Validate fields
    if (!fullname || !location || !age || !email || !description) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if email exists
    const checkEmailQuery = `SELECT email FROM application WHERE email = ?`;

    db.query(checkEmailQuery, [email], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ success: false, message: "Database query failed" });
        }

        if (results.length > 0) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        // Insert record
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

// ✅ New function: Get all applications


exports.get_all_information = (req, res) => {
    const query = `SELECT * FROM application ORDER BY id DESC`; // Latest records first
    db.query(query, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ success: false, message: "Database fetch failed" });
        }

        return res.status(200).json({
            success: true,
            message: "Applications retrieved successfully",
            count: results.length,
            data: results
        });
    });
};
