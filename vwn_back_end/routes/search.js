const fs = require('fs');
const mysql = require('mysql');
const express = require('express');

const router = express.Router();
const config = JSON.parse(fs.readFileSync('config-secret.json'))
const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    port: config.port,
    database: config.database
});
connection.connect();
const queryPromise = (queryBody) => {
    return new Promise((resolve, reject) => {
        connection.query(queryBody, (error, results, fields) => {
            if (error) {
                reject({error});
            }
            else {
                resolve(results);
            }
        });
    });
}
router.get('/search', (req, res) => {
    const tags = {};
    const regions = {};
    const orgs = {};
    queryPromise(`
        SELECT
            id, name
        FROM
            tag
    `).then(results => {
        results.forEach(result => {
            tags[result.id] = result.name;
        });
        return queryPromise(`
            SELECT
                id, name, fill, d
            FROM
                regions
        `);
    }).then(results => {
        results.forEach(result => {
            regions[result.id] = {
            name: result.name,
            fill: result.fill,
            d: result.d
         };
        });
        return queryPromise(`
            SELECT
                id, name, description_company, logo
            FROM
                org
            WHERE
                    active = 1
                AND
                    approved = 1
        `);
    }).then(results => {
        results.forEach(result => {
            orgs[result.id] = {
                name: result.name,
                logo: result.logo,
                description_company: result.description_company,
                tags: [],
                contacts: []
            };
        });
        return queryPromise(`
            SELECT
                org_id, tag_id
            FROM
                    org_has_tag
                INNER JOIN
                    org
            ON
                org_id = id
            WHERE
                    approved = 1
                AND
                    active = 1
        `);
    }).then(results => {
        results.forEach(result => {
            orgs[result.org_id].tags.push(result.tag_id);
        });
        return queryPromise(`
            SELECT
                org_id, phone, email, web, contact.region_id, post_code, city, house_number,
                contact.id AS contact_id
            FROM
                    contact
                INNER JOIN
                    org
            ON
                org_id = org.id
            WHERE
                    approved = 1
                AND
                    active = 1
        `);
    }).then(results => {
        results.forEach(result => {
            orgs[result.org_id].contacts.push({
                id: result.contact_id,
                phone: result.phone,
                email: result.email,
                web: result.web,
                region:result.region_id,
                post_code: result.post_code,
                city: result.city,
                house_number: result.house_number
            });
        });
        res.json({tags, orgs,regions});
    }).catch(error => {
        res.status(500).send();
    });
});
router.get('/searchActive', (req, res) => {
    const tags = {};
    const regions = {};
    const orgs = {};
    queryPromise(`
        SELECT
            id, name
        FROM
            tag
    `).then(results => {
        results.forEach(result => {
            tags[result.id] = result.name;
        });
        return queryPromise(`
            SELECT
                id, name, fill, d
            FROM
                regions
        `);
    }).then(results => {
        results.forEach(result => {
            regions[result.id] = {
            name: result.name,
            fill: result.fill,
            d: result.d
         };
        });
        return queryPromise(`
            SELECT
                id, name, description_company, logo
            FROM
                org
            WHERE
                    active = 1
                AND
                    approved = 1
        `);
    }).then(results => {
        results.forEach(result => {
            orgs[result.id] = {
                name: result.name,
                logo: result.logo,
                description_company: result.description_company,
                tags: [],
                contacts: []
            };
        });
        return queryPromise(`
            SELECT
                org_id, tag_id
            FROM
                    org_has_tag
                INNER JOIN
                    org
            ON
                org_id = id
            WHERE
                    approved = 1
                AND
                    active = 1
        `);
    }).then(results => {
        results.forEach(result => {
            orgs[result.org_id].tags.push(result.tag_id);
        });
        return queryPromise(`
            SELECT
                org_id, phone, email, web, contact.region_id, post_code, city, house_number,
                contact.id AS contact_id
            FROM
                    contact
                INNER JOIN
                    org
            ON
                org_id = org.id
            WHERE
                    approved = 1
                AND
                    active = 1
        `);
    }).then(results => {
        results.forEach(result => {
            orgs[result.org_id].contacts.push({
                id: result.contact_id,
                phone: result.phone,
                email: result.email,
                web: result.web,
                region:result.region_id,
                post_code: result.post_code,
                city: result.city,
                house_number: result.house_number
            });
        });
        res.json({tags, orgs,regions});
    }).catch(error => {
        res.status(500).send();
    });
});
module.exports = router;