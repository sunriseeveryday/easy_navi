const fs = require('fs');
const path = require('path');
const express = require('express');

const staticsPath = path.join(__dirname, "statics")
const port = 8081

const app = express();
const router = express.Router()

app.use(express.static(staticsPath))

router.get("/", (req, res) => {
    res.sendFile(path.join(staticsPath, "index.html"))
})

router.get('/get-box-meta', (req, res) => {
    const libraryPath = path.join(__dirname, "statics", "library.json");

    fs.readFile(libraryPath, "utf8", (err, data) => {
        if (err) {
            console.error('Error reading library.json:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        const boxMeta = JSON.parse(data);
        res.json(boxMeta);
    });
});

app.use("/", router)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
