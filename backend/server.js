const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db');

const app = express();
const port = 5000;

app.use(bodyParser.json());

/* db.pool.query(`CREATE TABLE lists(
    id INTEGER AUTO_INCREMENT,
    value TEXT,
    PRIMARY KEY (id)
)`, (err, results, fields) => {
    console.log('results ', results);
}); */

app.get('/api/values', (req, res) => {
    db.pool.query('SELECT * FROM lists;', (err, results, fields) => {
            if (err) 
                return res.status(500).send(err);
            else
                return res.json({results});
        });
});

app.post('/api/value', (req, res, next) => {
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`, 
    (err, results, fields) => {
        if (err)
            return res.status(500).send(err);
        else
            return res.json({ success: true, value: req.body.value});
    });
});

app.listen(port, () => {
    console.log(`어플리케이션이 ${port}번 포트에서 시작되었습니다.`);
});

