const express = require('express');
const data = require('./data/data.json');
const logger = require('morgan');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true,
      }
));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function(req, res, next){
    console.log(`${req.method} request for ${req.url}`);
    next();
});

app.get('/getjson', function(req, res){
    res.json(data);
});

app.post('/create', function(req, res) {
    const newPerson = {
      id: req.body.id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    };
  
    data.push(newPerson);
    let json = JSON.stringify(data);
    fs.writeFile('./data/data.json', json, (err) => {
        if (err) throw err;
        console.log(json);
    } );

  });
  

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`);
});
