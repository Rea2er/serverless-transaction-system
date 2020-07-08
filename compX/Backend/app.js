const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const jsonParser = bodyParser.json();
const db = mysql.createConnection({
  host: 'groupassignmentsdb.cibsusss4zqs.us-east-1.rds.amazonaws.com',
  user: 'team_db',
  port: '3306',
  password: '4A98d8Gx',
  database: 'companies',
});
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connection successful');
});

app.get('/jobs', (req, res) => {
  let sql = 'select * from jobs';
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length == 0) {
      res.send({
        error: 'jobs table does not have any records',
      });
    } else {
      res.send({
        result: result,
      });
    }
  });
});

app.get('/jobById', (req, res) => {
  if (!req.query.jobName || !req.query.partId) {
    res.status(400).send('Check the query parameters');
  } else {
    let sql = `select * from jobs where jobName = '${req.query.jobName}' and partId=${req.query.partId}`;
    let query = db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      if (result.length == 0) {
        res.status(404).send({
          error:
            'Job with jobName ' +
            req.query.jobName +
            ' and partId ' +
            req.query.partId +
            ' was not found',
        });
      } else {
        res.send({
          result: result,
        });
      }
    });
  }
});

app.get('/jobList', (req, res) => {
  if (!req.query.jobName) {
    res.status(400).send('Include the query parameter in the request');
  } else {
    let sql = `select * from jobs where jobName = '${req.query.jobName}'`;
    let query = db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      if (result.length == 0) {
        res.status(404).send({
          error: `Job with jobName '${req.query.jobName} ' was not found`,
        });
      } else {
        res.send({
          result: result,
        });
      }
    });
  }
});

app.post('/jobs', jsonParser, (req, res) => {
  let select =
    "select * from jobs where jobName = '" +
    req.body.jobName +
    "' and partId = " +
    req.body.partId;
  let sql = 'insert into jobs SET ?';
  let insertData = {
    jobName: req.body.jobName,
    partId: req.body.partId,
    qty: req.body.qty,
  };
  let selQuery = db.query(select, (error, result) => {
    if (result.length == 0) {
      let insertQuery = db.query(sql, insertData, (err, insertResult) => {
        if (err) {
          throw err;
        }
        res.send({
          result:
            'Record {' +
            insertData.jobName +
            ',' +
            insertData.partId +
            ',' +
            insertData.qty +
            '} is inserted in jobs table',
        });
      });
    } else {
      res.status(404).send({
        error:
          'jobs table with jobName ' +
          insertData.jobName +
          'and partId ' +
          insertData.partId +
          ' already exists',
      });
    }
  });
});

app.put('/jobs', jsonParser, (req, res) => {
  const jobName = req.body.jobName;
  const partID = req.body.partId;
  const qty = req.body.qty;

  const selectQuery = `SELECT * FROM jobs WHERE jobName = '${jobName}' and partId =${partID}`;

  const updateQuery = `UPDATE jobs
                       SET qty=${qty}
                       WHERE jobName='${jobName}' AND partId=${partID};`;

  db.query(selectQuery, (err, result) => {
    if (result.length != 0) {
      db.query(updateQuery, (err, result) => {
        if (err) {
          throw err;
        }
        res.send({
          message: `Record with JobName ${jobName} and partId ${partID} is updated`,
        });
      });
    } else {
      res.status(404).send({
        error: `JobName ${jobName} and partId ${partID} does not exist`,
      });
    }
  });
});

app.delete('/jobs', (req, res) => {
  if (!req.query.jobName || !req.query.partId) {
    res.status(400).send('Check the query parameters');
  } else {
    let sql = `Delete from jobs where jobName ='${req.query.jobName}' and partId=${req.query.partId}`;
    let query = db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      if (result.length == 0) {
        res.status(404).send({
          error: `Job with jobName ${req.query.jobName} and partId ${req.query.partId} was not found`,
        });
      } else
        res.send({
          message: `jobs table with jobName ${req.query.jobName} and partId ${req.query.partId} is deleted`,
        });
    });
  }
});

app.post('/orders', jsonParser, (req, res) => {
  let select =
    " select * from partordersX where jobName = '" +
    req.body.jobName +
    "' and partId = " +
    req.body.partId +
    " and userId = '" +
    req.body.userId +
    "'";
  let sql = 'insert into partordersX SET ?';
  let insertData = {
    jobName: req.body.jobName,
    partId: req.body.partId,
    userId: req.body.userId,
    qty: req.body.qty,
  };
  let selQuery = db.query(select, (error, result) => {
    if (result.length == 0) {
      let insertQuery = db.query(sql, insertData, (err, insertResult) => {
        if (err) {
          throw err;
        }
        res.send({
          result:
            'Record {' +
            insertData.jobName +
            ',' +
            insertData.partId +
            ',' +
            insertData.userId +
            ',' +
            insertData.qty +
            '} is inserted in partorders table',
        });
      });
    } else {
      res.status(404).send({
        error:
          'partorders table with jobName ' +
          insertData.jobName +
          'and partId ' +
          insertData.partId +
          'and userId ' +
          insertData.userId +
          ' already exists',
      });
    }
  });
});

app.get('/orders', (req, res) => {
  let sql = 'select * from partordersX';
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length == 0) {
      res.send({
        error: 'partorders table does not have any records',
      });
    } else {
      res.send({
        result: result,
      });
    }
  });
});
module.exports = app;
