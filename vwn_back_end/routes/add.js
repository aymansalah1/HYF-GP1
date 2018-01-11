const fs = require('fs');
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());
const config = JSON.parse(fs.readFileSync('config-secret.json'))
const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    port: config.port,
    database: config.database
});
connection.connect();
const queryPromise = (queryBody, values) => {
    return new Promise((resolve, reject) => {
        connection.query(queryBody, values, (error, results, fields) => {
            if (error) {
                reject({ error });
            }
            else {
                resolve(results);
            }
        });
    });
}
router.post('/add', (req, res) => {
    const data = req.body;
    console.log(data)
    let insertedOrgId;
    queryPromise(`
        INSERT INTO
            org
                (name, description_company, logo, active, approved)
        VALUES
            (?, ?, ?, ?, ?)
    `, [data.CompanyName, data.CompanyDescription, data.CompanyLogo, 1, 0]).then(results => {
            insertedOrgId = results.insertId;
            return queryPromise(`
            INSERT INTO
                org_has_tag
                    (org_id, tag_id)
            VALUES
                ?
        `, [data.Tags.map(tagId => [insertedOrgId, tagId])]);
        }).then(results => {

            return queryPromise(`
            INSERT INTO
                contact
                    (region_id,phone, email, web, org_id, post_code, city, house_number)
            VALUES
                ?
        `, [data.Contacts.map(contact => {

                    return [contact.Region,
                    contact.phone,
                    contact.email,
                    contact.web,
                        insertedOrgId,
                    contact.post_code,
                    contact.city,
                    contact.house_number
                    ]
                })]);
        }).then(results => {
            res.status(200).send();
        }).catch(error => {
            res.status(500).send();
            console.log(error)
        });
});
module.exports = router;